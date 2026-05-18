import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Settings, 
  Copy, 
  Download, 
  BarChart3, 
  MoreVertical, 
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Plus,
  CheckCircle2,
  Users,
  Bell,
  Box,
  Users2,
  Calendar,
  Clock,
  TrendingUp,
  PieChart as PieChartIcon,
  Check,
  Eye,
  FileSpreadsheet,
  FileIcon,
  ArrowLeft
} from 'lucide-react';
import RevisionModal from './components/RevisionModal';
import RecruitmentOutcomeModal from './components/OutcomeModal';
import CustomSelect from '../../components/ui/CustomSelect';


const Toast = ({ message, isVisible, onClose }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 bg-[#333333] text-white rounded-xl shadow-2xl border border-white/5"
      >
        <div className="w-6 h-6 bg-[#22c55e] rounded-full flex items-center justify-center">
          <Check size={14} strokeWidth={4} className="text-white" />
        </div>
        <span className="text-sm font-bold tracking-tight">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

const RequisitionDetails = ({ data, onBack, onDownloadStart }) => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* Header Info */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 tracking-tight leading-tight">Manpower Requisition Details</h1>
            <p className="text-xs sm:text-sm font-bold text-gray-400 mt-1 leading-relaxed">
              Complete requisition data with all fields
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
          <button 
            onClick={() => onDownloadStart('PDF file')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] sm:text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            <Download size={14} />
            PDF
          </button>
          <button 
            onClick={() => onDownloadStart('Excel file')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] sm:text-xs font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
          >
            <Download size={14} />
            Excel
          </button>
          <button 
            onClick={onBack}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-white border border-gray-100 text-gray-600 rounded-xl text-[10px] sm:text-xs font-bold shadow-sm hover:bg-gray-50 transition-all"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-10 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/20">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">{data.role}</h2>
            <p className="text-xs sm:text-sm font-bold text-gray-400 mt-1">{data.dept}</p>
          </div>
          <span className="px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
            {data.status}
          </span>
        </div>

        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {[
                { label: 'Requisition Date', value: data.date },
                { label: 'Required By Date', value: '09 Apr 2026' },
                { label: 'Priority', value: 'Medium' },
                { label: 'Working Hrs.', value: 'fg' },
                { label: 'No. of Positions', value: data.positions },
                { label: 'Employment Type', value: 'Contract' },
                { label: 'Reason for Requisition', value: 'Replacement' },
                { label: 'Replacement Of', value: 'fg' },
                { label: 'Work Location', value: 'fg' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{item.label}</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-700 break-words">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Candidate & Compensation */}
          <div className="space-y-6">
            <h3 className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">Candidate & Compensation</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {[
                { label: 'Min Qualification', value: 'fg' },
                { label: 'Min Experience', value: 'fg' },
                { label: 'Key Skills', value: <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 font-bold text-[10px] sm:text-xs border border-blue-100">fg</span> },
                { label: 'Job Responsibilities', value: 'fgf' },
                { label: 'Salary Min CTC', value: '—' },
                { label: 'Salary Max CTC', value: '—' },
                { label: 'Budget Approved', value: 'Yes' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{item.label}</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-700 break-words">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Raised By Section */}
        <div className="px-6 sm:px-10 py-8 sm:py-10 border-t border-gray-50 space-y-6">
          <h3 className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">Raised By</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: 'Requested By', value: 'fg' },
              { label: 'Requested Designation', value: 'fg' },
              { label: 'HOD Name', value: 'fg' },
              { label: 'Remarks', value: 'fg' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{item.label}</p>
                <p className="text-xs sm:text-sm font-bold text-gray-700 break-words">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Outcome */}
        <div className="px-6 sm:px-10 py-8 sm:py-10 border-t border-gray-50 space-y-6 bg-gray-50/20">
          <h3 className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">Recruitment Outcome</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: 'Hired Employee', value: 'po' },
              { label: 'Selection Date', value: '30 Apr 2026' },
              { label: 'Joining Date', value: '01 May 2026' },
              { label: 'Recruitment Source', value: 'Job Portal' },
              { label: 'Recruitment Status', value: 'Close' },
              { label: 'Document No', value: 'HR-001' },
              { label: 'Revision No', value: '00/11.04.2026' },
              { label: 'Track By', value: '—' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{item.label}</p>
                <p className="text-xs sm:text-sm font-bold text-gray-700 break-words">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow & Audit */}
        <div className="px-6 sm:px-10 py-8 sm:py-10 border-t border-gray-50 space-y-6">
          <h3 className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">Workflow & Audit</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 sm:col-span-4 space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Approval Token</p>
              <p className="text-[10px] sm:text-xs font-mono font-bold text-gray-500 break-all bg-gray-50 p-3 rounded-lg border border-gray-100">84ce1795ac23463af699e9ed3c7b374338d8e6ba4fa8064a</p>
            </div>
            {[
              { label: 'Submitted At', value: '24 Apr 2026' },
              { label: 'Approved At', value: '24 Apr 2026' },
              { label: 'Approved By', value: 'Af' },
              { label: 'Rejected At', value: '—' },
              { label: 'Rejected By', value: '—' },
              { label: 'Rejection Reason', value: '—' },
              { label: 'Created At', value: '24 Apr 2026' },
              { label: 'Updated At', value: '24 Apr 2026' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{item.label}</p>
                <p className="text-xs sm:text-sm font-bold text-gray-700 break-words">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionMenu = ({ data, onDownloadStart, onViewDetails, onOpenOutcome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-blue-600 bg-gray-50'}`}
      >
        <MoreVertical size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 overflow-hidden"
          >
            <button 
              onClick={() => {
                onViewDetails(data);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors group"
            >
              <Eye size={18} className="text-gray-400 group-hover:text-blue-600" />
              <span>View details</span>
            </button>
            
            <button 
              onClick={() => {
                onDownloadStart('Excel file');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#10b981] hover:bg-emerald-50 transition-colors group"
            >
              <FileText size={18} className="text-[#10b981]" />
              <span>Download excel</span>
            </button>
            
            <button 
              onClick={() => {
                onDownloadStart('PDF file');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors group"
            >
              <FileText size={18} className="text-blue-600" />
              <span>Download PDF</span>
            </button>
            
            <div className="h-px bg-gray-50 mx-2 my-1" />
            
            <button 
              onClick={() => {
                onOpenOutcome(data);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#10b981] hover:bg-emerald-50 transition-colors group"
            >
              <span className="pl-0.5">Recruitment Outcome</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HiredView = ({ filterDept }) => {
  const hiredData = [
    { mrf: 'HR-001', dept: 'Dispatch', role: 'fgf', employee: 'po', requiredBy: '2026-04-09', recruitedDate: '2026-05-01', tat: 22, vsRequired: '22d late', docRev: 'HR-001 / 00/11.04.2026' },
    { mrf: '8840ef5d', dept: 'Account', role: 'Sr. Executive', employee: 'demo employee', requiredBy: '2026-04-30', recruitedDate: '2026-03-28', tat: 33, vsRequired: '33d early', docRev: '—' },
    { mrf: 'HR-001', dept: 'HR', role: 'Manager', employee: 'Ajay Ahir', requiredBy: '2026-04-30', recruitedDate: '2026-04-16', tat: 14, vsRequired: '14d early', docRev: 'HR-001 / 00/11.04.2026' },
    { mrf: 'HR-001', dept: 'HR', role: 'dev', employee: 'Chaj', requiredBy: '2026-03-14', recruitedDate: '2026-05-30', tat: 77, vsRequired: '77d late', docRev: 'HR-001 / 00/11.04.2026' },
  ];

  const filteredHired = hiredData.filter(item => 
    filterDept === 'All departments' || item.dept === filterDept
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hires By Month */}
        <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm space-y-6 min-h-[300px]">
          <h3 className="text-xs font-bold text-gray-700">Hires By Month</h3>
          <div className="h-44 relative mt-4 flex items-end ml-6">
            <div className="absolute -left-6 h-full flex flex-col justify-between text-[10px] font-bold text-gray-400 pr-2">
              {[4, 3, 2, 1, 0].map(val => <span key={val} className="h-0 flex items-center justify-end">{val}</span>)}
            </div>
            <div className="flex-1 h-full border-l border-b border-gray-300 relative">
              {[1, 2, 3].map(val => (
                <div key={val} className="absolute w-full border-t border-dashed border-gray-100" style={{ bottom: `${val * 25}%` }} />
              ))}
              <div className="absolute inset-0 flex justify-around items-end px-2 h-full">
                {[
                  { label: 'May 2026', value: 2 },
                  { label: 'Mar 2026', value: 1 },
                  { label: 'Apr 2026', value: 1 },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full max-w-[40px] relative mx-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(bar.value / 4) * 100}%` }}
                      className="w-full bg-[#10b981] rounded-t-sm shadow-sm"
                    />
                    <span className="text-[8px] font-bold text-gray-400 whitespace-nowrap absolute -bottom-6 truncate max-w-full">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Hired Departments */}
        <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm space-y-6 min-h-[300px]">
          <h3 className="text-xs font-bold text-gray-700">Top Hired Departments</h3>
          <div className="h-44 relative mt-4 flex flex-col ml-12">
            <div className="flex-1 flex relative border-l border-b border-gray-300">
              {[1, 2, 3].map(val => (
                <div key={val} className="absolute h-full border-l border-dashed border-gray-100" style={{ left: `${val * 25}%` }} />
              ))}
              <div className="absolute -bottom-6 w-full flex justify-between text-[10px] font-bold text-gray-400 px-0">
                {[0, 1, 2, 3, 4].map(val => <span key={val} className="w-0 flex items-center justify-center">{val}</span>)}
              </div>
              <div className="absolute inset-0 flex flex-col justify-around py-2">
                {[
                  { label: 'HR', value: 2 },
                  { label: 'Dispatch', value: 1 },
                  { label: 'Account', value: 1 },
                ].map((bar, i) => (
                  <div key={i} className="flex items-center group relative h-6 pr-4">
                    <span className="absolute -left-14 text-[9px] font-bold text-gray-500 w-12 text-right truncate">{bar.label}</span>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(bar.value / 4) * 100}%` }}
                      className="h-full bg-[#3b82f6] rounded-r-sm shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hired TAT Distribution */}
        <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm space-y-6 min-h-[300px] md:col-span-2 lg:col-span-1">
          <h3 className="text-xs font-bold text-gray-700">Hired TAT Distribution</h3>
          <div className="h-44 flex items-center justify-center relative mt-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full transform rotate-[270deg]">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="5.5"></circle>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#0ea5e9" strokeWidth="5.5" strokeDasharray="44 100" strokeDashoffset="0"></circle>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="5.5" strokeDasharray="44 100" strokeDashoffset="-45"></circle>
              </svg>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[110%] flex flex-col items-center">
                <span className="text-[10px] font-bold text-[#0ea5e9] whitespace-nowrap mb-1">Early: 2</span>
                <div className="h-6 w-px bg-[#0ea5e9]/40"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[110%] flex flex-col items-center">
                <div className="h-6 w-px bg-[#ef4444]/40"></div>
                <span className="text-[10px] font-bold text-[#ef4444] whitespace-nowrap mt-1">Late: 2</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[70%] h-[70%] bg-white rounded-full shadow-inner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f0f9f6]/30 rounded-[1.5rem] border border-[#e2f2ed] shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-[#eaf7f2] border-b border-[#e2f2ed]">
                {['MRF NO.', 'DEPARTMENT', 'DESIGNATION', 'EMPLOYEE HIRED', 'REQUIRED BY', 'RECRUITED DATE', 'TAT (DAYS)', 'VS REQUIRED', 'DOC / REV'].map((h) => (
                  <th key={h} className="px-6 py-5 text-[10px] font-bold text-[#639284] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2f2ed]">
              {filteredHired.length > 0 ? filteredHired.map((row, i) => (
                <tr key={i} className="hover:bg-white/60 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">{row.mrf}</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-700">{row.dept}</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-700">{row.role}</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-500">{row.employee}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-400">{row.requiredBy}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-400">{row.recruitedDate}</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-800">{row.tat}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-tight ${
                      row.vsRequired.includes('late') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {row.vsRequired}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[10px] font-mono font-bold text-gray-400">{row.docRev}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Search size={32} strokeWidth={1} />
                      <p className="text-sm font-bold italic">No matching hired records found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ManpowerRequisition = () => {
  const [activeTab, setActiveTab] = useState('All Requisitions');
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [revisionData, setRevisionData] = useState({ docNo: '', revNo: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [viewState, setViewState] = useState('LIST');
  const [selectedReq, setSelectedReq] = useState(null);
  
  const [filterYear, setFilterYear] = useState('All years');
  const [filterStatus, setFilterStatus] = useState('All statuses');
  const [filterDept, setFilterDept] = useState('All departments');

  const requisitions = [
    { date: '24 Apr 2026', dept: 'Dispatch', role: 'fgf', positions: 1, requestedBy: 'fg', docRev: 'HR-001 / 00/11.04.2026', status: 'Hired' },
    { date: '17 Mar 2026', dept: 'Account', role: 'Sr. Executive', positions: 1, requestedBy: 'Jaimin', docRev: '—', status: 'Hired' },
    { date: '14 Mar 2026', dept: 'HR', role: 'Manager', positions: 1, requestedBy: 'Ajit', docRev: 'HR-001 / 00/11.04.2026', status: 'Hired' },
    { date: '13 Mar 2026', dept: 'HR', role: 'dev', positions: 1, requestedBy: 'dev', docRev: 'HR-001 / 00/11.04.2026', status: 'Hired' },
  ];

  const filteredRequisitions = requisitions.filter(item => {
    const yearMatch = filterYear === 'All years' || item.date.includes(filterYear);
    const statusMatch = filterStatus === 'All statuses' || item.status === filterStatus;
    const deptMatch = filterDept === 'All departments' || item.dept === filterDept;
    return yearMatch && statusMatch && deptMatch;
  });

  const deptLinks = [
    { name: 'Account', link: '#' },
    { name: 'Dispatch', link: '#' },
    { name: 'HR', link: '#' },
    { name: 'Production', link: '#' },
    { name: 'Purchase', link: '#' },
    { name: 'Test', link: '#' },
  ];

  const handleCopy = (text, type = 'Standard link') => {
    navigator.clipboard.writeText(text);
    triggerToast(`${type} copied`);
  };

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
      <RevisionModal 
        isOpen={isRevisionModalOpen} 
        onClose={() => setIsRevisionModalOpen(false)} 
        onSave={(data) => setRevisionData(data)}
        currentValues={revisionData}
      />

      <RecruitmentOutcomeModal 
        isOpen={isOutcomeModalOpen}
        onClose={() => setIsOutcomeModalOpen(false)}
        onSave={(data) => triggerToast('Outcome updated successfully')}
        data={selectedReq}
      />

      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      {/* Desktop Navbar */}
      <div className="hidden lg:flex justify-between items-center bg-white p-4 -mx-8 -mt-8 mb-8 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 pl-4">
          <h2 className="text-sm font-bold text-gray-700 tracking-tight">Admin Dashboard</h2>
        </div>
        <div className="flex items-center gap-4 pr-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors">
            <Download size={14} />
            Download Excel
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors">
            <Users size={14} />
            Staff Form
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors">
            <Users2 size={14} />
            Worker Form
          </button>
          <div className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-100">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings size={18} />
            </button>
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right">
                <p className="text-[11px] font-bold text-gray-800">Mr. Vimal Patel</p>
                <p className="text-[9px] text-gray-400">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-100">
                M
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewState === 'DETAILS' ? (
        <RequisitionDetails 
          data={selectedReq} 
          onBack={() => setViewState('LIST')} 
          onDownloadStart={triggerToast}
        />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800 tracking-tight leading-tight">Manpower Requisitions</h1>
                <p className="text-xs sm:text-sm font-bold text-gray-400 mt-1 leading-relaxed">
                  Create, submit, and share approval links with higher authorities.
                </p>
              </div>
            </div>
            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-bold shadow-lg shadow-blue-100">
                <Download size={14} />
                Excel
              </button>
              <button className="p-2.5 bg-white border border-gray-100 text-gray-400 rounded-xl">
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Register & Revision Section */}
          <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">Register</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 truncate max-w-[100px]">{revisionData.docNo || 'Doc —'}</span>
                  <div className="w-px h-4 bg-gray-200 shrink-0"></div>
                  <span className="text-xs font-bold text-gray-500 truncate max-w-[100px]">{revisionData.revNo || 'Rev —'}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsRevisionModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold border border-blue-100/50 hover:bg-blue-100 transition-all"
              >
                <Settings size={14} strokeWidth={3} />
                Set register
              </button>

              <div className="w-full sm:w-auto bg-amber-50/50 border border-amber-100/50 rounded-xl px-4 py-2.5">
                <p className="text-[10px] font-bold text-amber-700/80 leading-tight italic">
                  Register values apply to all rows and Excel export.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-1 bg-gray-50 rounded-2xl w-full sm:w-fit gap-1">
            {['All Requisitions', 'Hired'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-[#009b77] shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Shared Links Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-800 tracking-tight">Standard public link</h3>
                <p className="text-[11px] font-bold text-gray-400 leading-relaxed">
                  Single link for all departments.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  readOnly
                  value="https://ndatechnology.in/public/manpower-requisition/697ce60cac25c1f712b6cfcc"
                  className="flex-1 bg-gray-50/30 border border-gray-100 rounded-xl px-4 py-3 text-[10px] sm:text-xs font-bold text-blue-400 shadow-sm outline-none truncate"
                />
                <button 
                  onClick={() => handleCopy("https://ndatechnology.in/public/manpower-requisition/697ce60cac25c1f712b6cfcc")}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm space-y-6 flex flex-col justify-center">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Department Links</h3>
              <div className="grid grid-cols-3 gap-2">
                {deptLinks.map((dept) => (
                  <button 
                    key={dept.name}
                    onClick={() => handleCopy(`#`, dept.name)}
                    className="p-2 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all text-center"
                  >
                    <p className="text-[10px] font-bold text-gray-700 truncate">{dept.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Common Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CustomSelect 
                options={['All years', '2026', '2025']} 
                value={filterYear} 
                onChange={setFilterYear} 
              />
              <CustomSelect 
                options={['All statuses', 'Draft', 'Submitted', 'Approved', 'Rejected', 'Hired']} 
                value={filterStatus} 
                onChange={setFilterStatus} 
              />
              <CustomSelect 
                options={['All departments', 'Account', 'Dispatch', 'HR', 'Production', 'Purchase', 'Test']} 
                value={filterDept} 
                onChange={setFilterDept} 
              />
            </div>

            <button className={`flex items-center justify-center gap-2 px-8 py-2.5 text-white rounded-xl text-xs font-bold shadow-lg transition-all ${
              activeTab === 'Hired' ? 'bg-[#009b77] shadow-emerald-100 hover:bg-[#007b5e]' : 'bg-emerald-600 shadow-emerald-100 hover:bg-emerald-700'
            }`}>
              <Download size={14} />
              Excel Export
            </button>
          </div>

          {/* Content Switcher */}
          {activeTab === 'All Requisitions' ? (
            <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              {/* Yearly Summary Card */}
              <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all group"
                >
                  <div className="flex items-center gap-2 text-left">
                    <BarChart3 className="text-blue-900/40 group-hover:text-blue-600 transition-colors shrink-0" size={18} strokeWidth={3} />
                    <h3 className="text-sm font-bold text-blue-900/60 group-hover:text-blue-900 transition-colors tracking-tight">Yearly Summary</h3>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gray-50 text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                    {isSummaryOpen ? <ChevronUp size={16} strokeWidth={3} /> : <ChevronDown size={16} strokeWidth={3} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isSummaryOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-6 sm:px-8 pb-8 pt-2">
                        <div className="inline-flex items-center bg-gray-50/80 px-4 py-2.5 rounded-xl border border-gray-100/50">
                          <p className="text-xs font-medium text-gray-500">
                            <span className="font-bold text-gray-800">2026</span> : 4 requisition(s)
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-gray-50/30 border-b border-gray-50">
                        {['Date', 'Department', 'Designation', 'Positions', 'Requested By', 'Doc / Rev', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredRequisitions.length > 0 ? filteredRequisitions.map((req, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-5 text-xs font-bold text-gray-500">{req.date}</td>
                          <td className="px-6 py-5 text-sm font-bold text-gray-700">{req.dept}</td>
                          <td className="px-6 py-5 text-sm font-bold text-gray-700">{req.role}</td>
                          <td className="px-6 py-5 text-sm font-bold text-gray-500">{req.positions}</td>
                          <td className="px-6 py-5 text-sm font-bold text-gray-500">{req.requestedBy}</td>
                          <td className="px-6 py-5 text-xs font-mono font-bold text-gray-400">{req.docRev}</td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter shadow-sm border border-opacity-50 ${
                              req.status === 'Hired' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <ActionMenu 
                              data={req} 
                              onDownloadStart={triggerToast} 
                              onViewDetails={(r) => { setSelectedReq(r); setViewState('DETAILS'); }} 
                              onOpenOutcome={(r) => { setSelectedReq(r); setIsOutcomeModalOpen(true); }}
                            />
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="8" className="px-6 py-20 text-center text-gray-400 italic font-bold">No results found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <HiredView filterDept={filterDept} />
          )}
        </>
      )}
      
      <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest pb-10">
        <Box size={14} />
        System Ledger HRMS · Recruitment Module
      </div>
    </div>
  );
};

export default ManpowerRequisition;
