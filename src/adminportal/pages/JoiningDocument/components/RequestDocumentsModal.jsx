import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import CustomSelect from '../../../components/ui/CustomSelect';

const RequestDocumentsModal = ({ isOpen, onClose }) => {
  const [requestFrom, setRequestFrom] = useState('Candidate');
  const [selectedPerson, setSelectedPerson] = useState('');

  const [documents, setDocuments] = useState([
    { id: 1, type: '', name: '', required: true }
  ]);

  if (!isOpen) return null;

  const addDocument = () => {
    setDocuments([...documents, { id: Date.now(), type: '', name: '', required: true }]);
  };

  const removeDocument = (idToRemove) => {
    setDocuments(documents.filter(doc => doc.id !== idToRemove));
  };

  const fillAllRequired = () => {
    const requiredDocs = [
      { id: Date.now() + 1, type: 'Aadhar Card', name: 'Aadhar Card', required: true },
      { id: Date.now() + 2, type: 'PAN Card', name: 'PAN Card', required: true },
      { id: Date.now() + 3, type: 'Photo', name: 'Photo', required: true },
      { id: Date.now() + 4, type: 'Bank Details', name: 'Bank Details', required: true },
      { id: Date.now() + 5, type: 'Resume', name: 'Resume', required: true }
    ];
    setDocuments(requiredDocs);
  };


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/40 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4 text-left">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-[600px] bg-white rounded-xl shadow-2xl flex flex-col"
        >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">Request Documents</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Request From */}
          <div className="space-y-3">
            <label className="text-[13px] font-bold text-gray-600">Request From</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="requestFrom"
                  checked={requestFrom === 'Candidate'}
                  onChange={() => {
                    setRequestFrom('Candidate');
                    setSelectedPerson('');
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-[14px] text-gray-700 font-medium group-hover:text-gray-900">Candidate</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="requestFrom"
                  checked={requestFrom === 'Worker'}
                  onChange={() => {
                    setRequestFrom('Worker');
                    setSelectedPerson('');
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-[14px] text-gray-700 font-medium group-hover:text-gray-900">Worker</span>
              </label>
            </div>
          </div>

          {/* Select Candidate/Worker */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-600">
              Select {requestFrom}
            </label>
            <CustomSelect
              options={
                requestFrom === 'Worker' 
                ? [
                    `Select ${requestFrom}`,
                    'Sample Employee',
                    'dev woker'
                  ]
                : [
                    `Select ${requestFrom}`,
                    'Prince Sherasiya',
                    'Jayesh m karavadara',
                    'Rahul Najbhai Solanki',
                    'rajat Kumar Sinha',
                    'Pampaniya mahendra maldebhai',
                    'Roma patoriya',
                    'Rajat Sinha',
                    'Ajit P Vadher',
                    'ajit vadher',
                    'Candidate 3 Worker',
                    'Candidate 2',
                    'Candidate 3',
                    'Candidate 4',
                    'Candidate 5',
                    'Candidate 1 Worker',
                    'Candidate 1'
                  ]
              }
              value={selectedPerson || `Select ${requestFrom}`}
              onChange={setSelectedPerson}
            />
          </div>

          {/* Documents to Request */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-gray-600">Documents to Request</label>
              <div className="flex items-center gap-4 text-[13px] font-medium text-[#0066cc]">
                <button onClick={fillAllRequired} className="hover:underline">All required for job</button>
                <button onClick={addDocument} className="flex items-center gap-1 hover:underline">
                  <Plus size={14} /> Add Document
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={doc.id} className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                  <div className="space-y-1.5 flex-1 w-full">
                    <label className="text-[11px] font-medium text-gray-500">Document Type</label>
                    <CustomSelect
                      options={[
                        'Select Type',
                        'Identity Proof',
                        'Address Proof',
                        'Education Certificate',
                        'Aadhar Card',
                        'PAN Card',
                        'Photo',
                        'Driving License',
                        'Passport',
                        'Experience Letter',
                        'Salary Slip',
                        'UAN',
                        'Bank Details',
                        'Bank Statement',
                        'Degree / Graduation',
                        'Marksheet',
                        '10th Certificate',
                        '12th Certificate',
                        'Resume',
                        'Other'
                      ]}
                      value={doc.type || 'Select Type'}
                      onChange={(val) => {
                        const newDocs = [...documents];
                        newDocs[index].type = val;
                        setDocuments(newDocs);
                      }}
                    />
                  </div>
                  <div className="space-y-1.5 flex-1 w-full">
                    <label className="text-[11px] font-medium text-gray-500">Document Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Aadhar Card Front"
                      value={doc.name}
                      onChange={(e) => {
                        const newDocs = [...documents];
                        newDocs[index].name = e.target.value;
                        setDocuments(newDocs);
                      }}
                      className="w-full h-[42px] px-3 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="pb-3 w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={doc.required}
                        onChange={(e) => {
                          const newDocs = [...documents];
                          newDocs[index].required = e.target.checked;
                          setDocuments(newDocs);
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-[13px] text-gray-700 font-medium">Required</span>
                    </label>
                    <button 
                      onClick={() => removeDocument(doc.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      title="Remove Document"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-[13px] font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#0066cc] text-white rounded-lg text-[13px] font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Request Documents
          </button>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default RequestDocumentsModal;
