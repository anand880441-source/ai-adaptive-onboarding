import React from 'react';
import { Zap, Infinity, Cpu, Terminal, Network } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page-v3">
      {/* Hero Section */}
      <section className="about-hero-v3">
        <div className="about-hero-content-v3">
          <div className="pill-mission-v3">OUR MISSION</div>
          <h1 className="about-heading-v3">Our Vision</h1>
          <p className="about-subtext-v3">
            The future of human-AI collaboration. Empowering synergy through elegant intelligence and seamless integration. 
            We build the bridges between biological intuition and digital precision.
          </p>
          <div className="about-btns-v3">
            <button className="btn-solid-v3">Read Our Story</button>
            <button className="btn-outline-v3">View Roadmap</button>
          </div>
        </div>
        <div className="about-hero-visual-v3">
          <div className="vision-glass-card-v3">
            <div className="infinity-glow-v3">
              <Infinity size={100} color="var(--accent-purple)" strokeWidth={1.5} />
            </div>
            <div className="vision-quote-v3">
              <p>"The next evolution of intelligence is not replacement, but extension."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section-v3">
        <h2 className="section-title-v3">The Team</h2>
        <p className="section-desc-v3">Pioneers in neural architecture and cognitive design.</p>
        
        <div className="team-grid-v3">
          <div className="team-card-v3">
            <div className="team-avatar-v3"></div>
            <div className="team-details-v3">
              <h4>Alex Rivers</h4>
              <p>CEO & Founder</p>
            </div>
          </div>
          <div className="team-card-v3">
            <div className="team-avatar-v3"></div>
            <div className="team-details-v3">
              <h4>Dr. Elena Vosh</h4>
              <p>Head of AI Research</p>
            </div>
          </div>
          <div className="team-card-v3">
            <div className="team-avatar-v3"></div>
            <div className="team-details-v3">
              <h4>Marcus Chen</h4>
              <p>Chief Architect</p>
            </div>
          </div>
          <div className="team-card-v3">
            <div className="team-avatar-v3"></div>
            <div className="team-details-v3">
              <h4>Sarah Jenkins</h4>
              <p>Product Design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section-v3">
        <h2 className="section-title-v3 centered">Our Tech Stack</h2>
        <p className="section-desc-v3 centered">Building on the bleeding edge. Our infrastructure is designed for high-concurrency, low-latency intelligence.</p>
        
        <div className="tech-grid-v3">
          <div className="tech-card-v3">
            <div className="tech-icon-v3">
              <Cpu size={24} />
            </div>
            <h3>Next-gen Neural Nets</h3>
            <p>Proprietary transformer architectures optimized for multimodal reasoning and context retention.</p>
          </div>
          <div className="tech-card-v3">
            <div className="tech-icon-v3">
              <Terminal size={24} />
            </div>
            <h3>Predictive Engines</h3>
            <p>Real-time Bayesian inference systems that anticipate user needs before they are articulated.</p>
          </div>
          <div className="tech-card-v3">
            <div className="tech-icon-v3">
              <Network size={24} />
            </div>
            <h3>Neural Mapping</h3>
            <p>High-dimensional vector spaces for semantic understanding and cross-domain knowledge transfer.</p>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="brands-showcase-v3">
        <div className="brand-strip-v3">
          <span>LLM+</span>
          <span>TRANSFORM</span>
          <span>VECTRA</span>
          <span>CORTEX</span>
        </div>
      </section>

      <footer className="footer-v3">
        <div className="footer-main-v3">
          <div className="footer-brand-v3">
            <Zap size={20} fill="white" /> OnboardAI
          </div>
          <div className="footer-links-v3">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Career</a>
          </div>
          <div className="footer-copy-v3">
            © 2024 OnboardAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
