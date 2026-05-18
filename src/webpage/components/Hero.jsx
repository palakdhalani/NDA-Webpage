import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, BarChart3, PieChart, Activity, Bell } from 'lucide-react';
import DashboardPreview from './DashboardPreview';

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/60 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute top-40 -right-20 w-[400px] h-[400px] bg-indigo-50/40 rounded-full blur-[100px] opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Smart Software Solutions for Smart Businesses
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Transform Your Workplace with <br />
            <span className="text-[#004792]">Smart Digital Solutions.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            NDA Technology Solutions provides advanced ERP-based EHS and HRMS software designed to simplify management, improve safety, and ensure compliance.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#ehs" className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[#004792] rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
              Explore EHS
            </a>
            <a href="#hrms" className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-[#004792] bg-blue-50 border border-blue-100 rounded-full hover:bg-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2">
              Explore HRMS
            </a>
          </motion.div>
        </div>

        {/* Dashboard Preview Component */}
        <DashboardPreview />

        {/* Trusted By Logos (Mock) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 border-t border-slate-200/60 pt-10"
        >
          <p className="text-center text-sm font-medium text-slate-400 mb-8 uppercase tracking-wider">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
             {/* Creating SVG mock logos using text to look like logos */}
            <h3 className="text-2xl font-black text-slate-800">AcmeCorp</h3>
            <h3 className="text-2xl font-bold tracking-tighter text-slate-800">GlobalHR</h3>
            <h3 className="text-2xl font-extrabold italic text-slate-800">TechFlow</h3>
            <h3 className="text-2xl font-bold uppercase text-slate-800">Innovate</h3>
            <h3 className="text-2xl font-semibold font-serif text-slate-800">Nexus</h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
