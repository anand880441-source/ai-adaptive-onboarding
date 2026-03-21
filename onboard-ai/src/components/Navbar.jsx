import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Search, Bell, Settings, Menu, X, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    const token = sessionStorage.getItem('token');
    const userData = sessionStorage.getItem('user');
    setIsLoggedIn(!!token);
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {}
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    
    // Listen for storage changes (for cross-tab)
    window.addEventListener('storage', checkAuth);
    // Listen for custom auth event (for same tab)
    window.addEventListener('authChange', checkAuth);
    // Also check every 500ms as fallback (remove after testing)
    const interval = setInterval(checkAuth, 500);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
      clearInterval(interval);
    };
  }, []);

  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
  if (isAuthPage) return null;

  const isDashboardOrUpload = location.pathname === '/dashboard' || location.pathname === '/upload';

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('dashboardData');
    sessionStorage.removeItem('moduleProgress');
    localStorage.removeItem('dashboardData');
    setIsLoggedIn(false);
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
    setIsMenuOpen(false);
  };

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

      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <div className={`nav-menu-wrapper ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-links">
          {[
            ...(isLoggedIn ? [{ name: 'Dashboard', path: '/dashboard' }, { name: 'Upload', path: '/upload' }] : []),
            { name: 'Features', path: '/features' },
            { name: 'Solutions', path: '/solutions' },
            { name: 'Pricing', path: '/pricing' },
            { name: 'About', path: '/about' }
          ].map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => isActive ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="nav-btns">
          {!isLoggedIn ? (
            <>
              <NavLink to="/signin" className="nav-signin-link" onClick={() => setIsMenuOpen(false)}>Sign In</NavLink>
              <button className="btn-upload" style={{ padding: '0.6rem 1.2rem' }} onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>Get Started</button>
            </>
          ) : (
            <>
              {!isDashboardOrUpload && (
                <div className="search-bar">
                  <Search size={18} color="var(--text-secondary)" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              )}
              <div className="nav-icons-v2">
                <Bell size={20} style={{ cursor: 'pointer', opacity: 0.6 }} />
                <Settings
                  size={20}
                  style={{ cursor: 'pointer', opacity: 0.6 }}
                  onClick={() => { navigate('/settings'); setIsMenuOpen(false); }}
                />
                <div className="user-avatar-nav" onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} style={{ cursor: 'pointer' }}>
                  <img src={user?.avatar || user?.photo || "/user_portrait_ai_1773946741731.png"} alt={user?.name || 'User'} />
                </div>
                <button onClick={handleLogout} className="logout-btn-nav">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
