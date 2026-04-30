import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCourseById } from '../data/courses';
import certificateImage from '../asset/shivani.png';

const certificateImageModules = import.meta.glob('../asset/*.png', {
  eager: true,
  import: 'default',
});

const slugify = (value) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

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
          <div className="empty-actions">
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

  const handleDownload = async () => {
    const response = await fetch(certificateAsset);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${course.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-certificate.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

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
  const candidates = [];
  const emailLocal = (user?.email || '').split('@')[0] || '';
  if (fullName) {
    candidates.push(slugify(fullName));
    const parts = fullName.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      candidates.push(slugify(parts[0]));
      candidates.push(slugify(parts[1]));
      candidates.push(slugify(parts.join('-')));
      candidates.push(slugify(parts.reverse().join('-')));
    } else {
      candidates.push(slugify(fullName));
    }
  }
  if (user?.firstName) candidates.push(slugify(user.firstName));
  if (user?.lastName) candidates.push(slugify(user.lastName));
  if (emailLocal) candidates.push(slugify(emailLocal));
  // unique and filter empties
  const uniq = Array.from(new Set(candidates.filter(Boolean)));
  let certificateAsset = certificateImage;
  for (const s of uniq) {
    const key = `../asset/${s}.png`;
    if (certificateImageModules[key]) {
      certificateAsset = certificateImageModules[key];
      break;
    }
  }

  return (
    <div className="cert-view-page">
      <div className="container">
        <div className="cert-view-topbar">
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/certificates')}>
            ← Back to Certificates
          </button>
        </div>

        <div className="cert-view-actions">
          <button className="btn btn-primary btn-lg" onClick={handlePrint}>
            🖨 Print Certificate
          </button>
          <button className="btn btn-secondary btn-lg" onClick={handleDownload}>
            ⬇ Download PNG
          </button>
          <button className="btn btn-secondary btn-lg" onClick={handleShare}>
            🔗 Share
          </button>
          <button className="btn btn-accent btn-lg" onClick={() => navigate('/courses')}>
            🚀 Get Next Certificate
          </button>
        </div>

        <div className="certificate-image-wrap" id="certificate-print">
          <img className="certificate-image" src={certificateAsset} alt={`${fullName || user?.firstName || 'Learner'} certificate`} />
          <div className="certificate-image-caption">
            <div className="cert-title-inline">{course.title}</div>
            <div className="cert-meta-inline">{course.duration} · Completed by {fullName || 'Learner'} · Issued {issuedDate} · ID {cert.id}</div>
          </div>
        </div>

        {/* SHARE SECTION */}
        <div className="certificate-share-panel">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🎉 Congratulations, {user?.firstName}!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.65 }}>
            You've completed <strong>{course.title}</strong> and earned your certificate. Share your achievement and inspire others to start their AI learning journey.
          </p>
          <div className="certificate-share-actions">
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
          <div className="certificate-next-row">
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
