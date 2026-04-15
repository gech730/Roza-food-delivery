import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Navbar   from './component/Navbar/Navbar';
import Sidebar  from './component/SideBar/Sidebar';
import Add      from './pages/Add/Add';
import Orders   from './pages/Orders/Orders';
import List     from './pages/List/List';
import Login    from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Dashboard from './pages/Dashboard/Dashboard';
import Users    from './pages/Users/Users';
import Payments from './pages/Payments/Payments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken]         = useState(localStorage.getItem('adminToken') || '');
  const [sidebarOpen, setSidebar] = useState(true); // true = visible
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    navigate('/');
  };

  useEffect(() => {
    if (token) localStorage.setItem('adminToken', token);
  }, [token]);

  // On mobile, close sidebar when route changes
  useEffect(() => {
    if (window.innerWidth < 768) setSidebar(false);
  }, [location.pathname]);

  if (!token) return (
    <>
      <ToastContainer position="top-right" />
      <Login setToken={setToken} />
    </>
  );

  return (
    <div className={`admin-shell ${sidebarOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ── Sidebar ── */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebar(false)}
      />

      {/* ── Main area ── */}
      <div className="admin-main">

        {/* Fixed top navbar */}
        <Navbar
          handleLogout={handleLogout}
          onMenuToggle={() => setSidebar(o => !o)}
          sidebarOpen={sidebarOpen}
        />

        {/* Scrollable page content */}
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
