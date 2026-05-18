import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import CustomSelect from '../../../components/ui/CustomSelect';


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
          className="relative bg-white w-full sm:max-w-lg rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2 sm:hidden shrink-0" />
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const initialFormState = {
    role: 'Sub-admin (company portal)',
    email: '',
    password: '',
    name: '',
    mobile: '',
    designation: '',
    level: '1',
    ips: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  
  const modules = [
    'Dashboard', 'Manpower Requisition',
    'Candidate', 'Worker',
    'Joining Document', 'Employment Letter',
    'Job Responsibilities', 'Organization Structure',
    'I-Card', 'Left Employees',
    'Employee Motivation', 'Employee Suggestion',
    'Fine Register', 'Plans',
    'Report', 'Company'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;
    onAddUser({
      ...formData,
      id: Date.now(),
      status: 'Active',
      role: formData.role.split(' ')[0] 
    });
    setFormData(initialFormState);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto no-scrollbar">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">Add user</h2>
            <p className="text-[11px] font-bold text-gray-400 leading-relaxed">
              Default role is Sub-admin. Switch to Employee for staff app users only.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Role</label>
              <CustomSelect 
                options={['Sub-admin (company portal)', 'Admin', 'Employee']} 
                value={formData.role} 
                onChange={(val) => handleChange('role', val)} 
              />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Mobile</label>
                <input 
                  type="text" 
                  value={formData.mobile}
                  onChange={(e) => handleChange('mobile', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Designation</label>
                <input 
                  type="text" 
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Level (1, 2, 3...)</label>
                <input 
                  type="text" 
                  value={formData.level}
                  onChange={(e) => handleChange('level', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Allowed login IPs (optional)</label>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tight mb-1">Comma-separated. Empty = login from any IP.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="text" 
                  placeholder="e.g. 203.0.113.10" 
                  value={formData.ips}
                  onChange={(e) => handleChange('ips', e.target.value)}
                  className="flex-1 bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
                <button 
                  type="button"
                  onClick={() => handleChange('ips', '43.250.156.131')}
                  className="w-full sm:w-auto px-4 py-3.5 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                >
                  Get my IP
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] ml-0.5">Module access</label>
              <div className="bg-gray-50/50 border border-gray-100 rounded-[1.5rem] p-5">
                 <div className="mb-4 pb-2 border-b border-blue-100/50">
                    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">General</span>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {modules.map(mod => (
                      <label key={mod} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="checkbox" defaultChecked className="peer appearance-none w-5 h-5 rounded-md border border-gray-200 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                          <CheckCircle2 size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className="text-xs font-bold text-gray-500 group-hover:text-gray-800 transition-colors tracking-tight">{mod}</span>
                      </label>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>

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
            Create user
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddUserModal;
