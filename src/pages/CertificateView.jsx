import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCourseById } from '../data/courses';

export default function CertificateView() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, getCertificate, isCompleted } = useAuth();
  const course = getCourseById(courseId);
  const cert = getCertificate(courseId);

  if (!course || !cert) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 'var(--nav-h)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="empty-state">
          <div className="empty-icon">🔒</div>
          <div className="empty-title">Certificate Not Available</div>
          <p className="empty-text">Complete the course to unlock your certificate.</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.25rem' }}>
            <button className="btn btn-primary" onClick={() => navigate(`/courses/${courseId}`)}>Go to Course</button>
            <button className="btn btn-secondary" onClick={() => navigate('/certificates')}>My Certificates</button>
          </div>
        </div>
      </div>
    );
  }

  const issuedDate = new Date(cert.issuedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });

  const handlePrint = () => window.print();

  const handleShare = () => {
    const text = `I just earned my "${course.title}" certificate on LearnEdge.online! 🎓 #LearnEdge #AILearning #Claude`;
    if (navigator.share) {
      navigator.share({ title: 'My LearnEdge Certificate', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Certificate info copied to clipboard!');
    }
  };

  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

  return (
    <div className="cert-view-page">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/certificates')}>
            ← Back to Certificates
          </button>
        </div>

        <div className="cert-view-actions">
          <button className="btn btn-primary btn-lg" onClick={handlePrint}>
            🖨 Print Certificate
          </button>
          <button className="btn btn-secondary btn-lg" onClick={handleShare}>
            🔗 Share
          </button>
          <button className="btn btn-accent btn-lg" onClick={() => navigate('/courses')}>
            🚀 Get Next Certificate
          </button>
        </div>

        {/* THE CERTIFICATE */}
        <div className="certificate-paper" id="certificate-print">
          {/* Decorative corners */}
          <div className="cert-paper-corner tl" />
          <div className="cert-paper-corner tr" />
          <div className="cert-paper-corner bl" />
          <div className="cert-paper-corner br" />

          {/* Inner border decoration */}
          <div style={{
            border: '2px solid rgba(217,119,6,0.3)',
            borderRadius: 'calc(var(--radius-xl) - 6px)',
            padding: '3rem',
            position: 'relative',
          }}>
            {/* Logo */}
            <div className="cert-logo-row">
              <div className="cert-logo-icon">🎓</div>
              <div className="cert-logo-name">LearnEdge<span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>.online</span></div>
            </div>

            <div className="cert-divider-gold" />

            <div className="cert-top-label">Certificate of Completion</div>
            <h1 className="cert-main-title">CERTIFICATE</h1>
            <p className="cert-certify-text" style={{ fontSize: '1.1rem' }}>This is to proudly certify that</p>

            <div className="cert-student-name">{fullName}</div>

            <p className="cert-completion-text">has successfully completed the course</p>

            <div className="cert-course-name">{course.title}</div>

            <p style={{ fontSize: '0.9rem', color: '#92400E', maxWidth: 600, margin: '0 auto 1.5rem', lineHeight: 1.65 }}>
              A comprehensive {course.duration} program covering {course.subtitle.toLowerCase()}. Demonstrating exceptional commitment to professional development in Artificial Intelligence.
            </p>

            <div className="cert-divider-gold" />

            <div className="cert-details-row">
              <div className="cert-detail-item">
                <div className="cert-detail-label">Duration</div>
                <div className="cert-detail-value">{course.duration}</div>
              </div>
              <div className="cert-detail-item">
                <div className="cert-detail-label">Level</div>
                <div className="cert-detail-value">{course.level}</div>
              </div>
              <div className="cert-detail-item">
                <div className="cert-detail-label">Lectures</div>
                <div className="cert-detail-value">{course.lectures}</div>
              </div>
              <div className="cert-detail-item">
                <div className="cert-detail-label">Date Issued</div>
                <div className="cert-detail-value">{issuedDate}</div>
              </div>
            </div>

            <div className="cert-seal">
              <div className="cert-seal-inner">
                <div className="cert-seal-icon">🎓</div>
                <div className="cert-seal-text">Verified</div>
              </div>
            </div>

            <div className="cert-sigs">
              <div className="cert-sig">
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                  {course.instructor.name}
                </div>
                <div className="cert-sig-line" />
                <div className="cert-sig-name">{course.instructor.name}</div>
                <div className="cert-sig-title">Course Instructor</div>
                <div style={{ fontSize: '0.7rem', color: '#B45309', marginTop: '0.2rem' }}>{course.instructor.title}</div>
              </div>
              <div style={{ width: 1, background: 'rgba(217,119,6,0.25)' }} />
              <div className="cert-sig">
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                  Alexandra Reed
                </div>
                <div className="cert-sig-line" />
                <div className="cert-sig-name">Alexandra Reed</div>
                <div className="cert-sig-title">Chief Executive Officer</div>
                <div style={{ fontSize: '0.7rem', color: '#B45309', marginTop: '0.2rem' }}>LearnEdge.online</div>
              </div>
            </div>

            <div className="cert-id">
              Certificate ID: {cert.id} &nbsp;|&nbsp; Verify at: learnedge.online/verify/{cert.id}
            </div>
          </div>
        </div>

        {/* SHARE SECTION */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '2rem', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', maxWidth: 700, margin: '2.5rem auto 0' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🎉 Congratulations, {user?.firstName}!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.65 }}>
            You've completed <strong>{course.title}</strong> and earned your certificate. Share your achievement and inspire others to start their AI learning journey.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={handleShare} style={{ fontSize: '0.875rem' }}>
              🔗 Copy Share Link
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '0.875rem', background: '#0A66C2', color: 'white', borderColor: '#0A66C2' }}>
              in Add to LinkedIn
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '0.875rem', background: '#1DA1F2', color: 'white', borderColor: '#1DA1F2' }}>
              𝕏 Share on X
            </button>
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-soft)', borderRadius: 'var(--radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>Want more certificates?</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Continue your AI learning journey</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/courses')}>
              Explore More Courses →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
