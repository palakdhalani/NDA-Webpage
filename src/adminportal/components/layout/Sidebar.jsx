import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  FileText, 
  User, 
  Users2, 
  ClipboardList, 
  CheckCircle2, 
  Scale, 
  Building2, 
  IdCard, 
  UserMinus, 
  Heart, 
  Lightbulb, 
  Box,
  X
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'manage-users', label: 'Manage users', icon: Users },
  { id: 'manpower', label: 'Manpower Requisition', icon: FileText },
  { id: 'candidate', label: 'Candidate', icon: User },
  { id: 'worker', label: 'Worker', icon: Users2 },
  { id: 'joining-doc', label: 'Joining Document', icon: ClipboardList },
  { id: 'employment-letter', label: 'Employment Letter', icon: CheckCircle2 },
  { id: 'job-responsibilities', label: 'Job Responsibilities', icon: Scale },
  { id: 'org-structure', label: 'Organization Structure', icon: Building2 },
  { id: 'i-card', label: 'I-Card', icon: IdCard },
  { id: 'left-employees', label: 'Left Employees', icon: UserMinus },
  { id: 'employee-motivation', label: 'Employee Motivation', icon: Heart },
  { id: 'employee-suggestion', label: 'Employee Suggestion', icon: Lightbulb },
];

const Sidebar = ({ currentView, onViewChange, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-gray-100 flex flex-col z-[70] lg:sticky lg:translate-x-0 shadow-xl lg:shadow-sm overflow-hidden`}
      >
        {/* Header / Logo */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 ring-4 ring-blue-50">
              <Box className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-blue-900 tracking-tighter leading-none">HRMS Ledger</h1>
              <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase mt-1">Admin Portal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = currentView === item.id || (currentView === 'analytics' && item.id === 'dashboard');
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                initial={false}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 group relative text-left
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <item.icon 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110
                    ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}
                  `} 
                />
                <span className={`text-[13px] font-bold tracking-tight ${isActive ? 'font-bold' : 'font-semibold'}`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-600 rounded-l-full shadow-[0_0_12px_rgba(37,99,235,0.3)]" 
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
        
        {/* Footer / Profile Preview */}
        <div className="p-5 mt-auto border-t border-gray-50">
          <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-100">
              VP
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-800 truncate leading-none">Mr. Vimal Patel</p>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">System Admin</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
