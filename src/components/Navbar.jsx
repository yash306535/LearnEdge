import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    document.body.style.overflow = mobileMenuOpen && isMobile ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : '';

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">LE</div>
          <span>Learn<span>Edge</span></span>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/courses" className={`nav-link ${isActive('/courses') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Courses</Link>
          {user && (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/my-learning" className={`nav-link ${isActive('/my-learning') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>My Learning</Link>
              <Link to="/certificates" className={`nav-link ${isActive('/certificates') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Certificates</Link>
            </>
          )}

          <div className="nav-links-mobile-footer">
            {user ? (
              <>
                <div className="nav-mobile-user">
                  <div className="nav-avatar">{initials}</div>
                  <div className="nav-mobile-user-copy">
                    <div className="nav-mobile-user-name">{user.firstName} {user.lastName}</div>
                    <div className="nav-mobile-user-email">{user.email}</div>
                  </div>
                </div>
                <Link
                  to="/account"
                  className={`nav-link ${isActive('/account') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account Settings
                </Link>
                <button type="button" className="nav-mobile-signout" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <div className="nav-mobile-auth">
                <Link to="/login" className="btn btn-secondary btn-sm" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </div>
            )}
          </div>
        </div>

        <div className="nav-auth">
          {user ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <div className="nav-user" onClick={() => setDropdownOpen((open) => !open)}>
                <div className="nav-avatar">{initials}</div>
                <span className="nav-user-name">{user.firstName}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{dropdownOpen ? '^' : 'v'}</span>
              </div>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.4rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.firstName} {user.lastName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{user.email}</div>
                  </div>
                  <div className="nav-dropdown-item" onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }}>
                    <span>Dashboard</span>
                  </div>
                  <div className="nav-dropdown-item" onClick={() => { navigate('/my-learning'); setDropdownOpen(false); }}>
                    <span>My Learning</span>
                  </div>
                  <div className="nav-dropdown-item" onClick={() => { navigate('/certificates'); setDropdownOpen(false); }}>
                    <span>My Certificates</span>
                  </div>
                  <div className="nav-dropdown-item" onClick={() => { navigate('/account'); setDropdownOpen(false); }}>
                    <span>Account Settings</span>
                  </div>
                  <div className="nav-dropdown-divider" />
                  <div className="nav-dropdown-item danger" onClick={handleLogout}>
                    <span>Sign Out</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </nav>
  );
}
