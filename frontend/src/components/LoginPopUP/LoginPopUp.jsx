import React, { useContext, useState } from "react";
import "./LOginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const LoginPopUp = ({ setShowLogin }) => {
  const { login, register, labels } = useContext(StoreContext);
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
        toast.success(currentState === "Login" ? "እንኳን ደህና መጡ! (Welcome back!)" : "አካውንት ተፈጥሯል! (Account created!)");
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

        <div className="login-popup-terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms"><a href="#">{labels.login.terms}</a></label>
        </div>

        <button type="submit" className="login-popup-btn" disabled={loading}>
          {loading ? labels.login.wait : currentState === "Login" ? labels.login.login : labels.login.createAccount}
        </button>

        <p className="login-popup-switch">
          {currentState === "Login" ? (
            <>{labels.login.noAccount} <span onClick={() => setCurrentState("Sign Up")}>{labels.login.register}</span></>
          ) : (
            <>{labels.login.haveAccount} <span onClick={() => setCurrentState("Login")}>{labels.login.login}</span></>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopUp;
