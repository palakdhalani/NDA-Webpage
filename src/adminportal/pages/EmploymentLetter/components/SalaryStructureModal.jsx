import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Download, FileText, File as FilePdf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSelect from '../../../components/ui/CustomSelect.jsx';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  AlignmentType,
  VerticalAlign,
  Header
} from 'docx';
import { saveAs } from 'file-saver';

const SalaryStructureModal = ({ isOpen, onClose, employee }) => {
  const [formData, setFormData] = useState({
    annexureRef: "A",
    salaryType: "Annual CTC Based",
    monthlyCTC: 0,
    dailyRate: 0,
    pfSelection: "PF (Provident Fund)",
    components: [
      { id: 1, name: "Basic Salary", percentage: 40 },
      { id: 2, name: "House Rent Allowance (HRA)", percentage: 20 },
      { id: 3, name: "Conveyance Allowance", percentage: 10 },
      { id: 4, name: "Medical Allowance", percentage: 4.17 },
      { id: 5, name: "Special Allowance", percentage: 25.83 }
    ],
    deductions: [],
    contributions: []
  });

  const [calculations, setCalculations] = useState({
    monthlyGross: 0,
    annualGross: 0,
    employerPF: 0,
    netTakeHome: 0,
    totalCTC: 0
  });

  useEffect(() => {
    let baseMonthlyCTC = 0;
    if (formData.salaryType === 'Daily Wage Based') {
      baseMonthlyCTC = (parseFloat(formData.dailyRate) || 0) * 26;
    } else {
      baseMonthlyCTC = parseFloat(formData.monthlyCTC) || 0;
    }
    
    // Calculate components
    const updatedComponents = formData.components.map(comp => ({
      ...comp,
      monthly: (baseMonthlyCTC * comp.percentage) / 100,
      annual: ((baseMonthlyCTC * comp.percentage) / 100) * 12
    }));

    const monthlyGross = updatedComponents.reduce((acc, curr) => acc + curr.monthly, 0);
    
    // PF Calculation
    const basicComp = updatedComponents.find(c => c.name === "Basic Salary");
    const basicValue = basicComp ? basicComp.monthly : 0;
    let employerPF = 0;
    if (formData.pfSelection.includes("PF")) {
      employerPF = basicValue >= 15000 ? 1800 : (basicValue * 0.12);
    }

    const totalDeductions = formData.deductions.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    const netTakeHome = monthlyGross - employerPF - totalDeductions;
    const totalCTC = monthlyGross + employerPF;

    setCalculations({
      monthlyGross,
      annualGross: monthlyGross * 12,
      employerPF,
      netTakeHome,
      totalCTC
    });
  }, [formData]);

  const generateDocx = async () => {
    const baseMonthly = formData.salaryType === 'Daily Wage Based' 
      ? (parseFloat(formData.dailyRate) || 0) * 26 
      : (parseFloat(formData.monthlyCTC) || 0);

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: `Annexure – '${formData.annexureRef}'`, bold: true, size: 28 }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Employee Name: " + (employee?.name || ""))], width: { size: 50, type: WidthType.PERCENTAGE } }),
                  new TableCell({ children: [new Paragraph("Department: " + (employee?.dept || ""))], width: { size: 50, type: WidthType.PERCENTAGE } }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Designation: " + (employee?.subtitle || ""))] }),
                  new TableCell({ children: [new Paragraph("Date of Joining: 30-Apr-2026")] }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Salary Components", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "%", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Monthly (₹)", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Annual (₹)", bold: true })] })] }),
                ],
              }),
              ...formData.components.map(comp => (
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph(comp.name)] }),
                    new TableCell({ children: [new Paragraph(comp.percentage.toString() + "%")] }),
                    new TableCell({ children: [new Paragraph("₹" + ((baseMonthly * comp.percentage) / 100).toLocaleString())] }),
                    new TableCell({ children: [new Paragraph("₹" + (((baseMonthly * comp.percentage) / 100) * 12).toLocaleString())] }),
                  ],
                })
              )),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Gross Salary", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph("")] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "₹" + calculations.monthlyGross.toLocaleString(), bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "₹" + calculations.annualGross.toLocaleString(), bold: true })] })] }),
                ],
              }),
            ],
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Salary_Annexure_${employee?.name.replace(/\s+/g, '_')}.docx`);
  };

  const generatePdf = () => {
    window.print();
  };

  if (!isOpen) return null;

  const handleAddComponent = () => {
    setFormData(prev => ({
      ...prev,
      components: [...prev.components, { id: Date.now(), name: "", percentage: 0 }]
    }));
  };

  const handleRemoveComponent = (id) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== id)
    }));
  };

  const handleComponentChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const handleAddDeduction = () => {
    setFormData(prev => ({
      ...prev,
      deductions: [...prev.deductions, { id: Date.now(), name: "", amount: 0 }]
    }));
  };

  const handleRemoveDeduction = (id) => {
    setFormData(prev => ({
      ...prev,
      deductions: prev.deductions.filter(d => d.id !== id)
    }));
  };

  const handleDeductionChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      deductions: prev.deductions.map(d => d.id === id ? { ...d, [field]: value } : d)
    }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
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
          className="relative w-full max-w-3xl bg-white rounded-[1.5rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-lg font-bold text-gray-800">
              Annexure – 'salary structure'
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Top Config */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-red-500">Annexure reference *</label>
                <input 
                  type="text" 
                  value={formData.annexureRef}
                  onChange={(e) => setFormData({...formData, annexureRef: e.target.value})}
                  className="w-full h-10 px-4 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none focus:border-blue-500" 
                />
                <p className="text-[10px] text-gray-400">Shown as Annexure – 'A' in this structure. Use Roman numerals or any label your policy requires.</p>
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-sm font-bold text-gray-600">
                  Estimated Monthly CTC: <span className="text-blue-600 font-bold">₹{calculations.totalCTC.toLocaleString()}</span> 
                  <span className="text-[10px] text-gray-400 ml-2">(Annual: ₹{(calculations.totalCTC * 12).toLocaleString()})</span>
                </p>
              </div>
            </div>

            {/* Employee Details Static Card */}
            <div className="bg-[#f0f7ff] border border-blue-50 rounded-2xl p-6 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-gray-500 tracking-tight">Employee Name</p>
                <input disabled value={employee?.name || "rajat Kumar Sinha"} className="w-full bg-white border border-gray-200 rounded-lg h-10 px-4 text-xs font-bold text-gray-700" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-gray-500 tracking-tight">Department</p>
                <input disabled value={employee?.dept || "Account"} className="w-full bg-white border border-gray-200 rounded-lg h-10 px-4 text-xs font-bold text-gray-700" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-gray-500 tracking-tight">Designation</p>
                <input disabled value={employee?.subtitle || "DFD"} className="w-full bg-white border border-gray-200 rounded-lg h-10 px-4 text-xs font-bold text-gray-700" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-gray-500 tracking-tight">Date of Joining</p>
                <input disabled value="30-Apr-2026" className="w-full bg-white border border-gray-200 rounded-lg h-10 px-4 text-xs font-bold text-gray-700" />
              </div>
            </div>

            {/* Salary Type Selection */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-red-500">Salary Structure Type *</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="salaryType" 
                    checked={formData.salaryType === 'Annual CTC Based'} 
                    onChange={() => setFormData({...formData, salaryType: 'Annual CTC Based'})}
                    className="w-4 h-4 text-blue-600" 
                  />
                  <span className="text-xs font-bold text-gray-600">Annual CTC Based</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="salaryType" 
                    checked={formData.salaryType === 'Daily Wage Based'} 
                    onChange={() => setFormData({...formData, salaryType: 'Daily Wage Based'})}
                    className="w-4 h-4 text-blue-600" 
                  />
                  <span className="text-xs font-bold text-gray-600">Daily Wage Based</span>
                </label>
              </div>
            </div>

            {/* CTC Inputs */}
            <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-red-500">
                    {formData.salaryType === 'Daily Wage Based' ? "Skilled Manpower Daily Rate (₹) *" : "Monthly CTC (₹) *"}
                  </label>
                  <input 
                    type="number" 
                    placeholder={formData.salaryType === 'Daily Wage Based' ? "0" : "Enter monthly CTC"}
                    value={formData.salaryType === 'Daily Wage Based' ? formData.dailyRate : formData.monthlyCTC}
                    onChange={(e) => setFormData({...formData, [formData.salaryType === 'Daily Wage Based' ? 'dailyRate' : 'monthlyCTC']: e.target.value})}
                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-blue-500 transition-all" 
                  />
                  {formData.salaryType === 'Daily Wage Based' ? (
                    <p className="text-[10px] text-gray-400 font-bold">
                      Estimated Monthly CTC: ₹{((parseFloat(formData.dailyRate) || 0) * 26).toLocaleString()} | Annual CTC: ₹{((parseFloat(formData.dailyRate) || 0) * 26 * 12).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-[10px] text-gray-400 font-bold">
                      Annual equivalent: ₹{(parseFloat(formData.monthlyCTC) * 12 || 0).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-red-500">PF / NPF Selection *</label>
                  <CustomSelect 
                    options={['PF (Provident Fund)', 'NPF (Non-PF)']} 
                    value={formData.pfSelection} 
                    onChange={(val) => setFormData({...formData, pfSelection: val})} 
                  />
                  <p className="text-[10px] text-gray-400 tracking-tight font-medium">NPF select karne par PF deduction/contribution 0 ho jayega.</p>
                </div>
              </div>
            </div>

            {/* Salary Components Table */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Salary Components *</h3>
                <button 
                  onClick={handleAddComponent}
                  className="px-4 py-1.5 bg-[#e0f2fe] text-[#0369a1] rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:bg-blue-100 transition-colors"
                >
                  <Plus size={14} /> Add Component
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-r border-gray-200">Component</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-r border-gray-200 w-24">%</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-r border-gray-200">Monthly (₹)</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-r border-gray-200">Annual (₹)</th>
                      <th className="text-center px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.components.map((comp) => {
                      const baseMonthly = formData.salaryType === 'Daily Wage Based' 
                        ? (parseFloat(formData.dailyRate) || 0) * 26 
                        : (parseFloat(formData.monthlyCTC) || 0);
                      
                      return (
                        <tr key={comp.id} className="border-b border-gray-100 last:border-0 group">
                          <td className="px-4 py-3 border-r border-gray-200">
                            <input 
                              type="text" 
                              value={comp.name} 
                              placeholder="Component name"
                              onChange={(e) => handleComponentChange(comp.id, 'name', e.target.value)}
                              className="w-full h-9 px-3 border border-gray-200 rounded-md text-[11px] font-bold text-gray-600 focus:border-blue-500" 
                            />
                          </td>
                          <td className="px-4 py-3 border-r border-gray-200">
                            <input 
                              type="number" 
                              value={comp.percentage} 
                              onChange={(e) => handleComponentChange(comp.id, 'percentage', e.target.value)}
                              className="w-full h-9 px-3 border border-gray-200 rounded-md text-[11px] font-bold text-gray-600 focus:border-blue-500" 
                            />
                          </td>
                          <td className="px-4 py-3 border-r border-gray-200 text-[11px] font-bold text-gray-700">
                            ₹{((baseMonthly * comp.percentage) / 100 || 0).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 border-r border-gray-200 text-[11px] font-bold text-gray-700">
                            ₹{(((baseMonthly * comp.percentage) / 100) * 12 || 0).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {comp.name !== "Basic Salary" && (
                              <button 
                                onClick={() => handleRemoveComponent(comp.id)}
                                className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                            {comp.name === "Basic Salary" && <span className="text-gray-300">—</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations Section */}
            <div className="space-y-4">
              {/* Gross Salary */}
              <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-700">Gross Salary</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-blue-600">₹{calculations.monthlyGross.toLocaleString()}/mo</span>
                  <span className="text-[10px] text-gray-400 ml-2">₹{calculations.annualGross.toLocaleString()}/yr</span>
                </div>
              </div>

              {/* Employer PF */}
              <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-gray-700">Employer's PF Contribution</span>
                  <p className="text-[9px] text-gray-400 font-bold">PF capped at ₹1,800/mo (Monthly Basic ≥ ₹15,000)</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-800">₹{calculations.employerPF.toLocaleString()}/mo</span>
                  <span className="text-[10px] text-gray-400 ml-2">₹{(calculations.employerPF * 12).toLocaleString()}/yr</span>
                </div>
              </div>

              {/* Other Deductions */}
              <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Other Deductions</span>
                  <button 
                    onClick={handleAddDeduction}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-[9px] font-bold text-[#0066cc] hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={12} /> Add Deduction
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.deductions.length === 0 ? (
                    <p className="text-center py-4 text-[10px] font-bold text-gray-400 italic">No deductions added</p>
                  ) : (
                    formData.deductions.map((ded) => (
                      <div key={ded.id} className="flex items-center gap-4 group">
                        <div className="flex-1 relative">
                          <input 
                            type="text" 
                            placeholder="Deduction name"
                            value={ded.name}
                            onChange={(e) => handleDeductionChange(ded.id, 'name', e.target.value)}
                            className="w-full h-10 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-blue-500" 
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">
                            ₹0/mo
                          </span>
                        </div>
                        <div className="w-24 relative">
                          <input 
                            type="number" 
                            placeholder="0"
                            value={ded.amount}
                            onChange={(e) => handleDeductionChange(ded.id, 'amount', e.target.value)}
                            className="w-full h-10 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-blue-500" 
                          />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">0</span>
                        <button 
                          onClick={() => handleRemoveDeduction(ded.id)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Net Take Home */}
              <div className="bg-[#f0fdf4] border border-green-100 rounded-xl p-4 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-green-700">Net Take Home</span>
                  <p className="text-[9px] text-green-600/70 font-bold">Net Take Home = Gross Salary - PF - Other Deductions</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-green-600">₹{calculations.netTakeHome.toLocaleString()}/mo</span>
                  <span className="text-[10px] text-green-500/70 ml-2">₹{(calculations.netTakeHome * 12).toLocaleString()}/yr</span>
                </div>
              </div>

              {/* Total CTC */}
              <div className="bg-[#f0f7ff] border border-blue-100 rounded-xl p-6 flex justify-between items-center">
                <span className="text-sm font-bold text-blue-800">Total CTC (Monthly)</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-blue-600">₹{calculations.totalCTC.toLocaleString()}/mo</span>
                  <span className="text-xs text-blue-400 ml-2">₹{(calculations.totalCTC * 12).toLocaleString()}/yr</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-between sticky bottom-0 bg-white z-10">
            <div className="flex gap-3">
              <button 
                onClick={generatePdf}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 hover:bg-red-100 transition-all"
              >
                <FilePdf size={14} /> Download PDF
              </button>
              <button 
                onClick={generateDocx}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold border border-blue-100 hover:bg-blue-100 transition-all"
              >
                <FileText size={14} /> Download DOCX
              </button>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="px-8 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  console.log("Saving Structure:", formData);
                  onClose();
                }}
                className="px-8 py-2.5 bg-[#0066cc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Save Structure
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SalaryStructureModal;
