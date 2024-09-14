import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getRole } from '../utils/auth'; 

// Wrapper for admin route
const AdminRoute = () => {
  return isAuthenticated() && getRole() === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

// Wrapper for student route
const StudentRoute = () => {
  return isAuthenticated() && getRole() === 'student' ? <Outlet /> : <Navigate to="/login" />;
};

export { AdminRoute, StudentRoute };
