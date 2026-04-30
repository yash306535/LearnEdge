import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';

function ProgressBar({ value }) {
  return (
    <div>
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${value}%` }} />
      </div>
      <div className="progress-label">{value}% complete</div>
    </div>
  );
}

export default function Dashboard() {
  const { user, enrollments, certificates, getProgress } = useAuth();
  const navigate = useNavigate();

  const enrolledCourses = courses.filter(c => enrollments[c.id]);
  const completedCourses = enrolledCourses.filter(c => enrollments[c.id]?.completed);
  const inProgressCourses = enrolledCourses.filter(c => !enrollments[c.id]?.completed);
  const totalHoursLearned = enrolledCourses.reduce((acc, c) => acc + Math.round(c.totalHours * (getProgress(c.id) / 100)), 0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstEnrolled = inProgressCourses[0] || completedCourses[0];

  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="container">
          <div className="dash-welcome">
            <div className="dash-welcome-eyebrow">{greeting()}, ready to learn? 🚀</div>
            <h1 className="dash-welcome-title">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="dash-welcome-sub">
              {enrolledCourses.length === 0
                ? 'Start your AI learning journey today. Browse our courses and enroll for free!'
                : `You have ${inProgressCourses.length} course${inProgressCourses.length !== 1 ? 's' : ''} in progress. Keep up the great work!`
              }
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="container dashboard-stats-row">
        <div className="dash-stat-cards">
          <div className="dash-stat-card">
            <div className="dash-stat-icon" style={{ background: '#EDE9FE' }}>📚</div>
            <div className="dash-stat-body">
              <div className="n">{enrolledCourses.length}</div>
              <div className="l">Courses Enrolled</div>
            </div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-icon" style={{ background: '#D1FAE5' }}>✅</div>
            <div className="dash-stat-body">
              <div className="n">{completedCourses.length}</div>
              <div className="l">Completed</div>
            </div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-icon" style={{ background: '#FEF3C7' }}>⏱️</div>
            <div className="dash-stat-body">
              <div className="n">{totalHoursLearned}</div>
              <div className="l">Hours Learned</div>
            </div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-icon" style={{ background: '#FEE2E2' }}>🏆</div>
            <div className="dash-stat-body">
              <div className="n">{certificates.length}</div>
              <div className="l">Certificates</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container dash-content">
        {/* CONTINUE LEARNING */}
        {firstEnrolled && (
          <div className="dash-section">
            <div className="dash-section-header">
              <h2 className="dash-section-title">▶ Continue Learning</h2>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate('/my-learning')}>
                View All
              </button>
            </div>
            <div
              className="continue-card"
              onClick={() => navigate(`/courses/${firstEnrolled.id}`)}
            >
              <img src={firstEnrolled.thumbnail} alt={firstEnrolled.title} className="continue-thumb" />
              <div className="continue-info">
                <div className="continue-cat">{firstEnrolled.category}</div>
                <div className="continue-title">{firstEnrolled.title}</div>
                <div className="continue-meta">by {firstEnrolled.instructor.name} · {firstEnrolled.duration}</div>
                <ProgressBar value={getProgress(firstEnrolled.id)} />
              </div>
              <div>
                <button className="btn btn-primary" onClick={e => { e.stopPropagation(); navigate(`/courses/${firstEnrolled.id}`); }}>
                  ▶ Resume
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MY COURSES */}
        {enrolledCourses.length > 0 ? (
          <div className="dash-section">
            <div className="dash-section-header">
              <h2 className="dash-section-title">📚 My Courses</h2>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate('/my-learning')}>See All</button>
            </div>
            <div className="enrolled-grid">
              {enrolledCourses.map(c => {
                const prog = getProgress(c.id);
                const done = enrollments[c.id]?.completed;
                return (
                  <div key={c.id} className="enrolled-card" onClick={() => navigate(`/courses/${c.id}`)}>
                    <img src={c.thumbnail} alt={c.title} className="enrolled-thumb" />
                    <div className="enrolled-body">
                      <div className="enrolled-cat">{c.category}</div>
                      <div className="enrolled-title">{c.title}</div>
                      <ProgressBar value={prog} />
                      <div className="inline-actions" style={{ marginTop: '0.75rem' }}>
                        {done ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={e => { e.stopPropagation(); navigate(`/certificates/${c.id}`); }}
                          >
                            🏆 View Certificate
                          </button>
                        ) : (
                          <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); navigate(`/courses/${c.id}`); }}>
                            ▶ Continue
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="dash-section">
            <div className="dash-section-header">
              <h2 className="dash-section-title">📚 My Courses</h2>
            </div>
            <div className="dash-empty" style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div className="dash-empty-icon">🎓</div>
              <p className="dash-empty-text" style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>No courses yet</p>
              <p className="dash-empty-text">Enroll in a course to start your AI learning journey!</p>
              <button className="btn btn-primary" style={{ marginTop: '1.25rem' }} onClick={() => navigate('/courses')}>
                Browse Courses →
              </button>
            </div>
          </div>
        )}

        {/* CERTIFICATES */}
        {certificates.length > 0 && (
          <div className="dash-section">
            <div className="dash-section-header">
              <h2 className="dash-section-title">🏆 Recent Certificates</h2>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate('/certificates')}>View All</button>
            </div>
            <div className="dash-certs-grid">
              {certificates.slice(0, 3).map(cert => {
                const course = courses.find(c => c.id === cert.courseId);
                if (!course) return null;
                return (
                  <div
                    key={cert.id}
                    onClick={() => navigate(`/certificates/${cert.courseId}`)}
                    className="dash-cert-card"
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{course.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#92400E' }}>
                      {new Date(cert.issuedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RECOMMENDED */}
        <div className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">✨ Recommended for You</h2>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/courses')}>Browse All</button>
          </div>
          <div className="dash-recommended-grid">
            {courses.filter(c => !enrollments[c.id]).slice(0, 3).map(c => (
              <div
                key={c.id}
                onClick={() => navigate(`/courses/${c.id}`)}
                className="dash-recommended-card"
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <img src={c.thumbnail} alt={c.title} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                <div className="dash-recommended-body">
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{c.category}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{c.title}</div>
                  <div className="dash-recommended-meta">
                    <span style={{ color: '#F59E0B', fontSize: '0.8rem' }}>★★★★★</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.rating} · {c.duration}</span>
                  </div>
                  <div style={{ marginTop: '0.75rem', fontWeight: 700, fontSize: '1rem', color: 'var(--primary)' }}>
                    ${c.price} <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${c.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
            {courses.filter(c => !enrollments[c.id]).length === 0 && (
              <div className="dash-wide-empty">
                🎉 You're enrolled in all available courses! More coming soon.
              </div>
            )}
          </div>
        </div>

        {/* LEARNING TIPS */}
        <div className="dash-section">
          <h2 className="dash-section-title" style={{ marginBottom: '1.25rem' }}>💡 AI Learning Tips</h2>
          <div className="dash-tip-grid">
            {[
              { icon: '⏰', title: 'Learn Daily', desc: 'Even 20 minutes a day builds strong AI skills. Consistency beats intensity.' },
              { icon: '🧪', title: 'Practice Immediately', desc: 'After each video, try the concept in Claude. Active practice accelerates learning 5x.' },
              { icon: '📝', title: 'Take Notes', desc: 'Writing key concepts in your own words cements understanding and creates a reference library.' },
            ].map((tip, i) => (
              <div key={i} className="dash-tip-card">
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{tip.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>{tip.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
