import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  X, 
  Phone, 
  Mail, 
  ExternalLink, 
  Download, 
  FileText, 
  Database, 
  Key, 
  Check, 
  AlertCircle,
  Eye,
  RefreshCw,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationItem, ApplicationStatus } from '../../types';
import { isSupabaseConfigured, saveSupabaseCredentials } from '../../services/supabaseStorage';

export const AdminDashboardView: React.FC = () => {
  const {
    applications,
    updateApplicationStatus,
    setActiveTrackerAppId,
    setCurrentView,
    allUsers
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [viewingApp, setViewingApp] = useState<ApplicationItem | null>(null);
  const [selectedDocPreview, setSelectedDocPreview] = useState<{ title: string; url?: string; fileName?: string } | null>(null);

  // Supabase Configuration State
  const [showSupabaseSettings, setShowSupabaseSettings] = useState(false);
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(() => localStorage.getItem('VITE_SUPABASE_URL') || '');
  const [supabaseKeyInput, setSupabaseKeyInput] = useState(() => localStorage.getItem('VITE_SUPABASE_ANON_KEY') || '');
  const [supabaseSaveMsg, setSupabaseSaveMsg] = useState('');

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrlInput.trim() || !supabaseKeyInput.trim()) {
      setSupabaseSaveMsg('Please enter both Supabase Project URL and Anon Public Key.');
      return;
    }
    const ok = saveSupabaseCredentials(supabaseUrlInput, supabaseKeyInput);
    if (ok) {
      setSupabaseSaveMsg('Supabase connected successfully! Customer uploads will now sync to cloud bucket.');
      setTimeout(() => setShowSupabaseSettings(false), 2000);
    } else {
      setSupabaseSaveMsg('Failed to initialize Supabase. Check format.');
    }
  };

  const filteredApplications = applications.filter((app) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      app.applicantName.toLowerCase().includes(q) ||
      app.id.toLowerCase().includes(q) ||
      app.destination.toLowerCase().includes(q) ||
      (app.passportNumber && app.passportNumber.toLowerCase().includes(q));

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Approved</span>
          </span>
        );
      case 'Processing':
      case 'In Process':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#036CFB] border border-blue-200 inline-flex items-center space-x-1">
            <RefreshCw className="w-3 h-3 text-[#036CFB] animate-spin" />
            <span>Processing</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center space-x-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Under Review</span>
          </span>
        );
      case 'Submitted':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center space-x-1">
            <span>Submitted</span>
          </span>
        );
    }
  };

  const approvedCount = applications.filter(a => a.status === 'Approved' || a.status === 'Completed').length;
  const reviewCount = applications.filter(a => a.status === 'Under Review' || a.status === 'Processing' || a.status === 'Submitted').length;

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-5rem)] py-6 sm:py-10 px-3.5 sm:px-6 lg:px-8 pb-36 lg:pb-16">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Console Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nas Operations Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062544] tracking-tight mt-0.5">
              Applicant Records & Progress Manager
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Supabase Status Pill */}
            <button
              onClick={() => setShowSupabaseSettings(!showSupabaseSettings)}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-700 shadow-xs flex items-center space-x-2 transition cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-[#036CFB]" />
              <span>{isSupabaseConfigured() ? 'Supabase: Active' : 'Configure Supabase'}</span>
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured() ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-2 rounded-xl bg-[#062544] hover:bg-[#031526] text-white text-xs font-bold transition shadow-xs"
            >
              Back to Portal
            </button>
          </div>
        </div>

        {/* Supabase Credentials Setup Drawer (Collapsible) */}
        {showSupabaseSettings && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-blue-200 shadow-lg space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-[#036CFB]" />
                <h3 className="font-extrabold text-sm sm:text-base text-[#062544]">
                  Supabase Cloud Storage & Auth Setup
                </h3>
              </div>
              <button onClick={() => setShowSupabaseSettings(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              Paste your free Supabase project credentials below. All customer uploaded passport copies, photos, and payment proofs will instantly sync to your Supabase <code>documents</code> bucket.
            </p>

            {supabaseSaveMsg && (
              <div className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#036CFB] shrink-0" />
                <span>{supabaseSaveMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveSupabase} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project URL</label>
                <input
                  type="url"
                  placeholder="https://your-project.supabase.co"
                  value={supabaseUrlInput}
                  onChange={(e) => setSupabaseUrlInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-[#036CFB] min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Anon Public Key</label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseKeyInput}
                  onChange={(e) => setSupabaseKeyInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-[#036CFB] min-h-[42px]"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSupabaseSettings(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#036CFB] hover:bg-[#0256c7] text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Save & Connect
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Quick Operational Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Applications</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#062544] block">{applications.length}</span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">In Progress / Review</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#062544] block">{reviewCount}</span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Approved Visas</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block">{approvedCount}</span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">Registered Clients</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#062544] block">{allUsers?.length || 4}</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search applicant name, passport, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#036CFB]"
            />
          </div>

          <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto">
            {['All', 'Submitted', 'Under Review', 'Processing', 'Approved'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-[#036CFB] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Applicant</th>
                  <th className="py-3.5 px-4">Service & Country</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Progress Stage</th>
                  <th className="py-3.5 px-4">Customer Uploads</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#062544] text-sm">{app.applicantName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{app.id} • {app.passportNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{app.destination}</div>
                      <div className="text-[11px] text-slate-500">{app.type}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800">{app.phone || '+91 99419 00055'}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[140px]">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus, `Status updated to ${e.target.value} by Admin.`)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#036CFB] cursor-pointer"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Processing">Processing</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {app.documents.map((doc) => (
                          <button
                            key={doc.id}
                            onClick={() => setSelectedDocPreview({
                              title: doc.title,
                              fileName: doc.fileName || `${doc.title.toLowerCase().replace(/ /g, '_')}.pdf`,
                              url: doc.url
                            })}
                            className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#036CFB] text-[10px] font-bold border border-blue-100 flex items-center space-x-1 transition"
                            title={`View ${doc.title}`}
                          >
                            <FileText className="w-3 h-3" />
                            <span className="truncate max-w-[80px]">{doc.title.split(' ')[0]}</span>
                          </button>
                        ))}
                        {app.payment?.proofFileName && (
                          <button
                            onClick={() => setSelectedDocPreview({
                              title: 'Payment Proof',
                              fileName: app.payment?.proofFileName,
                              url: app.payment?.proofUrl
                            })}
                            className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center space-x-1 transition"
                            title="View Payment Proof"
                          >
                            <Check className="w-3 h-3" />
                            <span>Payment Proof</span>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => setViewingApp(app)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          title="View Full Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`https://wa.me/${(app.phone || '919941900055').replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                          title="WhatsApp Applicant"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Applicant Full Detail Modal */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 xs:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-[#062544]">
                  Applicant Profile: {viewingApp.applicantName}
                </h3>
                <p className="text-xs text-slate-500 font-mono">{viewingApp.id} • {viewingApp.email}</p>
              </div>
              <button onClick={() => setViewingApp(null)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Country</span>
                <span className="font-bold text-[#062544]">{viewingApp.destination}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Visa Category</span>
                <span className="font-bold text-[#062544]">{viewingApp.type}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Passport Number</span>
                <span className="font-mono font-bold text-[#062544]">{viewingApp.passportNumber}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Stage</span>
                <div className="mt-0.5">{getStatusBadge(viewingApp.status)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-[#062544] uppercase tracking-wider">Customer Uploaded Files</h4>
              <div className="space-y-2">
                {viewingApp.documents.map((doc) => (
                  <div key={doc.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block">{doc.title}</span>
                      <span className="text-[11px] text-slate-400">{doc.fileName || 'document_scan.pdf'}</span>
                    </div>
                    <button
                      onClick={() => setSelectedDocPreview({
                        title: doc.title,
                        fileName: doc.fileName || `${doc.title}.pdf`,
                        url: doc.url
                      })}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#036CFB] hover:bg-blue-50 transition"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
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
                Open Live Tracker View ↗
              </button>

              <button
                onClick={() => setViewingApp(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document View / Preview Modal */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 xs:p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90dvh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#062544]">
                  {selectedDocPreview.title}
                </h3>
                <p className="text-[11px] text-slate-400 truncate">{selectedDocPreview.fileName}</p>
              </div>
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Preview Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#036CFB] flex items-center justify-center shadow-inner">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <span className="font-bold text-slate-800 text-sm block">{selectedDocPreview.fileName}</span>
                <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 inline-block">
                  ✓ Verified by applicant
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
              >
                Close
              </button>
              {selectedDocPreview.url ? (
                <a
                  href={selectedDocPreview.url}
                  target="_blank"
                  rel="noreferrer"
                  download={selectedDocPreview.fileName}
                  className="px-4 py-2 rounded-xl bg-[#036CFB] text-white text-xs font-bold hover:bg-[#0256c7] transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </a>
              ) : (
                <button
                  onClick={() => alert(`Document "${selectedDocPreview.fileName}" stored securely in customer application records.`)}
                  className="px-4 py-2 rounded-xl bg-[#036CFB] text-white text-xs font-bold hover:bg-[#0256c7] transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Scan</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
