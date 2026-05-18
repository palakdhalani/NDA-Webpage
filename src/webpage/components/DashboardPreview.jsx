import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, BarChart3, Bell, Search, Calendar, ChevronDown, CheckCircle, Clock } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative mx-auto container"
    >
      {/* Decorative elements behind dashboard */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-[2.5rem] blur-2xl opacity-20"></div>
      
      {/* Main Dashboard Container */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[500px] md:h-[600px]">
        
        {/* Top Header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-8 h-8 rounded-lg bg-[#004792] flex items-center justify-center text-white">
              <Users size={16} />
            </div>
            <span className="font-bold text-slate-800">NDA Tech Dashboard</span>
          </div>
          
          <div className="hidden md:flex items-center flex-1 max-w-md bg-slate-50 rounded-full px-4 py-2 border border-slate-100">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Search employees, reports..." className="bg-transparent border-none outline-none ml-2 text-sm w-full text-slate-600" />
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="relative p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden flex items-center justify-center">
                 <span className="text-xs font-bold text-slate-500">AD</span>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden bg-slate-50/50">
          {/* Sidebar */}
          <div className="w-20 md:w-64 border-r border-slate-100 bg-white p-4 flex flex-col gap-2 shrink-0">
            {[
              { icon: BarChart3, label: 'Overview', active: true },
              { icon: Users, label: 'EHS Modules', active: false },
              { icon: Calendar, label: 'HRMS Operations', active: false },
              { icon: Clock, label: 'Reporting', active: false },
              { icon: FileText, label: 'Compliance', active: false },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${item.active ? 'bg-blue-50 text-[#004792]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
                <item.icon size={20} />
                <span className="hidden md:block font-medium text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Company Overview</h2>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
                Download Report
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { title: 'Total Employees', value: '142', trend: '+12% this month', color: 'blue' },
                { title: 'Safety Incidents', value: '0', trend: '100% compliance', color: 'emerald' },
                { title: 'Pending Approvals', value: '8', trend: 'Requires attention', color: 'amber' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                  <p className={`text-xs font-medium text-${stat.color}-600`}>{stat.trend}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity & Chart area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-64 flex flex-col">
                <h3 className="font-semibold text-slate-800 mb-4">Operations Trends</h3>
                <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
                   {[40, 70, 45, 90, 65, 85, 100, 60, 80, 50, 75, 95].map((h, i) => (
                      <div key={i} className="w-full bg-blue-50 rounded-t-sm relative group">
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-[#004792] to-blue-400 rounded-t-sm transition-all duration-500"
                          style={{ height: `${h}%` }}
                        ></div>
                      </div>
                   ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-64 flex flex-col">
                <h3 className="font-semibold text-slate-800 mb-4">Recent Onboarding</h3>
                <div className="flex flex-col gap-4 flex-1 overflow-hidden">
                  {[
                    { name: 'Sarah Jenkins', role: 'UX Designer', status: 'Completed' },
                    { name: 'Mike Ross', role: 'DevOps Engineer', status: 'In Progress' },
                    { name: 'Emma Watson', role: 'Marketing Manager', status: 'Pending' },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.role}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <CheckCircle size={14} className={user.status === 'Completed' ? 'text-emerald-500' : 'text-slate-300'} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="hidden md:flex absolute -left-10 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <CheckCircle size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">Payroll Processed</p>
          <p className="text-xs text-slate-500">Just now</p>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="hidden md:flex absolute -right-8 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#004792]">
          <Users size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">EHS Audit Passed</p>
          <p className="text-xs text-slate-500">Compliance Checked</p>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default DashboardPreview;
