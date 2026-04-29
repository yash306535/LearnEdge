import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-logo">🎓 LearnEdge.online</div>
        <h2 className="auth-left-title">Welcome Back, Learner!</h2>
        <p className="auth-left-sub">Continue your AI learning journey and pick up right where you left off.</p>
        <div className="auth-left-features">
          {[
            { icon: '🎬', text: 'Access all your enrolled courses instantly' },
            { icon: '📈', text: 'Track your learning progress in real time' },
            { icon: '🏆', text: 'View and share your earned certificates' },
            { icon: '🌍', text: 'Learn from anywhere, on any device' },
          ].map((f, i) => (
            <div key={i} className="auth-left-feature">
              <span className="auth-left-feature-icon">{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <div className="auth-box-header">
            <h1 className="auth-box-title">Sign In</h1>
            <p className="auth-box-sub">
              Don't have an account? <Link to="/register">Create one free →</Link>
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email" required placeholder="you@example.com"
                className="form-input"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <a href="#" style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a>
              </div>
              <input
                type="password" required placeholder="Enter your password"
                className="form-input"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" style={{ fontSize: '0.875rem', color: 'var(--text-sub)', cursor: 'pointer' }}>
                Remember me for 30 days
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? '⏳ Signing in...' : '→ Sign In to LearnEdge'}
            </button>
          </form>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or continue with</span>
            <div className="auth-divider-line" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <button className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
              🔵 Google
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
              🔷 GitHub
            </button>
          </div>

          <div className="auth-terms">
            By signing in, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              <strong>Demo:</strong> Register first with any email/password, then log in with those same credentials. All data is stored locally in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
