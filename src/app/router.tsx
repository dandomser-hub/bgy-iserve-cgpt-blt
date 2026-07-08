import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell';

// Auth
import { RoleSelectorPage } from '@/modules/auth/RoleSelectorPage';

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
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <ExecutiveDashboardPage /> },

      // Residents
      { path: 'residents', element: <ResidentRegistryPage /> },
      { path: 'residents/duplicates', element: <ResidentDuplicateReviewPage /> },
      { path: 'residents/status-management', element: <ResidentStatusManagementPage /> },
      { path: 'residents/:id', element: <ResidentProfilePage /> },
      { path: 'households', element: <HouseholdRegistryPage /> },

      // Documents
      { path: 'documents/intake', element: <DocumentRequestIntakePage /> },
      { path: 'documents/queue', element: <DocumentQueuePage /> },
      { path: 'documents/templates', element: <DocumentTemplateManagerPage /> },
      { path: 'documents/verification', element: <DocumentVerificationPage /> },
      { path: 'documents/:id/workspace', element: <DocumentWorkspacePage /> },
      { path: 'documents/:id/preview-release', element: <DocumentPreviewReleasePage /> },

      // Collections
      { path: 'collections/reference-log', element: <CollectionReferenceLogPage /> },
      { path: 'collections/daily-certification', element: <DailyCollectionCertificationPage /> },
      { path: 'collections/fees-exemptions', element: <FeeTableExemptionPage /> },

      // Blotter & KP
      { path: 'blotter', element: <BlotterRegistryPage /> },
      { path: 'blotter/intake', element: <BlotterIntakePage /> },
      { path: 'kp-cases', element: <KPCaseTrackerPage /> },
      { path: 'kp/notices-schedule', element: <KPNoticesSchedulePage /> },
      { path: 'kp/minutes-settlement', element: <KPMinutesSettlementPage /> },

      // DRRM
      { path: 'drrm', element: <DRRMDashboardPage /> },
      { path: 'drrm/early-warning', element: <EarlyWarningPreparednessPage /> },
      { path: 'drrm/sitrep', element: <SitRepBuilderPage /> },
      { path: 'drrm/dana', element: <DANAFormPage /> },
      { path: 'drrm/evacuation-dromic', element: <EvacuationDromicPage /> },
      { path: 'drrm/hazard-risk', element: <HazardRiskRegisterPage /> },
      { path: 'drrm/resources', element: <DRRMResourcesPage /> },
      { path: 'drrm/relief-distribution', element: <ReliefDistributionPage /> },
      { path: 'drrm/actions', element: <BDRRMCActionTrackerPage /> },

      // GAD
      { path: 'gad', element: <GADDashboardPage /> },
      { path: 'gad/annex-d1', element: <AnnexD1WorkspacePage /> },
      { path: 'gad/annex-e1', element: <AnnexE1WorkspacePage /> },
      { path: 'gad/activity-monitor', element: <GADActivityMonitorPage /> },
      { path: 'gad/participants', element: <ParticipantLogPage /> },
      { path: 'gad/budget-attribution', element: <GADBudgetAttributionPage /> },

      // Reports & Review
      { path: 'reports', element: <ReportsExportCenterPage /> },
      { path: 'review/municipal-city', element: <MunicipalReviewDashboardPage /> },
      { path: 'review/comments', element: <ReviewerCommentLoopPage /> },
      { path: 'compliance/sglgb', element: <ComplianceChecklistPage /> },
      { path: 'data-quality', element: <DataQualityDashboardPage /> },

      // Admin
      { path: 'admin/users-roles', element: <UserRoleAdminPage /> },
      { path: 'admin/audit', element: <AuditTrailViewerPage /> },
      { path: 'admin/backup-sync', element: <BackupSyncMonitorPage /> },
      { path: 'admin/settings', element: <SettingsPage /> },

      // Roadmap
      { path: 'roadmap', element: <FutureModulesPage /> },
      // Individual roadmap placeholders redirect to main roadmap
      { path: 'roadmap/*', element: <FutureModulesPage /> },

      // Attachments (placeholder)
      { path: 'attachments', element: <Navigate to="/residents" replace /> },
    ],
  },

  // Catch-all redirect
  { path: '*', element: <Navigate to="/login-demo" replace /> },
]);
