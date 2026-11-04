import React, { useContext, useState } from "react";
import "./LOginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const LoginPopUp = ({ setShowLogin }) => {
  const { login, register, labels } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [showDemoPolicy, setShowDemoPolicy] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleStateChange = (newState) => {
    setCurrentState(newState);
    setShowDemoPolicy(false);
  };

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
          <div className="login-popup-logo">🍲</div>
          <div>
            <h2>{currentState === "Login" ? labels.login.login : labels.login.register}</h2>
            <p>{labels.nav.brandSub}</p>
          </div>
          <button type="button" className="login-popup-close" onClick={() => setShowLogin(false)}>
            <img src={assets.cross_icon} alt="Close" />
          </button>
        </div>

        <div className="login-popup-inputs">
          {currentState !== "Login" && (
            <div className="login-input-group">
              <label>{labels.login.fullName}</label>
              <input onChange={onChange} value={data.name} name="name" type="text" placeholder={labels.login.placeholderName} required />
            </div>
          )}
          <div className="login-input-group">
            <label>{labels.login.email}</label>
            <input onChange={onChange} value={data.email} name="email" type="email" placeholder={labels.login.placeholderEmail} required />
          </div>
          <div className="login-input-group">
            <label>{labels.login.password}</label>
            <input onChange={onChange} value={data.password} name="password" type="password" placeholder={labels.login.placeholderPassword} required />
          </div>
        </div>

        {/* Demo Privacy Policy & Terms - Mandatory only for Register / Sign Up page */}
        {currentState !== "Login" && (
          <div className="login-popup-terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the{" "}
              <button
                type="button"
                className="demo-policy-btn"
                onClick={() => setShowDemoPolicy(!showDemoPolicy)}
              >
                Demo Privacy Policy & Terms
              </button>
            </label>
          </div>
        )}

        {/* Inline Demo Policy Details Box */}
        {currentState !== "Login" && showDemoPolicy && (
          <div className="demo-policy-box">
            <div className="demo-policy-header">
              <span className="demo-policy-badge">DEMO APPLICATION</span>
              <button
                type="button"
                className="demo-policy-close"
                onClick={() => setShowDemoPolicy(false)}
                aria-label="Close demo policy"
              >
                ✕
              </button>
            </div>
            <h4>Demo Privacy Policy & Terms</h4>
            <p>
              Roza Fast Food operates as an interactive demonstration application.
              Your demo credentials and test orders are stored in a demo sandbox
              strictly for application testing purposes. No sensitive financial information,
              payment cards, or confidential data are collected or shared.
            </p>
          </div>
        )}

        <button type="submit" className="login-popup-btn" disabled={loading}>
          {loading ? labels.login.wait : currentState === "Login" ? labels.login.login : labels.login.createAccount}
        </button>

        <p className="login-popup-switch">
          {currentState === "Login" ? (
            <>{labels.login.noAccount} <span onClick={() => handleStateChange("Sign Up")}>{labels.login.register}</span></>
          ) : (
            <>{labels.login.haveAccount} <span onClick={() => handleStateChange("Login")}>{labels.login.login}</span></>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopUp;
