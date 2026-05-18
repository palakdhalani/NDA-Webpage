import React from 'react';
import { X, FileText, User, Building2, Briefcase, Calendar, Clock, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResponsibilityDetailsModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          className="relative w-full max-w-3xl bg-white rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Job Responsibility Details</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Top Grid Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <User size={14} className="text-gray-400" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Employee</p>
                </div>
                <p className="text-xs font-bold text-gray-700 break-words">{data.user || data.name}</p>
              </div>
              <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={14} className="text-gray-400" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Department</p>
                </div>
                <p className="text-xs font-bold text-gray-700">{data.dept || data.deptName || 'Test'}</p>
              </div>
              <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={14} className="text-gray-400" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Position</p>
                </div>
                <p className="text-xs font-bold text-gray-700">{data.role}</p>
              </div>
              <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-gray-400" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience Required</p>
                </div>
                <p className="text-xs font-bold text-gray-700">{data.exp || data.count || '-'}</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-sm font-bold text-gray-500">Revision: <span className="text-gray-800">{data.rev || 1}</span></p>

              {/* Summary Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800">Key Responsibilities & KPIs (Summary)</h3>
                <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <p className="text-xs font-bold text-gray-600 leading-relaxed">
                    {data.keyResp || data.role || "test"}
                  </p>
                </div>
              </div>

              {/* Detail Sections */}
              <div className="p-5 bg-gray-50/30 border border-gray-100 rounded-2xl space-y-2">
                <h3 className="text-[11px] font-bold text-gray-800">Key Responsibilities & KPIs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 text-[10px] font-bold text-gray-400 uppercase">#</th>
                        <th className="py-2 text-[10px] font-bold text-gray-400 uppercase">KRA Description</th>
                        <th className="py-2 text-[10px] font-bold text-gray-400 uppercase">KPI</th>
                        <th className="py-2 text-[10px] font-bold text-gray-400 uppercase">Target</th>
                        <th className="py-2 text-[10px] font-bold text-gray-400 uppercase text-center">Weightage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-50">
                        <td className="py-3 text-xs font-bold text-gray-600">1</td>
                        <td className="py-3 text-xs font-bold text-gray-600">{data.role || 'test'}</td>
                        <td className="py-3 text-xs font-bold text-gray-600">11</td>
                        <td className="py-3 text-xs font-bold text-gray-600">100</td>
                        <td className="py-3 text-xs font-bold text-gray-600 text-center">10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-5 bg-gray-50/30 border border-gray-100 rounded-2xl space-y-2">
                <h3 className="text-[11px] font-bold text-gray-800">Attendance & Punctuality - Detailed Criteria</h3>
                <p className="text-xs font-bold text-gray-400 italic">No data added.</p>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="p-6 border-t border-gray-50 bg-gray-50/10 flex justify-between items-center">
            <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5">
              Created: {data.updated || '2/6/2026, 9:51:45 PM'} · Updated: {data.updated || '2/6/2026, 9:51:45 PM'}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResponsibilityDetailsModal;
