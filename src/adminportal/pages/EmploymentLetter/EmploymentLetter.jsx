import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Download, 
  Settings,
  Users,
  Users2,
  Bell,
  FileText,
  TrendingUp,
  CheckCircle2,
  HelpCircle,
  FileBox,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import * as XLSX from 'xlsx';
import CustomSelect from '../../components/ui/CustomSelect.jsx';
import LetterTemplateManager from './components/LetterTemplateManager.jsx';
import AppointmentModal from './components/AppointmentModal.jsx';
import ManageEmployeeModal from './components/ManageEmployeeModal.jsx';
import PromotionModal from './components/PromotionModal.jsx';
import ConfirmationModal from './components/ConfirmationModal.jsx';
import SalaryStructureModal from './components/SalaryStructureModal.jsx';
import OfferLetterModal from './components/OfferLetterModal.jsx';


const EmploymentLetter = () => {
  const [view, setView] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpenAppointmentModal = (emp) => {
    setSelectedEmployee(emp);
    setIsAppointmentModalOpen(true);
  };

  const handleOpenManageModal = (emp) => {
    setSelectedEmployee(emp);
    setIsManageModalOpen(true);
  };

  const handleOpenPromotionModal = (emp) => {
    setSelectedEmployee(emp);
    setIsPromotionModalOpen(true);
  };

  const handleOpenConfirmationModal = (emp) => {
    setSelectedEmployee(emp);
    setIsConfirmationModalOpen(true);
  };

  const handleOpenSalaryModal = (emp) => {
    setSelectedEmployee(emp);
    setIsSalaryModalOpen(true);
  };

  const handleOpenOfferModal = (emp) => {
    setSelectedEmployee(emp);
    setIsOfferModalOpen(true);
  };


  const employees = [
    { name: 'Jayesh m karavadara', subtitle: 'DFD', code: '4414', dept: 'Account', avatar: 'J', status: 'Sent' },
    { name: 'Sample Employee', subtitle: 'DFD', code: '-', dept: 'Account', avatar: 'S', status: 'Sent' },
    { name: 'Sample Employee', subtitle: 'Operator', code: '-', dept: 'Production', avatar: 'S', status: 'Draft' },
    { name: 'rajat Kumar Sinha', subtitle: 'DFD', code: '-', dept: 'Account', avatar: 'R', status: 'Sent' },
    { name: 'Jayesh m karavadara', subtitle: 'Safety Officer', code: 'J1', dept: 'HR', avatar: 'J', status: 'Sent' },
    { name: 'Rahul Najbhai Solanki', subtitle: 'Sr. Manager', code: '-', dept: 'Dispatch', avatar: 'R', status: 'Sent', notJoined: true },
    { name: 'rajat Kumar Sinha', subtitle: 'Sr. Manager', code: '-', dept: 'HR', avatar: 'R', status: 'Confirmed' },
    { name: 'rajat Kumar Sinha', subtitle: 'gyhgbbn', code: '-', dept: 'HH', avatar: 'R', status: 'Confirmed' },
    { name: 'Pampaniya mahendra maldebhai', subtitle: 'dev', code: '-', dept: 'HR', avatar: 'P', status: 'Confirmed' },
    { name: 'rajat Kumar Sinha', subtitle: 'dev', code: '2', dept: 'HR', avatar: 'R', status: 'Confirmed' },
  ];

  const handleDownloadOfferLettersExcel = () => {
    const headerRows = [
      ["TechCorp Solutions"],
      ["123 Tech Park, Sector 5, Noida, Uttar Pradesh - 201301"],
      ["Upcoming Joiners"],
      [
        "Sr. No.", "Employee Name", "Gender", "Department", "Designation", "Reporting To",
        "Date Of Birth", "Mobile No.", "E-Mail Address", "Present Address", "Permanent Address",
        "Qualification", "Previous Company", "Previous Salary", "Notice Period", "Offer Salary",
        "Offer Date", "Expected Date Of Joining", "Status"
      ]
    ];

    const dataRows = employees.map((emp, index) => [
      index + 1,
      emp.name,
      "male", // Dummy data
      emp.dept,
      emp.subtitle || "",
      "rajat", // Reporting To placeholder
      "07/11/1990", // DOB placeholder
      "07717750136", // Mobile placeholder
      "example@gmail.com", // Email placeholder
      "Koyri tola chatti bazar ramgarh", // Present Addr
      "Koyri tola chatti bazar ramgarh", // Perm Addr
      "Graduate B.Com", // Qual placeholder
      "Mira Casting", // Prev Co placeholder
      "20000", // Prev Salary placeholder
      "3", // Notice placeholder
      "60500", // Offer Salary placeholder
      "30/3/2026", // Offer Date placeholder
      "2/4/2026", // Expected DOJ placeholder
      emp.notJoined ? "Not joined" : "Joined"
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([...headerRows, ...dataRows]);

    // Merge first 3 rows across all 19 columns
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 18 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 18 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 18 } }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Upcoming Joiners");
    XLSX.writeFile(workbook, "Offer_Letters.xlsx");
  };

  const handleDownloadHistoryCardExcelAll = () => {
    const headerRows = [
      ["TechCorp Solutions"],
      ["123 Tech Park, Sector 5, Noida, Uttar Pradesh - 201301"],
      ["Employee History Card - (All)"],
      [
        "Sr. No.", "Category", "Employee ID No.", "Employee Name", "Gender", "Department", 
        "Designation", "Mobile No.", "E-Mail Address", "Date Of Birth", "Date Of Joining", 
        "Total (Over All Experience)", "Present Address", "Permanent Address", "Qualification", 
        "Aadhar Card Number", "PAN Number", "Driving Licence Number", "Bank Account Number", 
        "IFSC Code", "Induction Training (Done/Pen)", "On Job Training (Done/Pen)", "Status (Active / Left)"
      ]
    ];

    const dataRows = employees.map((emp, index) => [
      index + 1,
      emp.notJoined ? "Skill" : "High Skill", // Category placeholder
      emp.code !== '-' ? emp.code : "001", // Emp ID
      emp.name,
      "male", // Gender placeholder
      emp.dept,
      emp.subtitle || "",
      "08920160913", // Mobile placeholder
      "example@gmail.com", // Email placeholder
      "11/4/2008", // DOB placeholder
      "30/4/2026", // DOJ placeholder
      "3 year(s) 11 month(s)", // Exp placeholder
      "abc", // Present Address placeholder
      "abc", // Permanent Address placeholder
      "Graduate B.Com", // Qualification placeholder
      "", // Aadhar
      "", // PAN
      "", // Driving License
      "", // Bank Acc
      "", // IFSC
      "Pending", // Induction Training
      "Pending", // On Job Training
      emp.notJoined ? "Not joined" : (index % 3 === 0 ? "Left" : "Active") // Status
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([...headerRows, ...dataRows]);

    // Insert Document / Revision No to the top right
    worksheet[XLSX.utils.encode_cell({r: 0, c: 20})] = { t: 's', v: "Document/Format No.:" };
    worksheet[XLSX.utils.encode_cell({r: 0, c: 21})] = { t: 's', v: "3" };
    worksheet[XLSX.utils.encode_cell({r: 1, c: 20})] = { t: 's', v: "Revision No. / Date:" };
    worksheet[XLSX.utils.encode_cell({r: 1, c: 21})] = { t: 's', v: "1/16/05/2026" };

    // Update the sheet range to include the newly added cells
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    if (range.e.c < 22) range.e.c = 22;
    worksheet['!ref'] = XLSX.utils.encode_range(range);

    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 19 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 19 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 22 } },
      // Optional: merge col 21 to 22 for the top right values to look cleaner
      { s: { r: 0, c: 21 }, e: { r: 0, c: 22 } },
      { s: { r: 1, c: 21 }, e: { r: 1, c: 22 } }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee History");
    XLSX.writeFile(workbook, "Employee_History_Card_All.xlsx");
  };

  const handleDownloadHistoryCardExcelActive = () => {
    const headerRows = [
      ["TechCorp Solutions"],
      ["123 Tech Park, Sector 5, Noida, Uttar Pradesh - 201301"],
      ["Employee History Card - (Active)"],
      [
        "Sr. No.", "Category", "Employee ID No.", "Employee Name", "Gender", "Department", 
        "Designation", "Mobile No.", "E-Mail Address", "Date Of Birth", "Date Of Joining", 
        "Total (Over All Experience)", "Present Address", "Permanent Address", "Qualification", 
        "Aadhar Card Number", "PAN Number", "Driving License Number", "Bank Account Number", 
        "Skill Category", "IFSC Code", "Induction Training", "On Job Training", "Status"
      ]
    ];

    const dataRows = employees.filter(emp => !emp.notJoined).map((emp, index) => [
      index + 1,
      "Skill", // Category placeholder
      emp.code !== '-' ? emp.code : "re34", // Emp ID placeholder
      emp.name,
      "male", // Gender placeholder
      emp.dept,
      emp.subtitle || "",
      "9081133669", // Mobile placeholder
      "ga.gmail.com", // Email placeholder
      "6/4/2026", // DOB placeholder
      "30/4/2026", // DOJ placeholder
      "7 year(s)", // Exp placeholder
      "Nr. Padavala Village, shapar", // Present Address placeholder
      "Nr. Padavala Village, shapar", // Permanent Address placeholder
      "Graduate B.Com;\nPost Graduate", // Qualification placeholder
      "", // Aadhar
      "", // PAN
      "", // Driving License
      "", // Bank Acc
      "Skill", // Skill Category placeholder
      "", // IFSC
      "Pending", // Induction Training
      "Pending", // On Job Training
      "Active" // Status
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([...headerRows, ...dataRows]);

    // Insert Document / Revision No to the top right
    worksheet[XLSX.utils.encode_cell({r: 0, c: 21})] = { t: 's', v: "Document/Format No.:" };
    worksheet[XLSX.utils.encode_cell({r: 0, c: 23})] = { t: 's', v: "3" };
    worksheet[XLSX.utils.encode_cell({r: 1, c: 21})] = { t: 's', v: "Revision No. / Date:" };
    worksheet[XLSX.utils.encode_cell({r: 1, c: 23})] = { t: 's', v: "1/16/05/2026" };

    // Update the sheet range to include the newly added cells
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    if (range.e.c < 23) range.e.c = 23;
    worksheet['!ref'] = XLSX.utils.encode_range(range);

    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 20 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 20 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 23 } },
      // Optional: merge col 21 to 22 for the top right values to look cleaner
      { s: { r: 0, c: 21 }, e: { r: 0, c: 22 } },
      { s: { r: 1, c: 21 }, e: { r: 1, c: 22 } }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Active History");
    XLSX.writeFile(workbook, "Employee_History_Card_Active.xlsx");
  };

  const handleDownloadHistoryCardExcelLeft = () => {
    const headerRows = [
      ["TechCorp Solutions"],
      ["123 Tech Park, Sector 5, Noida, Uttar Pradesh - 201301"],
      ["Employee History Card - (Left)"],
      [
        "Sr. No.", "Category", "Employee ID No.", "Employee Name", "Gender", "Department", 
        "Designation", "Mobile No.", "E-Mail Address", "Date Of Birth", "Total (Over All Experience)", 
        "Present Address", "Permanent Address", "Qualification", "Aadhar Card Number", "PAN Number", 
        "Driving License Number", "Bank Account Number", "IFSC Code", "Reason", "Date Of Joining", 
        "Left Date", "Auto Calculate Years"
      ]
    ];

    const leftEmployees = employees.filter((emp, i) => emp.notJoined || i % 3 === 0);

    const dataRows = leftEmployees.map((emp, index) => [
      index + 1,
      emp.notJoined ? "High Skill" : "Skill", // Category placeholder
      emp.code !== '-' ? emp.code : "002", // Emp ID placeholder
      emp.name,
      "male", // Gender placeholder
      emp.dept,
      emp.subtitle || "",
      "9909032088", // Mobile placeholder
      "example@gmail.com", // Email placeholder
      "29/1/2008", // DOB placeholder
      "8 month(s)", // Exp placeholder
      "abc", // Present Address placeholder
      "abc", // Permanent Address placeholder
      "Graduate B.Com", // Qualification placeholder
      "", // Aadhar
      "", // PAN
      "", // Driving License
      "", // Bank Acc
      "", // IFSC
      emp.notJoined ? "Not Joined" : "Personal", // Reason placeholder
      "11/4/2026", // DOJ placeholder
      emp.notJoined ? "" : "29/9/2026", // Left Date placeholder
      emp.notJoined ? "" : "0" // Auto Calculate Years placeholder
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([...headerRows, ...dataRows]);

    // Insert Document / Revision No to the top right
    worksheet[XLSX.utils.encode_cell({r: 0, c: 20})] = { t: 's', v: "Document/Format No.:" };
    worksheet[XLSX.utils.encode_cell({r: 0, c: 22})] = { t: 's', v: "3" };
    worksheet[XLSX.utils.encode_cell({r: 1, c: 20})] = { t: 's', v: "Revision No. / Date:" };
    worksheet[XLSX.utils.encode_cell({r: 1, c: 22})] = { t: 's', v: "1/16/05/2026" };

    // Update the sheet range to include the newly added cells
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    if (range.e.c < 22) range.e.c = 22;
    worksheet['!ref'] = XLSX.utils.encode_range(range);

    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 19 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 19 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 22 } },
      // Optional: merge col 20 to 21 for the top right values to look cleaner
      { s: { r: 0, c: 20 }, e: { r: 0, c: 21 } },
      { s: { r: 1, c: 20 }, e: { r: 1, c: 21 } }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Left History");
    XLSX.writeFile(workbook, "Employee_History_Card_Left.xlsx");
  };

  const handleDownloadActiveSummaryExcel = () => {
    const headerRows = [
      ["", "TechCorp Solutions", "", "", ""],
      ["", "Appointment Letters Active Summary", "", "", ""],
      ["List Of Joined/Active Appointment Letters"],
      [
        "Sr. No.", "Employee Name", "Employee Code", "Department", "Designation", 
        "Document No", "Revision No", "Revision / Register Date", "Date of Joining", "Letter Status"
      ]
    ];

    const activeEmployees = employees.filter(emp => !emp.notJoined);

    const dataRows = activeEmployees.map((emp, index) => [
      index + 1,
      emp.name,
      emp.code !== '-' ? emp.code : "sef34",
      emp.dept,
      emp.subtitle || "",
      index === 0 ? "twst" : "",
      index === 0 ? "wte" : "",
      index === 0 ? "23/04/2026" : "",
      "30/04/2026",
      emp.status
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([...headerRows, ...dataRows]);

    // Insert Document / Revision No to the top right
    worksheet[XLSX.utils.encode_cell({r: 0, c: 5})] = { t: 's', v: "Document/Format No.:" };
    worksheet[XLSX.utils.encode_cell({r: 0, c: 8})] = { t: 's', v: "3" };
    worksheet[XLSX.utils.encode_cell({r: 1, c: 5})] = { t: 's', v: "Revision No. / Date:" };
    worksheet[XLSX.utils.encode_cell({r: 1, c: 8})] = { t: 's', v: "1/16/05/2026" };

    // Update the sheet range to include the newly added cells
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    if (range.e.c < 9) range.e.c = 9;
    worksheet['!ref'] = XLSX.utils.encode_range(range);

    worksheet['!merges'] = [
      { s: { r: 0, c: 1 }, e: { r: 0, c: 4 } }, // TechCorp Solutions
      { s: { r: 1, c: 1 }, e: { r: 1, c: 4 } }, // Subtitle
      { s: { r: 2, c: 0 }, e: { r: 2, c: 9 } }, // Table Title List Of Joined...
      { s: { r: 0, c: 5 }, e: { r: 0, c: 7 } }, // Doc Label
      { s: { r: 0, c: 8 }, e: { r: 0, c: 9 } }, // Doc Value
      { s: { r: 1, c: 5 }, e: { r: 1, c: 7 } }, // Rev Label
      { s: { r: 1, c: 8 }, e: { r: 1, c: 9 } }  // Rev Value
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Active Summary");
    XLSX.writeFile(workbook, "Active_Appointment_Letters_Summary.xlsx");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-[#e0e7ff] text-[#4338ca]';
      case 'Draft': return 'bg-[#f1f5f9] text-[#475569]';
      case 'Confirmed': return 'bg-[#f1f5f9] text-[#475569]';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  if (view === 'template-manager') {
    return <LetterTemplateManager onBack={() => setView('list')} />;
  }

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.subtitle && emp.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (emp.code && emp.code.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

      {/* Page Header and Actions */}
      <div className="flex flex-col xl:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">Appointed<br/>Employees</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 w-full xl:w-auto">
          <button 
            onClick={handleDownloadOfferLettersExcel}
            className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-white border border-blue-100 text-[#0066cc] rounded-lg text-[10px] sm:text-[11px] font-bold shadow-sm hover:bg-blue-50 transition-colors"
          >
            <Download size={14} /> Offer letters (Excel)
          </button>
          <button 
            onClick={handleDownloadHistoryCardExcelAll}
            className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-white border border-green-100 text-[#16a34a] rounded-lg text-[10px] sm:text-[11px] font-bold shadow-sm hover:bg-green-50 transition-colors"
          >
            <Download size={14} /> History Excel (all)
          </button>
          <button 
            onClick={handleDownloadHistoryCardExcelActive}
            className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-white border border-green-100 text-[#16a34a] rounded-lg text-[10px] sm:text-[11px] font-bold shadow-sm hover:bg-green-50 transition-colors"
          >
            <Download size={14} /> History Excel (active)
          </button>
          <button 
            onClick={handleDownloadHistoryCardExcelLeft}
            className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-white border border-red-100 text-[#dc2626] rounded-lg text-[10px] sm:text-[11px] font-bold shadow-sm hover:bg-red-50 transition-colors"
          >
            <Download size={14} /> History Excel (left)
          </button>
          <button 
            onClick={handleDownloadActiveSummaryExcel}
            className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-[10px] sm:text-[11px] font-bold shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Download size={14} /> Active summary
          </button>
          <button 
            onClick={() => setView('template-manager')}
            className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-[10px] sm:text-[11px] font-bold shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FileBox size={14} /> Templates
          </button>
        </div>
      </div>

      {/* History Register Form Container */}
      <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        
        <div className="space-y-4">
          <p className="text-[11px] font-bold text-gray-500 tracking-wide">
            Employee history register - document and revision numbers (based on company; shown on all Employee History Card Excel downloads)
          </p>
          
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 inline-block">
            <p className="text-[11px] font-bold text-[#16a34a]">
              Currently saved (database): Document no. 3 - Revision no. 1
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-end gap-4 mt-2">
            <div className="w-full sm:flex-1 space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500">Document / format no.</label>
              <input type="text" defaultValue="3" className="w-full h-10 px-3 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
            </div>
            <div className="w-full sm:flex-1 space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500">Revision no.</label>
              <input type="text" defaultValue="1" className="w-full h-10 px-3 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
            </div>
            <button className="w-full sm:w-auto h-10 px-8 bg-[#0066cc] text-white rounded-lg text-xs font-bold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name, designation, department, email, or mobile..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-[11px] font-bold text-gray-500 whitespace-nowrap hidden sm:block">Filter by Status:</label>
          <CustomSelect 
            options={['All', 'Sent', 'Draft', 'Accepted' ,'Rejected','Confirmed']} 
            value={statusFilter} 
            onChange={setStatusFilter} 
            className="w-full sm:w-48" 
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp, index) => (
          <div key={index} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col relative group">
            
            {/* Header / Avatar */}
            <div className="p-6 pb-4 flex flex-col items-center relative">
              <button className="absolute top-6 right-6 text-gray-300 hover:text-gray-600 transition-colors">
                <MoreVertical size={20} />
              </button>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md mb-3 ${emp.avatar === 'J' || emp.avatar === 'S' || emp.avatar === 'R' || emp.avatar === 'P' ? 'bg-[#22c55e]' : 'bg-[#0066cc]'}`}>
                {emp.avatar}
              </div>
              <h3 className="text-[14px] font-bold text-gray-900 tracking-tight text-center">{emp.name}</h3>
              {emp.subtitle && <p className="text-[11px] font-bold text-gray-400 mt-0.5 text-center">{emp.subtitle}</p>}
              
              {emp.notJoined && (
                <div className="mt-2 bg-[#fef3c7] text-[#d97706] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                  Not joined
                </div>
              )}
            </div>

            {/* Info Grid */}
            <div className="px-6 py-2 space-y-2 mb-2">
              <div className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                <span className="text-[11px] font-bold text-gray-400">Emp Code:</span>
                <span className="text-[11px] font-bold text-gray-800">{emp.code}</span>
              </div>
              <div className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                <span className="text-[11px] font-bold text-gray-400">Department:</span>
                <span className="text-[11px] font-bold text-gray-800">{emp.dept}</span>
              </div>
            </div>

            {/* Status Banner */}
            <div className="px-6 mb-4">
              <div className={`w-full py-1.5 flex justify-center rounded-md text-[11px] font-bold tracking-wide ${getStatusColor(emp.status)}`}>
                {emp.status}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 mt-auto space-y-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenAppointmentModal(emp)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#0066cc] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-blue-700 transition-colors"
                >
                  <FileText size={14} /> Appointment
                </button>

                <button 
                  onClick={() => handleOpenManageModal(emp)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-[11px] font-bold hover:bg-gray-50 transition-colors"
                >
                  <Settings size={14} /> Manage
                </button>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenPromotionModal(emp)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#f97316] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-orange-600 transition-colors"
                >
                  <TrendingUp size={14} /> Promotion
                </button>
                <button 
                  onClick={() => handleOpenConfirmationModal(emp)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#22c55e] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-green-600 transition-colors"
                >
                  <CheckCircle2 size={14} /> Confirm
                </button>
              </div>
              <button 
                onClick={() => handleOpenSalaryModal(emp)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#a855f7] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-purple-600 transition-colors"
              >
                <HelpCircle size={14} /> Annexure - salary structure
              </button>
              <button 
                onClick={() => handleOpenOfferModal(emp)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#6366f1] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-indigo-600 transition-colors"
              >
                <FileText size={14} /> Offer letter
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-4 px-2">
        <p className="text-[11px] font-bold text-gray-500">Showing 1 to 10 of 14 appointment letters</p>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <span className="text-[11px] font-bold text-gray-600">Page 1 of 2</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Modals */}
      <AppointmentModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
        employee={selectedEmployee}
      />

      <ManageEmployeeModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        employee={selectedEmployee}
      />

      <PromotionModal
        isOpen={isPromotionModalOpen}
        onClose={() => setIsPromotionModalOpen(false)}
        employee={selectedEmployee}
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        employee={selectedEmployee}
      />

      <SalaryStructureModal
        isOpen={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
        employee={selectedEmployee}
      />

      <OfferLetterModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmploymentLetter;
