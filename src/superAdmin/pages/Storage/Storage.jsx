import React, { useState } from 'react';
import { 
  Search, Plus, FileText, Image as ImageIcon, FileCode, 
  MoreVertical, Upload, ChevronDown, Lock, Download, 
  Edit, Trash2, File, Shield, Calendar, Database, 
  HardDrive, X, Building2, Box, Hash, Filter, ArrowDown,
  CloudUpload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const initialDocuments = [
  { id: 1, name: 'Bizz Engager Test Post Demo Vertical.jpeg', company: 'TechCorp Solutions', module: 'org_chart_manual', size: '894.6 KB', date: '5/5/2026', ext: 'JPG', access: 'Private', templateType: 'Choose Template Type' },
  { id: 2, name: 'WhatsApp_Image_2026-04-30_at_3.26.png', company: 'TechCorp Solutions', module: 'joining_documents', size: '215.1 KB', date: '5/5/2026', ext: 'PNG', access: 'Private', templateType: 'Choose Template Type' },
  { id: 3, name: 'menufacture (2).jpeg', company: 'TechCorp Solutions', module: 'joining_documents', size: '191.5 KB', date: '5/5/2026', ext: 'JPG', access: 'Private', templateType: 'Choose Template Type' },
  { id: 4, name: '20260406_1739_Image Generation_rem.pdf', company: 'TechCorp Solutions', module: 'org_chart_manual', size: '2.0 MB', date: '5/4/2026', ext: 'PDF', access: 'Private', templateType: 'Choose Template Type' },
  { id: 5, name: 'Sanket resume (1) (1).pdf', company: 'TechCorp Solutions', module: 'N/A', size: '28.2 KB', date: '4/27/2026', ext: 'PDF', access: 'Private', templateType: 'Choose Template Type' },
];

const Storage = () => {
  const [fileList, setFileList] = useState(initialDocuments);
  const [activeTab, setActiveTab] = useState('All');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [companyFilter, setCompanyFilter] = useState('All Companies');

  // Edit State
  const [editingFile, setEditingFile] = useState(null);

  // Form State for New File
  const [formData, setFormData] = useState({
    name: '', company: 'TechCorp Solutions', module: 'general_docs', size: '', ext: 'PDF', access: 'Private', templateType: ''
  });

  const getIcon = (ext) => {
    const baseClass = "p-2 md:p-2.5 rounded-xl border";
    if (ext === 'PDF') return <div className={`${baseClass} bg-rose-50 text-rose-500 border-rose-100/50`}><FileText size={20} /></div>;
    if (['JPG', 'PNG', 'JPEG'].includes(ext)) return <div className={`${baseClass} bg-blue-50 text-blue-500 border-blue-100/50`}><ImageIcon size={20} /></div>;
    if (ext === 'DOCX') return <div className={`${baseClass} bg-indigo-50 text-indigo-500 border-indigo-100/50`}><File size={20} /></div>;
    return <div className={`${baseClass} bg-slate-50 text-slate-500 border-slate-100/50`}><FileCode size={20} /></div>;
  };

  // --- ACTIONS LOGIC ---

  const handleDownload = (file) => {
    toast.success(`Downloading ${file.name}...`);
    // Browser download simulation
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this file?")) {
      setFileList(fileList.filter(f => f.id !== id));
      setOpenMenuId(null);
      toast.error('File deleted permanently');
    }
  };

  const openEdit = (file) => {
    setEditingFile({ ...file });
    setShowEditModal(true);
    setOpenMenuId(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setFileList(fileList.map(f => f.id === editingFile.id ? editingFile : f));
    setShowEditModal(false);
    toast.success('File updated successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFile = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString(),
    };
    setFileList([newFile, ...fileList]);
    setShowModal(false);
    setFormData({ name: '', company: 'TechCorp Solutions', module: 'general_docs', size: '', ext: 'PDF', access: 'Private' });
    toast.success('File added successfully!');
  };

  const filteredDocs = fileList.filter(doc => {
    const matchesTab = activeTab === 'All' || doc.ext === activeTab;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = companyFilter === 'All Companies' || doc.company === companyFilter;
    return matchesTab && matchesSearch && matchesCompany;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 bg-slate-50/30">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Storage Management</h1>
          <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">Manage and organize your enterprise documents.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm shadow-blue-200 hover:bg-blue-700 transition-all">
          <Plus size={18} /> Add New File
        </button>
      </div>

      {/* Filter by Company */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="max-w-xs space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Filter by Company</label>
          <div className="relative">
            <select 
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="w-full h-11 pl-4 pr-10 bg-white border border-slate-200 rounded-xl text-sm font-medium appearance-none outline-none focus:border-blue-500 transition-all cursor-pointer"
            >
              <option>All Companies</option>
              <option>TechCorp Solutions</option>
              <option>Global Industries</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-5">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search documents..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white rounded-xl border border-slate-200 focus:border-blue-400 outline-none text-sm font-medium shadow-sm transition-all"
          />
        </div>

       {/* Filters Toggle & Tabs Row */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${showFilters ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-slate-600 border-slate-200'}`}
          >
            <Filter size={16} /> Filters
          </button>
          
          <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden sm:block" />

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {['All', 'PDF', 'DOCX', 'JPG', 'PNG'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-blue-600 border-b-2 border-blue-600 rounded-none' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-50 overflow-hidden"
            >
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 ml-1">Template Type</label>
                <div className="relative">
                  <select className="w-full h-11 pl-3 pr-10 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 appearance-none outline-none focus:border-blue-400 shadow-sm">
                    <option>All Templates</option>
                    <option>Offer Letter</option>
                    <option>Appointment Letter</option>
                    <option>Induction Form</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 ml-1">Module</label>
                <div className="relative">
                  <select className="w-full h-11 pl-3 pr-10 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 appearance-none outline-none focus:border-blue-400 shadow-sm">
                    <option>All Modules</option>
                    <option>Interview</option>
                    <option>Offer Letter</option>
                    <option>Appointment Letter</option>
                    <option>Legal Register</option>
                    <option>Fine Register</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 ml-1">Access Type</label>
                <div className="relative">
                  <select className="w-full h-11 pl-3 pr-10 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 appearance-none outline-none focus:border-blue-400 shadow-sm">
                    <option>All Access</option>
                    <option>Private</option>
                    <option>Public</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 ml-1">Sort By</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <select className="w-full h-11 pl-3 pr-10 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 appearance-none outline-none focus:border-blue-400 shadow-sm">
                      <option>Date</option>
                      <option>Name</option>
                      <option>Size</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                  </div>
                  <button className="h-11 w-11 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 shadow-sm transition-all">
                    <ArrowDown size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">File Details</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Company</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getIcon(doc.ext)}
                      <div>
                        <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{doc.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.module}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{doc.company}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-600">{doc.size}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">{doc.date}</td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === doc.id ? null : doc.id)}
                      className="p-2 text-slate-400 hover:text-blue-600"
                    >
                      <MoreVertical size={18} />
                    </button>
                    <AnimatePresence>
                      {openMenuId === doc.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute right-6 top-10 w-44 bg-white rounded-xl shadow-sm border border-slate-100 z-20 py-1 overflow-hidden">
                            <button onClick={() => openEdit(doc)} className="w-full px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                              <Edit size={14} className="text-blue-500" /> Edit File
                            </button>
                            <button onClick={() => handleDownload(doc)} className="w-full px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                              <Download size={14} className="text-emerald-500" /> Download
                            </button>
                            <button onClick={() => handleDelete(doc.id)} className="w-full px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 flex items-center gap-3 border-t border-slate-50">
                              <Trash2 size={14} /> Delete
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- EDIT MODAL (Based on image_bc671b.png) --- */}
      <AnimatePresence>
        {showEditModal && editingFile && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEditModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
              
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-slate-800">Edit File Details</h2>
                <button onClick={() => setShowEditModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"><X size={20}/></button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-4 overflow-y-auto max-h-[80vh] no-scrollbar">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-600">File Name</label>
                  <input 
                    value={editingFile.name} 
                    onChange={(e) => setEditingFile({...editingFile, name: e.target.value})}
                    className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none transition-all" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-slate-600">Template Type</label>
                    <div className="relative">
                      <select 
                        value={editingFile.templateType}
                        onChange={(e) => setEditingFile({...editingFile, templateType: e.target.value})}
                        className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-sm appearance-none outline-none focus:border-blue-500">
                        <option>Choose Template Type</option>
                        <option>Appointment Letter</option>
                        <option>Offer Letter</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-slate-600">Access Type</label>
                    <div className="relative">
                      <select 
                        value={editingFile.access}
                        onChange={(e) => setEditingFile({...editingFile, access: e.target.value})}
                        className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-sm appearance-none outline-none focus:border-blue-500">
                        <option>Private</option>
                        <option>Public</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-600">Current Module</label>
                  <div className="relative">
                    <select 
                      value={editingFile.module}
                      onChange={(e) => setEditingFile({...editingFile, module: e.target.value})}
                      className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-sm appearance-none outline-none focus:border-blue-500">
                      <option>joining_documents</option>
                      <option>org_chart_manual</option>
                      <option>general_docs</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  </div>
                </div>

                {/* File Preview Box */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg border border-slate-100">
                    {getIcon(editingFile.ext)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">{editingFile.name}</p>
                    <p className="text-[10px] text-slate-400">{editingFile.size}</p>
                  </div>
                </div>

                {/* Upload Box */}
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <CloudUpload className="text-slate-400 group-hover:text-blue-500 mb-2" size={24} />
                  <p className="text-xs font-medium text-slate-600 text-center">Click to replace file or <span className="text-blue-500">browse</span></p>
                  <p className="text-[10px] text-slate-400 mt-1">DOCX, PDF, JPG or PNG (Max 10MB)</p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setShowEditModal(false)} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-all">Cancel</button>
                  <button type="submit" className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm shadow-blue-100 transition-all">Update File</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD NEW FILE MODAL (Standard) --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative w-full max-w-lg bg-white rounded-3xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tighter">Add New Document</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-all"><X size={20}/></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">File Name</label>
                  <input name="name" required value={formData.name} onChange={handleInputChange} placeholder="Ex: Invoice_May.pdf" className="w-full h-12 px-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-blue-500/10 text-sm font-bold border border-transparent focus:border-blue-100 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Extension</label>
                    <select name="ext" value={formData.ext} onChange={handleInputChange} className="w-full h-12 px-4 bg-slate-50 rounded-xl text-sm font-bold outline-none cursor-pointer border-transparent">
                      <option>PDF</option>
                      <option>JPG</option>
                      <option>DOCX</option>
                      <option>PNG</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Size</label>
                    <input name="size" required value={formData.size} onChange={handleInputChange} placeholder="2.5 MB" className="w-full h-12 px-4 bg-slate-50 rounded-xl text-sm font-bold outline-none border-transparent" />
                  </div>
                </div>

                <button type="submit" className="w-full h-14 bg-blue-600 text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-blue-700 shadow-sm shadow-blue-100 flex items-center justify-center gap-2 mt-4 active:scale-95 transition-all">
                  <Upload size={18} /> Upload Document
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Storage;
