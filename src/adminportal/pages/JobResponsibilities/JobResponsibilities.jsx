import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MoreVertical,
  Download,
  Plus,
  Bell,
  Settings,
  Users,
  Users2,
  Bookmark,
  User,
  Scale,
  Pencil,
  LayoutGrid,
  Trash2
} from 'lucide-react';
import * as XLSX from 'xlsx';
import AddDepartmentModal from './components/AddDepartmentModal.jsx';
import AddResponsibilityModal from './components/AddResponsibilityModal.jsx';
import ResponsibilityDetailsModal from './components/ResponsibilityDetailsModal.jsx';
import EditResponsibilityModal from './components/EditResponsibilityModal.jsx';

const JobResponsibilities = () => {
  const [viewMode, setViewMode] = useState('department'); // 'department' or 'user'
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [isAddRespModalOpen, setIsAddRespModalOpen] = useState(false);
  const [selectedUserForResp, setSelectedUserForResp] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [departments, setDepartments] = useState([
    { name: 'Account', code: '97C3', status: 'Active', count: 0 },
    { name: 'Dispatch', code: '97CB', status: 'Active', count: 0 },
    { name: 'HR', code: '74B1', status: 'Active', count: 0 },
    { name: 'Production', code: '2E05', status: 'Active', count: 0 },
    { name: 'Purchase', code: '97C7', status: 'Active', count: 0 },
    {
      name: 'Test', code: '1C7C', status: 'Active', count: 2, responsibilities: [
        { id: 1, user: 'user3@techcorp.com', role: 'test', count: 3, dept: 'Test', rev: 1, keyResp: 'test', updated: '06/02/2026' },
        { id: 2, user: 'admin@techcorp.com', role: 'Yyt', tag: 'Tg', dept: 'Test', rev: 1, keyResp: 'GRRR', updated: '03/02/2026' }
      ]
    }
  ]);

  const handleAddDepartment = (newDept) => {
    setDepartments(prev => [...prev, newDept]);
  };

  const handleAddResp = (user = null) => {
    setSelectedUserForResp(user);
    setIsAddRespModalOpen(true);
  };

  const handleAction = (type, record) => {
    setSelectedRecord(record);
    setActiveMenuId(null);
    if (type === 'view') setIsViewModalOpen(true);
    if (type === 'edit') setIsEditModalOpen(true);
    if (type === 'delete') {
      if (window.confirm('Are you sure you want to delete this responsibility?')) {
        // Mock delete
        alert('Responsibility deleted successfully');
      }
    }
    if (type === 'download') {
      alert('Downloading PDF...');
    }
  };

  const handleDownloadExcel = () => {
    // 1. Prepare Header Structure (exactly as in the image)
    const headerRows = [
      ["", "TechCorp Solutions", "", "Document/Format No.:", "-"],
      ["", `Job responsibilities — View: ${viewMode === 'department' ? 'Department' : 'User'}`, "", "Revision No. / Date:", "16/05/2026"],
      ["List of job responsibilities (matches current view and search)"],
      [
        "Sr.", "Department", "User email", "Position", "Experience required",
        "Key responsibilities", "Document No.", "Active", "Updated"
      ]
    ];

    // 2. Flatten and filter data
    const allResponsibilities = departments.flatMap(dept =>
      (dept.responsibilities || []).map(resp => ({
        ...resp,
        deptName: dept.name,
        deptCode: dept.code
      }))
    );

    const filtered = allResponsibilities.filter(resp =>
      resp.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resp.deptName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 3. Map to row structure
    const dataRows = filtered.map((resp, index) => [
      index + 1,
      resp.deptName,
      resp.user,
      resp.role,
      resp.count || resp.tag || "-",
      resp.keyResp || "-",
      "", // Document No.
      "Yes",
      resp.updated || "-"
    ]);

    // 4. Create Workbook & Sheet
    const worksheet = XLSX.utils.aoa_to_sheet([...headerRows, ...dataRows]);

    // 5. Apply Merges for the custom header look
    worksheet['!merges'] = [
      { s: { r: 0, c: 1 }, e: { r: 0, c: 2 } }, // TechCorp Solutions
      { s: { r: 1, c: 1 }, e: { r: 1, c: 2 } }, // View Mode
      { s: { r: 2, c: 0 }, e: { r: 2, c: 8 } }, // List of job...
      { s: { r: 0, c: 3 }, e: { r: 0, c: 3 } }, // Doc Label
      { s: { r: 1, c: 3 }, e: { r: 1, c: 3 } }  // Rev Label
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Job Responsibilities");

    // 6. Download
    XLSX.writeFile(workbook, `Job_Responsibilities_${viewMode}.xlsx`);
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

      {/* Page Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
          <div className="p-2.5 bg-gray-50 rounded-2xl shadow-inner">
            <Scale size={24} className="text-gray-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight border-b-4 border-blue-100 pb-1">
            Job Responsibilities
          </h1>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
          <button
            onClick={handleDownloadExcel}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white rounded-xl text-[11px] font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <Download size={14} /> Download Excel
          </button>
          <button
            onClick={() => setIsAddDeptModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#475569] text-white rounded-xl text-[11px] font-bold shadow-lg shadow-slate-100 hover:bg-slate-700 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <Bookmark size={14} /> Add Department
          </button>
          <button
            onClick={() => handleAddResp()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white rounded-xl text-[11px] font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <Plus size={14} /> Add Responsibilities
          </button>
        </div>
      </div>

      {/* Search and View Toggle */}
      <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-3 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex bg-gray-50 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setViewMode('department')}
            className={`flex-1 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'department' ? 'bg-[#0066cc] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Department View
          </button>
          <button
            onClick={() => setViewMode('user')}
            className={`flex-1 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'user' ? 'bg-[#0066cc] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            User View
          </button>
        </div>
      </div>

      {/* Main Content (Toggle between Views) */}
      <div className="space-y-6">
        {viewMode === 'department' ? (
          /* Departments List */
          <div className="space-y-6">
            {departments.filter(d =>
              d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              d.code.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Dept Header */}
                <div className="p-6 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Bookmark size={18} className="text-[#0066cc]" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 tracking-tight">{dept.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#f0fdf4] text-[#16a34a] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                        {dept.status}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-sm">
                        Code: {dept.code}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5">
                      <Users size={12} /> {dept.count} Responsibilities
                    </p>
                  </div>
                </div>

                {/* Dept Content */}
                <div className="px-6 pb-6">
                  {!dept.responsibilities || dept.responsibilities.length === 0 ? (
                    <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl p-6 flex items-center justify-center">
                      <p className="text-xs font-bold text-gray-400 italic text-center leading-relaxed">
                        No job responsibilities assigned to this department yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dept.responsibilities.map((resp) => {
                        const menuId = `dept-${dept.name}-${resp.id}`;
                        return (
                          <div key={resp.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50/30 border border-gray-100 rounded-2xl group hover:border-blue-200 transition-all gap-4">
                            <div className="flex items-start sm:items-center gap-4">
                              <div className="w-10 h-10 shrink-0 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                <User size={18} />
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                <p className="text-xs font-bold text-gray-700 truncate max-w-[150px] sm:max-w-none">{resp.user}</p>
                                <span className="text-gray-300 hidden sm:block">|</span>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-[11px] font-bold text-gray-400">
                                    {resp.role} {resp.count && <span className="text-gray-300">({resp.count})</span>}
                                  </p>
                                  <span className="text-gray-300 hidden sm:block">|</span>
                                  <p className="text-[11px] font-bold text-gray-600">{resp.dept}</p>
                                  <p className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Rev: {resp.rev}</p>
                                </div>
                              </div>
                            </div>
                            <div className="relative">
                              <button 
                                onClick={() => setActiveMenuId(activeMenuId === menuId ? null : menuId)}
                                className="p-2 text-gray-300 hover:text-gray-600 transition-colors"
                              >
                                <MoreVertical size={18} />
                              </button>

                              <AnimatePresence>
                                {activeMenuId === menuId && (
                                  <>
                                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                                    <motion.div 
                                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                      className="absolute right-full top-0 mr-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden py-2"
                                    >
                                      <button onClick={() => handleAction('view', resp)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all text-left">
                                        <LayoutGrid size={14} className="text-gray-400" /> View
                                      </button>
                                      <button onClick={() => handleAction('edit', resp)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all text-left">
                                        <Pencil size={14} className="text-gray-400" /> Edit
                                      </button>
                                      <button onClick={() => handleAction('download', resp)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all text-left">
                                        <Download size={14} className="text-gray-400" /> Download
                                      </button>
                                      <button onClick={() => handleAction('delete', resp)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-all text-left border-t border-gray-50 mt-1">
                                        <Trash2 size={14} className="text-red-400" /> Delete
                                      </button>
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* User View Table */
          <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-white border-b border-gray-50">
                  <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">User Name</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Department</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Update</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Responsibilities</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Add</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50">
                {[
                  { name: 'admin@techcorp.com', dept: 'Test', exp: 'Tg', role: 'Yyt', date: '03/02/2026', count: 1 },
                  { name: 'newemail@techcorp.com', dept: 'N/A', exp: 'N/A', role: 'N/A', date: '16/05/2026', count: 0 },
                  { name: 'user2@techcorp.com', dept: 'N/A', exp: 'N/A', role: 'N/A', date: '16/05/2026', count: 0 },
                  { name: 'user3@techcorp.com', dept: 'Test', exp: '3', role: 'test', date: '06/02/2026', count: 1 },
                  { name: 'user4@techcorp.com', dept: 'N/A', exp: 'N/A', role: 'N/A', date: '16/05/2026', count: 0 },
                  { name: 'dev@gmail.com', dept: 'N/A', exp: 'N/A', role: 'N/A', date: '16/05/2026', count: 0 },
                  { name: 'piyush@techcorp.com', dept: 'N/A', exp: 'N/A', role: 'N/A', date: '16/05/2026', count: 0 },
                  { name: 'ed@techcorp.com', dept: 'N/A', exp: 'N/A', role: 'N/A', date: '16/05/2026', count: 0 },
                  { name: 'panth.ops.spirexinfoways@gmail.com', dept: 'N/A', exp: 'N/A', role: 'N/A', date: '16/05/2026', count: 0 },
                ].filter(u =>
                  u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  u.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  u.role.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <User size={14} className="text-gray-400" />
                        <span className="text-[11px] font-bold text-gray-600">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-400">{user.dept}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-400">{user.exp}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-400">{user.role}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-400">{user.date}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-600">{user.count} Responsibilities</td>
                    <td className="px-6 py-4 relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === i ? null : i)}
                        className="text-gray-300 hover:text-gray-600 transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      <AnimatePresence>
                        {activeMenuId === i && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -10 }}
                              className="absolute right-full top-0 mr-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden py-2"
                            >
                              <button onClick={() => handleAction('view', user)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all text-left">
                                <LayoutGrid size={14} className="text-gray-400" /> View
                              </button>
                              <button onClick={() => handleAction('edit', user)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all text-left">
                                <Pencil size={14} className="text-gray-400" /> Edit
                              </button>
                              <button onClick={() => handleAction('download', user)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all text-left">
                                <Download size={14} className="text-gray-400" /> Download
                              </button>
                              <button onClick={() => handleAction('delete', user)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-all text-left border-t border-gray-50 mt-1">
                                <Trash2 size={14} className="text-red-400" /> Delete
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleAddResp(user.name)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0066cc] text-white rounded-md text-[10px] font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-50"
                      >
                        <Plus size={12} /> Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddDepartmentModal
        isOpen={isAddDeptModalOpen}
        onClose={() => setIsAddDeptModalOpen(false)}
        onAdd={handleAddDepartment}
      />

      <AddResponsibilityModal
        isOpen={isAddRespModalOpen}
        onClose={() => setIsAddRespModalOpen(false)}
        departments={departments.map(d => d.name)}
        initialEmployee={selectedUserForResp}
      />

      <ResponsibilityDetailsModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        data={selectedRecord}
      />

      <EditResponsibilityModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        departments={departments.map(d => d.name)}
        data={selectedRecord}
      />
    </div>
  );
};

export default JobResponsibilities;

