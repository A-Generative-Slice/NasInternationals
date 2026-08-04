import React, { useState } from 'react';
import { Search, Bell, UserCheck, Calendar, DollarSign, TrendingUp, Filter, CheckCircle, XCircle, Eye, ArrowUpRight, ShieldAlert, Check, X, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../../context/AppContext';
import { ApplicationItem, ApplicationStatus } from '../../types';

const TREND_DATA = [
  { day: 'Day 1', apps: 12 },
  { day: 'Day 5', apps: 24 },
  { day: 'Day 10', apps: 18 },
  { day: 'Day 15', apps: 38 },
  { day: 'Day 20', apps: 28 },
  { day: 'Day 25', apps: 45 },
  { day: 'Day 30', apps: 52 },
];

export const AdminDashboardView: React.FC = () => {
  const {
    applications,
    updateApplicationStatus,
    setActiveTrackerAppId,
    setCurrentView,
    userRole,
    currentUser,
    setUserRole,
    setActiveModal
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');
  const [viewingApp, setViewingApp] = useState<ApplicationItem | null>(null);

  // Security Guard: Client user CANNOT view the Admin Page
  if (userRole !== 'admin') {
    return (
      <div className="bg-[#EBF3FF]/60 min-h-[calc(100vh-5rem)] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-lg border border-slate-200 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 uppercase tracking-wider">
              Restricted Area
            </span>
            <h2 className="font-display font-extrabold text-2xl text-[#0B1E3D]">
              Admin Operations Access Denied
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              You are signed in as <span className="font-bold text-slate-800">{currentUser?.name || 'Rahul Sharma'}</span> (<span className="font-mono text-slate-700">{currentUser?.email || 'client@nas.com'}</span>) with <strong className="text-[#036CFB]">Client / Applicant</strong> privileges.
            </p>
            <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 text-left font-mono">
              🔒 Security Policy: Standard Client accounts are strictly prevented from viewing administrative operational metrics, financial ledgers, and global applicant records.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveModal('login')}
              className="flex-1 py-3 px-4 bg-[#0B1E3D] hover:bg-blue-900 text-[#EAC166] font-display font-bold text-xs rounded-xl shadow-md transition"
            >
              🔑 Log In as Admin
            </button>
            <button
              onClick={() => setCurrentView('user-dashboard')}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition"
            >
              Return to My Dashboard
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setUserRole('admin')}
              className="text-xs font-semibold text-[#036CFB] hover:underline"
            >
              ⚡ Quick Switch to Admin Account (Test Mode)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = 2450000;
  const pendingPayments = 320000;

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === 'All' || app.status === selectedStatusFilter;

    const matchesType =
      selectedTypeFilter === 'All' || app.type === selectedTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">Processing</span>;
      case 'Pending Payment':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-900 border border-orange-300">Pending Payment</span>;
      case 'Under Review':
      case 'Processing':
      case 'Submitted':
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">{status}</span>;
    }
  };

  const handleApprove = (appId: string) => {
    updateApplicationStatus(appId, 'Approved', 'Application approved by Admin John D. E-Visa copy ready for download.');
  };

  const handleReject = (appId: string) => {
    updateApplicationStatus(appId, 'Rejected', 'Application rejected by Admin due to incomplete document verification.');
  };

  return (
    <div className="bg-[#EBF3FF]/60 min-h-[calc(100vh-5rem)] flex flex-col md:flex-row">
      
      {/* Left Dark Navy Sidebar */}
      <aside className="w-full md:w-60 bg-[#0B1E3D] text-white p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-700/80">
            <div className="w-8 h-8 rounded-lg bg-[#C8A24A] text-[#0B1E3D] font-extrabold flex items-center justify-center text-xs">
              NAS
            </div>
            <span className="font-display font-extrabold text-sm tracking-wider">
              NAS INTERNATIONALS
            </span>
          </div>

          <nav className="space-y-1 text-xs">
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-slate-800 text-[#EAC166] font-bold">
              <Calendar className="w-4 h-4" />
              <span>Bookings & Apps</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/60 font-medium">
              <UserCheck className="w-4 h-4" />
              <span>Users Management</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/60 font-medium">
              <DollarSign className="w-4 h-4" />
              <span>Finance & Ledger</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/60 font-medium">
              <Filter className="w-4 h-4" />
              <span>CMS Portal</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/60 font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Countries Rules</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-700/80 text-[11px] text-slate-400">
          <p>Admin Console v2.4</p>
          <p className="text-slate-500">Connected to Live Cloud DB</p>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Header Search & Admin Profile */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search applicant name, ID, destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#036CFB] shadow-xs"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:text-[#036CFB] relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1"></span>
            </button>

            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                JD
              </div>
              <span className="text-xs font-bold text-slate-800">Admin - John D</span>
            </div>
          </div>
        </div>

        <h1 className="font-display text-2xl font-extrabold text-[#0B1E3D]">
          Admin Operations Dashboard
        </h1>

        {/* Top 3 Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Total Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-2">
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">
              TOTAL REVENUE
            </p>
            <div className="font-display text-3xl font-extrabold text-[#0B1E3D] flex items-baseline space-x-2">
              <span>₹{totalRevenue.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold text-emerald-600">
                (↑ 12%)
              </span>
            </div>
          </div>

          {/* Card 2: Pending Payments */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-2">
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">
              PENDING PAYMENTS
            </p>
            <div className="font-display text-3xl font-extrabold text-[#0B1E3D] flex items-baseline space-x-2">
              <span>₹{pendingPayments.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold text-slate-500">
                (→ 0%)
              </span>
            </div>
          </div>

          {/* Card 3: Application Trends Chart */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              APPLICATION TRENDS (Last 30 Days)
            </p>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#036CFB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#036CFB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area type="monotone" dataKey="apps" stroke="#036CFB" fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Recent Applications Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="font-display font-bold text-[#0B1E3D] text-lg">
              Recent Applications
            </h2>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg py-1.5 px-3 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#036CFB]"
              >
                <option value="All">Status: All</option>
                <option value="Under Review">Under Review</option>
                <option value="Processing">Processing</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={selectedTypeFilter}
                onChange={(e) => setSelectedTypeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg py-1.5 px-3 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#036CFB]"
              >
                <option value="All">Type: All</option>
                <option value="Visitor Visa">Visitor Visa</option>
                <option value="Tour Package">Tour Package</option>
                <option value="Tourist Visa">Tourist Visa</option>
                <option value="Business Visa">Business Visa</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Applicant Name</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Destination</th>
                  <th className="py-3 px-3">Date Submitted</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-slate-800">
                      <div>{app.applicantName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{app.id}</div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">{app.type}</td>
                    <td className="py-3.5 px-3 text-slate-800 font-medium">{app.destination}</td>
                    <td className="py-3.5 px-3 text-slate-500">{app.dateSubmitted}</td>
                    <td className="py-3.5 px-3">{getStatusBadge(app.status)}</td>
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => setViewingApp(app)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold rounded-md transition shadow-2xs"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="px-2.5 py-1 bg-[#0B1E3D] hover:bg-blue-900 text-white font-bold rounded-md transition shadow-2xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
                          className="px-2.5 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-bold rounded-md transition shadow-2xs"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Applicant Detail View Modal */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div>
                <h3 className="font-display font-bold text-lg text-[#0B1E3D]">
                  Application Details: {viewingApp.id}
                </h3>
                <p className="text-xs text-slate-500">{viewingApp.applicantName} • {viewingApp.email}</p>
              </div>
              <button
                onClick={() => setViewingApp(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Destination</span>
                <span className="font-bold text-slate-800">{viewingApp.destination}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Visa Type</span>
                <span className="font-bold text-slate-800">{viewingApp.type}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Passport Number</span>
                <span className="font-mono font-bold text-slate-800">{viewingApp.passportNumber}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Booking Amount</span>
                <span className="font-bold text-[#0B1E3D]">₹{viewingApp.payment.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Uploaded Documents ({viewingApp.documents.length})</h4>
              {viewingApp.documents.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No files uploaded yet.</p>
              ) : (
                <div className="space-y-1.5">
                  {viewingApp.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200">
                      <div>
                        <span className="font-semibold text-slate-700 block">{doc.title}</span>
                        <span className="text-[10px] text-slate-400">{doc.fileName || 'Pending upload'}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => {
                  setActiveTrackerAppId(viewingApp.id);
                  setViewingApp(null);
                  setCurrentView('payment-tracker');
                }}
                className="text-xs font-bold text-[#036CFB] hover:underline"
              >
                Open Full Payment Tracker →
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    handleApprove(viewingApp.id);
                    setViewingApp(null);
                  }}
                  className="px-4 py-2 bg-[#0B1E3D] text-white text-xs font-bold rounded-xl"
                >
                  Approve Application
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
