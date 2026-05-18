import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode } from 'lucide-react';

const QRCodeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-[#1e293b]">Candidate Application QR Code</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* QR Content */}
          <div className="p-8 space-y-8">
            <div className="bg-gray-50/50 rounded-3xl p-10 flex items-center justify-center border border-gray-50 shadow-inner">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                {/* Placeholder QR Code - using QrCode icon as representation, but I will make it look like a real one with CSS grid or image */}
                <div className="w-48 h-48 bg-[#1e293b] rounded-lg p-2 grid grid-cols-8 grid-rows-8 gap-0.5 overflow-hidden">
                   {/* Generating a fake QR pattern */}
                   {[...Array(64)].map((_, i) => (
                     <div 
                       key={i} 
                       className={`${(Math.random() > 0.5 || (i % 7 === 0)) ? 'bg-white' : 'bg-transparent'} transition-all`}
                     />
                   ))}
                   {/* QR squares at corners */}
              
                </div>
                {/* Real QR Image alternative - just in case */}
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=HRMS-Ledger-Application" 
                  alt="QR Code" 
                  className="w-48 h-48 hidden" 
                />
               
              </div>
            </div>

            <button className="w-full py-4 bg-[#0052cc] text-white rounded-2xl text-base font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3">
              Download
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QRCodeModal;
