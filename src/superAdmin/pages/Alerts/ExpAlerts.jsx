
import React from 'react';
import {
  Download,
  Plus,
  Building2,
  Users2,
  FileWarning,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';

const expiryAlerts = [
  { company: 'Startup Innovations', sub: 'SILVER', status: 'Review required', countdown: '0 days', countdownColor: 'bg-rose-50 text-rose-500' },
  { company: 'ABC', sub: 'SILVER PLAN', status: 'Review required', countdown: '11 days', countdownColor: 'bg-amber-50 text-amber-600' },
];

const ExpAlerts = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-12 px-4 md:px-0 max-w-[1600px] mx-auto">
      {/* Print-only Header */}
      <div className="hidden print:block mb-8 border-b-2 border-slate-900 pb-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase">System Ledger Report</h1>
            <p className="text-sm font-bold text-slate-500 mt-1">Comprehensive Enterprise & Infrastructure Oversight</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Generated On</p>
            <p className="text-sm font-bold text-slate-900">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Expiry Alerts</h1>
          <p className="text-xs md:text-sm font-medium text-slate-500">Track and manage upcoming subscription renewals.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-slate-600 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-all shadow-md"
          >
            <Download size={14} /> <span className="hidden xs:inline">Export</span>
          </button>
          <Link to="/superadmin/enterprises" className="flex-1 sm:flex-none">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
              <Plus size={14} /> New Enterprise
            </button>
          </Link>
        </div>
      </div>

      {/* Critical Alerts Table */}
      <div id='alerts' className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl shrink-0">
              <FileWarning size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-none">All Expiry Alerts</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Full Renewal Tracking List</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 px-6 no-scrollbar">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">
                <th className="pb-6">Company</th>
                <th className="pb-6 text-center">Plan</th>
                <th className="pb-6">Status</th>
                <th className="pb-6 text-center">Countdown</th>
                <th className="pb-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {expiryAlerts.map((alert, i) => (
                <tr key={i} className="group">
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="hidden xs:flex p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 truncate max-w-[150px] md:max-w-none">{alert.company}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: 00{i + 1}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 text-center">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg border border-blue-100 uppercase tracking-tighter">
                      {alert.sub}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <div className={`w-1.5 h-1.5 rounded-full ${alert.countdown === '0 days' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{alert.status}</span>
                    </div>
                  </td>
                  <td className="py-5 text-center">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-widest whitespace-nowrap ${alert.countdownColor}`}>
                      {alert.countdown}
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    <Link to="/superadmin/enterprises">
                      <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-md">
                        <Navigation size={16} fill="currentColor" strokeWidth={0} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpAlerts;
