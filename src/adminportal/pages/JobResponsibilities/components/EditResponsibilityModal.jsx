import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Type,
  CloudUpload,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSelect from '../../../components/ui/CustomSelect.jsx';

const EditResponsibilityModal = ({ isOpen, onClose, departments = [], employees = [], data }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: '',
    position: '',
    department: '',
    experience: '',
    responsibilities: '',
    docNumber: '',
    revision: '1',
    showKPIs: false,
    showAttendance: false
  });

  useEffect(() => {
    if (data) {
      setFormData({
        employeeName: data.user || data.name || '',
        position: data.role || '',
        department: data.dept || data.deptName || 'Test',
        experience: data.exp || data.count || '3',
        responsibilities: data.keyResp || 'test',
        docNumber: data.docNumber || '',
        revision: data.rev || '1',
        showKPIs: data.showKPIs || false,
        showAttendance: data.showAttendance || false
      });
    }
  }, [data]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-[1.5rem] shadow-2xl flex flex-col max-h-[95vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold text-[#1e293b]">Edit Job Responsibilities</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Employee Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600">
                  Employee Name <span className="text-red-500">*</span>
                </label>
                <CustomSelect 
                  options={employees.length > 0 ? employees : [
                    'Select employee', 
                    'Mr. Vimal Patel', 
                    'testing', 
                    'user2@techcorp.com',
                    'user3@techcorp.com',
                    'user4@techcorp.com'
                  ]} 
                  value={formData.employeeName || 'Select employee'} 
                  onChange={(val) => setFormData({ ...formData, employeeName: val })} 
                />
              </div>

              {/* Position */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600">
                  Position/Job Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Add Position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-blue-400 transition-all"
                />
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600">
                  Department <span className="text-red-500">*</span>
                </label>
                <CustomSelect 
                  options={departments.length > 0 ? ['Select department', ...departments] : ['Select department', 'HR', 'Account', 'Test']} 
                  value={formData.department || 'Select department'} 
                  onChange={(val) => setFormData({ ...formData, department: val })} 
                />
              </div>

              {/* Doc Number & Revision */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600">Document Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. DOC-001"
                    value={formData.docNumber}
                    onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-blue-400 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600">Revision</label>
                  <input 
                    type="text" 
                    value={formData.revision}
                    onChange={(e) => setFormData({ ...formData, revision: e.target.value })}
                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-blue-400 transition-all"
                  />
                  <p className="text-[9px] text-gray-400 font-bold ml-1">Will increment to {parseInt(formData.revision) + 1 || 2} on save</p>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600">
                  Experience Required <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Add Exp"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-blue-400 transition-all"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600">
                  Key Responsibilities & KPIs <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50/50 border-b border-gray-200 p-2 flex items-center gap-1 flex-wrap">
                    <select className="bg-transparent border-none text-[10px] font-bold text-gray-500 outline-none mr-2">
                      <option>Normal</option>
                    </select>
                    <div className="w-px h-4 bg-gray-200 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-500"><Bold size={14} /></button>
                    <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-500"><Italic size={14} /></button>
                    <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-500"><Underline size={14} /></button>
                    <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-500"><Strikethrough size={14} /></button>
                    <div className="w-px h-4 bg-gray-200 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-500"><ListOrdered size={14} /></button>
                    <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-500"><List size={14} /></button>
                    <div className="w-px h-4 bg-gray-200 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-white rounded transition-all text-gray-500"><Type size={14} /></button>
                  </div>
                  <textarea 
                    required
                    placeholder="Add Responsibilities"
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    className="w-full h-32 p-4 text-xs font-bold text-gray-700 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Upload Section */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600">Upload Document</label>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="hidden"
                />
                <div 
                  onClick={handleUploadClick}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50/30 group hover:border-blue-300 transition-all cursor-pointer"
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center animate-in zoom-in duration-300">
                      <FileText size={32} className="text-blue-500 mb-2" />
                      <p className="text-xs font-bold text-gray-700">{selectedFile.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-1">Click to change file</p>
                    </div>
                  ) : (
                    <>
                      <CloudUpload size={32} className="text-gray-300 group-hover:text-blue-400 transition-colors mb-3" />
                      <p className="text-[10px] font-bold text-gray-400">Drop PNG, JPG, PDF file here or click to browse</p>
                      <p className="text-[9px] text-gray-400 font-bold">Only PNG, JPG, PDF are allowed</p>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white sticky bottom-0">
            <button 
              onClick={onClose}
              className="px-8 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-8 py-2.5 bg-[#0066cc] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
            >
              Update Job Responsibilities
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditResponsibilityModal;
