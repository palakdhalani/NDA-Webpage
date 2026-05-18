import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import CustomSelect from '../../../components/ui/CustomSelect';


const ModalWrapper = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-[1.5rem] shadow-2xl overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const RecruitmentOutcomeModal = ({ isOpen, onClose, onSave, data }) => {
  const [formData, setFormData] = useState({
    employeeName: 'po',
    selectionDate: '2026-04-30',
    joiningDate: '2026-05-01',
    reqToSelection: '6 days',
    selectionToJoining: '1 day',
    totalDays: '+22 days',
    source: 'Job Portal',
    status: 'Close'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Recruitment Outcome</h2>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-md font-medium text-gray-500">
            Mark this requisition as fulfilled by entering the hired employee details.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Employee Name *</label>
              <input 
                type="text" 
                value={formData.employeeName}
                onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-md font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Selection Date *</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={formData.selectionDate}
                  onChange={(e) => setFormData({...formData, selectionDate: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-md font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Recruited (Joining) Date *</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-md font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Requisition → Selection (Days)</label>
              <input 
                readOnly
                type="text" 
                value={formData.reqToSelection}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-md font-medium text-gray-600 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Selection → Joining (Days)</label>
              <input 
                readOnly
                type="text" 
                value={formData.selectionToJoining}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-md font-medium text-gray-600 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Requested By → Joining (Total Days)</label>
              <input 
                readOnly
                type="text" 
                value={formData.totalDays}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-md font-medium text-gray-600 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Source of Recruitment</label>
              <CustomSelect 
                options={['Internal', 'Job Portal', 'Reference', 'Consultant', 'Other']}
                value={formData.source}
                onChange={(val) => setFormData({...formData, source: val})}
              />
            </div>


            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Recruitment Status</label>
              <CustomSelect 
                options={['In Progress', 'Close', 'Hold']}
                value={formData.status}
                onChange={(val) => setFormData({...formData, status: val})}
              />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 flex justify-end gap-3 bg-gray-50/30 border-t border-gray-50">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-200 text-md font-bold text-gray-600 rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-8 py-2.5 bg-[#009b77] text-white text-md font-bold rounded-xl shadow-lg shadow-emerald-100 hover:bg-[#007b5e] transition-all"
          >
            Mark as Hired
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default RecruitmentOutcomeModal;
