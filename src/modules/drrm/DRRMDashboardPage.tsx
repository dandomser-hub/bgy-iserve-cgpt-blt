import { AlertTriangle, Users, FileText, Package, BarChart3, Truck } from 'lucide-react';
import { Card, StatCard } from '@/components/ui/Card';
import { PageScaffold } from '@/components/shared/PageScaffold';
import { StatusChip, Badge } from '@/components/ui/Badge';
import { mockEarlyWarnings, mockSitReps, mockEvacuationRecords, mockDANARecords, mockDRRMResources, mockReliefDistributions, mockBDRRMCActions } from '@/data/mockDRRM';
import { formatDateTime, formatDate } from '@/utils/formatters';

export function DRRMDashboardPage() {
  // Calculate metrics
  const activeAlerts = mockEarlyWarnings.filter(e => e.status === 'Active').length;
  const affectedFamilies = mockEvacuationRecords.reduce((sum, r) => sum + r.displacedFamilies, 0);
  const activeReports = mockSitReps.filter(s => ['Draft', 'Submitted', 'Approved'].includes(s.status)).length;
  const pendingDANA = mockDANARecords.filter(d => d.status === 'Draft').length;
  const availableResources = mockDRRMResources.filter(r => r.availability === 'Available').length;
  const totalDistributions = mockReliefDistributions.length;

  return (
    <PageScaffold
      title="DRRM Operations Dashboard"
      subtitle="Real-time disaster risk reduction and emergency management overview"
      breadcrumbs={[{ label: 'DRRM' }, { label: 'Dashboard' }]}
      moduleTag="DRRM"
      priorityTag="P0"
    >
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Active Alerts"
          value={activeAlerts}
          subtitle="Early warnings"
          icon={<AlertTriangle size={20} />}
          color={activeAlerts > 0 ? 'red' : 'slate'}
        />
        <StatCard
          title="Affected Families"
          value={affectedFamilies}
          subtitle="Total displaced"
          icon={<Users size={20} />}
          color="sky"
        />
        <StatCard
          title="Active SitReps"
          value={activeReports}
          subtitle="Situation reports"
          icon={<FileText size={20} />}
          color="ocean"
        />
        <StatCard
          title="Pending DANA"
          value={pendingDANA}
          subtitle="Assessments"
          icon={<BarChart3 size={20} />}
          color="amber"
        />
        <StatCard
          title="Resources"
          value={availableResources}
          subtitle="Available items"
          icon={<Package size={20} />}
          color="grass"
        />
        <StatCard
          title="Distributions"
          value={totalDistributions}
          subtitle="Relief given"
          icon={<Truck size={20} />}
          color="slate"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Early Warnings Section */}
        <Card>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-600" />
              Active Early Warnings
            </h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
              {activeAlerts}
            </span>
          </div>
          <div className="p-5 space-y-3 max-h-80 overflow-y-auto">
            {mockEarlyWarnings.filter(e => e.status === 'Active').length > 0 ? (
              mockEarlyWarnings
                .filter(e => e.status === 'Active')
                .map(alert => (
                  <div key={alert.id} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-amber-900 text-sm">{alert.alertType}</p>
                        <p className="text-xs text-amber-700 mt-1">{alert.affectedAreas.join(', ')}</p>
                      </div>
                      <Badge
                        label={alert.severity}
                        className={`text-xs ${
                          alert.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                          alert.severity === 'High' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed mt-2">{alert.message}</p>
                  </div>
                ))
            ) : (
              <p className="text-sm text-slate-500 py-4">No active alerts</p>
            )}
          </div>
        </Card>

        {/* Evacuation Status */}
        <Card>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Users size={18} className="text-sky-600" />
              Evacuation Centers
            </h3>
            <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded">
              {mockEvacuationRecords.filter(e => e.status === 'Open').length}
            </span>
          </div>
          <div className="p-5 space-y-3">
            {mockEvacuationRecords.filter(e => e.status === 'Open').length > 0 ? (
              mockEvacuationRecords
                .filter(e => e.status === 'Open')
                .map(center => (
                  <div key={center.id} className="p-3 bg-sky-50 border border-sky-200 rounded-lg">
                    <p className="font-semibold text-sky-900 text-sm">{center.evacuationCenterName}</p>
                    <div className="flex justify-between mt-2 text-xs text-sky-700">
                      <span>{center.displacedFamilies} families</span>
                      <span>{center.displacedPersons} persons</span>
                      <StatusChip status={center.status} />
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-sm text-slate-500 py-4">No open evacuation centers</p>
            )}
          </div>
        </Card>
      </div>

      {/* Recent BDRRMC Actions */}
      <Card>
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <BarChart3 size={18} className="text-forest" />
            Recent BDRRMC Actions
          </h3>
        </div>
        <div className="p-5 space-y-4">
          {mockBDRRMCActions.slice(0, 2).map(action => (
            <div key={action.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-800">{action.agenda}</p>
                <StatusChip status={action.status} />
              </div>
              <p className="text-xs text-slate-600 mb-3">{formatDate(action.meetingDate)}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Decisions</p>
                  <ul className="text-xs text-slate-700 space-y-1 ml-3">
                    {action.decisions.slice(0, 3).map((decision, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer note */}
      <div className="mt-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <p className="text-xs text-sky-700">
          <span className="font-semibold">Last Updated:</span> {formatDateTime(new Date().toISOString())} |
          <span className="ml-2 font-semibold">Prepared by:</span> DRRM Office
        </p>
      </div>
    </PageScaffold>
  );
}
