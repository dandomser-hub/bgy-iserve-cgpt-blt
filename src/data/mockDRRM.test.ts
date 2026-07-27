import { describe, expect, it } from 'vitest';
import {
  disasterEventById,
  mockBDRRMCActions,
  mockDANARecords,
  mockDRRMResources,
  mockDisasterEvents,
  mockEarlyWarnings,
  mockEvacuationRecords,
  mockHazardRisks,
  mockOperationalPeriods,
  mockReliefDistributions,
  mockSitReps,
  operationalPeriodById,
} from './mockDRRM';
import type { DRRMOperationalContext } from '@/types/drrm';

const contextualRecords: DRRMOperationalContext[] = [
  ...mockEarlyWarnings,
  ...mockSitReps,
  ...mockDANARecords,
  ...mockEvacuationRecords,
  ...mockHazardRisks,
  ...mockDRRMResources,
  ...mockReliefDistributions,
  ...mockBDRRMCActions,
];

describe('P0-02 DRRM domain foundation', () => {
  it('uses unique controlled identifiers for events and operational periods', () => {
    expect(new Set(mockDisasterEvents.map(event => event.id)).size).toBe(mockDisasterEvents.length);
    expect(new Set(mockOperationalPeriods.map(period => period.id)).size).toBe(mockOperationalPeriods.length);
  });

  it('links every operational record to an existing event and period', () => {
    for (const record of contextualRecords) {
      const event = disasterEventById.get(record.eventId);
      const period = operationalPeriodById.get(record.operationalPeriodId);

      expect(event, `Missing event ${record.eventId}`).toBeDefined();
      expect(period, `Missing period ${record.operationalPeriodId}`).toBeDefined();
      expect(period?.eventId).toBe(record.eventId);
    }
  });

  it('keeps reporting cutoffs inside their operational periods', () => {
    for (const period of mockOperationalPeriods) {
      const startsAt = Date.parse(period.startsAt);
      const endsAt = Date.parse(period.endsAt);
      const cutoff = Date.parse(period.reportingCutoff);

      expect(startsAt).toBeLessThan(endsAt);
      expect(cutoff).toBeGreaterThanOrEqual(startsAt);
      expect(cutoff).toBeLessThanOrEqual(endsAt);
    }
  });

  it('separates affected, current displaced, and cumulative displaced totals', () => {
    for (const event of mockDisasterEvents) {
      const { affected, currentDisplaced, cumulativeDisplaced } = event.population;
      const currentFamilies =
        currentDisplaced.insideEvacuationCenters.families +
        currentDisplaced.outsideEvacuationCenters.families;
      const currentPersons =
        currentDisplaced.insideEvacuationCenters.persons +
        currentDisplaced.outsideEvacuationCenters.persons;
      const cumulativeFamilies =
        cumulativeDisplaced.insideEvacuationCenters.families +
        cumulativeDisplaced.outsideEvacuationCenters.families;
      const cumulativePersons =
        cumulativeDisplaced.insideEvacuationCenters.persons +
        cumulativeDisplaced.outsideEvacuationCenters.persons;

      expect(currentFamilies).toBeLessThanOrEqual(cumulativeFamilies);
      expect(currentPersons).toBeLessThanOrEqual(cumulativePersons);
      expect(cumulativeFamilies).toBeLessThanOrEqual(affected.families);
      expect(cumulativePersons).toBeLessThanOrEqual(affected.persons);
    }
  });

  it('keeps household displacement as the default and requires a reason for person details', () => {
    const episodes = mockEvacuationRecords.flatMap(record => record.householdEpisodes);
    expect(episodes.length).toBeGreaterThan(0);

    for (const episode of episodes) {
      expect(episode.householdId).toBeTruthy();
      expect(episode.persons).toBeGreaterThan(0);
      if (episode.personDetailsCaptured) {
        expect(episode.personDetailReason).toBeTruthy();
      }
    }
  });
});
