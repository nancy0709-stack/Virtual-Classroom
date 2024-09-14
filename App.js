import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileSettings from './components/Profile'; // Path to your Profile component
import AdminDashboard from './components/AdminDashboard'; // Example admin component
import StudentDashboard from './components/StudentDashboard'; // Example student component
import Login from './components/Login'; // Example login component
import { AdminRoute, StudentRoute } from './components/PrivateRouters'; // Import protected routes

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin Protected Route */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Student Protected Route */}
        <Route path="/student" element={<StudentRoute />}>
          <Route index element={<StudentDashboard />} />
        </Route>

        {/* Profile Route for editing user profile */}
        <Route path="/profile" element={<ProfileSettings />} />

        {/* Add a fallback route */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
