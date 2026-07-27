export type AlertSeverity = 'Low' | 'Moderate' | 'High' | 'Critical';
export type AlertType = 'Typhoon' | 'Flooding' | 'Landslide' | 'Earthquake' | 'Fire' | 'Drought' | 'Storm Surge' | 'Other';
export type DRRMReportStatus = 'Draft' | 'For Review' | 'Approved' | 'Exported' | 'Submitted' | 'Archived';
export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High';
export type ResourceCondition = 'Good' | 'Fair' | 'Poor' | 'For Repair' | 'Condemned';
export type ResourceAvailability = 'Available' | 'Deployed' | 'In Maintenance' | 'Unavailable';
export type DisasterEventStatus = 'Monitoring' | 'Active' | 'De-escalating' | 'Closed' | 'Archived';
export type EOCActivationLevel = 'Not Activated' | 'Monitoring' | 'Partial Activation' | 'Full Activation' | 'Deactivated';

export interface PopulationCount {
  families: number;
  persons: number;
}

export interface SexDisaggregatedCount {
  male: number;
  female: number;
  notReported: number;
}

export interface DROMICAgeSexDistribution {
  infant0To6Months: SexDisaggregatedCount;
  toddler7MonthsTo2Years: SexDisaggregatedCount;
  preschool3To5Years: SexDisaggregatedCount;
  schoolAge6To12Years: SexDisaggregatedCount;
  teenage13To17Years: SexDisaggregatedCount;
  adult18To59Years: SexDisaggregatedCount;
  elderly60YearsAndAbove: SexDisaggregatedCount;
}

export interface DROMICSectoralDistribution {
  pregnantWomen: number;
  lactatingMothers: number;
  childHeadedFamilies: SexDisaggregatedCount;
  singleHeadedFamilies: SexDisaggregatedCount;
  soloParents: SexDisaggregatedCount;
  personsWithDisability: SexDisaggregatedCount;
  indigenousPeoples: SexDisaggregatedCount;
  fourPsBeneficiaries: SexDisaggregatedCount;
}

export type DROMICDataQualityStatus =
  | 'Complete'
  | 'Partial'
  | 'For Validation';

export interface DROMICDisaggregatedPopulation {
  ageSex: DROMICAgeSexDistribution;
  sectoral: DROMICSectoralDistribution;
  dataQualityStatus: DROMICDataQualityStatus;
  source: string;
  collectedAt: string;
  validatedAt?: string;
  validatedBy?: string;
}

export interface DROMICPopulationSnapshot {
  affected: PopulationCount;
  currentDisplaced: {
    insideEvacuationCenters: PopulationCount;
    outsideEvacuationCenters: PopulationCount;
  };
  cumulativeDisplaced: {
    insideEvacuationCenters: PopulationCount;
    outsideEvacuationCenters: PopulationCount;
  };
  asOf: string;
}

export interface DisasterEvent {
  id: string;
  eventCode: string;
  name: string;
  eventType: AlertType;
  status: DisasterEventStatus;
  onsetAt: string;
  closedAt?: string;
  affectedAreas: string[];
  leadOfficer: string;
  population: DROMICPopulationSnapshot;
}

export interface OperationalPeriod {
  id: string;
  eventId: string;
  periodNo: number;
  startsAt: string;
  endsAt: string;
  reportingCutoff: string;
  eocActivationLevel: EOCActivationLevel;
  eocLocation?: string;
  incidentCommander: string;
  objectives: string[];
  status: 'Planned' | 'Active' | 'Completed' | 'Closed';
  handoverNotes?: string;
}

export interface DRRMOperationalContext {
  eventId: string;
  operationalPeriodId: string;
}

export type DRRMRecordType =
  | 'early-warning'
  | 'sitrep'
  | 'dana'
  | 'evacuation'
  | 'hazard-risk'
  | 'resource'
  | 'relief'
  | 'bdrrmc-action';

export interface DRRMRecordReference {
  recordType: DRRMRecordType;
  recordId: string;
}

export type DRRMRecordRelationType =
  | 'informs'
  | 'triggers'
  | 'authorizes'
  | 'supports'
  | 'documents'
  | 'assesses'
  | 'updates';

export interface DRRMRecordLink extends DRRMOperationalContext {
  id: string;
  source: DRRMRecordReference;
  target: DRRMRecordReference;
  relationType: DRRMRecordRelationType;
  note: string;
}

export interface EarlyWarning extends DRRMOperationalContext {
  id: string;
  alertType: AlertType;
  severity: AlertSeverity;
  affectedAreas: string[];
  message: string;
  source: string;
  issuedAt: string;
  actionsAdvised: string[];
  issuedBy: string;
  status: 'Active' | 'Lifted' | 'Escalated';
}

export interface SitRep extends DRRMOperationalContext {
  id: string;
  sitRepNo: string;
  affectedAreas: string[];
  casualties: number;
  injuries: number;
  missingPersons: number;
  affectedFamilies: number;
  affectedPersons: number;
  lifelinesStatus: { lifeline: string; status: string }[];
  immediateNeeds: string[];
  actionsTaken: string[];
  preparedBy: string;
  submittedBy?: string;
  version: number;
  status: DRRMReportStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DANARecord extends DRRMOperationalContext {
  id: string;
  danaNo: string;
  assessmentDate: string;
  sector: string;
  affectedHouseholds: number;
  affectedPersons: number;
  damageDescription: string;
  estimatedDamage: number;
  immediateNeeds: string[];
  validationStatus: 'Pending' | 'Validated' | 'Returned';
  assessedBy: string;
  evidenceNotes?: string;
  status: DRRMReportStatus;
  createdAt: string;
}

export interface DisplacementEpisode {
  id: string;
  householdId: string;
  householdName: string;
  locationType: 'Inside Evacuation Center' | 'Outside Evacuation Center';
  checkedInAt: string;
  checkedOutAt?: string;
  persons: number;
  personDetailsCaptured: boolean;
  personDetailReason?: string;
}

export interface EvacuationRecord extends DRRMOperationalContext {
  id: string;
  evacuationCenterName: string;
  address: string;
  displacedFamilies: number;
  displacedPersons: number;
  disaggregatedPopulation?: DROMICDisaggregatedPopulation;
  originPuroks: string[];
  needs: string[];
  reportingDate: string;
  status: 'Open' | 'Closed' | 'Stand-by';
  managedBy: string;
  locationType: 'Inside Evacuation Center' | 'Outside Evacuation Center';
  householdEpisodes: DisplacementEpisode[];
}

export interface HazardRisk extends DRRMOperationalContext {
  id: string;
  hazardType: AlertType;
  affectedPuroks: string[];
  riskLevel: RiskLevel;
  vulnerableGroups: string[];
  preparednessNotes: string;
  mapReference?: string;
  lastUpdated: string;
  updatedBy: string;
}

export interface DRRMResource extends DRRMOperationalContext {
  id: string;
  resourceName: string;
  category: 'Equipment' | 'Supply' | 'Vehicle' | 'Communication' | 'Medical';
  quantity: number;
  unit: string;
  condition: ResourceCondition;
  location: string;
  custodian: string;
  availability: ResourceAvailability;
  lastInspected: string;
  remarks?: string;
}

export interface ReliefDistribution extends DRRMOperationalContext {
  id: string;
  recipientHouseholdId?: string;
  recipientName: string;
  assistanceType: string;
  quantity: number;
  unit: string;
  distributionDate: string;
  source: string;
  issuedBy: string;
  remarks?: string;
}

export interface BDRRMCAction extends DRRMOperationalContext {
  id: string;
  meetingDate: string;
  agenda: string;
  attendees: string[];
  decisions: string[];
  actionItems: { item: string; responsible: string; deadline: string; status: 'Pending' | 'In Progress' | 'Done' }[];
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  minutes?: string;
}
