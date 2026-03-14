import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Settings.css';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

const Settings = ({ url, token }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Admin info state
  const [adminInfo, setAdminInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // File input ref
  const fileInputRef = useRef(null);

  /**
   * Fetch Admin Profile
   * Gets admin profile data from backend
   */
  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get(`${url}/api/admin/profile`, {
        headers: { token }
      });
      
      if (res.data.success) {
        setAdminInfo(res.data.data);
        setFormData({
          name: res.data.data.name || '',
          email: res.data.data.email || ''
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  /**
   * Handle Profile Image Upload
   */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      
      const res = await axios.post(
        `${url}/api/admin/update`,
        formData,
        { 
          headers: { 
            token,
            "Content-Type": "multipart/form-data"
          } 
        }
      );
      
      if (res.data.success) {
        toast.success("Profile image updated!");
        fetchAdminProfile();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handle Profile Update
   */
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(
        `${url}/api/admin/update`,
        { ...formData },
        { headers: { token } }
      );
      
      if (res.data.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        fetchAdminProfile();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  /**
   * Handle Password Change
   */
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        `${url}/api/admin/password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        },
        { headers: { token } }
      );
      
      if (res.data.success) {
        toast.success("Password changed successfully");
        setShowPasswordForm(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  /**
   * Get Profile Image URL
   */
  const getProfileImageUrl = () => {
    if (adminInfo?.profileImage) {
      return `${url}/images/${adminInfo.profileImage}`;
    }
    return null;
  };

  return (
    <div className='settings-container'>
      <div className="settings-card">
        {/* Profile Header with Image */}
        <div className="settings-profile-header">
          <div className="settings-avatar-container">
            {getProfileImageUrl() ? (
              <img 
                src={getProfileImageUrl()} 
                alt="Profile" 
                className="settings-avatar-img"
              />
            ) : (
              <div className="settings-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            )}
            
            {/* Upload Button Overlay */}
            <button 
              className="settings-image-upload-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <span>...</span>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                  <line x1="12" y1="8" x2="12" y2="14"/>
                  <line x1="9" y1="11" x2="15" y2="11"/>
                </svg>
              )}
            </button>
            
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          
          <h2>{adminInfo?.name || 'Admin'}</h2>
          <p className="settings-email">{adminInfo?.email}</p>
        </div>
        
        {/* Profile Section */}
        <div className="settings-section">
          <h3>Profile Information</h3>
          
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="settings-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="save-btn">Save Changes</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: adminInfo?.name, email: adminInfo?.email });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="settings-info">
              <div className="info-row">
                <span className="label">Name</span>
                <span className="value">{adminInfo?.name || 'Admin'}</span>
              </div>
              <div className="info-row">
                <span className="label">Email</span>
                <span className="value">{adminInfo?.email}</span>
              </div>
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Appearance Section */}
        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="settings-info">
            <div className="info-row">
              <span className="label">Theme</span>
              <span className="value">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <button 
              className="theme-btn"
              onClick={toggleTheme}
            >
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="settings-section">
          <h3>Security</h3>
          
          {showPasswordForm ? (
            <form onSubmit={handlePasswordChange} className="settings-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="save-btn">Change Password</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="settings-info">
              <p>Change your password to keep your account secure.</p>
              <button 
                className="edit-btn"
                onClick={() => setShowPasswordForm(true)}
              >
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
