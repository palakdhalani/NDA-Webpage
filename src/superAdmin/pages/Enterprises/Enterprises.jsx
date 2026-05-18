import React, { useState, useMemo } from 'react';
import {
  Search, Plus, MoreVertical, Edit, Download, Trash2, ChevronDown,
  ArrowUpDown, Building2, CheckCircle2, XCircle, ExternalLink, X,

  ArrowDown,
  ArrowUp,
  PowerOff,
  Power
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const initialCompanies = [
  { id: 1, name: 'test 2', admin: 'Bt', email: 'bt@gmail.com', plan: 'Silver', expiry: '20/07/2026', users: '0/10', status: 'Inactive', planColor: 'text-slate-500 bg-slate-100' },
  { id: 2, name: 'Super Engi-Tech Pvt. Ltd.', admin: 'Hr', email: 'hr@superengitech.com', plan: 'Gold', expiry: 'N/A', users: '0/10', status: 'Active', planColor: 'text-amber-600 bg-amber-50' },
  { id: 3, name: 'ABC', admin: 'Hr', email: 'hr@abc.com', plan: 'Silver', expiry: '19/05/2026', users: '0/10', status: 'Active', planColor: 'text-slate-500 bg-slate-100' },
  { id: 4, name: 'Manufacturing Works Pvt Ltd', admin: 'Admin', email: 'admin@manufacturingworks.com', plan: 'Platinum', expiry: '30/01/2028', users: '3/50', status: 'Active', planColor: 'text-indigo-600 bg-indigo-50' },
  { id: 5, name: 'Startup Innovations', admin: 'Admin', email: 'admin@startupinnovations.com', plan: 'Silver', expiry: '30/04/2026', users: '3/10', status: 'Active', planColor: 'text-slate-500 bg-slate-100' },
  { id: 6, name: 'Global Industries Ltd', admin: 'Admin', email: 'admin@globalindustries.com', plan: 'Silver', expiry: '29/07/2026', users: '4/10', status: 'Active', planColor: 'text-slate-500 bg-slate-100' },
  { id: 7, name: 'TechCorp Solutions', admin: 'Admin', email: 'admin@techcorp.com', plan: 'Platinum', expiry: '30/01/2027', users: '4/50', status: 'Active', planColor: 'text-indigo-600 bg-indigo-50' },
  { id: 8, name: 'Enterprise Systems', admin: 'Admin', email: 'admin@enterprisesystems.com', plan: 'Platinum', expiry: '30/01/2027', users: '3/50', status: 'Active', planColor: 'text-indigo-600 bg-indigo-50' },
];

const Enterprises = () => {
  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState(initialCompanies);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [planFilter, setPlanFilter] = useState('All Plans');
  const [sortBy, setSortBy] = useState('Created Date');

  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [sortDirection, setSortDirection] = useState('desc');

  const [formData, setFormData] = useState({
    name: '', admin: '', email: '', plan: 'Silver', status: 'Active'
  });

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Gold': return 'text-amber-600 bg-amber-50';
      case 'Platinum': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-slate-500 bg-slate-100';
    }
  };

  const filteredCompanies = useMemo(() => {
    let result = companyList
      .filter((company) => {
        const matchesSearch =
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.admin.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || company.status === statusFilter;
        const matchesPlan = planFilter === 'All Plans' || company.plan === planFilter;
        return matchesSearch && matchesStatus && matchesPlan;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'Enterprise Name') comparison = a.name.localeCompare(b.name);
        else if (sortBy === 'Plan Type') comparison = a.plan.localeCompare(b.plan);
        else if (sortBy === 'Created Date') comparison = a.id - b.id;

        return sortDirection === 'desc' ? -comparison : comparison;
      });

    return result.slice(0, parseInt(rowsPerPage));
  }, [companyList, searchQuery, statusFilter, planFilter, sortBy, rowsPerPage, sortDirection]);

  const toggleMenu = (id) => setOpenMenuId(openMenuId === id ? null : id);
  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { 
      id: Date.now(), 
      ...formData, 
      expiry: 'N/A', 
      users: '0/10', 
      storage: '0.00 GB',
      planColor: getPlanColor(formData.plan) 
    };
    setCompanyList([newEntry, ...companyList]);
    setShowModal(false);
    setFormData({ name: '', admin: '', email: '', plan: 'Silver', status: 'Active' });
    toast.success('Enterprise created successfully!');
  };

  const handleEditClick = (company) => { 
    setEditingCompany({ ...company }); 
    setOpenMenuId(null); 
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setCompanyList(prev => prev.map(c => c.id === editingCompany.id ? { ...editingCompany, planColor: getPlanColor(editingCompany.plan) } : c));
    setEditingCompany(null);
    toast.success('Enterprise updated successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete record?')) {
      setCompanyList(prev => prev.filter(c => c.id !== id));
      setOpenMenuId(null);
      toast.error('Record deleted.');
    }
  };

  const handleViewDashboard = (company) => {
    setOpenMenuId(null);
    navigate(`/superadmin/enterdashboard/${company.id}`, {
      state: { company: company }
    });
  };

  const toggleStatus = (company) => {
    const newStatus = company.status === 'Active' ? 'Inactive' : 'Active';
    setCompanyList(prev => prev.map(c =>
      c.id === company.id ? { ...c, status: newStatus } : c
    ));
    setOpenMenuId(null);
    toast.success(`Admin is now ${newStatus}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Company List</h1>
          <p className="text-xs md:text-sm font-medium text-slate-500">Manage all enterprise subscriptions.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg active:scale-95 transition-all"
        >
          <Plus size={18} /> <span className="whitespace-nowrap">Create New Company</span>
        </button>
      </div>

      {/* Filter Bar updated like image_bce31f.png */}
    <div className="bg-white p-3 md:p-5 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm">
  {/* Grid container: Mobile par 1 column, XL par 12 columns */}
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
    
    {/* Search Box: Mobile par full width, XL par 4 columns span karega */}
    <div className="xl:col-span-4 relative group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
      <input
        type="text"
        placeholder="Search company..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-11 pl-12 pr-4 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-blue-100 outline-none text-sm transition-all"
      />
    </div>

    {/* Filters Container: XL par 8 columns span karega. Mobile par auto-wrap hoga */}
    <div className="xl:col-span-8 flex flex-wrap lg:flex-nowrap items-center gap-2 md:gap-3">
      
      {/* Status Filter: Mobile par 50% width tak stretch hoga */}
      <div className="relative flex-1 min-w-[120px]">
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)} 
          className="w-full h-11 pl-3 pr-8 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 appearance-none outline-none border border-transparent focus:border-slate-200"
        >
          <option>All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
      </div>

      {/* Sort By Filter */}
      <div className="relative flex-1 min-w-[140px]">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          className="w-full h-11 pl-3 pr-8 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 appearance-none outline-none border border-transparent focus:border-slate-200"
        >
          <option value="Created Date">Sort: Date</option>
          <option value="Enterprise Name">Sort: Name</option>
          <option value="Plan Type">Sort: Plan</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
      </div>

      {/* Action Buttons Group: Sort Toggle aur Rows Per Page ko ek sath handle karne ke liye */}
      <div className="flex items-center gap-2 w-full lg:w-auto">
        {/* Sort Direction Toggle */}
        <button
          onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors shrink-0"
        >
          {sortDirection === 'desc' ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
        </button>

        {/* Per Page Dropdown: Blue Border Highlight */}
        <div className="relative flex-1 lg:flex-none lg:w-[130px]">
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="w-full h-11 pl-3 pr-8 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 appearance-none outline-none border-2 border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            <option value="5">5 Per Page</option>
            <option value="10">10 Per Page</option>
            <option value="20">20 Per Page</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={14} />
        </div>
      </div>

    </div>
  </div>
</div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise Name</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Subscription</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiry</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Capacity</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 border border-slate-100 shrink-0">
                        <Building2 size={18} />
                      </div>
                      <div className="min-w-0 truncate">
                        <p className="text-sm font-bold text-slate-900 truncate">{company.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">ENT-{company.id.toString().slice(-4)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 min-w-[180px]">
                    <p className="text-sm font-bold text-slate-700 truncate">{company.admin}</p>
                    <p className="text-[11px] text-slate-400 truncate">{company.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-black uppercase border border-current/10 ${company.planColor}`}>
                      {company.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-600 whitespace-nowrap">{company.expiry}</td>
                  <td className="px-6 py-4">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(parseInt(company.users.split('/')[0]) / (parseInt(company.users.split('/')[1]) || 1)) * 100}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400">{company.users}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase ${company.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                      {company.status === 'Active' ? <CheckCircle2 size={10} strokeWidth={3} /> : <XCircle size={10} strokeWidth={3} />} {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button onClick={() => toggleMenu(company.id)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all">
                      < MoreVertical size={18} />
                    </button>
                    <AnimatePresence>
                      {openMenuId === company.id && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-4 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 py-1.5 text-left">
                          <button onClick={() => handleEditClick(company)} className="w-full px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-all"><Edit size={14} /> Edit</button>
                          <button onClick={() => toggleStatus(company)} className={`w-full px-4 py-2.5 text-xs font-bold flex items-center gap-3 ${company.status === 'Active' ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}>
                            {company.status === 'Active' ? <PowerOff size={16} /> : <Power size={16} />} {company.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </button>
                        <button onClick={() => handleViewDashboard(company)} className="w-full px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 flex items-center gap-3 border-t border-slate-100 mt-1">
                            <ExternalLink size={14} /> Dashboard
                          </button>
                          <button onClick={() => handleDelete(company.id)} className="w-full px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 flex items-center gap-3"><Trash2 size={14} /> Delete</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals remain same as requested */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.15)] overflow-hidden border border-white"
            >
              <div className="px-8 pt-8 pb-6 flex justify-between items-center border-b border-slate-50">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Create Enterprise</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">New Subscription Setup</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
  {/* Company Name */}
  <div className="space-y-1">
    <label className="text-xs font-semibold text-slate-700">
      Company Name <span className="text-rose-500">*</span>
    </label>
    <input 
      type="text" 
      name="name" 
      value={formData.name} 
      onChange={handleInputChange} 
      placeholder="Add Name" 
      required 
      className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm" 
    />
  </div>

  {/* Email & Helper Subtext */}
  <div className="space-y-1">
    <label className="text-xs font-semibold text-slate-700">
      Email <span className="text-rose-500">*</span>
    </label>
    <input 
      type="email" 
      name="email" 
      value={formData.email} 
      onChange={handleInputChange} 
      placeholder="admin@gmail.com" 
      required 
      className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm" 
    />
    <p className="text-[11px] text-slate-400 font-medium tracking-normal mt-1 leading-relaxed">
      This email becomes the company admin login. Default password: Admin@123 (shown after create).
    </p>
  </div>

  {/* Phone Number */}
  <div className="space-y-1">
    <label className="text-xs font-semibold text-slate-700">
      Phone No. <span className="text-rose-500">*</span>
    </label>
    <div className="flex gap-2">
      <select className="w-20 h-10 px-2 border border-slate-200 rounded-lg text-sm bg-white outline-none">
        <option>+91</option>
      </select>
      <input 
        type="text" 
        name="phone"
        value={formData.phone || ''}
        onChange={handleInputChange}
        placeholder="978762453" 
        required 
        className="flex-1 h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm" 
      />
    </div>
  </div>

  {/* Company Address */}
  <div className="space-y-1">
    <label className="text-xs font-semibold text-slate-700">
      Company Address <span className="text-rose-500">*</span>
    </label>
    <input 
      type="text" 
      name="address" 
      value={formData.address || ''} 
      onChange={handleInputChange} 
      placeholder="Add Address" 
      required 
      className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm" 
    />
  </div>

  {/* Max Users & Subtext */}
  <div className="space-y-1">
    <label className="text-xs font-semibold text-slate-700">
      Max Users (User Limit)
    </label>
    <input 
      type="number" 
      name="maxUsers" 
      value={formData.maxUsers || ''} 
      onChange={handleInputChange} 
      placeholder="10" 
      className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm" 
    />
    <p className="text-[11px] text-slate-400 font-medium tracking-normal mt-1 leading-relaxed">
      Leave empty to use plan defaults (Silver: 10, Platinum: 50).
    </p>
  </div>

  {/* Form Action Controls */}
  <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
    <button 
      type="button" 
      onClick={() => setShowModal(false)} 
      className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
    >
      Cancel
    </button>
    <button 
      type="submit" 
      className="px-6 py-2 bg-[#0085db] text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
    >
      Create Company
    </button>
  </div>
</form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingCompany && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingCompany(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.15)] overflow-hidden border border-white">
              <div className="px-8 pt-8 pb-6 flex justify-between items-center border-b border-slate-50">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Edit Enterprise</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Update Subscription Details</p>
                </div>
                <button onClick={() => setEditingCompany(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Company Name</label>
                  <input
                    type="text"
                    value={editingCompany.name}
                    onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Admin Email</label>
                  <input
                    type="email"
                    value={editingCompany.email}
                    onChange={(e) => setEditingCompany({ ...editingCompany, email: e.target.value })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Plan</label>
                    <select
                      value={editingCompany.plan}
                      onChange={(e) => setEditingCompany({ ...editingCompany, plan: e.target.value })}
                      className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm"
                    >
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Status</label>
                    <select
                      value={editingCompany.status}
                      onChange={(e) => setEditingCompany({ ...editingCompany, status: e.target.value })}
                      className="w-full h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingCompany(null)} className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-[#0085db] text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">Update Company</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Enterprises;