import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AppShell } from '@/layouts/AppShell';
import { useRole } from '@/app/providers/RoleProvider';
import { ROLE_HOME } from '@/utils/constants';
import { RouteGuard } from '@/components/shared/RouteGuard';
import type { RouteAccessId } from '@/utils/routeAccess';

function RoleLandingRedirect() {
  const { roleId } = useRole();
  if (!roleId) return <Navigate to="/login-demo" replace />;
  return <Navigate to={ROLE_HOME[roleId]} replace />;
}

function guard(routeId: RouteAccessId, element: ReactNode) {
  return <RouteGuard routeId={routeId}>{element}</RouteGuard>;
}

// Auth
import { RoleSelectorPage } from '@/modules/auth/RoleSelectorPage';
import { AccessDeniedPage } from '@/modules/auth/AccessDeniedPage';

// Dashboard
import { ExecutiveDashboardPage } from '@/modules/dashboard/ExecutiveDashboardPage';

// Residents
import { ResidentRegistryPage } from '@/modules/residents/ResidentRegistryPage';
import { ResidentProfilePage } from '@/modules/residents/ResidentProfilePage';
import { HouseholdRegistryPage } from '@/modules/residents/HouseholdRegistryPage';
import { ResidentDuplicateReviewPage } from '@/modules/residents/ResidentDuplicateReviewPage';
import { ResidentStatusManagementPage } from '@/modules/residents/ResidentStatusManagementPage';

// Documents
import { DocumentRequestIntakePage } from '@/modules/documents/DocumentRequestIntakePage';
import { DocumentQueuePage } from '@/modules/documents/DocumentQueuePage';
import { DocumentWorkspacePage } from '@/modules/documents/DocumentWorkspacePage';
import { DocumentPreviewReleasePage } from '@/modules/documents/DocumentPreviewReleasePage';
import { DocumentTemplateManagerPage } from '@/modules/documents/DocumentTemplateManagerPage';
import { DocumentVerificationPage } from '@/modules/documents/DocumentVerificationPage';

// Collections
import { CollectionReferenceLogPage } from '@/modules/collections/CollectionReferenceLogPage';
import { DailyCollectionCertificationPage } from '@/modules/collections/DailyCollectionCertificationPage';
import { FeeTableExemptionPage } from '@/modules/collections/FeeTableExemptionPage';

// Blotter & KP
import { BlotterRegistryPage } from '@/modules/blotter-kp/BlotterRegistryPage';
import { BlotterIntakePage } from '@/modules/blotter-kp/BlotterIntakePage';
import { KPCaseTrackerPage } from '@/modules/blotter-kp/KPCaseTrackerPage';
import { KPNoticesSchedulePage } from '@/modules/blotter-kp/KPNoticesSchedulePage';
import { KPMinutesSettlementPage } from '@/modules/blotter-kp/KPMinutesSettlementPage';

// DRRM
import { DRRMDashboardPage } from '@/modules/drrm/DRRMDashboardPage';
import { EarlyWarningPreparednessPage } from '@/modules/drrm/EarlyWarningPreparednessPage';
import { SitRepBuilderPage } from '@/modules/drrm/SitRepBuilderPage';
import { DANAFormPage } from '@/modules/drrm/DANAFormPage';
import { EvacuationDromicPage } from '@/modules/drrm/EvacuationDromicPage';
import { HazardRiskRegisterPage } from '@/modules/drrm/HazardRiskRegisterPage';
import { DRRMResourcesPage } from '@/modules/drrm/DRRMResourcesPage';
import { ReliefDistributionPage } from '@/modules/drrm/ReliefDistributionPage';
import { BDRRMCActionTrackerPage } from '@/modules/drrm/BDRRMCActionTrackerPage';

// GAD
import { GADDashboardPage } from '@/modules/gad/GADDashboardPage';
import { AnnexD1WorkspacePage } from '@/modules/gad/AnnexD1WorkspacePage';
import { AnnexE1WorkspacePage } from '@/modules/gad/AnnexE1WorkspacePage';
import { GADActivityMonitorPage } from '@/modules/gad/GADActivityMonitorPage';
import { ParticipantLogPage } from '@/modules/gad/ParticipantLogPage';
import { GADBudgetAttributionPage } from '@/modules/gad/GADBudgetAttributionPage';

// Reports & Review
import { ReportsExportCenterPage } from '@/modules/reports/ReportsExportCenterPage';
import { MunicipalReviewDashboardPage } from '@/modules/reports/MunicipalReviewDashboardPage';
import { ReviewerCommentLoopPage } from '@/modules/reports/ReviewerCommentLoopPage';
import { ComplianceChecklistPage } from '@/modules/reports/ComplianceChecklistPage';
import { DataQualityDashboardPage } from '@/modules/reports/DataQualityDashboardPage';

// Admin
import { UserRoleAdminPage } from '@/modules/admin/UserRoleAdminPage';
import { AuditTrailViewerPage } from '@/modules/admin/AuditTrailViewerPage';
import { BackupSyncMonitorPage } from '@/modules/admin/BackupSyncMonitorPage';
import { SettingsPage } from '@/modules/admin/SettingsPage';

// Roadmap
import { FutureModulesPage } from '@/modules/roadmap/FutureModulesPage';

export const router = createBrowserRouter([
  // Public routes (no AppShell)
  { path: '/login-demo', element: <RoleSelectorPage /> },
  { path: '/public/verify', element: <DocumentVerificationPage /> },

  // Protected routes (with AppShell)
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <RoleLandingRedirect /> },
      { path: 'access-denied', element: <AccessDeniedPage /> },
      { path: 'dashboard', element: guard('dashboard', <ExecutiveDashboardPage />) },

      // Residents
      { path: 'residents', element: guard('residents', <ResidentRegistryPage />) },
      { path: 'residents/duplicates', element: guard('residentDuplicates', <ResidentDuplicateReviewPage />) },
      { path: 'residents/status-management', element: guard('residentStatusManagement', <ResidentStatusManagementPage />) },
      { path: 'residents/:id', element: guard('residentProfile', <ResidentProfilePage />) },
      { path: 'households', element: guard('households', <HouseholdRegistryPage />) },

      // Documents
      { path: 'documents/intake', element: guard('documentIntake', <DocumentRequestIntakePage />) },
      { path: 'documents/queue', element: guard('documentQueue', <DocumentQueuePage />) },
      { path: 'documents/templates', element: guard('documentTemplates', <DocumentTemplateManagerPage />) },
      { path: 'documents/verification', element: guard('documentVerification', <DocumentVerificationPage />) },
      { path: 'documents/:id/workspace', element: guard('documentWorkspace', <DocumentWorkspacePage />) },
      { path: 'documents/:id/preview-release', element: guard('documentPreviewRelease', <DocumentPreviewReleasePage />) },

      // Collections
      { path: 'collections/reference-log', element: guard('collectionReferenceLog', <CollectionReferenceLogPage />) },
      { path: 'collections/daily-certification', element: guard('collectionDailyCertification', <DailyCollectionCertificationPage />) },
      { path: 'collections/fees-exemptions', element: guard('collectionFeesExemptions', <FeeTableExemptionPage />) },

      // Blotter & KP
      { path: 'blotter', element: guard('blotterRegistry', <BlotterRegistryPage />) },
      { path: 'blotter/intake', element: guard('blotterIntake', <BlotterIntakePage />) },
      { path: 'kp-cases', element: guard('kpCases', <KPCaseTrackerPage />) },
      { path: 'kp/notices-schedule', element: guard('kpNoticesSchedule', <KPNoticesSchedulePage />) },
      { path: 'kp/minutes-settlement', element: guard('kpMinutesSettlement', <KPMinutesSettlementPage />) },

      // DRRM
      { path: 'drrm', element: guard('drrmDashboard', <DRRMDashboardPage />) },
      { path: 'drrm/early-warning', element: guard('drrmEarlyWarning', <EarlyWarningPreparednessPage />) },
      { path: 'drrm/sitrep', element: guard('drrmSitrep', <SitRepBuilderPage />) },
      { path: 'drrm/dana', element: guard('drrmDana', <DANAFormPage />) },
      { path: 'drrm/evacuation-dromic', element: guard('drrmEvacuationDromic', <EvacuationDromicPage />) },
      { path: 'drrm/hazard-risk', element: guard('drrmHazardRisk', <HazardRiskRegisterPage />) },
      { path: 'drrm/resources', element: guard('drrmResources', <DRRMResourcesPage />) },
      { path: 'drrm/relief-distribution', element: guard('drrmReliefDistribution', <ReliefDistributionPage />) },
      { path: 'drrm/actions', element: guard('drrmActions', <BDRRMCActionTrackerPage />) },

      // GAD
      { path: 'gad', element: guard('gadDashboard', <GADDashboardPage />) },
      { path: 'gad/annex-d1', element: guard('gadAnnexD1', <AnnexD1WorkspacePage />) },
      { path: 'gad/annex-e1', element: guard('gadAnnexE1', <AnnexE1WorkspacePage />) },
      { path: 'gad/activity-monitor', element: guard('gadActivityMonitor', <GADActivityMonitorPage />) },
      { path: 'gad/participants', element: guard('gadParticipants', <ParticipantLogPage />) },
      { path: 'gad/budget-attribution', element: guard('gadBudgetAttribution', <GADBudgetAttributionPage />) },

      // Reports & Review
      { path: 'reports', element: guard('reports', <ReportsExportCenterPage />) },
      { path: 'review/municipal-city', element: guard('municipalReview', <MunicipalReviewDashboardPage />) },
      { path: 'review/comments', element: guard('reviewComments', <ReviewerCommentLoopPage />) },
      { path: 'compliance/sglgb', element: guard('complianceSglgb', <ComplianceChecklistPage />) },
      { path: 'data-quality', element: guard('dataQuality', <DataQualityDashboardPage />) },

      // Admin
      { path: 'admin/users-roles', element: guard('adminUsersRoles', <UserRoleAdminPage />) },
      { path: 'admin/audit', element: guard('adminAudit', <AuditTrailViewerPage />) },
      { path: 'admin/backup-sync', element: guard('adminBackupSync', <BackupSyncMonitorPage />) },
      { path: 'admin/settings', element: guard('adminSettings', <SettingsPage />) },

      // Roadmap
      { path: 'roadmap', element: guard('roadmap', <FutureModulesPage />) },
      // Individual roadmap placeholders redirect to main roadmap
      { path: 'roadmap/*', element: guard('roadmap', <FutureModulesPage />) },

      // Attachments (placeholder)
      { path: 'attachments', element: guard('attachments', <Navigate to="/residents" replace />) },
    ],
  },

  // Catch-all redirect
  { path: '*', element: <Navigate to="/login-demo" replace /> },
]);
