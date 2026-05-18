import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown } from 'lucide-react';

const ModalWrapper = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const EditUserModal = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    designation: '',
    level: '',
    ips: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        password: '',
        name: user.name || '',
        mobile: user.mobile === '—' ? '' : (user.mobile || ''),
        designation: user.designation === '—' ? '' : (user.designation || ''),
        level: user.level === '—' ? '' : (user.level || ''),
        ips: user.ips === 'Any IP' ? '' : (user.ips || '')
      });
    }
  }, [user]);
  
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
    onSave({
      ...user,
      ...formData,
      // If password is blank, we don't update it in a real app, here we just keep the form state
    });
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
        <div className="p-8 space-y-6 overflow-y-auto no-scrollbar">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Edit user</h2>
            <p className="text-[11px] font-bold text-gray-400 leading-relaxed">
              {user?.role} · {user?.email}
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
              />
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">New password (optional)</label>
              <input 
                type="password" 
                placeholder="Leave blank to keep current" 
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
              />
            </div>

            {/* Mobile & Name (Note: image shows Mobile on left, Name on right) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Mobile</label>
                <input 
                  type="text" 
                  value={formData.mobile}
                  onChange={(e) => handleChange('mobile', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
            </div>

            {/* Designation & Level */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Designation</label>
                <input 
                  type="text" 
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Level</label>
                <input 
                  type="text" 
                  value={formData.level}
                  onChange={(e) => handleChange('level', e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
              </div>
            </div>

            {/* Allowed login IPs */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Allowed login IPs</label>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tight mb-1">Comma-separated. Empty = any IP.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="e.g. 203.0.113.10" 
                  value={formData.ips}
                  onChange={(e) => handleChange('ips', e.target.value)}
                  className="flex-1 bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                />
                <button 
                  type="button"
                  onClick={() => handleChange('ips', '43.250.156.131')}
                  className="px-4 py-3 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                >
                  Get my IP
                </button>
              </div>
            </div>

            {/* Module Access */}
            <div className="space-y-3 pt-2">
              <label className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] ml-0.5">Module access</label>
              <div className="bg-gray-50/50 border border-gray-100 rounded-[1.5rem] p-4">
                 <div className="mb-4 pb-2 border-b border-blue-100/50">
                    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">General</span>
                 </div>
                 <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {modules.map(mod => (
                      <label key={mod} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="checkbox" defaultChecked className="peer appearance-none w-4 h-4 rounded-md border border-gray-200 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                          <CheckCircle2 size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className="text-[11px] font-bold text-gray-500 group-hover:text-gray-800 transition-colors tracking-tight">{mod}</span>
                      </label>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50/30 border-t border-gray-50 flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-8 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
          >
            Save
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditUserModal;
