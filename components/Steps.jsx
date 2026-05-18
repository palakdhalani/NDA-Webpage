import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Steps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: '01',
      title: 'Simple and Fast Setup',
      description: 'Import your employee data seamlessly and configure your company policies in minutes using our intuitive wizard.',
      mockup: (
        <div className="w-full h-full bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
           <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
           </div>
           <h4 className="font-bold text-slate-800">Upload Employee Data</h4>
           <p className="text-xs text-slate-500 mt-2 text-center">Drag and drop CSV or connect to existing HR tools.</p>
           <div className="mt-6 w-full max-w-xs h-2 bg-slate-100 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '100%' }}
               transition={{ duration: 2, ease: 'easeInOut' }}
               className="h-full bg-indigo-500 rounded-full"
             ></motion.div>
           </div>
        </div>
      )
    },
    {
      id: '02',
      title: 'Automate Workflows',
      description: 'Set up approval chains for leaves, automate payroll calculations, and let the system handle routine HR tasks.',
      mockup: (
        <div className="w-full h-full bg-slate-50 rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4">
          <h4 className="font-bold text-slate-800 mb-2">Leave Approval Workflow</h4>
          {[1, 2, 3].map((i) => (
             <div key={i} className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-3 shadow-sm">
               <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
               <div className="flex-1">
                 <div className="h-2 w-20 bg-slate-200 rounded-full mb-2"></div>
                 <div className="h-2 w-12 bg-slate-100 rounded-full"></div>
               </div>
               {i === 1 ? (
                 <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Approved</span>
               ) : (
                 <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">Pending</span>
               )}
             </div>
          ))}
        </div>
      )
    },
    {
      id: '03',
      title: 'Monitor and Grow',
      description: 'Access real-time reports and analytics to make data-driven decisions that improve workplace culture.',
      mockup: (
        <div className="w-full h-full bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h4 className="font-bold text-slate-800 mb-4">Employee Retention</h4>
          <div className="flex-1 flex items-end gap-2 px-4 pb-4 border-b border-slate-100">
             {[30, 45, 60, 50, 75, 90, 85].map((h, i) => (
               <div key={i} className="flex-1 bg-indigo-100 rounded-t-sm relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm"
                  ></motion.div>
               </div>
             ))}
          </div>
          <div className="mt-4 flex justify-between items-center text-xs text-slate-500 font-medium">
             <span>Q1</span>
             <span>Q2</span>
             <span>Q3</span>
             <span>Q4</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="steps" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get Started In Just 3 Easy Steps
          </h2>
          <p className="text-slate-600 text-lg">
            A guided onboarding experience designed for speed and simplicity. You'll be up and running in no time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side - Interactive Preview */}
          <div className="w-full lg:w-1/2 h-[400px] bg-indigo-600 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-xl shadow-indigo-200">
             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-50"></div>
             
             <div className="relative w-full h-full">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeStep}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.05 }}
                   transition={{ duration: 0.3 }}
                   className="w-full h-full"
                 >
                   {steps[activeStep].mockup}
                 </motion.div>
               </AnimatePresence>
             </div>
          </div>

          {/* Right Side - Accordion */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                onClick={() => setActiveStep(index)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${activeStep === index ? 'bg-white border-indigo-100 shadow-md shadow-indigo-50' : 'bg-transparent border-transparent hover:bg-slate-100/50'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${activeStep === index ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-500'}`}>
                    {step.id}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 transition-colors ${activeStep === index ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {step.title}
                    </h3>
                    {activeStep === index && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-slate-600"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
