import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, Cloud, Shield, Bell, Users } from 'lucide-react';

const Integrations = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Works with your favorite Enterprise tools
          </h2>
          <p className="text-slate-500">
            Seamlessly connect NDA Tech with the software you already use.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-70">
           {/* Mock integrations using Lucide icons and text to simulate logos */}
           <div className="flex items-center gap-2 text-xl font-bold text-slate-700 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
             <Database className="text-blue-500" /> Oracle
           </div>
           <div className="flex items-center gap-2 text-xl font-bold text-slate-700 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
             <Cloud className="text-sky-500" /> Salesforce
           </div>
           <div className="flex items-center gap-2 text-xl font-bold text-slate-700 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
             <Shield className="text-indigo-500" /> SAP
           </div>
           <div className="flex items-center gap-2 text-xl font-bold text-slate-700 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
             <Users className="text-rose-500" /> Workday
           </div>
           <div className="flex items-center gap-2 text-xl font-bold text-slate-700 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
             <Bell className="text-amber-500" /> Slack
           </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
