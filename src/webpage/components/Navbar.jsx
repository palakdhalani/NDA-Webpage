import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="NDA Technology Solutions" className="h-16 md:h-24 transform scale-260 w-auto object-contain" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-slate-600 hover:text-[#004792] transition-colors">Home</a>
            <a href="#ehs" className="text-sm font-medium text-slate-600 hover:text-[#004792] transition-colors">EHS Software</a>
            <a href="#hrms" className="text-sm font-medium text-slate-600 hover:text-[#004792] transition-colors">HRMS Software</a>
            <a href="#benefits" className="text-sm font-medium text-slate-600 hover:text-[#004792] transition-colors">Benefits</a>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hidden md:flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#004792] rounded-full hover:bg-black transition-all hover:shadow-lg hover:shadow-[#004792]/20 active:scale-95">
              Login Portal
            </Link>
            
            <button 
              className="md:hidden text-slate-600 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-4"
        >
          <div className="flex flex-col gap-4">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium px-4 py-2 hover:bg-blue-50 hover:text-[#004792] rounded-lg">Home</a>
            <a href="#ehs" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium px-4 py-2 hover:bg-blue-50 hover:text-[#004792] rounded-lg">EHS Software</a>
            <a href="#hrms" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium px-4 py-2 hover:bg-blue-50 hover:text-[#004792] rounded-lg">HRMS Software</a>
            <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium px-4 py-2 hover:bg-blue-50 hover:text-[#004792] rounded-lg">Benefits</a>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="mt-2 flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-[#004792] rounded-xl">
              Login Portal
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
