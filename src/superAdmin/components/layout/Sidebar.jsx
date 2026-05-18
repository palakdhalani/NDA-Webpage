import React from 'react';
import {
  LayoutGrid,
  Building2,
  Database,
  BarChart3,
  BellRing,
  Users2,
  CreditCard,
  UserCircle,
  FileText,
  LogOut,
  X,
  ShieldCheck
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutGrid, label: 'Overview', path: '/admin' },
  { icon: Building2, label: 'Enterprises', path: '/admin/enterprises' },
  { icon: Database, label: 'Storage Usage', path: '/admin/storage' },
  { icon: BarChart3, label: 'Activity Trends', path: '/admin/activity' },
  // Expiry Alerts link with Href (Hash)
  { icon: BellRing, label: 'Expiry Alerts', path: '/admin/alerts#alerts' }, 
  { icon: Users2, label: 'User Access', path: '/admin/access' },
  { icon: CreditCard, label: 'Plans', path: '/admin/plans' },
  { icon: UserCircle, label: 'Profile', path: '/admin/profile' },
];

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user_name');
    navigate('/');
    if (onClose) onClose();
  };

  return (
    <aside className="w-[280px] h-screen bg-white border-r border-slate-100 flex flex-col relative z-50 shadow-md overflow-hidden font-sans">
      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="md:hidden absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Brand Header */}
      <div className="pt-8 pb-8 px-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-md shadow-blue-100 shrink-0 transform -rotate-3 group cursor-pointer hover:rotate-0 transition-transform">
           <ShieldCheck size={28} />
        </div>
        <div>
           <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
             System
           </h1>
           <p className="text-blue-600 font-bold text-xl tracking-tight mt-1 uppercase">Ledger</p>
        </div>
      </div>

      {/* Navigation */}
     <nav className="flex-1 px-4 overflow-y-auto no-scrollbar space-y-1">
        <p className="px-6 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-2">Main Navigation</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            // FIX: Agar path '/admin' hai to 'end' prop add karein exact match ke liye
            end={item.path === '/admin'} 
            onClick={onClose}
            className={({ isActive }) => twMerge(
              'flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all duration-300 group font-bold relative overflow-hidden',
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
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
                    layoutId="navGlow"
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

      {/* Bottom Section */}
      <div className="p-4 mt-auto border-t border-slate-50">
        <div className="space-y-1.5">
          {/* <NavLink
            to="/admin/docs"
            onClick={onClose}
            className={({ isActive }) => twMerge(
              'flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all font-bold text-sm',
              isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            )}
          >
            <div className="w-6 flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <span className="tracking-tight">Documentation</span>
          </NavLink> */}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all font-bold text-sm"
          >
            <div className="w-6 flex items-center justify-center shrink-0">
              <LogOut size={20} />
            </div>
            <span className="tracking-tight">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
