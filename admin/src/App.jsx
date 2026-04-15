import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Sidebar from './component/SideBar/Sidebar';
import Add from './pages/Add/Add';
import Orders from './pages/Orders/Orders';
import List from './pages/List/List';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Payments from './pages/Payments/Payments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  // Desktop: sidebar collapsed to icon-only
  const [collapsed, setCollapsed] = useState(false);
  // Mobile: sidebar drawer open
  const [mobileOpen, setMobileOpen] = useState(false);
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    navigate('/');
  };

  useEffect(() => {
    if (token) localStorage.setItem('adminToken', token);
  }, [token]);

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false); }, []);

  if (!token) return (
    <>
      <ToastContainer position="top-right" />
      <Login setToken={setToken} />
    </>
  );

  return (
    <div className="admin-layout">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed(c => !c)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="admin-main">
        <Navbar
          handleLogout={handleLogout}
          onMobileMenuToggle={() => setMobileOpen(o => !o)}
          onDesktopToggle={() => setCollapsed(c => !c)}
        />
        <main className="admin-page">
          <Routes>
            <Route path="/"          element={<Dashboard url={url} token={token} />} />
            <Route path="/dashboard" element={<Dashboard url={url} token={token} />} />
            <Route path="/orders"    element={<Orders    url={url} token={token} />} />
            <Route path="/users"     element={<Users     url={url} token={token} />} />
            <Route path="/list"      element={<List      url={url} token={token} />} />
            <Route path="/add"       element={<Add       url={url} token={token} />} />
            <Route path="/payments"  element={<Payments  url={url} token={token} />} />
            <Route path="/settings"  element={<Settings  url={url} token={token} />} />
            <Route path="*"          element={<Dashboard url={url} token={token} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
