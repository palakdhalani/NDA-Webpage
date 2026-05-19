import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Flame, ClipboardCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import mockup from '../../assets/dashboard_mockup.png';
import { Link } from 'react-router-dom';

const EHSFeatures = () => {
  const features = [
    {
      title: 'Fire & Safety Management',
      description: 'Track fire alarm inspections, hydrant testing, and emergency equipment checklists.',
      icon: Flame,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      title: 'Work Permit & LOTO',
      description: 'Digital work authorization, permit to work management, and lockout-tagout (LOTO) records.',
      icon: ShieldAlert,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
    {
      title: 'Accident & Incident Control',
      description: 'Report unsafe acts, track near misses, and conduct detailed incident investigations.',
      icon: AlertTriangle,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      title: 'HIRA & EAI',
      description: 'Create department-wise Hazard Identification (HIRA) and Environmental Aspect Impact (EAI) assessments.',
      icon: ClipboardCheck,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Legal Registers & Compliance',
      description: 'Centralized storage for third-party test reports, license management, and compliance monitoring.',
      icon: FileText,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: '5S & EHS Observations',
      description: 'Track action plans with before-after photos, manage audits, and log safety observations.',
      icon: CheckCircle2,
      color: 'text-teal-500',
      bg: 'bg-teal-50',
    }
  ];

  return (
    <section id="ehs" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-blue-100 text-[#004792] font-semibold text-sm">
            EHS Module
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Environmental, Health & <span className="text-[#004792]">Safety Software</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Reduce incidents and operational risks with our comprehensive cloud-based EHS platform. Monitor compliance and improve workplace safety in real-time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Features Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Software Image Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-[#004792]/10 rounded-3xl -rotate-3 scale-105 blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-3xl rotate-2"></div>
            <img 
              src={mockup} 
              alt="EHS Software Interface" 
              className="relative rounded-3xl shadow-2xl border-4 border-white object-cover w-full"
            />
            
            {/* Floating badge */}
            <div className="absolute -left-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Flame size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Fire Safety Check</p>
                <p className="text-xs text-slate-500">100% Compliant</p>
              </div>
            </div>
          </motion.div>
            
        </div>
       <Link to="/privacypolicyhrms&nda">
         <div className="button-container flex justify-center mt-20">
            <button className="button bg-[#004792] text-white rounded-full hover:bg-black transition-all duration-700 cursor-pointer px-10 py-5">Explore More</button>
        </div>
      </Link>
      </div>
    </section>
  );
};

export default EHSFeatures;
