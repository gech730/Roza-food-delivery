import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar    from './component/Navbar/Navbar';
import Sidebar   from './component/SideBar/Sidebar';
import Footer    from './component/Footer/Footer';
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

/* ── Viewport helpers ──────────────────────────────── */
const isMobileWidth   = () => window.innerWidth < 1024;
const isTabletWidth   = () => window.innerWidth >= 1024 && window.innerWidth < 1280;
const isDesktopWidth  = () => window.innerWidth >= 1280;

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  /* Sidebar open = full width on desktop, collapsed on tablet, hidden on mobile */
  const [sidebarOpen, setSidebarOpen] = useState(isDesktopWidth());
  const [isMobile, setIsMobile]       = useState(isMobileWidth());

  /* ── Persist token ── */
  useEffect(() => {
    if (token) localStorage.setItem('adminToken', token);
  }, [token]);

  /* ── Track viewport width ── */
  useEffect(() => {
    const onResize = () => {
      const mobile = isMobileWidth();
      const desktop = isDesktopWidth();
      setIsMobile(mobile);
      if (desktop)      setSidebarOpen(true);
      else if (mobile)  setSidebarOpen(false);
      // tablet → keep current state
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Close sidebar on route change on mobile ── */
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    navigate('/');
  };

  /* ── Login screen ── */
  if (!token) return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Login setToken={setToken} />
    </>
  );

  return (
    <div className="ap-root">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      {/* ── Fixed Navbar ── */}
      <header className="ap-navbar">
        <Navbar
          handleLogout={handleLogout}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
          url={url}
          token={token}
        />
      </header>

      {/* ── Body ── */}
      <div className="ap-row">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className={`ap-content ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
          <div className="ap-pages">
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
          </div>
          <Footer />
        </main>
      </div>

      {/* ── Mobile dark overlay ── */}
      {sidebarOpen && isMobile && (
        <div
          className="ap-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default App;
