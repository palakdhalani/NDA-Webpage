import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MoreVertical,
  Download,
  Plus,
  ChevronDown,
  QrCode,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Bell,
  Settings,
  Users,
  Users2,
  Box
} from 'lucide-react';
import EvaluationSkills from './components/EvaluationSkills';
import QRCodeModal from './components/QRCodeModal';
import AddCandidate from './components/AddCandidate';
import CustomSelect from '../../components/ui/CustomSelect';
import * as XLSX from 'xlsx';


const Candidate = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All years');
  const [selectedMonth, setSelectedMonth] = useState('All months');
  const [sortBy, setSortBy] = useState('Date');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState('database'); // 'database' or 'evaluation'
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Expanded mock data with date for filtering
  const initialCandidates = [
    // Page 1 Data (Simulated)
    { name: 'SINDHAV NANUBHAI SINDHABHAI', age: 32, edu: 'Graduate', pct: '78%', exp: '23 years', status: 'Pending', date: '2025-05-15' },
    { name: 'Prince Sherasiya', age: 0, ageColor: 'text-red-500', edu: 'Graduate', pct: '59%', exp: '3 years', status: 'Pending', date: '2025-04-10' },
    { name: 'Prince Sherasiya', age: 19, edu: 'Graduate', pct: 'N/A', exp: 'N/A', status: 'Selected', date: '2024-12-20' },
    { name: 'Sample Employee', age: 28, edu: 'ITI', pct: 'N/A', exp: '2 years', status: 'On Hold', date: '2025-01-05' },
    { name: 'Jayesh m karavadara', age: 22, edu: 'Post Graduate', pct: '78%', exp: '8 years', status: 'Selected', date: '2025-05-01' },
    { name: 'Rahul Najbhai Solanki', age: 18, edu: 'Graduate', pct: '78%', exp: '8 years', status: 'Selected', date: '2025-03-15' },
    { name: 'rajat Kumar Sinha', age: 29, edu: 'N/A', pct: 'N/A', exp: 'N/A', status: 'Selected', date: '2024-11-30' },
    { name: 'Pampaniya mahendra maldebhai', age: 20, edu: 'Graduate', pct: '45.6%', exp: 'N/A', status: 'Selected', date: '2025-02-14' },
    { name: 'Roma patoriya', age: 26, edu: 'Graduate', pct: '65%', exp: 'N/A', status: 'Selected', date: '2025-04-22' },
    { name: 'Rajat Sinha', age: 0, ageColor: 'text-red-500', edu: 'Graduate', pct: '70%', exp: '1 year', status: 'Selected', date: '2025-05-10' },

    // Page 2 Data (Exact match with user image)
    { name: 'Ajit P Vadher', age: 30, edu: 'Graduate', pct: '65%', exp: 'N/A', status: 'Selected', date: '2025-05-12' },
    { name: 'ajit vadher', age: 0, ageColor: 'text-red-500', edu: 'Post Graduate', pct: '76%', exp: 'N/A', status: 'Selected', date: '2025-05-11' },
    { name: 'Candidate 3 Worker', age: 34, edu: 'Diploma', pct: '67%', exp: 'N/A', status: 'Selected', date: '2025-05-10' },
    { name: 'Candidate 2 Worker', age: 35, edu: 'B.Sc', pct: '66%', exp: 'N/A', status: 'Rejected', date: '2025-05-09' },
    { name: 'Candidate 1 Worker', age: 36, edu: 'B.Tech', pct: '65%', exp: 'N/A', status: 'Selected', date: '2025-05-08' },
    { name: 'Candidate 5', age: 32, edu: 'B.Tech', pct: '69%', exp: 'N/A', status: 'Selected', date: '2025-05-07' },
    { name: 'Candidate 4', age: 33, edu: 'M.Tech', pct: '68%', exp: 'N/A', status: 'Selected', date: '2025-05-06' },
    { name: 'Candidate 3', age: 34, edu: 'Diploma', pct: '67%', exp: 'N/A', status: 'Selected', date: '2025-05-05' },
    { name: 'Candidate 2', age: 35, edu: 'B.Sc', pct: '66%', exp: 'N/A', status: 'Selected', date: '2025-05-04' },
    { name: 'Candidate 1', age: 36, edu: 'B.Tech', pct: '65%', exp: 'N/A', status: 'Selected', date: '2025-05-03' },
  ];

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(initialCandidates);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    XLSX.writeFile(workbook, "Candidates_Database.xlsx");
  };

  const filteredCandidates = useMemo(() => {
    return initialCandidates
      .filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeFilter === 'All' || c.status === activeFilter;

        const cDate = new Date(c.date);
        const matchesYear = selectedYear === 'All years' || cDate.getFullYear().toString() === selectedYear;
        const matchesMonth = selectedMonth === 'All months' || cDate.toLocaleString('default', { month: 'long' }) === selectedMonth;

        return matchesSearch && matchesStatus && matchesYear && matchesMonth;
      })
      .sort((a, b) => {
        if (sortBy === 'Name') return a.name.localeCompare(b.name);
        if (sortBy === 'Age') return parseInt(a.age) - parseInt(b.age);
        if (sortBy === 'Experience') {
          if (a.exp === 'N/A') return 1;
          if (b.exp === 'N/A') return -1;
          return parseInt(a.exp) - parseInt(b.exp);
        }
        if (sortBy === 'Status') return a.status.localeCompare(b.status);
        if (sortBy === 'Education') return a.edu.localeCompare(b.edu);
        if (sortBy === 'Date') return new Date(b.date).getTime() - new Date(a.date).getTime();
        return 0;
      });
  }, [searchQuery, activeFilter, selectedYear, selectedMonth, sortBy]);

  const totalPages = Math.ceil(filteredCandidates.length / perPage);
  const currentCandidates = filteredCandidates.slice((currentPage - 1) * perPage, currentPage * perPage);

  const filterTabs = [
    { label: 'All', count: initialCandidates.length },
    { label: 'Pending', count: initialCandidates.filter(c => c.status === 'Pending').length },
    { label: 'Selected', count: initialCandidates.filter(c => c.status === 'Selected').length },
    { label: 'On Hold', count: initialCandidates.filter(c => c.status === 'On Hold').length },
    { label: 'Rejected', count: initialCandidates.filter(c => c.status === 'Rejected').length },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Selected':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'On Hold':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Rejected':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  if (view === 'evaluation') {
    return <EvaluationSkills onBack={() => setView('database')} />;
  }

  if (view === 'add') {
    return <AddCandidate onBack={() => setView('database')} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Navbar Integration */}
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

      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Candidates Database</h1>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setView('evaluation')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#475569] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-700 transition-all"
          >
            <ClipboardList size={16} />
            Evaluation Skills
          </button>
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#16a34a] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-green-700 transition-all"
          >
            <QrCode size={16} />
            QR Code
          </button>
          <button
            onClick={handleDownloadExcel}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0052cc] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 transition-all"
          >
            <Download size={16} />
            Download Excel
          </button>
          <button
            onClick={() => setView('add')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0052cc] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 transition-all"
          >
            <Plus size={16} strokeWidth={3} />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-4 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-100 rounded-xl pl-12 pr-4 py-2.5 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
            />
          </div>
          <div className="md:col-span-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 min-w-[120px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Year:</span>
              <CustomSelect
                options={['All years', '2025', '2024', '2023', '2022']}
                value={selectedYear}
                onChange={setSelectedYear}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-2 min-w-[140px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Month:</span>
              <CustomSelect
                options={['All months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                value={selectedMonth}
                onChange={setSelectedMonth}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-2 min-w-[140px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Sort by:</span>
              <CustomSelect
                options={['Date', 'Name', 'Age', 'Experience', 'Status', 'Education']}
                value={sortBy}
                onChange={setSortBy}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[11px] font-bold text-gray-400">Per page:</span>
              <CustomSelect
                options={['10', '25', '50', '100']}
                value={perPage.toString()}
                onChange={(val) => {
                  setPerPage(Number(val));
                  setCurrentPage(1);
                }}
                className="w-20"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => {
              setActiveFilter(tab.label);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${activeFilter === tab.label
                ? 'bg-[#0052cc] text-white shadow-blue-100'
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100/50'
              }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/30 border-b border-gray-50">
                {['INTERVIEWER NAME', 'AGE', 'EDUCATION', 'PERCENTAGE%', 'EXPERIENCE', 'STATUS', 'ACTIONS'].map((h) => (
                  <th key={h} className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentCandidates.map((candidate, i) => (
                <tr key={i} className="hover:bg-gray-50/20 transition-colors group">
                  <td className="px-6 py-6 text-[13px] font-bold text-gray-800 tracking-tight">
                    {candidate.name}
                  </td>
                  <td className={`px-6 py-6 text-[13px] font-bold ${candidate.ageColor || 'text-gray-600'}`}>
                    {candidate.age} yrs
                  </td>
                  <td className="px-6 py-6 text-[13px] font-bold text-gray-600">
                    {candidate.edu}
                  </td>
                  <td className="px-6 py-6 text-[13px] font-bold text-gray-600">
                    {candidate.pct}
                  </td>
                  <td className="px-6 py-6 text-[13px] font-bold text-gray-600">
                    {candidate.exp}
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border shadow-sm ${getStatusStyle(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {currentCandidates.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400 font-bold text-sm">
                    No candidates found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/10">
          <p className="text-[11px] font-bold text-gray-400">
            Showing <span className="text-gray-800">{Math.min((currentPage - 1) * perPage + 1, filteredCandidates.length)}</span> to <span className="text-gray-800">{Math.min(currentPage * perPage, filteredCandidates.length)}</span> of <span className="text-gray-800">{filteredCandidates.length}</span> candidates
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-100 rounded-lg text-[11px] font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-[11px] font-bold transition-all shadow-sm border ${currentPage === i + 1 ? 'bg-[#0052cc] text-white border-blue-600' : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-100 rounded-lg text-[11px] font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest pb-8">
        <Box size={14} />
        System Ledger · Recruitment Core
      </div>

      <QRCodeModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};

export default Candidate;
