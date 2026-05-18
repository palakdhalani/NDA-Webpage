import React, { useState, useEffect } from 'react';
import { X, Calendar, TrendingUp, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSelect from '../../../components/ui/CustomSelect.jsx';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const PromotionModal = ({ isOpen, onClose, employee }) => {
  const [formData, setFormData] = useState({
    newDesignation: "",
    newDepartment: "",
    newMonthlyCTC: "",
    effectiveDate: new Date().toISOString().split('T')[0],
    remarks: "",
    letterContent: ""
  });
  const [isGenerated, setIsGenerated] = useState(false);

  const defaultTemplate = `Promotion Letter
Date: {{effectiveDate}}

To,
{{employeeName}}
{{employeeAddress}}
{{employeeMobileNumber}}

Subject: Promotion - Change in Designation / Department / Salary

Dear {{employeeName}},

With reference to your employment with {{companyName}}, we are pleased to inform you that you are hereby promoted with the following changes with effect from {{effectiveDate}}:

• Previous Designation: {{previousDesignation}}
  New Designation: {{newDesignation}}

• Previous Department: {{previousDepartment}}
  New Department: {{newDepartment}}

• Previous Monthly CTC: {{previousSalary}}
  New Monthly CTC: {{newSalary}}

Remarks: {{remarks}}

Other terms and conditions of your appointment letter remain unchanged. Congratulations on your promotion.

Yours faithfully,
For, {{companyName}}

______________________
Authorized Signatory`;

  useEffect(() => {
    if (employee) {
      setFormData(prev => ({
        ...prev,
        newDesignation: employee.subtitle || "",
        newDepartment: employee.dept || "",
        newMonthlyCTC: "50000", // Default or current
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

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const generateDocx = async () => {
    let finalContent = formData.letterContent
      .replace(/{{effectiveDate}}/g, formatDateForDisplay(formData.effectiveDate))
      .replace(/{{employeeName}}/g, employee?.name || "")
      .replace(/{{employeeAddress}}/g, "Nr. Padavala Village, shapar")
      .replace(/{{employeeMobileNumber}}/g, "9081133669")
      .replace(/{{companyName}}/g, "TechCorp Solutions")
      .replace(/{{previousDesignation}}/g, employee?.subtitle || "")
      .replace(/{{newDesignation}}/g, formData.newDesignation)
      .replace(/{{previousDepartment}}/g, employee?.dept || "")
      .replace(/{{newDepartment}}/g, formData.newDepartment)
      .replace(/{{previousSalary}}/g, "50000")
      .replace(/{{newSalary}}/g, formData.newMonthlyCTC)
      .replace(/{{remarks}}/g, formData.remarks || "N/A");

    const doc = new Document({
      sections: [{
        properties: {},
        children: finalContent.split('\n').map(line => {
          return new Paragraph({
            children: [new TextRun({ text: line, font: "Calibri", size: 22 })],
          });
        }),
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Promotion_Letter_${employee?.name.replace(/\s+/g, '_')}.docx`);
    setIsGenerated(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
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
          className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <TrendingUp size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Promote Employee</h2>
                <p className="text-sm font-bold text-gray-400">{employee?.name || "Jayesh m karavadara"}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 pt-0 space-y-6">
            
            {/* Current Details Card */}
            <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Current Details</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-[11px] font-bold text-gray-400">Designation:</p>
                  <p className="text-sm font-bold text-gray-800">{employee?.subtitle || "DFD"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400">Department:</p>
                  <p className="text-sm font-bold text-gray-800">{employee?.dept || "Account"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400">Monthly CTC:</p>
                  <p className="text-sm font-bold text-gray-800">₹50,000</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400">Annual CTC:</p>
                  <p className="text-sm font-bold text-gray-800">₹6,00,000</p>
                </div>
              </div>
            </div>

            {/* Letter Content Preview */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500">Dynamic letter content</label>
              <textarea 
                value={formData.letterContent}
                onChange={handleChange}
                name="letterContent"
                className="w-full h-48 p-4 bg-white border border-gray-200 rounded-xl text-[11px] font-mono text-gray-600 outline-none focus:border-blue-500 transition-all resize-none overflow-y-auto"
              />
              <p className="text-[10px] font-medium text-gray-400 italic">
                Use fields like {"{{employeeName}}, {{newDesignation}}, {{effectiveDate}}, {{newSalary}}"}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">New Designation *</label>
                <input 
                  type="text" 
                  name="newDesignation"
                  value={formData.newDesignation}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-orange-500 transition-all" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">New Department *</label>
                <CustomSelect 
                  options={['Account', 'HR', 'Production', 'Dispatch', 'Purchase','Test']} 
                  value={formData.newDepartment} 
                  onChange={(val) => handleSelectChange('newDepartment', val)} 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">New Monthly CTC (₹) *</label>
                <input 
                  type="text" 
                  name="newMonthlyCTC"
                  value={formData.newMonthlyCTC}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-orange-500 transition-all" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Effective Date *</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="effectiveDate"
                    value={formData.effectiveDate}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-orange-500 transition-all" 
                  />
                  <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Remarks (Optional)</label>
                <textarea 
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter remarks for this promotion..."
                  className="w-full h-24 p-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-orange-500 transition-all resize-none" 
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                console.log("Promoting:", formData);
                onClose();
              }}
              className="flex-[1.5] py-3 bg-[#e65100] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#bf360c] transition-all shadow-lg shadow-orange-100"
            >
              <TrendingUp size={14} /> Promote Employee
            </button>
            <button 
              onClick={generateDocx}
              className="flex-[1.2] py-3 bg-[#4f46e5] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-100"
            >
              <FileText size={14} /> {isGenerated ? "Regenerate" : "Generate Letter"}
            </button>
            {isGenerated && (
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={generateDocx}
                className="flex-[1.2] py-3 bg-[#10b981] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#059669] transition-all shadow-lg shadow-emerald-100"
              >
                <Download size={14} /> Download Letter
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PromotionModal;
