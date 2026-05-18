import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, Download, Printer, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const ConfirmationModal = ({ isOpen, onClose, employee }) => {
  const [formData, setFormData] = useState({
    confirmationDate: new Date().toISOString().split('T')[0],
    remarks: "",
    letterContent: ""
  });
  const [isGenerated, setIsGenerated] = useState(false);

  const defaultTemplate = `Confirmation Letter
Date: {{confirmationDate}}

To,
{{employeeName}}
{{employeeIdNumber}}

Subject: Confirmation of Employment

Dear {{employeeName}},

Further to your appointment dated {{startDate}}, we are pleased to inform you that you have successfully completed your probation period.

Your employment with {{companyName}} is hereby confirmed with effect from {{confirmationDate}}.

All other terms and conditions of your employment as mentioned in your appointment letter remain unchanged.

We congratulate you on this confirmation and look forward to your continued association with us.

Yours faithfully,
For, {{companyName}}

______________________
Authorized Signatory`;

  useEffect(() => {
    if (employee) {
      setFormData(prev => ({
        ...prev,
        letterContent: defaultTemplate
      }));
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const generateDocx = async () => {
    let finalContent = formData.letterContent
      .replace(/{{confirmationDate}}/g, formatDateForDisplay(formData.confirmationDate))
      .replace(/{{employeeName}}/g, employee?.name || "")
      .replace(/{{employeeIdNumber}}/g, employee?.code || "")
      .replace(/{{startDate}}/g, "30-04-2026")
      .replace(/{{companyName}}/g, "TechCorp Solutions");

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
    saveAs(blob, `Confirmation_Letter_${employee?.name.replace(/\s+/g, '_')}.docx`);
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
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Confirm Employee</h2>
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
            
            {/* Probation Details Card */}
            <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Probation Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-[11px] font-bold text-gray-400">Designation:</p>
                  <p className="text-[11px] font-bold text-gray-800">{employee?.subtitle || "DFD"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[11px] font-bold text-gray-400">Probation Period:</p>
                  <p className="text-[11px] font-bold text-gray-800">3 months</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[11px] font-bold text-gray-400">Date of Joining:</p>
                  <p className="text-[11px] font-bold text-gray-800">30 Apr 2026</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[11px] font-bold text-gray-400">Expected Confirmation:</p>
                  <p className="text-[11px] font-bold text-gray-800">30 Jul 2026</p>
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
                Use fields like {"{{employeeName}}, {{designation}}, {{confirmationDate}}, {{monthlyCTC}}"}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Confirmation Date *</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="confirmationDate"
                    value={formData.confirmationDate}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-green-500 transition-all" 
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
                  placeholder="Add any remarks for this confirmation..."
                  className="w-full h-24 p-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-green-500 transition-all resize-none" 
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex flex-wrap gap-2">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => window.print()}
              className="flex-1 py-2.5 bg-[#4f46e5] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-100"
            >
              <Printer size={14} /> Print Letter
            </button>
            <button 
              onClick={() => {
                console.log("Confirming:", formData);
                onClose();
              }}
              className="flex-1 py-2.5 bg-[#10b981] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#059669] transition-all shadow-lg shadow-emerald-100"
            >
              <CheckCircle2 size={14} /> Confirm Employee
            </button>
            <button 
              onClick={generateDocx}
              className="flex-1 py-2.5 bg-[#4f46e5] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-100"
            >
              <FileText size={14} /> {isGenerated ? "Download" : "Generate Letter"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
