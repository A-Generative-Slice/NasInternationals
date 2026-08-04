import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, Shield, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, KeyRound } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, loginUser, registerUser, requestForgotPassword, verifyOTP, resetPassword, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(authModalMode || 'login');

  // Login State
  const [loginEmail, setLoginEmail] = useState('client@nas.com');
  const [loginPassword, setLoginPassword] = useState('user123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginCaptcha, setLoginCaptcha] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regCaptcha, setRegCaptcha] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Feedback Messages
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync modal mode from context if changed
  React.useEffect(() => {
    if (authModalMode) {
      setActiveTab(authModalMode);
    }
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    setIsLoading(true);
    try {
      const result = await loginUser(loginEmail, loginPassword, rememberMe);
      if (result.success) {
        closeAuthModal();
        if (result.user.role === 'ADMIN') {
          navigateTo('/admin/dashboard');
        } else {
          navigateTo('/dashboard');
        }
      } else {
        setErrorMsg(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setErrorMsg('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!otpSent) {
      setIsLoading(true);
      setTimeout(() => {
        setOtpSent(true);
        setIsLoading(false);
        setSuccessMsg('Email OTP code sent to ' + regEmail + ' (Demo OTP: 849201)');
      }, 600);
      return;
    }

    if (enteredOtp !== '849201' && enteredOtp !== '123456' && enteredOtp.length < 4) {
      setErrorMsg('Invalid OTP Code. Demo OTP is 849201.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerUser(regName, regEmail, regPhone, regPassword);
      if (result.success) {
        closeAuthModal();
        navigateTo('/dashboard');
      } else {
        setErrorMsg(result.error || 'Registration failed.');
      }
    } catch (err: any) {
      setErrorMsg('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await requestForgotPassword(forgotEmail);
      setForgotStep('otp');
      setSuccessMsg(res.message);
    } catch (err: any) {
      setErrorMsg('Failed to send verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await verifyOTP(forgotEmail, forgotOtp);
      if (res.verified) {
        setForgotStep('reset');
        setSuccessMsg('OTP verified! Enter your new password below.');
      } else {
        setErrorMsg(res.error || 'Invalid OTP code.');
      }
    } catch (err: any) {
      setErrorMsg('OTP verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await resetPassword(forgotEmail, forgotOtp, newPassword);
      setSuccessMsg(res.message);
      setTimeout(() => {
        setActiveTab('login');
        setForgotStep('email');
      }, 1200);
    } catch (err: any) {
      setErrorMsg('Password reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Logo Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#0B1E3D] text-[#EAC166] flex items-center justify-center font-extrabold text-sm shadow-md">
            NAS
          </div>
          <div>
            <h2 className="font-display font-black text-[#0B1E3D] text-lg leading-tight">
              NAS INTERNATIONALS
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">Tours & Travel Portal Authentication</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl mb-6">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'login'
                ? 'bg-[#0B1E3D] text-[#EAC166] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'register'
                ? 'bg-[#0B1E3D] text-[#EAC166] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Messages */}
        {errorMsg && (
          <div className="mb-4 bg-rose-50 text-rose-700 border border-rose-200 p-3 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 bg-emerald-50 text-emerald-800 border border-emerald-200 p-3 rounded-xl text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="client@nas.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#036CFB]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setActiveTab('forgot')}
                  className="text-[11px] font-semibold text-[#036CFB] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-900 focus:ring-2 focus:ring-[#036CFB]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#036CFB] focus:ring-[#036CFB]"
                />
                <span className="text-xs text-slate-600 font-medium">Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#036CFB] hover:bg-[#0B1E3D] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to User Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 2: REGISTER */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#036CFB]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#036CFB]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (+91)</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#036CFB]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#036CFB]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#036CFB]"
                />
              </div>
            </div>

            {/* OTP Verification Box */}
            {otpSent && (
              <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200 space-y-2">
                <label className="block text-xs font-bold text-blue-900">Enter Email 6-Digit OTP</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder="e.g. 849201"
                    className="flex-1 bg-white border border-blue-300 rounded-xl p-2 text-xs font-mono font-bold text-center text-blue-900 focus:ring-2 focus:ring-[#036CFB]"
                  />
                  <span className="px-3 py-2 text-xs bg-emerald-100 text-emerald-800 rounded-xl font-bold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> OTP Ready
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#036CFB] hover:bg-[#0B1E3D] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : otpSent ? (
                <>
                  <span>Verify OTP & Create Account</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Send OTP & Register USER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 3: FORGOT PASSWORD */}
        {activeTab === 'forgot' && (
          <div className="space-y-4">
            <h3 className="font-display font-bold text-[#0B1E3D] text-sm">Reset Password</h3>
            
            {forgotStep === 'email' && (
              <form onSubmit={handleForgotStep1} className="space-y-3">
                <p className="text-xs text-slate-600">Enter your registered account email to receive a 6-digit OTP reset code.</p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="client@nas.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#036CFB]"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#036CFB] text-white text-xs font-bold rounded-xl"
                >
                  Send OTP Code
                </button>
              </form>
            )}

            {forgotStep === 'otp' && (
              <form onSubmit={handleForgotStep2} className="space-y-3">
                <p className="text-xs text-slate-600">Enter the 6-digit verification code sent to {forgotEmail}:</p>
                <input
                  type="text"
                  required
                  value={forgotOtp}
                  onChange={(e) => setForgotOtp(e.target.value)}
                  placeholder="e.g. 849201"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-bold text-center"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#036CFB] text-white text-xs font-bold rounded-xl"
                >
                  Verify Code
                </button>
              </form>
            )}

            {forgotStep === 'reset' && (
              <form onSubmit={handleForgotStep3} className="space-y-3">
                <p className="text-xs text-slate-600">Set your new account password:</p>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password (min 6 characters)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Reset Password & Login
                </button>
              </form>
            )}

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="text-xs text-slate-500 hover:text-[#036CFB] font-medium"
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
