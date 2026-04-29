import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';

export default function MyCertificates() {
  const { user, certificates, enrollments } = useAuth();
  const navigate = useNavigate();

  const certData = certificates.map(cert => {
    const course = courses.find(c => c.id === cert.courseId);
    return { ...cert, course };
  }).filter(c => c.course);

  return (
    <div className="certs-page">
      <div className="certs-hero">
        <div className="container">
          <h1 className="certs-hero-title">🏆 My Certificates</h1>
          <p className="certs-hero-sub">
            {certData.length > 0
              ? `You've earned ${certData.length} certificate${certData.length > 1 ? 's' : ''}. Share them with the world!`
              : 'Complete a course to earn your first certificate!'
            }
          </p>

          {certData.length > 0 && (
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{certData.length}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Certificates Earned</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                  {certData.reduce((acc, c) => acc + c.course.totalHours, 0)}h
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Hours Completed</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="certs-body">
        <div className="container">
          {certData.length === 0 ? (
            <div>
              <div className="empty-state" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', marginBottom: '2rem' }}>
                <div className="empty-icon">🏆</div>
                <div className="empty-title">No certificates yet</div>
                <p className="empty-text">
                  Complete a course to earn your first industry-recognized certificate.<br />
                  Certificates are issued instantly upon course completion.
                </p>
                <button className="btn btn-primary" onClick={() => navigate('/courses')}>Start a Course →</button>
              </div>

              {/* How certificates work */}
              <div style={{ background: 'linear-gradient(135deg, #FFF7ED, #FFFBEB)', border: '2px solid #FDE68A', borderRadius: 'var(--radius-xl)', padding: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', color: '#92400E' }}>
                  🎓 How to Earn Your Certificate
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                  {[
                    { step: '1', icon: '🎬', title: 'Enroll in a Course', desc: 'Choose from our Claude AI, Prompt Engineering, or API Development courses.' },
                    { step: '2', icon: '📚', title: 'Complete All Lessons', desc: 'Watch all video lectures and complete the hands-on exercises in each module.' },
                    { step: '3', icon: '🏆', title: 'Earn Your Certificate', desc: 'Receive an instant, personalized, shareable certificate with your name on it.' },
                  ].map(item => (
                    <div key={item.step} style={{ textAlign: 'center' }}>
                      <div style={{ width: 48, height: 48, background: '#D97706', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem', margin: '0 auto 0.75rem' }}>
                        {item.step}
                      </div>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                      <div style={{ fontWeight: 700, color: '#92400E', marginBottom: '0.4rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#B45309', lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="certs-grid">
                {certData.map(cert => (
                  <div key={cert.id} className="cert-card" onClick={() => navigate(`/certificates/${cert.courseId}`)}>
                    <div className="cert-card-top">
                      <div style={{ position: 'absolute', top: 12, right: 12 }}>
                        <span className="badge badge-new" style={{ background: '#D1FAE5', color: '#065F46' }}>✓ Verified</span>
                      </div>
                      <div className="cert-card-icon">🏆</div>
                      <div className="cert-card-course">{cert.course.title}</div>
                      <div className="cert-card-sub">{cert.course.instructor.name} · {cert.course.duration}</div>
                    </div>
                    <div className="cert-card-body">
                      <div className="cert-card-date">
                        <span>📅</span>
                        Issued {new Date(cert.issuedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="cert-card-id">ID: {cert.id}</div>
                      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>🎓 {user?.firstName} {user?.lastName}</span>
                      </div>
                    </div>
                    <div className="cert-card-footer">
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                        onClick={e => { e.stopPropagation(); navigate(`/certificates/${cert.courseId}`); }}
                      >
                        🏆 View Certificate
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); window.print(); }}>
                        🖨 Print
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Encourage more */}
              {courses.filter(c => !certificates.find(cert => cert.courseId === c.id)).length > 0 && (
                <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2.5rem', background: 'linear-gradient(135deg, var(--primary-light), white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🚀</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Earn More Certificates
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Complete more courses and grow your AI credential portfolio.
                  </p>
                  <button className="btn btn-primary" onClick={() => navigate('/courses')}>Browse Courses →</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
