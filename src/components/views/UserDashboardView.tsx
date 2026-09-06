import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderCheck, 
  CreditCard, 
  User, 
  Bell, 
  ChevronDown, 
  Plane, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck,
  Download,
  Calendar,
  Settings,
  Lock,
  History,
  Receipt,
  Check,
  Package,
  Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus } from '../../types';
import { uploadCustomerDocument } from '../../services/supabaseStorage';

export const UserDashboardView: React.FC = () => {
  const {
    applications,
    activeTrackerAppId,
    setActiveTrackerAppId,
    activeApplication,
    setCurrentView,
    resetWizard,
    uploadDocument,
    submitPaymentProof,
    currentUser,
    tourBookings,
    notifications,
    markNotificationRead,
    invoices
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'applications' | 'documents' | 'payments' | 'notifications' | 'invoices' | 'settings' | 'profile'
  >('overview');

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState('Passport Bio-Page');
  const [simulatedFileName, setSimulatedFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Payment upload state
  const [payUtr, setPayUtr] = useState('');
  const [payFile, setPayFile] = useState('');
  const [payFileObj, setPayFileObj] = useState<File | null>(null);
  const [payFileUploading, setPayFileUploading] = useState(false);

  // Account Settings state
  const [twoFactor, setTwoFactor] = useState(false);
  const [passCurrent, setPassCurrent] = useState('');
  const [passNew, setPassNew] = useState('');

  const app = activeApplication || applications[0];

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{status}</span>
          </span>
        );
      case 'Pending':
      case 'Pending Payment':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center space-x-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>{status}</span>
          </span>
        );
      case 'Under Review':
      case 'Processing':
      case 'In Process':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center space-x-1">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>{status}</span>
          </span>
        );
    }
  };

  const handleStartNewApp = () => {
    resetWizard();
    setCurrentView('wizard');
  };

  const handleSimulatedUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !simulatedFileName) return;
    setIsUploading(true);
    try {
      let finalName = simulatedFileName;
      if (selectedFile) {
        const res = await uploadCustomerDocument(selectedFile, app.id, selectedDocTitle);
        finalName = res.fileName;
      }
      uploadDocument(app.id, selectedDocTitle, finalName);
      setUploadModalOpen(false);
      setSelectedFile(null);
      setSimulatedFileName('');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payUtr) return;
    setPayFileUploading(true);
    try {
      let finalName = payFile || 'payment_receipt.pdf';
      if (payFileObj) {
        const res = await uploadCustomerDocument(payFileObj, app.id, 'Payment Proof');
        finalName = res.fileName;
      }
      submitPaymentProof(app.id, payUtr, finalName);
      setPayUtr('');
      setPayFile('');
      setPayFileObj(null);
      alert('Payment screenshot proof & UTR submitted successfully! Verified by accounts team.');
    } finally {
      setPayFileUploading(false);
    }
  };

  return (
    <div className="bg-[#EBF3FF]/70 min-h-[calc(100vh-5rem)] flex flex-col md:flex-row pb-28 md:pb-0">
      
      {/* Left Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Dashboard Logo Header */}
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-[#036CFB] text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
              NAS
            </div>
            <div>
              <span className="font-display font-black text-[#0B1E3D] text-sm tracking-wider block leading-tight">
                NAS INTERNATIONALS
              </span>
              <span className="text-[10px] text-slate-400 font-semibold block">Online User Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#EBF3FF] text-[#036CFB] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'applications'
                  ? 'bg-[#EBF3FF] text-[#036CFB] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Visa Applications</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'documents'
                  ? 'bg-[#EBF3FF] text-[#036CFB] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FolderCheck className="w-4 h-4" />
              <span>Document Uploads</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'payments'
                  ? 'bg-[#EBF3FF] text-[#036CFB] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payment Proofs</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'notifications'
                  ? 'bg-[#EBF3FF] text-[#036CFB] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bell className="w-4 h-4" />
              <div className="flex-1 flex items-center justify-between">
                <span>Notifications</span>
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                )}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'invoices'
                  ? 'bg-[#EBF3FF] text-[#036CFB] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Invoices & Grants</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#EBF3FF] text-[#036CFB] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Management</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#EBF3FF] text-[#036CFB] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Account Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Help Card */}
        <div className="pt-6 border-t border-slate-100">
          <div className="bg-[#062544] text-white rounded-xl p-3.5 text-xs space-y-1.5">
            <p className="font-semibold text-[#38BDF8]">Online Support Helpline</p>
            <p className="text-slate-200 text-[11px] font-bold">+91 99419 00055</p>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Top Greeting Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-[#0B1E3D]">
              Welcome, {currentUser?.name || 'Rahul Sharma'}
            </h1>
            <p className="text-xs text-slate-500">
              User Portal: Manage visa applications, document uploads, and tracking.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActiveTab('notifications')}
              className="p-2 rounded-xl bg-white text-slate-600 hover:text-[#036CFB] border border-slate-200 shadow-xs relative"
            >
              <Bell className="w-4 h-4" />
              {notifications.some(n => !n.read) && (
                <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1"></span>
              )}
            </button>

            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-[#036CFB] flex items-center justify-center font-bold text-xs">
                {currentUser?.name ? currentUser.name.substring(0,2).toUpperCase() : 'RS'}
              </div>
              <span className="text-xs font-semibold text-slate-700">{currentUser?.role || 'USER'}</span>
            </div>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Active Visa Progress Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-[#0B1E3D] text-base">
                  Current Visa Tracker ({app.destination} - {app.type})
                </h2>
                <button
                  onClick={() => setCurrentView('payment-tracker')}
                  className="text-xs font-semibold text-[#036CFB] hover:underline"
                >
                  View Interactive Timeline →
                </button>
              </div>

              {/* Progress Timeline Bar */}
              <div className="py-4 px-2">
                <div className="relative flex items-center justify-between max-w-3xl mx-auto">
                  <div className="absolute top-3.5 left-4 right-4 h-1 bg-slate-200 -z-0">
                    <div
                      className="h-full bg-[#036CFB] transition-all duration-500"
                      style={{
                        width: app.status === 'Submitted' ? '25%' : app.status === 'Under Review' ? '50%' : app.status === 'Processing' || app.status === 'In Process' ? '75%' : '100%'
                      }}
                    ></div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center space-y-1">
                    <div className="w-8 h-8 rounded-full bg-[#036CFB] text-white flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-2">Submitted</span>
                    <span className="text-[10px] text-slate-400">Completed</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center space-y-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                      app.status !== 'Submitted' ? 'bg-[#036CFB] text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-2">Under Review</span>
                    <span className="text-[10px] text-slate-500">
                      {app.status === 'Under Review' ? 'In Progress' : app.status === 'Submitted' ? 'Pending' : 'Completed'}
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center space-y-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                      app.status === 'Processing' || app.status === 'In Process' || app.status === 'Approved' || app.status === 'Completed'
                        ? 'bg-[#036CFB] text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      <div className="w-3 h-3 rounded-full bg-current"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-2">In Process</span>
                    <span className="text-[10px] text-slate-400">In Embassy</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center space-y-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                      app.status === 'Approved' || app.status === 'Completed'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-2">Approved</span>
                    <span className="text-[10px] text-slate-400">e-Visa Ready</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#036CFB] shrink-0 mt-0.5" />
                <p>{app.statusNote || `Your ${app.destination} ${app.type} application is queued for verification.`}</p>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 text-[#036CFB]">
                  <Plane className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-display font-bold text-[#0B1E3D] text-base">New Visa Application</h3>
                  <button
                    onClick={handleStartNewApp}
                    className="px-5 py-2 bg-[#036CFB] hover:bg-[#0B1E3D] text-white font-bold text-xs rounded-xl transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 text-[#036CFB]">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-display font-bold text-[#0B1E3D] text-base">Upload Documents</h3>
                  <button
                    onClick={() => setUploadModalOpen(true)}
                    className="px-5 py-2 bg-[#036CFB] hover:bg-[#0B1E3D] text-white font-bold text-xs rounded-xl transition"
                  >
                    Upload File
                  </button>
                </div>
              </div>
            </div>

            {/* Table of Applications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-[#0B1E3D] text-base">All Visa Applications</h2>
                <span className="text-xs text-slate-400">Total: {applications.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase">
                      <th className="pb-3 px-2">Application ID</th>
                      <th className="pb-3 px-2">Type</th>
                      <th className="pb-3 px-2">Destination</th>
                      <th className="pb-3 px-2">Date Submitted</th>
                      <th className="pb-3 px-2">Status</th>
                      <th className="pb-3 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-3 px-2 font-mono font-bold text-[#0B1E3D]">{item.id}</td>
                        <td className="py-3 px-2">{item.type}</td>
                        <td className="py-3 px-2">{item.destination}</td>
                        <td className="py-3 px-2 text-slate-500">{item.dateSubmitted}</td>
                        <td className="py-3 px-2">{getStatusBadge(item.status)}</td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => {
                              setActiveTrackerAppId(item.id);
                              setCurrentView('payment-tracker');
                            }}
                            className="text-[#036CFB] font-bold hover:underline"
                          >
                            Track →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h2 className="font-display font-bold text-[#0B1E3D] text-lg">My Visa Applications</h2>
            <div className="space-y-4">
              {applications.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-mono font-bold text-sm text-[#0B1E3D]">{item.id}</span>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Destination: <strong>{item.destination}</strong> ({item.type}) • Passport: {item.passportNumber}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Submitted: {item.dateSubmitted}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setActiveTrackerAppId(item.id);
                        setCurrentView('payment-tracker');
                      }}
                      className="px-4 py-2 bg-[#036CFB] text-white text-xs font-bold rounded-xl"
                    >
                      View Live Tracker
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* TAB 4: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-[#0B1E3D] text-lg">Document Center for {app.id}</h2>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-4 py-2 bg-[#036CFB] text-white font-bold text-xs rounded-xl"
              >
                + Upload New Document
              </button>
            </div>

            <div className="space-y-3">
              {app.documents.map((doc) => (
                <div key={doc.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{doc.title}</p>
                    <p className="text-[11px] text-slate-500">{doc.fileName || 'Not uploaded yet'}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                    doc.status === 'Uploaded' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            <h2 className="font-display font-bold text-[#0B1E3D] text-lg">Upload Payment Screenshot & UTR Proof</h2>
            
            <form onSubmit={handlePaymentSubmit} className="max-w-md space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Application</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-bold">
                  {applications.map(a => (
                    <option key={a.id} value={a.id}>{a.id} ({a.destination}) - Online Verification</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Transaction UTR / Reference ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UTR-98420194812"
                  value={payUtr}
                  onChange={(e) => setPayUtr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Proof File (Screenshot or Receipt PDF)</label>
                <div className="relative border-2 border-dashed border-slate-300 hover:border-[#036CFB] rounded-xl p-4 bg-slate-50 transition text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPayFileObj(file);
                        setPayFile(file.name);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-5 h-5 text-[#036CFB] mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-slate-700">
                    {payFileObj ? payFileObj.name : 'Tap to upload screenshot or PDF'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, PDF up to 10MB</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={payFileUploading}
                className="w-full py-3 bg-[#036CFB] hover:bg-[#0B1E3D] text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {payFileUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading to Secure Storage...</span>
                  </>
                ) : (
                  <span>Submit Payment Screenshot Proof</span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h2 className="font-display font-bold text-[#0B1E3D] text-lg">Notifications Inbox</h2>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    n.read ? 'bg-slate-50 border-slate-200' : 'bg-blue-50/70 border-blue-200 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#0B1E3D]">{n.title}</span>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-600">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: INVOICES */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h2 className="font-display font-bold text-[#0B1E3D] text-lg">Invoices & Approved Visa Grant Certificates</h2>
            <div className="space-y-4">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-xs text-[#0B1E3D]">{inv.invoiceNumber}</span>
                    <p className="text-xs text-slate-600">Type: Electronic Service Receipt</p>
                    <p className="text-[10px] text-slate-400">Date: {inv.date}</p>
                  </div>
                  <button
                    onClick={() => alert(`Downloading Official Service Receipt ${inv.invoiceNumber}...`)}
                    className="px-4 py-2 bg-[#036CFB] hover:bg-[#0256c7] text-white font-bold text-xs rounded-xl flex items-center space-x-1 shadow-sm transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Receipt PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 max-w-lg">
            <h2 className="font-display font-bold text-[#0B1E3D] text-lg">Profile Management</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                <input type="text" defaultValue={currentUser?.name || 'Rahul Sharma'} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input type="email" defaultValue={currentUser?.email || 'client@nas.com'} disabled className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number (+91)</label>
                <input type="tel" defaultValue={currentUser?.phone || '+91 98765 43210'} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Passport Number</label>
                <input type="text" defaultValue={currentUser?.passportNumber || 'Z8923412'} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono" />
              </div>
              <button
                onClick={() => alert('Profile updated successfully!')}
                className="px-5 py-2.5 bg-[#036CFB] text-white font-bold text-xs rounded-xl"
              >
                Save Profile Changes
              </button>
            </div>
          </div>
        )}

        {/* TAB 9: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6 max-w-lg">
            <h2 className="font-display font-bold text-[#0B1E3D] text-lg">Account Security & Preferences</h2>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <p className="font-bold text-slate-800">Two-Factor Authentication (2FA OTP)</p>
                  <p className="text-[11px] text-slate-500">Require email OTP code on every login</p>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="w-4 h-4 rounded text-[#036CFB]"
                />
              </div>

              <div className="space-y-2 pt-2">
                <p className="font-bold text-slate-800">Change Password</p>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passCurrent}
                  onChange={(e) => setPassCurrent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passNew}
                  onChange={(e) => setPassNew(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                />
                <button
                  onClick={() => {
                    alert('Password updated successfully!');
                    setPassCurrent('');
                    setPassNew('');
                  }}
                  className="px-4 py-2 bg-[#036CFB] hover:bg-[#0256c7] text-white font-bold rounded-xl shadow-sm transition"
                >
                  Update Security Password
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Upload Document Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-[#0B1E3D]">
              Upload Document for {app.id}
            </h3>
            
            <form onSubmit={handleSimulatedUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Type
                </label>
                <select
                  value={selectedDocTitle}
                  onChange={(e) => setSelectedDocTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#036CFB]"
                >
                  <option value="Passport Bio-Page">Passport Bio-Page</option>
                  <option value="Recent Photograph">Recent Photograph</option>
                  <option value="Bank Statements - Past 3 Months">Bank Statements - Past 3 Months</option>
                  <option value="Income Tax Returns">Income Tax Returns</option>
                  <option value="Employment Offer Letter or NOC">Employment Offer Letter or NOC</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Document File
                </label>
                <div className="relative border-2 border-dashed border-slate-300 hover:border-[#036CFB] rounded-xl p-5 bg-slate-50 text-center cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        setSimulatedFileName(file.name);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-[#036CFB] mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-slate-700">
                    {selectedFile ? selectedFile.name : 'Tap to browse or drop file here'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">PDF, PNG, JPG (Max 15MB)</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setUploadModalOpen(false);
                    setSelectedFile(null);
                    setSimulatedFileName('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || (!selectedFile && !simulatedFileName)}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#036CFB] hover:bg-[#0B1E3D] rounded-xl shadow-xs transition disabled:opacity-50 flex items-center space-x-1.5"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <span>Upload Document</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
