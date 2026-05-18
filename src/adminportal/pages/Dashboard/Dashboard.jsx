import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  FileText,
  TrendingDown,
  Download,
  Users2,
  UserCheck,
  Bell,
  Settings,
  Search,
  ChevronRight,
  Plus,
  Scale,
  Calendar,
  AlertCircle,
  CheckCircle2,
  PieChart as PieChartIcon,
  BarChart3,
  Mail,
  MoreHorizontal,
  FileBadge
} from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, tag, tagColor, trend }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${tagColor === 'red' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>
        <Icon size={24} />
      </div>
      {tag && (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tagColor === 'red' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
          }`}>
          {tag}
        </span>
      )}
    </div>
    <div>
      <p className="text-xs font-medium text-gray-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

const ActionButton = ({ icon: Icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex flex-col items-center justify-center gap-3 p-4 sm:p-6 bg-white rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-all group text-center"
  >
    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
      <Icon size={20} />
    </div>
    <span className="text-[10px] sm:text-[11px] font-semibold text-gray-600 group-hover:text-gray-900 line-clamp-1">{label}</span>
  </motion.button>
);

const AlertCard = ({ title, status, date, type, urgent }) => (
  <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4 flex flex-col h-full">
    <div className="flex gap-4 flex-1">
      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${type === 'alert' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>
        {type === 'alert' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-gray-800 leading-relaxed line-clamp-2">{title}</h4>
        <p className="text-[10px] text-gray-400">{status}</p>
      </div>
    </div>
    <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50/50">
      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${urgent ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
        {urgent ? 'Urgent' : 'On Track'}
      </span>
      <span className="text-[10px] font-medium text-gray-500">{date}</span>
    </div>
  </div>
);

const Dashboard = ({ onAnalyticsClick }) => {
  const [pipelineView, setPipelineView] = useState('Monthly');

  const monthlyData = [
    { label: 'NOV', h: '10%' },
    { label: 'DEC', h: '15%' },
    { label: 'JAN', h: '85%', active: true, value: '9 (100%)' },
    { label: 'FEB', h: '45%' },
    { label: 'MAR', h: '25%' },
    { label: 'APR', h: '35%' },
    { label: 'MAY', h: '10%' },
  ];

  const quarterlyData = [
    { label: 'Q3 25', h: '10%', showZero: true, count: 0 },
    { label: 'Q4 25', h: '10%', showZero: true, count: 0 },
    { label: 'Q1 26', h: '85%', active: true, value: '9 (100%)' },
    { label: 'Q2 26', h: '20%' },
  ];

  const currentData = pipelineView === 'Monthly' ? monthlyData : quarterlyData;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
      {/* Navbar - Desktop Only */}
      <div className="hidden lg:flex justify-between items-center bg-white p-4 -mx-8 -mt-8 mb-8 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 pl-4">
          <h2 className="text-sm font-bold text-gray-700">Admin Dashboard</h2>
        </div>
        <div className="flex items-center gap-4 pr-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors">
            <Download size={14} />
            Download Excel
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-xs font-medium hover:bg-gray-50 rounded-lg transition-colors">
            <Users size={14} />
            Staff Form
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-xs font-medium hover:bg-gray-50 rounded-lg transition-colors">
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

      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">Overview of workforce, hiring, and compliance</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onAnalyticsClick}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-blue-600 shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            <BarChart3 size={16} />
            Data Analytics
          </button>
          <button className="lg:hidden p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard title="Total Employees" value="5" icon={Users} tag="20% active" />
        <StatsCard title="Active Workers" value="1" icon={UserPlus} tag="20% of total" />
        <StatsCard title="Active Requisitions" value="4" icon={FileText} />
        <StatsCard title="Attrition Rate" value="40%" icon={TrendingDown} tag="High" tagColor="red" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Interview Summary */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 mb-8">Interview Summary</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="80 20" strokeDashoffset="0"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="10 90" strokeDashoffset="-80"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="5 95" strokeDashoffset="-90"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="5 95" strokeDashoffset="-95"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-gray-800 leading-none">20</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Candidates</span>
              </div>
            </div>

            <div className="w-full mt-10 grid grid-cols-2 gap-y-4 px-2">
              {[
                { label: 'Selected', value: 16, color: 'bg-blue-600' },
                { label: 'Pending', value: 2, color: 'bg-amber-400' },
                { label: 'On Hold', value: 1, color: 'bg-slate-400' },
                { label: 'Rejected', value: 1, color: 'bg-red-500' }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 px-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${item.color}`}></div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 truncate">{item.label}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Candidate Pipeline */}
        <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="text-sm font-bold text-gray-800 tracking-tight">Candidate pipeline</h3>
            <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 shadow-inner w-full sm:w-auto overflow-x-auto no-scrollbar">
              <button
                onClick={() => setPipelineView('Monthly')}
                className={`flex-1 sm:flex-none px-5 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${pipelineView === 'Monthly' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPipelineView('Quarterly')}
                className={`flex-1 sm:flex-none px-5 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${pipelineView === 'Quarterly' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Quarterly
              </button>
            </div>
          </div>

          <div className="h-64 flex items-end justify-around gap-1 sm:gap-2 px-2">
            {currentData.map((bar, i) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-4 group">
                {bar.showZero && <span className="text-[8px] font-bold text-gray-200 mb-[-12px]">0</span>}
                {bar.value && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] font-bold text-gray-600 mb-[-12px] truncate max-w-full"
                  >
                    {bar.value}
                  </motion.span>
                )}
                <div className="w-full relative bg-gray-50/50 rounded-xl overflow-hidden flex flex-col justify-end min-h-[160px] border border-gray-50">
                  <motion.div
                    key={`${pipelineView}-${bar.label}`}
                    initial={{ height: 0 }}
                    animate={{ height: bar.h }}
                    transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.1 }}
                    className={`w-full rounded-t-xl transition-all duration-500 ${bar.active ? 'bg-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.2)]' : 'bg-gray-100 group-hover:bg-gray-200'}`}
                  ></motion.div>
                </div>
                <span className={`text-[9px] sm:text-[10px] font-bold tracking-tight truncate ${bar.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-10 font-bold italic tracking-tight leading-relaxed px-4">
            New candidates by created date; status split visible on hover.
          </p>
        </div>
      </div>

      {/* Quick Actions & Training */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-sm font-bold text-gray-800 ml-1">Quick Admin Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <ActionButton icon={UserPlus} label="Add User" />
            <ActionButton icon={FileBadge} label="Add Legal Doc" />
            <ActionButton icon={Scale} label="Add Fine" />
            <ActionButton icon={Calendar} label="Add Training" />
            <ActionButton icon={FileText} label="Create Job Desc" />
            <ActionButton icon={CheckCircle2} label="Interview Form" />
            <ActionButton icon={Mail} label="Offer Letter" />
            <ActionButton icon={MoreHorizontal} label="More Actions" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 sm:p-6 flex justify-between items-center border-b border-gray-50 bg-gray-50/10">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-600 shrink-0" size={18} />
              <h3 className="text-sm font-bold text-gray-800">Training Schedule</h3>
            </div>
            <span className="text-[10px] font-bold text-gray-400 shrink-0">May 2026</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-200">
              <Calendar size={32} strokeWidth={1.5} />
            </div>
            <p className="text-xs text-gray-400 font-bold max-w-[180px] leading-relaxed">No upcoming sessions scheduled.</p>
          </div>
          <div className="p-4 bg-gray-50/50 mt-auto">
            <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
              View Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Legal Expiry Alerts */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold text-gray-800">Legal Expiry Alerts</h3>
          <button className="text-[11px] font-bold text-blue-600 hover:underline transition-all">View all alerts</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AlertCard
            title="PF Declaration Form (transfer of PF for new employees)"
            status="Expired 103 days ago"
            date="Feb 1, 2026"
            type="alert"
            urgent
          />
          <AlertCard
            title="Fire Safety Certificate Renewal"
            status="Expired 44 days ago"
            date="Apr 1, 2026"
            type="alert"
            urgent
          />
          <AlertCard
            title="Factory License Renewal"
            status="Expired 15 days ago"
            date="Apr 30, 2026"
            type="alert"
            urgent
          />
          <AlertCard
            title="Employee Insurance Policy"
            status="Expired 14 days ago"
            date="May 1, 2026"
            type="alert"
            urgent
          />
          <AlertCard
            title="EPF Compliance Window"
            status="Renewal window open"
            date="Jun 17, 2026"
            type="check"
          />
        </div>
      </div>

      {/* Fine Register Summary */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-800 ml-1">Fine Register Summary</h3>
        <div className="space-y-3">
          <div className="bg-[#f8fafc] p-5 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600 shrink-0">
                <Scale size={20} />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Fines Collected</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">₹6,343</p>
              </div>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-blue-600 transition-colors shrink-0" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-500 shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold text-emerald-600/70 uppercase tracking-wider">Paid Amount</p>
                  <p className="text-lg font-bold text-gray-800">₹1,995</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 shrink-0">31%</span>
            </div>

            <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-red-500 shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold text-red-600/70 uppercase tracking-wider">Unpaid Fine</p>
                  <p className="text-lg font-bold text-gray-800">₹4,348</p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-600 shrink-0">69%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-400 ring-4 ring-blue-50 z-50 lg:hidden"
      >
        <Plus size={32} />
      </motion.button>

      {/* Footer Branding */}
      <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest pb-10">
        <FileBadge size={14} />
        System Ledger · Admin Dashboard Core
      </div>
    </div>
  );
};

export default Dashboard;
