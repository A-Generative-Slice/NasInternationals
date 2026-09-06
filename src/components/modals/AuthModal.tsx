import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Plane, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/logo.jpg';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginUser, registerUser, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile');
  
  // Mobile Sign In State
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');

  // Email Sign In State
  const [email, setEmail] = useState('client@nas.com');
  const [password, setPassword] = useState('user123');

  // Sign Up (Register) State
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

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
        setSuccessMsg(`Verification code sent to ${countryCode} ${mobileNumber}. Demo code: 123456`);
      }, 400);
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
        setErrorMsg('Verification code invalid. Please try again.');
      }
    }, 500);
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
        setErrorMsg(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setErrorMsg('Unable to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!signupName.trim() || !signupEmail.trim() || !signupPhone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await registerUser(signupName, signupEmail, signupPhone, signupPassword || 'pass123');
      if (res.success) {
        setSuccessMsg('Account created successfully! Redirecting...');
        setTimeout(() => {
          closeAuthModal();
          navigateTo('/dashboard');
        }, 800);
      } else {
        setErrorMsg(res.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Registration error. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      const res = await loginUser('customer.google@nas.com', 'google123');
      if (res.success) {
        closeAuthModal();
        navigateTo('/dashboard');
      }
    }, 500);
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
          
          <div className="space-y-5">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white p-1 shadow-md border border-slate-100 flex items-center justify-center overflow-hidden">
                <img src={logoImg} alt="Nas Internationals" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#062544]">
                NAS
                <span className="text-[#036CFB] ml-1.5 text-xs font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  Internationals
                </span>
              </span>
            </div>

            {/* Tab Switcher: Sign In vs Create Account */}
            <div className="flex rounded-2xl bg-slate-100/80 p-1 border border-slate-200/60">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'signin'
                    ? 'bg-white text-[#062544] shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'signup'
                    ? 'bg-white text-[#036CFB] shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-0.5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#062544] tracking-tight">
                {activeTab === 'signin' ? 'Welcome back' : 'Register your account'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {activeTab === 'signin' 
                  ? 'Access your visa applications and tracking documents' 
                  : 'Get access to 100% online travel and visa assistance'}
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

            {/* SIGN IN VIEW */}
            {activeTab === 'signin' && (
              <div className="space-y-4">
                {authMethod === 'mobile' ? (
                  <form onSubmit={handleMobileSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Mobile Number</label>
                      <div className="flex items-center space-x-2 border border-slate-200 rounded-2xl p-1.5 bg-white shadow-xs focus-within:border-[#036CFB]">
                        <div className="flex items-center space-x-1 pl-3 pr-2 border-r border-slate-200 py-1 text-xs font-bold text-slate-700 shrink-0">
                          <span className="text-base">🇮🇳</span>
                          <span>{countryCode}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="Enter your phone number"
                          className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none placeholder-slate-400 py-1.5"
                        />
                      </div>
                    </div>

                    {mobileOtpSent && (
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Enter 6-Digit Code</label>
                        <input
                          type="text"
                          value={mobileOtp}
                          onChange={(e) => setMobileOtp(e.target.value)}
                          placeholder="123456"
                          className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs font-bold text-center text-[#062544] tracking-widest focus:outline-none focus:border-[#036CFB]"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3.5 font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[46px] active:scale-98 ${
                        mobileNumber ? 'bg-[#036CFB] hover:bg-[#0256c7] text-white' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Sending code...</span>
                        </>
                      ) : mobileOtpSent ? (
                        <>
                          <span>Verify & Sign In</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <span>Continue with Mobile</span>
                      )}
                    </button>
                  </form>
                ) : (
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
                      className="w-full py-3.5 bg-[#036CFB] hover:bg-[#0256c7] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[46px] active:scale-98"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Switch Between Mobile / Email */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod(authMethod === 'mobile' ? 'email' : 'mobile');
                      setErrorMsg('');
                    }}
                    className="text-xs font-bold text-[#036CFB] hover:underline"
                  >
                    {authMethod === 'mobile' ? 'Sign in with Email & Password instead' : 'Sign in with Mobile Phone instead'}
                  </button>
                </div>
              </div>
            )}

            {/* SIGN UP VIEW */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="+91 99419 00055"
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="customer@example.com"
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#036CFB] min-h-[44px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#036CFB] to-[#0284C7] hover:from-[#0256c7] hover:to-[#036CFB] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[46px] active:scale-98"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account & Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ALTERNATIVE LOGIN BUTTON */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-slate-300 active:scale-98 rounded-2xl text-xs font-bold text-slate-700 shadow-xs flex items-center justify-center space-x-2.5 transition-all cursor-pointer min-h-[44px]"
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

          {/* Admin console link */}
          <div className="pt-2 text-center border-t border-slate-100">
            <button
              onClick={() => {
                closeAuthModal();
                navigateTo('/admin/login');
              }}
              className="text-[11px] font-bold text-slate-400 hover:text-[#062544] transition-colors"
            >
              Operations & Admin Console ➔
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: BRAND INFORMATION */}
        <div className="md:col-span-6 bg-slate-50 p-8 flex items-center justify-center relative border-l border-slate-100 hidden md:flex">
          <div className="relative text-center max-w-sm space-y-6">
            
            <div className="w-64 h-64 mx-auto rounded-3xl bg-white p-6 flex flex-col items-center justify-center border border-slate-200/80 shadow-sm relative">
              
              <div className="w-20 h-20 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md border border-slate-100 mb-4 overflow-hidden">
                <img src={logoImg} alt="NAS Internationals Logo" className="w-full h-full object-contain" />
              </div>

              <h4 className="font-extrabold text-[#062544] text-xl">NAS Internationals</h4>
              <p className="text-xs font-bold text-[#036CFB] uppercase tracking-wider mt-1">Visa & Travel Services</p>
              
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
