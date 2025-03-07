import React, { useState } from "react";
import "./setting.css";

const Setting = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2>Settings</h2>

        <div className="section">
          <h3>Account</h3>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="New Password" />
        </div>

        <div className="section">
          <h3>Preferences</h3>
          <div className="setting-option">
            <p>Enable Notifications</p>
            <label className="switch">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-option">
            <p>Dark Mode</p>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="section">
          <h3>Security</h3>
          <div className="setting-option">
            <p>Enable Two-Factor Authentication</p>
            <label className="switch">
              <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
              <span className="slider"></span>
            </label>
          </div>
          <button className="logout-btn">Logout from All Devices</button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
