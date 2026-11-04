import { useState, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navarbar from './components/Navbar/Navarbar.jsx';
import ScrollToTop from './utils/ScrollToTop.jsx';
import Home from './pages/Home/Home.jsx';
import Menu from './pages/Menu/Menu.jsx';
import About from './pages/About/About.jsx';
import Services from './pages/Services/Services.jsx';
import Reviews from './pages/Reviews/Reviews.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Cart from './pages/Cart/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPopUp from './components/LoginPopUP/LoginPopUp.jsx';
import Verify from './pages/verify/Verify.jsx';
import UserOrder from './pages/userOrder/UserOrder.jsx';
import Profile from './pages/Profile/Profile.jsx';
import { StoreContext } from './context/StoreContext.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token, getTotalCartAmount } = useContext(StoreContext);

  // Protected route for checkout: if not logged in, redirects to cart and prompts sign in
  const ProtectedOrder = ({ children }) => {
    if (!token) {
      return <Navigate to="/cart" replace />;
    }
    if (getTotalCartAmount() === 0) {
      return <Navigate to="/menu" replace />;
    }
    return children;
  };

  // Protected route for account data
  const Protected = ({ children }) => {
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}

      <div className="app">
        <ScrollToTop />
        <Navarbar setShowLogin={setShowLogin} />

        <main className="main-content">
          <Routes>
            {/* Separate Dedicated Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<div className="subpage-container"><Menu /></div>} />
            <Route path="/about" element={<div className="subpage-container"><About /></div>} />
            <Route path="/services" element={<div className="subpage-container"><Services /></div>} />
            <Route path="/reviews" element={<div className="subpage-container"><Reviews /></div>} />
            <Route path="/contact" element={<div className="subpage-container"><Contact /></div>} />

            {/* Shopping & Checkout */}
            <Route path="/cart" element={<div className="subpage-container"><Cart /></div>} />
            <Route path="/order" element={<ProtectedOrder><div className="subpage-container"><PlaceOrder /></div></ProtectedOrder>} />
            <Route path="/verify" element={<div className="subpage-container"><Verify /></div>} />
            <Route path="/myOrders" element={<Protected><div className="subpage-container"><UserOrder /></div></Protected>} />
            <Route path="/profile" element={<Protected><div className="subpage-container"><Profile /></div></Protected>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
