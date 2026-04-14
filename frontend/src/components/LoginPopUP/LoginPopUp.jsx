import React, { useContext, useState } from "react";
import "./LOginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const LoginPopUp = ({ setShowLogin }) => {
  const { login, register } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = currentState === "Login"
        ? await login(data.email, data.password)
        : await register(data.name, data.email, data.password);

      if (result.success) {
        toast.success(currentState === "Login" ? "Welcome back!" : "Account created!");
        setShowLogin(false);
      } else {
        toast.error(result.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup" onClick={(e) => e.target === e.currentTarget && setShowLogin(false)}>
      <form className="login-popup-container" onSubmit={onSubmit}>
        <div className="login-popup-header">
          <div className="login-popup-logo">🍛</div>
          <div>
            <h2>{currentState === "Login" ? "Welcome Back" : "Create Account"}</h2>
            <p>Roza Fast Food</p>
          </div>
          <button type="button" className="login-popup-close" onClick={() => setShowLogin(false)}>
            <img src={assets.cross_icon} alt="Close" />
          </button>
        </div>

        <div className="login-popup-inputs">
          {currentState !== "Login" && (
            <div className="login-input-group">
              <label>Full Name</label>
              <input onChange={onChange} value={data.name} name="name" type="text" placeholder="Your full name" required />
            </div>
          )}
          <div className="login-input-group">
            <label>Email Address</label>
            <input onChange={onChange} value={data.email} name="email" type="email" placeholder="your@email.com" required />
          </div>
          <div className="login-input-group">
            <label>Password</label>
            <input onChange={onChange} value={data.password} name="password" type="password" placeholder="••••••••" required />
          </div>
        </div>

        <div className="login-popup-terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the <a href="#">Terms & Privacy Policy</a></label>
        </div>

        <button type="submit" className="login-popup-btn" disabled={loading}>
          {loading ? "Please wait..." : currentState === "Login" ? "Sign In" : "Create Account"}
        </button>

        <p className="login-popup-switch">
          {currentState === "Login" ? (
            <>Don't have an account? <span onClick={() => setCurrentState("Sign Up")}>Sign Up</span></>
          ) : (
            <>Already have an account? <span onClick={() => setCurrentState("Login")}>Sign In</span></>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopUp;
