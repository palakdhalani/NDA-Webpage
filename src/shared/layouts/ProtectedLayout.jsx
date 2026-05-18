import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Menu, Box } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const ProtectedLayout = ({ role = 'admin' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('user_name');
  const userRole = localStorage.getItem('user_role'); // 'admin' or 'superadmin'

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (userRole && userRole !== role) {
    return <Navigate to={userRole === 'superadmin' ? '/superadmin' : '/admin'} replace />;
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans relative">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 
        md:static md:translate-x-0 flex-shrink-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar role={role} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full">
        {role === 'superadmin' ? (
          <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
        ) : (
          <header className="lg:hidden h-16 bg-white border-b border-gray-100 px-4 flex items-center justify-between sticky top-0 z-[50]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <Box className="text-white w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-blue-900 tracking-tighter">HRMS</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              VP
            </div>
          </header>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar pb-6 md:pb-12 bg-[#F8FAFC]">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
