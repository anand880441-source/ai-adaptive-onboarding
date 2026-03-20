import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Search, Bell, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  if (isAuthPage) return null;

  const isDashboardOrUpload = location.pathname === '/dashboard' || location.pathname === '/upload';
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // You could trigger a global search event or update context here
    console.log("Searching for:", e.target.value);
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
          {!isDashboardOrUpload ? (
            <>
              <NavLink to="/signin" className="nav-signin-link" onClick={() => setIsMenuOpen(false)}>Sign In</NavLink>
              <button className="btn-upload" style={{ padding: '0.6rem 1.2rem' }} onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>Get Started</button>
            </>
          ) : (
            <>
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
              <div className="nav-icons-v2">
                <Bell size={20} style={{ cursor: 'pointer', opacity: 0.6 }} />
                <Settings 
                  size={20} 
                  style={{ cursor: 'pointer', opacity: 0.6 }} 
                  onClick={() => { navigate('/settings'); setIsMenuOpen(false); }}
                />
                <div className="user-avatar-nav" onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} style={{ cursor: 'pointer' }}>
                  <img src="/user_portrait_ai_1773946741731.png" alt="User" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
