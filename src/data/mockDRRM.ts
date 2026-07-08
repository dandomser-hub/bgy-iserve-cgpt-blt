import type { EarlyWarning, SitRep, DANARecord, EvacuationRecord, HazardRisk, DRRMResource, ReliefDistribution, BDRRMCAction } from '@/types/drrm';

export const mockEarlyWarnings: EarlyWarning[] = [
  { id: 'EW001', alertType: 'Typhoon', severity: 'High', affectedAreas: ['Purok 1 - Riverside', 'Purok 3 - Seaside'], message: 'Typhoon Emong expected to make landfall within 24 hours. Signal No. 2 in effect. Residents in low-lying and coastal areas to prepare for possible evacuation.', source: 'PAGASA - Regional', issuedAt: '2024-06-10T06:00:00', actionsAdvised: ['Secure loose objects', 'Prepare go-bags', 'Identify evacuation routes', 'Monitor PAGASA updates'], issuedBy: 'DRRM Focal Mangubat', status: 'Active' },
  { id: 'EW002', alertType: 'Flooding', severity: 'Moderate', affectedAreas: ['Purok 1 - Riverside'], message: 'Water levels in Riverside Creek rising due to upstream rainfall. Low-lying areas in Purok 1 advised to be on alert.', source: 'DRRM Office Observation', issuedAt: '2024-06-10T08:00:00', actionsAdvised: ['Move valuables to higher ground', 'Stay away from creek banks'], issuedBy: 'DRRM Focal Mangubat', status: 'Active' },
  { id: 'EW003', alertType: 'Landslide', severity: 'Moderate', affectedAreas: ['Purok 2 - Mountainview'], message: 'Sustained heavy rainfall has saturated slopes in the Mountainview area. Residents near steep slopes advised to be vigilant and ready for evacuation.', source: 'MGB Geohazard Advisory', issuedAt: '2024-06-10T09:00:00', actionsAdvised: ['Monitor slope conditions', 'Prepare for immediate evacuation if cracking sounds heard', 'Identify safe routes'], issuedBy: 'DRRM Focal Mangubat', status: 'Active' },
  { id: 'EW004', alertType: 'Typhoon', severity: 'Low', affectedAreas: ['All Puroks'], message: 'Typhoon Emong downgraded. Signal No. 1 advisory lifted. Residents may return to normal activities but remain vigilant for flooding.', source: 'PAGASA - Regional', issuedAt: '2024-06-11T18:00:00', actionsAdvised: ['Clean surroundings', 'Check for damage', 'Report injured persons to barangay'], issuedBy: 'DRRM Focal Mangubat', status: 'Lifted' },
  { id: 'EW005', alertType: 'Fire', severity: 'Critical', affectedAreas: ['Purok 5 - Town Center'], message: 'Fire incident at Town Center market area. BFP and residents actively controlling. Residents urged to keep clear of area.', source: 'BFP Response', issuedAt: '2024-04-05T13:30:00', actionsAdvised: ['Evacuate immediate area', 'Assist BFP in crowd control', 'Account for all residents in affected zone'], issuedBy: 'DRRM Focal Mangubat', status: 'Lifted' },
];

export const mockSitReps: SitRep[] = [
  {
    id: 'SR001', sitRepNo: 'SITREP-2024-001', eventName: 'Typhoon Emong',
    reportingPeriod: '2024-06-10 06:00 to 2024-06-11 06:00',
    affectedAreas: ['Purok 1 - Riverside', 'Purok 3 - Seaside'],
    casualties: 0, injuries: 2, missingPersons: 0, affectedFamilies: 45, affectedPersons: 180,
    lifelinesStatus: [
      { lifeline: 'Electricity', status: 'Intermittent - restoration ongoing' },
      { lifeline: 'Water Supply', status: 'Operational' },
      { lifeline: 'Roads', status: 'Passable with caution - debris clearing underway' },
      { lifeline: 'Communications', status: 'Operational' },
    ],
    immediateNeeds: ['Food packs', 'Water containers', 'Sleeping mats', 'First aid supplies'],
    actionsTaken: ['Evacuation center opened at Barangay Elementary School', '45 families evacuated', 'Coordination with MDRRMO completed', 'Relief packs distributed to 30 families'],
    preparedBy: 'DRRM Focal Mangubat', submittedBy: 'Hon. Reyes (Punong Barangay)',
    version: 2, status: 'Submitted', createdAt: '2024-06-10T08:00:00', updatedAt: '2024-06-11T07:00:00',
  },
  {
    id: 'SR002', sitRepNo: 'SITREP-2024-002', eventName: 'Typhoon Emong',
    reportingPeriod: '2024-06-11 06:00 to 2024-06-12 06:00',
    affectedAreas: ['Purok 1 - Riverside', 'Purok 3 - Seaside'],
    casualties: 0, injuries: 2, missingPersons: 0, affectedFamilies: 45, affectedPersons: 180,
    lifelinesStatus: [
      { lifeline: 'Electricity', status: 'Restored in most areas' },
      { lifeline: 'Water Supply', status: 'Operational' },
      { lifeline: 'Roads', status: 'Fully passable' },
      { lifeline: 'Communications', status: 'Operational' },
    ],
    immediateNeeds: ['Continued food support for 10 remaining families'],
    actionsTaken: ['35 families returned home', '10 families still at evacuation center', 'Clean-up drive initiated', 'Injuries treated at RHU'],
    preparedBy: 'DRRM Focal Mangubat',
    version: 1, status: 'Approved', createdAt: '2024-06-11T08:00:00', updatedAt: '2024-06-11T15:00:00',
  },
  {
    id: 'SR003', sitRepNo: 'SITREP-2024-003', eventName: 'Town Center Fire Incident',
    reportingPeriod: '2024-04-05 13:30 to 2024-04-06 08:00',
    affectedAreas: ['Purok 5 - Town Center'],
    casualties: 0, injuries: 1, missingPersons: 0, affectedFamilies: 5, affectedPersons: 22,
    lifelinesStatus: [
      { lifeline: 'Electricity', status: 'Restored after temporary shutdown' },
      { lifeline: 'Water Supply', status: 'Operational' },
      { lifeline: 'Roads', status: 'Market area temporarily closed for investigation' },
    ],
    immediateNeeds: ['Temporary shelter for 5 families', 'Food packs'],
    actionsTaken: ['BFP controlled fire within 2 hours', 'Injured resident treated at hospital', '5 families temporarily hosted at neighbors', 'Incident investigation underway with BFP'],
    preparedBy: 'DRRM Focal Mangubat', submittedBy: 'Hon. Reyes',
    version: 1, status: 'Archived', createdAt: '2024-04-05T20:00:00', updatedAt: '2024-04-10T09:00:00',
  },
  {
    id: 'SR004', sitRepNo: 'SITREP-2024-004', eventName: 'Typhoon Emong - Final Report',
    reportingPeriod: '2024-06-12 06:00 to 2024-06-13 06:00',
    affectedAreas: ['Purok 1 - Riverside', 'Purok 3 - Seaside'],
    casualties: 0, injuries: 2, missingPersons: 0, affectedFamilies: 45, affectedPersons: 180,
    lifelinesStatus: [
      { lifeline: 'Electricity', status: 'Fully restored' },
      { lifeline: 'Water Supply', status: 'Operational' },
      { lifeline: 'Roads', status: 'Fully passable' },
    ],
    immediateNeeds: [],
    actionsTaken: ['All evacuated families returned home', 'Evacuation center closed', 'Clean-up completed', 'DANA assessment ongoing'],
    preparedBy: 'DRRM Focal Mangubat',
    version: 1, status: 'Draft', createdAt: '2024-06-13T08:00:00', updatedAt: '2024-06-13T08:00:00',
  },
];

export const mockDANARecords: DANARecord[] = [
  { id: 'DANA001', danaNo: 'DANA-2024-001', assessmentDate: '2024-06-12', eventName: 'Typhoon Emong', sector: 'Housing', affectedHouseholds: 45, affectedPersons: 180, damageDescription: 'Roof damage to 12 units; partial wall damage to 5 units; flooding damage to ground-floor belongings in 20 units.', estimatedDamage: 285000, immediateNeeds: ['Roofing materials', 'Waterproofing sheets', 'Structural repair assistance'], validationStatus: 'Validated', assessedBy: 'DRRM Focal Mangubat', evidenceNotes: 'Photos taken and filed. MDRRMO team co-assessed.', status: 'Submitted', createdAt: '2024-06-12T09:00:00' },
  { id: 'DANA002', danaNo: 'DANA-2024-002', assessmentDate: '2024-06-12', eventName: 'Typhoon Emong', sector: 'Agriculture', affectedHouseholds: 15, affectedPersons: 60, damageDescription: 'Standing crops (palay) damaged in Riverside and Grassland areas. Estimated loss of 3 hectares of near-harvest crops.', estimatedDamage: 180000, immediateNeeds: ['Seeds for replanting', 'Agricultural assistance'], validationStatus: 'Validated', assessedBy: 'DRRM Focal Mangubat', status: 'Approved', createdAt: '2024-06-12T10:00:00' },
  { id: 'DANA003', danaNo: 'DANA-2024-003', assessmentDate: '2024-04-06', eventName: 'Town Center Fire', sector: 'Livelihood / Commerce', affectedHouseholds: 5, affectedPersons: 22, damageDescription: 'Five market stalls completely destroyed. Two partially damaged. Personal belongings and business inventory lost.', estimatedDamage: 420000, immediateNeeds: ['Livelihood assistance', 'Temporary business space'], validationStatus: 'Validated', assessedBy: 'DRRM Focal Mangubat', status: 'Archived', createdAt: '2024-04-06T09:00:00' },
  { id: 'DANA004', danaNo: 'DANA-2024-004', assessmentDate: '2024-06-13', eventName: 'Typhoon Emong', sector: 'Infrastructure', affectedHouseholds: 0, affectedPersons: 0, damageDescription: 'Damage to barangay road shoulder along Riverside stretch. Estimated 200 linear meters affected. Drainage blocked at two points.', estimatedDamage: 120000, immediateNeeds: ['Road clearing materials', 'Drainage repair'], validationStatus: 'Pending', assessedBy: 'DRRM Focal Mangubat', status: 'Draft', createdAt: '2024-06-13T11:00:00' },
];

export const mockEvacuationRecords: EvacuationRecord[] = [
  { id: 'EV001', evacuationCenterName: 'Barangay Maligaya Elementary School', address: 'Purok 5 - Town Center, Brgy. Maligaya', displacedFamilies: 30, displacedPersons: 120, males: 55, females: 65, children: 40, seniors: 15, pwdCount: 3, originPuroks: ['Purok 1 - Riverside', 'Purok 3 - Seaside'], needs: ['Food packs', 'Sleeping mats', 'Blankets', 'Diapers', 'Infant formula'], reportingDate: '2024-06-10', status: 'Closed', managedBy: 'DRRM Focal Mangubat' },
  { id: 'EV002', evacuationCenterName: 'Barangay Multi-Purpose Hall', address: 'Purok 5 - Town Center, Brgy. Maligaya', displacedFamilies: 15, displacedPersons: 60, males: 28, females: 32, children: 20, seniors: 8, pwdCount: 1, originPuroks: ['Purok 1 - Riverside'], needs: ['Food packs', 'Water', 'Medicines'], reportingDate: '2024-06-10', status: 'Closed', managedBy: 'DRRM Focal Mangubat' },
  { id: 'EV003', evacuationCenterName: 'Sitio Upper Riverside Community Center', address: 'Purok 1 - Riverside, Brgy. Maligaya', displacedFamilies: 8, displacedPersons: 32, males: 15, females: 17, children: 10, seniors: 4, pwdCount: 2, originPuroks: ['Purok 1 - Riverside'], needs: ['Food', 'Hygiene kits'], reportingDate: '2024-06-10', status: 'Closed', managedBy: 'DRRM Focal Mangubat' },
  { id: 'EV004', evacuationCenterName: 'Barangay Maligaya Elementary School', address: 'Purok 5 - Town Center, Brgy. Maligaya', displacedFamilies: 5, displacedPersons: 22, males: 10, females: 12, children: 8, seniors: 2, pwdCount: 0, originPuroks: ['Purok 5 - Town Center'], needs: ['Temporary shelter support', 'Food packs', 'Livelihood assistance'], reportingDate: '2024-04-05', status: 'Closed', managedBy: 'DRRM Focal Mangubat' },
];

export const mockHazardRisks: HazardRisk[] = [
  { id: 'HR001', hazardType: 'Flooding', affectedPuroks: ['Purok 1 - Riverside', 'Purok 3 - Seaside'], riskLevel: 'High', vulnerableGroups: ['Senior Citizen', 'Person with Disability (PWD)', 'Infants'], preparednessNotes: 'Pre-identified evacuation routes established. Creek monitoring protocol in place. 2 evacuation centers designated.', mapReference: 'Flood Hazard Map - DOST-PHIVOLCS 2023', lastUpdated: '2024-05-01', updatedBy: 'DRRM Focal Mangubat' },
  { id: 'HR002', hazardType: 'Landslide', affectedPuroks: ['Purok 2 - Mountainview'], riskLevel: 'Moderate', vulnerableGroups: ['All residents along steep slopes'], preparednessNotes: 'MGB geohazard zones mapped. Residents briefed on warning signs. Early evacuation protocol established.', mapReference: 'Landslide Susceptibility Map - MGB 2022', lastUpdated: '2024-05-01', updatedBy: 'DRRM Focal Mangubat' },
  { id: 'HR003', hazardType: 'Typhoon', affectedPuroks: ['All Puroks'], riskLevel: 'High', vulnerableGroups: ['Senior Citizen', 'Person with Disability (PWD)', 'Pregnant women', 'Infants'], preparednessNotes: 'Annual typhoon preparedness drill conducted. Evacuation center capacity assessed. Signal protocol in place.', mapReference: 'PAGASA Typhoon Track Historical Data', lastUpdated: '2024-05-01', updatedBy: 'DRRM Focal Mangubat' },
  { id: 'HR004', hazardType: 'Fire', affectedPuroks: ['Purok 5 - Town Center', 'Purok 1 - Riverside'], riskLevel: 'Moderate', vulnerableGroups: ['Market vendors', 'Dense residential areas'], preparednessNotes: 'BFP partnership established. Fire extinguishers distributed to key establishments. Clear access routes maintained.', mapReference: 'BFP Fire Risk Assessment 2023', lastUpdated: '2024-05-01', updatedBy: 'DRRM Focal Mangubat' },
];

export const mockDRRMResources: DRRMResource[] = [
  { id: 'RS001', resourceName: 'Rubber Boat', category: 'Equipment', quantity: 2, unit: 'unit', condition: 'Good', location: 'Barangay Hall Storage', custodian: 'DRRM Focal Mangubat', availability: 'Available', lastInspected: '2024-05-15' },
  { id: 'RS002', resourceName: 'Life Jackets', category: 'Equipment', quantity: 20, unit: 'piece', condition: 'Good', location: 'Barangay Hall Storage', custodian: 'DRRM Focal Mangubat', availability: 'Available', lastInspected: '2024-05-15' },
  { id: 'RS003', resourceName: 'Food Packs (Family Pack)', category: 'Supply', quantity: 100, unit: 'pack', condition: 'Good', location: 'Barangay Multi-Purpose Hall Stockroom', custodian: 'DRRM Focal Mangubat', availability: 'Available', lastInspected: '2024-06-01', remarks: 'Replenished June 2024' },
  { id: 'RS004', resourceName: 'First Aid Kit', category: 'Medical', quantity: 5, unit: 'kit', condition: 'Good', location: 'Barangay Hall', custodian: 'DRRM Focal Mangubat', availability: 'Available', lastInspected: '2024-05-20' },
  { id: 'RS005', resourceName: 'Portable Generator', category: 'Equipment', quantity: 1, unit: 'unit', condition: 'Fair', location: 'Barangay Hall', custodian: 'DRRM Focal Mangubat', availability: 'Available', lastInspected: '2024-05-10', remarks: 'Requires servicing before next deployment' },
  { id: 'RS006', resourceName: 'Megaphone / Bullhorn', category: 'Communication', quantity: 3, unit: 'unit', condition: 'Good', location: 'Barangay Hall', custodian: 'DRRM Focal Mangubat', availability: 'Available', lastInspected: '2024-05-20' },
  { id: 'RS007', resourceName: 'Emergency Blankets', category: 'Supply', quantity: 50, unit: 'piece', condition: 'Good', location: 'Barangay Hall Storage', custodian: 'DRRM Focal Mangubat', availability: 'Available', lastInspected: '2024-05-20' },
  { id: 'RS008', resourceName: 'Chainsaw', category: 'Equipment', quantity: 1, unit: 'unit', condition: 'For Repair', location: 'Barangay Hall', custodian: 'DRRM Focal Mangubat', availability: 'In Maintenance', lastInspected: '2024-06-01', remarks: 'Engine overhaul needed' },
];

export const mockReliefDistributions: ReliefDistribution[] = [
  { id: 'RL001', recipientHouseholdId: 'H001', recipientName: 'Dela Cruz Household', assistanceType: 'Food Pack (Family)', quantity: 2, unit: 'pack', distributionDate: '2024-06-10', source: 'MSWDO Relief Goods', issuedBy: 'DRRM Focal Mangubat', eventName: 'Typhoon Emong' },
  { id: 'RL002', recipientHouseholdId: 'H002', recipientName: 'Mendoza Household', assistanceType: 'Food Pack (Family)', quantity: 1, unit: 'pack', distributionDate: '2024-06-10', source: 'MSWDO Relief Goods', issuedBy: 'DRRM Focal Mangubat', eventName: 'Typhoon Emong', remarks: 'Senior citizen household' },
  { id: 'RL003', recipientHouseholdId: 'H003', recipientName: 'Villanueva Household', assistanceType: 'Food Pack (Family)', quantity: 2, unit: 'pack', distributionDate: '2024-06-10', source: 'MSWDO Relief Goods', issuedBy: 'DRRM Focal Mangubat', eventName: 'Typhoon Emong' },
  { id: 'RL004', recipientHouseholdId: 'H008', recipientName: 'Tolentino Household', assistanceType: 'Emergency Shelter Kit', quantity: 1, unit: 'kit', distributionDate: '2024-06-11', source: 'OCD Regional Office', issuedBy: 'DRRM Focal Mangubat', eventName: 'Typhoon Emong', remarks: 'Partial roof damage' },
  { id: 'RL005', recipientHouseholdId: 'H010', recipientName: 'Soriano Household', assistanceType: 'Livelihood Assistance Pack', quantity: 1, unit: 'pack', distributionDate: '2024-04-10', source: 'DOLE Quick Response', issuedBy: 'DRRM Focal Mangubat', eventName: 'Town Center Fire', remarks: 'Affected market vendor' },
];

export const mockBDRRMCActions: BDRRMCAction[] = [
  { id: 'BA001', meetingDate: '2024-06-09', agenda: 'Pre-Typhoon Emong Preparedness Meeting', attendees: ['Hon. Reyes (Punong Barangay)', 'DRRM Focal Mangubat', 'Secretary Santos', 'Treas. Villanueva', 'Kagawad Aquino', 'BHW Rep. Flores'], decisions: ['Activate Barangay Emergency Operations Center', 'Pre-position evacuation centers', 'Deploy monitoring teams to Riverside and Seaside puroks'], actionItems: [{ item: 'Open Brgy. Elementary School as evacuation center', responsible: 'DRRM Focal Mangubat', deadline: '2024-06-10', status: 'Done' }, { item: 'Coordinate food pack request with MSWDO', responsible: 'Treas. Villanueva', deadline: '2024-06-10', status: 'Done' }, { item: 'Brief Purok Leaders on evacuation protocol', responsible: 'Secretary Santos', deadline: '2024-06-09', status: 'Done' }], status: 'Completed', minutes: 'All actions completed. EOC activated at 5:00 AM June 10.' },
  { id: 'BA002', meetingDate: '2024-06-14', agenda: 'Post-Typhoon Emong Assessment and Recovery Planning', attendees: ['Hon. Reyes', 'DRRM Focal Mangubat', 'Secretary Santos', 'Treas. Villanueva', 'Kagawad Cruz'], decisions: ['Initiate DANA assessment for all sectors', 'Submit DANA and SitRep to MDRRMO', 'Organize community clean-up'], actionItems: [{ item: 'Complete DANA assessment', responsible: 'DRRM Focal Mangubat', deadline: '2024-06-15', status: 'Done' }, { item: 'Submit SitRep Final Report', responsible: 'DRRM Focal Mangubat', deadline: '2024-06-16', status: 'In Progress' }, { item: 'Community clean-up drive', responsible: 'Secretary Santos', deadline: '2024-06-17', status: 'Pending' }], status: 'Completed' },
];
