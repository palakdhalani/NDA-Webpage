import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ModalWrapper = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative bg-white w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2 sm:hidden shrink-0" />
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const RevisionModal = ({ isOpen, onClose, onSave, currentValues }) => {
  const [formData, setFormData] = useState({
    docNo: '',
    revNo: ''
  });

  useEffect(() => {
    if (currentValues) {
      setFormData({
        docNo: currentValues.docNo || '',
        revNo: currentValues.revNo || ''
      });
    }
  }, [currentValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 flex items-center justify-between border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Document & revision (register)</h2>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          <p className="text-[13px] font-medium text-gray-400 leading-relaxed">
            These values apply to <span className="font-bold text-gray-600">all</span> requisitions on this page (table, exports, and when saving recruitment outcome).
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-600">Document No *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. HR-MRF-01" 
                value={formData.docNo}
                onChange={(e) => setFormData(prev => ({ ...prev, docNo: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-600">Revision No *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. 00 / 01.09.2025" 
                value={formData.revNo}
                onChange={(e) => setFormData(prev => ({ ...prev, revNo: e.target.value }))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 sm:p-8 bg-gray-50/30 border-t border-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="w-full sm:w-auto px-10 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
          >
            Save
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default RevisionModal;
