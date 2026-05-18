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

const OfferLetterModal = ({ isOpen, onClose, employee }) => {
  const [formData, setFormData] = useState({
    useFor: "All",
    language: "English",
    letterContent: "",
    employeeName: "",
    mobile: "",
    email: "",
    designation: "",
    department: "Account",
    reportingTo: "",
    doj: new Date().toISOString().split('T')[0],
    monthlyCTC: "0",
    probationPeriod: "3",
    noticePeriod: "1",
    paidLeavesPerAnnum: "15",
    casualSickLeaves: "7",
    weeklyOffDay: "Sunday",
    incrementMonth: "April",
    address: "",
    otp: ""
  });

  const workerTemplate = `OFFER LETTER Date: {{appointmentDate}} {{companyName}} To, {{employeeName}} {{employeeAddress}} Mobile: {{employeeMobileNumber}} Email: {{employeeEmail}} Subject: Offer of Employment – {{designation}} Dear {{employeeName}}, We are pleased to offer you the position of {{designation}} in our {{departmentName}} department at {{companyName}}. Terms of Employment: 1. Date of Joining: {{startDate}} 2. Place of Posting: {{placeOfPosting}} 3. Reporting To: {{reportingManager}} 4. Compensation: {{monthlyCTC}} (per month) – as per company policy 5. Probation Period: {{probationPeriod}} months 6. Notice Period: {{noticePeriod}} months 7. Paid Leaves per Annum: {{paidLeavesPerAnnum}} 8. Casual/Sick Leaves: {{casualSickLeaves}} 9. Weekly Off: {{weeklyOffDay}} 10. Increment Month: {{incrementMonth}} Please confirm your acceptance by signing this letter. We look forward to having you on our team. Best regards, Management {{companyName}}`;

  const candidateTemplate = `Date: {{appointmentDate}} To, {{employeeName}} {{employeeAddress}} Cell No: - {{employeeMobileNumber}} Sub: Offer Letter for the post of {{designation}}. We are pleased to offer you the position of {{designation}}. We all are excited about the potential that you will bring to our organization. As we discussed, you will be functionally reporting to {{reportingManager}} of our Company. Your initial compensation package includes of INR {{monthlyCTC}} CTC. You are required to join us latest by {{startDate}}.Rs 1000 will be deducted from 24months’ salary as Training Deposit, which will be given back to you on completion of 24th month only. We look forward to your arrival as an employee of our organization and are confident that you will play a key role in our company's growth into national and international markets. We would like to add here that at the time of leaving 3-month notice period is mandatory. If this employment offer is acceptable to you, please sign a copy of the same and return it to us. Yours truly, Head HR I accept the above-mentioned employment offer and acknowledge receiving a copy of the same. Signature__________________________ Name: Date:`;

  const defaultTemplate = `OFFER LETTER

Date: {{appointmentDate}}

{{companyName}}

To,
{{employeeName}}
{{employeeAddress}}
Mobile: {{employeeMobileNumber}}
Email: {{employeeEmail}}

Subject: Offer of Employment – {{designation}}

Dear {{employeeName}},

We are pleased to offer you the position of {{designation}} in our {{departmentName}} department at {{companyName}}.

Terms of Employment:

1. Date of Joining: {{startDate}}
2. Place of Posting: {{placeOfPosting}}
3. Reporting To: {{reportingManager}}
4. Compensation: {{monthlyCTC}} (per month) – as per company policy
5. Probation Period: {{probationPeriod}} months
6. Notice Period: {{noticePeriod}} months
7. Paid Leaves per Annum: {{paidLeavesPerAnnum}}
8. Casual/Sick Leaves: {{casualSickLeaves}}
9. Weekly Off: {{weeklyOffDay}}
10. Increment Month: {{incrementMonth}}

Please confirm your acceptance by signing this letter. We look forward to having you on our team.

Best regards,
Management
{{companyName}}`;

  useEffect(() => {
    if (employee) {
      setFormData(prev => ({
        ...prev,
        employeeName: employee.name || "",
        department: employee.dept || "Account",
        designation: employee.subtitle || "DFD",
        letterContent: defaultTemplate
      }));
    }
  }, [employee]);

  useEffect(() => {
    let template = defaultTemplate;
    if (formData.useFor === 'Worker') template = workerTemplate;
    if (formData.useFor === 'Candidate') template = candidateTemplate;
    
    setFormData(prev => ({ ...prev, letterContent: template }));
  }, [formData.useFor]);

  const handleResetToDefault = () => {
    let template = defaultTemplate;
    if (formData.useFor === 'Worker') template = workerTemplate;
    if (formData.useFor === 'Candidate') template = candidateTemplate;
    setFormData(prev => ({ ...prev, letterContent: template }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const applyFormatting = (tag) => {
    const textarea = document.getElementById('offer-letter-editor');
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
    let finalContent = formData.letterContent
      .replace(/{{appointmentDate}}/g, new Date().toLocaleDateString('en-GB').replace(/\//g, '-'))
      .replace(/{{employeeName}}/g, formData.employeeName)
      .replace(/{{employeeAddress}}/g, formData.address)
      .replace(/{{employeeMobileNumber}}/g, formData.mobile)
      .replace(/{{employeeEmail}}/g, formData.email)
      .replace(/{{departmentName}}/g, formData.department)
      .replace(/{{designation}}/g, formData.designation)
      .replace(/{{reportingManager}}/g, formData.reportingTo)
      .replace(/{{startDate}}/g, formatDateForDisplay(formData.doj))
      .replace(/{{monthlyCTC}}/g, formData.monthlyCTC)
      .replace(/{{probationPeriod}}/g, formData.probationPeriod)
      .replace(/{{noticePeriod}}/g, formData.noticePeriod)
      .replace(/{{paidLeavesPerAnnum}}/g, formData.paidLeavesPerAnnum)
      .replace(/{{casualSickLeaves}}/g, formData.casualSickLeaves)
      .replace(/{{weeklyOffDay}}/g, formData.weeklyOffDay)
      .replace(/{{incrementMonth}}/g, formData.incrementMonth)
      .replace(/{{companyName}}/g, "TechCorp Solutions")
      .replace(/{{placeOfPosting}}/g, "Main Office");

    const doc = new Document({
      sections: [{
        properties: {},
        children: finalContent.split('\n').map(line => {
          let alignment = AlignmentType.LEFT;
          let bold = false;
          let text = line;

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
    saveAs(blob, `Offer_Letter_${formData.employeeName.replace(/\s+/g, '_')}.docx`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
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
          className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              Offer Letter - Generate & Download (DOCX)
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Selection Row */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[150px]">
                <CustomSelect 
                  options={['Use for: All', 'Worker', 'Candidate']} 
                  value={"Use for: " + formData.useFor} 
                  onChange={(val) => handleSelectChange('useFor', val.replace('Use for: ', ''))} 
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <CustomSelect 
                  options={['Language: English', 'Hindi', 'Gujarati']} 
                  value={"Language: " + formData.language} 
                  onChange={(val) => handleSelectChange('language', val.replace('Language: ', ''))} 
                />
              </div>

              <button 
                onClick={handleResetToDefault}
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
                  id="offer-letter-editor"
                  name="letterContent"
                  value={formData.letterContent}
                  onChange={handleChange}
                  className="w-full h-80 p-6 text-[11px] font-medium leading-relaxed text-gray-700 outline-none resize-none"
                />
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                <p className="text-[10px] font-medium text-blue-600 leading-relaxed">
                  <span className="font-bold tracking-tight">Dynamic fields:</span> {"{{appointmentDate}}, {{companyName}}, {{employeeName}}, {{employeeAddress}}, {{employeeMobileNumber}}, {{employeeEmail}}, {{designation}}, {{departmentName}}, {{startDate}}, {{placeOfPosting}}, {{reportingManager}}, {{monthlyCTC}}, {{probationPeriod}}, {{noticePeriod}}, {{paidLeavesPerAnnum}}, {{casualSickLeaves}}, {{weeklyOffDay}}, {{incrementMonth}}"}
                </p>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Offer Details Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-800">Offer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <input type="text" name="employeeName" placeholder="Employee Name" value={formData.employeeName} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <CustomSelect 
                    options={['Account', 'HR', 'Production', 'Dispatch','Purchase', 'Test']} 
                    value={formData.department} 
                    onChange={(val) => handleSelectChange('department', val)} 
                  />
                </div>
                <div className="space-y-1.5">
                  <input type="text" name="reportingTo" placeholder="Reporting To" value={formData.reportingTo} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <div className="relative">
                    <input type="date" name="doj" value={formData.doj} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                    <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <input type="number" name="monthlyCTC" placeholder="Monthly CTC (₹)" value={formData.monthlyCTC} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <input type="text" name="probationPeriod" placeholder="Probation Period (months)" value={formData.probationPeriod} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <input type="text" name="noticePeriod" placeholder="Notice Period (months)" value={formData.noticePeriod} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <input type="text" name="paidLeavesPerAnnum" placeholder="Paid Leaves Per Annum" value={formData.paidLeavesPerAnnum} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <input type="text" name="casualSickLeaves" placeholder="Casual/Sick Leaves" value={formData.casualSickLeaves} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <input type="text" name="weeklyOffDay" placeholder="Weekly Off Day" value={formData.weeklyOffDay} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <input type="text" name="incrementMonth" placeholder="Increment Month" value={formData.incrementMonth} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full h-24 p-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none resize-none" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                   <input type="text" name="otp" placeholder="OTP (optional)" value={formData.otp} onChange={handleChange} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none" />
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
            <div className="space-y-4 pt-6 pb-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">DIRECT PRINT FORMATS</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-3 border border-blue-100 rounded-xl hover:bg-blue-50 transition-all text-[#0066cc]">
                  <Printer size={14} />
                  <span className="text-[10px] font-bold">Format 1 (Modern)</span>
                </button>
                <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-3 border border-indigo-100 rounded-xl hover:bg-indigo-50 transition-all text-[#6366f1]">
                  <Printer size={14} />
                  <span className="text-[10px] font-bold">Format 2 (Detailed)</span>
                </button>
                <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-3 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-all text-[#10b981]">
                  <Printer size={14} />
                  <span className="text-[10px] font-bold">Format 3 (Concise)</span>
                </button>
                <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-3 border border-rose-100 rounded-xl hover:bg-rose-50 transition-all text-[#f43f5e]">
                  <Printer size={14} />
                  <span className="text-[10px] font-bold">Format 4 (Formal)</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OfferLetterModal;
