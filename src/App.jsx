import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './superAdmin/pages/Auth/Login';
import AdminRoutes from './adminportal/routes/AdminRoutes';
import SuperAdminRoutes from './superAdmin/routes/SuperAdminRoutes';
import Home from './webpage/components/home';
import './App.css';

const AuthSwitch = ({ allowedRole, loginPortal, children }) => {
  const role = localStorage.getItem('user_role');
  if (role === allowedRole) {
    return children;
  }

  if (role && role !== allowedRole) {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'superadmin') return <Navigate to="/superadmin" replace />;
  }

  return <Login portal={loginPortal} />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'font-sans font-bold text-sm rounded-2xl shadow-lg border border-slate-100',
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <AuthSwitch allowedRole="admin" loginPortal="admin">
            <AdminRoutes />
          </AuthSwitch>
        } />

        {/* Super Admin Routes */}
        <Route path="/superadmin/*" element={
          <AuthSwitch allowedRole="superadmin" loginPortal="superadmin">
            <SuperAdminRoutes />
          </AuthSwitch>
        } />

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
