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
  X,
  LayoutGrid,
  Database,
  BarChart3,
  BellRing,
  CreditCard,
  UserCircle,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const adminMenuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: Home },
  { id: 'manage-users', label: 'Manage users', path: '/admin/manage-users', icon: Users },
  { id: 'manpower', label: 'Manpower Requisition', path: '/admin/manpower', icon: FileText },
  { id: 'candidate', label: 'Candidate', path: '/admin/candidate', icon: User },
  { id: 'worker', label: 'Worker', path: '/admin/worker', icon: Users2 },
  { id: 'joining-doc', label: 'Joining Document', path: '/admin/joining-doc', icon: ClipboardList },
  { id: 'employment-letter', label: 'Employment Letter', path: '/admin/employment-letter', icon: CheckCircle2 },
  { id: 'job-responsibilities', label: 'Job Responsibilities', path: '/admin/job-responsibilities', icon: Scale },
  { id: 'org-structure', label: 'Organization Structure', path: '/admin/org-structure', icon: Building2 },
  { id: 'i-card', label: 'I-Card', path: '/admin/i-card', icon: IdCard },
  { id: 'left-employees', label: 'Left Employees', path: '/admin/left-employees', icon: UserMinus },
  { id: 'employee-motivation', label: 'Employee Motivation', path: '/admin/employee-motivation', icon: Heart },
  { id: 'employee-suggestion', label: 'Employee Suggestion', path: '/admin/employee-suggestion', icon: Lightbulb },
];

const superAdminMenuItems = [
  { icon: LayoutGrid, label: 'Overview', path: '/superadmin' },
  { icon: Building2, label: 'Enterprises', path: '/superadmin/enterprises' },
  { icon: Database, label: 'Storage Usage', path: '/superadmin/storage' },
  { icon: BarChart3, label: 'Activity Trends', path: '/superadmin/activity' },
  { icon: BellRing, label: 'Expiry Alerts', path: '/superadmin/alerts#alerts' }, 
  { icon: Users2, label: 'User Access', path: '/superadmin/access' },
  { icon: CreditCard, label: 'Plans', path: '/superadmin/plans' },
  { icon: UserCircle, label: 'Profile', path: '/superadmin/profile' },
];

const Sidebar = ({ role = 'admin', isOpen, onClose }) => {
  const navigate = useNavigate();
  const isSuper = role === 'superadmin';
  const menuItems = isSuper ? superAdminMenuItems : adminMenuItems;

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    navigate('/');
    if (onClose) onClose();
  };

  const userName = localStorage.getItem('user_name') || (isSuper ? 'System Admin' : 'Mr. Vimal Patel');
  const userRoleDisplay = isSuper ? 'Super Admin' : 'System Admin';
  const userInitials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

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

      <aside className="w-72 h-full bg-white border-r border-gray-100 flex flex-col overflow-hidden font-sans shadow-xl md:shadow-none">
        {/* Header / Logo */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center text-white shadow-md shrink-0 transform -rotate-3 hover:rotate-0 transition-transform ${isSuper ? 'bg-blue-600 shadow-blue-100' : 'bg-blue-600 shadow-blue-100 ring-4 ring-blue-50'}`}>
              {isSuper ? <ShieldCheck size={28} /> : <Box className="text-white w-6 h-6" />}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-none">
                {isSuper ? 'System' : 'HRMS Ledger'}
              </h1>
              <p className="text-blue-600 font-bold text-[10px] sm:text-xs tracking-tight mt-1 uppercase">
                {isSuper ? 'Ledger' : 'Admin Portal'}
              </p>
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
          <p className="px-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Main Navigation</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/admin' || item.path === '/superadmin'}
              onClick={onClose}
              className={({ isActive }) => twMerge(
                'flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group font-bold relative overflow-hidden',
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {({ isActive }) => (
                <>
                  <div className="w-6 flex items-center justify-center shrink-0">
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className="text-sm tracking-tight">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId={`navGlow-${role}`}
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        {/* Footer / Profile Preview */}
        <div className="p-4 mt-auto border-t border-gray-50">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-100 shrink-0">
                {userInitials}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-gray-800 truncate leading-none">{userName}</p>
                <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">{userRoleDisplay}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all font-bold text-sm"
            >
              <div className="w-6 flex items-center justify-center shrink-0">
                <LogOut size={20} />
              </div>
              <span className="tracking-tight">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
