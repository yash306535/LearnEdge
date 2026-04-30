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

export default function MyLearning() {
  const { enrollments, getProgress, isCompleted } = useAuth();
  const navigate = useNavigate();

  const enrolledCourses = courses.filter(c => enrollments[c.id]);
  const inProgress = enrolledCourses.filter(c => !isCompleted(c.id));
  const completed = enrolledCourses.filter(c => isCompleted(c.id));

  return (
    <div className="certs-page">
      <div className="certs-hero">
        <div className="container">
          <h1 className="certs-hero-title">📚 My Learning</h1>
          <p className="certs-hero-sub">Track your progress across all enrolled courses</p>
          <div className="page-summary-row">
            <div className="page-summary-item">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{enrolledCourses.length}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Enrolled</span>
            </div>
            <div className="page-summary-item">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: '#F59E0B' }}>{inProgress.length}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>In Progress</span>
            </div>
            <div className="page-summary-item">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>{completed.length}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="certs-body">
        <div className="container">
          {enrolledCourses.length === 0 ? (
            <div className="empty-state" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
              <div className="empty-icon">📚</div>
              <div className="empty-title">No courses enrolled yet</div>
              <p className="empty-text">Browse our library and enroll in your first AI course to get started!</p>
              <button className="btn btn-primary" onClick={() => navigate('/courses')}>Explore Courses →</button>
            </div>
          ) : (
            <>
              {/* IN PROGRESS */}
              {inProgress.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    ▶ In Progress ({inProgress.length})
                  </h2>
                  <div className="learning-list">
                    {inProgress.map(c => {
                      const prog = getProgress(c.id);
                      const enrollment = enrollments[c.id];
                      return (
                        <div
                          key={c.id}
                          className="learning-course-row"
                          onClick={() => navigate(`/courses/${c.id}`)}
                          onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                          onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                        >
                          <img src={c.thumbnail} alt={c.title} className="learning-course-thumb" />
                          <div className="learning-course-main">
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{c.category}</div>
                            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{c.title}</div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                              by {c.instructor.name} · {c.duration} · {c.lectures} lectures
                            </div>
                            <ProgressBar value={prog} />
                          </div>
                          <div className="learning-course-actions">
                            <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); navigate(`/courses/${c.id}`); }}>
                              ▶ Continue
                            </button>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                              Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* COMPLETED */}
              {completed.length > 0 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    ✅ Completed ({completed.length})
                  </h2>
                  <div className="learning-list">
                    {completed.map(c => {
                      const enrollment = enrollments[c.id];
                      return (
                        <div
                          key={c.id}
                          className="learning-course-row learning-course-row-complete"
                          onClick={() => navigate(`/courses/${c.id}`)}
                        >
                          <img src={c.thumbnail} alt={c.title} className="learning-course-thumb" />
                          <div className="learning-course-main">
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>✅ COMPLETED</div>
                            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{c.title}</div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                              by {c.instructor.name} · {c.duration} · Completed {new Date(enrollment.completedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                          <div className="learning-course-actions">
                            <button className="btn btn-success btn-sm" onClick={e => { e.stopPropagation(); navigate(`/certificates/${c.id}`); }}>
                              🏆 Certificate
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); navigate(`/courses/${c.id}`); }}>
                              Review
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* EXPLORE MORE */}
          {enrolledCourses.length > 0 && courses.filter(c => !enrollments[c.id]).length > 0 && (
            <div className="cta-panel" style={{ marginTop: '3rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🚀</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Ready for your next course?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Continue building your AI skills with {courses.filter(c => !enrollments[c.id]).length} more courses available.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/courses')}>Explore More Courses →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
