import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from '../../shared/layouts/ProtectedLayout';
import Overview from '../pages/Overview/Overview';
import Enterprises from '../pages/Enterprises/Enterprises';
import EnterpriseDashboard from '../pages/Enterprises/EnterpriseDashboard';
import Storage from '../pages/Storage/Storage';
import Plans from '../pages/Plans/Plans';
import Activity from '../pages/Activity/Activity';
import ExpAlerts from '../pages/Alerts/ExpAlerts';
import Access from '../pages/Access/Access';
import Profile from '../pages/Profile/Profile';

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout role="superadmin" />}>
        <Route index element={<Overview />} />
        <Route path="enterprises" element={<Enterprises />} />
        <Route path="enterdashboard/:id" element={<EnterpriseDashboard />} />
        <Route path="storage" element={<Storage />} />
        <Route path="plans" element={<Plans />} />
        <Route path="activity" element={<Activity />} />
        <Route path="alerts" element={<ExpAlerts />} />
        <Route path="access" element={<Access />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
};

export default SuperAdminRoutes;
