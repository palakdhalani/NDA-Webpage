import React from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ClipboardList,
  Download,
  Users,
  Users2,
  Bell,
  Settings,
  Box
} from 'lucide-react';

const EvaluationSkills = ({ onBack }) => {
  const skills = [
    { id: 1, order: 1, name: 'Technical', status: 'Active' },
    { id: 2, order: 2, name: 'Soft skill', status: 'Active' },
    { id: 3, order: 3, name: 'Leadership', status: 'Active' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Navbar Integration */}
      <div className="hidden lg:flex justify-between items-center bg-white p-4 -mx-8 -mt-8 mb-8 border-b border-gray-100">
        <div className="flex items-center gap-2 pl-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={20} />
            <h2 className="text-sm font-bold text-gray-700">Admin Dashboard</h2>
          </button>
        </div>
        <div className="flex items-center gap-4 pr-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0052cc] text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors">
            <Download size={14} />
            Download Excel
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-xs font-medium hover:bg-gray-50 rounded-lg transition-colors">
            <Users size={14} />
            Staff Form
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-xs font-medium hover:bg-gray-50 rounded-lg transition-colors">
            <Users2 size={14} />
            Worker Form
          </button>
          <div className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-100">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings size={18} />
            </button>
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right">
                <p className="text-[11px] font-bold text-gray-800">Mr. Vimal Patel</p>
                <p className="text-[9px] text-gray-400">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-100">
                M
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Title & Actions */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-100 border-dotted">
        <div className="flex items-center gap-3">
          <ClipboardList className="text-gray-800" size={24} />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Evaluation Skills</h1>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500 text-blue-600" />
            <span className="text-[13px] font-bold text-gray-500 group-hover:text-gray-700 transition-colors">Show inactive</span>
          </label>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0052cc] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 transition-all active:scale-95">
            <Plus size={18} />
            Add Skill
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/10 border-b border-gray-50">
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-32">ORDER</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">NAME</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-48">STATUS</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-32 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-gray-50/20 transition-colors group">
                  <td className="px-8 py-7 text-[13px] font-bold text-gray-800">
                    {skill.order}
                  </td>
                  <td className="px-8 py-7 text-[13px] font-bold text-gray-800 tracking-tight">
                    {skill.name}
                  </td>
                  <td className="px-8 py-7">
                    <span className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                      {skill.status}
                    </span>
                  </td>
                  <td className="px-8 py-7 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest pt-12 pb-8">
        <Box size={14} />
        System Ledger · Skill Configuration
      </div>
    </div>
  );
};

export default EvaluationSkills;
