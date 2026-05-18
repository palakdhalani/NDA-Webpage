import React from 'react';
import { 
  LayoutGrid, 
  Building2, 
  Database, 
  BarChart3, 
  BellRing, 
  Users2, 
  CreditCard, 
  UserCircle 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { icon: LayoutGrid, label: 'Home', path: '/admin' },
  { icon: Building2, label: 'Ent.', path: '/admin/enterprises' },
  { icon: Database, label: 'Disk', path: '/admin/storage' },
  { icon: BarChart3, label: 'Stats', path: '/admin/activity' },
  { icon: BellRing, label: 'Alerts', path: '/admin/alerts' },
  { icon: Users2, label: 'Access', path: '/admin/access' },
  { icon: CreditCard, label: 'Plans', path: '/admin/plans' },
  { icon: UserCircle, label: 'Me', path: '/admin/profile' },
];

const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 h-16 z-50 shadow-md">
      {/* Scrollable Container */}
      <div className="flex items-center h-full overflow-x-auto no-scrollbar px-2">
        <div className="flex items-center justify-start min-w-full">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center 
                min-w-[75px] h-16 transition-all duration-300
                ${isActive ? 'text-blue-600' : 'text-slate-400'}
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Indicator Dot */}
                  <div className={`mb-1 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  
                  <span className={`text-[9px] font-bold uppercase tracking-tighter transition-all ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                    {item.label}
                  </span>

                  {/* Active Bar at the bottom */}
                  {isActive && (
                    <div className="absolute bottom-0 w-8 h-1 bg-blue-600 rounded-t-full shadow-md" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
