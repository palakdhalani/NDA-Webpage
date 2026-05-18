import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Users,
  UserPlus,
  FileText,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Globe,
  Briefcase,
  GraduationCap,
  Heart,
  MessageSquare,
  Building2,
  Users2,
  ShieldCheck,
  TrendingDown,
  Info,
  Clock,
  UserX,
  Download,
  Bell,
  Settings,
  Save,
  Database,
  UsersRound,
  Layers,
  FileSearch,
  BookOpen,
  X,
  CheckCircle2
} from 'lucide-react';
import CustomSelect from '../../components/ui/CustomSelect';

const ModalWrapper = ({ isOpen, onClose, title, subtitle, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-x-hidden overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-[4px]"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-5xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative z-10 my-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-100 bg-white sticky top-0 z-20">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">{title}</h3>
              {subtitle && <p className="text-xs sm:text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 sm:p-3 hover:bg-gray-100 rounded-2xl text-gray-400 hover:text-gray-600 transition-all shadow-sm border border-transparent hover:border-gray-100"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>
          <div className="overflow-x-auto max-h-[70vh] p-4 sm:p-8">
            <div className="min-w-full inline-block align-middle">
              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const AppUsersModal = ({ isOpen, onClose }) => {
  const users = [
    { name: 'Mr. Vimal Patel', email: 'admin@techcorp.com', role: 'admin', active: 'Yes', lastLogin: '2026-05-15' },
    { name: 'testing', email: 'newemail@techcorp.com', role: 'user', active: 'Yes', lastLogin: '2026-02-20' },
    { name: '—', email: 'user2@techcorp.com', role: 'user', active: 'Yes', lastLogin: '2026-05-09' },
    { name: '—', email: 'user3@techcorp.com', role: 'user', active: 'Yes', lastLogin: '—' },
    { name: '—', email: 'user4@techcorp.com', role: 'user', active: 'Yes', lastLogin: '—' },
    { name: 'rajat', email: 'dev@gmail.com', role: 'subadmin', active: 'Yes', lastLogin: '2026-04-24' },
    { name: 'Mr. Piyush Patel', email: 'piyush@techcorp.com', role: 'subadmin', active: 'Yes', lastLogin: '2026-04-30' },
    { name: 'Mr. Sachin Morjariya', email: 'ed@techcorp.com', role: 'subadmin', active: 'Yes', lastLogin: '—' },
    { name: 'Panth Patel', email: 'panth.ops.spirexinfoways@gmail.com', role: 'subadmin', active: 'Yes', lastLogin: '—' },
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Active app users" subtitle="9 account(s)">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            {['Name', 'Email', 'Role', 'Active', 'Last login'].map((h) => (
              <th key={h} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((user, i) => (
            <tr key={i} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4 text-sm font-bold text-gray-700">{user.name}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-600">{user.email}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-500 capitalize">{user.role}</td>
              <td className="px-6 py-4 text-sm font-bold text-green-600">{user.active}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-700">{user.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModalWrapper>
  );
};

const PeopleListModal = ({ isOpen, onClose, title, subtitle, people = [] }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={title} subtitle={subtitle || "Workers register"}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            {['Name', 'Code', 'Department', 'Designation', 'Gender', 'DOB', 'Status'].map((h) => (
              <th key={h} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {people.map((person, i) => (
            <tr key={i} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4 text-sm font-bold text-gray-700">{person.name}</td>
              <td className="px-6 py-4 text-sm font-medium text-blue-600 font-mono">{person.code || '—'}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-500">{person.dept}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-500">{person.designation}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-400">{person.gender}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-700">{person.dob || '—'}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${person.status === 'active' ? 'bg-green-50 text-green-600' :
                  person.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                  {person.status}
                </span>
              </td>
            </tr>
          ))}
          {people.length === 0 && (
            <tr>
              <td colSpan="7" className="px-6 py-20 text-center text-sm font-bold text-gray-400 italic bg-gray-50/30">
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </ModalWrapper>
  );
};

const SuggestionsModal = ({ isOpen, onClose, filter }) => {
  const suggestions = [
    { text: 'Improve office lighting in sector 4', emp: 'dev woker', date: '2026-05-10', status: 'Pending' },
    { text: 'New canteen menu options', emp: 'Rahul Najbhai Solanki', date: '2026-04-28', status: 'Reviewing' },
  ];

  const list = filter === 'recent' ? suggestions.slice(0, 1) : suggestions;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Employee Suggestions" subtitle={`${list.length} record(s)`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            {['Suggestion', 'Employee', 'Date', 'Status'].map((h) => (
              <th key={h} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {list.map((s, i) => (
            <tr key={i} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4 text-sm font-bold text-gray-700 max-w-md">{s.text}</td>
              <td className="px-6 py-4 text-sm font-bold text-blue-600">{s.emp}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-500">{s.date}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-blue-50 text-blue-600">
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModalWrapper>
  );
};

const RequisitionsModal = ({ isOpen, onClose, filter }) => {
  const requisitions = [
    { pos: 'Senior React Developer', dept: 'IT', date: '2026-05-12', approved: '—', status: 'Pending' },
    { pos: 'HR Manager', dept: 'HR', date: '2026-05-08', approved: '2026-05-09', status: 'Approved' },
    { pos: 'Production Supervisor', dept: 'Production', date: '2026-05-01', approved: '—', status: 'Pending' },
    { pos: 'Quality Analyst', dept: 'Test', date: '2026-04-25', approved: '2026-04-26', status: 'Approved' },
  ];

  const list = filter === 'Approved' ? requisitions.filter(r => r.status === 'Approved') : requisitions;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Manpower Requisitions" subtitle={`${list.length} record(s)`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            {['Position', 'Department', 'Req. Date', 'Approved Date', 'Status'].map((h) => (
              <th key={h} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {list.map((r, i) => (
            <tr key={i} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4 text-sm font-bold text-gray-700">{r.pos}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-500">{r.dept}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-700">{r.date}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-400">{r.approved}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${r.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModalWrapper>
  );
};

const CandidatesModal = ({ isOpen, onClose, filter }) => {
  const allCandidates = [
    { name: 'SINDHAV NANUBHAI SINDHABHAI', status: 'Pending', created: '2026-04-27' },
    { name: 'Prince Sherasiya', status: 'Pending', created: '2026-04-26' },
    { name: 'Prince Sherasiya', status: 'Selected', created: '2026-04-24' },
    { name: 'Sample Employee', status: 'On hold', created: '2026-04-21' },
    { name: 'Jayesh m karavadara', status: 'Selected', created: '2026-03-30' },
    { name: 'Rahul Najbhai Solanki', status: 'Selected', created: '2026-03-14' },
    { name: 'rajat Kumar Sinha', status: 'Selected', created: '2026-02-23' },
    { name: 'Pampaniya mahendra maldebhai', status: 'Selected', created: '2026-02-22' },
    { name: 'Roma patoriya', status: 'Selected', created: '2026-02-22' },
    { name: 'Rajat Sinha', status: 'Selected', created: '2026-02-21' },
    { name: 'Ajit P Vadher', status: 'Selected', created: '2026-02-18' },
    { name: 'ajit vadher', status: 'Selected', created: '2026-01-30' },
    { name: 'Candidate 3 Worker', status: 'Selected', created: '2026-01-30' },
    { name: 'Candidate 2 Worker', status: 'Rejected', created: '2026-01-30' },
    { name: 'Candidate 1 Worker', status: 'Selected', created: '2026-01-30' },
    { name: 'Candidate 5', status: 'Selected', created: '2026-01-30' },
    { name: 'Candidate 4', status: 'Selected', created: '2026-01-30' },
    { name: 'Candidate 3', status: 'Selected', created: '2026-01-30' },
    { name: 'Candidate 2', status: 'Selected', created: '2026-01-30' },
    { name: 'Candidate 1', status: 'Selected', created: '2026-01-30' },
  ];

  const filtered = filter === 'Total' ? allCandidates : allCandidates.filter(c => c.status === filter);

  const getTitle = () => {
    if (filter === 'Total') return "Interview candidates";
    return `Candidates — ${filter.toLowerCase()}`;
  };

  const getSubtitle = () => {
    if (filter === 'Total') return "20 record(s)";
    return null;
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={getTitle()} subtitle={getSubtitle()}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            {['Candidate', 'Status', 'Created'].map((h) => (
              <th key={h} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {filtered.map((candidate, i) => (
            <tr key={i} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4 text-sm font-bold text-gray-700">{candidate.name}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${candidate.status === 'Selected' ? 'bg-green-50 text-green-600' :
                  candidate.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                    candidate.status === 'On hold' ? 'bg-blue-50 text-blue-600' :
                      'bg-red-50 text-red-600'
                  }`}>
                  {candidate.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-bold text-gray-500">{candidate.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModalWrapper>
  );
};

const StatGroup = ({ label, value, sublabel, onClick }) => (
  <div
    className={`space-y-1 ${onClick ? 'cursor-pointer group' : ''}`}
    onClick={onClick}
  >
    <p className={`text-xl font-bold text-gray-800 tracking-tight leading-none ${onClick ? 'group-hover:text-blue-600 transition-colors' : ''}`}>{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight leading-tight whitespace-pre-line">
      {label}
      {sublabel && <span className={`block font-medium normal-case mt-0.5 ${onClick ? 'text-blue-400 group-hover:text-blue-500 underline decoration-blue-200 decoration-2 underline-offset-2' : 'text-gray-300'}`}>{sublabel}</span>}
    </p>
  </div>
);

const AttritionMonthCard = ({ month, value, onClick }) => (
  <div
    className={`bg-white rounded-xl border border-gray-100 p-3 flex flex-col justify-between hover:border-blue-100 transition-colors shadow-sm ${onClick ? 'cursor-pointer hover:bg-gray-50/50' : ''}`}
    onClick={onClick}
  >
    <p className="text-[9px] font-bold text-gray-400 uppercase">{month}</p>
    <p className={`text-base font-bold leading-none mt-1 ${parseInt(value) > 0 ? 'text-blue-600 underline decoration-blue-200' : 'text-gray-300'}`}>{value}</p>
  </div>
);

const DemographicRow = ({ label, count, percentage, i, onClick }) => (
  <div className="space-y-1.5 py-1 group/row cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-center px-0.5">
      <span className="text-[11px] font-bold text-gray-500 capitalize tracking-tight group-hover/row:text-blue-600 transition-colors">{label}</span>
      <span className="text-[11px] font-bold text-blue-600 group-hover/row:scale-110 transition-transform origin-right">{count} ({percentage}%)</span>
    </div>
    <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50 group-hover/row:border-blue-100 transition-colors">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }}
        className="h-full bg-[#0066cc] rounded-full shadow-[0_0_8px_rgba(0,102,204,0.1)] group-hover/row:bg-blue-500 transition-colors"
      />
    </div>
  </div>
);

const DemographicCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-7 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
        <Icon size={18} />
      </div>
      <h4 className="text-[13px] font-bold text-gray-800 tracking-tight">{title}</h4>
    </div>
    <div className="flex-1">
      {children}
    </div>
  </div>
);

const FilterSectionCard = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm relative group hover:border-blue-100 transition-all flex flex-col overflow-hidden h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center px-6 py-5 w-full hover:bg-gray-50/50 transition-colors"
      >
        <h3 className="text-sm font-bold text-gray-800 tracking-tight">{title}</h3>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
        ) : (
          <ChevronDown size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-5">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const FilterSelect = ({ label, options = ['All'], value, onChange }) => (
  <div className="space-y-1.5">
    {label && <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">{label}</label>}
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[32px] bg-gray-50/50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-700 appearance-none outline-none focus:ring-2 focus:ring-blue-50 focus:border-blue-200 transition-all cursor-pointer shadow-sm"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
    </div>
  </div>
);

const FilterInput = ({ label, placeholder, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-[32px] bg-white border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-700 outline-none placeholder:text-gray-300 placeholder:italic focus:ring-2 focus:ring-blue-50 focus:border-blue-200 transition-all shadow-sm"
    />
  </div>
);

const DataAnalytics = () => {
  const [showAppUsers, setShowAppUsers] = useState(false);
  const [showPeopleList, setShowPeopleList] = useState(false);
  const [peopleListTitle, setPeopleListTitle] = useState('All workers');
  const [peopleListSubtitle, setPeopleListSubtitle] = useState('');
  const [peopleListContent, setPeopleListContent] = useState([]);

  const [showCandidates, setShowCandidates] = useState(false);
  const [candidateFilter, setCandidateFilter] = useState('Total');

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionFilter, setSuggestionFilter] = useState('Total');

  const [showRequisitions, setShowRequisitions] = useState(false);
  const [requisitionFilter, setRequisitionFilter] = useState('Total');

  const [absenceTab, setAbsenceTab] = useState('workers');

  // Absence Calculator State
  const [totalDays, setTotalDays] = useState(31);
  const [headcount, setHeadcount] = useState(3);
  const [absenceDays, setAbsenceDays] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('May 2026');

  // Filter State
  const initialFilters = {
    dept: 'All departments',
    designation: '',
    gender: 'All',
    ageBand: 'All',
    marital: 'All',
    motherTongue: 'All',
    nationality: 'All',
    religion: 'All',
    education: 'All',
    experience: 'All',
    status: 'All / N/A'
  };
  const [filters, setFilters] = useState(initialFilters);

  // Workforce Dataset (consolidated)
  const people = useMemo(() => [
    { name: 'Sample Employee', code: '59992e0f', dept: 'Production', designation: 'Operator', gender: '—', dob: '1998-01-15', status: 'pending', age: 28, marital: 'Un Married', tongue: 'Hindi', nationality: 'Indian', religion: 'Hindu', education: 'Diploma', experience: 6 },
    { name: 'FDF', code: '6adfac31', dept: 'FD', designation: 'DFD', gender: '—', dob: '—', status: 'pending', age: 25, marital: 'Un Married', tongue: 'Hindi', nationality: 'Indian', religion: 'Hindu', education: 'SSC', experience: 2 },
    { name: 'dev woker', code: '4832bf1e', dept: 'test', designation: 'test', gender: '—', dob: '—', status: 'active', age: 31, marital: 'Un Married', tongue: 'Hindi', nationality: 'Indian', religion: 'Hindu', education: 'Graduate', experience: 10 },
    { name: 'Abc', code: '5f171fa6', dept: 'House keeping', designation: 'Tttt', gender: '—', dob: '—', status: 'left', age: 24, marital: 'Un Married', tongue: 'Hindi', nationality: 'Indian', religion: 'Hindu', education: 'SSC', experience: 1 },
    { name: 'Ramanuj', code: '678b4a14', dept: 'director', designation: 'dev', gender: '—', dob: '2025-12-29', status: 'left', leaveMonth: 'Mar 2026', age: 45, marital: 'Married', tongue: 'English', nationality: 'Indian', religion: 'Hindu', education: 'B.Sc', experience: 20 },
    { name: 'SINDHAV NANUBHAI SINDHABHAI', code: '7k28bf1e', dept: 'HR', designation: 'Assistant', gender: 'Male', dob: '2001-05-10', status: 'pending', age: 24, marital: 'Un Married', tongue: 'Hindi', nationality: 'Indian', religion: 'Hindu', education: 'Graduate', experience: 2 },
    { name: 'Prince Sherasiya', code: '9m12bf3d', dept: 'HR', designation: 'Officer', gender: 'Male', dob: '2003-08-15', status: 'pending', age: 22, marital: 'Un Married', tongue: 'Hindi', nationality: 'Indian', religion: 'Hindu', education: 'Post Graduate', experience: 5 },
    { name: 'Roma patoriya', code: '3v99af2c', dept: 'HR', designation: 'Intern', gender: 'Female', dob: '2006-11-20', status: 'active', age: 19, marital: 'Un Married', tongue: 'Hindi', nationality: 'Indian', religion: 'Hindu', education: 'Graduate', experience: 1 },
  ], []);

  // Filter Logic
  const filteredPeople = useMemo(() => {
    return people.filter(p => {
      const matchDept = filters.dept === 'All departments' || p.dept === filters.dept;
      const matchDesig = !filters.designation || p.designation.toLowerCase().includes(filters.designation.toLowerCase());
      const matchGender = filters.gender === 'All' || p.gender === filters.gender;

      const getAgeBand = (age) => {
        if (age < 20) return '0-19';
        if (age < 30) return '20-29';
        if (age < 40) return '30-39';
        if (age < 50) return '40-49';
        if (age < 60) return '50-59';
        return '59+';
      };
      const matchAge = filters.ageBand === 'All' || getAgeBand(p.age) === filters.ageBand;

      const matchMarital = filters.marital === 'All' || p.marital === filters.marital;
      const matchTongue = filters.motherTongue === 'All' || p.tongue === filters.motherTongue;
      const matchNat = filters.nationality === 'All' || p.nationality === filters.nationality;
      const matchRel = filters.religion === 'All' || p.religion === filters.religion;
      const matchEdu = filters.education === 'All' || p.education === filters.education;

      const getExpBand = (exp) => {
        if (exp <= 3) return '0-3';
        if (exp <= 6) return '4-6';
        if (exp <= 9) return '7-9';
        if (exp <= 12) return '10-12';
        if (exp <= 15) return '13-15';
        return '16+';
      };
      const matchExp = filters.experience === 'All' || getExpBand(p.experience) === filters.experience;

      const matchStatus = filters.status === 'All / N/A' || p.status === filters.status.toLowerCase();

      return matchDept && matchDesig && matchGender && matchAge && matchMarital && matchTongue && matchNat && matchRel && matchEdu && matchExp && matchStatus;
    });
  }, [people, filters]);

  // Derived Breakdown Data
  const getCounts = (key) => {
    const counts = {};
    filteredPeople.forEach(p => {
      let val;
      if (key === 'age') {
        if (p.age < 20) val = '0-19';
        else if (p.age < 30) val = '20-29';
        else if (p.age < 40) val = '30-39';
        else if (p.age < 50) val = '40-49';
        else if (p.age < 60) val = '50-59';
        else val = '59+';
      } else if (key === 'exp') {
        if (p.experience <= 3) val = '0-3';
        else if (p.experience <= 6) val = '4-6';
        else if (p.experience <= 9) val = '7-9';
        else if (p.experience <= 12) val = '10-12';
        else if (p.experience <= 15) val = '13-15';
        else val = '16+';
      } else {
        val = p[key];
      }
      counts[val] = (counts[val] || 0) + 1;
    });
    return counts;
  };

  const genderCounts = getCounts('gender');
  const tongueCounts = getCounts('tongue');
  const maritalCounts = getCounts('marital');
  const deptCounts = getCounts('dept');
  const nationalityCounts = getCounts('nationality');
  const religionCounts = getCounts('religion');
  const ageCounts = getCounts('age');
  const expCounts = getCounts('exp');
  const eduCounts = getCounts('education');

  const totalFiltered = filteredPeople.length;
  const totalWorkers = filteredPeople.filter(p => p.status !== 'pending').length;
  const activeWorkers = filteredPeople.filter(p => p.status === 'active').length;
  const leftWorkers = filteredPeople.filter(p => p.status === 'left').length;
  const pendingWorkers = filteredPeople.filter(p => p.status === 'pending').length;

  const personDays = totalDays * headcount;
  const absencePercent = personDays > 0 ? ((parseFloat(absenceDays) || 0) / personDays) * 100 : 0;

  // Dropdown Options
  const monthOptions = ['Jun 2024', 'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026'];
  const depts = ['All departments', 'HR', 'Test', 'Production', 'House keeping', 'Director', 'FD'];
  const genders = ['All', 'Male', 'Female', 'Other', '—'];
  const ageBands = ['All', '0-19', '20-29', '30-39', '40-49', '50-59', '59+'];
  const maritalStatuses = ['All', 'Married', 'Un Married', 'Widow', 'Divorced'];
  const languages = ['All', 'Hindi', 'Gujarati', 'English', 'Marathi'];
  const nationalities = ['All', 'Indian', 'Other'];
  const religions = ['All', 'Hindu', 'Muslim', 'Christian', 'Sikh'];
  const educations = ['All', 'Graduate', 'Post Graduate', 'Diploma', 'B.Sc', 'SSC', 'HSC'];
  const experienceBands = ['All', '0-3', '4-6', '7-9', '10-12', '13-15', '16+'];
  const workerStatuses = ['All / N/A', 'Active', 'Left', 'Pending'];

  useEffect(() => {
    setHeadcount(absenceTab === 'workers' ? 3 : 20);
    setAbsenceDays('');
  }, [absenceTab]);

  const openCandidateModal = (filter) => {
    setCandidateFilter(filter);
    setShowCandidates(true);
  };

  const openPeopleModal = (title, criteria = null) => {
    let list = [...filteredPeople];
    if (criteria) {
      const [key, value] = Object.entries(criteria)[0];
      if (key === 'ageBand') {
        list = list.filter(p => {
          if (value === '0-19') return p.age < 20;
          if (value === '20-29') return p.age < 30 && p.age >= 20;
          if (value === '30-39') return p.age < 40 && p.age >= 30;
          if (value === '40-49') return p.age < 50 && p.age >= 40;
          if (value === '50-59') return p.age < 60 && p.age >= 50;
          return p.age >= 60;
        });
      } else if (key === 'expBand') {
        list = list.filter(p => {
          if (value === '0-3') return p.experience <= 3;
          if (value === '4-6') return p.experience <= 6 && p.experience > 3;
          if (value === '7-9') return p.experience <= 9 && p.experience > 6;
          if (value === '10-12') return p.experience <= 12 && p.experience > 9;
          if (value === '13-15') return p.experience <= 15 && p.experience > 12;
          return p.experience > 15;
        });
      } else if (key === 'status') {
        list = list.filter(p => p.status === value.toLowerCase());
      } else if (key === 'tongue') {
        list = list.filter(p => p.tongue === value);
      } else if (key === 'gender') {
        list = list.filter(p => p.gender === value);
      } else if (key === 'marital') {
        list = list.filter(p => p.marital === value);
      } else if (key === 'nationality') {
        list = list.filter(p => p.nationality === value);
      } else if (key === 'religion') {
        list = list.filter(p => p.religion === value);
      } else if (key === 'dept') {
        list = list.filter(p => p.dept === value);
      } else if (key === 'education') {
        list = list.filter(p => p.education === value);
      } else if (key === 'leaveMonth') {
        list = list.filter(p => p.leaveMonth === value);
      }
    }

    setPeopleListTitle(title);
    setPeopleListSubtitle(criteria?.leaveMonth ? "Workers — by leave month" : "Workers register");
    setPeopleListContent(list);
    setShowPeopleList(true);
  };

  const openSuggestions = (filter) => {
    setSuggestionFilter(filter);
    setShowSuggestions(true);
  };

  const openRequisitions = (filter) => {
    setRequisitionFilter(filter);
    setShowRequisitions(true);
  };

  const absenceData = {
    workers: [
      { m: 'Jun 2025', d: 30, h: 3, a: 0, p: 90, ap: '0.00%' },
      { m: 'Jul 2025', d: 31, h: 3, a: 0, p: 93, ap: '0.00%' },
      { m: 'Aug 2025', d: 31, h: 3, a: 0, p: 93, ap: '0.00%' },
      { m: 'Sep 2025', d: 30, h: 3, a: 0, p: 90, ap: '0.00%' },
      { m: 'Oct 2025', d: 31, h: 3, a: 0, p: 93, ap: '0.00%' },
      { m: 'Nov 2025', d: 30, h: 3, a: 0, p: 90, ap: '0.00%' },
      { m: 'Dec 2025', d: 31, h: 3, a: 0, p: 93, ap: '0.00%' },
      { m: 'Jan 2026', d: 31, h: 3, a: 0, p: 93, ap: '0.00%' },
      { m: 'Feb 2026', d: 28, h: 3, a: 0, p: 84, ap: '0.00%' },
      { m: 'Mar 2026', d: 31, h: 3, a: 5, p: 93, ap: '5.38%', highlight: true },
      { m: 'Apr 2026', d: 30, h: 3, a: 10, p: 90, ap: '11.11%', highlight: true },
      { m: 'May 2026', d: 31, h: 3, a: 0, p: 93, ap: '0.00%' },
    ],
    candidates: [
      { m: 'Jun 2025', d: 30, h: 20, a: 0, p: 600, ap: '0.00%' },
      { m: 'Jul 2025', d: 31, h: 20, a: 0, p: 620, ap: '0.00%' },
      { m: 'Aug 2025', d: 31, h: 20, a: 0, p: 620, ap: '0.00%' },
      { m: 'Sep 2025', d: 30, h: 20, a: 0, p: 600, ap: '0.00%' },
      { m: 'Oct 2025', d: 31, h: 20, a: 0, p: 620, ap: '0.00%' },
      { m: 'Nov 2025', d: 30, h: 20, a: 0, p: 600, ap: '0.00%' },
      { m: 'Dec 2025', d: 31, h: 20, a: 0, p: 620, ap: '0.00%' },
      { m: 'Jan 2026', d: 31, h: 20, a: 0, p: 620, ap: '0.00%' },
      { m: 'Feb 2026', d: 28, h: 20, a: 0, p: 560, ap: '0.00%' },
      { m: 'Mar 2026', d: 31, h: 20, a: 0, p: 620, ap: '0.00%' },
      { m: 'Apr 2026', d: 26, h: 16, a: 15, p: 416, ap: '3.61%', highlight: true },
      { m: 'May 2026', d: 31, h: 20, a: 0, p: 620, ap: '0.00%' },
    ]
  };

  return (
    <div className="space-y-8 pb-20 font-sans">
      <AppUsersModal isOpen={showAppUsers} onClose={() => setShowAppUsers(false)} />
      <PeopleListModal
        isOpen={showPeopleList}
        onClose={() => setShowPeopleList(false)}
        title={peopleListTitle}
        subtitle={peopleListSubtitle}
        people={peopleListContent}
      />

      <CandidatesModal
        isOpen={showCandidates}
        onClose={() => setShowCandidates(false)}
        filter={candidateFilter}
      />

      <SuggestionsModal
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        filter={suggestionFilter}
      />

      <RequisitionsModal
        isOpen={showRequisitions}
        onClose={() => setShowRequisitions(false)}
        filter={requisitionFilter}
      />

      {/* Top Navbar */}
      <div className="hidden lg:flex justify-between items-center bg-white p-4 -mx-8 -mt-8 mb-8 border-b border-gray-100 sticky top-0 z-40 shadow-sm">
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

      {/* Main Header */}
      <div className="flex items-start gap-3 px-4">
        <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100 mt-1">
          <BarChart3 size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Data Analytics</h1>
          <p className="text-[10px] text-gray-400 font-bold italic">Click any numbers to open the lists. Figures for appointments, letters, ID cards, workers suggestions, and requisitions.</p>
        </div>
      </div>

      {/* Company Overview Section */}
      <div className="bg-[#f8f9fc] rounded-[2rem] border border-gray-100 p-8 mx-4 space-y-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingDown className="text-blue-600" size={18} />
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-tight">Company overview (this company)</h2>
          </div>
          <p className="text-[10px] text-gray-400 font-bold leading-relaxed max-w-5xl">
            App users are login accounts; workers are the register; interview candidates are hiring pipeline records. Worker leaving uses last date (or last update) for status "left". Avg monthly leaving = separations in the last 12 calendar months ÷ 12.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-50 shadow-sm space-y-6">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">App Users</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatGroup
                label="Total"
                sublabel="— click for list"
                value="9"
                onClick={() => setShowAppUsers(true)}
              />
              <StatGroup label="Active" value="9" />
              <StatGroup label="Inactive" value="0" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-50 shadow-sm space-y-6">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Workers (Register)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatGroup
                label="Total"
                value="8"
                onClick={() => openPeopleModal('All workers')}
              />
              <StatGroup
                label="Active"
                value="3"
                onClick={() => openPeopleModal('Active workers', { status: 'Active' })}
              />
              <StatGroup
                label="Left"
                value="2"
                onClick={() => openPeopleModal('Left workers', { status: 'Left' })}
              />
              <StatGroup
                label="Pending"
                value="3"
                onClick={() => openPeopleModal('Pending workers', { status: 'Pending' })}
              />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-50 shadow-sm space-y-6">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Interview Candidates</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 sm:gap-y-6 gap-x-4">
              <StatGroup
                label="Total"
                sublabel="— click for list"
                value="20"
                onClick={() => openCandidateModal('Total')}
              />
              <StatGroup
                label="Pending"
                value="2"
                onClick={() => openCandidateModal('Pending')}
              />
              <StatGroup
                label="Selected"
                value="16"
                onClick={() => openCandidateModal('Selected')}
              />
              <StatGroup
                label="On hold"
                value="1"
                onClick={() => openCandidateModal('On hold')}
              />
              <StatGroup
                label="Rejected"
                value="1"
                onClick={() => openCandidateModal('Rejected')}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] border border-gray-50 p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-4">
            <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Worker Leaving (Attrition)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Avg / month (last 12 mo)</p>
              <p className="text-xl font-bold text-gray-800 tracking-tighter">0.08</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">This calendar year</p>
              <p className="text-xl font-bold text-gray-800 tracking-tighter">1</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Last calendar year</p>
              <p className="text-xl font-bold text-gray-800 tracking-tighter">0</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Left (no leave date)</p>
              <p className="text-xl font-bold text-gray-800 tracking-tighter">0</p>
            </div>
          </div>

          <p className="text-[9px] text-gray-400 font-bold leading-relaxed">
            Total left workers: 2. Monthly grid uses last date (or update) in that month; "no leave date" means status is left but no usable date — excluded from monthly/yearly sums.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              { m: 'Jun 2025', v: '0' }, { m: 'Jul 2025', v: '0' }, { m: 'Aug 2025', v: '0' },
              { m: 'Sep 2025', v: '0' }, { m: 'Oct 2025', v: '0' }, { m: 'Nov 2025', v: '0' },
              { m: 'Dec 2025', v: '0' }, { m: 'Jan 2026', v: '0' }, { m: 'Feb 2026', v: '0' },
              { m: 'Mar 2026', v: '1', click: true }, { m: 'Apr 2026', v: '0' }, { m: 'May 2026', v: '0' }
            ].map((item, i) => (
              <AttritionMonthCard
                key={i}
                month={item.m}
                value={item.v}
                onClick={item.click ? () => openPeopleModal(`Left in ${item.m}`, { leaveMonth: item.m }) : null}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Absence Section */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-10 mx-4 space-y-10 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-blue-600" size={22} strokeWidth={2.5} />
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">Absence % (monthly)</h2>
          </div>
          <p className="text-[11px] text-gray-400 font-bold leading-relaxed max-w-5xl">
            Person-days = days in period × headcount. <span className="font-bold text-gray-600">Workers</span> aur <span className="font-bold text-gray-600">Candidates</span> ka absence data DB me <span className="font-bold text-gray-600">alag-alag</span> save hota hai (scope: worker vs candidate). Absence % = (total absence days ÷ person-days) × 100.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex border border-gray-100 rounded-xl overflow-hidden p-1.5 bg-gray-50/50">
            <button
              onClick={() => setAbsenceTab('workers')}
              className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${absenceTab === 'workers' ? 'bg-[#0066cc] text-white shadow-sm' : 'text-gray-500 hover:bg-white'}`}
            >
              Workers
            </button>
            <button
              onClick={() => setAbsenceTab('candidates')}
              className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${absenceTab === 'candidates' ? 'bg-[#0066cc] text-white shadow-sm' : 'text-gray-500 hover:bg-white'}`}
            >
              Candidates
            </button>
          </div>
          <span className="text-[11px] font-bold text-gray-400 italic flex items-center gap-1.5">
            <Database size={12} /> Loaded from DB
          </span>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-end gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Month</label>
              <div className="w-48">
                <CustomSelect
                  options={monthOptions}
                  value={selectedMonth}
                  onChange={setSelectedMonth}
                />
              </div>

            </div>
            <button
              onClick={() => setTotalDays(31)}
              className="px-6 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Use calendar days (31)
            </button>
            <button
              onClick={() => setHeadcount(absenceTab === 'workers' ? 3 : 20)}
              className="px-6 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Use default headcount ({absenceTab === 'workers' ? '3' : '20'})
            </button>
            <button className="px-8 py-3 bg-[#0066cc] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2">
              <Save size={14} /> Save to DB
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Total days (period)</label>
              <input
                type="number"
                value={totalDays}
                onChange={(e) => setTotalDays(parseInt(e.target.value) || 0)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Headcount (complete workers + candidates)</label>
              <input
                type="number"
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value) || 0)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Total absence days</label>
              <input
                type="text"
                value={absenceDays}
                onChange={(e) => setAbsenceDays(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="Sum of absence days"
                className="w-full bg-white border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-medium text-gray-400 italic outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div className="bg-[#f0f7ff] rounded-[1.5rem] p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 border border-blue-50 shadow-inner">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-[11px] font-bold text-[#004a99] uppercase tracking-[0.2em]">PERSON-DAYS</p>
              <div className="flex items-baseline justify-center md:justify-start gap-3">
                <p className="text-4xl font-bold text-gray-900 leading-none">{personDays}</p>
                <p className="text-xs font-bold text-[#0066cc] italic">{totalDays} × {headcount}</p>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-[11px] font-bold text-[#004a99] uppercase tracking-[0.2em]">ABSENCE %</p>
              <p className="text-4xl font-bold text-[#0066cc] leading-none">{absencePercent.toFixed(2)}%</p>
              <p className="text-[10px] text-[#0066cc]/60 font-bold italic mt-2">absence days ÷ person-days</p>
            </div>
            <div className="space-y-2 text-center md:text-right">
              <p className="text-[11px] font-bold text-[#004a99] uppercase tracking-[0.2em]">TOTAL ABSENCE DAYS</p>
              <p className="text-4xl font-bold text-gray-900 leading-none">{absenceDays || 0}</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-y border-gray-100">
                {['Month', 'Days', 'Headcount', 'Absence days', 'Person-days', 'Absence %'].map((h) => (
                  <th key={h} className="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {absenceData[absenceTab].map((row, i) => (
                <tr key={i} className={`hover:bg-gray-50 transition-colors group ${row.highlight ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-8 py-5 text-[13px] font-bold text-blue-600 group-hover:pl-10 transition-all">{row.m}</td>
                  <td className="px-8 py-5 text-[13px] font-bold text-gray-700">{row.d}</td>
                  <td className="px-8 py-5 text-[13px] font-bold text-gray-700">{row.h}</td>
                  <td className="px-8 py-5 text-[13px] font-bold text-gray-700">{row.a}</td>
                  <td className="px-8 py-5 text-[13px] font-bold text-gray-700">{row.p}</td>
                  <td className="px-8 py-5 text-[13px] font-bold text-blue-600">{row.ap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nested filters Section */}
      <div className="bg-[#f0f7ff] rounded-[2rem] border border-blue-50/50 p-10 mx-4 space-y-10 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
                <Filter size={22} strokeWidth={2.5} />
              </div>
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">Nested filters (workforce charts)</h2>
            </div>
            <p className="text-[11px] text-gray-400 font-bold leading-relaxed">
              Har filter <span className="text-gray-600 font-bold uppercase tracking-tight">AND</span> ke saath combine hota hai. Neeche wale breakdown cards filtered set par hi based hain. Worker register ke quick stats (Active / Left) hamesha poori list se hain.
            </p>
          </div>
          <button
            onClick={() => setFilters(initialFilters)}
            className="px-6 py-2.5 text-[11px] font-bold text-gray-400 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 hover:text-gray-600 transition-all shadow-sm"
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <FilterSectionCard title="Organization">
              <FilterSelect
                label="Department"
                options={depts}
                value={filters.dept}
                onChange={(v) => setFilters(prev => ({ ...prev, dept: v }))}
              />
              <FilterInput
                label="Designation contains"
                placeholder="e.g. Engineer"
                value={filters.designation}
                onChange={(v) => setFilters(prev => ({ ...prev, designation: v }))}
              />
              <div className="pb-14"></div>
            </FilterSectionCard>
          </div>
          <div className="lg:col-span-4">
            <FilterSectionCard title="Demographics">
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                <FilterSelect
                  label="Gender"
                  options={genders}
                  value={filters.gender}
                  onChange={(v) => setFilters(prev => ({ ...prev, gender: v }))}
                />
                <FilterSelect
                  label="Age band"
                  options={ageBands}
                  value={filters.ageBand}
                  onChange={(v) => setFilters(prev => ({ ...prev, ageBand: v }))}
                />
                <FilterSelect
                  label="Marital"
                  options={maritalStatuses}
                  value={filters.marital}
                  onChange={(v) => setFilters(prev => ({ ...prev, marital: v }))}
                />
                <FilterSelect
                  label="Mother tongue"
                  options={languages}
                  value={filters.motherTongue}
                  onChange={(v) => setFilters(prev => ({ ...prev, motherTongue: v }))}
                />
                <FilterSelect
                  label="Nationality"
                  options={nationalities}
                  value={filters.nationality}
                  onChange={(v) => setFilters(prev => ({ ...prev, nationality: v }))}
                />
                <FilterSelect
                  label="Religion"
                  options={religions}
                  value={filters.religion}
                  onChange={(v) => setFilters(prev => ({ ...prev, religion: v }))}
                />
              </div>
            </FilterSectionCard>
          </div>
          <div className="lg:col-span-4">
            <FilterSectionCard title="Education & experience">
              <div className="space-y-5">
                <FilterSelect
                  label="Education"
                  options={educations}
                  value={filters.education}
                  onChange={(v) => setFilters(prev => ({ ...prev, education: v }))}
                />
                <FilterSelect
                  label="Experience (years band)"
                  options={experienceBands}
                  value={filters.experience}
                  onChange={(v) => setFilters(prev => ({ ...prev, experience: v }))}
                />
                <div className="pb-14"></div>
              </div>
            </FilterSectionCard>
          </div>

          <div className="lg:col-span-4">
            <FilterSectionCard title="Worker register status">
              <FilterSelect
                label="Status (workers only)"
                options={workerStatuses}
                value={filters.status}
                onChange={(v) => setFilters(prev => ({ ...prev, status: v }))}
              />
              <p className="text-[9px] text-gray-400 font-bold leading-relaxed pt-1">
                Appointment / ID card rows mein status blank ho sakta hai — filter tab un rows ko exclude karega jahan status match nahi.
              </p>
            </FilterSectionCard>
          </div>
        </div>
      </div>

      {/* Workforce Breakdown Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4">

        {/* Workforce (charts) */}
        <DemographicCard title="Workforce (charts)" icon={UsersRound}>
          <div className="space-y-4">
            <div className="cursor-pointer group" onClick={() => openPeopleModal(`People in charts (${totalFiltered})`)}>
              <p className="text-4xl font-bold text-[#0066cc] tracking-tighter leading-none mb-1 group-hover:scale-105 transition-transform origin-left">{totalFiltered}</p>
              <p className="text-[11px] text-gray-400 font-bold group-hover:text-blue-500 transition-colors">People in charts — click for full list</p>
              <p className="text-[10px] text-gray-300 font-medium italic mt-1">Based on appointment letters and ID card records.</p>
            </div>
            <div className="pt-4 border-t border-gray-50 space-y-2">
              <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">Workers — click a number for the list</p>
              <div className="space-y-1">
                <div className="flex justify-between items-center group cursor-pointer" onClick={() => openPeopleModal('All workers')}>
                  <span className="text-sm font-bold text-[#0066cc] group-hover:underline">{totalWorkers}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Total workers</span>
                </div>
                <div className="flex justify-between items-center group cursor-pointer" onClick={() => openPeopleModal('Active workers', { status: 'Active' })}>
                  <span className="text-sm font-bold text-gray-800 group-hover:underline">{activeWorkers}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Active</span>
                </div>
                <div className="flex justify-between items-center group cursor-pointer" onClick={() => openPeopleModal('Left workers', { status: 'Left' })}>
                  <span className="text-sm font-bold text-gray-800 group-hover:underline">{leftWorkers}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Left</span>
                </div>
                <div className="flex justify-between items-center group cursor-pointer" onClick={() => openPeopleModal('Pending workers', { status: 'Pending' })}>
                  <span className="text-sm font-bold text-gray-800 group-hover:underline">{pendingWorkers}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </DemographicCard>

        {/* By Gender */}
        <DemographicCard title="By Gender" icon={Users2}>
          <div className="space-y-3">
            {['Male', 'Female', 'Other', '—'].map((g, i) => (
              <DemographicRow
                key={g}
                label={g}
                count={genderCounts[g] || 0}
                percentage={totalFiltered > 0 ? Math.round(((genderCounts[g] || 0) / totalFiltered) * 100) : 0}
                i={i}
                onClick={() => openPeopleModal(`Gender: ${g}`, { gender: g })}
              />
            ))}
          </div>
        </DemographicCard>

        {/* By Mother Tongue */}
        <DemographicCard title="By Mother Tongue / Language" icon={Globe}>
          <div className="space-y-3">
            {['Hindi', 'Gujarati', 'English', 'Marathi'].map((lang, i) => (
              <DemographicRow
                key={lang}
                label={lang}
                count={tongueCounts[lang] || 0}
                percentage={totalFiltered > 0 ? Math.round(((tongueCounts[lang] || 0) / totalFiltered) * 100) : 0}
                i={i}
                onClick={() => openPeopleModal(`Mother Tongue: ${lang}`, { tongue: lang })}
              />
            ))}
            {Object.keys(tongueCounts).length === 0 && <p className="text-[10px] text-gray-400 italic">No data</p>}
          </div>
        </DemographicCard>

        {/* By Marital Status */}
        <DemographicCard title="By Marital Status" icon={Heart}>
          <div className="space-y-3">
            {['Married', 'Un Married', 'Widow', 'Divorced'].map((status, i) => (
              <DemographicRow
                key={status}
                label={status}
                count={maritalCounts[status] || 0}
                percentage={totalFiltered > 0 ? Math.round(((maritalCounts[status] || 0) / totalFiltered) * 100) : 0}
                i={i}
                onClick={() => openPeopleModal(`Marital Status: ${status}`, { marital: status })}
              />
            ))}
          </div>
        </DemographicCard>

        {/* By Department */}
        <DemographicCard title="By Department" icon={Building2}>
          <div className="space-y-3">
            {['HR', 'test', 'Production', 'House keeping', 'director', 'FD'].map((dept, i) => (
              <DemographicRow
                key={dept}
                label={dept}
                count={deptCounts[dept] || 0}
                percentage={totalFiltered > 0 ? Math.round(((deptCounts[dept] || 0) / totalFiltered) * 100) : 0}
                i={i}
                onClick={() => openPeopleModal(`Department: ${dept}`, { dept })}
              />
            ))}
          </div>
        </DemographicCard>

        {/* By Nationality */}
        <DemographicCard title="By Nationality" icon={Globe}>
          <div className="space-y-3">
            {['Indian', 'Other'].map((n, i) => (
              <DemographicRow
                key={n}
                label={n}
                count={nationalityCounts[n] || 0}
                percentage={totalFiltered > 0 ? Math.round(((nationalityCounts[n] || 0) / totalFiltered) * 100) : 0}
                i={i}
                onClick={() => openPeopleModal(`Nationality: ${n}`, { nationality: n })}
              />
            ))}
          </div>
        </DemographicCard>

        {/* By Religion */}
        <DemographicCard title="By Religion" icon={ShieldCheck}>
          <div className="space-y-3">
            {['Hindu', 'Muslim', 'Christian', 'Sikh'].map((r, i) => (
              <DemographicRow
                key={r}
                label={r}
                count={religionCounts[r] || 0}
                percentage={totalFiltered > 0 ? Math.round(((religionCounts[r] || 0) / totalFiltered) * 100) : 0}
                i={i}
                onClick={() => openPeopleModal(`Religion: ${r}`, { religion: r })}
              />
            ))}
          </div>
        </DemographicCard>

        {/* By Age Band */}
        <DemographicCard title="By Age Band" icon={Info}>
          <div className="space-y-3">
            {['0-19', '20-29', '30-39', '40-49', '50-59', '59+'].map((band, i) => (
              <DemographicRow
                key={band}
                label={band}
                count={ageCounts[band] || 0}
                percentage={totalFiltered > 0 ? Math.round(((ageCounts[band] || 0) / totalFiltered) * 100) : 0}
                i={i}
                onClick={() => openPeopleModal(`Age Band: ${band}`, { ageBand: band })}
              />
            ))}
          </div>
        </DemographicCard>

        {/* By Experience */}
        <DemographicCard title="By Experience (Years)" icon={Briefcase}>
          <div className="space-y-3">
            {['0-3', '4-6', '7-9', '10-12', '13-15', '16+'].map((band, i) => (
              <DemographicRow
                key={band}
                label={band}
                count={expCounts[band] || 0}
                percentage={totalFiltered > 0 ? Math.round(((expCounts[band] || 0) / totalFiltered) * 100) : 0}
                i={i}
                onClick={() => openPeopleModal(`Experience: ${band} years`, { expBand: band })}
              />
            ))}
          </div>
        </DemographicCard>

        {/* By Education */}
        <DemographicCard title="By Education" icon={GraduationCap}>
          <div className="space-y-3">
            {['Graduate', 'Post Graduate', 'Diploma', 'B.Sc', 'SSC', 'HSC'].map((edu, i) => (
              <DemographicRow
                key={edu}
                label={edu}
                count={eduCounts[edu] || 0}
                percentage={totalFiltered > 0 ? Math.round(((eduCounts[edu] || 0) / totalFiltered) * 100) : 0}
                i={i}
                onClick={() => openPeopleModal(`Education: ${edu}`, { education: edu })}
              />
            ))}
          </div>
        </DemographicCard>

        {/* Employee Suggestions */}
        <DemographicCard title="Employee Suggestions" icon={MessageSquare}>
          <div className="space-y-8">
            <div className="cursor-pointer group" onClick={() => openSuggestions('Total')}>
              <p className="text-4xl font-bold text-[#0066cc] tracking-tighter leading-none mb-1 group-hover:scale-105 transition-transform origin-left">2</p>
              <p className="text-[11px] text-gray-400 font-bold group-hover:text-blue-500 transition-colors uppercase tracking-tight">Total — click for list</p>
            </div>
            <div className="cursor-pointer group" onClick={() => openSuggestions('recent')}>
              <p className="text-4xl font-bold text-[#0066cc] tracking-tighter leading-none mb-1 group-hover:scale-105 transition-transform origin-left">0</p>
              <p className="text-[11px] text-gray-400 font-bold group-hover:text-blue-500 transition-colors uppercase tracking-tight">This month — click for list (recent 2)</p>
            </div>
          </div>
        </DemographicCard>

        {/* Manpower Requisitions */}
        <DemographicCard title="Manpower Requisitions" icon={FileText}>
          <div className="space-y-8">
            <div className="cursor-pointer group" onClick={() => openRequisitions('Total')}>
              <p className="text-4xl font-bold text-[#0066cc] tracking-tighter leading-none mb-1 group-hover:scale-105 transition-transform origin-left">4</p>
              <p className="text-[11px] text-gray-400 font-bold group-hover:text-blue-500 transition-colors uppercase tracking-tight">Total — click for list (first 500)</p>
            </div>
            <div className="cursor-pointer group" onClick={() => openRequisitions('Approved')}>
              <p className="text-4xl font-bold text-[#0066cc] tracking-tighter leading-none mb-1 group-hover:scale-105 transition-transform origin-left">0</p>
              <p className="text-[11px] text-gray-400 font-bold group-hover:text-blue-500 transition-colors uppercase tracking-tight">Approved — click for list (first 500)</p>
            </div>
          </div>
        </DemographicCard>
      </div>
    </div>
  );
};

export default DataAnalytics;
