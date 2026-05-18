import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import CustomSelect from '../../../components/ui/CustomSelect';



const StatusChangeModal = ({ isOpen, onClose, worker, onSave }) => {
  const [status, setStatus] = useState(worker?.status || 'Active');

  useEffect(() => {
    if (worker) setStatus(worker.status);
  }, [worker]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Change Worker Status</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600">Select Status</label>
            <CustomSelect 
              options={['Pending', 'Active', 'Left']} 
              value={status} 
              onChange={setStatus} 
            />
          </div>


          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(worker, status)}
              className="flex-1 px-6 py-3 bg-[#0066cc] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatusChangeModal;
