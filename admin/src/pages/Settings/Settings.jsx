import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  User, 
  Lock, 
  Moon, 
  Sun, 
  Save, 
  X,
  Camera,
  Mail,
  Shield,
  Loader2
} from 'lucide-react';
import './Settings.css';

const Settings = ({ url, token, admin, setAdmin, theme, setTheme }) => {
  const [editMode, setEditMode] = useState(null); // 'profile' | 'password' | null
  const [form, setForm] = useState({ name: admin?.name || '', email: admin?.email || '' });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('avatar', file);
      const res = await axios.post(`${url}/api/admin/avatar`, fd, { headers: { token } });
      if (res.data.success) {
        toast.success('Avatar updated');
        setAdmin(res.data.admin);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await axios.post(`${url}/api/admin/profile`, form, { headers: { token } });
      if (res.data.success) {
        toast.success('Profile updated');
        setAdmin(res.data.admin);
        setEditMode(null);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (pwForm.newPw !== pwForm.confirm) {
      return toast.error('Passwords do not match');
    }
    if (pwForm.newPw.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    setSaving(true);
    try {
      const res = await axios.post(
        `${url}/api/admin/password`,
        { currentPassword: pwForm.current, newPassword: pwForm.newPw },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success('Password changed');
        setPwForm({ current: '', newPw: '', confirm: '' });
        setEditMode(null);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('admin-theme', newTheme);
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="a-page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account and preferences</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Profile Section */}
        <div className="a-card settings-section">
          <h3 className="settings-section-title">
            <User size={14} />
            Profile
          </h3>

          <div className="settings-avatar-wrap">
            <div className="settings-avatar-rel">
              {admin?.avatar ? (
                <img src={`${url}/images/${admin.avatar}`} alt="Avatar" className="settings-avatar" />
              ) : (
                <div className="settings-avatar-placeholder">
                  <User size={32} strokeWidth={1.5} />
                </div>
              )}
              <label className="settings-avatar-upload" title="Change avatar">
                {uploading ? (
                  <Loader2 size={14} className="spin" />
                ) : (
                  <Camera size={14} />
                )}
                <input type="file" accept="image/*" hidden onChange={handleAvatarChange} disabled={uploading} />
              </label>
            </div>
            <div className="settings-avatar-info">
              <h3>{admin?.name || 'Admin'}</h3>
              <p>{admin?.email || 'admin@roza.com'}</p>
            </div>
          </div>

          {editMode === 'profile' ? (
            <div className="settings-form">
              <div className="settings-field">
                <label htmlFor="settings-name">Name</label>
                <input
                  id="settings-name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="settings-field">
                <label htmlFor="settings-email">Email</label>
                <input
                  id="settings-email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              <div className="settings-form-btns">
                <button
                  className="a-btn a-btn-primary"
                  onClick={saveProfile}
                  disabled={saving}
                >
                  {saving ? <Loader2 size={14} className="spin" /> : <Save size={14} />}
                  Save Changes
                </button>
                <button
                  className="a-btn a-btn-ghost"
                  onClick={() => setEditMode(null)}
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="settings-info-row">
                <span className="s-label">
                  <User size={14} />
                  Name
                </span>
                <span className="s-value">{admin?.name || 'Admin'}</span>
              </div>
              <div className="settings-info-row">
                <span className="s-label">
                  <Mail size={14} />
                  Email
                </span>
                <span className="s-value">{admin?.email || 'admin@roza.com'}</span>
              </div>
              <button className="a-btn a-btn-ghost s-btn-edit" onClick={() => setEditMode('profile')}>
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Security Section */}
        <div className="a-card settings-section">
          <h3 className="settings-section-title">
            <Shield size={14} />
            Security
          </h3>

          {editMode === 'password' ? (
            <div className="settings-form">
              <div className="settings-field">
                <label htmlFor="current-pw">Current Password</label>
                <input
                  id="current-pw"
                  type="password"
                  value={pwForm.current}
                  onChange={e => setPwForm({ ...pwForm, current: e.target.value })}
                  placeholder="Enter current password"
                />
              </div>
              <div className="settings-field">
                <label htmlFor="new-pw">New Password</label>
                <input
                  id="new-pw"
                  type="password"
                  value={pwForm.newPw}
                  onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })}
                  placeholder="Enter new password"
                />
              </div>
              <div className="settings-field">
                <label htmlFor="confirm-pw">Confirm New Password</label>
                <input
                  id="confirm-pw"
                  type="password"
                  value={pwForm.confirm}
                  onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="settings-form-btns">
                <button
                  className="a-btn a-btn-primary"
                  onClick={changePassword}
                  disabled={saving}
                >
                  {saving ? <Loader2 size={14} className="spin" /> : <Lock size={14} />}
                  Change Password
                </button>
                <button
                  className="a-btn a-btn-ghost"
                  onClick={() => setEditMode(null)}
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="settings-info-row">
                <span className="s-label">
                  <Lock size={14} />
                  Password
                </span>
                <span className="s-value">********</span>
              </div>
              <button className="a-btn a-btn-ghost s-btn-edit" onClick={() => setEditMode('password')}>
                Change Password
              </button>
            </>
          )}
        </div>

        {/* Appearance Section */}
        <div className="a-card settings-section">
          <h3 className="settings-section-title">
            {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
            Appearance
          </h3>
          <div className="settings-theme-row">
            <span>Theme</span>
            <button className="a-btn a-btn-ghost" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <>
                  <Sun size={16} />
                  Switch to Light
                </>
              ) : (
                <>
                  <Moon size={16} />
                  Switch to Dark
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
