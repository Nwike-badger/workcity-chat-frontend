// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import ChatPage from './pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard'; // Import the AuthProvider

function App() {
    return (
        // Corrected order: Router wraps AuthProvider
        <Router>
            {/* Wrap the entire application with AuthProvider to make auth context available */}
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/" element={<LoginPage />} /> {/* Default route to login */}

                    {/* Protected Routes */}
                    {/* All routes inside ProtectedRoute require authentication */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/chat" element={<ChatPage />} />
                        {/* You can add more protected routes here, e.g., /profile, /admin */}
                    </Route>

                    <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            {/* You can add more admin-only routes here */}
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<LoginPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
