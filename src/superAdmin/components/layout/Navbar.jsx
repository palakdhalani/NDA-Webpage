import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, Menu, Search, User, LogOut, Settings, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem('user_photo') || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop"
  );

  useEffect(() => {
    const handlePhotoUpdate = () => {
      setProfilePhoto(localStorage.getItem('user_photo') || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop");
    };
    window.addEventListener('profile_photo_updated', handlePhotoUpdate);
    return () => window.removeEventListener('profile_photo_updated', handlePhotoUpdate);
  }, []);

  // Map paths to titles for mobile header
  const getTitle = (path) => {
    if (path.includes('/admin')) {
      const parts = path.split('/');
      const last = parts[parts.length - 1];
      if (last === 'admin') return 'Dashboard';
      return last.charAt(0).toUpperCase() + last.slice(1);
    }
    return 'System Ledger';
  };

  const handleLogout = () => {
    localStorage.removeItem('user_name');
    navigate('/');
  };

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-8 bg-transparent gap-4">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Title */}
      <h1 className="md:hidden text-2xl font-bold text-slate-800">
        {getTitle(location.pathname)}
      </h1>

      {/* Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search enterprise ledger..."
            className="w-full h-12 pl-12 pr-4 bg-white rounded-2xl border border-slate-100 shadow-md focus:ring-2 focus:ring-blue-500/10 outline-none text-sm text-slate-600 placeholder:text-slate-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all relative ${showNotifications ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
          >
            <Bell size={20} />
            <span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full ${showNotifications ? 'bg-white border-2 border-blue-600' : 'bg-rose-500 border-2 border-blue-50'}`} />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-54 sm:w-80 bg-white rounded-2xl shadow-md border border-slate-100 z-20 py-2 overflow-hidden"
                >
                  <div className="px-5 py-3 border-b border-slate-50 flex justify-between items-center">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-widest">Notifications</p>
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-500 rounded-md text-[10px] font-bold">2 New</span>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto no-scrollbar">
                    {/* Notification Item 1 */}
                    <div className="px-5 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-50 cursor-pointer flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                        <AlertTriangle size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-tight mb-1">Storage Alert</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Enterprise Systems has exceeded 90% of their storage limit.</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-2">Just now</p>
                      </div>
                    </div>

                    {/* Notification Item 2 */}
                    <div className="px-5 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-50 cursor-pointer flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Info size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-tight mb-1">New Registration</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">TechCorp Solutions just signed up for the Silver Plan.</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-2">2 hours ago</p>
                      </div>
                    </div>

                    {/* Notification Item 3 */}
                    <div className="px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-4 opacity-60">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-tight mb-1">System Backup</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Automated system backup completed successfully.</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-2">Yesterday</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-2 border-t border-slate-50">
                    <button 
                      onClick={() => { navigate('/admin/alerts'); setShowNotifications(false); }}
                      className="w-full py-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors text-center"
                    >
                      View All Alerts
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex items-center gap-3 md:bg-white md:p-1.5 md:pr-4 md:rounded-2xl md:border md:shadow-md cursor-pointer transition-all ${showDropdown ? 'border-blue-200 ring-4 ring-blue-500/5' : 'border-slate-100 hover:shadow-md'}`}
          >
            <div className="w-10 h-10 rounded-full md:rounded-xl overflow-hidden shadow-inner border border-slate-50">
              <img
                src={profilePhoto}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <h4 className="text-sm font-bold text-slate-800 leading-tight">{localStorage.getItem('user_name') || 'Super Admin'}</h4>
              <p className="text-[11px] text-slate-400 font-medium">Super Admin</p>
            </div>
            <ChevronDown size={16} className={`text-slate-400 ml-1 hidden md:block transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-md border border-slate-100 z-20 py-2.5 overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</p>
                  </div>
                  <button
                    onClick={() => { navigate('/admin/profile'); setShowDropdown(false); }}
                    className="w-full px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-all"
                  >
                    <User size={16} className="text-slate-400" /> My Profile
                  </button>
                  {/* <button
                    onClick={() => { navigate('/admin/profile'); setShowDropdown(false); }}
                    className="w-full px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-all"
                  >
                    <Settings size={16} className="text-slate-400" /> Account Settings
                  </button> */}
                  <div className="h-px bg-slate-50 my-1.5" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 flex items-center gap-3 transition-all"
                  >
                    <LogOut size={16} /> Logout Account
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
