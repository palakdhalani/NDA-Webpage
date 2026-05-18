import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Lock, TrendingDown, Activity, Save, ShieldCheck } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      title: 'Cloud-Based Data Management',
      description: 'Access your EHS and HRMS data securely from anywhere, at any time.',
      icon: Cloud,
      color: 'text-blue-500'
    },
    {
      title: 'Centralized & User-Friendly',
      description: 'A single, intuitive platform to manage all your organizational processes.',
      icon: Lock,
      color: 'text-indigo-500'
    },
    {
      title: 'Reduce Operational Risks',
      description: 'Proactively identify hazards and reduce workplace incidents.',
      icon: TrendingDown,
      color: 'text-emerald-500'
    },
    {
      title: 'Real-Time Monitoring',
      description: 'Get instant insights and comprehensive reports on performance and compliance.',
      icon: Activity,
      color: 'text-amber-500'
    },
    {
      title: 'Digitize All Records',
      description: 'Eliminate paperwork by maintaining digital logs of all operations and trainings.',
      icon: Save,
      color: 'text-purple-500'
    },
    {
      title: 'Improve Safety & Compliance',
      description: 'Stay audit-ready and ensure 100% adherence to legal and regulatory standards.',
      icon: ShieldCheck,
      color: 'text-red-500'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-[#004792] text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Partner with NDA Technology?
          </h2>
          <p className="text-blue-100 text-lg">
            Our dual-focus approach on Safety and Human Resources delivers unparalleled benefits to modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/15 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
                <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
