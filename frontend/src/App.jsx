import { useState, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navarbar from './components/Navbar/Navarbar.jsx';
import Home from './pages/Home/Home.jsx';
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
  const { token } = useContext(StoreContext);

  // Protected route — redirects to home and opens login if not authenticated
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

      <div className='app'>
        <Navarbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order'    element={<Protected><PlaceOrder /></Protected>} />
          <Route path='/verify'   element={<Verify />} />
          <Route path='/myOrders' element={<Protected><UserOrder /></Protected>} />
          <Route path='/profile'  element={<Protected><Profile /></Protected>} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
