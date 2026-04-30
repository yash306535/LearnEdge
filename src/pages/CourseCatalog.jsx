import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courses, categories } from '../data/courses';

const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

function CourseCard({ course }) {
  const navigate = useNavigate();
  const badgeClass = {
    'Bestseller': 'badge-bestseller', 'Top Rated': 'badge-toprated',
    'New': 'badge-new', 'Hot': 'badge-hot',
  }[course.badge] || 'badge-primary';
  const levelClass = {
    'Beginner': 'badge-level-beginner', 'Intermediate': 'badge-level-intermediate', 'Advanced': 'badge-level-advanced',
  }[course.level] || 'badge-primary';

  return (
    <div className="course-card" onClick={() => navigate(`/courses/${course.id}`)}>
      <div className="course-card-thumb">
        <img src={course.thumbnail} alt={course.title} loading="lazy" />
        <div className="course-card-thumb-overlay"><div className="play-btn">▶</div></div>
        {course.badge && <div className="course-card-badge"><span className={`badge ${badgeClass}`}>{course.badge}</span></div>}
      </div>
      <div className="course-card-body">
        <div className="course-card-category">{course.category}</div>
        <div className="course-card-title">{course.title}</div>
        <div className="course-card-instructor">by {course.instructor.name} · {course.instructor.title}</div>
        <div className="course-card-meta">
          <div className="rating-row">
            <span className="rating-num">{course.rating}</span>
            <span className="stars">{'★'.repeat(Math.floor(course.rating))}</span>
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
          <span style={{ fontSize: '0.78rem', color: 'var(--danger)', fontWeight: 700 }}>
            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CourseCatalog() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = courses.filter(c => {
    const matchesFilter = activeFilter === 'All' || c.level === activeFilter;
    const matchesCat = activeCategory === 'All' || c.category === activeCategory;
    const matchesSearch = search === '' ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesCat && matchesSearch;
  });

  return (
    <div className="catalog-page">
      <div className="catalog-hero">
        <div className="container">
          <h1 className="catalog-hero-title">🎓 AI & Claude Courses</h1>
          <p className="catalog-hero-sub">
            {courses.length} expert-crafted courses · Updated monthly · All levels welcome
          </p>

          <div className="catalog-search-wrap">
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="🔍 Search courses, topics, or instructors..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: '1.25rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.75rem' }}>LEVEL:</span>
            <div className="catalog-filters" style={{ display: 'inline-flex', marginTop: 0 }}>
              {filters.map(f => (
                <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.75rem' }}>CATEGORY:</span>
            <div className="catalog-filters" style={{ display: 'inline-flex', marginTop: 0, flexWrap: 'wrap' }}>
              <button className={`filter-btn ${activeCategory === 'All' ? 'active' : ''}`} onClick={() => setActiveCategory('All')}>All Categories</button>
              {categories.map(cat => (
                <button key={cat.name} className={`filter-btn ${activeCategory === cat.name ? 'active' : ''}`} onClick={() => setActiveCategory(cat.name)}>
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="catalog-body">
        <div className="container">
          <div className="catalog-toolbar">
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Showing <strong>{filtered.length}</strong> of <strong>{courses.length}</strong> courses
              {search && <> matching "<strong>{search}</strong>"</>}
            </p>
            <select
              className="form-input catalog-sort"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              <option>Sort: Most Popular</option>
              <option>Sort: Highest Rated</option>
              <option>Sort: Newest</option>
              <option>Sort: Price Low-High</option>
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="catalog-grid">
              {filtered.map(c => <CourseCard key={c.id} course={c} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">No courses found</div>
              <p className="empty-text">Try adjusting your search or filters. More courses are added monthly!</p>
              <button className="btn btn-primary" onClick={() => { setSearch(''); setActiveFilter('All'); setActiveCategory('All'); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* COMING SOON SECTION */}
      <div className="catalog-coming-section">
        <div className="container catalog-coming-inner">
          <span className="section-label">Coming Soon</span>
          <h2 className="section-title">More Courses in Development</h2>
          <p className="section-sub" style={{ margin: '0 auto 2.5rem' }}>Our team is building the next generation of AI courses. Subscribe to be notified first.</p>
          <div className="catalog-coming-grid">
            {[
              { icon: '🤖', title: 'Multi-Agent AI Systems with Claude', date: 'Coming June 2025' },
              { icon: '🔬', title: 'AI Research Methods with Claude', date: 'Coming July 2025' },
              { icon: '🏢', title: 'Enterprise AI Deployment & Governance', date: 'Coming August 2025' },
            ].map((c, i) => (
              <div key={i} className="catalog-coming-card">
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{c.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>{c.date}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
            🔔 Notify Me When Available
          </button>
        </div>
      </div>
    </div>
  );
}
