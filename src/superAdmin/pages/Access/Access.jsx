import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  UserPlus, 
  X,
  Power,
  PowerOff,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const initialAdmins = [
  { id: 1, email: 'bt@gmail.com', mobile: '7717750136', role: 'Admin', company: 'test 2', status: 'Active', created: '20/04/2026' },
  { id: 2, email: 'hr@superengitech.com', mobile: '9909022062', role: 'Admin', company: 'Super Engi-Tech Pvt. Ltd.', status: 'Active', created: '20/04/2026' },
  { id: 3, email: 'hr@abc.com', mobile: '1234567890', role: 'Admin', company: 'ABC', status: 'Active', created: '19/04/2026' },
  { id: 4, email: 'admin@startupinnovations.com', mobile: 'N/A', role: 'Admin', company: 'Startup Innovations', status: 'Active', created: '30/01/2026' },
  { id: 5, email: 'admin@enterprisesystems.com', mobile: 'N/A', role: 'Admin', company: 'Enterprise Systems', status: 'Active', created: '30/01/2026' },
  { id: 6, email: 'admin@techcorp.com', mobile: '736798984', role: 'Admin', company: 'TechCorp Solutions', status: 'Active', created: '30/01/2026' },
  { id: 7, email: 'admin@manufacturingworks.com', mobile: 'N/A', role: 'Admin', company: 'Manufacturing Works Pvt Ltd', status: 'Active', created: '30/01/2026' },
  { id: 8, email: 'admin@globalindustries.com', mobile: '99', role: 'Admin', company: 'Global Industries Ltd', status: 'Active', created: '30/01/2026' },
];

const Access = () => {
  const [adminList, setAdminList] = useState(initialAdmins);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  // --- Filter, Sort & Pagination States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [companyFilter, setCompanyFilter] = useState('All Companies');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortBy, setSortBy] = useState('Created Date');
  const [itemsPerPage, setItemsPerPage] = useState(10); // Page Sort Filter
  const [currentPage, setCurrentPage] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    email: '', mobile: '', role: 'Admin', company: 'TechCorp Solutions', status: 'Active'
  });

  // --- Filtering & Sorting Logic ---
  const filteredAdmins = useMemo(() => {
    let result = adminList.filter((admin) => {
      const matchesSearch = 
        admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.mobile.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCompany = companyFilter === 'All Companies' || admin.company === companyFilter;
      const matchesStatus = statusFilter === 'All Status' || admin.status === statusFilter;

      return matchesSearch && matchesCompany && matchesStatus;
    });

    result.sort((a, b) => {
      if (sortBy === 'Email Address') return a.email.localeCompare(b.email);
      if (sortBy === 'Created Date') return new Date(b.created) - new Date(a.created);
      return 0;
    });

    return result;
  }, [adminList, searchQuery, companyFilter, statusFilter, sortBy]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);

  const toggleMenu = (id) => setOpenMenuId(openMenuId === id ? null : id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAdmin = {
      id: Date.now(),
      ...formData,
      created: new Date().toLocaleDateString('en-GB'),
    };
    setAdminList([newAdmin, ...adminList]);
    setShowModal(false);
    setFormData({ email: '', mobile: '', role: 'Admin', company: 'TechCorp Solutions', status: 'Active' });
    toast.success('Admin access granted successfully!');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setAdminList(prev => prev.map(a => a.id === editingAdmin.id ? editingAdmin : a));
    setEditingAdmin(null);
    toast.success('Admin updated successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to revoke this access?')) {
      setAdminList(prev => prev.filter(a => a.id !== id));
      setOpenMenuId(null);
      toast.error('Access revoked.');
    }
  };

  const toggleStatus = (admin) => {
    const newStatus = admin.status === 'Active' ? 'Inactive' : 'Active';
    setAdminList(prev => prev.map(a => 
      a.id === admin.id ? { ...a, status: newStatus } : a
    ));
    setOpenMenuId(null);
    toast.success(`Admin is now ${newStatus}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admins</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage administrative access and roles.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md"
        >
          <UserPlus size={18} /> Create New Admin
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-md space-y-5">
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600" size={18} />
            <input 
              type="text" 
              placeholder="Search by email or mobile..." 
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
              className="w-full h-11 pl-12 pr-4 bg-slate-50/50 rounded-xl border border-transparent focus:bg-white focus:border-blue-100 outline-none text-sm font-medium transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Page Sort Filter */}
            <div className="flex items-center gap-2 bg-slate-50/50 px-3 rounded-xl border border-transparent">
               <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Per Page :</span>
               <select 
                value={itemsPerPage}
                onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}
                className="h-11 bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <select 
              value={companyFilter}
              onChange={(e) => {setCompanyFilter(e.target.value); setCurrentPage(1);}}
              className="h-11 px-4 bg-slate-50/50 rounded-xl border border-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer"
            >
              <option>All Companies</option>
              {[...new Set(adminList.map(a => a.company))].map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select 
              value={statusFilter}
              onChange={(e) => {setStatusFilter(e.target.value); setCurrentPage(1);}}
              className="h-11 px-4 bg-slate-50/50 rounded-xl border border-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer"
            >
              <option>All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select 
              value={sortBy}
              onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}}
              className="h-11 px-4 bg-slate-50/50 rounded-xl border border-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer"
            >
              <option value="Created Date">Sort by: Date</option>
              <option value="Email Address">Sort by: Email</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mobile</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Company</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Created</th>
                <th className="px-8 py-5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentItems.map((admin) => (
                <tr key={admin.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 text-[10px] font-bold uppercase">
                        {admin.email.substring(0, 2)}
                      </div>
                      <p className="text-sm font-bold text-slate-800">{admin.email}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-medium">{admin.mobile}</td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-tight border border-blue-100">
                      <ShieldCheck size={10} strokeWidth={3} /> {admin.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">{admin.company}</td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight border ${admin.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                      {admin.status === 'Active' ? <CheckCircle2 size={10} /> : <XCircle size={10} />} {admin.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">{admin.created}</td>
                  <td className="px-8 py-6 text-right relative">
                    <button onClick={() => toggleMenu(admin.id)} className="p-2 text-slate-400 hover:text-blue-600 transition-all"><MoreVertical size={18} /></button>
                    <AnimatePresence>
                      {openMenuId === admin.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-8 top-12 w-48 bg-white rounded-2xl shadow-md border border-slate-100 z-20 py-2 overflow-hidden text-left">
                            <button onClick={() => { setEditingAdmin(admin); setOpenMenuId(null); }} className="w-full px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                              <Edit size={16} className="text-slate-400" /> Edit Details
                            </button>
                            <button onClick={() => toggleStatus(admin)} className={`w-full px-4 py-2.5 text-xs font-bold flex items-center gap-3 ${admin.status === 'Active' ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}>
                              {admin.status === 'Active' ? <PowerOff size={16} /> : <Power size={16} />} {admin.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button onClick={() => handleDelete(admin.id)} className="w-full px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 flex items-center gap-3">
                              <Trash2 size={16} /> Revoke Access
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
          {filteredAdmins.length === 0 && <div className="p-10 text-center text-slate-400 font-bold">No admins found.</div>}
        </div>

        {/* Pagination Footer */}
        {filteredAdmins.length > 0 && (
          <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-slate-500">
              Showing <span className="text-blue-600">{indexOfFirstItem + 1}</span> to <span className="text-blue-600">{Math.min(indexOfLastItem, filteredAdmins.length)}</span> of {filteredAdmins.length} Admins
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'bg-white border border-slate-200 text-slate-400 hover:border-blue-200 hover:text-blue-600'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- Create Modal --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
              <div className="px-6 py-5 flex justify-between items-center border-b border-slate-100">
                <h2 className="text-xl font-bold text-[#001D3D]">Create New Admin</h2>
                <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600 transition-colors"><X size={22} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="user@example.com" required className="w-full h-11 px-4 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Password <span className="text-red-500">*</span></label>
                  <input type="password" name="password" placeholder="Enter password (min 6 characters)" required className="w-full h-11 px-4 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Mobile Number (Optional)</label>
                  <div className="flex gap-2">
                    <div className="relative w-24 shrink-0">
                      <select className="w-full h-11 pl-3 pr-8 border border-slate-300 rounded-md bg-white appearance-none cursor-pointer outline-none focus:border-blue-500">
                        <option>+91</option><option>+1</option><option>+44</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="978762453" className="flex-1 h-11 px-4 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Company (Optional)</label>
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Search company by name, email or mobile..." className="w-full h-11 pl-10 pr-4 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700" />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">Leave empty to create admin without company. You can link it later when creating a company.</p>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="px-8 h-11 text-sm font-semibold text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">Cancel</button>
                  <button type="submit" className="px-8 h-11 text-sm font-semibold text-white bg-[#0081C9] rounded-md hover:bg-[#0070AF] transition-colors shadow-md">Create Admin</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Edit Modal --- */}
      <AnimatePresence>
        {editingAdmin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingAdmin(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-lg bg-white rounded-xl shadow-md overflow-hidden text-slate-700">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
                <h2 className="text-xl font-semibold text-slate-800">Edit User</h2>
                <button onClick={() => setEditingAdmin(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600">Email <span className="text-red-500">*</span></label>
                  <input type="email" value={editingAdmin.email} onChange={(e) => setEditingAdmin({...editingAdmin, email: e.target.value})} className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600">Mobile Number (Optional)</label>
                  <div className="flex gap-2">
                    <div className="relative min-w-[80px]">
                      <select className="w-full h-11 pl-3 pr-8 border border-slate-300 rounded-lg appearance-none bg-white outline-none"><option>+91</option><option>+1</option></select>
                      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <input type="text" value={editingAdmin.mobile} onChange={(e) => setEditingAdmin({...editingAdmin, mobile: e.target.value})} className="flex-1 h-11 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600">Role <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-6 mt-1">
                    {['Admin', 'User'].map(role => (
                      <label key={role} className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="role" checked={editingAdmin.role === role} onChange={() => setEditingAdmin({...editingAdmin, role: role})} className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" />
                        <span className="text-sm font-medium text-slate-700">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600">Company <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={editingAdmin.company} onChange={(e) => setEditingAdmin({...editingAdmin, company: e.target.value})} className="w-full h-11 pl-4 pr-10 border border-slate-300 rounded-lg appearance-none bg-white outline-none focus:border-blue-500">
                      <option value="test 2">test 2</option><option value="Super Engi-Tech Pvt. Ltd.">Super Engi-Tech Pvt. Ltd.</option><option value="ABC">ABC</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <button type="button" onClick={() => setEditingAdmin(null)} className="px-6 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-[#0085db] text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-shadow-md shadow-md">Update User</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Access;
