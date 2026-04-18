import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar    from './component/Navbar/Navbar';
import Sidebar   from './component/SideBar/Sidebar';
import Add       from './pages/Add/Add';
import Orders    from './pages/Orders/Orders';
import List      from './pages/List/List';
import Login     from './pages/Login/Login';
import Settings  from './pages/Settings/Settings';
import Dashboard from './pages/Dashboard/Dashboard';
import Users     from './pages/Users/Users';
import Payments  from './pages/Payments/Payments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    navigate('/');
  };

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!token) return (
    <>
      <ToastContainer position="top-right" />
      <Login setToken={setToken} />
    </>
  );

  return (
    <div className="ap-root">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* TOP NAVBAR — full width */}
      <header className="ap-navbar">
        <Navbar
          handleLogout={handleLogout}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
          url={url}
          token={token}
        />
      </header>

      {/* BOTTOM ROW — sidebar + content side by side */}
      <div className="ap-row">

        {/* SIDEBAR — left */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* CONTENT — right */}
        <main className="ap-content">
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

      {/* Mobile overlay — only when sidebar open on mobile */}
      {sidebarOpen && isMobile && (
        <div className="ap-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default App;
