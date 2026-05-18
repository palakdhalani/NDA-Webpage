import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, HardDrive, FileText, Loader2 } from 'lucide-react';

const EnterpriseDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [company, setCompany] = useState(null);

  useEffect(() => {
    // 1. Pehle check karein kya navigation state mein data aaya hai
    if (location.state?.company) {
      setCompany(location.state.company);
    } 
    // 2. Agar state nahi hai (direct link open kiya), to API se fetch karne ka logic yahan aayega
    else {
      // Temporary mock data agar state missing ho
      setCompany({
        id: id,
        name: 'Company ' ,
        plan: 'Standard',
        users: '0/0',
        expiry: 'N/A',
        status: 'Inactive',
        storage: '0.00 GB'
      });
    }
  }, [id, location.state]);

  // Loading state handling
  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white rounded-xl transition-all shadow-md border border-transparent hover:border-slate-200"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div>
           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
             {company.name}  
           </h1>
           {/* <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enterprise ID: #{id}</p> */}
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md flex justify-between items-center group hover:border-blue-200 transition-all">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Users</p>
            <h3 className="text-2xl font-bold text-slate-900">{company.users}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md flex justify-between items-center group hover:border-blue-200 transition-all">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Storage Used</p>
            <h3 className="text-2xl font-bold text-slate-900">{company.storage || '0.00 GB'}</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
            <HardDrive size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md flex justify-between items-center group hover:border-blue-200 transition-all">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Plan Type</p>
            <h3 className="text-2xl font-bold text-slate-900">{company.plan}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
        </div>
      </div>

      {/* Detail Card */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md">
        <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
          Company Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plan Type</p>
            <p className="text-sm font-bold text-slate-800">{company.plan}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expiry Date</p>
            <p className="text-sm font-bold text-slate-800">{company.expiry}</p>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
            <div>
              {company.status === 'Active' ? (
                <span className="inline-flex px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-tight border border-emerald-100">
                  Active
                </span>
              ) : (
                <span className="inline-flex px-3 py-1 bg-rose-50 text-rose-500 rounded-lg text-[10px] font-bold uppercase tracking-tight border border-rose-100">
                  Inactive
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage Limit</p>
            <p className="text-sm font-bold text-slate-800">{company.storage || '0.00 GB'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
