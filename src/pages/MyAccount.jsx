import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';

export default function MyAccount() {
  const { user, logout, enrollments, certificates, getProgress } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const enrolledCourses = courses.filter(c => enrollments[c.id]);
  const completedCourses = enrolledCourses.filter(c => enrollments[c.id]?.completed);
  const totalHours = enrolledCourses.reduce((acc, c) => acc + Math.round(c.totalHours * (getProgress(c.id) / 100)), 0);

  const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() : '?';

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sidebarItems = [
    { key: 'profile', icon: '👤', label: 'Profile & Account' },
    { key: 'learning', icon: '📊', label: 'Learning Stats' },
    { key: 'security', icon: '🔒', label: 'Security' },
    { key: 'notifications', icon: '🔔', label: 'Notifications' },
    { key: 'billing', icon: '💳', label: 'Billing & Plans' },
    { key: 'privacy', icon: '🛡️', label: 'Privacy' },
  ];

  return (
    <div className="account-page">
      {/* HERO */}
      <div className="account-hero">
        <div className="container">
          <div className="account-profile-row">
            <div className="account-avatar-big">{initials}</div>
            <div>
              <div className="account-name">{user?.firstName} {user?.lastName}</div>
              <div className="account-email">{user?.email}</div>
              <div className="account-hero-badges">
                <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.72rem' }}>
                  🎓 {enrolledCourses.length} courses enrolled
                </span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.72rem' }}>
                  🏆 {certificates.length} certificates
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="account-body">
        <div className="container">
          <div className="account-grid">
            {/* SIDEBAR */}
            <div className="account-sidebar">
              {sidebarItems.map(item => (
                <div
                  key={item.key}
                  className={`account-sidebar-item ${activeTab === item.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.key)}
                >
                  <span className="icon">{item.icon}</span>
                  {item.label}
                </div>
              ))}
              <div className="nav-dropdown-divider" style={{ margin: '0.5rem 0' }} />
              <div
                className="account-sidebar-item"
                style={{ color: 'var(--danger)' }}
                onClick={() => { logout(); navigate('/'); }}
              >
                <span className="icon">🚪</span>
                Sign Out
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div>
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div>
                  <div className="account-card">
                    <div className="account-card-title">Profile Information</div>
                    {saved && (
                      <div className="alert alert-success" style={{ marginBottom: '1rem' }}>
                        ✅ Profile updated successfully!
                      </div>
                    )}
                    <form onSubmit={handleSave}>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">First Name</label>
                          <input type="text" className="form-input" defaultValue={user?.firstName} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Last Name</label>
                          <input type="text" className="form-input" defaultValue={user?.lastName} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-input" defaultValue={user?.email} />
                        <div className="form-hint">Your email is used for login and certificate delivery.</div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Display Name / Username</label>
                        <input type="text" className="form-input" defaultValue={`${user?.firstName?.toLowerCase()}_${user?.lastName?.toLowerCase()}`} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Professional Title</label>
                        <input type="text" className="form-input" placeholder="e.g. AI Engineer, Product Manager, Student..." />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Bio</label>
                        <textarea className="form-input" rows="3" placeholder="Tell us a bit about yourself and your AI learning goals..." style={{ resize: 'vertical' }} />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Country</label>
                          <select className="form-input">
                            <option>Select your country</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Germany</option>
                            <option>India</option>
                            <option>Canada</option>
                            <option>Australia</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Timezone</label>
                          <select className="form-input">
                            <option>UTC-5 (Eastern)</option>
                            <option>UTC-6 (Central)</option>
                            <option>UTC-7 (Mountain)</option>
                            <option>UTC-8 (Pacific)</option>
                            <option>UTC+0 (London)</option>
                            <option>UTC+1 (Berlin)</option>
                          </select>
                        </div>
                      </div>
                      <div className="account-form-actions">
                        <button type="submit" className="btn btn-primary">
                          💾 Save Changes
                        </button>
                        <button type="button" className="btn btn-secondary">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="account-card">
                    <div className="account-card-title">Certificate Name</div>
                    <div className="alert alert-info" style={{ marginBottom: '1rem' }}>
                      ℹ️ Your certificates will show your full legal name: <strong>{user?.firstName} {user?.lastName}</strong>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                      This name was set when you registered and appears on all your certificates. If your name has a spelling error, contact our support team to get it corrected on future certificates.
                    </p>
                    <div style={{ marginTop: '1rem', padding: '1.25rem', background: 'linear-gradient(135deg, #FFF7ED, #FFFBEB)', border: '2px solid #FDE68A', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--primary)', fontWeight: 700 }}>
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#92400E', marginTop: '0.4rem' }}>
                        This is how your name will appear on certificates
                      </div>
                    </div>
                  </div>

                  <div className="account-card">
                    <div className="account-card-title" style={{ color: 'var(--danger)' }}>Danger Zone</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Deleting your account is permanent and cannot be undone. All your learning progress and certificates will be lost.
                    </p>
                    <button className="btn btn-danger btn-sm">🗑 Delete Account</button>
                  </div>
                </div>
              )}

              {/* LEARNING STATS TAB */}
              {activeTab === 'learning' && (
                <div>
                  <div className="account-card">
                    <div className="account-card-title">📊 Learning Statistics</div>
                    <div className="account-stats-row">
                      <div className="account-stat">
                        <div className="n">{enrolledCourses.length}</div>
                        <div className="l">Courses Enrolled</div>
                      </div>
                      <div className="account-stat">
                        <div className="n">{completedCourses.length}</div>
                        <div className="l">Completed</div>
                      </div>
                      <div className="account-stat">
                        <div className="n">{totalHours}h</div>
                        <div className="l">Hours Learned</div>
                      </div>
                      <div className="account-stat">
                        <div className="n">{certificates.length}</div>
                        <div className="l">Certificates</div>
                      </div>
                    </div>
                  </div>

                  {enrolledCourses.length > 0 && (
                    <div className="account-card">
                      <div className="account-card-title">📚 Course Progress</div>
                      <div className="account-progress-list">
                        {enrolledCourses.map(c => {
                          const prog = getProgress(c.id);
                          const done = enrollments[c.id]?.completed;
                          return (
                            <div key={c.id} className="account-progress-item">
                              <img src={c.thumbnail} alt={c.title} className="account-progress-thumb" />
                              <div className="account-progress-main">
                                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{c.title}</div>
                                <div className="progress-bar-wrap" style={{ height: 8 }}>
                                  <div className="progress-bar-fill" style={{ width: `${prog}%`, background: done ? 'var(--success)' : undefined }} />
                                </div>
                              </div>
                              <div className="account-progress-status" style={{ color: done ? 'var(--success)' : 'var(--primary)' }}>
                                {done ? '✅ Done' : `${prog}%`}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="account-card">
                    <div className="account-card-title">🏅 Achievements</div>
                    <div className="account-achievements-grid">
                      {[
                        { icon: '🎯', name: 'First Enrollment', desc: 'Enrolled in your first course', unlocked: enrolledCourses.length > 0 },
                        { icon: '🔥', name: 'On Fire!', desc: '3-day learning streak', unlocked: enrolledCourses.length > 0 },
                        { icon: '🏆', name: 'Graduate', desc: 'Completed your first course', unlocked: completedCourses.length > 0 },
                        { icon: '🚀', name: 'Overachiever', desc: 'Earned 2+ certificates', unlocked: certificates.length >= 2 },
                        { icon: '💎', name: 'Diamond Learner', desc: '100+ hours of learning', unlocked: totalHours >= 100 },
                        { icon: '🌟', name: 'AI Master', desc: 'Completed all courses', unlocked: completedCourses.length === courses.length && courses.length > 0 },
                        { icon: '📝', name: 'Note Taker', desc: 'Added learning notes', unlocked: false },
                        { icon: '🤝', name: 'Collaborator', desc: 'Helped 5 students', unlocked: false },
                      ].map((a, i) => (
                        <div
                          key={i}
                          className="account-achievement-card"
                          style={{
                            background: a.unlocked ? 'linear-gradient(135deg, #FFF7ED, #FFFBEB)' : 'var(--bg-gray)',
                            border: `2px solid ${a.unlocked ? '#FDE68A' : 'var(--border)'}`,
                            opacity: a.unlocked ? 1 : 0.5,
                          }}
                        >
                          <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem', filter: a.unlocked ? 'none' : 'grayscale(1)' }}>{a.icon}</div>
                          <div style={{ fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.2rem' }}>{a.name}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{a.desc}</div>
                          {a.unlocked && <div style={{ fontSize: '0.65rem', color: '#92400E', fontWeight: 700, marginTop: '0.3rem' }}>✓ UNLOCKED</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (
                <div className="account-card">
                  <div className="account-card-title">🔒 Security Settings</div>
                  <form onSubmit={e => { e.preventDefault(); alert('Password changed (demo).'); }}>
                    <div className="form-group">
                      <label className="form-label">Current Password</label>
                      <input type="password" className="form-input" placeholder="Enter current password" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input type="password" className="form-input" placeholder="Enter new password" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirm New Password</label>
                      <input type="password" className="form-input" placeholder="Confirm new password" />
                    </div>
                    <button type="submit" className="btn btn-primary">🔑 Update Password</button>
                  </form>
                  <div className="divider" />
                  <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Two-Factor Authentication</h4>
                  <div className="account-inline-row">
                    <div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-sub)' }}>Add an extra layer of security to your account.</p>
                    </div>
                    <button className="btn btn-secondary btn-sm">Enable 2FA</button>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div className="account-card">
                  <div className="account-card-title">🔔 Notification Preferences</div>
                  {[
                    { label: 'Course updates and new content', sub: 'Get notified when courses you enrolled in are updated', on: true },
                    { label: 'New course announcements', sub: 'Be first to know about new courses in your areas of interest', on: true },
                    { label: 'Learning reminders', sub: 'Daily or weekly reminders to keep your learning streak going', on: false },
                    { label: 'Certificate notifications', sub: 'Notifications when your certificates are ready', on: true },
                    { label: 'Promotional offers', sub: 'Discounts, sales, and special offers on courses', on: false },
                    { label: 'Community activity', sub: 'Replies to your comments and forum activity', on: true },
                  ].map((item, i) => (
                    <div key={i} className="settings-row">
                      <div className="settings-copy">
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{item.sub}</div>
                      </div>
                      <div className="settings-toggle" style={{ background: item.on ? 'var(--primary)' : 'var(--border)' }}>
                        <div className="settings-toggle-knob" style={{ left: item.on ? 23 : 3 }} />
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-primary" style={{ marginTop: '1.25rem' }}>Save Preferences</button>
                </div>
              )}

              {/* BILLING TAB */}
              {activeTab === 'billing' && (
                <div>
                  <div className="account-card">
                    <div className="account-card-title">💳 Current Plan</div>
                    <div className="account-plan-row">
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>Free Plan</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>3 courses · Basic features</div>
                      </div>
                      <button className="btn btn-primary" onClick={() => navigate('/')}>⬆ Upgrade to Pro</button>
                    </div>
                  </div>
                  <div className="account-card">
                    <div className="account-card-title">📋 Billing History</div>
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                      No billing history yet. Upgrade to a paid plan to see your invoices.
                    </div>
                  </div>
                </div>
              )}

              {/* PRIVACY TAB */}
              {activeTab === 'privacy' && (
                <div className="account-card">
                  <div className="account-card-title">🛡️ Privacy Settings</div>
                  {[
                    { label: 'Public Profile', sub: 'Allow other learners to see your profile and achievements', on: false },
                    { label: 'Show Learning Activity', sub: 'Display your course progress and completion status publicly', on: false },
                    { label: 'Allow Course Recommendations', sub: 'Use my learning history to suggest personalized courses', on: true },
                    { label: 'Analytics & Improvement', sub: 'Share anonymous usage data to help improve LearnEdge', on: true },
                  ].map((item, i) => (
                    <div key={i} className="settings-row">
                      <div className="settings-copy">
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{item.sub}</div>
                      </div>
                      <div className="settings-toggle" style={{ background: item.on ? 'var(--primary)' : 'var(--border)' }}>
                        <div className="settings-toggle-knob" style={{ left: item.on ? 23 : 3 }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Data & Privacy</h4>
                    <div className="account-data-actions">
                      <button className="btn btn-secondary btn-sm">📥 Download My Data</button>
                      <button className="btn btn-secondary btn-sm">🗑 Request Data Deletion</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
