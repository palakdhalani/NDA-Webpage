import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const stats = [
    {
      value: '40%',
      description: 'Faster Onboarding and setup processes.',
      color: 'from-blue-100 to-indigo-50'
    },
    {
      value: '3x',
      description: 'Higher Employee Engagement & Retention.',
      color: 'from-indigo-100 to-purple-50'
    },
    {
      value: '100%',
      description: 'Payroll Accuracy & Tax Compliance.',
      color: 'from-purple-100 to-pink-50'
    },
    {
      value: '10k+',
      description: 'Active Users managing HR daily.',
      color: 'from-emerald-100 to-teal-50'
    }
  ];

  return (
    <section id="why-choose" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Companies Choose HRMastery
          </h2>
          <p className="text-slate-600 text-lg">
            Trusted by teams worldwide to manage workforce efficiently. Designed to help HR professionals do their best work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} p-8 rounded-3xl border border-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
            >
              {/* Decorative element */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/40 rounded-full blur-xl"></div>
              
              <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-slate-600 font-medium">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
