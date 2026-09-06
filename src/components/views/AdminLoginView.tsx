import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Key, ArrowRight, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLoginView: React.FC = () => {
  const { loginAdmin, navigateTo } = useApp();

  const [email, setEmail] = useState('admin@nas.com');
  const [password, setPassword] = useState('admin123');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [num1] = useState(7);
  const [num2] = useState(4);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validate CAPTCHA
    if (parseInt(captchaAnswer.trim(), 10) !== num1 + num2) {
      setErrorMsg(`CAPTCHA Verification Failed. What is ${num1} + ${num2}?`);
      return;
    }

    setIsLoading(true);

    try {
      const success = await loginAdmin(email, password, captchaAnswer);
      if (success) {
        navigateTo('/admin/dashboard');
      } else {
        setErrorMsg('Authentication failed. Verify credentials or role permissions.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Admin authentication server error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0B1E3D] min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 pb-28 sm:pb-6 text-white relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#036CFB_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="bg-[#0f274e] rounded-3xl p-6 sm:p-10 max-w-md w-full border border-slate-700/80 shadow-2xl relative z-10 space-y-6">
        
        {/* Header Header & Badge */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-[11px] font-bold bg-[#036CFB]/15 text-[#38BDF8] border border-[#036CFB]/30 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Administrator Console</span>
          </div>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#036CFB] text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-[#036CFB]/25">
            NAS
          </div>

          <h1 className="font-display font-extrabold text-2xl text-white tracking-tight">
            Administrator Console Login
          </h1>
          <p className="text-xs text-slate-300">
            Restricted System Access. Only authorized NAS Internationals administrators are permitted.
          </p>
        </div>

        {/* Security Alert Banner */}
        <div className="bg-[#0B1E3D] p-3.5 rounded-2xl border border-blue-500/30 text-xs text-blue-200/90 flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            Demo Credentials Pre-filled: <code className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">admin@nas.com</code> / <code className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">admin123</code>. Unauthorized attempts are logged with client IP.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-500/20 text-rose-200 border border-rose-500/50 p-3 rounded-xl text-xs flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAdminSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nas.com"
                className="w-full bg-[#0B1E3D] border border-slate-600 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#036CFB] focus:ring-1 focus:ring-[#036CFB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Security Key / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0B1E3D] border border-slate-600 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#036CFB] focus:ring-1 focus:ring-[#036CFB]"
              />
            </div>
          </div>

          {/* Math CAPTCHA Challenge */}
          <div className="bg-[#0B1E3D] p-3.5 rounded-2xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Security Math CAPTCHA</span>
              </span>
              <span className="font-mono text-emerald-400 text-[11px]">Human Verified</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="px-3 py-2 bg-slate-800 font-mono font-bold text-sm text-[#38BDF8] rounded-xl border border-slate-700 shrink-0 select-none">
                {num1} + {num2} = ?
              </div>
              <input
                type="text"
                required
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="Answer"
                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl p-2 text-xs text-white font-mono text-center focus:outline-none focus:border-[#036CFB]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#036CFB] hover:bg-[#0256c7] text-white font-display font-bold text-xs rounded-xl shadow-lg shadow-[#036CFB]/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Authenticating Admin Token...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            onClick={() => navigateTo('/')}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Return to Public Website
          </button>
        </div>

      </div>
    </div>
  );
};
