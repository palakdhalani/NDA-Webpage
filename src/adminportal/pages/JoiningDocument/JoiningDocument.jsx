import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MoreVertical,
  Download,
  Plus,
  ChevronRight,
  CheckCircle2,
  Bell,
  Settings,
  Users,
  Users2,
  Copy,
  Link2,
  ChevronLeft
} from 'lucide-react';
import CustomSelect from '../../components/ui/CustomSelect';
import RequestDocumentsModal from './components/RequestDocumentsModal';
import AddMoreDocumentsModal from './components/AddMoreDocumentsModal';

const JoiningDocument = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPersonFilter, setSelectedPersonFilter] = useState('Select option');
  const [selectedSource, setSelectedSource] = useState('All Sources');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isAddMoreModalOpen, setIsAddMoreModalOpen] = useState(false);
  const [selectedAddMorePerson, setSelectedAddMorePerson] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleCopy = (link) => {
    if (link) {
      navigator.clipboard.writeText(link);
      setNotification('Link copied to clipboard!');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleGetLink = () => {
    setNotification('Link generated and copied to clipboard!');
    setTimeout(() => setNotification(null), 3000);
  };


  const docData = [
    { name: 'Sample Employee', type: 'Worker', docs: 5, req: 5, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'FDF', type: 'Worker', docs: 5, req: 5, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Unknown', type: 'Worker', docs: 6, req: 6, status: 'All Verified', uploaded: 6, progress: 100, link: null, action: 'Get link' },
    { name: 'Prince Sherasiya', type: 'Candidate', docs: 4, req: 4, status: 'Partially Submitted', uploaded: 1, progress: 25, link: 'https://ndatechnology.in/p...', action: 'Copy', verifiedIcon: true },
    { name: 'Jayesh m karavadara', type: 'Candidate', docs: 14, req: 14, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Sample Employee', type: 'Candidate', docs: 9, req: 9, status: 'Partially Submitted', uploaded: 1, progress: 11, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Candidate 3 Worker', type: 'Candidate', docs: 6, req: 6, status: 'All Verified', uploaded: 6, progress: 100, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'rajat Kumar Sinha', type: 'Candidate', docs: 16, req: 16, status: 'Partially Submitted', uploaded: 1, progress: 10, link: 'https://ndatechnology.in/p...', action: 'Copy', verifiedIcon: true },
    { name: 'Ramanuj', type: 'Worker', docs: 4, req: 4, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Rahul Najbhai Solanki', type: 'Candidate', docs: 8, req: 8, status: 'Partially Submitted', uploaded: 1, progress: 13, link: 'https://ndatechnology.in/p...', action: 'Copy', verifiedIcon: true },
    { name: 'Ajit P Vadher', type: 'Candidate', docs: 10, req: 10, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Pampaniya mahendra maldebhai', type: 'Candidate', docs: 4, req: 4, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'dev woker', type: 'Worker', docs: 5, req: 5, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Roma patoriya', type: 'Candidate', docs: 4, req: 4, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Rajat Sinha', type: 'Candidate', docs: 8, req: 8, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Candidate 3', type: 'Candidate', docs: 5, req: 5, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Candidate 1 Worker', type: 'Candidate', docs: 5, req: 5, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'ajit vadher', type: 'Candidate', docs: 8, req: 8, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
    { name: 'Candidate 5', type: 'Candidate', docs: 5, req: 5, status: 'Partially Submitted', uploaded: 4, progress: 80, link: 'https://ndatechnology.in/p...', action: 'Copy', verifiedIcon: true },
    { name: 'Candidate 4', type: 'Candidate', docs: 5, req: 5, status: 'Pending Submission', uploaded: 0, progress: 0, link: 'https://ndatechnology.in/p...', action: 'Copy' },
  ];

  const tabs = [
    { label: 'All', count: 23 },
    { label: 'Pending', count: 21 },
    { label: 'Requested', count: 21 },
    { label: 'Submitted', count: 0 },
    { label: 'Verified', count: 2 },
    { label: 'Rejected', count: 1 },
  ];

  const filteredDocs = React.useMemo(() => {
    return docData.filter(doc => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!doc.name.toLowerCase().includes(query) && !doc.type.toLowerCase().includes(query)) return false;
      }
      
      // Person Filter
      if (selectedPersonFilter !== 'Select option' && doc.name !== selectedPersonFilter) return false;

      // Source Filter
      if (selectedSource !== 'All Sources') {
        if (selectedSource === 'Candidates' && doc.type !== 'Candidate') return false;
        if (selectedSource === 'Worker' && doc.type !== 'Worker') return false;
      }

      // Tab Filter
      if (activeTab !== 'All') {
        if (activeTab === 'Pending' && !doc.status.includes('Pending') && !doc.status.includes('Partially')) return false;
        if (activeTab === 'Verified' && !doc.status.includes('Verified')) return false;
        if (activeTab === 'Submitted' && !doc.status.includes('Submitted')) return false;
        if (activeTab === 'Rejected' && !doc.status.includes('Rejected')) return false;
      }

      return true;
    });
  }, [searchQuery, selectedPersonFilter, selectedSource, activeTab]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'All Verified': return 'bg-[#e5f5f0] text-[#0ea5e9] border-[#d1fae5]';
      case 'Pending Submission': return 'bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]';
      case 'Partially Submitted': return 'bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const getProgressBarColor = (status) => {
    switch (status) {
      case 'All Verified': return 'bg-[#22c55e]';
      case 'Pending Submission': return 'bg-gray-200';
      case 'Partially Submitted': return 'bg-[#3b82f6]';
      default: return 'bg-gray-200';
    }
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

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Joining Documents</h1>
        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        >
          <Plus size={16} strokeWidth={3} /> Request Documents
        </button>
      </div>

      <AnimatePresence>
        <RequestDocumentsModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
        />
        <AddMoreDocumentsModal
          isOpen={isAddMoreModalOpen}
          onClose={() => setIsAddMoreModalOpen(false)}
          personName={selectedAddMorePerson?.name}
          personType={selectedAddMorePerson?.type}
        />
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-2xl shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              <CheckCircle2 size={16} />
            </div>
            <p className="text-sm font-bold tracking-wide">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">

        <div className="p-8 pb-4 space-y-6">

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by document name or type..."
                className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-3 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <CustomSelect
                options={[
                  'Select option',
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
                ]}
                value={selectedPersonFilter}
                onChange={setSelectedPersonFilter}
                className="min-w-[200px]"
              />
              <CustomSelect
                options={['All Sources', "Candidates", "Worker"]}
                value={selectedSource}
                onChange={setSelectedSource}
                className="min-w-[160px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 border-b border-gray-100 overflow-x-auto whitespace-nowrap custom-scrollbar pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`pb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === tab.label ? 'border-[#0066cc] text-[#0066cc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                {tab.label} <span className="text-[9px] text-gray-300 ml-1">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-gray-50/30 border-y border-gray-100">
                <th className="w-12 px-4 py-5 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest"></th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PERSON</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">DOCUMENTS</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-64">STATUS</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-80">SUBMISSION LINK</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDocs.map((doc, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-4 py-6 text-center text-gray-300">
                    <ChevronRight size={16} />
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-800">{doc.name}</span>
                      <span className="text-[11px] font-bold text-gray-400">{doc.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-gray-700">{doc.docs} documents</span>
                      <span className="text-[10px] font-bold text-gray-400">{doc.req} required</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-2 w-full max-w-[200px]">
                      <span className={`px-3 py-1 w-fit rounded-[0.25rem] text-[9px] font-bold uppercase tracking-widest border ${getStatusStyle(doc.status)}`}>
                        {doc.status}
                      </span>
                      <div className="flex flex-col gap-1 w-full">
                        {doc.status === 'Pending Submission' || doc.status === 'Partially Submitted' ? (
                          <span className="text-[9px] font-bold text-gray-400 italic">Candidate action pending</span>
                        ) : null}
                        <div className="flex items-center justify-between mt-1 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                          <span>{doc.uploaded} / {doc.req} uploaded</span>
                          <span>{doc.progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-0.5">
                          <div className={`h-full ${getProgressBarColor(doc.status)}`} style={{ width: `${doc.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      {doc.link ? (
                        <>
                          <input type="text" readOnly value={doc.link} className="flex-1 min-w-0 bg-white border border-gray-200 rounded-md px-3 py-1.5 text-[11px] font-bold text-gray-500 outline-none" />
                          <button 
                            onClick={() => handleCopy(doc.link)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0066cc] text-white rounded-md text-[11px] font-bold hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            <Copy size={12} /> Copy
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={handleGetLink}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-[#0066cc] rounded-md text-[11px] font-bold hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          <Link2 size={12} /> Get link
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => {
                        setSelectedAddMorePerson({ name: doc.name, type: doc.type });
                        setIsAddMoreModalOpen(true);
                      }}
                      className="flex items-center justify-end gap-1.5 w-full text-[12px] font-bold text-[#0066cc] hover:text-blue-800 transition-colors"
                    >
                      Add more docs {doc.verifiedIcon && <CheckCircle2 size={14} className="text-[#0066cc] fill-current text-white" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Showing 1 to {filteredDocs.length} of {filteredDocs.length} results</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-50 text-gray-400 rounded-lg text-[11px] font-bold hover:bg-gray-100 transition-colors uppercase tracking-widest">Previous</button>
            <button className="px-4 py-2 bg-white border border-gray-100 text-gray-600 rounded-lg text-[11px] font-bold hover:bg-gray-50 transition-colors shadow-sm uppercase tracking-widest">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JoiningDocument;
