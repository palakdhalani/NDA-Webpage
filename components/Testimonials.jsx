import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "HR Director, TechFlow",
      content: "HRMastery transformed how we handle employee onboarding. It used to take us a week to get a new hire fully set up, now it takes 2 hours.",
      initials: "SJ",
      color: "bg-purple-100 text-purple-600"
    },
    {
      name: "Michael Chen",
      role: "CEO, GlobalInnovate",
      content: "The payroll automation is flawless. We've eliminated all manual calculation errors and saved thousands of dollars in compliance.",
      initials: "MC",
      color: "bg-blue-100 text-[#004792]"
    },
    {
      name: "Elena Rodriguez",
      role: "Operations Manager, Nexus",
      content: "Our team loves the self-service portal. They can request time off and view their payslips without having to email HR. It's a game changer.",
      initials: "ER",
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 rounded-[100%] blur-[80px] -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Real Results, Real Impact. <br />
            <span className="text-[#004792]">Our Success Stories</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Hear from companies that have streamlined their HR processes and accelerated their growth with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 relative"
            >
              <div className="text-4xl text-blue-200 mb-4 font-serif">"</div>
              <p className="text-slate-600 mb-8 relative z-10 italic">
                {testimonial.content}
              </p>
              
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-lg`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
