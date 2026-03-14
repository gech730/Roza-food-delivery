import { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const url = "http://localhost:4000/api/admin";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle Admin Login
   * Authenticates admin and stores token in localStorage
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await axios.post(`${url}/login`, { email, password });
      
      if (res.data.success) {
        // Store token in localStorage and parent state
        localStorage.setItem("adminToken", res.data.token);
        setToken(res.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <p className="login-note">
          Default admin: admin@fooddelivery.com / admin123
        </p>
      </div>
    </div>
  );
};

export default Login;
