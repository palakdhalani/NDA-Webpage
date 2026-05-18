import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Overview from '../pages/Overview/Overview';
import Enterprises from '../pages/Enterprises/Enterprises';
import Storage from '../pages/Storage/Storage';
import Plans from '../pages/Plans/Plans';
import Profile from '../pages/Profile/Profile';
import Activity from '../pages/Activity/Activity';
import Access from '../pages/Access/Access';
import Login from '../pages/Auth/Login';
import ExpAlerts from '../pages/Alerts/ExpAlerts';
import EnterpriseDashboard from '../pages/Enterprises/EnterpriseDashboard';

// Auth Guard Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user_name');
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Public Route Component (redirects to admin if already logged in)
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user_name');
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="enterprises" element={<Enterprises />} />
        <Route path="enterdashboard/:id" element={<EnterpriseDashboard />} />
        <Route path="storage" element={<Storage />} />
        <Route path="plans" element={<Plans />} />
        <Route path="activity" element={<Activity />} />
        <Route path="alerts" element={<ExpAlerts />} />
        <Route path="access" element={<Access />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
