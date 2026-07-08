import { ChevronDown, Send } from 'lucide-react';
import { useState } from 'react';
import { PageScaffold } from '@/components/shared/PageScaffold';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { StatusChip, Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockSitReps } from '@/data/mockDRRM';
import type { SitRep } from '@/types/drrm';
import { formatDate, formatDateTime } from '@/utils/formatters';

type Lifeline = { lifeline: string; status: string };

export function SitRepBuilderPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const handleSubmit = (id: string) => {
    setSubmittingId(id);
    setTimeout(() => setSubmittingId(null), 2000);
  };

  // List view table columns
  const columns: Column<SitRep>[] = [
    { key: 'sitRepNo', header: 'SitRep No.', render: s => <span className="font-mono text-sm font-semibold">{s.sitRepNo}</span> },
    { key: 'eventName', header: 'Event Name', render: s => s.eventName },
    { key: 'reportingPeriod', header: 'Reporting Period', render: s => <span className="text-xs">{s.reportingPeriod}</span> },
    { key: 'version', header: 'Version', render: s => <Badge label={`v${s.version}`} variant="default" /> },
    { key: 'status', header: 'Status', render: s => <StatusChip status={s.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: s => (
        <button onClick={() => setExpandedId(expandedId === s.id ? null : s.id)} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">
          <ChevronDown size={14} className={`transition ${expandedId === s.id ? 'rotate-180' : ''}`} />
          Details
        </button>
      ),
    },
  ];

  return (
    <PageScaffold
      title="Situation Report (SitRep) Builder"
      subtitle="Create and manage situational reports for emergencies"
      breadcrumbs={[{ label: 'DRRM' }, { label: 'SitRep' }]}
      moduleTag="DRRM"
      priorityTag="P0"
    >
      {/* List View */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mb-6">
        <DataTable columns={columns} data={mockSitReps} rowKey={s => s.id} />
        {mockSitReps.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            <p className="text-sm">No SitReps created yet.</p>
          </div>
        )}
      </div>

      {/* Expanded Detail View */}
      {expandedId && (
        <div className="space-y-6">
          {mockSitReps
            .filter(s => s.id === expandedId)
            .map(sitRep => (
              <Card key={sitRep.id}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{sitRep.sitRepNo}</h3>
                    <p className="text-sm text-slate-600 mt-1">{sitRep.eventName}</p>
                  </div>
                  <StatusChip status={sitRep.status} />
                </div>

                <div className="p-6 space-y-6">
                  {/* Header Info */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Event Name</p>
                      <p className="font-semibold text-slate-800">{sitRep.eventName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Reporting Period</p>
                      <p className="font-semibold text-slate-800 text-sm">{sitRep.reportingPeriod}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Version</p>
                      <p className="font-semibold text-slate-800">v{sitRep.version}</p>
                    </div>
                  </div>

                  {/* Affected Areas */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Affected Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {sitRep.affectedAreas.map((area, idx) => (
                        <Badge key={idx} label={area} variant="default" />
                      ))}
                    </div>
                  </div>

                  {/* Casualty Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Casualties</p>
                      <p className="text-2xl font-bold text-red-600">{sitRep.casualties}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Injuries</p>
                      <p className="text-2xl font-bold text-amber-600">{sitRep.injuries}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Missing</p>
                      <p className="text-2xl font-bold text-slate-600">{sitRep.missingPersons}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Families</p>
                      <p className="text-2xl font-bold text-ocean">{sitRep.affectedFamilies}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Persons</p>
                      <p className="text-2xl font-bold text-sky">{sitRep.affectedPersons}</p>
                    </div>
                  </div>

                  {/* Lifelines Status */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-3">Lifelines Status</p>
                    <div className="space-y-2">
                      {sitRep.lifelinesStatus.map((lifeline, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded">
                          <span className="font-semibold text-slate-800">{lifeline.lifeline}</span>
                          <span className="text-sm text-slate-700">{lifeline.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Immediate Needs */}
                  {sitRep.immediateNeeds.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Immediate Needs</p>
                      <ul className="space-y-1">
                        {sitRep.immediateNeeds.map((need, idx) => (
                          <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                            {need}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions Taken */}
                  {sitRep.actionsTaken.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Actions Taken</p>
                      <ul className="space-y-1">
                        {sitRep.actionsTaken.map((action, idx) => (
                          <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-grass-500 rounded-full"></span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Prepared By */}
                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Prepared By</p>
                      <p className="font-semibold text-slate-800">{sitRep.preparedBy}</p>
                    </div>
                    {sitRep.submittedBy && (
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Submitted By</p>
                        <p className="font-semibold text-slate-800">{sitRep.submittedBy}</p>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  {sitRep.status !== 'Archived' && sitRep.status !== 'Approved' && (
                    <div className="pt-4 border-t border-slate-200">
                      <Button
                        onClick={() => handleSubmit(sitRep.id)}
                        className="flex items-center gap-2 bg-forest hover:bg-forest-dark text-white"
                      >
                        <Send size={16} />
                        {submittingId === sitRep.id ? 'Submitting...' : 'Submit Report'}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
        </div>
      )}
    </PageScaffold>
  );
}
