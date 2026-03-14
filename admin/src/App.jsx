import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Sidebar from './component/SideBar/Sidebar';
import Add from './pages/Add/Add';
import Orders from './pages/Orders/Orders';
import List from './pages/List/List';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Main App Component
 * Handles admin authentication and routing
 */
const App = () => {
  const navigate = useNavigate();
  
  // State to store admin token
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  
  // Backend URL
  const url = "http://localhost:4000";

  /**
   * Handle Logout
   * Clears token and redirects to login
   */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    navigate("/login");
  };

  // Update token in localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
    }
  }, [token]);

  return (
    <div>
      <ToastContainer />
      
      {/* Show login if not authenticated */}
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        // Show main app if authenticated
        <>
          <Navbar handleLogout={handleLogout} url={url} />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/add" element={<Add url={url} token={token} />} />
              <Route path="/list" element={<List url={url} token={token} />} />
              <Route path="/orders" element={<Orders url={url} token={token} />} />
              <Route path="/settings" element={<Settings url={url} token={token} />} />
              <Route path="/" element={<List url={url} token={token} />} />
              <Route path="*" element={<List url={url} token={token} />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
