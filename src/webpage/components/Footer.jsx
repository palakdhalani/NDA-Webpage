import React from 'react';
import { Heart, Send } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#004792] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5">
            <div className="-ml-4 inline-block mb-6">
              <Link to="/" className="inline-block bg-white px-10 rounded-3xl">
                <img src={logo} alt="NDA Technology Solutions" className="h-24 md:h-32 transform scale-250 w-auto object-contain" />
              </Link>
            </div>
            <p className="text-blue-100 mb-8 max-w-md text-lg">
              Smart Software Solutions for Smart Businesses. Simplify EHS and HRMS operations with our intelligent platforms.
            </p>
            
            

            <div className="flex items-center gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-blue-700/50 flex items-center justify-center hover:bg-white hover:text-[#004792] transition-all border border-blue-400/30">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-blue-700/50 flex items-center justify-center hover:bg-white hover:text-[#004792] transition-all border border-blue-400/30">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-blue-700/50 flex items-center justify-center hover:bg-white hover:text-[#004792] transition-all border border-blue-400/30">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-1"></div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6 tracking-wide">Company</h4>
            <ul className="flex flex-col gap-4 text-blue-100">
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">About Us</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Community Blog</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Contact Us</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6 tracking-wide">Modules</h4>
            <ul className="flex flex-col gap-4 text-blue-100">
              <li><a href="#ehs" className="hover:text-white hover:translate-x-1 inline-block transition-transform">EHS Software</a></li>
              <li><a href="#hrms" className="hover:text-white hover:translate-x-1 inline-block transition-transform">HRMS Software</a></li>
              <li><a href="#benefits" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Benefits</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Integrations</a></li>
              <li><Link to="/admin" className="hover:text-white hover:translate-x-1 inline-block transition-transform font-bold underline underline-offset-4 mt-2">Login Portal</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6 tracking-wide">Need Help?</h4>
            <ul className="flex flex-col gap-4 text-blue-100 mb-8">
              <li>Email us:</li>
              <li className="font-semibold text-white">nadtechnology@gmail.com</li>
              <li className="mt-2">Call us:</li>
              <li className="font-semibold text-white text-[19px]">+91 9909959526</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-blue-500/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200">
          <p>© {new Date().getFullYear()} NDA Technology Solutions. All rights reserved.</p>
          <div className="flex items-center gap-2 bg-blue-700/30 px-4 py-2 rounded-full">
            Developed by Spirex Infoways
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
