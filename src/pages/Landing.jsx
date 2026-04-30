import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courses, categories } from '../data/courses';
import { useAuth } from '../context/AuthContext';

const testimonials = [
  {
    quote: "LearnEdge completely transformed my understanding of AI. The Claude Fundamentals course was incredibly well-structured and the certificate helped me land a promotion at my company.",
    name: "Maria Gonzalez",
    role: "AI Product Manager at Stripe",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    course: "Claude AI Fundamentals"
  },
  {
    quote: "The Prompt Engineering course is the most practical AI course I've ever taken. Prof. Martinez explains complex concepts so clearly. I went from beginner to confident in 3 weeks.",
    name: "David Okafor",
    role: "Senior Software Engineer at Google",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    course: "Advanced Prompt Engineering"
  },
  {
    quote: "I built and deployed my first AI-powered SaaS product using what I learned in the API course. The hands-on projects are invaluable. This is worth 10x the price.",
    name: "Priya Sharma",
    role: "Indie Developer & Founder",
    avatar: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    course: "Building AI Apps with Claude API"
  }
];

const faqs = [
  {
    q: "Do I need prior AI experience to start?",
    a: "No prior experience is needed for our beginner courses. We start from the absolute basics and build up your knowledge progressively. Our Claude AI Fundamentals course is designed for complete beginners."
  },
  {
    q: "How long do I have access to my courses?",
    a: "Once enrolled, you have lifetime access to all course materials including videos, resources, and any future updates. Learn at your own pace, whenever and wherever you want."
  },
  {
    q: "Are the certificates recognized by employers?",
    a: "Our certificates are increasingly recognized across the tech industry. Many of our graduates have used LearnEdge certificates to advance their careers at companies like Google, Microsoft, Stripe, and Amazon."
  },
  {
    q: "What if I'm not satisfied with a course?",
    a: "We offer a 30-day money-back guarantee on all courses, no questions asked. We're confident in the quality of our content, but your satisfaction is our top priority."
  },
  {
    q: "Can I download course videos for offline viewing?",
    a: "Yes! Pro and Enterprise plan members can download videos for offline viewing on mobile devices. This is perfect for learning on the go without an internet connection."
  },
  {
    q: "Are courses updated as Claude AI evolves?",
    a: "Absolutely. All our courses are regularly updated to reflect the latest Claude API capabilities and best practices. When you enroll, you get access to all future updates at no extra cost."
  }
];

function StarRating({ rating }) {
  return (
    <div className="stars">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </div>
  );
}

function CourseCard({ course }) {
  const navigate = useNavigate();
  const badgeClass = {
    'Bestseller': 'badge-bestseller',
    'Top Rated': 'badge-toprated',
    'New': 'badge-new',
    'Hot': 'badge-hot',
  }[course.badge] || 'badge-primary';

  const levelClass = {
    'Beginner': 'badge-level-beginner',
    'Intermediate': 'badge-level-intermediate',
    'Advanced': 'badge-level-advanced',
  }[course.level] || 'badge-primary';

  return (
    <div className="course-card" onClick={() => navigate(`/courses/${course.id}`)}>
      <div className="course-card-thumb">
        <img src={course.thumbnail} alt={course.title} loading="lazy" />
        <div className="course-card-thumb-overlay">
          <div className="play-btn">▶</div>
        </div>
        {course.badge && (
          <div className="course-card-badge">
            <span className={`badge ${badgeClass}`}>{course.badge}</span>
          </div>
        )}
      </div>
      <div className="course-card-body">
        <div className="course-card-category">{course.category}</div>
        <div className="course-card-title">{course.title}</div>
        <div className="course-card-instructor">by {course.instructor.name}</div>
        <div className="course-card-meta">
          <div className="rating-row">
            <span className="rating-num">{course.rating}</span>
            <StarRating rating={course.rating} />
            <span className="rating-count">({course.reviews.toLocaleString()})</span>
          </div>
          <span className={`badge ${levelClass}`}>{course.level}</span>
        </div>
        <div className="course-card-meta" style={{ marginBottom: 0 }}>
          <span className="course-card-stat">🎬 {course.lectures} lectures</span>
          <span className="course-card-stat">⏱ {course.duration}</span>
          <span className="course-card-stat">👥 {course.students.toLocaleString()}</span>
        </div>
        <div className="course-card-footer">
          <div>
            <span className="course-price">${course.price}</span>
            <span className="course-price-original">${course.originalPrice}</span>
          </div>
          <div className="course-card-duration">
            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className={`faq-question ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
        {faq.q}
        <span className="faq-icon">+</span>
      </button>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <p>{faq.a}</p>
      </div>
    </div>
  );
}

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                🚀 Now featuring Claude 3.7 Sonnet curriculum
              </div>
              <h1 className="hero-title">
                Your Learning <span className="highlight">Edge</span> in Artificial Intelligence
              </h1>
              <p className="hero-subtitle">
                Master Claude AI, prompt engineering, and AI application development with hands-on courses taught by industry experts. Earn certificates recognized by top tech companies.
              </p>
              <div className="hero-cta">
                <button className="btn btn-primary btn-lg" onClick={() => navigate(user ? '/dashboard' : '/register')}>
                  🎓 {user ? 'Go to Dashboard' : 'Start Learning Free'}
                </button>
                <button className="btn btn-secondary btn-lg" onClick={() => navigate('/courses')}>
                  Explore Courses →
                </button>
              </div>
              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <div className="num">50K+</div>
                  <div className="lbl">Active Learners</div>
                </div>
                <div className="hero-stat-item">
                  <div className="num">120+</div>
                  <div className="lbl">Expert Courses</div>
                </div>
                <div className="hero-stat-item">
                  <div className="num">15K+</div>
                  <div className="lbl">Certificates Issued</div>
                </div>
                <div className="hero-stat-item">
                  <div className="num">4.9★</div>
                  <div className="lbl">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card">
                <img
                  className="hero-card-img"
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop"
                  alt="Course preview"
                />
                <div className="hero-card-body">
                  <div className="course-card-category">🔥 Currently Trending</div>
                  <div className="hero-card-title">Claude AI Fundamentals</div>
                  <div className="hero-card-meta">
                    <span className="stars">★★★★★</span>
                    <span className="text-sm text-muted">4.9 (2,341 reviews)</span>
                  </div>
                  <div className="hero-progress">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span className="text-sm text-muted">Your Progress</span>
                      <span className="text-sm font-semibold">65%</span>
                    </div>
                    <div className="hero-progress-bar">
                      <div className="hero-progress-fill" style={{ width: '65%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-float-badge cert">
                <div className="float-icon">🏆</div>
                <div className="float-text">
                  <div className="t1">Certificate Earned</div>
                  <div className="t2">Claude AI Expert</div>
                </div>
              </div>
              <div className="hero-float-badge students">
                <div className="float-icon">👥</div>
                <div className="float-text">
                  <div className="t1">Learners Enrolled</div>
                  <div className="t2">+1,247 this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-bar-inner">
            <span className="trust-label">Trusted by professionals at</span>
            <div className="trust-logos">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Stripe', 'Airbnb', 'OpenAI'].map(c => (
                <span key={c} className="trust-logo">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">By The Numbers</span>
            <h2 className="section-title">LearnEdge by the Numbers</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Join a global community of learners mastering AI with the world's most advanced curriculum.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">🎓</span>
              <div className="stat-num">50,000+</div>
              <div className="stat-label">Active Students Worldwide</div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📚</span>
              <div className="stat-num">120+</div>
              <div className="stat-label">Expert-Crafted Courses</div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <div className="stat-num">98%</div>
              <div className="stat-label">Student Satisfaction Rate</div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🏆</span>
              <div className="stat-num">15,000+</div>
              <div className="stat-label">Certificates Issued</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-header">
            <span className="section-label">Explore Topics</span>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Find exactly what you need from our comprehensive AI and machine learning curriculum.</p>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <div key={cat.name} className="category-card" onClick={() => navigate('/courses')}>
                <div className="category-icon" style={{ background: cat.color }}>
                  {cat.icon}
                </div>
                <div className="category-name">{cat.name}</div>
                <div className="category-count">{cat.count} courses</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="courses-section">
        <div className="container">
          <div className="courses-header">
            <span className="section-label">Top Picks</span>
            <h2 className="section-title">Our Most Popular Courses</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Handpicked by our curriculum team. Each course is updated regularly to stay ahead of AI advancements.</p>
          </div>
          <div className="courses-grid">
            {courses.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
          <div className="section-cta">
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/courses')}>
              View All 120+ Courses →
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container">
          <div className="how-header">
            <span className="section-label">Simple Process</span>
            <h2 className="section-title">Start Learning in 4 Simple Steps</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>From zero to certified AI professional in weeks, not years. Our streamlined process gets you learning immediately.</p>
          </div>
          <div className="how-grid">
            {[
              { num: '1', icon: '✍️', title: 'Create Free Account', desc: 'Sign up in under 60 seconds. No credit card required to browse and preview courses.' },
              { num: '2', icon: '🎯', title: 'Choose Your Course', desc: 'Pick from 120+ courses across AI fundamentals, prompt engineering, and API development.' },
              { num: '3', icon: '🎬', title: 'Learn at Your Pace', desc: 'Watch HD video lectures, complete hands-on projects, and track your progress in real time.' },
              { num: '4', icon: '🏆', title: 'Earn Certificate', desc: 'Complete the course and receive a verifiable, shareable certificate recognized by employers.' },
            ].map((step, i) => (
              <div key={i} className="how-step">
                <div className="how-step-num">{step.num}</div>
                <div className="how-step-icon">{step.icon}</div>
                <div className="how-step-title">{step.title}</div>
                <div className="how-step-desc">{step.desc}</div>
                {i < 3 && <div className="how-step-connector" />}
              </div>
            ))}
          </div>
          <div className="section-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate(user ? '/courses' : '/register')}>
              {user ? 'Browse Courses' : 'Create Free Account'} →
            </button>
          </div>
        </div>
      </section>

      {/* CERTIFICATE SECTION */}
      <section className="cert-section">
        <div className="container">
          <div className="cert-inner">
            <div className="cert-text">
              <span className="section-label">Recognition That Matters</span>
              <h2 className="section-title">Earn Industry-Recognized Certificates</h2>
              <p className="section-sub">Our certificates demonstrate real AI skills to employers. Add them to your LinkedIn profile or resume to stand out in the job market.</p>
              <div className="cert-features">
                {[
                  { t1: 'Verified Digital Certificates', t2: 'Each certificate has a unique ID verifiable online' },
                  { t1: 'Share on LinkedIn & Resume', t2: 'One-click sharing to major professional platforms' },
                  { t1: 'Employer-Recognized Skills', t2: 'Valued by 500+ companies in our hiring partner network' },
                  { t1: 'Lifetime Validity', t2: 'Your certificate never expires — it represents real skills' },
                ].map((f, i) => (
                  <div key={i} className="cert-feature-item">
                    <div className="cert-feature-check">✓</div>
                    <div className="cert-feature-text">
                      <div className="t1">{f.t1}</div>
                      <div className="t2">{f.t2}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cert-preview">
              <div className="cert-mini">
                <div className="cert-mini-top">LearnEdge.online — Certificate of Completion</div>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                <div className="cert-mini-title">This certifies that</div>
                <div className="cert-mini-issued" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>you have successfully completed</div>
                <div className="cert-mini-name" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--primary)' }}>Jane Learner</div>
                <div className="cert-mini-course">Claude AI Fundamentals — 32 Hours</div>
                <div className="cert-mini-meta" style={{ borderTop: '1px dashed #D97706', paddingTop: '0.75rem', marginTop: '0.5rem', fontSize: '0.72rem', color: '#92400E' }}>
                  <span>Issued: March 2025</span>
                  <span>ID: LE-20250312-X8KP</span>
                </div>
                <div className="cert-mini-seal" style={{ marginTop: '0.75rem' }}>🎓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-header">
            <span className="section-label">Student Success Stories</span>
            <h2 className="section-title">What Our Learners Say</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Don't take our word for it. Here's what real students have achieved with LearnEdge.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="rating-row" style={{ marginBottom: '1rem' }}>
                  <div className="stars">★★★★★</div>
                  <span className="text-sm text-muted">5.0</span>
                </div>
                <p className="testimonial-quote">{t.quote}</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
                  Completed: {t.course}
                </div>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTORS */}
      <section className="instructors-section">
        <div className="container">
          <div className="instructors-header">
            <span className="section-label">Expert Faculty</span>
            <h2 className="section-title">Learn from the Best</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Our instructors are practitioners from top AI companies, with real-world experience building the systems you want to learn.</p>
          </div>
          <div className="instructors-grid">
            {courses.map(c => (
              <div key={c.id} className="instructor-card">
                <img src={c.instructor.avatar} alt={c.instructor.name} className="instructor-avatar" />
                <div className="instructor-name">{c.instructor.name}</div>
                <div className="instructor-title">{c.instructor.title} · {c.instructor.company}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0.75rem 0', textAlign: 'left' }}>
                  {c.instructor.bio.slice(0, 120)}...
                </div>
                <div className="instructor-stats">
                  <div className="instructor-stat">
                    <div className="n">{c.instructor.courses}</div>
                    <div className="l">Courses</div>
                  </div>
                  <div className="instructor-stat">
                    <div className="n">{(c.instructor.students / 1000).toFixed(0)}K</div>
                    <div className="l">Students</div>
                  </div>
                  <div className="instructor-stat">
                    <div className="n">{c.instructor.rating}★</div>
                    <div className="l">Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-header">
            <span className="section-label">Simple Pricing</span>
            <h2 className="section-title">Invest in Your AI Career</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Start free, upgrade when you're ready. Cancel anytime with our 30-day money-back guarantee.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-plan">Free</div>
              <div className="pricing-price">$0</div>
              <div className="pricing-desc">Perfect for exploring AI concepts</div>
              <div className="pricing-features">
                {['3 free courses', 'Preview all lectures', 'Community forum access', 'Basic course materials'].map(f => (
                  <div key={f} className="pricing-feature"><span className="check">✓</span>{f}</div>
                ))}
                {['Certificates', 'Downloadable resources', 'Priority support'].map(f => (
                  <div key={f} className="pricing-feature" style={{ opacity: 0.4 }}><span className="cross">✗</span>{f}</div>
                ))}
              </div>
              <button className="btn btn-secondary btn-full" onClick={() => navigate('/register')}>Get Started Free</button>
            </div>

            <div className="pricing-card featured">
              <div className="pricing-popular">Most Popular</div>
              <div className="pricing-plan">Pro</div>
              <div className="pricing-price">$29<span>/month</span></div>
              <div className="pricing-desc">Everything you need to advance quickly</div>
              <div className="pricing-features">
                {['All 120+ courses', 'HD video + downloads', 'All certificates', 'Downloadable resources', 'Priority email support', 'Early access to new courses', 'Learning path guidance'].map(f => (
                  <div key={f} className="pricing-feature"><span className="check">✓</span>{f}</div>
                ))}
              </div>
              <button className="btn btn-primary btn-full" onClick={() => navigate('/register')}>Start Pro Trial</button>
            </div>

            <div className="pricing-card">
              <div className="pricing-plan">Enterprise</div>
              <div className="pricing-price">Custom</div>
              <div className="pricing-desc">For teams and organizations</div>
              <div className="pricing-features">
                {['Everything in Pro', 'Unlimited team seats', 'Custom learning paths', 'Dedicated account manager', 'SSO & security controls', 'Usage analytics & reporting', 'Custom certificate branding'].map(f => (
                  <div key={f} className="pricing-feature"><span className="check">✓</span>{f}</div>
                ))}
              </div>
              <button className="btn btn-outline btn-full">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <span className="section-label">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Everything you need to know about learning on LearnEdge. Can't find an answer? Contact our support team.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
          </div>
          <div className="section-cta">
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Still have questions?</p>
            <button className="btn btn-secondary">💬 Chat with Support</button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-inner">
            <span className="section-label" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>Stay Ahead</span>
            <h2 className="section-title">Stay Ahead in the AI Revolution</h2>
            <p className="section-sub">Get weekly AI insights, new course announcements, prompt engineering tips, and exclusive offers delivered to your inbox.</p>
            {newsletterDone ? (
              <div className="alert alert-success" style={{ maxWidth: 480, margin: '0 auto', background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                ✅ You're subscribed! Welcome to the LearnEdge community.
              </div>
            ) : (
              <>
                <form className="newsletter-form" onSubmit={e => { e.preventDefault(); if (email) setNewsletterDone(true); }}>
                  <input
                    type="email" required placeholder="Enter your email address"
                    className="newsletter-input" value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn btn-accent btn-lg">Subscribe Free</button>
                </form>
                <div className="newsletter-note">No spam, ever. Unsubscribe at any time. 12,000+ subscribers.</div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'white', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label">Ready to Start?</span>
          <h2 className="section-title" style={{ margin: '1rem auto' }}>Begin Your AI Journey Today</h2>
          <p className="section-sub" style={{ margin: '0 auto 2rem' }}>Join 50,000+ learners who are already mastering AI with LearnEdge. Your first course is on us.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate(user ? '/courses' : '/register')}>
              🎓 {user ? 'Browse Courses' : 'Create Free Account'}
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/courses')}>
              View Curriculum
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
