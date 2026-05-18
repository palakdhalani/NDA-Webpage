import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileSignature, Presentation, Award, UserMinus, Snail as Mail, BadgeCheck, CheckCircle } from 'lucide-react';
import mockup from '../../assets/dashboard_mockup.png';

const HRMSFeatures = () => {
  const features = [
    {
      title: 'Manpower Requisition & Hiring',
      description: 'Track vacancy status, manage approval workflows, and maintain a digital candidate database.',
      icon: Users,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
    },
    {
      title: 'Document & Legal Register',
      description: 'Secure digital submission, verification alerts, and compliance expiry tracking with auto-reminders.',
      icon: FileSignature,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'Training & Skill Matrix',
      description: 'Competency mapping, induction training, skill gap analysis, and automated evaluation systems.',
      icon: Presentation,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
    {
      title: 'Employee Motivation & Feedback',
      description: 'Manage appreciation activities, digital suggestion boxes, and engagement records.',
      icon: Award,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
    },
    {
      title: 'Offboarding & Fine Management',
      description: 'Automate relieving letters, exit interviews, and track transparent fine communications.',
      icon: UserMinus,
      color: 'text-slate-500',
      bg: 'bg-slate-100',
    },
    {
      title: 'I-Card & Hierarchy',
      description: 'Bulk digital I-card generation and drag & drop department reporting structure.',
      icon: BadgeCheck,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    }
  ];

  return (
    <section id="hrms" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-blue-100 text-[#004792] font-semibold text-sm">
            HRMS Module
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Human Resource <span className="text-[#004792]">Management System</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Empower your workforce with automated onboarding, skill tracking, performance management, and compliance solutions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          {/* Features Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300"
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-indigo-600/10 rounded-3xl rotate-3 scale-105 blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-indigo-100 to-blue-100 rounded-3xl -rotate-2"></div>
            <img 
              src={mockup} 
              alt="HRMS Software Interface" 
              className="relative rounded-3xl shadow-2xl border-4 border-white object-cover w-full"
            />
            
            {/* Floating badge */}
            <div className="absolute -right-6 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Payroll Processed</p>
                <p className="text-xs text-slate-500">Auto-calculated</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HRMSFeatures;
