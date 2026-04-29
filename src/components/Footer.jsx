import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo footer-brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="nav-logo-icon">🎓</div>
              <span style={{ color: 'white' }}>Learn<span style={{ color: 'var(--primary-mid)' }}>Edge</span><span style={{ color: 'rgba(255,255,255,0.4)', fontSize:'0.85rem', fontWeight:500 }}>.online</span></span>
            </div>
            <p className="footer-brand-desc">
              The leading platform for mastering AI with Claude. Join 50,000+ learners building the future with artificial intelligence.
            </p>
            <div className="footer-social">
              <div className="footer-social-btn" title="Twitter">𝕏</div>
              <div className="footer-social-btn" title="LinkedIn">in</div>
              <div className="footer-social-btn" title="YouTube">▶</div>
              <div className="footer-social-btn" title="Discord">💬</div>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Courses</div>
            <div className="footer-links">
              <Link to="/courses" className="footer-link">All Courses</Link>
              <span className="footer-link">AI Fundamentals</span>
              <span className="footer-link">Prompt Engineering</span>
              <span className="footer-link">API Development</span>
              <span className="footer-link">Data Science</span>
              <span className="footer-link">NLP & Research</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <span className="footer-link">About Us</span>
              <span className="footer-link">Careers</span>
              <span className="footer-link">Blog</span>
              <span className="footer-link">Press</span>
              <span className="footer-link">Become an Instructor</span>
              <span className="footer-link">Partnerships</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Support</div>
            <div className="footer-links">
              <span className="footer-link">Help Center</span>
              <span className="footer-link">Contact Us</span>
              <span className="footer-link">Community Forum</span>
              <span className="footer-link">Terms of Service</span>
              <span className="footer-link">Privacy Policy</span>
              <span className="footer-link">Cookie Settings</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-text">
            © {new Date().getFullYear()} LearnEdge.online. All rights reserved. Made with ❤️ for AI learners worldwide.
          </div>
          <div className="footer-bottom-links">
            <span className="footer-bottom-link">Privacy</span>
            <span className="footer-bottom-link">Terms</span>
            <span className="footer-bottom-link">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
