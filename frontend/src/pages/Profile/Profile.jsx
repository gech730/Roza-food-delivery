import React, { useState, useContext, useRef } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Profile.css';
import { toast } from 'react-toastify';
import axios from 'axios';

/**
 * User Profile Component
 * Allows users to view and update their profile information including image
 */
const Profile = () => {
  const { userInfo, token, updateProfile, updateProfileImage, changePassword, logout, url } = useContext(StoreContext);
  
  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Profile form data
  const [profileForm, setProfileForm] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || ''
  });
  
  // Password form data
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // File input ref for image upload
  const fileInputRef = useRef(null);

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
      const result = await updateProfileImage(file);
      if (result.success) {
        toast.success("Profile image updated!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handle Profile Update
   * Updates user profile with new data
   */
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    const result = await updateProfile(profileForm.name, profileForm.email);
    if (result.success) {
      toast.success(result.message);
      setIsEditing(false);
    } else {
      toast.error(result.message);
    }
  };

  /**
   * Handle Password Change
   * Updates user password
   */
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    // Validate password length
    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    if (result.success) {
      toast.success(result.message);
      setIsChangingPassword(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      toast.error(result.message);
    }
  };

  /**
   * Handle Logout
   * Logs out user and redirects to home
   */
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  /**
   * Get Profile Image URL
   */
  const getProfileImageUrl = () => {
    if (userInfo?.profileImage) {
      return `${url}/images/${userInfo.profileImage}`;
    }
    return null;
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header with Image */}
        <div className="profile-header">
          <div className="profile-avatar-container">
            {getProfileImageUrl() ? (
              <img 
                src={getProfileImageUrl()} 
                alt="Profile" 
                className="profile-avatar-img"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            )}
            
            {/* Upload Button Overlay */}
            <button 
              className="profile-image-upload-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <span>Uploading...</span>
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
          
          <h2>{userInfo?.name || 'User'}</h2>
          <p className="profile-email">{userInfo?.email}</p>
        </div>
        
        {/* Profile Information Section */}
        <div className="profile-section">
          <h3>Personal Information</h3>
          
          {isEditing ? (
            <form onSubmit={handleProfileUpdate} className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
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
                    setProfileForm({ name: userInfo?.name, email: userInfo?.email });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <span className="label">Name</span>
                <span className="value">{userInfo?.name || 'Not set'}</span>
              </div>
              <div className="info-row">
                <span className="label">Email</span>
                <span className="value">{userInfo?.email || 'Not set'}</span>
              </div>
              <div className="info-row">
                <span className="label">Member Since</span>
                <span className="value">
                  {userInfo?.createdAt 
                    ? new Date(userInfo.createdAt).toLocaleDateString() 
                    : 'Unknown'}
                </span>
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

        {/* Password Change Section */}
        <div className="profile-section">
          <h3>Security</h3>
          
          {isChangingPassword ? (
            <form onSubmit={handlePasswordChange} className="profile-form">
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
                    setIsChangingPassword(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <p>Change your password to keep your account secure.</p>
              <button 
                className="edit-btn"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </button>
            </div>
          )}
        </div>

        {/* Logout Section */}
        <div className="profile-section">
          <h3>Account Actions</h3>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
