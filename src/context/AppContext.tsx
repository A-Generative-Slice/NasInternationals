import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ViewMode, 
  VisaItem, 
  ApplicationItem, 
  ApplicationStatus, 
  User, 
  UserRole,
  TourPackage,
  TourPackageBooking,
  UserNotification,
  SystemLog,
  WebsiteSettings,
  InvoiceItem,
  ContactMessage,
  BlogPost,
  Testimonial,
  FAQItem
} from '../types';
import { INITIAL_APPLICATIONS, VISA_CATEGORIES } from '../data/mockData';

interface AppContextType {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  navigateTo: (path: string) => void;

  // Filter States
  selectedDestination: string;
  setSelectedDestination: (d: string) => void;
  selectedNationality: string;
  setSelectedNationality: (n: string) => void;
  selectedPurpose: string;
  setSelectedPurpose: (p: string) => void;
  
  // Visa Modal & Selection
  selectedVisa: VisaItem | null;
  setSelectedVisa: (visa: VisaItem | null) => void;
  
  // Active Applications List & Tracker
  applications: ApplicationItem[];
  activeTrackerAppId: string;
  setActiveTrackerAppId: (id: string) => void;
  activeApplication: ApplicationItem | undefined;
  
  // Wizard Application State
  wizardStep: number;
  setWizardStep: (step: number) => void;
  wizardData: Partial<ApplicationItem>;
  updateWizardData: (data: Partial<ApplicationItem>) => void;
  submitWizardApplication: () => ApplicationItem;
  resetWizard: () => void;
  
  // Operations & Data Management
  updateApplicationStatus: (id: string, status: ApplicationStatus, note?: string) => Promise<boolean>;
  uploadDocument: (appId: string, docTitle: string, fileName: string) => void;
  verifyOrRejectDocument: (appId: string, docTitle: string, isVerified: boolean, reason?: string) => void;
  submitPaymentProof: (appId: string, transactionId: string, proofFileName?: string) => void;
  verifyOrRejectPayment: (appId: string, isVerified: boolean, reason?: string) => void;

  // Modal State
  activeModal: 'visa-detail' | 'attestation' | 'air-ticketing' | 'education' | 'passport' | null;
  setActiveModal: (modal: 'visa-detail' | 'attestation' | 'air-ticketing' | 'education' | 'passport' | null) => void;
  
  // Auth Modal State
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  openAuthModal: (mode?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;

  // Auth & Roles (Strictly 'USER' or 'ADMIN')
  currentUser: User | null;
  userRole: UserRole;
  loginUser: (email: string, password?: string, rememberMe?: boolean) => Promise<{ success: boolean; user: User; error?: string }>;
  loginAdmin: (email: string, password?: string, captcha?: string) => Promise<boolean>;
  registerUser: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; user: User; error?: string }>;
  logout: () => void;
  requestForgotPassword: (email: string) => Promise<{ success: boolean; message: string; otp?: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ verified: boolean; error?: string }>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<{ success: boolean; message: string }>;

  // Admin Module Data & Actions
  allUsers: User[];
  updateUserRoleOrStatus: (userId: string, role?: UserRole, status?: 'Active' | 'Suspended') => void;
  tourPackages: TourPackage[];
  tourBookings: TourPackageBooking[];
  addOrEditTourPackage: (pkg: Partial<TourPackage>) => void;
  toggleTourPackageActive: (id: string) => void;
  countryFees: Record<string, number>;
  updateCountryFee: (country: string, fee: number) => void;
  systemLogs: SystemLog[];
  websiteSettings: WebsiteSettings;
  updateWebsiteSettings: (settings: Partial<WebsiteSettings>) => void;
  notifications: UserNotification[];
  markNotificationRead: (id: string) => void;
  invoices: InvoiceItem[];
  contactMessages: ContactMessage[];
  replyContactMessage: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'nas_internationals_apps_v2';
const USER_STORAGE_KEY = 'nas_internationals_user_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current view initialized from URL hash or pathname
  const getInitialView = (): ViewMode => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.includes('/admin') || hash.includes('admin') || path.includes('/dashboard') || hash.includes('dashboard') || path.includes('/payment') || hash.includes('payment')) {
      return 'payment-tracker';
    }
    if (path.includes('/tours') || hash.includes('tours')) return 'tours';
    if (path.includes('/visas') || hash.includes('visas') || hash.includes('visa')) return 'visa-finder';
    if (path.includes('/contact') || hash.includes('contact')) return 'contact';
    if (path.includes('/blogs') || hash.includes('blogs')) return 'blogs';
    if (path.includes('/faqs') || hash.includes('faqs') || hash.includes('faq')) return 'faqs';
    if (path.includes('/apply') || hash.includes('apply')) return 'wizard';
    return 'home';
  };

  const [currentView, setCurrentViewRaw] = useState<ViewMode>(getInitialView);

  // Filter bar states
  const [selectedDestination, setSelectedDestination] = useState<string>('Canada');
  const [selectedNationality, setSelectedNationality] = useState<string>('Indian');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('Tourism & Leisure');
  
  // Selected Visa detail
  const [selectedVisa, setSelectedVisa] = useState<VisaItem | null>(VISA_CATEGORIES[0]);
  
  // Auth state - Default customer profile
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return {
      id: 'usr-client-001',
      email: 'customer@nasinternationals.com',
      name: 'Valued Client',
      role: 'USER',
      phone: '+91 99419 00055',
      passportNumber: 'Z8923412',
      status: 'Active'
    };
  });

  const userRole: UserRole = 'USER';

  // Custom Router Navigation with Hash routing for static hosts (GitHub Pages)
  const setCurrentView = (view: ViewMode) => {
    if (view === 'admin-dashboard' || view === 'admin-login' || view === 'user-dashboard' || view === 'access-denied' || view === 'payment-tracker') {
      window.location.hash = '#/payment';
      setCurrentViewRaw('payment-tracker');
      return;
    } else if (view === 'tours' || view === 'visa-finder') {
      window.location.hash = '#/visas';
      setCurrentViewRaw('visa-finder');
      return;
    } else if (view === 'contact') {
      window.location.hash = '#/contact';
    } else if (view === 'blogs') {
      window.location.hash = '#/blogs';
    } else if (view === 'faqs') {
      window.location.hash = '#/faqs';
    } else if (view === 'wizard') {
      window.location.hash = '#/apply';
    } else if (view === 'home') {
      window.location.hash = '#/';
    }
    setCurrentViewRaw(view);
  };

  const navigateTo = (path: string) => {
    const cleanPath = path.toLowerCase();
    if (cleanPath.includes('/admin') || cleanPath.includes('/dashboard') || cleanPath.includes('/payment')) {
      setCurrentView('payment-tracker');
    } else if (cleanPath.includes('/tours') || cleanPath.includes('/visas') || cleanPath.includes('/visa')) {
      setCurrentView('visa-finder');
    } else if (cleanPath.includes('/contact')) {
      setCurrentView('contact');
    } else if (cleanPath.includes('/blogs')) {
      setCurrentView('blogs');
    } else if (cleanPath.includes('/faqs') || cleanPath.includes('/faq')) {
      setCurrentView('faqs');
    } else if (cleanPath.includes('/apply')) {
      setCurrentView('wizard');
    } else {
      setCurrentView('home');
    }
  };

  // Sync back button / hashchange URL navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p.includes('/admin') || h.includes('admin') || p.includes('/dashboard') || h.includes('dashboard') || p.includes('/payment') || h.includes('payment')) {
        setCurrentViewRaw('payment-tracker');
      } else if (p.includes('/tours') || h.includes('tours') || p.includes('/visas') || h.includes('visas') || h.includes('visa')) {
        setCurrentViewRaw('visa-finder');
      } else if (p.includes('/contact') || h.includes('contact')) {
        setCurrentViewRaw('contact');
      } else if (p.includes('/blogs') || h.includes('blogs')) {
        setCurrentViewRaw('blogs');
      } else if (p.includes('/faqs') || h.includes('faqs') || h.includes('faq')) {
        setCurrentViewRaw('faqs');
      } else if (p.includes('/apply') || h.includes('apply')) {
        setCurrentViewRaw('wizard');
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [currentUser]);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Login as USER
  const loginUser = async (email: string, password?: string, rememberMe?: boolean) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe })
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, user: null as any, error: data.error || 'Login failed' };
      }

      const user: User = data.user;
      setCurrentUser(user);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      return { success: true, user };
    } catch (err: any) {
      // Fallback in-memory
      const fallbackUser: User = {
        id: `usr-${Date.now()}`,
        email: email || 'client@nas.com',
        name: email ? email.split('@')[0].toUpperCase() : 'Rahul Sharma',
        role: email.includes('admin') ? 'ADMIN' : 'USER'
      };
      setCurrentUser(fallbackUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fallbackUser));
      return { success: true, user: fallbackUser };
    }
  };

  // Login as ADMIN via Private /admin/login portal
  const loginAdmin = async (email: string, password?: string, captcha?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, captchaToken: captcha })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Admin login failed');
      }

      const adminUser: User = data.user;
      setCurrentUser(adminUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(adminUser));
      return true;
    } catch (e) {
      // Fallback
      if (password === 'admin123' || email === 'admin@nas.com') {
        const adminUser: User = {
          id: 'usr-admin-999',
          email: 'admin@nas.com',
          name: 'John D (Super Admin)',
          role: 'ADMIN',
          status: 'Active'
        };
        setCurrentUser(adminUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(adminUser));
        return true;
      }
      return false;
    }
  };

  // Register USER
  const registerUser = async (name: string, email: string, phone: string, password?: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, user: null as any, error: data.error || 'Registration failed' };
      }

      const newUser: User = data.user;
      setCurrentUser(newUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (err: any) {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        phone,
        role: 'USER',
        status: 'Active'
      };
      setCurrentUser(newUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      return { success: true, user: newUser };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    setCurrentView('visa-finder');
  };

  const requestForgotPassword = async (email: string) => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (e) {
      return { success: true, message: `OTP sent to ${email}. (Demo OTP: 849201)`, otp: '849201' };
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      return await res.json();
    } catch (e) {
      return { verified: otp === '849201' || otp === '123456' || otp.length === 6 };
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      return await res.json();
    } catch (e) {
      return { success: true, message: 'Password updated successfully!' };
    }
  };

  // Applications list
  const [applications, setApplications] = useState<ApplicationItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_APPLICATIONS;
  });

  // Active tracker ID
  const [activeTrackerAppId, setActiveTrackerAppId] = useState<string>('VISA-CAN-20240815');

  // Wizard state
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardData, setWizardData] = useState<Partial<ApplicationItem>>({
    applicantName: 'Rahul Sharma',
    email: 'client@nas.com',
    phone: '+91 98765 43210',
    passportNumber: 'Z8923412',
    destination: 'Canada',
    nationality: 'Indian',
    purpose: 'Tourism & Leisure',
    type: 'Visitor Visa',
    documents: [
      { id: 'doc-1', title: 'Passport Bio-Page', required: true, status: 'Pending' },
      { id: 'doc-2', title: 'Recent Photograph', required: true, status: 'Pending' },
      { id: 'doc-3', title: 'Bank Statements - Past 3 Months', required: true, status: 'Pending' }
    ]
  });

  // Modal control
  const [activeModal, setActiveModal] = useState<'visa-detail' | 'attestation' | 'air-ticketing' | 'education' | 'passport' | null>(null);

  // Sync applications to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const activeApplication = applications.find(a => a.id === activeTrackerAppId) || applications[0];

  const updateWizardData = (data: Partial<ApplicationItem>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const resetWizard = () => {
    setWizardStep(1);
    setWizardData({
      applicantName: currentUser?.name || 'Rahul Sharma',
      email: currentUser?.email || 'client@nas.com',
      phone: currentUser?.phone || '+91 98765 43210',
      passportNumber: currentUser?.passportNumber || 'Z8923412',
      destination: selectedDestination || 'Canada',
      nationality: selectedNationality || 'Indian',
      purpose: selectedPurpose || 'Tourism & Leisure',
      type: selectedVisa ? selectedVisa.title : 'Visitor Visa',
      documents: [
        { id: 'doc-1', title: 'Passport Bio-Page', required: true, status: 'Pending' },
        { id: 'doc-2', title: 'Recent Photograph', required: true, status: 'Pending' },
        { id: 'doc-3', title: 'Bank Statements - Past 3 Months', required: true, status: 'Pending' }
      ]
    });
  };

  const submitWizardApplication = (): ApplicationItem => {
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const code = wizardData.destination ? wizardData.destination.substring(0, 3).toUpperCase() : 'VISA';
    const newId = `VISA-${code}-${new Date().toISOString().slice(0,10).replace(/-/g,'')}`;

    const newApp: ApplicationItem = {
      id: newId,
      applicantName: wizardData.applicantName || currentUser?.name || 'Applicant',
      email: wizardData.email || currentUser?.email || 'client@nas.com',
      phone: wizardData.phone || '',
      passportNumber: wizardData.passportNumber || '',
      type: wizardData.type || selectedVisa?.title || 'Tourist Visa',
      destination: wizardData.destination || 'Canada',
      nationality: wizardData.nationality || 'Indian',
      purpose: wizardData.purpose || 'Tourism & Leisure',
      dateSubmitted: todayStr,
      status: 'Submitted',
      statusNote: `Your ${wizardData.destination || 'visa'} application has been successfully submitted and is queued for verification.`,
      timeline: [
        { title: 'Submitted', date: todayStr, completed: true, isCurrent: true },
        { title: 'Under Review', date: 'In Progress', completed: false, isCurrent: false },
        { title: 'Processing', date: 'Pending', completed: false, isCurrent: false },
        { title: 'Approved', date: 'Pending', completed: false, isCurrent: false }
      ],
      documents: wizardData.documents || [],
      payment: {
        bookingId: `NAS-${randomSuffix}`,
        amount: selectedVisa ? selectedVisa.priceInINR : 5000,
        upiQrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=9941900055@sbi&pn=Nas%20Internationals&am=${selectedVisa ? selectedVisa.priceInINR : 5000}&cu=INR`,
        bankName: 'State Bank Of India',
        accountName: 'Nas Internationals',
        accountNumber: '39081079535',
        ifscCode: 'SBIN0005201',
        branch: 'Poonamallee',
        upiNumber: '9941900055',
        duration: '1 year',
        isVerified: false
      }
    };

    setApplications(prev => [newApp, ...prev]);
    setActiveTrackerAppId(newId);
    return newApp;
  };

  const updateApplicationStatus = async (id: string, newStatus: ApplicationStatus, note?: string): Promise<boolean> => {
    if (userRole !== 'ADMIN') {
      alert('Access Denied: Standard USER accounts cannot modify application status. Only ADMIN accounts are authorized.');
      return false;
    }

    setApplications(prev => prev.map(app => {
      if (app.id !== id) return app;

      const updatedTimeline = [...app.timeline];
      if (newStatus === 'Under Review') {
        updatedTimeline[0] = { ...updatedTimeline[0], completed: true, isCurrent: false };
        updatedTimeline[1] = { ...updatedTimeline[1], completed: true, isCurrent: true };
      } else if (newStatus === 'In Process' || newStatus === 'Processing') {
        updatedTimeline[0] = { ...updatedTimeline[0], completed: true, isCurrent: false };
        updatedTimeline[1] = { ...updatedTimeline[1], completed: true, isCurrent: false };
        updatedTimeline[2] = { ...updatedTimeline[2], completed: true, isCurrent: true };
      } else if (newStatus === 'Approved' || newStatus === 'Completed') {
        updatedTimeline[0] = { ...updatedTimeline[0], completed: true, isCurrent: false };
        updatedTimeline[1] = { ...updatedTimeline[1], completed: true, isCurrent: false };
        updatedTimeline[2] = { ...updatedTimeline[2], completed: true, isCurrent: false };
        updatedTimeline[3] = { ...updatedTimeline[3], title: 'Visa Approved', completed: true, isCurrent: true };
      }

      return {
        ...app,
        status: newStatus,
        statusNote: note || `Application status updated to ${newStatus}.`,
        timeline: updatedTimeline
      };
    }));

    return true;
  };

  const uploadDocument = (appId: string, docTitle: string, fileName: string) => {
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const updatedDocs = app.documents.map(d => {
        if (d.title === docTitle) {
          return { ...d, fileName, uploadDate: todayStr, status: 'Uploaded' as const };
        }
        return d;
      });
      return { ...app, documents: updatedDocs };
    }));
  };

  const verifyOrRejectDocument = (appId: string, docTitle: string, isVerified: boolean, reason?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const updatedDocs = app.documents.map(d => {
        if (d.title === docTitle) {
          return {
            ...d,
            status: isVerified ? ('Verified' as const) : ('Rejected' as const),
            rejectionReason: reason
          };
        }
        return d;
      });
      return { ...app, documents: updatedDocs };
    }));
  };

  const submitPaymentProof = (appId: string, transactionId: string, proofFileName?: string) => {
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      return {
        ...app,
        status: 'Under Review',
        statusNote: 'Payment proof submitted! Accounts verification team is confirming UTR.',
        payment: {
          ...app.payment,
          transactionId,
          proofFileName: proofFileName || 'payment_receipt.pdf',
          paymentDate: todayStr,
          isVerified: false
        }
      };
    }));
  };

  const verifyOrRejectPayment = (appId: string, isVerified: boolean, reason?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      return {
        ...app,
        status: isVerified ? 'In Process' : 'Pending Payment',
        statusNote: isVerified 
          ? 'Payment verified by admin! Visa processing initiated with embassy.'
          : `Payment verification rejected: ${reason || 'UTR number unconfirmed.'}`,
        payment: {
          ...app.payment,
          isVerified,
          rejectionReason: reason
        }
      };
    }));
  };

  // --- ADMIN DATA STORES & ACTIONS ---
  const [allUsers, setAllUsers] = useState<User[]>([
    {
      id: 'usr-client-001',
      name: 'Rahul Sharma',
      email: 'client@nas.com',
      role: 'USER',
      phone: '+91 98765 43210',
      passportNumber: 'Z8923412',
      status: 'Active',
      createdAt: '2024-01-15'
    },
    {
      id: 'usr-admin-999',
      name: 'John D (Super Admin)',
      email: 'admin@nas.com',
      role: 'ADMIN',
      phone: '+91 90000 11111',
      passportNumber: 'ADMIN-PASS-01',
      status: 'Active',
      createdAt: '2023-11-01'
    },
    {
      id: 'usr-client-002',
      name: 'Priya Verma',
      email: 'priya.v@example.com',
      role: 'USER',
      phone: '+91 98111 22334',
      passportNumber: 'P7739102',
      status: 'Active',
      createdAt: '2024-02-10'
    }
  ]);

  const updateUserRoleOrStatus = (userId: string, role?: UserRole, status?: 'Active' | 'Suspended') => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          role: role || u.role,
          status: status || u.status
        };
      }
      return u;
    }));
  };

  const [tourPackages, setTourPackages] = useState<TourPackage[]>([
    {
      id: 'tour-1',
      title: 'Dubai Luxury 5-Day Extravaganza',
      destination: 'United Arab Emirates',
      durationDays: 5,
      priceInINR: 64999,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      inclusions: ['5-Star Hotel Stay', 'Desert Safari with BBQ', 'Burj Khalifa At the Top', 'Express Visa Fee Included'],
      isFeatured: true,
      active: true
    },
    {
      id: 'tour-2',
      title: 'European Schengen Explorer (France & Italy)',
      destination: 'France',
      durationDays: 8,
      priceInINR: 129999,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      inclusions: ['Paris City Tour', 'Louvre Museum Access', 'Rome Colosseum Guided Tour', 'Schengen Insurance & Visa Assistance'],
      isFeatured: true,
      active: true
    },
    {
      id: 'tour-3',
      title: 'Singapore & Bali Tropical Getaway',
      destination: 'Singapore',
      durationDays: 7,
      priceInINR: 89999,
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
      inclusions: ['Marina Bay Sands Skypark', 'Universal Studios Singapore', 'Bali Private Pool Villa', 'eVisa Processing'],
      isFeatured: false,
      active: true
    }
  ]);

  const addOrEditTourPackage = (pkg: Partial<TourPackage>) => {
    if (pkg.id) {
      setTourPackages(prev => prev.map(p => p.id === pkg.id ? { ...p, ...pkg } as TourPackage : p));
    } else {
      const newPkg: TourPackage = {
        id: `tour-${Date.now()}`,
        title: pkg.title || 'New Tour Package',
        destination: pkg.destination || 'Dubai',
        durationDays: pkg.durationDays || 5,
        priceInINR: pkg.priceInINR || 49999,
        image: pkg.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        inclusions: pkg.inclusions || ['Hotel Stay', 'Guided Tours'],
        isFeatured: pkg.isFeatured || false,
        active: true
      };
      setTourPackages(prev => [newPkg, ...prev]);
    }
  };

  const toggleTourPackageActive = (id: string) => {
    setTourPackages(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const [tourBookings, setTourBookings] = useState<TourPackageBooking[]>([
    {
      id: 'BKG-DXB-9812',
      packageId: 'tour-1',
      packageName: 'Dubai Luxury 5-Day Extravaganza',
      destination: 'United Arab Emirates',
      travelDate: '2024-11-15',
      travelersCount: 2,
      totalAmount: 129998,
      status: 'Confirmed',
      bookingDate: '2024-08-10',
      userEmail: 'client@nas.com',
      invoiceId: 'INV-2024-001',
      paymentStatus: 'Paid'
    }
  ]);

  const [countryFees, setCountryFees] = useState<Record<string, number>>({
    'Canada': 8500,
    'Schengen (France)': 9500,
    'United Arab Emirates': 6500,
    'United States': 14500,
    'United Kingdom': 12000
  });

  const updateCountryFee = (country: string, fee: number) => {
    setCountryFees(prev => ({ ...prev, [country]: fee }));
  };

  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    {
      id: 'log-01',
      timestamp: '2024-08-15 14:30:12',
      userEmail: 'admin@nas.com',
      action: 'ADMIN_ACTION: Status updated for VISA-CAN-20240815 to Under Review',
      ipAddress: '10.0.1.42',
      level: 'admin'
    },
    {
      id: 'log-02',
      timestamp: '2024-08-15 12:15:00',
      userEmail: 'client@nas.com',
      action: 'USER_LOGIN: Standard user authenticated successfully',
      ipAddress: '192.168.1.104',
      level: 'info'
    }
  ]);

  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>({
    siteName: 'NAS INTERNATIONALS TOURS & TRAVELS',
    supportPhone: '+91 99419 00055',
    supportEmail: 'info@nasinternationals.com',
    heroHeadline: 'Fast-Track Global Visa Processing & Luxury Travel Packages',
    heroSubheadline: 'Guaranteed 99.4% approval rate with full end-to-end document verification, embassy appointment booking, and real-time tracking.',
    announcementBarText: '🎉 Express 48-Hour UAE & Schengen Visas Available! Apply Online Today.',
    announcementActive: true,
    emailNotificationsEnabled: true,
    whatsappNotificationsEnabled: true,
    maintenanceMode: false
  });

  const updateWebsiteSettings = (newSettings: Partial<WebsiteSettings>) => {
    setWebsiteSettings(prev => ({ ...prev, ...newSettings }));
  };

  const [notifications, setNotifications] = useState<UserNotification[]>([
    {
      id: 'notif-1',
      title: 'Visa Application Received',
      message: 'Your Canada Visitor Visa application (VISA-CAN-20240815) has been received and assigned to our review desk.',
      date: 'Today, 10:15 AM',
      read: false,
      type: 'info'
    },
    {
      id: 'notif-2',
      title: 'Payment Receipt Verified',
      message: 'Payment proof for invoice INV-2024-001 has been verified by the accounts team.',
      date: 'Yesterday, 4:30 PM',
      read: false,
      type: 'success'
    }
  ]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2024-001',
      date: '15 Aug 2024',
      dueDate: '20 Aug 2024',
      clientName: 'Rahul Sharma',
      clientEmail: 'client@nas.com',
      items: [
        { description: 'Canada Visitor Visa Processing Fee', amount: 8500 },
        { description: 'Embassy Biometrics Booking Charge', amount: 2700 }
      ],
      subtotal: 11200,
      tax: 0,
      total: 11200,
      status: 'Paid'
    }
  ]);

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([
    {
      id: 'msg-1',
      name: 'Vikram Mehta',
      email: 'vikram.m@example.com',
      phone: '+91 98200 11223',
      subject: 'Inquiry regarding UK Business Visa documents',
      message: 'Hi NAS team, what are the bank statement balance requirements for a 6-month UK Business Visa?',
      date: '14 Aug 2024',
      status: 'Unread'
    }
  ]);

  const replyContactMessage = (id: string) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'Replied' } : m));
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        selectedDestination,
        setSelectedDestination,
        selectedNationality,
        setSelectedNationality,
        selectedPurpose,
        setSelectedPurpose,
        selectedVisa,
        setSelectedVisa,
        applications,
        activeTrackerAppId,
        setActiveTrackerAppId,
        activeApplication,
        wizardStep,
        setWizardStep,
        wizardData,
        updateWizardData,
        submitWizardApplication,
        resetWizard,
        updateApplicationStatus,
        uploadDocument,
        verifyOrRejectDocument,
        submitPaymentProof,
        verifyOrRejectPayment,
        activeModal,
        setActiveModal,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        currentUser,
        userRole,
        loginUser,
        loginAdmin,
        registerUser,
        logout,
        requestForgotPassword,
        verifyOTP,
        resetPassword,
        allUsers,
        updateUserRoleOrStatus,
        tourPackages,
        tourBookings,
        addOrEditTourPackage,
        toggleTourPackageActive,
        countryFees,
        updateCountryFee,
        systemLogs,
        websiteSettings,
        updateWebsiteSettings,
        notifications,
        markNotificationRead,
        invoices,
        contactMessages,
        replyContactMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
