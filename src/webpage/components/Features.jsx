import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Shield, Clock, FileText, BarChart, Settings } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'Smart Attendance',
      description: 'Automated tracking with geo-fencing and biometric integration.',
      icon: Clock,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      colSpan: 'col-span-1 md:col-span-2'
    },
    {
      title: 'Payroll Management',
      description: 'One-click payroll processing with automated tax compliance.',
      icon: FileText,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      colSpan: 'col-span-1'
    },
    {
      title: 'Performance Analytics',
      description: 'Real-time insights into employee productivity and OKRs.',
      icon: BarChart,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      colSpan: 'col-span-1'
    },
    {
      title: 'Secure Onboarding',
      description: 'Digital document collection and seamless employee setup.',
      icon: Shield,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      colSpan: 'col-span-1 md:col-span-2'
    },
    {
      title: 'Employee Self-Service',
      description: 'Empower teams to manage leaves, claims, and profiles.',
      icon: UserCheck,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      colSpan: 'col-span-1 md:col-span-3'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Unlock Premium Benefits With <br />
            <span className="text-indigo-600">Our Advanced Features.</span>
          </h2>
          <p className="text-slate-600 text-lg">
            A comprehensive suite of tools designed to simplify human resource management, reduce administrative overhead, and scale with your growing team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow ${feature.colSpan}`}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
