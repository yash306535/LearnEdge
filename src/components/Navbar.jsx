import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
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
          <div className="nav-logo-icon">🎓</div>
          <span>Learn<span>Edge</span></span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/courses" className={`nav-link ${isActive('/courses') ? 'active' : ''}`}>Courses</Link>
          {user && (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
              <Link to="/my-learning" className={`nav-link ${isActive('/my-learning') ? 'active' : ''}`}>My Learning</Link>
              <Link to="/certificates" className={`nav-link ${isActive('/certificates') ? 'active' : ''}`}>Certificates</Link>
            </>
          )}
        </div>

        <div className="nav-auth">
          {user ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <div className="nav-user" onClick={() => setDropdownOpen(o => !o)}>
                <div className="nav-avatar">{initials}</div>
                <span className="nav-user-name">{user.firstName}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{dropdownOpen ? '▲' : '▼'}</span>
              </div>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.4rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.firstName} {user.lastName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{user.email}</div>
                  </div>
                  <div className="nav-dropdown-item" onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }}>
                    <span>📊</span> Dashboard
                  </div>
                  <div className="nav-dropdown-item" onClick={() => { navigate('/my-learning'); setDropdownOpen(false); }}>
                    <span>📚</span> My Learning
                  </div>
                  <div className="nav-dropdown-item" onClick={() => { navigate('/certificates'); setDropdownOpen(false); }}>
                    <span>🏆</span> My Certificates
                  </div>
                  <div className="nav-dropdown-item" onClick={() => { navigate('/account'); setDropdownOpen(false); }}>
                    <span>👤</span> Account Settings
                  </div>
                  <div className="nav-dropdown-divider" />
                  <div className="nav-dropdown-item danger" onClick={handleLogout}>
                    <span>🚪</span> Sign Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started Free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
