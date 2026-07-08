export type AlertSeverity = 'Low' | 'Moderate' | 'High' | 'Critical';
export type AlertType = 'Typhoon' | 'Flooding' | 'Landslide' | 'Earthquake' | 'Fire' | 'Drought' | 'Storm Surge' | 'Other';
export type DRRMReportStatus = 'Draft' | 'For Review' | 'Approved' | 'Exported' | 'Submitted' | 'Archived';
export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High';
export type ResourceCondition = 'Good' | 'Fair' | 'Poor' | 'For Repair' | 'Condemned';
export type ResourceAvailability = 'Available' | 'Deployed' | 'In Maintenance' | 'Unavailable';

export interface EarlyWarning {
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

export interface SitRep {
  id: string;
  sitRepNo: string;
  eventName: string;
  reportingPeriod: string;
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

export interface DANARecord {
  id: string;
  danaNo: string;
  assessmentDate: string;
  eventName: string;
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

export interface EvacuationRecord {
  id: string;
  evacuationCenterName: string;
  address: string;
  displacedFamilies: number;
  displacedPersons: number;
  males: number;
  females: number;
  children: number;
  seniors: number;
  pwdCount: number;
  originPuroks: string[];
  needs: string[];
  reportingDate: string;
  status: 'Open' | 'Closed' | 'Stand-by';
  managedBy: string;
}

export interface HazardRisk {
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

export interface DRRMResource {
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

export interface ReliefDistribution {
  id: string;
  recipientHouseholdId?: string;
  recipientName: string;
  assistanceType: string;
  quantity: number;
  unit: string;
  distributionDate: string;
  source: string;
  issuedBy: string;
  eventName: string;
  remarks?: string;
}

export interface BDRRMCAction {
  id: string;
  meetingDate: string;
  agenda: string;
  attendees: string[];
  decisions: string[];
  actionItems: { item: string; responsible: string; deadline: string; status: 'Pending' | 'In Progress' | 'Done' }[];
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  minutes?: string;
}
