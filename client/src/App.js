// client/src/App.js
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLogsPage from "./components/PublicLogsPage";
import useAuth from "./hooks/useAuth";
import axios from './api/axios';
import PersistLogin from "./components/PersistLogin"; // Import the new component

function App() {
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setAuth({});
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/public-logs" element={<PublicLogsPage />} />

          {/* Protected Routes Wrapper */}
          <Route element={<PersistLogin />}>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={<Dashboard onLogout={handleLogout} />}
              />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Redirect logic */}
          <Route
            path="*"
            element={
              auth?.accessToken
                ? <Navigate to="/dashboard" />
                : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;