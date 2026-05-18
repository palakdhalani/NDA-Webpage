import React, { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  ArrowLeftRight,
  Download,
  Users,
  Users2,
  Bell,
  Settings,
  ShieldCheck
} from 'lucide-react';
import AddUserModal from './components/AddUserModal';
import EditUserModal from './components/EditUserModal';

const ManageUsers = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [ipInput, setIpInput] = useState('203.0.113.1, 198.51.100.2');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Initial user list in state
  const [users, setUsers] = useState([
    { id: 1, name: 'Mr. Piyush Patel', email: 'piyush@techcorp.com', mobile: '9909022062', role: 'Sub-admin', designation: 'Management', level: '1', ips: '43.250.156.131', status: 'Active' },
    { id: 2, name: 'Mr. Sachin Morjariya', email: 'ed@techcorp.com', mobile: '9909022062', role: 'Sub-admin', designation: 'Management', level: '1', ips: '43.250.156.131', status: 'Active' },
    { id: 3, name: 'Panth Patel', email: 'panth.ops.spirexinfoways@gmail.com', mobile: '—', role: 'Sub-admin', designation: '—', level: '1', ips: '103.240.208.207', status: 'Active' },
    { id: 4, name: 'rajat', email: 'dev@gmail.com', mobile: '7367989866', role: 'Sub-admin', designation: 'dev', level: '1', ips: 'Any IP', status: 'Active' },
    { id: 5, name: 'Mr. Vimal Patel', email: 'admin@techcorp.com', mobile: '7367989884', role: 'Admin', designation: 'Management', level: '—', ips: '—', status: 'Active' },
    { id: 6, name: 'testing', email: 'newemail@techcorp.com', mobile: '7717750136', role: 'Employee', designation: '—', level: '—', ips: '—', status: 'Active' },
    { id: 7, name: '—', email: 'user2@techcorp.com', mobile: '—', role: 'Employee', designation: '—', level: '—', ips: '—', status: 'Active' },
    { id: 8, name: '—', email: 'user3@techcorp.com', mobile: '—', role: 'Employee', designation: '—', level: '—', ips: '—', status: 'Active' },
    { id: 9, name: '—', email: 'user4@techcorp.com', mobile: '—', role: 'Employee', designation: '—', level: '—', ips: '—', status: 'Active' },
  ]);

  const handleAddUser = (newUser) => {
    setUsers(prev => [newUser, ...prev]);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return u;
    }));
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(u => u.id));
    }
  };

  const toggleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(uid => uid !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setSelectedUsers(prev => prev.filter(uid => uid !== id));
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />

      {/* Navbar - Hidden on mobile as App.jsx header takes over */}
      <div className="hidden lg:flex justify-between items-center bg-white p-4 -mx-8 -mt-8 mb-8 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 pl-4">
          <h2 className="text-sm font-bold text-gray-700 tracking-tight">Admin Dashboard</h2>
        </div>
        <div className="flex items-center gap-4 pr-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors">
            <Download size={14} />
            Download Excel
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors">
            <Users size={14} />
            Staff Form
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors">
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
                <p className="text-[9px] text-gray-400 font-medium">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-100">
                M
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">Manage users</h1>
          <p className="text-sm font-bold text-gray-400 max-w-2xl leading-relaxed">
            Add users (default: sub-admin), set modules and optional login IPs. Use bulk tools to set the same IPs for several sub-admins.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
        >
          <Plus size={16} strokeWidth={3} />
          Add user
        </button>
      </div>

      {/* Bulk Update Section */}
      <div className="bg-blue-50/20 border border-blue-100/50 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-800 tracking-tight">Bulk update login IPs (sub-admins)</h3>
          <p className="text-[11px] font-bold text-gray-400 leading-relaxed">
            Select sub-admins below, enter IP address(es) (comma-separated), then apply. Use <span className="text-blue-600 font-bold">Get my IP</span> to fill your current public IP.
          </p>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">IP(s) for selected users</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              className="flex-1 bg-white border border-gray-100 rounded-xl px-6 py-3.5 text-sm font-bold text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all"
              placeholder="e.g. 192.168.1.1, 10.0.0.1"
            />
            <div className="flex gap-4">
              <button className="flex-1 sm:flex-none px-6 py-3.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                Get my IP
              </button>
              <button
                disabled={selectedUsers.length === 0}
                className={`flex-1 sm:flex-none px-8 py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm ${selectedUsers.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                    : 'bg-blue-200 text-white cursor-not-allowed'
                  }`}
              >
                Apply
              </button>
            </div>
          </div>
          <p className="text-[10px] font-bold text-gray-400 italic ml-1">
            {selectedUsers.length} selected - replaces their previous list.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/30 border-b border-gray-50">
                <th className="px-6 py-5 w-12">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === users.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-200 text-blue-600 focus:ring-blue-100 transition-all cursor-pointer"
                    />
                  </div>
                </th>
                {['Name / Email', 'Mobile', 'Role', 'Designation', 'Level', 'Login IPs', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                        className="w-4 h-4 rounded border-gray-200 text-blue-600 focus:ring-blue-100 transition-all cursor-pointer"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">{user.name}</span>
                      <span className="text-[11px] font-bold text-gray-400 group-hover:text-blue-400 transition-colors">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-500">{user.mobile}</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-700">{user.role}</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-500">{user.designation}</td>
                  <td className="px-6 py-5 text-sm font-bold text-blue-600">{user.level}</td>
                  <td className="px-6 py-5 text-[11px] font-mono font-bold text-gray-400">{user.ips || 'Any IP'}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter shadow-sm border transition-all duration-300 ${user.status === 'Active'
                        ? 'bg-green-50 text-green-600 border-green-100/50'
                        : 'bg-red-50 text-red-600 border-red-100/50'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-700 transition-colors p-1 group/btn"
                      >
                        <Pencil size={16} strokeWidth={2.5} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className="text-orange-400 hover:text-orange-500 transition-colors p-1 group/btn"
                      >
                        <ArrowLeftRight size={16} strokeWidth={2.5} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-500 hover:text-red-600 transition-colors p-1 group/btn"
                      >
                        <Trash2 size={16} strokeWidth={2.5} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest pb-10">
        <ShieldCheck size={14} />
        Secure access control · System Ledger HRMS v2.0
      </div>
    </div>
  );
};

export default ManageUsers;
