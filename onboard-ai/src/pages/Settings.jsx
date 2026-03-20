import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Eye, Shield, Cpu, RefreshCw, LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/settings');
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    try {
      const response = await axios.put('http://localhost:5000/api/user/settings', updated);
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (err) {
      console.error("Error updating settings:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  if (loading) return <div className="loading-state">Synchronizing Neural Settings...</div>;
  if (!settings) return <div className="error-state">Neural Interface Offline. Please reconnect.</div>;

  return (
    <div className="settings-container-v2">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="settings-card-v2 premium-glass"
      >
        <div className="settings-header-v2">
          <SettingsIcon size={24} className="header-icon-v2" />
          <h1>System Configuration</h1>
          <p>Adjust your neural interface parameters</p>
        </div>

        <div className="settings-section-v2">
          <h3>Interface Protocols</h3>
          <div className="setting-control-v2">
            <div className="control-info-v2">
              <Bell size={20} />
              <div>
                <h4>Neural Notifications</h4>
                <p>Receive updates on synthesis progress</p>
              </div>
            </div>
            <label className="switch-v2">
              <input 
                type="checkbox" 
                checked={settings.notifications} 
                onChange={() => handleToggle('notifications')} 
              />
              <span className="slider-v2"></span>
            </label>
          </div>

          <div className="setting-control-v2">
            <div className="control-info-v2">
              <Eye size={20} />
              <div>
                <h4>Dark Mode Matrix</h4>
                <p>High-contrast visual synthesis</p>
              </div>
            </div>
            <label className="switch-v2">
              <input 
                type="checkbox" 
                checked={settings.darkMode} 
                onChange={() => handleToggle('darkMode')} 
              />
              <span className="slider-v2"></span>
            </label>
          </div>
        </div>

        <div className="settings-section-v2">
          <h3>Security & Logic</h3>
          <div className="setting-item-v2">
            <Shield size={20} />
            <span>Privacy Level: <strong>{settings.privacyLevel}</strong></span>
            <button className="btn-tertiary-v2">UPGRADE</button>
          </div>
          <div className="setting-item-v2">
            <Cpu size={20} />
            <span>Neural Core Version: <strong>4.0.2-stable</strong></span>
          </div>
        </div>

        <div className="settings-footer-v2">
          <button className="btn-logout-v2" onClick={handleLogout}>
            <LogOut size={18} /> TERMINATE SESSION
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
