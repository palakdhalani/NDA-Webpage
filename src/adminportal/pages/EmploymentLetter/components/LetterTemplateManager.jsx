import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  RefreshCcw, 
  FileCode,
  Globe,
  Users,
  ChevronDown
} from 'lucide-react';
import CustomSelect from '../../../components/ui/CustomSelect.jsx';

const LetterTemplateManager = ({ onBack }) => {
  const [templateType, setTemplateType] = useState('Offer Letter');
  const [audience, setAudience] = useState('All');
  const [language, setLanguage] = useState('English');
  const [templateContent, setTemplateContent] = useState(`OFFER LETTER

Date: {{appointmentDate}}

{{companyName}}

To,
{{employeeName}}
{{employeeAddress}}
Mobile: {{employeeMobileNumber}}
Email: {{employeeEmail}}

Subject: Offer of Employment - {{designation}}

Dear {{employeeName}},

We are pleased to offer you the position of {{designation}} in our {{departmentName}} department at {{companyName}}.

Terms of Employment:

1. Date of Joining: {{startDate}}
2. Place of Posting: {{placeOfPosting}}
3. Reporting To: {{reportingManager}}
4. Compensation: {{monthlyCTC}} (per month) - as per company policy
5. Probation Period: {{probationPeriod}} months
6. Notice Period: {{noticePeriod}} months
7. Paid Leaves per Annum: {{paidLeavesPerAnnum}}
8. Casual/Sick Leaves: {{casualSickLeaves}}
9. Weekly Off: {{weeklyOffDay}}
10. Increment Month: {{incrementMonth}}

Please confirm your acceptance by signing this letter. We look forward to having you on our team.

Best regards,
Management
{{companyName}}`);

  const dynamicFields = [
    'appointmentDate', 'companyName', 'employeeName', 'employeeAddress', 'employeeMobileNumber', 'employeeEmail', 
    'departmentName', 'designation', 'reportingManager', 'startDate', 'monthlyCTC', 'placeOfPosting', 
    'probationPeriod', 'noticePeriod', 'terminationPeriod', 'leaveCL', 'leaveSL', 'leaveEL', 'leavePL', 
    'nationalHolidays', 'weeklyOffDay', 'incrementMonth', 'employeeIdNumber', 'employeeJoinedDate', 
    'dateOfBirth', 'shiftDetails', 'documentNo', 'revisionNo', 'documentRevisionDate',
    'effectiveDate', 'previousDesignation', 'newDesignation', 'previousDepartment', 'newDepartment', 'previousSalary', 'newSalary', 'remarks',
    'confirmationDate'
  ];

  React.useEffect(() => {
    if (templateType === 'Appointment Letter') {
      setTemplateContent(`::CENTER:: APPOINTMENT LETTER
::BOLD:: Document No.: {{documentNo}}    Revision No.: {{revisionNo}}    Date: {{documentRevisionDate}}
Date: {{appointmentDate}}

To,
{{employeeName}}
{{employeeAddress}}
{{employeeMobileNumber}}
Employee Code: {{employeeIdNumber}}
Date of Birth: {{dateOfBirth}}
Shift Details: {{shiftDetails}}

Your appointment is subject to the following terms and conditions:
• Designation & Reporting:-
Department:- {{departmentName}}
Designation:- {{designation}}
Reporting Manager:- {{reportingManager}}
• Date of Joining:-
You will start your employment with us on {{startDate}}.
• Salary
Your total compensation will be as follows:
• Monthly CTC: {{monthlyCTC}}
A detailed salary breakup will be provided in your Annexure - salary structure.
• Place of Posting
• Your initial place of posting will be {{placeOfPosting}}. However, you may be transferred to any of the company's offices, subsidiaries, or project locations in India or abroad, depending on business requirements.
• Probation Period
You will be on a probation period of {{probationPeriod}} months from the date of joining.
• Notice Period: {{noticePeriod}} months.
• Termination Period: {{terminationPeriod}} months.
• Job (Posting) Location: {{placeOfPosting}}.
• Leave Entitlement: C.L. {{leaveCL}}, S.L. {{leaveSL}}, E.L. {{leaveEL}}, P.L. {{leavePL}}, National Holidays: {{nationalHolidays}}. Weekly Off: {{weeklyOffDay}}.
• Increment Month: {{incrementMonth}}.

Please sign and return a copy of this letter as a token of your acceptance.

Yours faithfully,
For, {{companyName}}

Name: {{employeeName}}
      Signature: ______________________
      Date:      ______________________`);
    } else if (templateType === 'Promotion Letter') {
      setTemplateContent(`Promotion Letter
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

____________________
Authorized Signatory`);
    } else if (templateType === 'Confirmation Letter') {
      setTemplateContent(`Confirmation Letter
Date: {{confirmationDate}}

To,
{{employeeName}}
{{employeeAddress}}
{{employeeMobileNumber}}

Subject: Confirmation of Services

Dear {{employeeName}},

With reference to your appointment letter and the probation period of {{probationPeriod}} months, we are pleased to inform you that your services are hereby confirmed in the position of {{designation}} in the {{departmentName}} department of {{companyName}} with effect from {{confirmationDate}}.

Your date of joining was {{startDate}} and you have successfully completed the probation period. Your confirmed monthly CTC will be {{monthlyCTC}} (as per Annexure - salary structure). Other terms and conditions of your appointment letter remain unchanged.

We congratulate you on this confirmation and look forward to your continued association with us.

Yours faithfully,
For, {{companyName}}

____________________
Authorized Signatory`);
    }
  }, [templateType]);

  const handleUseDefault = () => {
    setTemplateContent(`OFFER LETTER

Date: {{appointmentDate}}

{{companyName}}

To,
{{employeeName}}
{{employeeAddress}}
Mobile: {{employeeMobileNumber}}
Email: {{employeeEmail}}

Subject: Offer of Employment - {{designation}}

Dear {{employeeName}},

We are pleased to offer you the position of {{designation}} in our {{departmentName}} department at {{companyName}}.

Terms of Employment:

1. Date of Joining: {{startDate}}
2. Place of Posting: {{placeOfPosting}}
3. Reporting To: {{reportingManager}}
4. Compensation: {{monthlyCTC}} (per month) - as per company policy
5. Probation Period: {{probationPeriod}} months
6. Notice Period: {{noticePeriod}} months
7. Paid Leaves per Annum: {{paidLeavesPerAnnum}}
8. Casual/Sick Leaves: {{casualSickLeaves}}
9. Weekly Off: {{weeklyOffDay}}
10. Increment Month: {{incrementMonth}}

Please confirm your acceptance by signing this letter. We look forward to having you on our team.

Best regards,
Management
{{companyName}}`);
  };

  const handleLoadSaved = () => {
    setTemplateContent(`<p><strong>OFFER LETTER</strong></p><p><br></p><p>Date: {{appointmentDate}}</p><p><br></p><p>{{companyName}}</p><p><br></p><p class="ql-align-center">To,</p><p class="ql-align-center">{{employeeName}}</p><p class="ql-align-center">{{employeeAddress}}</p><p class="ql-align-center">Mobile: {{employeeMobileNumber}}</p><p class="ql-align-center">Email: {{employeeEmail}}</p><p><br></p><p><strong><u>Subject: Offer of Employment - {{designation}}</u></strong></p><p><br></p><p>Dear {{employeeName}},</p><p><br></p><p>We are pleased to offer you the position of {{designation}} in our {{departmentName}} department at {{companyName}}.</p><p><br></p><h1><strong class="ql-size-large"><u>Terms of Employment:</u></strong></h1><p><br></p><p>1. Date of Joining: {{startDate}}</p><p>2. Place of Posting: {{placeOfPosting}}</p><p>3. Reporting To: {{reportingManager}}</p><p>4. Compensation: {{monthlyCTC}} (per month) - as per company policy</p><p>5. Probation Period: {{probationPeriod}} months</p><p>6. Notice Period: {{noticePeriod}} months</p><p>7. Paid Leaves per Annum: {{paidLeavesPerAnnum}}</p><p>8. Casual/Sick Leaves: {{casualSickLeaves}}</p><p>9. Weekly Off: {{weeklyOffDay}}</p><p>10. Increment Month: {{incrementMonth}}</p><p><br></p><p>Please confirm your acceptance by signing this letter. We look forward to having you on our team.</p><p><br></p><p>Best regards,</p><p>Management</p><p>{{companyName}}</p>`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">Letter Template Manager</h1>
          <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Company-wise templates: create, edit, modify, save, and fallback to default when not configured.</p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95"
        >
          <ArrowLeft size={16} /> Back to Appointment Letters
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-50/50 overflow-hidden">
        <div className="p-8 space-y-8">
          
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Template Type</label>
              <CustomSelect 
                options={['Offer Letter', 'Appointment Letter', 'Promotion Letter', 'Confirmation Letter']} 
                value={templateType} 
                onChange={setTemplateType}
                className="w-full h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Audience</label>
              <div className="relative">
                <CustomSelect 
                  options={['All', 'Staff', 'Worker']} 
                  value={audience} 
                  onChange={setAudience}
                  className="w-full h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Language</label>
              <CustomSelect 
                options={['English', 'Hindi', 'Gujarati']} 
                value={language} 
                onChange={setLanguage}
                className="w-full h-12"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleLoadSaved}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-all active:scale-95"
            >
              <RefreshCcw size={14} /> Load saved
            </button>
            <button 
              onClick={handleUseDefault}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-all active:scale-95"
            >
              <FileCode size={14} /> Use default
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-[#0066cc] text-white rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
              <Save size={14} /> Save template
            </button>
          </div>

          {/* Editor Area */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              {templateType} content ({audience.toLowerCase()}, {language.substring(0, 2).toLowerCase()})
            </label>
            <div className="relative group">
              <textarea 
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
                className="w-full min-h-[400px] p-6 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] text-sm font-medium text-gray-600 leading-relaxed outline-none focus:border-blue-500 focus:bg-white transition-all resize-none font-mono"
                placeholder="Start typing your template here..."
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[10px] font-bold text-gray-400">
                  HTML EDITOR
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Fields Footer */}
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100/50">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Dynamic fields you can use:</h4>
            <div className="flex flex-wrap gap-2">
              {dynamicFields.map(field => (
                <span key={field} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-500 hover:border-blue-200 hover:text-blue-500 transition-colors cursor-default">
                  {`{{${field}}}`}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LetterTemplateManager;
