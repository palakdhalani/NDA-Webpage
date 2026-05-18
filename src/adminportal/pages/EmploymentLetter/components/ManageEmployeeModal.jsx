import React, { useState, useEffect } from 'react';
import { X, Calendar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageEmployeeModal = ({ isOpen, onClose, employee }) => {
  const [formData, setFormData] = useState({
    inductionTraining: false,
    onJobTraining: false,
    employeeLeft: true,
    lastDate: "",
    reason: "",
    notJoined: false
  });

  useEffect(() => {
    if (employee) {
      // Reset or populate if needed
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
        <style>
          {`
            input[type="date"]::-webkit-calendar-picker-indicator {
              background: transparent;
              bottom: 0;
              color: transparent;
              cursor: pointer;
              height: auto;
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
              width: auto;
            }
          `}
        </style>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Manage Employee - {employee?.name || "Jayesh m karavadara"}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-6">
            
            {/* Training Requirements */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-600">Training Requirements</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="inductionTraining"
                    checked={formData.inductionTraining}
                    onChange={handleChange}
                    className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#0066cc] checked:border-[#0066cc] transition-all cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Induction Training (auto-creates training record)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="onJobTraining"
                    checked={formData.onJobTraining}
                    onChange={handleChange}
                    className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#0066cc] checked:border-[#0066cc] transition-all cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">On-Job Training (auto-creates training record)</span>
                </label>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Warning Box */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-3">
              <div className="pt-0.5">
                <Info size={16} className="text-gray-400" />
              </div>
              <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
                This letter is not linked to a Worker. "Mark as Left" will save left date/reason on this letter only.
              </p>
            </div>

            {/* Employee Left Section */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="employeeLeft"
                  checked={formData.employeeLeft}
                  onChange={handleChange}
                  className="w-5 h-5 border-2 border-[#0066cc] rounded-md bg-[#0066cc] checked:bg-[#0066cc] transition-all cursor-pointer"
                />
                <span className="text-sm font-bold text-gray-800">Employee Left</span>
              </label>

              <AnimatePresence>
                {formData.employeeLeft && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4 pl-8 overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-500">Last Date</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          name="lastDate"
                          value={formData.lastDate}
                          onChange={handleChange}
                          placeholder="dd-mm-yyyy"
                          className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-[#0066cc] transition-all" 
                        />
                        <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-500">Reason</label>
                      <textarea 
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Enter reason for leaving..."
                        className="w-full h-24 p-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-[#0066cc] transition-all resize-none" 
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Not Joined */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                name="notJoined"
                checked={formData.notJoined}
                onChange={handleChange}
                className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#c2410c] checked:border-[#c2410c] transition-all cursor-pointer"
              />
              <span className="text-sm font-bold text-[#c2410c]">Not joined (moves to Left Employees &gt; Not Joined)</span>
            </label>

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => {
                console.log("Saving changes:", formData);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#0066cc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ManageEmployeeModal;
