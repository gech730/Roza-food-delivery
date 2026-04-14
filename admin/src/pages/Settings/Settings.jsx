import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import './Settings.css';

const Settings = ({ url, token }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const fileInputRef = useRef(null);

  const [adminInfo, setAdminInfo]     = useState(null);
  const [isEditing, setIsEditing]     = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPwForm, setShowPwForm]   = useState(false);

  const [form, setForm] = useState({ name: '', email: '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${url}/api/admin/profile`, { headers: { token } });
      if (res.data.success) {
        setAdminInfo(res.data.data);
        setForm({ name: res.data.data.name || '', email: res.data.data.email || '' });
      }
    } catch { /* silent */ }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Images only');
    if (file.size > 5 * 1024 * 1024) return toast.error('Max 5MB');
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('profileImage', file);
      const res = await axios.post(`${url}/api/admin/update`, fd, { headers: { token, 'Content-Type': 'multipart/form-data' } });
      if (res.data.success) { toast.success('Photo updated'); fetchProfile(); }
      else toast.error(res.data.message);
    } catch { toast.error('Upload failed'); }
    finally { setIsUploading(false); }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/admin/update`, form, { headers: { token } });
      if (res.data.success) { toast.success('Profile updated'); setIsEditing(false); fetchProfile(); }
      else toast.error(res.data.message);
    } catch { toast.error('Update failed'); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) return toast.error("Passwords don't match");
    if (pwForm.newPassword.length < 6) return toast.error('Min 6 characters');
    try {
      const res = await axios.post(`${url}/api/admin/password`, { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }, { headers: { token } });
      if (res.data.success) {
        toast.success('Password changed');
        setShowPwForm(false);
        setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else toast.error(res.data.message);
    } catch { toast.error('Failed to change password'); }
  };

  const avatarUrl = adminInfo?.profileImage ? `${url}/images/${adminInfo.profileImage}` : null;

  return (
    <div className="settings-page" style={{ animation: 'fadeIn .4s' }}>
      <div className="a-page-header">
        <div><h1>Settings</h1><p>Manage your account and preferences</p></div>
      </div>

      <div className="settings-grid">

        {/* Profile card */}
        <div className="a-card settings-section">
          <p className="settings-section-title">Profile</p>

          <div className="settings-avatar-wrap">
            <div className="settings-avatar-rel">
              {avatarUrl
                ? <img src={avatarUrl} alt="Avatar" className="settings-avatar" />
                : <div className="settings-avatar-placeholder">👤</div>
              }
              <button
                className="settings-avatar-upload"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                title="Change photo"
              >
                {isUploading ? '…' : '📷'}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </div>
            <div className="settings-avatar-info">
              <h3>{adminInfo?.name || 'Admin'}</h3>
              <p>{adminInfo?.email}</p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="settings-form">
              <div className="settings-field">
                <label>Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="settings-field">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="settings-form-btns">
                <button type="submit" className="s-btn-save">Save Changes</button>
                <button type="button" className="s-btn-cancel" onClick={() => { setIsEditing(false); setForm({ name: adminInfo?.name, email: adminInfo?.email }); }}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="settings-info-row"><span className="s-label">Name</span><span className="s-value">{adminInfo?.name || '—'}</span></div>
              <div className="settings-info-row"><span className="s-label">Email</span><span className="s-value">{adminInfo?.email || '—'}</span></div>
              <div className="settings-info-row"><span className="s-label">Role</span><span className="s-value">Administrator</span></div>
              <button className="s-btn-edit" onClick={() => setIsEditing(true)}>✏️ Edit Profile</button>
            </>
          )}
        </div>

        {/* Appearance */}
        <div className="a-card settings-section">
          <p className="settings-section-title">Appearance</p>
          <div className="settings-theme-row">
            <span>{isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
            <button className="s-btn-theme" onClick={toggleTheme}>
              Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="a-card settings-section">
          <p className="settings-section-title">Security</p>

          {showPwForm ? (
            <form onSubmit={handlePasswordChange} className="settings-form">
              <div className="settings-field">
                <label>Current Password</label>
                <input type="password" value={pwForm.currentPassword} onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })} required />
              </div>
              <div className="settings-field">
                <label>New Password</label>
                <input type="password" value={pwForm.newPassword} onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })} required />
              </div>
              <div className="settings-field">
                <label>Confirm New Password</label>
                <input type="password" value={pwForm.confirmPassword} onChange={e => setPwForm({ ...pwForm, confirmPassword: e.target.value })} required />
              </div>
              <div className="settings-form-btns">
                <button type="submit" className="s-btn-save">Change Password</button>
                <button type="button" className="s-btn-cancel" onClick={() => { setShowPwForm(false); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); }}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="settings-info-row"><span className="s-label">Password</span><span className="s-value">••••••••</span></div>
              <button className="s-btn-edit" onClick={() => setShowPwForm(true)}>🔒 Change Password</button>
            </>
          )}
        </div>

        {/* App info */}
        <div className="a-card settings-section">
          <p className="settings-section-title">Application</p>
          <div className="settings-info-row"><span className="s-label">App Name</span><span className="s-value">Roza Fast Food</span></div>
          <div className="settings-info-row"><span className="s-label">Payment Gateway</span><span className="s-value">Chapa</span></div>
          <div className="settings-info-row"><span className="s-label">Version</span><span className="s-value">1.0.0</span></div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
