import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Plane, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/logo.jpg';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, loginUser, registerUser, navigateTo } = useApp();

  const [authMethod, setAuthMethod] = useState<'mobile' | 'email' | 'register'>('mobile');
  
  // Mobile Auth State
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');

  // Email Auth State
  const [email, setEmail] = useState('client@nas.com');
  const [password, setPassword] = useState('user123');

  // Register State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Feedback Messages
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!mobileNumber || mobileNumber.length < 8) {
      setErrorMsg('Please enter a valid mobile number.');
      return;
    }

    if (!mobileOtpSent) {
      setIsLoading(true);
      setTimeout(() => {
        setMobileOtpSent(true);
        setIsLoading(false);
        setSuccessMsg(`OTP sent to ${countryCode} ${mobileNumber}. Demo OTP: 123456`);
      }, 500);
      return;
    }

    // Verify OTP & Login
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      const res = await loginUser(mobileNumber + '@nas.com', 'user123');
      if (res.success) {
        closeAuthModal();
        navigateTo('/dashboard');
      } else {
        setErrorMsg('OTP login failed.');
      }
    }, 600);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res.success) {
        closeAuthModal();
        if (res.user.role === 'ADMIN') {
          navigateTo('/admin/dashboard');
        } else {
          navigateTo('/dashboard');
        }
      } else {
        setErrorMsg(res.error || 'Authentication failed.');
      }
    } catch (err) {
      setErrorMsg('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      const res = await loginUser('google.user@nas.com', 'google123');
      if (res.success) {
        closeAuthModal();
        navigateTo('/dashboard');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#062544]/60 backdrop-blur-md flex items-center justify-center p-3 xs:p-4">
      <div className="glass-frost rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92dvh] overflow-y-auto overscroll-contain shadow-2xl border border-white/90 relative grid grid-cols-1 md:grid-cols-12 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-2xl">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 active:scale-90 transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: AUTH FORM */}
        <div className="md:col-span-6 p-5 xs:p-7 sm:p-10 flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#036CFB] text-white flex items-center justify-center shadow-md">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#062544]">
                NAS
                <span className="text-[#38BDF8] ml-1.5 text-xs font-semibold uppercase bg-[#062544] px-2 py-0.5 rounded text-white">
                  INTERNATIONALS
                </span>
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062544] tracking-tight">
                Sign up / Login to your account
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Welcome back! Select method to Sign up / Login
              </p>
            </div>

            {/* Feedback Messages */}
            {errorMsg && (
              <div className="bg-rose-50 text-rose-700 border border-rose-200 p-3 rounded-2xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-3 rounded-2xl text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* METHOD 1: MOBILE NUMBER AUTH (PRIMARY) */}
            {authMethod === 'mobile' && (
              <form onSubmit={handleMobileSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Mobile Number</label>
                  <div className="flex items-center space-x-2 border border-slate-200 rounded-2xl p-1.5 bg-white shadow-xs focus-within:border-[#062544]">
                    <div className="flex items-center space-x-1 pl-3 pr-2 border-r border-slate-200 py-1 text-xs font-bold text-slate-700 shrink-0">
                      <span className="text-base">🇮🇳</span>
                      <span>{countryCode}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter your mobile number"
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none placeholder-slate-400 py-1.5"
                    />
                  </div>
                </div>

                {mobileOtpSent && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Enter 6-Digit OTP</label>
                    <input
                      type="text"
                      value={mobileOtp}
                      onChange={(e) => setMobileOtp(e.target.value)}
                      placeholder="e.g. 123456"
                      className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs font-bold text-center text-[#062544] tracking-widest focus:outline-none focus:border-[#062544]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[46px] active:scale-98 ${
                    mobileNumber ? 'bg-[#036CFB] hover:bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : mobileOtpSent ? (
                    <>
                      <span>Verify & Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center font-medium">
                  By continuing, you agree to our <span className="text-[#036CFB] underline font-semibold cursor-pointer">terms & conditions</span>
                </p>
              </form>
            )}

            {/* METHOD 2: EMAIL AUTH */}
            {authMethod === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@nas.com"
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] min-h-[44px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#036CFB] hover:bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[46px] active:scale-98"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In with Email</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* DIVIDER */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-[11px]">
                <span className="bg-white px-3 text-slate-400 font-medium">Or Login / Sign up With</span>
              </div>
            </div>

            {/* ALTERNATIVE LOGIN BUTTONS */}
            <div className="space-y-2.5">
              {authMethod !== 'email' ? (
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('email');
                    setErrorMsg('');
                  }}
                  className="w-full py-3 px-4 bg-white border border-slate-200 hover:border-slate-300 active:scale-98 rounded-2xl text-xs font-bold text-slate-700 shadow-xs flex items-center justify-center space-x-2.5 transition-all cursor-pointer min-h-[44px]"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>Continue with Email</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('mobile');
                    setErrorMsg('');
                  }}
                  className="w-full py-3 px-4 bg-white border border-slate-200 hover:border-slate-300 active:scale-98 rounded-2xl text-xs font-bold text-slate-700 shadow-xs flex items-center justify-center space-x-2.5 transition-all cursor-pointer min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>Continue with Mobile Number</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 bg-white border border-slate-200 hover:border-slate-300 active:scale-98 rounded-2xl text-xs font-bold text-slate-700 shadow-xs flex items-center justify-center space-x-2.5 transition-all cursor-pointer min-h-[44px]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

          </div>

          {/* Admin console direct link */}
          <div className="pt-2 text-center border-t border-slate-100">
            <button
              onClick={() => {
                closeAuthModal();
                navigateTo('/admin/login');
              }}
              className="text-[11px] font-bold text-slate-400 hover:text-[#062544] transition-colors"
            >
              🔐 Admin / Staff Login Portal ➔
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: TRAVEL VECTOR ILLUSTRATION */}
        <div className="md:col-span-6 bg-slate-50 p-8 flex items-center justify-center relative border-l border-slate-100 hidden md:flex">
          <div className="relative text-center max-w-sm space-y-6">
            
            {/* Floating Flight Graphic & Traveler Card Illustration */}
            <div className="w-64 h-64 mx-auto rounded-3xl bg-[#062544]/5 p-6 flex flex-col items-center justify-center border border-[#062544]/10 relative">
              
              <div className="w-20 h-20 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg shadow-[#036CFB]/20 mb-4 overflow-hidden">
                <img src={logoImg} alt="NAS Internationals Logo" className="w-full h-full object-contain" />
              </div>

              <h4 className="font-extrabold text-[#062544] text-xl">NAS INTERNATIONALS</h4>
              <p className="text-xs font-bold text-[#036CFB] uppercase tracking-widest mt-1">100% ONLINE SERVICES</p>
              
              <p className="text-xs text-slate-500 font-medium mt-3 leading-relaxed">
                Visa Services • Air Ticketing <br />
                Document Attestation • Education Consultancy
              </p>

            </div>

            <div className="text-xs font-bold text-slate-600">
              Trusted by 10,000+ Happy Travelers Worldwide
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
