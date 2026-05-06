export const COLORS = {
  primary: '#C0272D',
  primaryDark: '#9B1B20',
  background: '#F5F5F5',
  surface: '#F8F8F8',
  dark: '#1A1A1A',
  text: '#1A1A1A',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#E8E8E8',
  success: '#2ECC71',
  warning: '#F39C12',
  cardBg: '#FFFFFF',
  tagBg: '#F0F0F0',
  softSkillTag: '#E8F4FD',
  softSkillText: '#2980B9',
  sustainabilityTag: '#E8F8F0',
  sustainabilityText: '#27AE60',
  excellenceTag: '#FDF3E8',
  excellenceText: '#E67E22',
};

export const CATEGORY_META = {
  'SOFT SKILLS': {
    label: 'Soft Skills',
    bg: COLORS.softSkillTag,
    text: COLORS.softSkillText,
    heroBg: '#1A1A3A',
    cardBg: '#1A3A5C',
    icon: 'mic',
  },
  SUSTAINABILITY: {
    label: 'Sustainability',
    bg: COLORS.sustainabilityTag,
    text: COLORS.sustainabilityText,
    heroBg: '#1A3A2E',
    cardBg: '#2C5F2E',
    icon: 'leaf',
  },
  EXCELLENCE: {
    label: 'Excellence',
    bg: COLORS.excellenceTag,
    text: COLORS.excellenceText,
    heroBg: '#2E1A1A',
    cardBg: '#3D1A2E',
    icon: 'star',
  },
};

const DEFAULT_CATEGORY_META = {
  label: 'Course',
  bg: COLORS.tagBg,
  text: COLORS.textSecondary,
  heroBg: '#2E1A1A',
  cardBg: '#1A1A2E',
  icon: 'book',
};

export const COURSE_CATEGORIES = Object.entries(CATEGORY_META).map(([category, meta]) => ({
  cat: category,
  label: meta.label,
  color: meta.text,
  bg: meta.bg,
}));

export const SEARCH_FILTERS = [
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'area', label: 'Area' },
  { id: 'duration', label: 'Duration' },
];

export const ACTIVITY_TABS = ['Past', 'In Progress', 'Future'];

const buildLessons = (dates, time) => dates.map(date => ({ date, time }));

const COURSE_IMAGES = {
  advancedPublicSpeaking: require('../../assets/courses/advanced-public-speaking.png'),
  circularEconomy101: require('../../assets/courses/circular-economy-101.png'),
  epistemologyEthics: require('../../assets/courses/epistemology-ethics.png'),
  advancedComputationalEthics: require('../../assets/courses/advanced-computational-ethics.png'),
  comparativeLiterature: require('../../assets/courses/comparative-literature.png'),
  advancedRenaissanceArt: require('../../assets/courses/advanced-renaissance-art.png'),
  strategicCommunication: require('../../assets/courses/strategic-communication-academic-environments.png'),
  sustainabilityLab: require('../../assets/courses/sustainability-lab-circular-economies.png'),
  pythonDataScience: require('../../assets/courses/python-data-science-research.png'),
  macroeconomicArchitecture: require('../../assets/courses/macroeconomic-architecture.png'),
  quantumInformationTheory: require('../../assets/courses/quantum-information-theory.png'),
};

const PROFILE_IMAGES = {
  studentAvatar: require('../../assets/profile/university-student-avatar.png'),
};

const PROFESSOR_IMAGES = {
  brunoSurace: require('../../assets/professors/bruno-surace.png'),
  mariaRossi: require('../../assets/professors/maria-rossi.png'),
  luciaBianchi: require('../../assets/professors/lucia-bianchi.png'),
  marcoBianchi: require('../../assets/professors/marco-bianchi.png'),
  elisaMarino: require('../../assets/professors/elisa-marino.png'),
  ilariaDeSantis: require('../../assets/professors/ilaria-de-santis.png'),
  giuliaFerretti: require('../../assets/professors/giulia-ferretti.png'),
  lorenzoVerde: require('../../assets/professors/lorenzo-verde.png'),
  andreaConti: require('../../assets/professors/andrea-conti.png'),
  albertoRusso: require('../../assets/professors/alberto-russo.png'),
  fabrizioLandi: require('../../assets/professors/fabrizio-landi.png'),
};

export const COURSES = [
  {
    id: '1',
    title: 'Advanced Public Speaking',
    category: 'SOFT SKILLS',
    categoryColor: '#2980B9',
    categoryBg: '#E8F4FD',
    date: 'Oct 12',
    description: 'Master the art of persuasive communication and presence from soft skills to masterclasses.',
    professor: 'Bruno Surace',
    professorTitle: 'Semiotic Professor @ UniTo',
    professorImage: PROFESSOR_IMAGES.brunoSurace,
    enrolled: 16,
    rating: 4.8,
    duration: '12 hours',
    location: 'Sala Polivalente',
    building: 'Section Po',
    schedule: 'Wed, 20:00-21:30',
    lessons: buildLessons(
      ['Oct 12', 'Oct 19', 'Oct 26', 'Nov 2', 'Nov 9', 'Nov 16', 'Nov 23', 'Nov 30'],
      '20:00-21:30'
    ),
    enrollmentOpen: true,
    image: COURSE_IMAGES.advancedPublicSpeaking,
    modules: [
      { title: 'The Architecture of Persuasion', desc: 'Foundational structures of rhetoric.' },
      { title: 'Body Language & Mirroring', desc: 'The neuroscience of communication.' },
      { title: 'Handling Difficult Questions', desc: 'Structuring complex arguments for immediate cognitive impact.' },
    ],
    quote: '"Eloquence is the power to translate a truth into language perfectly intelligible to the person to whom you speak."',
    tags: ['Humanities', 'Enrollment Open'],
  },
  {
    id: '2',
    title: 'Circular Economy 101',
    category: 'SUSTAINABILITY',
    categoryColor: '#27AE60',
    categoryBg: '#E8F8F0',
    date: 'Oct 18',
    description: 'Understanding global resource management and sustainable business models for a greener future.',
    professor: 'Dr. Maria Rossi',
    professorTitle: 'Economics Professor @ UniTo',
    professorImage: PROFESSOR_IMAGES.mariaRossi,
    enrolled: 14,
    rating: 4.6,
    duration: '10 hours',
    location: 'Biblioteca',
    building: 'Section San Paolo',
    schedule: 'Thu, 18:00-19:30',
    lessons: buildLessons(
      ['Oct 18', 'Oct 25', 'Nov 1', 'Nov 8', 'Nov 15', 'Nov 22', 'Nov 29'],
      '18:00-19:30'
    ),
    enrollmentOpen: true,
    image: COURSE_IMAGES.circularEconomy101,
    modules: [
      { title: 'From Linear to Circular', desc: 'Rethinking resource flows in modern economies.' },
      { title: 'Business Models for Sustainability', desc: 'Case studies from leading companies.' },
      { title: 'Policy & Regulation', desc: 'European Green Deal and local initiatives.' },
    ],
    quote: '"The economy is a wholly owned subsidiary of the environment."',
    tags: ['Sustainability', 'Enrollment Open'],
  },
  {
    id: '3',
    title: 'Epistemology & Ethics',
    category: 'EXCELLENCE',
    categoryColor: '#E67E22',
    categoryBg: '#FDF3E8',
    date: 'Oct 20',
    description: 'Exploring the intersection of knowledge theory and moral philosophy.',
    professor: 'Prof. Lucia Bianchi',
    professorTitle: 'Philosophy Professor @ UniTo',
    professorImage: PROFESSOR_IMAGES.luciaBianchi,
    enrolled: 22,
    rating: 4.9,
    duration: '14 hours',
    location: 'Online',
    building: '--',
    schedule: 'Fri, 17:00-18:30',
    lessons: buildLessons(
      ['Oct 20', 'Oct 27', 'Nov 3', 'Nov 10', 'Nov 17', 'Nov 24', 'Dec 1', 'Dec 15', 'Jan 12'],
      '17:00-18:30'
    ),
    enrollmentOpen: true,
    image: COURSE_IMAGES.epistemologyEthics,
    modules: [
      { title: 'Foundations of Knowledge', desc: 'What can we truly know?' },
      { title: 'Moral Frameworks', desc: 'Utilitarianism, deontology, and virtue ethics.' },
      { title: 'Applied Ethics', desc: 'Technology, AI, and contemporary dilemmas.' },
    ],
    quote: '"The unexamined life is not worth living."',
    tags: ['Philosophy', 'Excellence'],
  },
  {
    id: '4',
    title: 'Advanced Computational Ethics',
    category: 'EXCELLENCE',
    categoryColor: '#E67E22',
    categoryBg: '#FDF3E8',
    date: 'Nov 5',
    description: 'Exploring the intersection of artificial intelligence and moral philosophy in decentralized systems.',
    professor: 'Prof. Marco Bianchi',
    professorTitle: 'AI Ethics Researcher @ PoliTo',
    professorImage: PROFESSOR_IMAGES.marcoBianchi,
    enrolled: 30,
    rating: 4.7,
    duration: '16 hours',
    location: 'Online',
    building: '--',
    schedule: 'Mon, 19:00-21:00',
    lessons: buildLessons(
      ['Nov 5', 'Nov 12', 'Nov 19', 'Nov 26', 'Dec 3', 'Dec 10', 'Dec 17', 'Jan 14'],
      '19:00-21:00'
    ),
    enrollmentOpen: false,
    image: COURSE_IMAGES.advancedComputationalEthics,
    modules: [
      { title: 'AI & Moral Agency', desc: 'Can machines make ethical decisions?' },
      { title: 'Bias and Fairness', desc: 'Identifying and mitigating algorithmic bias.' },
      { title: 'Governance Frameworks', desc: 'Regulatory approaches to AI ethics.' },
    ],
    quote: '"With great power comes great responsibility."',
    tags: ['Technology', 'Ethics'],
  },
  {
    id: '5',
    title: 'Comparative Literature',
    category: 'SOFT SKILLS',
    categoryColor: '#2980B9',
    categoryBg: '#E8F4FD',
    date: 'Nov 10',
    description: 'Analyzing literary works across cultures and time periods to develop critical thinking.',
    professor: 'Prof. Elisa Marino',
    professorTitle: 'Literature Professor @ UniTo',
    professorImage: PROFESSOR_IMAGES.elisaMarino,
    enrolled: 18,
    rating: 4.5,
    duration: '12 hours',
    location: 'Sala Lettura',
    building: 'Section Crocetta',
    schedule: 'Tue, 18:30-20:00',
    lessons: buildLessons(
      ['Nov 10', 'Nov 17', 'Nov 24', 'Dec 1', 'Dec 8', 'Dec 15', 'Jan 12', 'Jan 19'],
      '18:30-20:00'
    ),
    enrollmentOpen: true,
    image: COURSE_IMAGES.comparativeLiterature,
    modules: [
      { title: 'World Literature Overview', desc: 'From Homer to Borges.' },
      { title: 'Cross-Cultural Analysis', desc: 'Themes that transcend borders.' },
      { title: 'Critical Writing', desc: 'Developing your analytical voice.' },
    ],
    quote: '"A reader lives a thousand lives before he dies."',
    tags: ['Literature', 'Humanities'],
  },
  {
    id: '6',
    title: 'Advanced Renaissance Art',
    category: 'EXCELLENCE',
    categoryColor: '#E67E22',
    categoryBg: '#FDF3E8',
    date: 'Nov 15',
    description: 'Deep dive into the masters of the Italian Renaissance and their enduring legacy.',
    professor: 'Ilaria De Santis',
    professorTitle: 'Art Director @ Pinacoteca',
    professorImage: PROFESSOR_IMAGES.ilariaDeSantis,
    enrolled: 12,
    rating: 4.8,
    duration: '10 hours',
    location: 'Sala Polivalente',
    building: 'Section Mole',
    schedule: 'Sat, 10:00-12:00',
    lessons: buildLessons(
      ['Nov 15', 'Nov 22', 'Nov 29', 'Dec 6', 'Dec 13'],
      '10:00-12:00'
    ),
    enrollmentOpen: true,
    image: COURSE_IMAGES.advancedRenaissanceArt,
    modules: [
      { title: 'Florence & the Medici', desc: 'The patronage that shaped Western art.' },
      { title: 'Technique & Innovation', desc: 'Perspective, sfumato, and chiaroscuro.' },
      { title: 'Legacy & Influence', desc: 'From Baroque to Modernism.' },
    ],
    quote: '"Art is never finished, only abandoned."',
    tags: ['Art History', 'Excellence'],
  },
  {
    id: '7',
    title: 'Strategic Communication in Academic Environments',
    category: 'SOFT SKILLS',
    categoryColor: '#2980B9',
    categoryBg: '#E8F4FD',
    date: 'Nov 20',
    description: 'Master the art of presenting complex research data to diverse audiences with clarity and authoritative presence.',
    professor: 'Prof. Giulia Ferretti',
    professorTitle: 'Communication Studies @ UniTo',
    professorImage: PROFESSOR_IMAGES.giuliaFerretti,
    enrolled: 25,
    rating: 4.6,
    duration: '8 hours',
    location: 'Palestra',
    building: 'Section Mole',
    schedule: 'Wed, 17:00-19:00',
    lessons: buildLessons(
      ['Nov 20', 'Nov 27', 'Dec 4', 'Dec 11'],
      '17:00-19:00'
    ),
    enrollmentOpen: true,
    image: COURSE_IMAGES.strategicCommunication,
    modules: [
      { title: 'Academic Presentation Skills', desc: 'Structuring research for different audiences.' },
      { title: 'Visual Communication', desc: 'Data visualization and slide design.' },
      { title: 'Q&A Mastery', desc: 'Handling challenging questions with confidence.' },
    ],
    quote: '"The most important thing in communication is hearing what isn\'t said."',
    tags: ['Soft Skills', 'Communication'],
  },
  {
    id: '8',
    title: 'Sustainability Lab: Circular Economies',
    category: 'SUSTAINABILITY',
    categoryColor: '#27AE60',
    categoryBg: '#E8F8F0',
    date: 'Dec 1',
    description: 'A deep dive into regenerative design and business models for a greener future.',
    professor: 'Prof. Lorenzo Verde',
    professorTitle: 'Sustainability Researcher @ UNESCO',
    professorImage: PROFESSOR_IMAGES.lorenzoVerde,
    enrolled: 20,
    rating: 4.7,
    duration: '12 hours',
    location: 'Biblioteca',
    building: 'Section San Paolo',
    schedule: 'Thu, 16:00-18:00',
    lessons: buildLessons(
      ['Dec 1', 'Dec 8', 'Dec 15', 'Dec 22', 'Jan 12', 'Jan 19'],
      '16:00-18:00'
    ),
    enrollmentOpen: true,
    image: COURSE_IMAGES.sustainabilityLab,
    modules: [
      { title: 'Regenerative Design Principles', desc: 'Beyond sustainability to regeneration.' },
      { title: 'Circular Business Models', desc: 'Real-world case studies.' },
      { title: 'Implementation Workshop', desc: 'Hands-on project development.' },
    ],
    quote: '"We do not inherit the earth from our ancestors; we borrow it from our children."',
    tags: ['Sustainability', 'Lab'],
  },
  {
    id: '9',
    title: 'Python for Data Science & Research',
    category: 'EXCELLENCE',
    categoryColor: '#E67E22',
    categoryBg: '#FDF3E8',
    date: 'Dec 10',
    description: 'Essential coding skills for statistical analysis and large dataset visualization.',
    professor: 'Prof. Andrea Conti',
    professorTitle: 'Data Science Professor @ PoliTo',
    professorImage: PROFESSOR_IMAGES.andreaConti,
    enrolled: 35,
    rating: 4.9,
    duration: '20 hours',
    location: 'Online',
    building: null,
    schedule: 'Fri, 14:00-16:00',
    lessons: buildLessons(
      ['Dec 10', 'Dec 17', 'Dec 24', 'Jan 7', 'Jan 14', 'Jan 21', 'Jan 28', 'Feb 4', 'Feb 11', 'Feb 18'],
      '14:00-16:00'
    ),
    enrollmentOpen: true,
    image: COURSE_IMAGES.pythonDataScience,
    modules: [
      { title: 'Python Fundamentals', desc: 'Core concepts for scientific computing.' },
      { title: 'Data Analysis with Pandas', desc: 'Manipulating and analyzing datasets.' },
      { title: 'Visualization & Reporting', desc: 'Creating compelling data stories.' },
    ],
    quote: '"Data is the new oil, but like oil, it needs to be refined."',
    tags: ['Technology', 'Data Science'],
  },
  {
    id: '10',
    title: 'Macroeconomic Architecture',
    category: 'EXCELLENCE',
    categoryColor: '#E67E22',
    categoryBg: '#FDF3E8',
    date: 'Dec 15',
    description: 'Analyzing global financial flows through the lens of institutional resilience.',
    professor: 'Prof. Alberto Russo',
    professorTitle: 'Economics @ UniTo',
    professorImage: PROFESSOR_IMAGES.albertoRusso,
    enrolled: 28,
    rating: 4.5,
    duration: '14 hours',
    location: 'Sala Polivalente',
    building: 'Section Valentino',
    schedule: 'Mon, 18:00-20:00',
    lessons: buildLessons(
      ['Dec 15', 'Dec 22', 'Jan 12', 'Jan 19', 'Jan 26', 'Feb 2', 'Feb 9'],
      '18:00-20:00'
    ),
    enrollmentOpen: false,
    image: COURSE_IMAGES.macroeconomicArchitecture,
    modules: [
      { title: 'Global Financial Systems', desc: 'Understanding interconnected markets.' },
      { title: 'Institutional Economics', desc: 'How rules shape economic outcomes.' },
      { title: 'Crisis & Resilience', desc: 'Lessons from financial shocks.' },
    ],
    quote: '"Economics is not a natural science, it is a social science."',
    tags: ['Economics', 'Finance'],
  },
  {
    id: '11',
    title: 'Quantum Information Theory',
    category: 'EXCELLENCE',
    categoryColor: '#E67E22',
    categoryBg: '#FDF3E8',
    date: 'Jan 10',
    description: 'Exploring quantum computing principles and their applications in information processing.',
    professor: 'Prof. Fabrizio Landi',
    professorTitle: 'Quantum Physics @ PoliTo',
    professorImage: PROFESSOR_IMAGES.fabrizioLandi,
    enrolled: 15,
    rating: 4.8,
    duration: '18 hours',
    location: 'Sala Polivalente',
    building: 'Section Po',
    schedule: 'Tue, 20:00-22:00',
    lessons: buildLessons(
      ['Jan 10', 'Jan 17', 'Jan 24', 'Jan 31', 'Feb 7', 'Feb 14', 'Feb 21', 'Feb 28', 'Mar 7'],
      '20:00-22:00'
    ),
    enrollmentOpen: true,
    image: COURSE_IMAGES.quantumInformationTheory,
    modules: [
      { title: 'Quantum Mechanics Basics', desc: 'Superposition, entanglement, and qubits.' },
      { title: 'Quantum Algorithms', desc: "Shor's, Grover's, and beyond." },
      { title: 'Future Applications', desc: 'Cryptography, simulation, and optimization.' },
    ],
    quote: '"Anyone who is not shocked by quantum theory has not understood it."',
    tags: ['Physics', 'Technology'],
  },
];

export const COURSES_BY_ID = Object.fromEntries(COURSES.map(course => [course.id, course]));

const COURSE_SEARCH_INDEX = COURSES.map(course => ({
  course,
  searchableText: [
    course.title,
    course.description,
    course.professor,
    course.category,
    course.location,
    course.building,
    ...course.tags,
  ].join(' ').toLowerCase(),
}));

export const STUDENT = {
  name: 'Elena Moretti',
  email: 'elenamoretti@gmail.it',
  year: 'YEAR 3',
  section: 'SECTION PO',
  hoursAccessed: 40,
  hoursTotal: 70,
  totalHours: '48.0 hrs',
  progress: 40 / 70,
  avatar: PROFILE_IMAGES.studentAvatar,
  currentCourses: [
    { id: '4', progress: 0.65, nextSession: '20:00 hr', status: 'in-progress' },
    { id: '5', progress: 0.4, nextSession: '21:00 hr', status: 'in-progress' },
    { id: '3', progress: 0.8, nextSession: '21:00 hr', status: 'in-progress' },
  ],
  futureCourses: [
    { id: '9', status: 'bookmarked' },
    { id: '1', status: 'bookmarked' },
  ],
};

export const isCourseInStudentList = (courseId) =>
  [...STUDENT.currentCourses, ...STUDENT.futureCourses].some(course => course.id === String(courseId));

export const ACTIVITY_BY_TAB = {
  Past: [
    { id: 'p1', courseId: '4', status: 'completed', startDate: 'Nov 12', endDate: 'Jan 16, 2025', hours: '12.5 hrs', progressPct: '100% Complete' },
    { id: 'p2', courseId: '2', status: 'completed', startDate: 'Sep 5', endDate: 'Nov 1, 2024', hours: '10.0 hrs', progressPct: '100% Complete' },
  ],
  'In Progress': [
    { id: 'ip1', courseId: '4', status: 'attending', startDate: 'Aug 05', endDate: 'Passed', hours: '12.5 hrs', progressPct: '25% Complete' },
    { id: 'ip2', courseId: '10', status: 'bookmarked', startDate: 'Nov 10', endDate: 'Jan 16, 2025', hours: '32.0 hrs', progressPct: 'Manage' },
  ],
  Future: [
    { id: 'f1', courseId: '9', status: 'bookmarked', startDate: 'Dec 10', endDate: 'Feb 28, 2025', hours: '0.0 hrs', progressPct: 'On your list' },
    { id: 'f2', courseId: '1', status: 'bookmarked', startDate: 'Jan 12', endDate: 'Mar 15, 2025', hours: '0.0 hrs', progressPct: 'On your list' },
  ],
};

export const ACTIVITY_HISTORY = Object.values(ACTIVITY_BY_TAB).flat();

export const NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'enrollment',
    title: 'Enrollment Confirmed',
    message: 'Welcome to the 2024 Academic Year! Your registration for the residential program is now active.',
    time: '11:41 AM',
    isToday: true,
    icon: 'checkmark-circle',
    color: '#27AE60',
  },
  {
    id: 'n2',
    type: 'reminder',
    title: 'Reminder: Course starts tomorrow',
    message: 'Architecture 101 begins at 09:00 AM in the Great Hall. Don\'t forget your student badge.',
    time: '09:30 AM',
    isToday: true,
    icon: 'time',
    color: '#F39C12',
  },
  {
    id: 'n3',
    type: 'new_course',
    courseId: '4',
    title: 'New Course Available',
    message: 'Enrollment is now open for Ethics in Artificial Intelligence by Prof. deMarco.',
    time: 'Yesterday',
    isToday: false,
    icon: 'book',
    color: '#C0272D',
    hasImage: true,
    detailBadge: 'NEW ARRIVAL',
    detailSubtitle: 'Ethics in Artificial Intelligence by Prof. de Marco',
  },
];

export const getCourseById = (courseId) => COURSES_BY_ID[String(courseId)] || null;

export const getCategoryMeta = (category) => CATEGORY_META[category] || DEFAULT_CATEGORY_META;

export const getStudentProfile = () => STUDENT;

export const getStudentCurrentCourses = () =>
  STUDENT.currentCourses
    .map((enrollment) => {
      const course = getCourseById(enrollment.id);

      if (!course) {
        return null;
      }

      return {
        ...course,
        ...enrollment,
        course,
      };
    })
    .filter(Boolean);

export const getCourseEnrollmentState = (courseId, enrolledCourseIds = []) => {
  const alreadyOnList = isCourseInStudentList(courseId);
  const isEnrolled = alreadyOnList || enrolledCourseIds.includes(String(courseId));
  const course = getCourseById(courseId);

  return {
    alreadyOnList,
    isEnrolled,
    enrollmentClosed: course?.enrollmentOpen === false && !isEnrolled,
  };
};

export const getFilteredCourses = ({ query = '', category = null, activeFilterIds = [] } = {}) => {
  const normalizedQuery = query.trim().toLowerCase();
  const onlySustainability = activeFilterIds.includes('sustainability');

  return COURSE_SEARCH_INDEX.filter(({ course, searchableText }) => {
    return (
      (!category || course.category === category) &&
      (!onlySustainability || course.category === 'SUSTAINABILITY') &&
      (!normalizedQuery || searchableText.includes(normalizedQuery))
    );
  }).map(({ course }) => course);
};

export const getUpcomingCourses = ({ query = '', category = null, limit = 4 } = {}) =>
  getFilteredCourses({ query, category }).slice(0, limit);

export const getActivityItemsByTab = (tab) =>
  (ACTIVITY_BY_TAB[tab] || [])
    .map((item) => {
      const course = getCourseById(item.courseId);

      if (!course) {
        return null;
      }

      return {
        ...item,
        course,
        title: course.title,
        category: course.category,
      };
    })
    .filter(Boolean);

export const getNotificationGroups = () => [
  {
    title: 'TODAY',
    data: NOTIFICATIONS.filter(notification => notification.isToday),
  },
  {
    title: 'YESTERDAY',
    data: NOTIFICATIONS.filter(notification => !notification.isToday),
  },
].map(group => ({
  ...group,
  data: group.data.map((notification) => {
    const course = notification.courseId ? getCourseById(notification.courseId) : null;

    return {
      ...notification,
      course,
      detailTitle: course?.title || notification.title,
      detailSubtitle: notification.detailSubtitle || course?.professor || '',
    };
  }),
}));
