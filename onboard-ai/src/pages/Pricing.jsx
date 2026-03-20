import React from 'react';
import { Check, X, HelpCircle, Zap, Globe, Instagram, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <div className="pricing-page-v2">
      {/* Hero Section */}
      <section className="price-hero-v2">
        <div className="pill-label">PRICING PLANS</div>
        <h1 className="price-title-v2">Flexible Plans for <span className="onboarding-gradient">Every Team</span></h1>
        <p className="price-subtitle-v2">Scale your workforce intelligence with OnboardAI's tailored solutions. Choose a plan that grows with your organization.</p>
      </section>

      {/* Pricing Cards */}
      <section className="price-cards-grid-v2">
        {/* Starter Plan */}
        <div className="price-card-v2">
          <h4>Starter</h4>
          <div className="price-amount-v2">
            <span className="currency">$</span>
            <span className="value">0</span>
            <span className="period">/month</span>
          </div>
          <p className="price-card-desc">Perfect for small teams getting started with AI-driven training.</p>
          <ul className="price-features-v2">
            <li><Check size={16} className="check-icon" /> Up to 5 users</li>
            <li><Check size={16} className="check-icon" /> Basic skill-gap detection</li>
            <li><Check size={16} className="check-icon" /> Personalized pathways</li>
            <li className="disabled"><X size={16} className="x-icon" /> Advanced Analytics</li>
          </ul>
          <button className="price-btn-outline-v2" onClick={() => navigate('/signup')}>Start for Free</button>
        </div>

        {/* Growth Plan */}
        <div className="price-card-v2 featured">
          <div className="card-badge-v2">MOST POPULAR</div>
          <h4>Growth</h4>
          <div className="price-amount-v2">
            <span className="currency">$</span>
            <span className="value">49</span>
            <span className="period">/user/month</span>
          </div>
          <p className="price-card-desc">Advanced features for growing organizations seeking rapid scaling.</p>
          <ul className="price-features-v2">
            <li><Check size={16} className="check-icon" /> Everything in Starter</li>
            <li><Check size={16} className="check-icon" /> Unlimited skill mapping</li>
            <li><Check size={16} className="check-icon" /> Advanced Analytics</li>
            <li><Check size={16} className="check-icon" /> Priority Support</li>
          </ul>
          <button className="price-btn-primary-v2" onClick={() => navigate('/signup')}>Choose Growth</button>
        </div>

        {/* Enterprise Plan */}
        <div className="price-card-v2">
          <h4>Enterprise</h4>
          <div className="price-amount-v2">
            <span className="value">Custom</span>
          </div>
          <p className="price-card-desc">Full-scale solutions with maximum security and integration capabilities.</p>
          <ul className="price-features-v2">
            <li><Check size={16} className="check-icon" /> 100+ users</li>
            <li><Check size={16} className="check-icon" /> Dedicated account manager</li>
            <li><Check size={16} className="check-icon" /> Custom Integrations</li>
            <li><Check size={16} className="check-icon" /> SSO & Advanced Security</li>
          </ul>
          <button className="price-btn-outline-v2" onClick={() => navigate('/about')}>Contact Sales</button>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="compare-section-v2">
        <h2 className="price-section-title">Compare <span className="onboarding-gradient">Features</span></h2>
        <div className="compare-table-wrapper-v2">
          <table className="compare-table-v2">
            <thead>
              <tr>
                <th>FEATURE</th>
                <th>STARTER</th>
                <th>GROWTH</th>
                <th>ENTERPRISE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Skill Gap Analysis</td>
                <td>Basic</td>
                <td>Advanced</td>
                <td>Custom Models</td>
              </tr>
              <tr>
                <td>Custom Roadmaps</td>
                <td><Check size={18} color="var(--accent-purple)" /></td>
                <td><Check size={18} color="var(--accent-purple)" /></td>
                <td><Check size={18} color="var(--accent-purple)" /></td>
              </tr>
              <tr>
                <td>Enterprise Integrations</td>
                <td>—</td>
                <td>Limited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Admin Analytics</td>
                <td>—</td>
                <td><Check size={18} color="var(--accent-purple)" /></td>
                <td><Check size={18} color="var(--accent-purple)" /></td>
              </tr>
              <tr>
                <td>Support Level</td>
                <td>Community</td>
                <td>Priority Email</td>
                <td>24/7 Dedicated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section-v2">
        <h2 className="price-section-title">Frequently Asked <span className="onboarding-gradient">Questions</span></h2>
        <div className="faq-grid-v2">
          <div className="faq-item-v2">
            <h3>How does billing work?</h3>
            <p>We bill monthly or annually. Annual plans come with a 20% discount. You can upgrade, downgrade, or cancel at any time through your dashboard.</p>
          </div>
          <div className="faq-item-v2">
            <h3>Can I scale my team mid-month?</h3>
            <p>Yes! You can add new seats to your Growth plan instantly. We'll pro-rate the remaining month for the new users.</p>
          </div>
          <div className="faq-item-v2">
            <h3>Is my data secure?</h3>
            <p>Data security is our top priority. We use industry-standard AES-256 encryption and are SOC2 Type II compliant. Enterprise plans include additional SSO and access control features.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="price-final-cta-v2">
        <div className="cta-box-v2">
          <h2 className="cta-title-v2">Ready to transform your onboarding?</h2>
          <p className="cta-subtitle-v2">Join 500+ forward-thinking companies already using OnboardAI to empower their workforce.</p>
          <div className="cta-btns-v2">
            <button className="cta-btn-white-v2" onClick={() => navigate('/signup')}>Start Free Trial</button>
            <button className="cta-btn-ghost-v2">Schedule Demo</button>
          </div>
        </div>
      </section>

      <footer className="footer-v2">
        <div className="footer-content-v2">
          <div className="footer-left-v2">
            <span className="logo-text-v2"><Zap size={18} fill="white" /> OnboardAI</span>
            <span className="copyright-v2">© 2024 OnboardAI Inc. All rights reserved.</span>
          </div>
          <div className="footer-social-v2">
            <Globe size={18} />
            <Instagram size={18} />
            <Twitter size={18} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
