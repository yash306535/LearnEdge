import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match. Please check and try again.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Please enter your first and last name.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = register({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/dashboard');
    }
  };

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-logo">🎓 LearnEdge.online</div>
        <h2 className="auth-left-title">Start Your AI Journey For Free</h2>
        <p className="auth-left-sub">Create your free account and join 50,000+ learners mastering Claude AI.</p>
        <div className="auth-left-features">
          {[
            { icon: '🎓', text: 'Instant access to 3 free courses' },
            { icon: '🏆', text: 'Earn shareable certificates upon completion' },
            { icon: '🚀', text: 'Learn from ex-Anthropic AI researchers' },
            { icon: '📱', text: 'Learn on any device, anytime, anywhere' },
          ].map((f, i) => (
            <div key={i} className="auth-left-feature">
              <span className="auth-left-feature-icon">{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.5rem' }}>🌟 Join thousands of satisfied learners</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex' }}>
              {['🟣','🔵','🟢','🟡','🔴'].map((c, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', border: '2px solid rgba(255,255,255,0.5)', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>
                  {['M','S','A','J','K'][i]}
                </div>
              ))}
            </div>
            <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>+1,200 joined this week</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <div className="auth-box-header">
            <h1 className="auth-box-title">Create Account</h1>
            <p className="auth-box-sub">
              Already have an account? <Link to="/login">Sign in →</Link>
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">First Name *</label>
                <input
                  type="text" required placeholder="Jane"
                  className="form-input"
                  value={form.firstName}
                  onChange={set('firstName')}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Last Name *</label>
                <input
                  type="text" required placeholder="Smith"
                  className="form-input"
                  value={form.lastName}
                  onChange={set('lastName')}
                />
              </div>
            </div>
            <div style={{ marginTop: '0.4rem', marginBottom: '0.5rem' }}>
              <p className="form-hint">⭐ Your full name will appear on your certificates — use your real name!</p>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email" required placeholder="jane@example.com"
                className="form-input"
                value={form.email}
                onChange={set('email')}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password" required placeholder="At least 6 characters"
                className="form-input" minLength={6}
                value={form.password}
                onChange={set('password')}
              />
              <div className="form-hint">
                Strength: {form.password.length === 0 ? '—' : form.password.length < 6 ? '🔴 Weak' : form.password.length < 10 ? '🟡 Fair' : '🟢 Strong'}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password" required placeholder="Re-enter your password"
                className="form-input"
                value={form.confirm}
                onChange={set('confirm')}
              />
              {form.confirm && form.password !== form.confirm && (
                <div className="form-error">⚠️ Passwords don't match</div>
              )}
              {form.confirm && form.password === form.confirm && form.confirm.length > 0 && (
                <div style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '0.3rem' }}>✓ Passwords match</div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <input type="checkbox" id="terms" required style={{ marginTop: '0.2rem' }} />
              <label htmlFor="terms" style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: 1.5 }}>
                I agree to LearnEdge's <a href="#" style={{ color: 'var(--primary)' }}>Terms of Service</a> and{' '}
                <a href="#" style={{ color: 'var(--primary)' }}>Privacy Policy</a>. I'm at least 16 years old.
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? '⏳ Creating your account...' : '🎓 Create Free Account'}
            </button>
          </form>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or sign up with</span>
            <div className="auth-divider-line" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
              🔵 Google
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
              🔷 GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
