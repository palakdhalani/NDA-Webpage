import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole }) => {
  const role = localStorage.getItem('user_role');

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'superadmin') return <Navigate to="/superadmin" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
