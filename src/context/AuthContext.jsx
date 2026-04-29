import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  USER: 'le_user',
  ENROLLMENTS: 'le_enrollments',
  CERTIFICATES: 'le_certificates',
  VIDEO_PROGRESS: 'le_video_progress',
};

const DEMO_COURSE_ID = 'certificate-program-45h';
const SEEDED_ACCOUNTS = [
  { firstName: 'Yashvant', lastName: 'Dayanand Mane', email: 'yashvant@gmail.com' },
  { firstName: 'Mahek', lastName: 'Shaikh', email: 'mahek@gmail.com' },
  { firstName: 'Mamata', lastName: 'Kharatmol', email: 'mamata@gmail.com' },
  { firstName: 'Afrin', lastName: 'Inamdar', email: 'afrin@gmail.com' },
  { firstName: 'Onkar', lastName: 'Chavan', email: 'onkar@gmail.com' },
  { firstName: 'Sanket', lastName: 'Harkal', email: 'sanket@gmail.com' },
  { firstName: 'Aniket', lastName: 'Shelke', email: 'aniket@gmail.com' },
  { firstName: 'Hrushikesh', lastName: 'Yelne', email: 'hrushikesh@gmail.com' },
];

function seedDemoCompletion() {
  const enrollObj = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLMENTS) || '{}');
  if (!enrollObj[DEMO_COURSE_ID] || !enrollObj[DEMO_COURSE_ID].completed) {
    enrollObj[DEMO_COURSE_ID] = {
      enrolledAt: enrollObj[DEMO_COURSE_ID]?.enrolledAt || new Date().toISOString(),
      completedVideos: enrollObj[DEMO_COURSE_ID]?.completedVideos || [],
      completed: true,
      completedAt: enrollObj[DEMO_COURSE_ID]?.completedAt || new Date().toISOString(),
      progressPercent: 100,
    };
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollObj));
  }

  const certs = JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATES) || '[]');
  if (!certs.find(c => c.courseId === DEMO_COURSE_ID)) {
    certs.push({
      id: `LE-DEMO-${Date.now()}`,
      courseId: DEMO_COURSE_ID,
      userId: 'demo-user',
      issuedAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));
  }
}

function seedRequestedAccounts() {
  const accounts = JSON.parse(localStorage.getItem('le_accounts') || '[]');
  let updated = false;

  SEEDED_ACCOUNTS.forEach(account => {
    if (!accounts.find(a => a.email === account.email)) {
      accounts.push({
        id: `seed-${account.firstName.toLowerCase()}-${Date.now()}`,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        password: 'Pass@123',
        joinedAt: new Date().toISOString(),
      });
      updated = true;
    }
  });

  if (updated) {
    localStorage.setItem('le_accounts', JSON.stringify(accounts));
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [videoProgress, setVideoProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      seedRequestedAccounts();

      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const storedEnrollments = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
      const storedCerts = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      const storedVideoProgress = localStorage.getItem(STORAGE_KEYS.VIDEO_PROGRESS);
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedEnrollments) setEnrollments(JSON.parse(storedEnrollments));
      if (storedCerts) setCertificates(JSON.parse(storedCerts));
      if (storedVideoProgress) setVideoProgress(JSON.parse(storedVideoProgress));

      try {
        const seedKey = 'le_seeded_v1';
        if (!localStorage.getItem(seedKey)) {
          const accounts = JSON.parse(localStorage.getItem('le_accounts') || '[]');
          let shiv = accounts.find(a => a.email === 'shivanikapase755@gmail.com');
          if (!shiv) {
            shiv = {
              id: 'seed-shivani-' + Date.now().toString(),
              firstName: 'Shivani',
              lastName: 'Kapase',
              email: 'shivanikapase755@gmail.com',
              password: 'Shiv@123',
              joinedAt: new Date().toISOString()
            };
            accounts.push(shiv);
            localStorage.setItem('le_accounts', JSON.stringify(accounts));
          }

          seedDemoCompletion();
          const migratedEnrollments = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLMENTS) || '{}');
          if (migratedEnrollments['shivani-demo'] && !migratedEnrollments[DEMO_COURSE_ID]) {
            migratedEnrollments[DEMO_COURSE_ID] = migratedEnrollments['shivani-demo'];
            delete migratedEnrollments['shivani-demo'];
            localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(migratedEnrollments));
          }

          // Update in-memory state so the app reflects the seeded data immediately
          setCertificates(JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATES) || '[]'));
          setEnrollments(JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLMENTS) || '{}'));

          // Optionally auto-login the seeded user
          const { password: _pw, ...safeUser } = shiv;
          setUser(safeUser);
          persist(STORAGE_KEYS.USER, safeUser);

          localStorage.setItem(seedKey, '1');
        }
      } catch (_) {}

      if (storedUser) {
        seedRequestedAccounts();
        seedDemoCompletion();
        setCertificates(JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATES) || '[]'));
        setEnrollments(JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLMENTS) || '{}'));
      }
    } catch (_) {}
    setLoading(false);
  }, []);

  const persist = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  };

  const register = (data) => {
    const accounts = JSON.parse(localStorage.getItem('le_accounts') || '[]');
    if (accounts.find(a => a.email === data.email)) {
      return { error: 'An account with this email already exists.' };
    }
    const newUser = {
      id: Date.now().toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      joinedAt: new Date().toISOString(),
    };
    accounts.push(newUser);
    localStorage.setItem('le_accounts', JSON.stringify(accounts));
    seedRequestedAccounts();
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    persist(STORAGE_KEYS.USER, safeUser);
    seedDemoCompletion();
    setCertificates(JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATES) || '[]'));
    setEnrollments(JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLMENTS) || '{}'));
    return { success: true };
  };

  const login = (email, password) => {
    const accounts = JSON.parse(localStorage.getItem('le_accounts') || '[]');
    const account = accounts.find(a => a.email === email && a.password === password);
    if (!account) return { error: 'Invalid email or password. Please try again.' };
    const { password: _, ...safeUser } = account;
    setUser(safeUser);
    persist(STORAGE_KEYS.USER, safeUser);
    seedDemoCompletion();
    setCertificates(JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATES) || '[]'));
    setEnrollments(JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLMENTS) || '{}'));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const enrollCourse = (courseId) => {
    if (enrollments[courseId]) return;
    const updated = {
      ...enrollments,
      [courseId]: {
        enrolledAt: new Date().toISOString(),
        completedVideos: [],
        completed: false,
        completedAt: null,
        progressPercent: 0,
      }
    };
    setEnrollments(updated);
    persist(STORAGE_KEYS.ENROLLMENTS, updated);
  };

  const markVideoComplete = (courseId, videoId, totalVideos) => {
    const current = enrollments[courseId] || { completedVideos: [], completed: false, progressPercent: 0 };
    if (current.completedVideos.includes(videoId)) return;
    const completedVideos = [...current.completedVideos, videoId];
    const progressPercent = Math.round((completedVideos.length / totalVideos) * 100);
    const completed = progressPercent === 100;
    const updated = {
      ...enrollments,
      [courseId]: {
        ...current,
        completedVideos,
        progressPercent,
        completed,
        completedAt: completed ? new Date().toISOString() : current.completedAt,
      }
    };
    setEnrollments(updated);
    persist(STORAGE_KEYS.ENROLLMENTS, updated);

    if (completed) {
      issueCertificate(courseId);
    }

    const vpUpdated = { ...videoProgress, [`${courseId}_${videoId}`]: true };
    setVideoProgress(vpUpdated);
    persist(STORAGE_KEYS.VIDEO_PROGRESS, vpUpdated);
  };

  const completeCourse = (courseId) => {
    const current = enrollments[courseId];
    if (!current || current.completed) return;
    const updated = {
      ...enrollments,
      [courseId]: { ...current, completed: true, completedAt: new Date().toISOString(), progressPercent: 100 }
    };
    setEnrollments(updated);
    persist(STORAGE_KEYS.ENROLLMENTS, updated);
    issueCertificate(courseId);
  };

  const issueCertificate = (courseId) => {
    if (certificates.find(c => c.courseId === courseId)) return;
    const cert = {
      id: `LE-${Date.now()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`,
      courseId,
      userId: user?.id,
      issuedAt: new Date().toISOString(),
    };
    const updated = [...certificates, cert];
    setCertificates(updated);
    persist(STORAGE_KEYS.CERTIFICATES, updated);
  };

  const isEnrolled = (courseId) => !!enrollments[courseId];
  const isCompleted = (courseId) => !!enrollments[courseId]?.completed;
  const getCertificate = (courseId) => certificates.find(c => c.courseId === courseId);
  const getProgress = (courseId) => enrollments[courseId]?.progressPercent || 0;
  const isVideoComplete = (courseId, videoId) => videoProgress[`${courseId}_${videoId}`] || false;

  return (
    <AuthContext.Provider value={{
      user, loading, enrollments, certificates,
      register, login, logout,
      enrollCourse, markVideoComplete, completeCourse,
      isEnrolled, isCompleted, getCertificate, getProgress, isVideoComplete,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
