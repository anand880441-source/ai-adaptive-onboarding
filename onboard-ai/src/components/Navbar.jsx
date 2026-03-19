import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Search, Bell, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  if (isAuthPage) return null;

  const isDashboardOrUpload = location.pathname === '/dashboard' || location.pathname === '/upload';

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="main-nav"
    >
      <div className="logo-text" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div style={{ width: '28px', height: '28px', background: 'var(--accent-purple)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Zap size={16} fill="white" color="white" />
        </div>
        OnboardAI
      </div>

      <div className="nav-links">
        {[
          { name: 'Features', path: '/features' },
          { name: 'Solutions', path: '/solutions' },
          { name: 'Pricing', path: '/pricing' },
          { name: 'About', path: '/about' }
        ].map(link => (
          <NavLink 
            key={link.path} 
            to={link.path} 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="nav-btns">
        {!isDashboardOrUpload ? (
          <>
            <NavLink to="/signin" className="nav-signin-link">Sign In</NavLink>
            <button className="btn-upload" style={{ padding: '0.6rem 1.2rem' }} onClick={() => navigate('/signup')}>Get Started</button>
          </>
        ) : location.pathname === '/upload' ? (
          <div className="search-bar">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" className="search-input" placeholder="Search skills, paths, or documentation..." />
          </div>
        ) : (
          <>
            <div className="search-bar" style={{ width: '300px' }}>
              <Search size={18} color="var(--text-secondary)" />
              <input type="text" className="search-input" placeholder="Search..." />
            </div>
            <Bell size={20} style={{ cursor: 'pointer', opacity: 0.6 }} />
            <Settings size={20} style={{ cursor: 'pointer', opacity: 0.6 }} />
            <div className="user-avatar-nav">
              <img src="/user_portrait_ai_1773946741731.png" alt="User" />
            </div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
