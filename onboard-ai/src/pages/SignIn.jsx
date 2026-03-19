import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Github, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="auth-container-v4">
      <div className="auth-split-v4">
        {/* Left Side: Neural Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="auth-visual-v4 signin-visual"
        >
          <div className="logo-overlay-v4">
            <div className="logo-box-v4">
              <Zap size={20} fill="white" color="white" />
            </div>
            <span className="logo-text-v4">OnboardAI</span>
          </div>

          <div className="neural-network-bg">
            <div className="neural-core"></div>
            <div className="neural-mesh"></div>
          </div>

          <div className="visual-content-v4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hero-title-v4"
            >
              THE NEURAL <br /> <span className="onboarding-gradient">ARCHITECT.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hero-subtitle-v4"
            >
              Step into the intersection of high-order logic and human intuition. Your synthesis journey begins here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="visionaries-row-v4"
            >
              <div className="avatar-group-v4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=50&h=50&auto=format&fit=crop" alt="User" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=50&h=50&auto=format&fit=crop" alt="User" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=50&h=50&auto=format&fit=crop" alt="User" />
              </div>
              <span className="joined-text-v4">JOINED BY 20,000+ VISIONARIES</span>
            </motion.div>
          </div>

          <div className="visual-footer-v4">
            <span>© 2024 ONBOARDAI. GUIDED BY NEURAL LOGIC.</span>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="auth-form-side-v4"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="form-inner-v4"
          >
            <motion.div variants={itemVariants} className="form-header-v4">
              <h2>Sign In</h2>
              <p>Access your neural dashboard</p>
            </motion.div>

            <motion.div variants={itemVariants} className="social-auth-v4">
              <button className="social-btn-v4">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                Google
              </button>
              <button className="social-btn-v4">
                <Github size={18} />
                GitHub
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="auth-divider-v4">
              <span>NEURAL PROTOCOL</span>
            </motion.div>

            <motion.form variants={itemVariants} className="main-auth-form-v4">
              <div className="input-group-v4">
                <label>EMAIL IDENTITY</label>
                <div className="input-wrapper-v4">
                  <Mail size={16} className="input-icon-v4" />
                  <input type="email" placeholder="name@domain.com" />
                </div>
              </div>

              <div className="input-group-v4">
                <div className="label-row-v4">
                  <label>ACCESS KEY</label>
                  <a href="#" className="recover-link-v4">RECOVER?</a>
                </div>
                <div className="input-wrapper-v4">
                  <Lock size={16} className="input-icon-v4" />
                  <input type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="form-options-v4">
                <label className="checkbox-container-v4">
                  <input type="checkbox" />
                  <span className="checkmark-v4"></span>
                  Persist Session
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="auth-submit-btn-v4"
              >
                Execute Sign-In
              </motion.button>
            </motion.form>

            <motion.p variants={itemVariants} className="auth-switch-v4">
              New to the ecosystem? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Initialize Account</a>
            </motion.p>
          </motion.div>

          <div className="form-footer-nav-v4">
            <a href="#">PRIVACY PROTOCOL</a>
            <a href="#">TERMS OF SYNTHESIS</a>
          </div>

          <div className="system-status-v4">
            <div className="status-dot-v4"></div>
            <span>SYSTEM STATUS: NOMINAL</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
