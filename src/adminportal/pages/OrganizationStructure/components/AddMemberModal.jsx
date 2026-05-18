import React, { useState, useRef } from 'react';
import {
  X,
  User,
  Briefcase,
  Building2,
  Mail,
  Phone,
  Image as ImageIcon,
  ChevronDown,
  CloudUpload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSelect from '../../../components/ui/CustomSelect.jsx';

const AddMemberModal = ({ isOpen, onClose, onAdd }) => {
  const fileInputRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    department: '',
    email: '',
    mobile: '',
    reportingTo: 'No Manager (Root)'
  });

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, photo: selectedPhoto });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Add Member to Chart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
            {/* Photo Upload Section */}
            <div className="flex justify-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={handlePhotoClick}
                className="w-32 h-32 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all group overflow-hidden"
              >
                {selectedPhoto ? (
                  <img src={selectedPhoto} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon size={28} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Photo</span>
                  </>
                )}
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <User size={16} />
                  <label className="text-xs font-bold uppercase tracking-wider">Full Name</label>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full h-12 px-5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300"
                />
              </div>

              {/* Designation & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Briefcase size={16} />
                    <label className="text-xs font-bold uppercase tracking-wider">Designation</label>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Director"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full h-12 px-5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Building2 size={16} />
                    <label className="text-xs font-bold uppercase tracking-wider">Department</label>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Operations"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full h-12 px-5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Email & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Mail size={16} />
                    <label className="text-xs font-bold uppercase tracking-wider">Email</label>
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 px-5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Phone size={16} />
                    <label className="text-xs font-bold uppercase tracking-wider">Mobile</label>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Phone number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full h-12 px-5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Reporting To */}
              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-bold text-slate-700">Reporting To</label>
                <CustomSelect
                  options={[
                    'No Manager (Root)',
                    'Mr. Piyush Patel (Plant Head)',
                    'Mr. Sachin Moradiya (Prod. Manager)',
                    'Jayesh m karavadara (DFD)',
                    'test123 (NA)',
                    'Mr. Vimal Patel (Management)',
                    'testing (No Designation)',
                    'user2@techcorp.com (No Designation)',
                    'user3@techcorp.com (No Designation)',
                    'user4@techcorp.com (No Designation)',
                    'Jayesh m karavadara (Safety Officer)',
                    'Ramanuj (dev)',
                    'rajat (dev)',
                    'rajat Kumar Sinha (Sr. Manager)',
                    'rajat Kumar Sinha (gvhjbkn)',
                    'Candidate 2 (test)',
                    'Mr. Piyush Patel (Management)',
                    'Rahul Najbhai Solanki (dev)',
                    'rajat Kumar Sinha (dev)',
                    'Abc (Tttt)',
                    'Mr. Sachin Morjariya (Management)',
                    'Candidate 2 Worker (teest)',
                    'Pampaniya mahendra maldebhai (dev)'
                  ]}
                  value={formData.reportingTo}
                  onChange={(val) => setFormData({ ...formData, reportingTo: val })}
                  className="w-full"
                />
                <p className="text-[10px] font-bold text-slate-400 italic mt-2 ml-1">
                  Select a manager from the chart (System Users, Employees, or Manual Members).
                </p>
              </div>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-8 border-t border-gray-50 flex items-center justify-end gap-6 bg-slate-50/10">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-10 py-3.5 bg-[#0066cc] text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
            >
              Add to Chart
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddMemberModal;
