import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { 
  Download, 
  Plus, 
  Building2, 
  Users2, 
  Cloud,
  ChevronRight,
  ArrowUpRight,
  FileWarning,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';

const trendData = [
  { name: 'Jun 25', active: 0, inactive: 0 },
  { name: 'Jul 25', active: 0, inactive: 0 },
  { name: 'Aug 25', active: 0, inactive: 0 },
  { name: 'Sep 25', active: 0, inactive: 0 },
  { name: 'Oct 25', active: 0, inactive: 0 },
  { name: 'Nov 25', active: 0, inactive: 0 },
  { name: 'Dec 25', active: 0, inactive: 0 },
  { name: 'Jan 26', active: 5, inactive: 0 },
  { name: 'Feb 26', active: 0, inactive: 0 },
  { name: 'Mar 26', active: 0, inactive: 0 },
  { name: 'Apr 26', active: 2, inactive: 1 },
  { name: 'May 26', active: 0, inactive: 0 },
];

const storageLeaders = [
  { name: 'Enterprise Systems', size: '0.2 GB' },
  { name: 'Manufacturing Works Pvt Ltd', size: '0.1 GB' },
  { name: 'TechCorp Solutions', size: '0.1 GB' },
  { name: 'Global Industries Ltd', size: '0.0 GB' },
  { name: 'Startup Innovations', size: '0.0 GB' },
];

const expiryAlerts = [
  { company: 'Startup Innovations', sub: 'SILVER', status: 'Review required', countdown: '0 days', countdownColor: 'bg-rose-50 text-rose-500' },
  { company: 'ABC', sub: 'SILVER PLAN', status: 'Review required', countdown: '11 days', countdownColor: 'bg-amber-50 text-amber-600' },
];

const Overview = () => {
  const [chartFilter, setChartFilter] = useState('Both');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div  className="space-y-6 md:space-y-8 pb-12 px-4 md:px-0 max-w-[1600px] mx-auto">
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
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">System Dashboard</h1>
          <p className="text-xs md:text-sm font-medium text-slate-500">Real-time oversight of infrastructure health.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-slate-600 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Download size={14} /> <span className="hidden xs:inline">Export</span>
          </button>
          <Link to="/superadmin/enterprises" className="flex-1 sm:flex-none">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-200 hover:bg-blue-700 transition-all">
              <Plus size={14} /> New Enterprise
            </button>
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div id='hero' className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Total Companies */}
        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm transition-transform hover:scale-[1.01]">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-6 md:mb-8">
            <Building2 size={24} />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-right">Total Companies</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter mb-4">8</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold text-slate-500">7 Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <span className="text-[11px] font-bold text-slate-500">1 Inactive</span>
            </div>
          </div>
        </div>

        {/* Active Admins */}
        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm transition-transform hover:scale-[1.01]">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-6 md:mb-8">
            <Users2 size={24} />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-right">Active Admins</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter mb-4">8</h2>
          <div className="flex items-center gap-2 text-emerald-500">
            <ArrowUpRight size={14} strokeWidth={3} />
            <span className="text-[11px] font-bold uppercase tracking-widest">Global Reach</span>
          </div>
        </div>

        {/* Total Storage Used */}
        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm transition-transform hover:scale-[1.01] sm:col-span-2 lg:col-span-1">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl w-fit mb-6 md:mb-8">
            <Cloud size={24} />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-right">Total Storage Used</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter mb-4">422 <span className="text-xl md:text-2xl text-slate-400">MB</span></h2>
          <div className="space-y-2">
            <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
              <div className="w-[10%] h-full bg-blue-600 rounded-full" />
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>System Load</span>
              <span>10% Cap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Storage Leaders Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Company Trends */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Company Trends</h3>
              <p className="text-[11px] text-slate-400 font-bold">Registration throughput</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto no-scrollbar">
              {['Active', 'Inactive', 'Both'].map((opt) => (
                <button 
                  key={opt}
                  onClick={() => setChartFilter(opt)}
                  className={`flex-1 sm:flex-none px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all whitespace-nowrap ${
                    chartFilter === opt ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} barGap={4}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                  />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  {(chartFilter === 'Both' || chartFilter === 'Active') && (
                    <Bar dataKey="active" fill="#34d399" radius={[4, 4, 0, 0]} barSize={window.innerWidth < 640 ? 12 : 20} />
                  )}
                  {(chartFilter === 'Both' || chartFilter === 'Inactive') && (
                    <Bar dataKey="inactive" fill="#fb7185" radius={[4, 4, 0, 0]} barSize={window.innerWidth < 640 ? 12 : 20} />
                  )}
                </BarChart>
              </ResponsiveContainer>
          </div>
        </div>

        {/* Storage Leaders */}
        <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-1">Storage Leaders</h3>
          <p className="text-[11px] text-slate-400 font-bold mb-8 uppercase tracking-widest">Top Footprints</p>
          
          <div className="space-y-5 flex-1">
            {storageLeaders.map((item, i) => (
              <div key={i} className="flex justify-between items-center group">
                <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors cursor-pointer truncate max-w-[200px]">{item.name}</span>
                <span className="text-[11px] font-bold text-slate-400 tracking-widest whitespace-nowrap">{item.size}</span>
              </div>
            ))}
          </div>
          <Link to="/superadmin/storage">
            <button className="mt-8 text-blue-600 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:underline transition-all">
              Full Audit Logs <ChevronRight size={14} strokeWidth={3} />
            </button>
          </Link>
        </div>
      </div>

      {/* Critical Alerts Table */}
      <div id='alerts' className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl shrink-0">
                 <FileWarning size={24} />
              </div>
              <div>
                 <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-none">Critical Expiry Alerts</h3>
                 <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Renewal Tracking</p>
              </div>
           </div>
           <Link to="/superadmin/alerts" className="text-blue-600 text-[11px] font-bold uppercase tracking-widest hover:underline whitespace-nowrap">View All Alerts</Link>
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
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: 00{i+1}</p>
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
                     <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
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

export default Overview;
