import { Users, MapPin, Clock } from 'lucide-react';
import { PageScaffold } from '@/components/shared/PageScaffold';
import { Card } from '@/components/ui/Card';
import { StatusChip, Badge } from '@/components/ui/Badge';
import { mockEvacuationRecords } from '@/data/mockDRRM';
import { formatDate } from '@/utils/formatters';

export function EvacuationDromicPage() {
  return (
    <PageScaffold
      title="Evacuation Center DROMIC"
      subtitle="Displaced Resident Operations Monitoring Information System"
      breadcrumbs={[{ label: 'DRRM' }, { label: 'Evacuation Centers' }]}
      moduleTag="DRRM"
      priorityTag="P0"
    >
      {/* Evacuation Centers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockEvacuationRecords.map(center => (
          <Card key={center.id} className={center.status === 'Open' ? 'border-sky-200 border-2' : ''}>
            <div className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-b border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{center.evacuationCenterName}</h3>
                  <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    {center.address}
                  </p>
                </div>
                <StatusChip status={center.status} />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-white border border-sky-200 rounded">
                  <p className="text-xs text-sky-600 font-semibold uppercase">Families</p>
                  <p className="text-2xl font-bold text-sky-800">{center.displacedFamilies}</p>
                </div>
                <div className="p-2 bg-white border border-sky-200 rounded">
                  <p className="text-xs text-sky-600 font-semibold uppercase">Persons</p>
                  <p className="text-2xl font-bold text-sky-800">{center.displacedPersons}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Demographics Breakdown */}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-3">Demographics Breakdown</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-sm text-slate-700">Males</span>
                    <span className="font-bold text-slate-800">{center.males}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-sm text-slate-700">Females</span>
                    <span className="font-bold text-slate-800">{center.females}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-sm text-slate-700">Children</span>
                    <span className="font-bold text-slate-800">{center.children}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-sm text-slate-700">Seniors</span>
                    <span className="font-bold text-slate-800">{center.seniors}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-sm text-slate-700">PWD</span>
                    <span className="font-bold text-slate-800">{center.pwdCount}</span>
                  </div>
                </div>
              </div>

              {/* Origin Puroks */}
              {center.originPuroks.length > 0 && (
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Origin Puroks</p>
                  <div className="flex flex-wrap gap-2">
                    {center.originPuroks.map((purok, idx) => (
                      <Badge key={idx} label={purok} variant="default" className="text-xs" />
                    ))}
                  </div>
                </div>
              )}

              {/* Needs */}
              {center.needs.length > 0 && (
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Needs</p>
                  <div className="flex flex-wrap gap-2">
                    {center.needs.map((need, idx) => (
                      <Badge key={idx} label={need} variant="warning" className="text-xs" />
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Info */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Clock size={14} />
                    Reporting Date
                  </span>
                  <span className="font-semibold text-slate-800">{formatDate(center.reportingDate)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Users size={14} />
                    Managed By
                  </span>
                  <span className="font-semibold text-slate-800">{center.managedBy}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockEvacuationRecords.length === 0 && (
        <Card className="text-center py-12 bg-slate-50 border-slate-200">
          <p className="text-slate-600 font-medium">No evacuation centers on record</p>
        </Card>
      )}
    </PageScaffold>
  );
}
