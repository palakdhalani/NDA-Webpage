import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Edit, Trash2, Shield,  Gem, CreditCard, X, ChevronDown,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialPlans = [
  { id: 1, name: 'TRY PLAN', price: '1.00', duration: '3 months', type: 'Trial', status: 'Active' },
  { id: 2, name: 'SILVER PLAN', price: '1799.99', duration: '12 months', type: 'Silver', status: 'Active' },
  { id: 3, name: 'GOLD PLAN', price: '2199.99', duration: '6 months', type: 'Gold', status: 'Active' },
  { id: 4, name: 'GOLD PLAN', price: '399.99', duration: 'monthly', type: 'Gold', status: 'Active' },
  { id: 5, name: 'SILVER PLAN', price: '999.99', duration: '6 months', type: 'Silver', status: 'Active' },
  { id: 6, name: 'PLATINUM PLAN', price: '1599.99', duration: '6 months', type: 'Platinum', status: 'Active' },
];

const Plans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Plans');
  const [durationFilter, setDurationFilter] = useState('All Durations');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', duration: 'monthly', status: 'Active'
  });

  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            plan.price.includes(searchTerm);
      const matchesType = typeFilter === 'All Plans' || plan.type === typeFilter;
      const matchesDuration = durationFilter === 'All Durations' || 
                               plan.duration.toLowerCase() === durationFilter.toLowerCase();
      return matchesSearch && matchesType && matchesDuration;
    });
  }, [plans, searchTerm, typeFilter, durationFilter]);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const handleOpenModal = (plan = null) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({ name: plan.name, price: plan.price, duration: plan.duration, status: plan.status });
    } else {
      setEditingPlan(null);
      setFormData({ name: '', price: '', duration: 'monthly', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...formData } : p));
    } else {
      const newPlan = {
        id: Date.now(),
        ...formData,
        type: formData.name.toUpperCase().includes('GOLD') ? 'Gold' : formData.name.toUpperCase().includes('SILVER') ? 'Silver' : 'Platinum'
      };
      setPlans([newPlan, ...plans]);
    }
    setIsModalOpen(false);
  };

  const getTierIcon = (type) => {
    switch (type) {
      case 'Silver': return <Shield size={18} className="text-slate-400" />;
      case 'Gold': return <Crown size={18} className="text-amber-500" />;
      case 'Platinum': return <Gem size={18} className="text-indigo-500" />;
      default: return <CreditCard size={18} className="text-slate-400" />;
    }
  };

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Responsive Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Subscription & Plan</h1>
            <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">Manage pricing models and tiers.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-sm active:scale-95 transition-transform"
          >
            <Plus size={18} /> Create New Plan
          </button>
        </div>

        {/* Responsive Filter Bar */}
        <div className="bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border-none text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Search plans or prices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-3 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
            <div className="relative flex-1 sm:flex-none">
              <select 
                className="w-full sm:w-40 appearance-none bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold outline-none cursor-pointer border border-transparent hover:border-slate-200 transition-all"
                value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option>All Plans</option>
                <option>Silver</option><option>Gold</option><option>Platinum</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative flex-1 sm:flex-none">
              <select 
                className="w-full sm:w-44 appearance-none bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold outline-none cursor-pointer border border-transparent hover:border-slate-200 transition-all"
                value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)}
              >
                <option>All Durations</option>
                <option>Monthly</option><option>3 Months</option><option>6 Months</option><option>12 Months</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredPlans.map((plan) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={plan.id} 
                className="bg-white p-6 md:p-8 lg:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-sm transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">{getTierIcon(plan.type)}</div>
                    <h3 className="text-[10px] md:text-xs font-bold text-slate-900 uppercase tracking-widest">{plan.name}</h3>
                  </div>
                  <div className="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => handleOpenModal(plan)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(plan.id)} className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                </div>
                
                <div className="flex items-baseline flex-wrap gap-1">
                  <span className="text-xl md:text-2xl font-bold text-slate-900">₹{plan.price}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ {plan.duration}</span>
                </div>

                {/* <div className={`absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 sm:mt-4 inline-flex px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter ${plan.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {plan.status}
                </div> */}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Responsive Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ y: "100%", opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: "100%", opacity: 0 }} 
                className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-sm overflow-hidden max-h-[95vh] flex flex-col"
              >
                <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-white sticky top-0 z-10">
                  <h2 className="text-lg font-bold text-slate-800">{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                    <X className="text-slate-400" size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Plan name</label>
                    <input 
                      required
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium"
                      placeholder="e.g. GOLD MONTHLY"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pricing Amount</label>
                    <div className="flex gap-2">
                      <div className="relative">
                        <select className="h-12 pl-4 pr-8 rounded-xl border border-slate-200 bg-slate-50 appearance-none font-bold text-sm outline-none">
                          <option>INR</option>
                          <option>USD</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                      <input 
                        required
                        type="number"
                        step="0.01"
                        className="flex-1 h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all font-bold"
                        placeholder="0.00"
                        value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Plan Duration</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['monthly', '1 Month', '3 Months', '6 Months', '12 Months'].map(time => (
                        <label key={time} className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${formData.duration === time ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/10' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                          <input type="radio" name="duration" className="hidden" checked={formData.duration === time} onChange={() => setFormData({...formData, duration: time})} />
                          <span className="text-xs font-bold capitalize">{time}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, status: formData.status === 'Active' ? 'Inactive' : 'Active'})}
                      className={`w-10 h-6 rounded-full transition-colors relative ${formData.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.status === 'Active' ? 'left-5' : 'left-1'}`} />
                    </button>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Plan is {formData.status}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="order-2 sm:order-1 px-6 py-3 border rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors text-sm">Cancel</button>
                    <button type="submit" className="order-1 sm:order-2 px-6 py-3 bg-[#0087D1] text-white rounded-xl font-bold hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all text-sm">
                      {editingPlan ? 'Save Changes' : 'Create New Plan'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Plans;
