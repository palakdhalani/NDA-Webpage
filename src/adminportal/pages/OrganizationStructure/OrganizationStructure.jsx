import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  ChevronDown,
  Download,
  Plus,
  LayoutGrid,
  List as ListIcon,
  Search,
  MoreVertical,
  Bell,
  Settings,
  Users,
  Users2,
  FileText,
  Eye,
  Share2,
  RotateCcw,
  Minus,
  Maximize2,
  Pencil,
  ChevronRight,
  User,
  Lock,
  Unlock,
  FileDown,
  Printer,
  Calendar,
  UploadCloud,
  X,
  Briefcase,
  Mail,
  Phone
} from 'lucide-react';
import AddMemberModal from './components/AddMemberModal.jsx';

const OrgChartCard = ({
  name,
  avatar,
  avatarBg = "bg-gray-200 text-gray-700",
  borderColor = "border-purple-500",
  code = "—",
  dept = "—",
  desig = "—",
  role = "—",
  mobile = "—",
  email = "—",
  experience = "2 mos",
  joinedDate = "15 Jan 2026",
  displayOptions
}) => {
  return (
    <div className={`w-[300px] bg-white border ${borderColor} rounded-2xl p-4 shadow-sm hover:shadow-md transition-all relative z-20 flex items-center gap-4 group text-left`}>
      {/* Left Avatar Box */}
      {displayOptions?.photo !== false && (
        <div className={`w-16 h-16 rounded-xl ${avatarBg} flex items-center justify-center font-bold text-2xl shrink-0 shadow-sm`}>
          {avatar || name.charAt(0)}
        </div>
      )}

      {/* Right Details Stack */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <h4 className="text-xs font-bold text-gray-900 truncate group-hover:text-[#0066cc] transition-colors">
          {name}
        </h4>
        <div className="text-[10px] text-gray-500 space-y-0.5 pt-0.5 leading-tight">
          {displayOptions?.code !== false && (
            <p className="truncate"><span className="text-gray-400">Code:</span> {code}</p>
          )}
          {displayOptions?.department !== false && (
            <p className="truncate"><span className="text-gray-400">Dept:</span> {dept}</p>
          )}
          {displayOptions?.designation !== false && (
            <p className="truncate"><span className="text-gray-400">Desig:</span> {desig !== '—' ? desig : role}</p>
          )}
          {displayOptions?.role !== false && desig === '—' && (
            <p className="truncate"><span className="text-gray-400">Role:</span> {role}</p>
          )}
          {displayOptions?.experience !== false && experience && experience !== '—' && (
            <p className="truncate"><span className="text-gray-400">In Current:</span> {experience}</p>
          )}
          {displayOptions?.mobile !== false && (
            <p className="truncate"><span className="text-gray-400">Mobile:</span> {mobile}</p>
          )}
          {displayOptions?.email !== false && (
            <p className="truncate" title={email}><span className="text-gray-400">Email:</span> {email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const OrganizationStructure = () => {
  const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'list'
  const [zoom, setZoom] = useState(82);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [levelNames, setLevelNames] = useState({
    L1: '',
    L2: '',
    L3: '',
    L4: '',
    L5: '',
    L6: '',
    L7: '',
    L8: '',
  });
  const [displayOptions, setDisplayOptions] = useState({
    photo: true,
    code: true,
    department: true,
    designation: true,
    role: true,
    mobile: true,
    email: true,
    experience: false,
    joinedDate: true,
  });

  const [pdfConfig, setPdfConfig] = useState({
    docNo: 'HR-ORG-001',
    revNo: '01',
    date: '2025-08-13',
    preparedBy: 'ASS',
    approvedBy: 'Aji',
    isLocked: false
  });
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Org Members List State for real-time list view updates
  const [orgMembersList, setOrgMembersList] = useState({
    jayesh: {
      name: 'Jayesh m karavadara',
      code: 'ast34',
      dept: 'Account',
      desig: 'DFD',
      mobile: '9081133669',
      email: 'gx.gmail.com'
    },
    test123: {
      name: 'test123',
      desig: 'NA',
      dept: 'Dispatch',
      mobile: '5689321472',
      email: 'prince.dev.spirexinfoways@gmail.com',
      reportingTo: 'No Manager (Root)'
    },
    vimal: {
      name: 'Mr. Vimal Patel',
      code: '—',
      dept: '—',
      desig: 'Management',
      role: 'Admin',
      mobile: '7357385566',
      email: 'admin@techcorp.com'
    },
    children: [
      { id: 'testing', name: 'testing', email: 'newemail@techcorp.com', desig: '—', role: 'User', mob: '7717750138' },
      { id: 'user2@techcorp.com', name: 'user2@techcorp.com', email: 'user2@techcorp.com', desig: '—', role: 'User', mob: '—' },
      { id: 'user3@techcorp.com', name: 'user3@techcorp.com', email: 'user3@techcorp.com', desig: '—', role: 'User', mob: '—' },
      { id: 'user4@techcorp.com', name: 'user4@techcorp.com', email: 'user4@techcorp.com', desig: '—', role: 'User', mob: '—' },
      { id: 'rajat', name: 'rajat', email: 'dev@gmail.com', desig: 'dev', role: 'Sub-admin', mob: '7357385566' },
      { id: 'Mr. Piyush Patel', name: 'Mr. Piyush Patel', email: 'piyush@techcorp.com', desig: 'Management', role: 'Sub-admin', mob: '9809022062' },
      { id: 'Mr. Sachin Morjariya', name: 'Mr. Sachin Morjariya', email: 'cd@techcorp.com', desig: 'Management', role: 'Sub-admin', mob: '9809022062' },
      { id: 'Panth Patel', name: 'Panth Patel', email: 'panth.ops.spirexinfoways@gmail.com', desig: '—', role: 'Sub-admin', mob: '—' }
    ]
  });

  // Edit Employee Appointment Letter Modal State
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingChartMember, setEditingChartMember] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const handleOpenEditModal = (empName) => {
    if (empName.includes('Jayesh') || empName.includes('Solanki') || empName.includes('Roma')) {
      const isJayesh = empName.includes('Jayesh');
      setEditingEmployee({
        originalName: empName,
        name: isJayesh ? orgMembersList.jayesh.name : empName,
        status: isJayesh ? 'Death' : 'Active',
        docNo: 'HR-APP-001',
        revNo: '01',
        revDate: '2025-08-15',
        underStatus: 'Active in this HR / Sub-admin',
        mobile: isJayesh ? orgMembersList.jayesh.mobile : '7357385566',
        address: isJayesh ? 'Near Old Temple, Porbandar, Gujarat - 360575' : '123 Tech Park, Sector 5, Noida, UP',
        email: isJayesh ? orgMembersList.jayesh.email : 'employee@techcorp.com',
        dept: isJayesh ? orgMembersList.jayesh.dept : 'Account',
        desig: isJayesh ? orgMembersList.jayesh.desig : 'Manager',
        reportingManager: 'Mr. Vimal Patel',
        doj: '2026-01-15',
        ctc: '45000',
        annexure: 'Annexure A - Salary Structure',
        postingPlace: 'Noida',
        probation: '6',
        noticePeriod: '3',
        terminationPeriod: '1',
        paidLeaves: '18',
        casualSick: '6',
        cl: '12',
        sl: '6',
        pl: '12',
        ol: '0',
        nationalHolidays: 'As per company calendar',
        weeklyOff: 'Wednesday',
        incrementMonth: 'August',
        inductionTraining: true,
        onJobTraining: false,
        empCode: isJayesh ? orgMembersList.jayesh.code : 'EMP001',
        effectiveDate: '2026-01-15',
        shiftDetails: 'General shift 9:00 - 18:00, rotating night shifts as needed.',
        joinedDate: '2026-01-15',
        letterContent: `Appointment Letter
Date: {{AppointmentDate}}

To,
{{EmployeeName}}
{{EmployeeAddress}}
{{EmployeeMobileNumber}}

Dear {{EmployeeName}},
We are pleased to appoint you as {{Designation}} in our organization on the following terms and conditions:

1. Assignment & Reporting:
You will report to {{ReportingManager}}.
Your initial place of posting will be {{PlaceOfPosting}}.

2. Compensation:
Your monthly CTC will be ₹{{MonthlyCTC}}.

3. Leaves & Holidays:
You are entitled to {{PaidLeaves}} paid leaves per annum.

Please sign and return the duplicate copy of this letter as a token of your acceptance.`
      });
    } else if (empName === 'test123' || empName === orgMembersList.test123.name) {
      setEditingChartMember({
        originalName: 'test123',
        name: orgMembersList.test123.name,
        desig: orgMembersList.test123.desig,
        dept: orgMembersList.test123.dept,
        email: orgMembersList.test123.email,
        mobile: orgMembersList.test123.mobile,
        reportingTo: orgMembersList.test123.reportingTo,
        previewImg: 'https://placehold.co/96x96/e2e8f0/64748b?text=Preview'
      });
    } else {
      let email = 'admin@techcorp.com';
      let mobile = '736798984';
      let desig = 'Management';
      let currentName = empName;

      if (empName === orgMembersList.vimal.name || empName === 'Mr. Vimal Patel') {
        currentName = orgMembersList.vimal.name;
        email = orgMembersList.vimal.email;
        mobile = orgMembersList.vimal.mobile;
        desig = orgMembersList.vimal.desig;
      } else {
        const found = orgMembersList.children.find(c => c.id === empName || c.name === empName);
        if (found) {
          currentName = found.name;
          email = found.email;
          mobile = found.mob;
          desig = found.desig;
        }
      }

      setEditingUser({
        originalId: empName,
        name: currentName,
        email,
        mobile,
        desig
      });
    }
  };

  const handleCloseEditModal = () => setEditingEmployee(null);

  const handleSaveEditEmployee = () => {
    if (editingEmployee.originalName.includes('Jayesh')) {
      setOrgMembersList(prev => ({
        ...prev,
        jayesh: {
          ...prev.jayesh,
          name: editingEmployee.name,
          dept: editingEmployee.dept,
          desig: editingEmployee.desig,
          mobile: editingEmployee.mobile,
          email: editingEmployee.email,
          code: editingEmployee.empCode
        }
      }));
    }
    alert(`Appointment Letter & Details for ${editingEmployee.name} updated successfully!`);
    setEditingEmployee(null);
  };

  const handleSaveEditChartMember = () => {
    setOrgMembersList(prev => ({
      ...prev,
      test123: {
        ...prev.test123,
        name: editingChartMember.name,
        desig: editingChartMember.desig,
        dept: editingChartMember.dept,
        mobile: editingChartMember.mobile,
        email: editingChartMember.email,
        reportingTo: editingChartMember.reportingTo
      }
    }));
    alert(`Reporting manager & details for ${editingChartMember.name} updated successfully!`);
    setEditingChartMember(null);
  };

  const handleSaveEditUser = () => {
    if (editingUser.originalId === orgMembersList.vimal.name || editingUser.originalId === 'Mr. Vimal Patel') {
      setOrgMembersList(prev => ({
        ...prev,
        vimal: {
          ...prev.vimal,
          name: editingUser.name,
          email: editingUser.email,
          mobile: editingUser.mobile,
          desig: editingUser.desig
        }
      }));
    } else {
      setOrgMembersList(prev => ({
        ...prev,
        children: prev.children.map(c => c.id === editingUser.originalId || c.name === editingUser.originalId ? {
          ...c,
          name: editingUser.name,
          email: editingUser.email,
          mob: editingUser.mobile,
          desig: editingUser.desig
        } : c)
      }));
    }
    alert(`User details for ${editingUser.name} updated successfully!`);
    setEditingUser(null);
  };

  const handleDisplayOptionToggle = (key) => {
    setDisplayOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLevelNameChange = (level, value) => {
    setLevelNames(prev => ({ ...prev, [level]: value }));
  };

  const handleSaveLevelNames = () => {
    alert('Level names saved successfully!');
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAddMember = (newMember) => {
    console.log('Adding new member:', newMember);
    alert(`${newMember.fullName} added to the chart successfully!`);
  };

  const handleDownloadPdf = () => {
    const filename = `${pdfConfig.docNo.replace(/\s+/g, '_')}_OrgStructure.pdf`;
    const content = `ORGANIZATION STRUCTURE REGISTRATION DOCUMENT
Company: TechCorp Solutions
Document No: ${pdfConfig.docNo} | Revision No: ${pdfConfig.revNo} | Date: ${pdfConfig.date}
Prepared By: ${pdfConfig.preparedBy} | Approved By: ${pdfConfig.approvedBy}

HIERARCHY LEVELS & ACTIVE ROLES:
L1 Management: Mr. Vimal Patel (Admin)
L2 Sub-admin: Panth Patel, rajat, testing, user2@techcorp.com
L3 Manager: ajit vadher, Candidate 2, rajat Kumar Sinha
L4 Staff: Rahul Najbhai Solanki, Roma patoriya

[End of Document - Generated over Secure API]`;

    const blob = new Blob([content], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = filename;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-10">
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

      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-xl">
                <Building2 size={24} className="text-[#0066cc]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                Organization Structure
              </h1>
            </div>
            <p className="text-xs font-bold text-gray-400 max-w-7xl leading-relaxed mt-2">
              Drag employees to change reporting. Right-click a card on the chart (or use the pencil in list) to edit full details. Level titles (L1, L2...) can be renamed below. Photo for employees comes from Joining Documents.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus size={16} /> Add Member
          </button>
          <div className="flex bg-white border border-gray-100 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${viewMode === 'chart' ? 'bg-blue-50 text-blue-600 shadow-inner' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={14} /> Org chart
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${viewMode === 'list' ? 'bg-blue-50 text-blue-600 shadow-inner' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <ListIcon size={14} /> List
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {[
          { id: 'levels', label: 'Level names (what L1, L2, L3 mean)' },
          { id: 'options', label: 'Display options (show/hide details in chart)' },
          { id: 'pdf', label: 'PDF register (Document / Revision)', hasIcon: true }
        ].map((section) => (
          <div key={section.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:border-blue-100 transition-colors">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 px-6 text-left"
            >
              <div className="flex items-center gap-3">
                {section.hasIcon ? (
                  <FileText size={16} className="text-blue-500" />
                ) : (
                  <motion.div
                    animate={{ rotate: expandedSection === section.id ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-gray-400" />
                  </motion.div>
                )}
                <span className="text-xs font-bold text-gray-700 tracking-tight">{section.label}</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-300 transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 pt-0"
                >
                  {section.id === 'levels' ? (
                    <div className="space-y-4 pt-1">
                      <p className="text-xs text-gray-500">
                        Shown under each level badge on the chart and in the list. Saved in this browser only.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8'].map((level) => (
                          <div key={level} className="space-y-1">
                            <label className="text-xs font-bold text-gray-600 block">{level}</label>
                            <input
                              type="text"
                              value={levelNames[level]}
                              onChange={(e) => handleLevelNameChange(level, e.target.value)}
                              placeholder="e.g. Board / HOD / Manager"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={handleSaveLevelNames}
                          className="text-xs font-bold text-[#0066cc] hover:underline transition-all"
                        >
                          Save level names
                        </button>
                      </div>
                    </div>
                  ) : section.id === 'options' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-4 gap-x-6 pt-2 pb-1">
                      {[
                        { id: 'photo', label: 'Photo' },
                        { id: 'code', label: 'Code' },
                        { id: 'department', label: 'Department' },
                        { id: 'designation', label: 'Designation' },
                        { id: 'role', label: 'Role' },
                        { id: 'mobile', label: 'Mobile' },
                        { id: 'email', label: 'Email' },
                        { id: 'experience', label: 'Experience' },
                        { id: 'joinedDate', label: 'Joined Date' },
                      ].map((opt) => (
                        <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer group select-none">
                          <input
                            type="checkbox"
                            checked={displayOptions[opt.id]}
                            onChange={() => handleDisplayOptionToggle(opt.id)}
                            className="w-4 h-4 text-[#0066cc] border-gray-300 rounded focus:ring-[#0066cc] transition-all cursor-pointer"
                          />
                          <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900 transition-colors">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : section.id === 'pdf' ? (
                    <div className="space-y-6 pt-2 pb-2">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Company name, address, contact, and logo come from Company settings. Logo is loaded over a secure API (same as interview PDF). Add Prepared / Approved names for the signature block; use Preview to check before downloading.
                      </p>

                      {/* Row 1: Document No, Revision No, Date, Lock Button */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-xs font-bold text-gray-700 block">Document No.</label>
                          <input
                            type="text"
                            disabled={pdfConfig.isLocked}
                            placeholder="e.g. HR-ORG-001"
                            value={pdfConfig.docNo}
                            onChange={(e) => setPdfConfig({ ...pdfConfig, docNo: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500 shadow-sm"
                          />
                        </div>

                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-xs font-bold text-gray-700 block">Revision No.</label>
                          <input
                            type="text"
                            disabled={pdfConfig.isLocked}
                            placeholder="e.g. 01"
                            value={pdfConfig.revNo}
                            onChange={(e) => setPdfConfig({ ...pdfConfig, revNo: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500 shadow-sm"
                          />
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-xs font-bold text-gray-700 block">Date</label>
                          <div className="relative">
                            <input
                              type="date"
                              disabled={pdfConfig.isLocked}
                              value={pdfConfig.date}
                              onChange={(e) => setPdfConfig({ ...pdfConfig, date: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500 shadow-sm appearance-none"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            onClick={() => setPdfConfig({ ...pdfConfig, isLocked: !pdfConfig.isLocked })}
                            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${pdfConfig.isLocked ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100' : 'bg-gray-500 hover:bg-gray-600 text-white shadow-gray-100'}`}
                          >
                            {pdfConfig.isLocked ? <Unlock size={14} /> : <Lock size={14} />}
                            {pdfConfig.isLocked ? 'Unlock' : 'Lock'}
                          </button>
                        </div>
                      </div>

                      {/* Row 2: Prepared by, Approved by */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 block">Prepared by (PDF)</label>
                          <input
                            type="text"
                            disabled={pdfConfig.isLocked}
                            value={pdfConfig.preparedBy}
                            onChange={(e) => setPdfConfig({ ...pdfConfig, preparedBy: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500 shadow-sm"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 block">Approved by (PDF)</label>
                          <input
                            type="text"
                            disabled={pdfConfig.isLocked}
                            value={pdfConfig.approvedBy}
                            onChange={(e) => setPdfConfig({ ...pdfConfig, approvedBy: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500 shadow-sm"
                          />
                        </div>
                      </div>

                      {/* Row 3: Helper text & Save button */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-b border-gray-100 pb-6">
                        <p className="text-[11px] text-gray-400 font-medium">
                          These two fields are saved in Company (DB) and PDF always uses the saved values.
                        </p>
                        <button
                          onClick={() => alert('Prepared & Approved names saved to Company DB successfully!')}
                          className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 active:bg-gray-100 transition-all shadow-sm shrink-0"
                        >
                          Save Prepared/Approved
                        </button>
                      </div>

                      {/* Row 4: Bottom Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={handleDownloadPdf}
                          className="px-6 py-2.5 bg-[#0052cc] text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                        >
                          <Download size={14} /> Download PDF
                        </button>
                        <button
                          onClick={() => setIsPreviewModalOpen(true)}
                          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
                        >
                          <Eye size={14} className="text-gray-500" /> Preview PDF
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-20 bg-gray-50/50 rounded-xl border border-dashed border-gray-100 flex items-center justify-center">
                      <p className="text-[10px] font-bold text-gray-400 italic">Settings area for {section.label}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Main View Area */}
      {viewMode === 'chart' ? (
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          {/* Chart Actions Toolbar */}
          <div className="p-4 sm:p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-gray-400 italic w-full sm:w-auto text-center sm:text-left">
              — Drag to reassign · Right-click card to edit · Drag empty space to pan (no scroll-zoom)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
              <button onClick={handleDownloadPdf} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                <Download size={14} className="text-gray-400" /> Download PDF
              </button>
              <button onClick={() => setIsPreviewModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                <Eye size={14} className="text-gray-400" /> Preview
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#f0f7ff] border border-blue-100 rounded-xl text-[10px] font-bold text-blue-600 hover:bg-blue-100 transition-all shadow-sm">
                <Share2 size={14} /> Share Link
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                <RotateCcw size={14} className="text-gray-400" /> Reset chart view
              </button>
            </div>
          </div>

          {/* The Org Chart Canvas */}
          <div className="flex-1 relative bg-white overflow-auto p-6 sm:p-10 min-h-[700px] custom-scrollbar">
            {/* Zoom Controls */}
            <div className="sticky top-0 float-right z-30 flex items-center bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden mb-4">
              <button
                onClick={() => setZoom(Math.max(10, zoom - 5))}
                className="p-3 hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all border-r border-gray-100"
              >
                <Minus size={14} />
              </button>
              <span className="px-5 text-[11px] font-bold text-gray-600 min-w-[70px] text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(150, zoom + 5))}
                className="p-3 hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all border-l border-gray-100"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Visualization area */}
            <div className="min-w-max min-h-max flex flex-col items-center relative z-10 transition-transform duration-200" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>

              {/* Tree Container */}
              <div className="w-full min-w-[1200px] flex flex-col items-center pt-10 pb-20 relative select-none">

                {/* Background Level Bands positioned absolutely inside the scaled canvas */}
                <div className="absolute inset-0 z-0 flex flex-col pointer-events-none w-full h-full">
                  {/* L1 Band */}
                  <div className="h-[230px] bg-purple-50/40 border-b border-purple-100/50 w-full flex items-center pl-8 sm:pl-12">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      L1
                    </div>
                  </div>
                  {/* L2 Band */}
                  <div className="h-[230px] bg-blue-50/40 border-b border-blue-100/50 w-full flex items-center pl-8 sm:pl-12">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      L2
                    </div>
                  </div>
                  {/* L3 Band */}
                  <div className="h-[230px] bg-emerald-50/40 border-b border-emerald-100/50 w-full flex items-center pl-8 sm:pl-12">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      L3
                    </div>
                  </div>
                  {/* L4 Band */}
                  <div className="flex-1 bg-orange-50/40 w-full min-h-[230px] flex items-center pl-8 sm:pl-12 pt-10 items-start">
                    <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      L4
                    </div>
                  </div>
                </div>

                {/* Tree Content Container */}
                <div className="flex gap-16 items-start relative z-10 pt-8 w-full max-w-5xl justify-center">
                  {/* Left Column: Jayesh (L1 only) */}
                  <div className="flex flex-col items-center">
                    <div className="h-[160px] flex items-center">
                      <OrgChartCard
                        name={orgMembersList.jayesh.name}
                        avatar="J"
                        avatarBg="bg-purple-600 text-white"
                        borderColor="border-purple-500"
                        code="se04"
                        dept={orgMembersList.jayesh.dept}
                        desig={orgMembersList.jayesh.desig}
                        role="Manager"
                        mobile={orgMembersList.jayesh.mobile}
                        email="ga.gmail.com"
                        experience="0 mos"
                        joinedDate="15 Jan 2026"
                        displayOptions={displayOptions}
                      />
                    </div>
                  </div>

                  {/* Right Column: test123 (L1) -> Piyush Patel (L2) -> rajat Kumar Sinha (L3) -> Abc (L4) */}
                  <div className="flex flex-col items-center relative">
                    {/* L1: test123 */}
                    <div className="h-[160px] flex items-center relative">
                      <OrgChartCard
                        name={orgMembersList.test123.name}
                        avatar="T"
                        avatarBg="bg-purple-600 text-white"
                        borderColor="border-purple-500"
                        code="—"
                        dept={orgMembersList.test123.dept}
                        desig={orgMembersList.test123.desig}
                        role="Manager"
                        mobile={orgMembersList.test123.mobile}
                        email={orgMembersList.test123.email}
                        experience=""
                        joinedDate="10 Feb 2026"
                        displayOptions={displayOptions}
                      />
                      {/* Stem down to L2 */}
                      <div className="absolute -bottom-[70px] left-1/2 -translate-x-1/2 w-px h-[70px] border-r-2 border-purple-500 border-dashed z-10" />
                    </div>

                    {/* L2: Mr. Piyush Patel */}
                    <div className="h-[160px] flex items-center relative mt-[70px]">
                      <OrgChartCard
                        name="Mr. Piyush Patel"
                        avatar="M"
                        avatarBg="bg-gray-200 text-gray-700"
                        borderColor="border-blue-500"
                        code="—"
                        dept="—"
                        desig="Management"
                        role="Sub-admin"
                        mobile="9909022062"
                        email="piyush@techcorp.com"
                        experience=""
                        joinedDate="01 Jan 2021"
                        displayOptions={displayOptions}
                      />
                      {/* Stem down to L3 */}
                      <div className="absolute -bottom-[70px] left-1/2 -translate-x-1/2 w-px h-[70px] border-r-2 border-blue-500 z-10" />
                    </div>

                    {/* L3: rajat Kumar Sinha */}
                    <div className="h-[160px] flex items-center relative mt-[70px]">
                      <OrgChartCard
                        name="rajat Kumar Sinha"
                        avatar="R"
                        avatarBg="bg-[#00875a] text-white shadow-sm"
                        borderColor="border-emerald-500"
                        code="?"
                        dept="HR"
                        desig="dev"
                        role="Sr. Manager"
                        mobile="07717750136"
                        email="sinharajat22@gmail.com"
                        experience="2 mos"
                        joinedDate="20 Apr 2026"
                        displayOptions={displayOptions}
                      />
                      {/* Stem down to L4 */}
                      <div className="absolute -bottom-[70px] left-1/2 -translate-x-1/2 w-px h-[70px] border-r-2 border-emerald-500 z-10" />
                    </div>

                    {/* L4: Abc */}
                    <div className="h-[160px] flex items-center relative mt-[70px]">
                      <OrgChartCard
                        name="Abc"
                        avatar="A"
                        avatarBg="bg-[#de5200] text-white shadow-sm"
                        borderColor="border-orange-500"
                        code="—"
                        dept="—"
                        desig="—"
                        role="Staff"
                        mobile="—"
                        email="—"
                        experience=""
                        joinedDate="18 Apr 2026"
                        displayOptions={displayOptions}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Controls Indicator */}
            <div className="absolute bottom-6 right-6 text-right z-30">
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
                Zoom: buttons or Ctrl/⌘ + scroll · Drag employee
              </p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                Right-click · Pan empty area
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Unassigned Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl p-6 min-h-[160px] flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 mb-3">
                <Users size={18} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-700">Unassigned</span>
                <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">1</span>
              </div>
              <p className="text-[11px] text-gray-400 font-bold max-w-[140px]">Drop here to remove reporting manager</p>
            </div>
          </div>

          {/* Hierarchy List */}
          <div className="flex-1 space-y-4 w-full">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Reporting hierarchy (Admin at top)</h3>

            <div className="space-y-3">
              {/* L1 - Jayesh */}
              <div className="bg-white border-2 border-purple-400 rounded-xl p-4 flex items-center justify-between shadow-sm relative group transition-all hover:shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-[11px] font-bold text-gray-400 w-6 pt-2">L1</span>
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold shrink-0 text-lg shadow-sm shadow-purple-200">
                    {orgMembersList.jayesh.name.charAt(0)}
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-[13px] font-bold text-gray-800">{orgMembersList.jayesh.name}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1 text-[10px]">
                      <p className="text-gray-400"><span className="font-medium">Code:</span> <span className="font-bold text-gray-600">{orgMembersList.jayesh.code}</span></p>
                      <p className="text-gray-400"><span className="font-medium">Department:</span> <span className="font-bold text-blue-600">{orgMembersList.jayesh.dept}</span></p>
                      <p className="text-gray-400"><span className="font-medium">Designation:</span> <span className="font-bold text-gray-600">{orgMembersList.jayesh.desig}</span></p>
                      <p className="text-gray-400"><span className="font-medium">Total exp:</span> <span className="font-bold text-gray-600">0 mos</span></p>
                      <p className="text-gray-400"><span className="font-medium">Current org:</span> <span className="font-bold text-gray-600">0 mos</span></p>
                      <p className="text-gray-400"><span className="font-medium">Mobile:</span> <span className="font-bold text-gray-600">{orgMembersList.jayesh.mobile}</span></p>
                      <p className="text-gray-400 col-span-1 sm:col-span-2"><span className="font-medium">Email:</span> <span className="font-bold text-gray-600">{orgMembersList.jayesh.email}</span></p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full min-h-[90px]">
                  <button onClick={() => handleOpenEditModal(orgMembersList.jayesh.name)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                    <Pencil size={14} strokeWidth={2.5} />
                  </button>
                  <span className="text-[10px] font-bold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">Drag to reassign</span>
                </div>
              </div>

              {/* L1 - test123 */}
              <div className="bg-white border-2 border-purple-400 rounded-xl p-4 flex items-center justify-between shadow-sm relative group transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold text-gray-400 w-6">L1</span>
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold shrink-0 shadow-sm shadow-purple-200">
                    {orgMembersList.test123.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-800">{orgMembersList.test123.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Dept: {orgMembersList.test123.dept} | Desig: {orgMembersList.test123.desig}</p>
                  </div>
                </div>
                <button onClick={() => handleOpenEditModal(orgMembersList.test123.name)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                  <Pencil size={14} strokeWidth={2.5} />
                </button>
              </div>

              {/* Gray Container for Mr. Vimal Patel and children */}
              <div className="bg-gray-50/50 rounded-2xl p-3 border border-gray-100">
                {/* L1 - Mr Vimal Patel */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[11px] font-bold text-gray-400 w-6 pt-2">L1</span>
                    <button className="pt-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <ChevronDown size={16} strokeWidth={2.5} />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-50 text-blue-500 shrink-0">
                      <User size={18} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1.5 pt-0.5">
                      <h4 className="text-[13px] font-bold text-gray-800">{orgMembersList.vimal.name}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1 text-[10px]">
                        <p className="text-gray-400"><span className="font-medium">Code:</span> <span className="font-bold text-gray-600">{orgMembersList.vimal.code}</span></p>
                        <p className="text-gray-400"><span className="font-medium">Department:</span> <span className="font-bold text-gray-600">{orgMembersList.vimal.dept}</span></p>
                        <p className="text-gray-400"><span className="font-medium">Designation:</span> <span className="font-bold text-gray-600">{orgMembersList.vimal.desig}</span></p>
                        <p className="text-gray-400"><span className="font-medium">Role:</span> <span className="font-bold text-gray-600">{orgMembersList.vimal.role}</span></p>
                        <p className="text-gray-400"><span className="font-medium">Mobile:</span> <span className="font-bold text-gray-600">{orgMembersList.vimal.mobile}</span></p>
                        <p className="text-gray-400 col-span-1 sm:col-span-2"><span className="font-medium">Email:</span> <span className="font-bold text-gray-600">{orgMembersList.vimal.email}</span></p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleOpenEditModal(orgMembersList.vimal.name)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors self-start">
                    <Pencil size={14} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Children List */}
                <div className="pl-6 border-l-2 border-gray-200 ml-6 space-y-3 py-1">

                  {orgMembersList.children.map((user) => (
                    <div key={user.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm relative group hover:border-blue-100 transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="text-[11px] font-bold text-gray-400 w-6 pt-2">L2</span>
                        <button className="pt-2 text-gray-300">
                          <ChevronRight size={14} strokeWidth={3} />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                          <User size={18} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-1.5 pt-0.5">
                          <h4 className="text-[13px] font-bold text-gray-800">{user.name}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1 text-[10px]">
                            <p className="text-gray-400"><span className="font-medium">Code:</span> <span className="font-bold text-gray-600">—</span></p>
                            <p className="text-gray-400"><span className="font-medium">Department:</span> <span className="font-bold text-gray-600">—</span></p>
                            <p className="text-gray-400"><span className="font-medium">Designation:</span> <span className="font-bold text-gray-600">{user.desig}</span></p>
                            <p className="text-gray-400"><span className="font-medium">Role:</span> <span className="font-bold text-gray-600">{user.role}</span></p>
                            <p className="text-gray-400"><span className="font-medium">Mobile:</span> <span className="font-bold text-gray-600">{user.mob}</span></p>
                            <p className="text-gray-400 col-span-1 sm:col-span-2"><span className="font-medium">Email:</span> <span className="font-bold text-gray-600">{user.email}</span></p>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleOpenEditModal(user.id)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors self-start opacity-0 group-hover:opacity-100 sm:opacity-100">
                        <Pencil size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAdd={handleAddMember}
      />

      <AnimatePresence>
        {isPreviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Organization Structure PDF Preview</h2>
                    <p className="text-xs text-gray-400">High-fidelity print & export view</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#0052cc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    <Printer size={16} /> Print / Export PDF
                  </button>
                  <button
                    onClick={() => setIsPreviewModalOpen(false)}
                    className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body / A4 Page Simulation */}
              <div className="flex-1 overflow-y-auto p-8 bg-gray-100 flex justify-center custom-scrollbar">
                <div className="w-full max-w-3xl bg-white shadow-lg p-12 border border-gray-200 min-h-[900px] flex flex-col justify-between print:shadow-none print:border-none print:p-0 print:w-full print:max-w-none">

                  {/* A4 Header */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6">
                      <div className="space-y-1">
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">TechCorp Solutions</h1>
                        <p className="text-xs text-gray-600 font-medium">123 Tech Park, Sector 5, Noida, Uttar Pradesh - 201301</p>
                        <p className="text-xs text-gray-500 font-medium">Contact: +91 7357385566 | Email: contact@techcorp.com</p>
                      </div>
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md">
                        TS
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Organization Structure Register</h3>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Official Hierarchy & Reporting Lineup</p>
                      </div>
                      <div className="text-right space-y-0.5 text-xs font-bold text-gray-700">
                        <p><span className="text-gray-400">Doc No:</span> {pdfConfig.docNo}</p>
                        <p><span className="text-gray-400">Rev No:</span> {pdfConfig.revNo}</p>
                        <p><span className="text-gray-400">Date:</span> {pdfConfig.date}</p>
                      </div>
                    </div>

                    {/* A4 Content / Hierarchy Tables */}
                    <div className="space-y-6 pt-4">
                      <div className="space-y-3">
                        <div className="bg-purple-50 border-l-4 border-purple-600 p-3 rounded-r-xl">
                          <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider">Level 1: Management (Board / HOD)</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-4">
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">Mr. Vimal Patel</p>
                            <p className="text-xs text-gray-500 font-medium">Designation: Management | Role: Admin</p>
                            <p className="text-[11px] text-gray-400">Email: admin@techcorp.com | Mobile: 7357385566</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-r-xl">
                          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Level 2: Sub-admin / Core Team</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-4">
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">Panth Patel</p>
                            <p className="text-xs text-gray-500 font-medium">Role: Sub-admin</p>
                            <p className="text-[11px] text-gray-400">Email: panth.ops@gmail.com</p>
                          </div>
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">rajat</p>
                            <p className="text-xs text-gray-500 font-medium">Designation: dev | Role: Sub-admin</p>
                            <p className="text-[11px] text-gray-400">Email: dev@gmail.com | Mobile: 7357385566</p>
                          </div>
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">testing</p>
                            <p className="text-xs text-gray-500 font-medium">Role: User</p>
                            <p className="text-[11px] text-gray-400">Email: newemail@techcorp.com | Mobile: 7717750138</p>
                          </div>
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">user2@techcorp.com</p>
                            <p className="text-xs text-gray-500 font-medium">Role: User</p>
                            <p className="text-[11px] text-gray-400">Email: user2@techcorp.com</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r-xl">
                          <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Level 3: Managers & Leads</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-4">
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">ajit vadher</p>
                            <p className="text-xs text-gray-500 font-medium">Dept: HR | Desig: Manager1</p>
                            <p className="text-[11px] text-gray-400">Email: ajitvadher95@gmail.com | Mobile: 9809022062</p>
                          </div>
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">Candidate 2</p>
                            <p className="text-xs text-gray-500 font-medium">Dept: Test | Desig: test</p>
                            <p className="text-[11px] text-gray-400">Mobile: 9876543101</p>
                          </div>
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">rajat Kumar Sinha</p>
                            <p className="text-xs text-gray-500 font-medium">Dept: HR | Desig: Sr. Manager</p>
                            <p className="text-[11px] text-gray-400">Email: sinharajat22@gmail.com | Mobile: 07717750136</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-orange-50 border-l-4 border-orange-600 p-3 rounded-r-xl">
                          <h4 className="text-xs font-bold text-orange-900 uppercase tracking-wider">Level 4: Execution / Staff</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-4">
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">Rahul Najbhai Solanki</p>
                            <p className="text-xs text-gray-500 font-medium">Dept: Account | Desig: dev</p>
                            <p className="text-[11px] text-gray-400">Email: rahul.a@gmail.com | Mobile: 9909052086</p>
                          </div>
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-1">
                            <p className="text-sm font-bold text-gray-900">Roma patoriya</p>
                            <p className="text-xs text-gray-500 font-medium">Dept: HR | Desig: Sr. Manager</p>
                            <p className="text-[11px] text-gray-400">Email: roma@gmail.com | Mobile: 6356352652</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* A4 Footer / Signatures */}
                  <div className="pt-12 border-t border-gray-300 mt-12 grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="h-12 border-b border-gray-400 w-48" />
                      <div>
                        <p className="text-xs font-bold text-gray-800">Prepared By: {pdfConfig.preparedBy}</p>
                        <p className="text-[10px] text-gray-500 font-medium">Authorized Signature & Timestamp</p>
                      </div>
                    </div>
                    <div className="space-y-4 flex flex-col items-end">
                      <div className="h-12 border-b border-gray-400 w-48" />
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-800">Approved By: {pdfConfig.approvedBy}</p>
                        <p className="text-[10px] text-gray-500 font-medium">Company Management Approval</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-white z-10">
                <button
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all border border-blue-100"
                >
                  <Download size={16} /> Direct Blob Download (.pdf)
                </button>
                <button
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="px-8 py-2.5 bg-gray-800 text-white rounded-xl text-xs font-bold hover:bg-gray-900 transition-all shadow-md"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Appointment Letter Modal */}
      <AnimatePresence>
        {editingEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseEditModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Edit Appointment Letter</h2>
                  <p className="text-xs text-gray-400">Update employee details, terms, and letter contents</p>
                </div>
                <button
                  onClick={handleCloseEditModal}
                  className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-white custom-scrollbar">

                {/* Upload profile photo banner */}
                <div className="bg-[#f0f7ff] border border-blue-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0 shadow-inner overflow-hidden">
                      {editingEmployee.selectedPhoto ? (
                        <img src={editingEmployee.selectedPhoto} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <UploadCloud size={24} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-gray-800 truncate">
                        {editingEmployee.selectedPhotoName || "Upload profile photo"}
                      </h4>
                      <p className="text-xs text-blue-600 truncate">
                        {editingEmployee.selectedPhotoName ? "Click Choose Photo to change" : "Add a clear photo of member, then upload in the HR box."}
                      </p>
                    </div>
                  </div>
                  <div className="relative w-full sm:w-auto shrink-0">
                    <input
                      type="file"
                      id="profile-photo-upload"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const photoUrl = URL.createObjectURL(file);
                          setEditingEmployee({
                            ...editingEmployee,
                            selectedPhoto: photoUrl,
                            selectedPhotoName: file.name
                          });
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-photo-upload"
                      className="w-full sm:w-auto px-6 py-2.5 bg-white border border-blue-200 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all shadow-sm cursor-pointer inline-block text-center"
                    >
                      Choose Photo
                    </label>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="space-y-1 max-w-xs">
                  <label className="text-xs font-bold text-gray-700 block">Status</label>
                  <select
                    value={editingEmployee.status}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Death">Death</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {/* Front page */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Front page</h3>
                    <p className="text-xs text-gray-400">Document no, revision no, revision / original date come in appointment letter</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Document No.</label>
                      <input
                        type="text"
                        value={editingEmployee.docNo}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, docNo: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Revision No.</label>
                      <input
                        type="text"
                        value={editingEmployee.revNo}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, revNo: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Revision / Original date</label>
                      <input
                        type="date"
                        value={editingEmployee.revDate}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, revDate: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm appearance-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Under status */}
                <div className="space-y-1 max-w-md pt-2 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-700 block">Under status</label>
                  <select
                    value={editingEmployee.underStatus}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, underStatus: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                  >
                    <option value="Active in this HR / Sub-admin">Active in this HR / Sub-admin</option>
                    <option value="Transferred to another branch">Transferred to another branch</option>
                    <option value="On Deputation">On Deputation</option>
                  </select>
                </div>

                {/* Employee Details */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Employee Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Employee Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={editingEmployee.name}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Employee Mobile Number <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={editingEmployee.mobile}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, mobile: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 block">Employee Address <span className="text-red-500">*</span></label>
                      <textarea
                        rows={2}
                        value={editingEmployee.address}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, address: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm resize-none"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 block">Employee Email</label>
                      <input
                        type="email"
                        value={editingEmployee.email}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Job Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Department <span className="text-red-500">*</span></label>
                      <select
                        value={editingEmployee.dept}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, dept: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      >
                        <option value="Account">Account</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Management">Management</option>
                        <option value="Operations">Operations</option>
                        <option value="Purchase">Purchase</option>
                        <option value="Test">Test</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Designation <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={editingEmployee.desig}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, desig: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Reporting Manager <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={editingEmployee.reportingManager}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, reportingManager: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Date of Joining <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        value={editingEmployee.doj}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, doj: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm appearance-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Salary Details */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Salary Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Monthly CTC (₹) <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        value={editingEmployee.ctc}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, ctc: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Salary Breakup Annexure - salary structure</label>
                      <input
                        type="text"
                        value={editingEmployee.annexure}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, annexure: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Terms & Conditions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Place of Posting</label>
                      <input
                        type="text"
                        value={editingEmployee.postingPlace}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, postingPlace: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Probation Period (Months)</label>
                      <input
                        type="number"
                        value={editingEmployee.probation}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, probation: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Notice Period (Months)</label>
                      <input
                        type="number"
                        value={editingEmployee.noticePeriod}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, noticePeriod: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Termination Period (Months)</label>
                      <input
                        type="number"
                        value={editingEmployee.terminationPeriod}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, terminationPeriod: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Paid Leaves Per Annum</label>
                      <input
                        type="number"
                        value={editingEmployee.paidLeaves}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, paidLeaves: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Casual/Sick Leaves</label>
                      <input
                        type="number"
                        value={editingEmployee.casualSick}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, casualSick: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">CL / Casual Leaves</label>
                      <input
                        type="number"
                        value={editingEmployee.cl}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, cl: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">SL / Sick Leaves</label>
                      <input
                        type="number"
                        value={editingEmployee.sl}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, sl: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 text-xs font-bold text-gray-800 rounded-xl focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">PL / Earned Leaves</label>
                      <input
                        type="number"
                        value={editingEmployee.pl}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, pl: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">OL / Other Leaves</label>
                      <input
                        type="number"
                        value={editingEmployee.ol}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, ol: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">National Holidays</label>
                      <input
                        type="text"
                        value={editingEmployee.nationalHolidays}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, nationalHolidays: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Weekly Off Day</label>
                      <input
                        type="text"
                        value={editingEmployee.weeklyOff}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, weeklyOff: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 block">Increment Month</label>
                      <input
                        type="text"
                        value={editingEmployee.incrementMonth}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, incrementMonth: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Training Details */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Training Details</h3>
                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingEmployee.inductionTraining}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, inductionTraining: e.target.checked })}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      Induction Training (shown in appointment letter?)
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingEmployee.onJobTraining}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, onJobTraining: e.target.checked })}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      On-Job Training (shown in appointment letter?)
                    </label>
                  </div>
                </div>

                {/* Additional Employee Details */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Additional Employee Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Employee code</label>
                      <input
                        type="text"
                        value={editingEmployee.empCode}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, empCode: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Effective date</label>
                      <input
                        type="date"
                        value={editingEmployee.effectiveDate}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, effectiveDate: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm appearance-none"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 block">Shift details</label>
                      <textarea
                        rows={2}
                        value={editingEmployee.shiftDetails}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, shiftDetails: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm resize-none"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 block">Employee Joined Date</label>
                      <input
                        type="date"
                        value={editingEmployee.joinedDate}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, joinedDate: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm appearance-none max-w-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment Letter Content (Editable) */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Appointment Letter Content (Editable)</h3>
                    <p className="text-xs text-gray-400">All the tags inside {`{{ }}`} will be replaced dynamically with employee details.</p>
                  </div>
                  <textarea
                    rows={12}
                    value={editingEmployee.letterContent}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, letterContent: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-inner leading-relaxed"
                  />
                </div>

                {/* Profile photo / Org chart / ID info banner */}
                <div className="bg-[#f0f7ff] border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-800">
                  <p className="font-medium">
                    Photo comes from your Joining Documents -&gt; Photo. Upload banner is for org chart and ID verification sync.
                  </p>
                  <button
                    onClick={() => alert('Navigating to Joining Documents module...')}
                    className="font-bold text-blue-600 hover:text-blue-800 underline shrink-0"
                  >
                    Open Joining Documents -&gt;
                  </button>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-white z-10">
                <button
                  onClick={handleCloseEditModal}
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEditEmployee}
                  className="px-8 py-2.5 bg-[#0052cc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                >
                  Update Appointment Letter
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Chart Member Modal (test123 / system users) */}
      <AnimatePresence>
        {editingChartMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingChartMember(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                <h2 className="text-lg font-bold text-gray-800">Edit Chart Member</h2>
                <button
                  onClick={() => setEditingChartMember(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white custom-scrollbar">

                {/* Preview Image Box */}
                <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center mx-auto bg-gray-50/50 p-1 shadow-inner overflow-hidden">
                  <img
                    src={editingChartMember.previewImg}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Read-only / Clean Data Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <User size={14} className="text-gray-400" />
                      <span>Full Name</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 pl-6">{editingChartMember.name}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <Briefcase size={14} className="text-gray-400" />
                      <span>Designation</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 pl-6">{editingChartMember.desig}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <Building2 size={14} className="text-gray-400" />
                      <span>Department</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 pl-6">{editingChartMember.dept}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <Phone size={14} className="text-gray-400" />
                      <span>Mobile</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 pl-6">{editingChartMember.mobile}</p>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <Mail size={14} className="text-gray-400" />
                      <span>Email</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 pl-6 truncate" title={editingChartMember.email}>{editingChartMember.email}</p>
                  </div>
                </div>

                {/* Reporting To Dropdown */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-700 block">Reporting To</label>
                  <select
                    value={editingChartMember.reportingTo}
                    onChange={(e) => setEditingChartMember({ ...editingChartMember, reportingTo: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                  >
                    <option value="No Manager (Root)">No Manager (Root)</option>
                    <option value="Mr. Vimal Patel (Admin)">Mr. Vimal Patel (Admin)</option>
                    <option value="Jayesh m karavadara (L1)">Jayesh m karavadara (L1)</option>
                    <option value="rajat (Sub-admin)">rajat (Sub-admin)</option>
                  </select>
                  <p className="text-[11px] italic text-gray-400 pt-0.5">
                    Select a manager from the chart (System Users, Employees, or Manual Members).
                  </p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-white z-10">
                <button
                  onClick={() => setEditingChartMember(null)}
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEditChartMember}
                  className="px-8 py-2.5 bg-[#0052cc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                >
                  Update Member
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit User Modal (Vimal Patel to Panth Patel) */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingUser(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                <h2 className="text-lg font-bold text-gray-800">Edit user</h2>
                <button
                  onClick={() => setEditingUser(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 bg-white custom-scrollbar">

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">Name</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">Mobile</label>
                  <input
                    type="text"
                    value={editingUser.mobile}
                    onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">Designation</label>
                  <input
                    type="text"
                    value={editingUser.desig}
                    onChange={(e) => setEditingUser({ ...editingUser, desig: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                  />
                </div>

                <p className="text-[11px] text-gray-500 pt-2 leading-relaxed font-medium border-t border-gray-100">
                  Profile photo for org chart is not stored on the user record. For employees with an appointment letter, upload a photo via Joining Documents (Photo) or ID Cards.
                </p>

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-white z-10">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEditUser}
                  className="px-8 py-2.5 bg-[#0052cc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                >
                  Save
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganizationStructure;
