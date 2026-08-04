import React, { useState, useEffect } from 'react';
import { getStoredInquiries, updateInquiryStatus, deleteInquiry, subscribeRealtime, getStoredTrips, saveTripToStore, RealtimeMessage } from '../lib/realtime';
import { BookingInquiry, TourPackage } from '../types';
import { COMPANY_INFO, FEATURED_PACKAGES } from '../lib/data';
import { 
  ShieldCheck, CheckCircle2, XCircle, Clock, Eye, Send, Trash2, 
  Search, Filter, Lock, RefreshCw, ChevronRight, FileText, Check, 
  X, AlertTriangle, Building2, User, Phone, Mail, DollarSign, Image as ImageIcon,
  Sparkles, ExternalLink, Activity
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nas_admin_authenticated') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Data & Filter State
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'bookings' | 'packages' | 'logs'>('bookings');

  // Modal / Lightbox State
  const [selectedScreenshot, setSelectedScreenshot] = useState<{ src: string; ref: string; name: string } | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Realtime Audit Logs
  const [logs, setLogs] = useState<{ id: string; time: string; text: string; type: string }[]>([]);

  // Load inquiries & subscribe to real-time multi-tab events
  const loadData = () => {
    const data = getStoredInquiries();
    setInquiries(data);
  };

  useEffect(() => {
    loadData();

    // Subscribe to live multi-tab updates
    const unsubscribe = subscribeRealtime((msg: RealtimeMessage) => {
      loadData();
      const timeStr = new Date(msg.timestamp).toLocaleTimeString();
      let logText = `Event ${msg.type} triggered by ${msg.sender}`;
      if (msg.type === 'INQUIRY_SUBMITTED') {
        logText = `New booking request ${msg.payload?.referenceNo || ''} submitted by ${msg.sender}`;
      } else if (msg.type === 'BOOKING_APPROVED') {
        logText = `Booking ${msg.payload?.referenceNo || ''} APPROVED by Admin`;
      } else if (msg.type === 'BOOKING_REJECTED') {
        logText = `Booking ${msg.payload?.referenceNo || ''} REJECTED by Admin`;
      }

      setLogs((prev) => [
        { id: msg.id, time: timeStr, text: logText, type: msg.type },
        ...prev.slice(0, 49)
      ]);
    });

    return () => unsubscribe();
  }, []);

  // Admin Login Handler (Default PIN: 1234)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nas_admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid Admin PIN. Use "1234" to enter.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nas_admin_authenticated');
  };

  // Status Action Handlers
  const handleApprove = (inq: BookingInquiry) => {
    updateInquiryStatus(inq.id, {
      paymentStatus: 'Approved',
      status: 'Confirmed',
      adminNotes: inq.adminNotes ? `${inq.adminNotes} (Approved on ${new Date().toLocaleDateString()})` : `Payment verified via ${inq.paymentMethod || 'NAS Accounts Desk'}.`
    }, 'MD N. Abdul Hakeem');
    loadData();
  };

  const handleReject = (inq: BookingInquiry) => {
    const reason = prompt("Enter rejection reason for customer (e.g., Incorrect UTR number or unreadable screenshot):");
    if (reason === null) return;

    updateInquiryStatus(inq.id, {
      paymentStatus: 'Rejected',
      status: 'Rejected',
      adminNotes: reason ? `Rejected: ${reason}` : 'Payment receipt could not be verified.'
    }, 'MD N. Abdul Hakeem');
    loadData();
  };

  const handleSaveNotes = (id: string) => {
    updateInquiryStatus(id, { adminNotes: tempNotes });
    setEditingNotesId(null);
    loadData();
  };

  const handleDelete = (id: string, ref: string) => {
    if (window.confirm(`Are you sure you want to delete booking record ${ref}?`)) {
      deleteInquiry(id);
      loadData();
    }
  };

  const handleWhatsAppCustomer = (inq: BookingInquiry) => {
    const statusText = inq.paymentStatus === 'Approved' 
      ? `✅ Great news! Your payment of ₹${inq.paymentAmountINR?.toLocaleString('en-IN') || ''} for booking ${inq.referenceNo} has been VERIFIED & APPROVED!`
      : `Hello ${inq.customerName}, this is regarding your NAS Internationals booking reference ${inq.referenceNo} for ${inq.serviceType}.`;
    
    window.open(`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(statusText)}`, '_blank');
  };

  // Filtered List
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = 
      inq.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.serviceType.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'pending') return inq.paymentStatus === 'Pending Verification' || inq.status === 'Pending';
    if (statusFilter === 'approved') return inq.paymentStatus === 'Approved' || inq.status === 'Confirmed';
    if (statusFilter === 'rejected') return inq.paymentStatus === 'Rejected' || inq.status === 'Rejected';
    return true;
  });

  // Calculate Dashboard Metrics
  const pendingCount = inquiries.filter(i => i.paymentStatus === 'Pending Verification' || i.status === 'Pending').length;
  const approvedCount = inquiries.filter(i => i.paymentStatus === 'Approved' || i.status === 'Confirmed').length;
  const totalRevenue = inquiries
    .filter(i => i.paymentStatus === 'Approved' || i.status === 'Confirmed')
    .reduce((sum, i) => sum + (i.paymentAmountINR || 0), 0);

  // If not logged in, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-900">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-white">NAS Admin Verification</h2>
            <p className="text-xs text-slate-400 mt-1">
              Protected Management Portal for NAS Internationals Tours & Travels
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Enter Admin Security PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 1234)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                autoFocus
              />
              <p className="text-[11px] text-slate-500 mt-1">Hint: Type <strong>1234</strong> to login</p>
            </div>

            {authError && (
              <p className="text-xs text-red-400 bg-red-950/50 border border-red-800/80 p-2.5 rounded-xl flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 text-sm"
            >
              <span>Authenticate & Access Admin Desk</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-900 text-[11px] text-slate-500">
            Nungambakkam Headquarters • Managed by MD N. Abdul Hakeem
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-serif text-white tracking-tight flex items-center gap-2">
                  NAS Admin Command Center
                  <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    LIVE MULTI-TAB SYNC
                  </span>
                </h1>
                <p className="text-xs text-slate-400">
                  Manage customer bookings, review uploaded payment screenshots, approve transactions & update services.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4 text-sky-400" />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-800/80 text-red-300 text-xs font-bold transition-all"
            >
              Exit Admin Session
            </button>
          </div>
        </div>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
              <FileText className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-3xl font-black font-serif text-white">{inquiries.length}</p>
            <p className="text-[11px] text-slate-400">Recorded across all services</p>
          </div>

          <div className="bg-slate-900 border border-amber-500/40 p-5 rounded-2xl shadow-sm space-y-2 relative overflow-hidden">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-amber-500/10 rounded-full blur-xl"></div>
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Approvals</span>
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <p className="text-3xl font-black font-serif text-amber-400">{pendingCount}</p>
            <p className="text-[11px] text-amber-300/80">Requires receipt verification</p>
          </div>

          <div className="bg-slate-900 border border-emerald-500/40 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold uppercase tracking-wider">Approved Bookings</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-black font-serif text-emerald-400">{approvedCount}</p>
            <p className="text-[11px] text-emerald-300/80">Confirmed & active vouchers</p>
          </div>

          <div className="bg-slate-900 border border-sky-500/40 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-sky-400">
              <span className="text-xs font-bold uppercase tracking-wider">Approved Revenue</span>
              <DollarSign className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-3xl font-black font-serif text-white">₹{totalRevenue.toLocaleString('en-IN')}</p>
            <p className="text-[11px] text-sky-300/80">Verified payments collected</p>
          </div>
        </div>

        {/* Tab Navigation & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveAdminTab('bookings')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeAdminTab === 'bookings'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Bookings & Payment Verification</span>
              {pendingCount > 0 && (
                <span className="bg-slate-950 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveAdminTab('packages')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeAdminTab === 'packages'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Manage Packages</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('logs')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeAdminTab === 'logs'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Real-Time Logs</span>
            </button>
          </div>

          {activeAdminTab === 'bookings' && (
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Box */}
              <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Ref, Name, Phone..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Status Filter buttons */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All ({inquiries.length})
                </button>

                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    statusFilter === 'pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-amber-400'
                  }`}
                >
                  Pending ({pendingCount})
                </button>

                <button
                  onClick={() => setStatusFilter('approved')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    statusFilter === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  Approved ({approvedCount})
                </button>

                <button
                  onClick={() => setStatusFilter('rejected')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    statusFilter === 'rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-slate-400 hover:text-red-400'
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>
          )}
        </div>

        {/* TAB 1: BOOKING & PAYMENT APPROVAL LIST */}
        {activeAdminTab === 'bookings' && (
          <div className="space-y-4">
            {filteredInquiries.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
                <FileText className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Booking Requests Found</h3>
                <p className="text-xs max-w-sm mx-auto">
                  {searchTerm ? `No records match search "${searchTerm}".` : 'When users place bookings or upload payment screenshots, they will appear here in real time.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredInquiries.map((inq) => {
                  const isPending = inq.paymentStatus === 'Pending Verification' || inq.status === 'Pending';
                  const isApproved = inq.paymentStatus === 'Approved' || inq.status === 'Confirmed';
                  const isRejected = inq.paymentStatus === 'Rejected' || inq.status === 'Rejected';

                  return (
                    <div
                      key={inq.id}
                      className={`bg-slate-900 border rounded-3xl p-5 sm:p-6 shadow-md transition-all space-y-4 ${
                        isPending
                          ? 'border-amber-500/50 bg-slate-900/90'
                          : isApproved
                          ? 'border-emerald-500/40 bg-slate-900/70'
                          : 'border-red-900/50 bg-slate-950'
                      }`}
                    >
                      {/* Top Row: Ref Code, Status Badge, Timestamp */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold bg-slate-800 text-amber-300 px-3 py-1 rounded-xl border border-slate-700">
                            REF: {inq.referenceNo}
                          </span>
                          
                          <span className="text-xs font-bold text-slate-300">
                            Service: <strong className="text-white">{inq.serviceType}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {isPending && (
                            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 animate-spin" />
                              Pending Verification
                            </span>
                          )}

                          {isApproved && (
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Payment Approved
                            </span>
                          )}

                          {isRejected && (
                            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase flex items-center gap-1.5">
                              <XCircle className="w-3.5 h-3.5" />
                              Payment Rejected
                            </span>
                          )}

                          <span className="text-[11px] text-slate-400">
                            {new Date(inq.createdTime).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Main Content Grid: Customer Info & Payment Receipt */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Customer Details */}
                        <div className="lg:col-span-4 space-y-2.5 text-xs text-slate-300">
                          <p className="text-sm font-bold text-white flex items-center gap-2">
                            <User className="w-4 h-4 text-sky-400" />
                            {inq.customerName}
                          </p>

                          <div className="flex items-center gap-2 text-slate-400">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <a href={`tel:${inq.phone}`} className="hover:text-amber-300 font-semibold">{inq.phone}</a>
                          </div>

                          {inq.email && inq.email !== 'N/A' && (
                            <div className="flex items-center gap-2 text-slate-400">
                              <Mail className="w-3.5 h-3.5 text-sky-400" />
                              <a href={`mailto:${inq.email}`} className="hover:text-amber-300">{inq.email}</a>
                            </div>
                          )}

                          <div className="pt-1">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Customer Details / Request:</p>
                            <p className="text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1 italic">
                              "{inq.details}"
                            </p>
                          </div>
                        </div>

                        {/* Payment Information */}
                        <div className="lg:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                          <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                            <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                              <DollarSign className="w-4 h-4" />
                              Payment Details
                            </span>

                            {inq.paymentAmountINR ? (
                              <span className="text-base font-black font-serif text-emerald-400">
                                ₹{inq.paymentAmountINR.toLocaleString('en-IN')}
                              </span>
                            ) : (
                              <span className="text-slate-400">Inquiry Only</span>
                            )}
                          </div>

                          {inq.paymentMethod && (
                            <p className="text-slate-300">
                              <strong>Payment Method:</strong> {inq.paymentMethod}
                            </p>
                          )}

                          {inq.paymentUtr && (
                            <p className="text-slate-300 font-mono">
                              <strong>UTR / Ref No:</strong> <span className="text-amber-300 select-all font-bold">{inq.paymentUtr}</span>
                            </p>
                          )}

                          {/* Screenshot Thumbnail Preview */}
                          {inq.paymentScreenshot ? (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                                Payment Screenshot Uploaded:
                              </span>
                              <div className="flex items-center gap-3">
                                <div 
                                  onClick={() => setSelectedScreenshot({ src: inq.paymentScreenshot!, ref: inq.referenceNo, name: inq.customerName })}
                                  className="h-20 w-28 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden cursor-pointer hover:border-amber-400 group relative transition-all shadow-md"
                                >
                                  <img src={inq.paymentScreenshot} alt="Receipt" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Eye className="w-5 h-5 text-amber-300" />
                                  </div>
                                </div>

                                <button
                                  onClick={() => setSelectedScreenshot({ src: inq.paymentScreenshot!, ref: inq.referenceNo, name: inq.customerName })}
                                  className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Inspect Receipt</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-slate-400 italic text-[11px]">No payment screenshot attached.</p>
                          )}

                          {/* Admin Notes Box */}
                          <div className="pt-2 border-t border-slate-850">
                            {editingNotesId === inq.id ? (
                              <div className="space-y-2">
                                <textarea
                                  value={tempNotes}
                                  onChange={(e) => setTempNotes(e.target.value)}
                                  placeholder="Add admin note..."
                                  rows={2}
                                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSaveNotes(inq.id)}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-lg text-xs"
                                  >
                                    Save Note
                                  </button>
                                  <button
                                    onClick={() => setEditingNotesId(null)}
                                    className="bg-slate-800 text-slate-400 px-3 py-1 rounded-lg text-xs"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between">
                                <p className="text-slate-400 text-[11px]">
                                  <strong>Admin Note:</strong> {inq.adminNotes || 'None'}
                                </p>
                                <button
                                  onClick={() => { setEditingNotesId(inq.id); setTempNotes(inq.adminNotes || ''); }}
                                  className="text-[10px] text-amber-400 hover:underline shrink-0 ml-2"
                                >
                                  Edit Note
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Control Desk */}
                        <div className="lg:col-span-3 space-y-2.5">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Approval Actions:</p>
                          
                          {isPending && (
                            <div className="space-y-2">
                              <button
                                onClick={() => handleApprove(inq)}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Approve Payment & Issue Voucher</span>
                              </button>

                              <button
                                onClick={() => handleReject(inq)}
                                className="w-full bg-red-950/80 hover:bg-red-900 text-red-300 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-red-800 transition-all active:scale-95"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Reject Payment</span>
                              </button>
                            </div>
                          )}

                          {isApproved && (
                            <div className="space-y-2">
                              <div className="bg-emerald-950/40 border border-emerald-800/80 p-3 rounded-xl text-center space-y-1">
                                <p className="text-xs font-bold text-emerald-400">✔ Payment Verified</p>
                                {inq.approvedBy && (
                                  <p className="text-[10px] text-slate-400">By {inq.approvedBy}</p>
                                )}
                              </div>

                              <button
                                onClick={() => handleReject(inq)}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-3 rounded-xl text-[11px]"
                              >
                                Revoke Approval
                              </button>
                            </div>
                          )}

                          {isRejected && (
                            <div className="space-y-2">
                              <div className="bg-red-950/40 border border-red-800/80 p-3 rounded-xl text-center space-y-1">
                                <p className="text-xs font-bold text-red-400">✘ Payment Rejected</p>
                              </div>

                              <button
                                onClick={() => handleApprove(inq)}
                                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-xl text-[11px]"
                              >
                                Re-Approve Payment
                              </button>
                            </div>
                          )}

                          <button
                            onClick={() => handleWhatsAppCustomer(inq)}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
                          >
                            <Send className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Notify Customer on WhatsApp</span>
                          </button>

                          <button
                            onClick={() => handleDelete(inq.id, inq.referenceNo)}
                            className="w-full text-slate-500 hover:text-red-400 text-[11px] py-1 flex items-center justify-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Record</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANAGE PACKAGES */}
        {activeAdminTab === 'packages' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold font-serif text-white">Active Featured Tour Packages</h2>
              <p className="text-xs text-slate-400">Manage rates, inclusions and published packages on the main website.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FEATURED_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex gap-4">
                  <img src={pkg.image} alt={pkg.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {pkg.badge || pkg.category}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">{pkg.title}</h4>
                    <p className="text-xs text-emerald-400 font-mono font-bold">₹{pkg.priceINR.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-slate-400">{pkg.duration} • {pkg.destination}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REAL-TIME LOGS */}
        {activeAdminTab === 'logs' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif text-white">Multi-Tab Real-Time Sync Logs</h2>
                <p className="text-xs text-slate-400">Live event stream across user and admin browser tabs.</p>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs space-y-2 max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-slate-500 italic">No events recorded in this session yet. Try opening another tab and submitting a payment!</p>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 border-b border-slate-900 pb-1.5 text-slate-300">
                    <span className="text-slate-500 text-[10px] shrink-0">{log.time}</span>
                    <span className="text-amber-400 shrink-0">[{log.type}]</span>
                    <span>{log.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* SCREENSHOT LIGHTBOX MODAL */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative space-y-4 my-auto max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Payment Screenshot Inspection</h3>
                <p className="text-xs text-slate-400">
                  Ref: <strong className="text-amber-300">{selectedScreenshot.ref}</strong> • Customer: <strong className="text-white">{selectedScreenshot.name}</strong>
                </p>
              </div>

              <button
                onClick={() => setSelectedScreenshot(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 min-h-0 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800 p-2">
              <img
                src={selectedScreenshot.src}
                alt="Payment Receipt"
                className="max-h-[65vh] max-w-full object-contain rounded-xl"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedScreenshot(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                Close Lightbox
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
