import React, { useState } from 'react';
import { Search, Bell, Settings, Zap } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import UploadInterface from './pages/UploadInterface';
import Dashboard from './pages/Dashboard';
import Solutions from './pages/Solutions';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';

function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="app-container">
      <nav className="main-nav">
        <div className="logo-text" onClick={() => setView('landing')} style={{ cursor: 'pointer' }}>
          <div style={{ width: '28px', height: '28px', background: 'var(--accent-purple)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Zap size={16} fill="white" color="white" />
          </div>
          OnboardAI
        </div>

        <div className="nav-links">
          <a href="#" onClick={() => setView('features')}>Features</a>
          <a href="#" onClick={() => setView('solutions')}>Solutions</a>
          <a href="#" onClick={() => setView('pricing')}>Pricing</a>
          <a href="#" onClick={() => setView('about')}>About</a>
        </div>

        <div className="nav-btns">
          {view === 'landing' || view === 'solutions' || view === 'features' || view === 'pricing' || view === 'about' ? (
            <>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Sign In</a>
              <button className="btn-upload" style={{ padding: '0.6rem 1.2rem' }} onClick={() => setView('upload')}>Get Started</button>
            </>
          ) : view === 'upload' ? (
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
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffedd5', border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <img src="/user_portrait_ai_1773946741731.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </>
          )}
        </div>
      </nav>

      <main>
        <div className="container">
          {view === 'landing' && <LandingPage onStart={() => setView('upload')} />}
          {view === 'upload' && <UploadInterface onProcess={() => setView('dashboard')} />}
          {view === 'dashboard' && <Dashboard />}
          {view === 'solutions' && <Solutions />}
          {view === 'features' && <Features />}
          {view === 'pricing' && <Pricing />}
          {view === 'about' && <About />}
        </div>
      </main>
    </div>
  );
}

export default App;
