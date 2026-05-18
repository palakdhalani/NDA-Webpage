import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MoreVertical,
  Download,
  Plus,
  ChevronDown,
  ChevronLeft,
  Bell,
  Settings,
  Users,
  Users2,
  QrCode,
  Trash2,
  Pencil,
  FileText,
  RotateCw,
  ArrowLeft,
  X,
  Calendar
} from 'lucide-react';
import OfferLetterDOCXModal from './components/OfferLetterDOCXModal';
import StatusChangeModal from './components/StatusChangeModal';
import QRCodeModal from './components/QRCodeModal';
import AddWorker from './components/AddWorker';
import CustomSelect from '../../components/ui/CustomSelect';
import * as XLSX from 'xlsx';







const Worker = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All years');
  const [selectedMonth, setSelectedMonth] = useState('All months');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedType, setSelectedType] = useState('All types');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isOfferDOCXModalOpen, setIsOfferDOCXModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAddingWorker, setIsAddingWorker] = useState(false);





  const [workers, setWorkers] = useState([
    { id: 1, name: 'Sample Employee', email: 'sample@example.com', dept: 'Production', role: 'Operator', lastLogin: '21/04/2026', status: 'Pending' },
    { id: 2, name: 'FDF', email: 'N/A', dept: 'FD', role: 'DFD', lastLogin: '10/04/2026', status: 'Pending' },
    { id: 3, name: 'dev woker', email: 'rajatsinha5467@gmail.com', dept: 'test', role: 'test', lastLogin: '18/04/2026', status: 'Active' },
    { id: 4, name: 'Abc', email: 'ajitvadher95@gmail.com', dept: 'House keeping', role: 'Tttt', lastLogin: '08/02/2026', status: 'Left' },
    { id: 5, name: 'Ramanuj', email: 'test@gmail.com', dept: 'director', role: 'dev', lastLogin: '31/03/2026', status: 'Left' },
  ]);


  const inquiries = [
    { date: '14 Mar 2026', name: 'Ronak', role: 'Operator', mobile: '9537565656', type: 'Gujarati' },
    { date: '14 Mar 2026', name: 'Shankar', role: 'Helper', mobile: '9909022062', type: 'Non Gujarati' },
    { date: '13 Mar 2026', name: 'test', role: 'test', mobile: '7367989866', type: 'Non Gujarati' },
  ];

  const tabs = ['All', 'Pending', 'Active', 'Inquiries'];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Left': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const handleDownload = (worker, type) => {
    const filename = `${worker.name.replace(/\s+/g, '_')}_${type}.${type === 'pdf' ? 'pdf' : 'csv'}`;
    const content = type === 'pdf'
      ? `Interview Form for ${worker.name}\nDept: ${worker.dept}\nRole: ${worker.role}`
      : `Name,Email,Dept,Role,Last Login,Status\n${worker.name},${worker.email},${worker.dept},${worker.role},${worker.lastLogin},${worker.status}`;

    const blob = new Blob([content], { type: type === 'pdf' ? 'application/pdf' : 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenMenuId(null);
  };

  const handleDelete = (worker) => {
    if (window.confirm(`Are you sure you want to delete ${worker.name}?`)) {
      setWorkers(workers.filter(w => w.id !== worker.id));
      setOpenMenuId(null);
    }
  };

  const handleStatusChange = (worker, newStatus) => {
    setWorkers(workers.map(w => w.id === worker.id ? { ...w, status: newStatus } : w));
    setIsStatusModalOpen(false);
    setSelectedWorker(null);
  };

  const handleDownloadExcel = () => {
    const header = [
      ["TechCorp Solutions"],
      ["123 Tech Park, Sector 5, Noida, Uttar Pradesh - 201301"],
      ["Worker Database (All)"],
      [
        "Sr. No.", "Interview Date", "Employee Name", "Gender", "Department", "Designation",
        "Date of Birth", "Mobile No.", "E-Mail Address", "Present Address", "Permanent Address",
        "Qualification", "Current Company", "Current Salary", "Previous Company", "Previous Salary",
        "Expected Salary", "Joining Date", "Aadhar No.", "PAN No.", "Bank Name", "Account No.",
        "IFSC Code", "Status"
      ]
    ];

    const dataRows = workers.map((worker, index) => [
      index + 1,
      "N/A", // Interview Date
      worker.name,
      "N/A", // Gender
      worker.dept,
      worker.role,
      "N/A", // DOB
      "9876543210", // Mobile
      worker.email,
      "Present address, city", // Present Address
      "Permanent address, city", // Permanent Address
      "ITI", // Qualification
      "-", // Current Company
      "-", // Current Salary
      "-", // Previous Company
      "-", // Previous Salary
      "-", // Expected Salary
      worker.lastLogin, // Joining Date
      "", // Aadhar
      "", // PAN
      "", // Bank
      "", // Account
      "", // IFSC
      worker.status
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([...header, ...dataRows]);

    // Merging headers
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 23 } }, // Company Name
      { s: { r: 1, c: 0 }, e: { r: 1, c: 23 } }, // Address
      { s: { r: 2, c: 0 }, e: { r: 2, c: 23 } }  // Database Title
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Workers");
    XLSX.writeFile(workbook, "Worker_Database.xlsx");
  };



  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const monthMap = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };

  const filteredWorkers = React.useMemo(() => {
    return workers.filter(worker => {
      if (activeTab !== 'All' && activeTab !== 'Inquiries') {
        if (worker.status !== activeTab) return false;
      }
      const searchLower = searchQuery.toLowerCase();
      if (!worker.name.toLowerCase().includes(searchLower) && !worker.email.toLowerCase().includes(searchLower) && !worker.dept.toLowerCase().includes(searchLower)) return false;
      if (selectedYear !== 'All years' && !worker.lastLogin.includes(selectedYear)) return false;
      if (selectedMonth !== 'All months' && worker.lastLogin.split('/')[1] !== monthMap[selectedMonth]) return false;
      if (selectedDept !== 'All Departments' && worker.dept !== selectedDept) return false;
      return true;
    });
  }, [workers, activeTab, searchQuery, selectedYear, selectedMonth, selectedDept]);

  const filteredInquiries = React.useMemo(() => {
    return inquiries.filter(inq => {
      if (selectedYear !== 'All years' && !inq.date.includes(selectedYear)) return false;
      if (selectedType !== 'All types' && inq.type !== selectedType) return false;
      return true;
    });
  }, [selectedYear, selectedType]);

  const renderOfferModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOfferModalOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[1.5rem] shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Add Offer Detail</h2>
          <button onClick={() => setIsOfferModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Offer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Department <span className="text-red-500">*</span></label>
                <CustomSelect
                  options={['Production', 'Account', 'Dispatch', 'HR', 'Purchase', 'Test']}
                  value="Production"
                  className="w-full"
                />

              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Designation <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="Operator" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Offered Salary (₹) <span className="text-red-500">*</span></label>
                <input type="number" defaultValue="0" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Reporting To <span className="text-red-500">*</span></label>
                <CustomSelect
                  options={[
                    'Select reporting person',
                    'Mr. Vimal Patel (User)',
                    'testing (User)',
                    'user2@techcorp.com (User)',
                    'user3@techcorp.com (User)',
                    'user4@techcorp.com (User)',
                    'rajat (User)',
                    'Mr. Piyush Patel (User)',
                    'Mr. Sachin Morjariya (User)',
                    'Panth Patel (User)',
                    'Prince Sherasiya - Bac (Account)',
                    'Jayesh m karavadara - DFD (Account)',
                    'Sample Employee - DFD (Account)',
                    'Sample Employee - Operator (Production)',
                    'rajat Kumar Sinha - DFD (Account)',
                    'Ramanuj - dev (Account)',
                    'Jayesh m karavadara - Safety Officer (HR)'
                  ]}
                  value="Select reporting person"
                  className="w-full"
                />

              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Probation Period (Months) <span className="text-red-500">*</span></label>
                <input type="number" defaultValue="3" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Notice Period (Months) <span className="text-red-500">*</span></label>
                <input type="number" defaultValue="3" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Skill Category <span className="text-red-500">*</span></label>
                <CustomSelect
                  options={[
                    'Select skill category',
                    'Skill',
                    'Semi-Skill',
                    'Un-Skill',
                    'High Skill'
                  ]}
                  value="Select skill category"
                  className="w-full"
                />

              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Duty Time <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. 9:30 AM to 6:30 PM" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date of Joining <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="date" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={() => setIsOfferModalOpen(false)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button onClick={() => setIsOfferModalOpen(false)} className="px-6 py-2.5 bg-[#0066cc] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            Add Offer Detail
          </button>
        </div>
      </motion.div>
    </div>
  );

  const renderWorkerDetails = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setSelectedWorker(null)} className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Worker Details</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-sm"><FileText size={16} className="text-gray-400" /> Interview form (PDF)</button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-sm"><RotateCw size={16} className="text-gray-400" /> Change Status</button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0066cc] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"><Pencil size={16} /> Edit</button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-12">
        <section className="space-y-8">
          <div className="flex items-center gap-4"><div className="h-8 w-1 bg-blue-600 rounded-full" /><h2 className="text-lg font-bold text-gray-900 tracking-tight">Basic Information</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Worker's Name</p><p className="text-sm font-bold text-gray-800">{selectedWorker.name}</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Interview Date</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email ID</p><p className="text-sm font-bold text-gray-800">{selectedWorker.email}</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Education</p><p className="text-sm font-bold text-gray-800">ITI</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Department</p><p className="text-sm font-bold text-gray-800">{selectedWorker.dept}</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Designation</p><p className="text-sm font-bold text-gray-800">{selectedWorker.role}</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone No.</p><p className="text-sm font-bold text-gray-800">9876543210</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Work Type</p><p className="text-sm font-bold text-gray-800">Fitter</p></div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4"><div className="h-8 w-1 bg-blue-600 rounded-full" /><h2 className="text-lg font-bold text-gray-900 tracking-tight">Present Address</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pin Code</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1 md:col-span-2"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address</p><p className="text-sm font-bold text-gray-800">Present address, city</p></div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4"><div className="h-8 w-1 bg-blue-600 rounded-full" /><h2 className="text-lg font-bold text-gray-900 tracking-tight">Permanent Address</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pin Code</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1 md:col-span-2"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address</p><p className="text-sm font-bold text-gray-800">Present address, city</p></div>
          </div>
        </section>

        <section className="space-y-8 pb-8">
          <div className="flex items-center gap-4"><div className="h-8 w-1 bg-blue-600 rounded-full" /><h2 className="text-lg font-bold text-gray-900 tracking-tight">Personal & Employment</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date of Birth</p><p className="text-sm font-bold text-gray-800">15/01/1998</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mother Tongue</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expected Date of Joining</p><p className="text-sm font-bold text-gray-800">01/05/2026</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Experience</p><p className="text-sm font-bold text-gray-800">2 years</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Salary</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expected Salary</p><p className="text-sm font-bold text-gray-800">N/A</p></div>
            <div className="space-y-1"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</p><div className="mt-1"><span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter border shadow-sm ${getStatusStyle(selectedWorker.status)}`}>{selectedWorker.status}</span></div></div>
          </div>
        </section>

        <div className="pt-8 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-400 tracking-tight italic">
          <p>Created: 21/04/2026 12:49 · Updated: 21/04/2026 12:49</p>
          <div className="flex items-center gap-2 uppercase tracking-widest not-italic"><Users size={12} />Worker Management System</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Top Navbar */}
     <div className="hidden lg:flex justify-between items-center bg-white p-4 -mx-8 -mt-8 mb-8 border-b border-gray-100 shadow-sm">
             <div className="flex items-center gap-2 pl-4">
               <h2 className="text-sm font-bold text-gray-700">Admin Dashboard</h2>
             </div>
             <div className="flex items-center gap-4 pr-4">
               <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors">
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

      <AnimatePresence>
        {isOfferModalOpen && renderOfferModal()}
      </AnimatePresence>

      <AnimatePresence>
        <OfferLetterDOCXModal 
          isOpen={isOfferDOCXModalOpen} 
          onClose={() => setIsOfferDOCXModalOpen(false)} 
          worker={selectedWorker}
        />
      </AnimatePresence>

      <AnimatePresence>
        <StatusChangeModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          worker={selectedWorker}
          onSave={handleStatusChange}
        />
      </AnimatePresence>

      <AnimatePresence>
        <QRCodeModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
        />
      </AnimatePresence>

      {isAddingWorker ? (
        <AddWorker 
          onBack={() => setIsAddingWorker(false)} 
          onSubmit={(data) => {
            const today = new Date();
            const dateStr = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth()+1).toString().padStart(2, '0')}/${today.getFullYear()}`;
            setWorkers([...workers, { 
              id: Date.now(), 
              name: data.workerName || 'Unknown Worker', 
              email: data.email || 'N/A', 
              dept: data.department || 'N/A', 
              role: data.designation || 'N/A', 
              status: 'Pending', 
              lastLogin: dateStr 
            }]);
            setIsAddingWorker(false);
          }}
        />
      ) : selectedWorker ? renderWorkerDetails() : (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Worker Management</h1>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <button onClick={() => setIsQRModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#16a34a] text-white rounded-lg text-xs font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all"><QrCode size={16} /> QR Code</button>

              <button onClick={handleDownloadExcel} className="flex items-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"><Download size={16} /> Download Excel</button>
              <button onClick={() => setIsAddingWorker(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0052cc] text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all"><Plus size={16} strokeWidth={3} /> Add Worker</button>
            </div>

          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 pb-4 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar pb-1">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-[#dbeafe] text-[#1e40af] shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>{tab}</button>
                ))}
              </div>

              {activeTab === 'Inquiries' ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative group"><input readOnly value="https://ndatechnology.in/public/worker-inquiry/697ce60cac25c1f712b6cfcc" className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-500 outline-none" /></div>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0066cc] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"><Download size={16} className="rotate-180" /> Copy inquiry link</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <CustomSelect 
                      options={['All years', '2026', '2025']} 
                      value={selectedYear} 
                      onChange={setSelectedYear} 
                      className="min-w-[140px]" 
                    />
                    <CustomSelect 
                      options={['All types', 'Gujarati', 'Non Gujarati']} 
                      value={selectedType} 
                      onChange={setSelectedType} 
                      className="min-w-[140px]" 
                    />
                  </div>

                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative group"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" size={18} /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name, email, phone, or designation..." className="w-full bg-gray-50/50 border border-gray-100 rounded-xl pl-12 pr-4 py-3 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all" /></div>
                  <div className="flex flex-wrap gap-3">
                    <CustomSelect 
                      options={['All years', '2026', '2025']} 
                      value={selectedYear} 
                      onChange={setSelectedYear} 
                      className="min-w-[140px]" 
                    />
                    <CustomSelect 
                      options={['All months', ...Object.keys(monthMap)]} 
                      value={selectedMonth} 
                      onChange={setSelectedMonth} 
                      className="min-w-[140px]" 
                    />
                    <CustomSelect 
                      options={['All Departments', 'FD', 'House Keeping', 'Production', 'director', 'test']} 
                      value={selectedDept} 
                      onChange={setSelectedDept} 
                      className="min-w-[160px]" 
                    />
                  </div>

                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              {activeTab === 'Inquiries' ? (
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead><tr className="bg-gray-50/30 border-y border-gray-100">{['DATE', 'EMPLOYEE NAME', 'ROLE', 'MOBILE NO.', 'TYPE', 'ACTIONS'].map((h) => (<th key={h} className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>))}</tr></thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredInquiries.map((inq, i) => (
                      <tr key={i} className="hover:bg-gray-50/20 transition-colors">
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-500">{inq.date}</td>
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-800">{inq.name}</td>
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-600">{inq.role}</td>
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-600">{inq.mobile}</td>
                        <td className="px-8 py-6"><span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tighter border shadow-sm ${inq.type === 'Gujarati' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{inq.type}</span></td>
                        <td className="px-8 py-6"><div className="flex flex-col gap-2"><button className="flex items-center gap-2 text-[11px] font-bold text-blue-600 hover:text-blue-800"><Download size={14} /> Excel</button><button className="flex items-center gap-2 text-[11px] font-bold text-red-600 hover:text-red-800"><Trash2 size={14} /> Delete</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50/30"><tr><td colSpan="6" className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Total: {filteredInquiries.length}</td></tr></tfoot>
                </table>
              ) : (
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead><tr className="bg-gray-50/30 border-y border-gray-100">{['USER NAME', 'EMAIL ID', 'DEPARTMENT', 'ROLE', 'LAST LOGIN', 'STATUS', 'ACTIONS'].map((h) => (<th key={h} className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>))}</tr></thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredWorkers.length > 0 ? filteredWorkers.map((worker, i) => (
                      <tr key={i} className="hover:bg-gray-50/20 transition-colors group">
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-800">{worker.name}</td>
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-500">{worker.email}</td>
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-600">{worker.dept}</td>
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-600">{worker.role}</td>
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-500">{worker.lastLogin}</td>
                        <td className="px-8 py-6"><span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter border shadow-sm ${getStatusStyle(worker.status)}`}>{worker.status}</span></td>
                        <td className="px-8 py-6 relative">
                          <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === i ? null : i); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><MoreVertical size={18} /></button>
                          <AnimatePresence>
                            {openMenuId === i && (
                              <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} className="absolute right-8 top-16 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden py-2" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => { setSelectedWorker(worker); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all"><Pencil size={16} /> View Details</button>
                                <button onClick={() => handleDownload(worker, 'pdf')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all"><Download size={16} /> Interview form (PDF)</button>
                                <button onClick={() => handleDownload(worker, 'excel')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all"><Download size={16} /> Download Excel</button>
                                <div className="h-px bg-gray-50 my-1 mx-4" />
                                <button onClick={() => { setIsOfferModalOpen(true); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-blue-600 hover:bg-blue-50 transition-all"><FileText size={16} /> Generate Offer Letter</button>
                                <button onClick={() => { setSelectedWorker(worker); setIsOfferDOCXModalOpen(true); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-blue-600 hover:bg-blue-50 transition-all"><FileText size={16} /> Download Offer Letter (DOCX)</button>

                                <div className="h-px bg-gray-50 my-1 mx-4" />
                                <button onClick={() => handleDelete(worker)} className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50 transition-all"><Trash2 size={16} /> Delete</button>

                                <button onClick={() => { setSelectedWorker(worker); setIsStatusModalOpen(true); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all"><RotateCw size={16} /> Change Status</button>

                              </motion.div>
                            )}
                          </AnimatePresence>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="7" className="px-8 py-20 text-center"><div className="flex flex-col items-center gap-4"><div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300"><Search size={32} /></div><div><p className="text-sm font-bold text-gray-800">No workers found</p><p className="text-xs font-bold text-gray-400 mt-1">Try adjusting your filters or search query.</p></div></div></td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Worker;
