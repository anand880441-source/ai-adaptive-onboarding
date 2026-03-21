import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Brain, Star, TrendingUp, Edit3, Save, X } from 'lucide-react';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/api/user/profile');
      if (response.data.success) {
        setUser(response.data.data);
        setEditedUser(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put('/api/user/profile', editedUser);
      if (response.data.success) {
        setUser(response.data.data);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <div className="loading-state">Initializing Neural Profile...</div>;
  if (!user) return <div className="error-state">Neural Identity Lost. Check your connection.</div>;

  return (
    <div className="profile-container-v2">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-card-v2 premium-glass"
      >
        <div className="profile-header-v2">
          <div className="profile-avatar-v2">
            <img src={user.avatar || "/user_portrait_ai_1773946741731.png"} alt="User" />
            <div className="avatar-glow"></div>
          </div>
          <div className="profile-info-v2">
            <div className="profile-name-row">
              {isEditing ? (
                <input 
                  type="text" 
                  value={editedUser.name} 
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  className="edit-input-v2"
                />
              ) : (
                <h1>{user.name}</h1>
              )}
              <div className="status-pill-v2">ACTIVE ARCHITECT</div>
            </div>
            <p className="profile-role">{user.role || 'Developer'}</p>
          </div>
          <div className="profile-actions-v2">
            {isEditing ? (
              <>
                <button className="btn-save-v2" onClick={handleUpdate}><Save size={18} /> SAVE</button>
                <button className="btn-cancel-v2" onClick={() => setIsEditing(false)}><X size={18} /> CANCEL</button>
              </>
            ) : (
              <button className="btn-edit-v2" onClick={() => setIsEditing(true)}><Edit3 size={18} /> EDIT PROFILE</button>
            )}
          </div>
        </div>

        <div className="profile-grid-v2">
          <div className="profile-stats-v2">
            <div className="stat-item-v2">
              <Star className="stat-icon-v2" />
              <div>
                <h3>{user.stats?.nodesCompleted || 0}</h3>
                <p>NODES COMPLETED</p>
              </div>
            </div>
            <div className="stat-item-v2">
              <TrendingUp className="stat-icon-v2" />
              <div>
                <h3>{user.stats?.synthesisRate || '0%'}</h3>
                <p>SYNTHESIS RATE</p>
              </div>
            </div>
            <div className="stat-item-v2">
              <Brain className="stat-icon-v2" />
              <div>
                <h3>{user.stats?.activePaths || 0}</h3>
                <p>ACTIVE PATHS</p>
              </div>
            </div>
          </div>

          <div className="profile-details-v2">
            <h3>Identity Parameters</h3>
            <div className="details-list-v2">
              <div className="detail-item-v2">
                <Mail size={18} />
                <span>{user.email}</span>
              </div>
              <div className="detail-item-v2">
                <Shield size={18} />
                <span>Security Protocol: High</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
