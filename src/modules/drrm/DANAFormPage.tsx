import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { PageScaffold } from '@/components/shared/PageScaffold';
import { Card } from '@/components/ui/Card';
import { StatusChip, Badge } from '@/components/ui/Badge';
import { mockDANARecords } from '@/data/mockDRRM';
import type { DANARecord } from '@/types/drrm';
import { formatDate, formatCurrency } from '@/utils/formatters';

export function DANAFormPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <PageScaffold
      title="DANA Assessment Forms"
      subtitle="Damage and Needs Assessment records"
      breadcrumbs={[{ label: 'DRRM' }, { label: 'DANA' }]}
      moduleTag="DRRM"
      priorityTag="P0"
    >
      {/* DANA Records List */}
      <div className="grid grid-cols-1 gap-4">
        {mockDANARecords.map(dana => (
          <Card key={dana.id}>
            <div
              onClick={() => setExpandedId(expandedId === dana.id ? null : dana.id)}
              className="p-5 border-b border-slate-100 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition"
            >
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="font-mono text-sm">{dana.danaNo}</span>
                  <Badge variant="default" className="text-xs" label={dana.sector} />
                </h3>
                <p className="text-sm text-slate-600 mt-1">{dana.eventName} · {formatDate(dana.assessmentDate)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-forest">{formatCurrency(dana.estimatedDamage)}</p>
                  <p className="text-xs text-slate-500">Damage estimate</p>
                </div>
                <StatusChip status={dana.validationStatus} />
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition ${expandedId === dana.id ? 'rotate-180' : ''}`}
                />
              </div>
            </div>

            {/* Expanded Details */}
            {expandedId === dana.id && (
              <div className="p-6 bg-slate-50 space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Assessment Date</p>
                    <p className="font-semibold text-slate-800">{formatDate(dana.assessmentDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Event Name</p>
                    <p className="font-semibold text-slate-800">{dana.eventName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Sector</p>
                    <p className="font-semibold text-slate-800">{dana.sector}</p>
                  </div>
                </div>

                {/* Affected Numbers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Households</p>
                    <p className="text-xl font-bold text-ocean">{dana.affectedHouseholds}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Persons</p>
                    <p className="text-xl font-bold text-sky">{dana.affectedPersons}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Est. Damage</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(dana.estimatedDamage)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Validation</p>
                    <StatusChip status={dana.validationStatus} />
                  </div>
                </div>

                {/* Damage Description */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Damage Description</p>
                  <p className="text-slate-700 leading-relaxed p-3 bg-white border border-slate-200 rounded">
                    {dana.damageDescription}
                  </p>
                </div>

                {/* Immediate Needs */}
                {dana.immediateNeeds && dana.immediateNeeds.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Immediate Needs</p>
                    <ul className="space-y-1">
                      {dana.immediateNeeds.map((need, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Assessment Info */}
                <div className="pt-4 border-t border-slate-300 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Assessed By</p>
                    <p className="font-semibold text-slate-800">{dana.assessedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Status</p>
                    <StatusChip status={dana.status} />
                  </div>
                </div>

                {/* Evidence Notes */}
                {dana.evidenceNotes && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-xs text-blue-600 font-semibold uppercase mb-2">Evidence Notes</p>
                    <p className="text-sm text-blue-900">{dana.evidenceNotes}</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockDANARecords.length === 0 && (
        <Card className="text-center py-12 bg-slate-50 border-slate-200">
          <p className="text-slate-600 font-medium">No DANA records found</p>
        </Card>
      )}
    </PageScaffold>
  );
}
