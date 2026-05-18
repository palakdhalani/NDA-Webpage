import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  Bold, 
  Italic, 
  Underline, 
  List,
  Calendar,
  Save,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSelect from '../../../components/ui/CustomSelect.jsx';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const AppointmentModal = ({ isOpen, onClose, employee }) => {
  const [formData, setFormData] = useState({
    documentNo: "twst",
    revisionNo: "wte",
    revisionDate: "2026-04-23",
    useFor: "All",
    language: "English",
    letterContent: "",
    employeeName: "",
    employeeCode: "",
    dob: "2026-04-06",
    aadharNo: "0000 0000 0000",
    shiftDetails: "9:30 to 10:30",
    mobile: "9081133669",
    email: "ga.gmail.com",
    address: "Nr. Padavala Village, shapar",
    department: "Account",
    designation: "DFD",
    reportingTo: "user4@techcorp.com",
    doj: "2026-04-30",
    monthlyCTC: "50000",
    terminationPeriod: "3",
    location: "Rajkot",
    leaveCL: "4",
    leaveSL: "0",
    leaveEL: "15",
    leavePL: "0",
    holidays: "As per company calendar",
    weeklyOff: "Sunday"
  });

  const defaultTemplate = `::CENTER:: APPOINTMENT LETTER ::BOLD:: Document No.: {{documentNo}} Revision No.: {{revisionNo}} Date: {{documentRevisionDate}} Date: {{appointmentDate}} To, {{employeeName}} {{employeeAddress}} {{employeeMobileNumber}} Employee Code: {{employeeIdNumber}} Date of Birth: {{dateOfBirth}} Shift Details: {{shiftDetails}} Your appointment is subject to the following terms and conditions: • Designation & Reporting:- Department:- {{departmentName}} Designation:- {{designation}} Reporting Manager:- {{reportingManager}} • Date of Joining:- You will start your employment with us on {{startDate}}. • Salary Your total compensation will be as follows: • Monthly CTC: {{monthlyCTC}} A detailed salary breakup will be provided in your Annexure - salary structure. • Place of Posting • Your initial place of posting will be {{placeOfPosting}}. However, you may be transferred to any of the company's offices, subsidiaries, or project locations in India or abroad, depending on business requirements. • Probation Period You will be on a probation period of {{probationPeriod}} months from the date of joining. • Notice Period: {{noticePeriod}} months. • Termination Period: {{terminationPeriod}} months. • Job (Posting) Location: {{placeOfPosting}}. • Leave Entitlement: C.L. {{leaveCL}}, S.L. {{leaveSL}}, E.L. {{leaveEL}}, P.L. {{leavePL}}, National Holidays: {{nationalHolidays}}. Weekly Off: {{weeklyOff}}. • Increment Month: {{incrementMonth}}. Please sign and return a copy of this letter as a token of your acceptance. Yours faithfully, For, {{companyName}} Name: {{employeeName}} Signature: ______________________ Date: ______________________`;

  useEffect(() => {
    if (employee) {
      setFormData(prev => ({
        ...prev,
        employeeName: employee.name || "",
        employeeCode: employee.code !== '-' ? employee.code : "sef34",
        department: employee.dept || "Account",
        designation: employee.subtitle || "DFD",
        letterContent: defaultTemplate
      }));
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const applyFormatting = (tag) => {
    const textarea = document.getElementById('letter-editor');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.letterContent;
    const selectedText = text.substring(start, end);
    
    const formattedText = `::${tag}:: ${selectedText}`;
    const newContent = text.substring(0, start) + formattedText + text.substring(end);
    
    setFormData(prev => ({ ...prev, letterContent: newContent }));
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const generateDocx = async () => {
    // Replace placeholders with real values
    let finalContent = formData.letterContent
      .replace(/{{documentNo}}/g, formData.documentNo)
      .replace(/{{revisionNo}}/g, formData.revisionNo)
      .replace(/{{documentRevisionDate}}/g, formatDateForDisplay(formData.revisionDate))
      .replace(/{{appointmentDate}}/g, new Date().toLocaleDateString('en-GB').replace(/\//g, '-'))
      .replace(/{{employeeName}}/g, formData.employeeName)
      .replace(/{{employeeAddress}}/g, formData.address)
      .replace(/{{employeeMobileNumber}}/g, formData.mobile)
      .replace(/{{employeeIdNumber}}/g, formData.employeeCode)
      .replace(/{{dateOfBirth}}/g, formatDateForDisplay(formData.dob))
      .replace(/{{shiftDetails}}/g, formData.shiftDetails)
      .replace(/{{departmentName}}/g, formData.department)
      .replace(/{{designation}}/g, formData.designation)
      .replace(/{{reportingManager}}/g, formData.reportingTo)
      .replace(/{{startDate}}/g, formatDateForDisplay(formData.doj))
      .replace(/{{monthlyCTC}}/g, formData.monthlyCTC)
      .replace(/{{placeOfPosting}}/g, formData.location)
      .replace(/{{terminationPeriod}}/g, formData.terminationPeriod)
      .replace(/{{leaveCL}}/g, formData.leaveCL)
      .replace(/{{leaveSL}}/g, formData.leaveSL)
      .replace(/{{leaveEL}}/g, formData.leaveEL)
      .replace(/{{leavePL}}/g, formData.leavePL)
      .replace(/{{nationalHolidays}}/g, formData.holidays)
      .replace(/{{weeklyOff}}/g, formData.weeklyOff)
      .replace(/{{companyName}}/g, "TechCorp Solutions");

    const doc = new Document({
      sections: [{
        properties: {},
        children: finalContent.split('\n').map(line => {
          let alignment = AlignmentType.LEFT;
          let bold = false;
          let text = line;

          if (text.includes('::CENTER::')) {
            alignment = AlignmentType.CENTER;
            text = text.replace('::CENTER::', '').trim();
          }
          if (text.includes('::BOLD::')) {
            bold = true;
            text = text.replace('::BOLD::', '').trim();
          }

          return new Paragraph({
            alignment,
            children: [new TextRun({ text, bold, font: "Calibri", size: 22 })],
          });
        }),
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Appointment_Letter_${formData.employeeName.replace(/\s+/g, '_')}.docx`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Style to make native date picker clickable over the whole input */}
        <style>
          {`
            input[type="date"]::-webkit-calendar-picker-indicator {
              background: transparent;
              bottom: 0;
              color: transparent;
              cursor: pointer;
              height: auto;
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
              width: auto;
            }
          `}
        </style>

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
          className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              Appointment Letter – Generate & Download (DOCX)
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Front Page Section */}
            <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Front page</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400">Document No.</label>
                  <input 
                    type="text" 
                    name="documentNo"
                    value={formData.documentNo}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400">Revision No.</label>
                  <input 
                    type="text" 
                    name="revisionNo"
                    value={formData.revisionNo}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400">Revision / register date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      name="revisionDate"
                      value={formData.revisionDate}
                      onChange={handleChange}
                      className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                    />
                    <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Selection Row */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[150px]">
                <CustomSelect 
                  options={['All', 'Worker', 'Candidate']} 
                  value={formData.useFor} 
                  onChange={(val) => handleSelectChange('useFor', val)} 
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <CustomSelect 
                  options={['English', 'Hindi', 'Gujarati']} 
                  value={formData.language} 
                  onChange={(val) => handleSelectChange('language', val)} 
                />
              </div>

              <button 
                onClick={() => setFormData(prev => ({ ...prev, letterContent: defaultTemplate }))}
                className="px-6 h-11 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Default
              </button>
              <button className="px-6 h-11 bg-[#6366f1] text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                Save format
              </button>
            </div>

            {/* Letter Content Editor */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-[11px] font-bold text-gray-500">
                  Letter content <span className="font-normal text-gray-400">(edit below; use {"{{placeholderName}}"} for dynamic values)</span>
                </label>
              </div>
              
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1">
                  <button onClick={() => applyFormatting('BOLD')} className="p-2 hover:bg-white rounded-lg transition-all text-gray-600"><Bold size={14} /></button>
                  <button onClick={() => applyFormatting('ITALIC')} className="p-2 hover:bg-white rounded-lg transition-all text-gray-600"><Italic size={14} /></button>
                  <button onClick={() => applyFormatting('UNDERLINE')} className="p-2 hover:bg-white rounded-lg transition-all text-gray-600"><Underline size={14} /></button>
                  <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
                  <button onClick={() => applyFormatting('LIST')} className="p-2 hover:bg-white rounded-lg transition-all text-gray-600"><List size={14} /></button>
                </div>
                <textarea 
                  id="letter-editor"
                  name="letterContent"
                  value={formData.letterContent}
                  onChange={handleChange}
                  className="w-full h-80 p-6 text-[11px] font-medium leading-relaxed text-gray-700 outline-none resize-none"
                />
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                <p className="text-[10px] font-medium text-blue-600 leading-relaxed">
                  <span className="font-bold">Dynamic fields:</span> {"{{appointmentDate}}, {{companyName}}, {{employeeName}}, {{employeeAddress}}, {{employeeMobileNumber}}, {{employeeEmail}}, {{departmentName}}, {{designation}}, {{reportingManager}}, {{startDate}}, {{monthlyCTC}}, {{placeOfPosting}}, {{probationPeriod}}, {{noticePeriod}}, {{terminationPeriod}}, {{leaveCL}}, {{leaveSL}}, {{leaveEL}}, {{leavePL}}, {{nationalHolidays}}, {{weeklyOff}}, {{incrementMonth}}, {{employeeIdNumber}}, {{employeeJoinedDate}}, {{dateOfBirth}}, {{shiftDetails}}, {{documentNo}}, {{revisionNo}}, {{documentRevisionDate}}"}
                </p>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Offer Details Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-800">Offer Details (auto from Offer Letter)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500">Employee Name *</label>
                  <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Employee Code</label>
                  <input type="text" name="employeeCode" value={formData.employeeCode} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Date of birth</label>
                  <div className="relative">
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                    <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500">Aadhar No.</label>
                  <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500">Shift details</label>
                  <textarea name="shiftDetails" value={formData.shiftDetails} onChange={handleChange} className="w-full h-20 p-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Mobile *</label>
                  <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Email</label>
                  <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500">Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} className="w-full h-20 p-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Department *</label>
                  <CustomSelect 
                    options={['Account', 'HR', 'Production', 'Dispatch', 'HH']} 
                    value={formData.department} 
                    onChange={(val) => handleSelectChange('department', val)} 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Designation *</label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Reporting To *</label>
                  <input type="text" name="reportingTo" value={formData.reportingTo} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Date of Joining *</label>
                  <div className="relative">
                    <input type="date" name="doj" value={formData.doj} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                    <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Monthly CTC (₹)</label>
                  <input type="text" name="monthlyCTC" value={formData.monthlyCTC} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Appointment Extras Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-800">Appointment Extras (editable)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Termination Period (months)</label>
                  <input type="text" name="terminationPeriod" value={formData.terminationPeriod} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Job (Posting) Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Leave C.L.</label>
                  <input type="text" name="leaveCL" value={formData.leaveCL} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Leave S.L.</label>
                  <input type="text" name="leaveSL" value={formData.leaveSL} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Leave E.L.</label>
                  <input type="text" name="leaveEL" value={formData.leaveEL} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500">Leave P.L.</label>
                  <input type="text" name="leavePL" value={formData.leavePL} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500">National Holidays</label>
                  <input type="text" name="holidays" value={formData.holidays} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500">Weekly Off</label>
                  <input type="text" name="weeklyOff" value={formData.weeklyOff} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button 
                onClick={onClose}
                className="px-8 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={generateDocx}
                className="px-8 py-3 bg-[#0066cc] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                <Download size={14} /> Generate DOCX
              </button>
            </div>

            {/* Print Formats */}
            <div className="space-y-4 pt-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Direct Print Formats (Hindi/Gujarati)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button onClick={() => window.print()} className="flex flex-col items-center justify-center p-3 border border-blue-100 rounded-xl hover:bg-blue-50 transition-all group">
                  <Printer size={16} className="text-[#0066cc] mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold text-[#0066cc]">Format 1</span>
                  <span className="text-[8px] font-bold text-gray-400">(Rules)</span>
                </button>
                <button onClick={() => window.print()} className="flex flex-col items-center justify-center p-3 border border-purple-100 rounded-xl hover:bg-purple-50 transition-all group">
                  <Printer size={16} className="text-[#a855f7] mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold text-[#a855f7]">Format 2</span>
                  <span className="text-[8px] font-bold text-gray-400">(Letter)</span>
                </button>
                <button onClick={() => window.print()} className="flex flex-col items-center justify-center p-3 border border-green-100 rounded-xl hover:bg-green-50 transition-all group">
                  <Printer size={16} className="text-[#22c55e] mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold text-[#22c55e]">Format 3</span>
                  <span className="text-[8px] font-bold text-gray-400">(Detailed)</span>
                </button>
                <button onClick={() => window.print()} className="flex flex-col items-center justify-center p-3 border border-red-100 rounded-xl hover:bg-red-50 transition-all group">
                  <Printer size={16} className="text-[#dc2626] mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold text-[#dc2626]">Format 4</span>
                  <span className="text-[8px] font-bold text-gray-400">(Formal)</span>
                </button>
              </div>
              <button onClick={() => window.print()} className="w-full flex items-center justify-center gap-2 p-3 border border-orange-100 rounded-xl hover:bg-orange-50 transition-all group">
                <Printer size={16} className="text-[#f97316] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold text-[#f97316]">Format 5 (Numbered)</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AppointmentModal;
