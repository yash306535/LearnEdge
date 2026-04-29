import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { useAuth } from '../context/AuthContext';

function VideoPlayer({ videoId, title }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="video-player-wrap">
      {playing ? (
        <iframe
          className="video-iframe"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      ) : (
        <div className="video-placeholder" onClick={() => setPlaying(true)}>
          <img src={thumb} alt={title} onError={e => { e.target.style.display = 'none'; }} />
          <div className="video-play-btn">▶</div>
          <div className="video-title-bar">{title}</div>
        </div>
      )}
    </div>
  );
}

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, enrollCourse, isEnrolled, isCompleted, completeCourse, markVideoComplete, isVideoComplete, getProgress, getCertificate } = useAuth();
  const course = getCourseById(id);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [openSections, setOpenSections] = useState({ 1: true });
  const [enrolling, setEnrolling] = useState(false);
  const [completing, setCompleting] = useState(false);

  const enrolled = isEnrolled(id);
  const completed = isCompleted(id);
  const progress = getProgress(id);

  const allVideos = course ? course.playlist.flatMap(s => s.videos) : [];
  const totalVideos = allVideos.length;

  useEffect(() => {
    if (course && !currentVideo) {
      setCurrentVideo(course.playlist[0]?.videos[0]);
    }
  }, [course]);

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav-h)' }}>
        <div className="empty-state">
          <div className="empty-icon">😕</div>
          <div className="empty-title">Course Not Found</div>
          <p className="empty-text">This course doesn't exist or has been removed.</p>
          <button className="btn btn-primary" onClick={() => navigate('/courses')}>Browse Courses</button>
        </div>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!user) { navigate('/register'); return; }
    setEnrolling(true);
    await new Promise(r => setTimeout(r, 600));
    enrollCourse(id);
    setEnrolling(false);
  };

  const handleComplete = async () => {
    setCompleting(true);
    await new Promise(r => setTimeout(r, 800));
    completeCourse(id);
    setCompleting(false);
  };

  const handleMarkVideo = (videoId) => {
    if (!enrolled) return;
    markVideoComplete(id, videoId, totalVideos);
  };

  const toggleSection = (sid) => setOpenSections(o => ({ ...o, [sid]: !o[sid] }));

  const cert = getCertificate(id);

  const levelClass = { 'Beginner': 'badge-level-beginner', 'Intermediate': 'badge-level-intermediate', 'Advanced': 'badge-level-advanced' }[course.level];

  return (
    <div className="course-detail-page">
      {/* HERO */}
      <div className="course-detail-hero">
        <div className="container">
          <div className="course-detail-inner">
            <div className="course-detail-left">
              <div className="course-detail-cat">📚 {course.category}</div>
              <h1 className="course-detail-title">{course.title}</h1>
              <p className="course-detail-sub">{course.subtitle}</p>

              <div className="course-detail-meta">
                <div className="course-detail-meta-item">
                  <span>⭐</span>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>{course.rating}</span>
                  <span>({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="course-detail-meta-item"><span>👥</span> {course.students.toLocaleString()} students</div>
                <div className="course-detail-meta-item"><span>⏱</span> {course.duration}</div>
                <div className="course-detail-meta-item"><span>🎬</span> {course.lectures} lectures</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {course.badge && <span className={`badge badge-bestseller`}>{course.badge}</span>}
                <span className={`badge ${levelClass}`}>{course.level}</span>
                <span className="badge badge-primary">🌐 {course.language}</span>
                <span className="badge badge-primary">🔄 Updated {course.lastUpdated}</span>
              </div>

              <div className="course-detail-instructor-row">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="course-detail-instructor-img" />
                <div className="course-detail-instructor-text">
                  <span className="by">Instructor: </span>
                  <span className="name">{course.instructor.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.55)', marginLeft: '0.4rem', fontSize: '0.8rem' }}>· {course.instructor.title}</span>
                </div>
              </div>
            </div>

            {/* ENROLL CARD */}
            <div className="course-enroll-card">
              <img src={course.thumbnail} alt={course.title} className="course-enroll-thumb" />
              <div className="course-enroll-body">
                {completed ? (
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
                    <div style={{ fontWeight: 700, color: 'var(--success)', fontSize: '1rem', marginBottom: '0.25rem' }}>Course Completed!</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Certificate ready to view</div>
                  </div>
                ) : (
                  <div style={{ marginBottom: '1rem' }}>
                    <div>
                      <span className="course-enroll-price">${course.price}</span>
                      <span className="course-enroll-original">${course.originalPrice}</span>
                      <span className="course-enroll-discount">{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off!</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--danger)', fontWeight: 600, marginTop: '0.25rem' }}>
                      ⏰ Limited time offer — ends soon
                    </div>
                  </div>
                )}

                {enrolled && !completed && (
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 600 }}>Your Progress</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{progress}%</span>
                    </div>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}

                {completed ? (
                  <button className="btn btn-success btn-full btn-lg" onClick={() => navigate(`/certificates/${id}`)}>
                    🏆 View My Certificate
                  </button>
                ) : enrolled ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button className="btn btn-primary btn-full btn-lg" onClick={() => setActiveTab('curriculum')}>
                      ▶ Continue Learning
                    </button>
                    <button
                      className="btn btn-accent btn-full"
                      onClick={handleComplete}
                      disabled={completing}
                    >
                      {completing ? '⏳ Processing...' : '🏆 Mark Course as Complete'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-primary btn-full btn-lg"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? '⏳ Enrolling...' : user ? '🎓 Enroll Now — Free' : '🚀 Enroll for Free'}
                    </button>
                    <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                      30-Day Money-Back Guarantee
                    </div>
                  </div>
                )}

                <div className="course-enroll-features">
                  {[
                    `🎬 ${course.lectures} video lectures`,
                    `⏱ ${course.duration} of content`,
                    '♾️ Lifetime access',
                    '📱 Access on all devices',
                    '🏆 Certificate of completion',
                    '📥 Downloadable resources',
                  ].map(f => (
                    <div key={f} className="course-enroll-feature">
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button className="btn btn-secondary btn-sm" style={{ flex: 1, fontSize: '0.78rem' }}>🔗 Share</button>
                  <button className="btn btn-secondary btn-sm" style={{ flex: 1, fontSize: '0.78rem' }}>🎁 Gift</button>
                  <button className="btn btn-secondary btn-sm" style={{ flex: 1, fontSize: '0.78rem' }}>♡ Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="course-body">
        <div className="container">
          <div className="course-body-inner">
            <div>
              {/* TABS */}
              <div className="course-tabs">
                {[
                  { key: 'overview', label: '📋 Overview' },
                  { key: 'curriculum', label: '🎬 Curriculum' },
                  { key: 'instructor', label: '👤 Instructor' },
                  { key: 'reviews', label: '⭐ Reviews' },
                ].map(t => (
                  <button key={t.key} className={`course-tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div>
                  <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                      What You'll Learn
                    </h3>
                    <div className="course-learn-grid">
                      {course.whatYouLearn.map((item, i) => (
                        <div key={i} className="course-learn-item">
                          <span className="course-learn-check">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
                      About This Course
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-sub)', lineHeight: 1.75 }}>{course.description}</p>
                    <div style={{ marginTop: '1.5rem' }}>
                      <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Requirements</h4>
                      {course.requirements.map((r, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.875rem', color: 'var(--text-sub)' }}>
                          <span>→</span><span>{r}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                      <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Tags</h4>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {course.tags.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CURRICULUM TAB */}
              {activeTab === 'curriculum' && (
                <div>
                  {enrolled && currentVideo && (
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                      <div className="current-video-info">
                        <div className="current-video-title">{currentVideo.title}</div>
                        <div className="current-video-meta">
                          <span>⏱ {currentVideo.duration}</span>
                          {isVideoComplete(id, currentVideo.id) && <span style={{ color: 'var(--success)' }}>✓ Completed</span>}
                        </div>
                      </div>
                      <VideoPlayer videoId={currentVideo.videoId} title={currentVideo.title} key={currentVideo.id} />
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                        {!isVideoComplete(id, currentVideo.id) && (
                          <button className="btn btn-success btn-sm" onClick={() => handleMarkVideo(currentVideo.id)}>
                            ✓ Mark as Complete
                          </button>
                        )}
                        {isVideoComplete(id, currentVideo.id) && (
                          <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            ✅ Completed
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {course.playlist.length} sections · {totalVideos} lectures · {course.duration}
                    </div>
                    {!enrolled && (
                      <div className="alert alert-info" style={{ margin: 0, padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
                        🔒 Enroll to access all content
                      </div>
                    )}
                  </div>

                  {course.playlist.map(section => (
                    <div key={section.id} className="curriculum-section">
                      <div
                        className={`curriculum-section-header ${openSections[section.id] ? 'open' : ''}`}
                        onClick={() => toggleSection(section.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{openSections[section.id] ? '▼' : '▶'}</span>
                          <span>Section {section.id}: {section.section}</span>
                        </div>
                        <div className="curriculum-section-meta">
                          <span>{section.videos.length} lectures</span>
                          <span>{section.videos.reduce((acc, v) => {
                            const [m, s] = v.duration.split(':').map(Number);
                            return acc + m;
                          }, 0)} min</span>
                        </div>
                      </div>
                      {openSections[section.id] && (
                        <div className="curriculum-videos">
                          {section.videos.map(video => {
                            const isComplete = isVideoComplete(id, video.id);
                            const isCurrent = currentVideo?.id === video.id;
                            return (
                              <div
                                key={video.id}
                                className={`curriculum-video ${isComplete ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
                                onClick={() => {
                                  if (enrolled || video.preview) {
                                    setCurrentVideo(video);
                                    setActiveTab('curriculum');
                                  } else {
                                    handleEnroll();
                                  }
                                }}
                              >
                                <span className="video-icon">
                                  {isComplete ? '✅' : isCurrent ? '▶' : '🎬'}
                                </span>
                                <span className="video-title">{video.title}</span>
                                {video.preview && !enrolled && (
                                  <span className="video-preview-badge">Preview</span>
                                )}
                                {!enrolled && !video.preview && (
                                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🔒</span>
                                )}
                                <span className="video-duration">{video.duration}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* INSTRUCTOR TAB */}
              {activeTab === 'instructor' && (
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <img src={course.instructor.avatar} alt={course.instructor.name}
                      style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-light)' }} />
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                        {course.instructor.name}
                      </h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                        {course.instructor.title} · {course.instructor.company}
                      </p>
                      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                        <span>⭐ {course.instructor.rating} Instructor Rating</span>
                        <span>👥 {course.instructor.students.toLocaleString()} Students</span>
                        <span>📚 {course.instructor.courses} Courses</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--bg-soft)', borderRadius: 'var(--radius)' }}>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-sub)', lineHeight: 1.75 }}>{course.instructor.bio}</p>
                  </div>
                </div>
              )}

              {/* REVIEWS TAB */}
              {activeTab === 'reviews' && (
                <div>
                  <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', marginBottom: '2rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{course.rating}</div>
                        <div style={{ color: '#F59E0B', fontSize: '1.5rem', margin: '0.5rem 0' }}>★★★★★</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Course Rating</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        {[5,4,3,2,1].map(star => (
                          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <div className="progress-bar-wrap" style={{ flex: 1, height: 10 }}>
                              <div className="progress-bar-fill" style={{ width: `${[75, 18, 5, 1, 1][5-star]}%` }} />
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', width: 40 }}>{star} ★</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', width: 30 }}>{[75,18,5,1,1][5-star]}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {[
                      { name: 'Alex K.', date: 'March 2025', rating: 5, text: 'Absolutely brilliant course. The way complex concepts are explained is unmatched. Highly recommended for anyone starting with Claude AI.' },
                      { name: 'Sarah M.', date: 'April 2025', rating: 5, text: 'This course gave me everything I needed to start using Claude professionally. The practical examples are incredibly valuable.' },
                      { name: 'James R.', date: 'February 2025', rating: 4, text: 'Great course overall. The video quality is excellent and the content is well-organized. A few areas could be expanded but overall 4 stars.' },
                    ].map((review, i) => (
                      <div key={i} style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                              {review.name[0]}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{review.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{review.date}</div>
                            </div>
                          </div>
                          <div style={{ color: '#F59E0B' }}>{'★'.repeat(review.rating)}</div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-sub)', lineHeight: 1.65 }}>{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* STICKY SIDEBAR (mobile: hidden via CSS) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* QUICK STATS */}
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Course Includes</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    { icon: '🎬', label: `${course.lectures} on-demand video lectures` },
                    { icon: '⏱', label: `${course.duration} of HD video content` },
                    { icon: '📥', label: 'Downloadable resources & code files' },
                    { icon: '📱', label: 'Access on mobile, tablet, desktop' },
                    { icon: '♾️', label: 'Full lifetime access' },
                    { icon: '🏆', label: 'Certificate of completion' },
                    { icon: '💬', label: 'Community discussion board' },
                    { icon: '🔄', label: 'Regular content updates' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                      <span>{item.icon}</span><span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RELATED COURSES */}
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Related Courses</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/courses')}>
                  View all AI courses →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
