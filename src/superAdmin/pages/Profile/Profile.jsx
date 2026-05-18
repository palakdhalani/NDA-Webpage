import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  ShieldCheck, 
  Lock, 
  Edit, 
  Shield,
  Clock,
  ChevronRight,
  Camera,
  X,
  Save,
  User
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.getItem('user_email') || 'superadmin@hrms.com',
    phone: localStorage.getItem('user_phone') || '',
    name: localStorage.getItem('user_name') || 'Super Admin'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem('user_photo') || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop"
  );

  const handleToggleModal = () => setIsEditModalOpen(!isEditModalOpen);
  const handleTogglePasswordModal = () => setIsPasswordModalOpen(!isPasswordModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        try {
          localStorage.setItem('user_photo', reader.result);
          window.dispatchEvent(new Event('profile_photo_updated'));
          toast.success('Profile photo updated successfully');
        } catch (err) {
          toast.success('Profile photo updated for this session');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user_name', formData.name);
    localStorage.setItem('user_email', formData.email);
    localStorage.setItem('user_phone', formData.phone);
    setIsEditModalOpen(false);
    toast.success('Profile updated successfully');
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    // Simulate password change
    setIsPasswordModalOpen(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.success('Password changed successfully');
  };

  return (
    <div className="relative space-y-6 pb-12 animate-in fade-in duration-500 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Edit Details Modal - Fully Responsive */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={handleToggleModal}
          />
          
          <div className="relative w-full max-w-lg bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-5 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Edit Profile</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Update System Credentials</p>
                </div>
                <button onClick={handleToggleModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={12} className="text-blue-500" /> Full Name
                  </label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12} className="text-blue-500" /> Email Address
                  </label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={12} className="text-blue-500" /> Mobile Number
                  </label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button type="button" onClick={handleToggleModal} className="order-2 sm:order-1 flex-1 px-6 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">
                    Cancel
                  </button>
                  <button type="submit" className="order-1 sm:order-2 flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={handleTogglePasswordModal}
          />
          
          <div className="relative w-full max-w-lg bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-5 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Change Password</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Update Security Credentials</p>
                </div>
                <button onClick={handleTogglePasswordModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handlePasswordSave} className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Lock size={12} className="text-blue-500" /> Current Password
                  </label>
                  <input 
                    type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={12} className="text-blue-500" /> New Password
                  </label>
                  <input 
                    type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={12} className="text-blue-500" /> Confirm New Password
                  </label>
                  <input 
                    type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button type="button" onClick={handleTogglePasswordModal} className="order-2 sm:order-1 flex-1 px-6 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">
                    Cancel
                  </button>
                  <button type="submit" className="order-1 sm:order-2 flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    <Save size={16} /> Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2">
        <div className="w-full sm:w-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Profile Settings</h1>
          <p className="text-xs md:text-sm font-medium text-slate-500 mt-1 max-w-md">
            Manage your personal information, security preferences, and account status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 md:p-10">
            {/* Inner Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
              <h2 className="text-sm md:text-base font-bold text-slate-900 uppercase tracking-widest">
                Personal Information
              </h2>
              <button 
                onClick={handleToggleModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all border border-blue-100"
              >
                <Edit size={14} /> Edit Details
              </button>
            </div>

            {/* Layout Container */}
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center lg:items-start">
              {/* Avatar Section */}
              <div className="relative group shrink-0">
                <label className="cursor-pointer block">
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-[2rem] bg-slate-50 border-4 border-white shadow-sm flex items-center justify-center overflow-hidden relative">
                    <img 
                      src={profilePhoto} 
                      alt="Avatar" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Camera size={24} />
                    </div>
                  </div>
                </label>
                <div className="absolute -bottom-1 -right-1 p-2 bg-white rounded-xl shadow-sm border border-slate-50 text-emerald-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" />
                </div>
              </div>

              {/* Data Grid - Fix for 774px & below */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6 md:gap-y-10 text-center sm:text-left">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                    <User size={12} className="text-blue-500" /> Full Name
                  </p>
                  <p className="text-sm font-bold text-slate-800 break-all">{formData.name}</p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                    <Mail size={12} className="text-blue-500" /> Email Address
                  </p>
                  <p className="text-sm font-bold text-slate-800 break-all">{formData.email}</p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                    <Phone size={12} className="text-blue-500" /> Mobile Number
                  </p>
                  <p className={`text-sm font-bold ${formData.phone ? 'text-slate-800' : 'text-slate-300 italic'}`}>
                    {formData.phone || 'Not provided'}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                    <Shield size={12} className="text-blue-500" /> Account Role
                  </p>
                  <div className="flex justify-center sm:justify-start">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest">
                      Superadmin
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                    <Clock size={12} className="text-blue-500" /> Member Since
                  </p>
                  <p className="text-sm font-bold text-slate-800">Jan 30, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Card - Fully Optimized */}
       <div className="bg-blue-600 rounded-[1.5rem] md:rounded-[2rem] shadow-sm shadow-blue-100 overflow-hidden group relative">
  {/* Glassmorphism Background Decor */}
  <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
  
  {/* Main Content Container */}
  <div className="p-6 md:p-10 flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
    
    {/* Left Side: Icon & Text */}
    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 md:gap-6 w-full lg:w-auto">
      {/* Icon Wrapper */}
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-sm shrink-0">
        <Lock size={24} />
      </div>
      
      {/* Text Info */}
      <div className="space-y-1">
        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
          Security & Privacy
        </h3>
        <p className="text-xs md:text-sm font-medium text-blue-100 mt-1 max-w-xs mx-auto sm:mx-0">
          Manage your account credentials and security authentication.
        </p>
      </div>
    </div>
    
    {/* Right Side: Button */}
    {/* md:w-auto aur lg:shrink-0 ensures it doesn't squash on tablet sizes like 774px */}
    <button onClick={handleTogglePasswordModal} className="w-full sm:w-auto lg:w-auto px-6 py-4 bg-white text-blue-600 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-3 active:scale-95 shrink-0">
      <ShieldCheck size={18} /> 
      <span>Change Password</span> 
      <ChevronRight size={16} />
    </button>
  </div>

  {/* Footer Bar */}
  <div className="px-6 md:px-10 py-4 bg-black/10 border-t border-white/5 relative z-10">
    <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest text-center sm:text-left">
      Last security audit: 45 days ago
    </p>
  </div>
</div>
      </div>
    </div>
  );
};

export default Profile;
