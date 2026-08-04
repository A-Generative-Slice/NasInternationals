import React from 'react';
import { ShieldAlert, ArrowLeft, KeyRound, Lock, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AccessDeniedView: React.FC = () => {
  const { currentUser, navigateTo, openAuthModal } = useApp();

  return (
    <div className="bg-[#EBF3FF]/60 min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-xl border border-slate-200 text-center space-y-6 relative overflow-hidden">
        
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-amber-500 to-[#0B1E3D]"></div>

        {/* Big Shield Badge */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-inner">
          <ShieldAlert className="w-10 h-10" />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0B1E3D] text-[#EAC166] flex items-center justify-center border-2 border-white">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Main 403 Header */}
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-100 text-rose-900 border border-rose-200 uppercase tracking-widest">
            <span>HTTP 403</span>
            <span>•</span>
            <span>FORBIDDEN ACCESS</span>
          </span>
          
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#0B1E3D] tracking-tight">
            Access Denied
          </h1>
          
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            You do not have administrative permissions to view the <strong>NAS Internationals Admin Operations Console</strong>.
          </p>
        </div>

        {/* User Role Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">Authenticated Account:</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 text-[#036CFB] border border-blue-200 uppercase">
              ROLE: {currentUser?.role || 'USER'}
            </span>
          </div>
          <div className="font-mono text-slate-800 font-semibold truncate">
            {currentUser?.name || 'Standard User'} ({currentUser?.email || 'user@example.com'})
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Security Policy: System roles are stored using strict ENUM checks (<code className="bg-slate-200 px-1 py-0.5 rounded text-slate-900 font-mono">USER</code> or <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-900 font-mono">ADMIN</code>). Standard <code className="font-mono">USER</code> accounts are prevented from accessing global metrics, ledgers, or applicant management tools.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigateTo('/dashboard')}
            className="flex-1 py-3 px-5 bg-[#036CFB] hover:bg-[#0B1E3D] text-white font-display font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to User Dashboard (/dashboard)</span>
          </button>
          
          <button
            onClick={() => navigateTo('/admin/login')}
            className="flex-1 py-3 px-5 bg-[#0B1E3D] hover:bg-slate-900 text-[#EAC166] font-display font-bold text-xs rounded-xl border border-[#C8A24A]/40 shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Admin Portal Login (/admin/login)</span>
          </button>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <button
            onClick={() => openAuthModal('login')}
            className="text-xs text-slate-500 hover:text-[#036CFB] underline font-medium"
          >
            Sign Out & Switch Account
          </button>
        </div>

      </div>
    </div>
  );
};
