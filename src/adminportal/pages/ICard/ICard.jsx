import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Users, 
  Users2, 
  Bell, 
  Settings, 
  Lock, 
  BarChart3, 
  FileText, 
  Plus, 
  Archive, 
  Image as ImageIcon,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../../components/ui/CustomSelect';

const ICard = () => {
  const navigate = useNavigate();
  const [docFormatNo, setDocFormatNo] = useState('Write It Self');
  const [revisionNoDate, setRevisionNoDate] = useState('Write It Self');
  const [universalEmergencyNo, setUniversalEmergencyNo] = useState('9999999999');
  const [formatType, setFormatType] = useState('Worker');
  const [selectAll, setSelectAll] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);
  const [companyLogo, setCompanyLogo] = useState(null);
  const companyLogoInputRef = useRef(null);

  const [employees, setEmployees] = useState([
    { id: 1, selected: false, format: 'Worker', code: 'EMP-001', title: '-', name: 'rajat K', dob: '2026-02-03', doj: '2026-03-27', gender: '-', dept: 'HR', desig: 'Sr. Manager', category: 'Sinha', maritalStatus: 'Single', permAddress: '06koyar', presAddress: '06kc', photo: '' },
    { id: 2, selected: false, format: 'Worker', code: 'EMP-002', title: '-', name: 'rajat K', dob: '2026-02-03', doj: '2026-02-28', gender: '-', dept: 'HR', desig: 'gvhjbkn', category: 'Sinha', maritalStatus: 'Single', permAddress: '06koyar', presAddress: 'hand', photo: '' },
    { id: 3, selected: false, format: 'Worker', code: 'EMP-003', title: 'Mr.', name: 'Pampaniya', dob: '2005-08-08', doj: '2026-03-06', gender: 'Male', dept: 'HR', desig: 'dev', category: 'Ahir', maritalStatus: '-', permAddress: 'Gabha,t', presAddress: 'Gabł', photo: '' },
    { id: 4, selected: false, format: 'Worker', code: '2', title: '-', name: 'rajat K', dob: '2026-02-03', doj: '2026-02-25', gender: '-', dept: 'HR', desig: 'dev', category: 'Sinha', maritalStatus: 'Single', permAddress: '06koyar', presAddress: '06kc', photo: '' },
    { id: 5, selected: false, format: 'Staff', code: 'EMP-005', title: '-', name: 'Rajat S', dob: '2026-02-03', doj: '2026-02-28', gender: '-', dept: 'HR', desig: 'dev', category: 'Sinha', maritalStatus: 'Single', permAddress: '06koyar', presAddress: '06kc', photo: '' },
    { id: 6, selected: false, format: 'Staff', code: 'EMP-006', title: 'Mr.', name: 'ajit vadher', dob: '2026-01-02', doj: '2026-02-15', gender: 'Male', dept: 'Test', desig: 'Management', category: '-', maritalStatus: '-', permAddress: 'Tgui, Va', presAddress: 'Gijrff', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { id: 7, selected: false, format: 'Staff', code: 'EMP-007', title: 'Mrs.', name: 'Candidate', dob: '1991-02-01', doj: '2026-02-25', gender: 'Female', dept: 'Test', desig: 'dev', category: '-', maritalStatus: '-', permAddress: '101 Stre', presAddress: '-', photo: '' },
    { id: 8, selected: false, format: 'Staff', code: '1', title: 'Mr.', name: 'ajit vadher', dob: '2026-01-02', doj: '2026-02-04', gender: 'Male', dept: 'HR', desig: 'Manager1', category: '-', maritalStatus: '-', permAddress: 'Tgui, Va', presAddress: 'Gijrff', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  ]);

  const filteredEmployees = formatType === 'Employee' 
    ? employees 
    : employees.filter(emp => emp.format === formatType);

  const handleSelectAllToggle = () => {
    const nextState = !selectAll;
    setSelectAll(nextState);
    const filteredIds = new Set(filteredEmployees.map(e => e.id));
    setEmployees(employees.map(emp => 
      filteredIds.has(emp.id) ? { ...emp, selected: nextState } : emp
    ));
  };

  const handleEmployeeChange = (id, field, value) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, [field]: value } : emp));
  };

  const handleAddRow = () => {
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    setEmployees([...employees, {
      id: newId,
      selected: false,
      format: formatType === 'Employee' ? 'Worker' : formatType,
      code: `EMP-${String(newId).padStart(3, '0')}`,
      title: 'Mr.',
      name: 'New Employee',
      dob: '2000-01-01',
      doj: new Date().toISOString().split('T')[0],
      gender: 'Male',
      dept: 'HR',
      desig: 'dev',
      category: 'Sinha',
      maritalStatus: 'Single',
      permAddress: 'New Address',
      presAddress: 'New Address',
      photo: ''
    }]);
  };

  const handleRemoveRow = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handlePhotoUpload = (id, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleEmployeeChange(id, 'photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyLogoUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadExcel = () => {
    const header = [
      ["TechCorp Solutions"],
      ["123 Tech Park, Sector 5, Noida, Uttar Pradesh - 201301"],
      ["Employee ID-Card Register"],
      [`Format: ${formatType} | Document No: ${docFormatNo} | Revision: ${revisionNoDate}`],
      [],
      [
        "Sr. No.", "Employee Code", "Title", "Employee Name", "Date of Birth", 
        "Date of Joining", "Gender", "Department", "Designation", "Category", 
        "Marital Status", "Permanent Address", "Present Address", "Emergency Contact"
      ]
    ];

    const dataRows = filteredEmployees.map((emp, index) => [
      index + 1,
      emp.code,
      emp.title,
      emp.name,
      emp.dob,
      emp.doj,
      emp.gender,
      emp.dept,
      emp.desig,
      emp.category,
      emp.maritalStatus,
      emp.permAddress,
      emp.presAddress,
      universalEmergencyNo
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([...header, ...dataRows]);
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 13 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 13 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 13 } },
      { s: { r: 3, c: 0 }, e: { r: 3, c: 13 } }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ID_Cards");
    XLSX.writeFile(workbook, `Employee_ID_Card_Register_${formatType}.xlsx`);
  };

  const handleDownloadAllIDCards = () => {
    handleDownloadExcel();
    alert(`Successfully generated and downloaded ID Cards register for ${filteredEmployees.length} employees.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12 font-sans">
      {/* Top Navbar */}
      <div className="hidden lg:flex justify-between items-center bg-white p-4 -mx-8 -mt-8 mb-8 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 pl-4">
          <h2 className="text-sm font-bold text-gray-700">Admin Dashboard</h2>
        </div>
        <div className="flex items-center gap-4 pr-4">
          <button 
            onClick={handleDownloadExcel}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors"
          >
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

      {/* Main Card Container */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Top Company Info & Form Settings */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
          {/* Company Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div 
              onClick={() => companyLogoInputRef.current?.click()}
              className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-2 shrink-0 bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer group overflow-hidden relative"
            >
              {companyLogo ? (
                <img src={companyLogo} alt="Company Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <>
                  <ImageIcon size={28} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                  <span className="text-xs font-bold text-center group-hover:text-blue-600 transition-colors">Company<br />logo</span>
                </>
              )}
              <input 
                type="file" 
                ref={companyLogoInputRef}
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleCompanyLogoUpload(e.target.files[0])}
              />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-red-600 tracking-tight leading-none">TechCorp Solutions</h2>
              <p className="text-[10px] sm:text-xs font-bold text-amber-600">123 Tech Park, Sector 5, Noida, Uttar Pradesh - 201301</p>
              <p className="text-[10px] sm:text-xs font-bold text-gray-700 pt-1">Form No. 36. (Prescribed under rule 108-A)</p>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight pt-0.5">Employee ID-Card Register</h1>
            </div>
          </div>

          {/* Form Settings Inputs */}
          <div className="w-full xl:w-80 space-y-3 bg-gray-50/50 p-6 rounded-2xl border border-gray-100/80 shadow-inner">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600">Document (Format) No.</label>
              <input 
                type="text" 
                value={docFormatNo}
                onChange={(e) => setDocFormatNo(e.target.value)}
                placeholder="Write It Self" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600">Revision No. & Date</label>
              <input 
                type="text" 
                value={revisionNoDate}
                onChange={(e) => setRevisionNoDate(e.target.value)}
                placeholder="Write It Self" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600">Universal Emergency No.</label>
              <input 
                type="text" 
                value={universalEmergencyNo}
                onChange={(e) => setUniversalEmergencyNo(e.target.value)}
                placeholder="9999999999" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
              <p className="text-[10px] font-medium text-gray-400 pt-1">Printed on the back of all cards</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full my-6" />

        {/* Toolbar Controls */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 xl:gap-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
            <div className="flex items-center gap-2 min-w-[140px] flex-1 sm:flex-none">
              <span className="text-xs font-bold text-gray-600">Format</span>
              <CustomSelect 
                options={['Worker', 'Staff', 'Employee']}
                value={formatType} 
                onChange={(val) => setFormatType(val)}
                className="flex-1"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-[#1e293b] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-all active:scale-95 flex-1 sm:flex-none">
              <Lock size={14} />
              Lock format
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
            <button 
              onClick={() => setIsAnalyticsOpen(true)}
              className="flex justify-center items-center gap-2 bg-[#6366f1] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-indigo-100 hover:bg-indigo-600 transition-all active:scale-95 flex-1 sm:flex-none"
            >
              <BarChart3 size={14} />
              Data Analytic
            </button>
            <button 
              onClick={handleDownloadExcel} 
              className="flex justify-center items-center gap-2 bg-[#0052cc] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex-1 sm:flex-none"
            >
              <Download size={14} />
              Download Excel
            </button>
            <button 
              onClick={() => navigate('/admin/org-structure')}
              className="flex justify-center items-center gap-2 bg-[#334155] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-slate-700 transition-all active:scale-95 flex-1 sm:flex-none"
            >
              <FileText size={14} />
              Org Structure
            </button>
          </div>
        </div>

        {/* Sub-toolbar: Add Column & Revision History */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <button onClick={handleAddRow} className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
              <Plus size={14} strokeWidth={3} /> Add Column
            </button>
            <span className="text-[11px] font-semibold text-gray-400">Unlock and set Document No. + Revision No. to add/change columns</span>
          </div>
          <button 
            onClick={() => setIsRevisionOpen(true)}
            className="font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors ml-auto sm:ml-0"
          >
            <Archive size={14} className="text-gray-400" /> Revision history
          </button>
        </div>

        {/* Main Table Container */}
        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1800px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-6 py-4 w-12 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectAll}
                      onChange={handleSelectAllToggle}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-4 w-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest"></th>
                  <th className="px-6 py-4 w-20 text-[10px] font-bold text-gray-400 uppercase tracking-widest">SR. NO.</th>
                  <th className="px-6 py-4 w-36 text-[10px] font-bold text-gray-400 uppercase tracking-widest">EMPLOYEE CODE</th>
                  <th className="px-6 py-4 w-44 text-[10px] font-bold text-gray-400 uppercase tracking-widest">TITLE (MALE/FEMALE/OTHER)</th>
                  <th className="px-6 py-4 w-48 text-[10px] font-bold text-gray-400 uppercase tracking-widest">EMPLOYEE NAME</th>
                  <th className="px-6 py-4 w-40 text-[10px] font-bold text-gray-400 uppercase tracking-widest">DATE OF BIRTH</th>
                  <th className="px-6 py-4 w-40 text-[10px] font-bold text-gray-400 uppercase tracking-widest">DATE OF JOINING</th>
                  <th className="px-6 py-4 w-36 text-[10px] font-bold text-gray-400 uppercase tracking-widest">GENDER</th>
                  <th className="px-6 py-4 w-36 text-[10px] font-bold text-gray-400 uppercase tracking-widest">DEPARTMENT</th>
                  <th className="px-6 py-4 w-40 text-[10px] font-bold text-gray-400 uppercase tracking-widest">DESIGNATION</th>
                  <th className="px-6 py-4 w-36 text-[10px] font-bold text-gray-400 uppercase tracking-widest">CATEGORY</th>
                  <th className="px-6 py-4 w-36 text-[10px] font-bold text-gray-400 uppercase tracking-widest">MARITAL STATUS</th>
                  <th className="px-6 py-4 w-44 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PERMANENT ADDRESS</th>
                  <th className="px-6 py-4 w-44 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PRESENT ADDRESS</th>
                  <th className="px-6 py-4 w-48 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PHOTO</th>
                  <th className="px-6 py-4 w-28 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80">
                {filteredEmployees.map((emp, idx) => (
                  <tr key={emp.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-6 py-3.5 text-center">
                      <input 
                        type="checkbox" 
                        checked={emp.selected}
                        onChange={(e) => handleEmployeeChange(emp.id, 'selected', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </td>
                    <td className="px-6 py-3.5 text-xs font-bold text-gray-700">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-3.5">
                      <input 
                        type="text" 
                        value={emp.code}
                        onChange={(e) => handleEmployeeChange(emp.id, 'code', e.target.value)}
                        className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[120px]">
                      <CustomSelect 
                        options={['-', 'Mr.', 'Mrs.', 'Ms.']}
                        value={emp.title}
                        onChange={(val) => handleEmployeeChange(emp.id, 'title', val)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-6 py-3.5">
                      <input 
                        type="text" 
                        value={emp.name}
                        onChange={(e) => handleEmployeeChange(emp.id, 'name', e.target.value)}
                        className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[140px]">
                      <input 
                        type="date" 
                        value={emp.dob}
                        onChange={(e) => handleEmployeeChange(emp.id, 'dob', e.target.value)}
                        className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[140px]">
                      <input 
                        type="date" 
                        value={emp.doj}
                        onChange={(e) => handleEmployeeChange(emp.id, 'doj', e.target.value)}
                        className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[120px]">
                      <CustomSelect 
                        options={['-', 'Male', 'Female', 'Other']}
                        value={emp.gender}
                        onChange={(val) => handleEmployeeChange(emp.id, 'gender', val)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[140px]">
                      <CustomSelect 
                        options={['HR', 'Test', 'Production', 'Account', 'Director']}
                        value={emp.dept}
                        onChange={(val) => handleEmployeeChange(emp.id, 'dept', val)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[140px]">
                      <CustomSelect 
                        options={['Sr. Manager', 'gvhjbkn', 'dev', 'Management', 'Manager1', 'Executive', 'Director']}
                        value={emp.desig}
                        onChange={(val) => handleEmployeeChange(emp.id, 'desig', val)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[120px]">
                      <CustomSelect 
                        options={['-', 'Sinha', 'Ahir', 'Patel', 'Sharma']}
                        value={emp.category}
                        onChange={(val) => handleEmployeeChange(emp.id, 'category', val)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[120px]">
                      <CustomSelect 
                        options={['-', 'Single', 'Married']}
                        value={emp.maritalStatus}
                        onChange={(val) => handleEmployeeChange(emp.id, 'maritalStatus', val)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[140px]">
                      <input 
                        type="text" 
                        value={emp.permAddress}
                        onChange={(e) => handleEmployeeChange(emp.id, 'permAddress', e.target.value)}
                        className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[140px]">
                      <input 
                        type="text" 
                        value={emp.presAddress}
                        onChange={(e) => handleEmployeeChange(emp.id, 'presAddress', e.target.value)}
                        className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-3.5 min-w-[200px]">
                      <div className="flex flex-col gap-2">
                        <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-200/80 flex items-center justify-center text-[10px] text-gray-400 font-medium overflow-hidden shadow-sm">
                          {emp.photo ? (
                            <img src={emp.photo} alt="Employee" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[9px] text-gray-400 font-semibold">No Photo</span>
                          )}
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(emp.id, e.target.files[0])}
                          className="text-[10px] text-gray-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer w-full" 
                        />
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-center min-w-[100px]">
                      <span 
                        onClick={() => handleRemoveRow(emp.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer hover:underline transition-colors"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-blue-50/30 border-t border-gray-100">
                <tr>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline" onClick={handleSelectAllToggle}>All</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={handleAddRow} className="p-1 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-all flex items-center justify-center mx-auto">
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400 text-center">-</td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"><span onClick={handleAddRow} className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Add</span></td>
                  <td className="px-6 py-4 text-center"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Floating Action Button */}
      <div className="flex justify-center pt-4">
        <button 
          onClick={handleDownloadAllIDCards}
          className="bg-[#0052cc] text-white px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
        >
          Download All ID Cards
        </button>
      </div>

      {/* Data Analytics Modal */}
      <AnimatePresence>
        {isAnalyticsOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 font-sans">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="text-blue-600" size={20} />
                  <h3 className="text-base font-bold text-gray-900">Data Analytic</h3>
                </div>
                <button 
                  onClick={() => setIsAnalyticsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Total */}
                <div>
                  <p className="text-xs font-bold text-gray-700">Total</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{employees.length}</p>
                  <p className="text-[11px] font-medium text-gray-400 mt-0.5">Total employees in current view</p>
                </div>

                {/* By Gender */}
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-3">By Gender</p>
                  <div className="space-y-2.5 text-xs font-medium text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Male</span>
                      <span className="font-bold text-gray-900">{employees.filter(e => e.gender === 'Male').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Female</span>
                      <span className="font-bold text-gray-900">{employees.filter(e => e.gender === 'Female').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Other</span>
                      <span className="font-bold text-gray-900">{employees.filter(e => e.gender === 'Other').length}</span>
                    </div>
                  </div>
                </div>

                {/* By Category */}
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-3">By Category</p>
                  <div className="space-y-2.5 text-xs font-medium text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Staff</span>
                      <span className="font-bold text-gray-900">{formatType === 'Staff' ? employees.length : 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Worker</span>
                      <span className="font-bold text-gray-900">{formatType === 'Worker' ? employees.length : 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Revision History Modal */}
      <AnimatePresence>
        {isRevisionOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 font-sans">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <Archive className="text-gray-700" size={20} />
                  <h3 className="text-base font-bold text-gray-900">Revision history</h3>
                </div>
                <button 
                  onClick={() => setIsRevisionOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 text-center sm:text-left">
                <p className="text-xs font-medium text-gray-500 leading-relaxed">
                  Complete records per revision: Document No., Revision No. & Date, columns count, row count, saved at.
                </p>
                <div className="py-8">
                  <p className="text-xs font-medium text-gray-500 text-center max-w-md mx-auto leading-relaxed">
                    No revisions yet. Unlock, set Document No. & Revision No., then add columns or lock to create a revision.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ICard;
