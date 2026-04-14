import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';

const Login = ({ setToken }) => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/admin/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        setToken(res.data.token);
        toast.success('Welcome back!');
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <div className="admin-login-icon">🍛</div>
          <h1>Roza Admin</h1>
          <p>Sign in to manage your restaurant</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@rozafastfood.com" required />
          </div>
          <div className="admin-login-field">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p className="admin-login-hint">Default: admin@fooddelivery.com / admin123</p>
      </div>
    </div>
  );
};

export default Login;
