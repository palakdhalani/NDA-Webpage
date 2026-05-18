import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from '../../shared/layouts/ProtectedLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import DataAnalytics from '../pages/DataAnalytics/DataAnalytics';
import ManageUsers from '../pages/ManageUsers/ManageUsers';
import ManpowerRequisition from '../pages/ManpowerRequisition/ManpowerRequisition';
import Candidate from '../pages/Candidate/Candidate';
import Worker from '../pages/Worker/Worker';
import JoiningDocument from '../pages/JoiningDocument/JoiningDocument';
import EmploymentLetter from '../pages/EmploymentLetter/EmploymentLetter';
import JobResponsibilities from '../pages/JobResponsibilities/JobResponsibilities';
import OrganizationStructure from '../pages/OrganizationStructure/OrganizationStructure';
import ICard from '../pages/ICard/ICard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout role="admin" />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<DataAnalytics />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manpower" element={<ManpowerRequisition />} />
        <Route path="candidate" element={<Candidate />} />
        <Route path="worker" element={<Worker />} />
        <Route path="joining-doc" element={<JoiningDocument />} />
        <Route path="employment-letter" element={<EmploymentLetter />} />
        <Route path="job-responsibilities" element={<JobResponsibilities />} />
        <Route path="org-structure" element={<OrganizationStructure />} />
        <Route path="i-card" element={<ICard />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
