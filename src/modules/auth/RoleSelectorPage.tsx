import { useNavigate } from 'react-router-dom';
import { Shield, Star, FileText, Wallet, AlertTriangle, Users, Eye, Search } from 'lucide-react';
import { useRole } from '@/app/providers/RoleProvider';
import { ROLES } from '@/utils/constants';
import { APP_NAME, APP_TAGLINE } from '@/utils/constants';
import type { RoleId } from '@/types/auth';

const ROLE_ICONS: Record<string, React.ReactNode> = {
  system_admin: <Shield size={22} />,
  punong_barangay: <Star size={22} />,
  barangay_secretary: <FileText size={22} />,
  barangay_treasurer: <Wallet size={22} />,
  drrm_focal: <AlertTriangle size={22} />,
  gad_focal: <Users size={22} />,
  municipal_reviewer: <Eye size={22} />,
  read_only_auditor: <Search size={22} />,
};

const ROLE_BG: Record<string, string> = {
  system_admin: 'from-slate-600 to-slate-800',
  punong_barangay: 'from-forest to-forest-dark',
  barangay_secretary: 'from-ocean to-cyan-800',
  barangay_treasurer: 'from-mountain to-green-800',
  drrm_focal: 'from-sky to-blue-700',
  gad_focal: 'from-grass to-green-700',
  municipal_reviewer: 'from-amber-500 to-amber-700',
  read_only_auditor: 'from-slate-400 to-slate-600',
};

export function RoleSelectorPage() {
  const { setRole } = useRole();
  const navigate = useNavigate();

  function handleSelect(roleId: RoleId) {
    setRole(roleId);
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-dark via-forest to-ocean flex flex-col">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xl">
            <span className="text-forest font-black text-lg">iS</span>
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
            <p className="text-green-200 text-xs">Prototype Demo</p>
          </div>
        </div>
        <p className="text-green-100 text-sm max-w-lg mx-auto opacity-90">{APP_TAGLINE}</p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400/20 border border-amber-400/30 rounded-full">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-amber-200 text-xs font-medium">Demo Mode — Select a role to explore</span>
        </div>
      </div>

      {/* Role grid */}
      <div className="flex-1 px-4 pb-12 max-w-5xl mx-auto w-full">
        <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest text-center mb-6">Choose your demo role</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map(role => (
            <button
              key={role.id}
              onClick={() => handleSelect(role.id as RoleId)}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className={`w-11 h-11 bg-gradient-to-br ${ROLE_BG[role.id]} rounded-xl flex items-center justify-center text-white mb-3 shadow-lg`}>
                {ROLE_ICONS[role.id]}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{role.label}</h3>
              <p className="text-green-200/70 text-xs leading-relaxed">{role.description}</p>
              <div className="mt-3 flex items-center gap-1.5 text-green-300 text-xs font-medium group-hover:gap-2.5 transition-all">
                <span>Select role</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-green-300/60 text-xs max-w-2xl mx-auto">
            This is a <strong className="text-green-300/80">prototype demo only</strong>. No real authentication, real resident data, real payments, or sensitive records are used. All data is fictional.
          </p>
        </div>
      </div>
    </div>
  );
}
