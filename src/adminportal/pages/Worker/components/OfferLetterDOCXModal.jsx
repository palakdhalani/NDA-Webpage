import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronDown, Link2, Copy, FileText, Bold, Italic, Underline, AlignLeft } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import CustomSelect from '../../../components/ui/CustomSelect';



const OfferLetterDOCXModal = ({ isOpen, onClose, worker }) => {
  const [formData, setFormData] = useState({
    workerName: worker?.name || 'FDF',
    mobile: 'FDFD',
    email: '',
    address: 'DFD',
    department: 'FD',
    designation: 'DFD',
    reportingTo: 'FD Head',
    dateOfJoining: '2026-05-16',
    salary: '',
    dutyTime: '',
    placeOfPosting: 'Rajkot',
    probation: '3',
    noticePeriod: '3',
    paidLeaves: '15',
    casualLeaves: '4',
    weeklyOff: 'Wednesday',
    incrementMonth: 'August',
    otp: '',
    letterContent: `OFFER LETTER

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
{{companyName}}`
  });

  const generateDOCX = async () => {
    const placeholders = {
      '{{appointmentDate}}': formData.dateOfJoining,
      '{{companyName}}': 'TechCorp Solutions',
      '{{employeeName}}': formData.workerName,
      '{{employeeAddress}}': formData.address,
      '{{employeeMobileNumber}}': formData.mobile,
      '{{employeeEmail}}': formData.email,
      '{{designation}}': formData.designation,
      '{{departmentName}}': formData.department,
      '{{startDate}}': formData.dateOfJoining,
      '{{placeOfPosting}}': formData.placeOfPosting,
      '{{reportingManager}}': formData.reportingTo,
      '{{monthlyCTC}}': formData.salary,
      '{{probationPeriod}}': formData.probation,
      '{{noticePeriod}}': formData.noticePeriod,
      '{{paidLeavesPerAnnum}}': formData.paidLeaves,
      '{{casualSickLeaves}}': formData.casualLeaves,
      '{{weeklyOffDay}}': formData.weeklyOff,
      '{{incrementMonth}}': formData.incrementMonth,
    };

    let content = formData.letterContent;
    Object.keys(placeholders).forEach(key => {
      content = content.replaceAll(key, placeholders[key] || '');
    });

    const lines = content.split('\n');
    const paragraphs = lines.map(line => {
      if (line.trim() === 'OFFER LETTER') {
        return new Paragraph({
          children: [new TextRun({ text: line, bold: true, size: 32, font: 'Times New Roman' })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        });
      }
      
      const isBold = line.startsWith('Subject:') || line.startsWith('Terms of Employment:');
      
      return new Paragraph({
        children: [
          new TextRun({
            text: line,
            bold: isBold,
            size: 24,
            font: 'Times New Roman',
          }),
        ],
        spacing: { after: 120 },
      });
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs,
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Offer_Letter_${formData.workerName.replace(/\s+/g, '_')}.docx`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl my-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Offer Letter – Generate & Download (DOCX)</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Select Worker */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              Select Worker <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              options={['Sample Employee', 'FDF', 'Dev Worker', 'Ramanuj', 'Abc']}
              value={formData.workerName}
              onChange={(val) => setFormData({ ...formData, workerName: val })}
              className="w-full"
            />
          </div>


          {/* Letter Content */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              Letter content <span className="text-[10px] lowercase font-normal text-gray-400">(edit below; use &#123;&#123;placeholderName&#125;&#125; for dynamic values)</span>
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                <button className="p-1.5 hover:bg-white rounded transition-all"><Bold size={14} className="text-gray-600" /></button>
                <button className="p-1.5 hover:bg-white rounded transition-all"><Italic size={14} className="text-gray-600" /></button>
                <button className="p-1.5 hover:bg-white rounded transition-all"><Underline size={14} className="text-gray-600" /></button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <button className="p-1.5 hover:bg-white rounded transition-all"><AlignLeft size={14} className="text-gray-600" /></button>
              </div>
              <textarea
                className="w-full p-4 text-[13px] leading-relaxed text-gray-600 outline-none min-h-[200px] resize-y"
                value={formData.letterContent}
                onChange={(e) => setFormData({ ...formData, letterContent: e.target.value })}
              />
            </div>
            <p className="text-[11px] text-gray-400 leading-tight">
              <span className="font-bold text-gray-500">Dynamic fields:</span> Placeholders: employeeName, employeeAddress, employeeMobileNumber, employeeEmail, companyName, designation, departmentName, reportingManager, startDate, monthlyCTC, placeOfPosting, probationPeriod, noticePeriod, paidLeavesPerAnnum, casualSickLeaves, weeklyOffDay, incrementMonth, appointmentDate
            </p>
          </div>

          {/* OTP */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              OTP (optional)
            </label>
            <input
              type="text"
              placeholder="Enter OTP if required"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
            />
          </div>

          {/* Joining document submit link */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 space-y-3">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Link2 size={16} /> Joining document submit link
            </div>
            <p className="text-[10px] text-gray-500 leading-tight">
              Link is auto-generated when you select a person. Same link is stored and visible on Joining Documents page. Use Copy to share.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 transition-all whitespace-nowrap shadow-sm">
                Get & copy link
              </button>
              <input
                readOnly
                value="https://ndatechnology.in/public/submit-docume"
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-[11px] font-medium text-gray-500 outline-none"
              />
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5">
                <Copy size={12} /> Copy
              </button>
            </div>
          </div>

          {/* Offer Details Divider */}
          <div className="pt-2">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Offer Details</h3>
          </div>

          {/* Grid Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Employee Name *</label>
              <input
                type="text"
                value={formData.workerName}
                onChange={(e) => setFormData({ ...formData, workerName: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Mobile *</label>
                <input
                  type="text"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Address *</label>
              <div className="relative">
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none min-h-[80px] resize-none"
                />
                <div className="absolute right-2 bottom-2 text-gray-300">
                  <AlignLeft size={16} className="rotate-90" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Department *</label>
            <CustomSelect
              options={['FD', 'Account', 'Dispatch', 'HR', 'Production', 'Purchase', 'Test']}
              value={formData.department}
              onChange={(val) => setFormData({ ...formData, department: val })}
              className="w-full"
            />
          </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Designation *</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Reporting To *</label>
              <input
                type="text"
                value={formData.reportingTo}
                onChange={(e) => setFormData({ ...formData, reportingTo: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Date of Joining *</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dateOfJoining}
                  onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none appearance-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Salary / CTC (₹)</label>
              <input
                type="text"
                placeholder="Monthly CTC"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Duty Time</label>
              <input
                type="text"
                placeholder="e.g. 9:30 AM to 6:30 PM"
                value={formData.dutyTime}
                onChange={(e) => setFormData({ ...formData, dutyTime: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Place of Posting</label>
              <input
                type="text"
                value={formData.placeOfPosting}
                onChange={(e) => setFormData({ ...formData, placeOfPosting: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Probation (months)</label>
              <input
                type="number"
                value={formData.probation}
                onChange={(e) => setFormData({ ...formData, probation: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Notice Period (months)</label>
              <input
                type="number"
                value={formData.noticePeriod}
                onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Paid Leaves/Year</label>
              <input
                type="number"
                value={formData.paidLeaves}
                onChange={(e) => setFormData({ ...formData, paidLeaves: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Casual/Sick Leaves</label>
              <input
                type="number"
                value={formData.casualLeaves}
                onChange={(e) => setFormData({ ...formData, casualLeaves: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Weekly Off</label>
              <input
                type="text"
                value={formData.weeklyOff}
                onChange={(e) => setFormData({ ...formData, weeklyOff: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Increment Month</label>
              <input
                type="text"
                value={formData.incrementMonth}
                onChange={(e) => setFormData({ ...formData, incrementMonth: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/30 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 text-gray-600 text-[13px] font-bold rounded-lg hover:bg-white hover:border-gray-300 transition-all shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={generateDOCX}
            className="px-6 py-2 bg-[#0052cc] text-white text-[13px] font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
          >
            <FileText size={16} /> Generate & Download DOCX
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default OfferLetterDOCXModal;
