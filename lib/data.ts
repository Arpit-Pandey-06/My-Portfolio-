export const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

export const focusItems = [
  'Go',
  'Distributed Systems',
  'HTTP Server Engineering',
  'Cloud Technologies',
  'AI Engineering'
];

export const focusBars = [
  { label: 'Go', value: 55 },
  { label: 'Distributed Systems', value: 45 },
  { label: 'HTTP Server Engineering', value: 50 },
  { label: 'Cloud Technologies', value: 40 },
  { label: 'AI Engineering', value: 35 }
];

export const specialization = [
  'Backend Development',
  'API Design',
  'System Architecture',
  'Scalable Applications'
];

export type TechCategory = {
  id: string;
  name: string;
  items: { n: string; icon: string }[];
};

export const categories: TechCategory[] = [
  {
    id: 'languages',
    name: 'Languages',
    items: [
      { n: 'JavaScript', icon: icon('javascript') },
      { n: 'TypeScript', icon: icon('typescript') },
      { n: 'Python', icon: icon('python') },
      { n: 'SQL', icon: icon('postgresql') },
      { n: 'Go (learning)', icon: icon('go') }
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend',
    items: [
      { n: 'React', icon: icon('react') },
      { n: 'Next.js', icon: icon('nextdotjs/white') },
      { n: 'Tailwind CSS', icon: icon('tailwindcss') }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    items: [
      { n: 'Node.js', icon: icon('nodedotjs') },
      { n: 'Express.js', icon: icon('express/white') },
      { n: 'FastAPI', icon: icon('fastapi') }
    ]
  },
  {
    id: 'database',
    name: 'Database',
    items: [
      { n: 'PostgreSQL', icon: icon('postgresql') },
      { n: 'MongoDB', icon: icon('mongodb') },
      { n: 'Redis', icon: icon('redis') }
    ]
  },
  {
    id: 'orm',
    name: 'ORM',
    items: [{ n: 'Prisma', icon: icon('prisma/white') }]
  },
  {
    id: 'auth',
    name: 'Auth',
    items: [
      { n: 'JWT', icon: icon('jsonwebtokens/white') },
      { n: 'OAuth', icon: icon('auth0') }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps',
    items: [
      { n: 'Docker', icon: icon('docker') },
      { n: 'Git', icon: icon('git') },
      { n: 'GitHub', icon: icon('github/white') }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud',
    items: [
      { n: 'Vercel', icon: icon('vercel/white') },
      { n: 'Render', icon: icon('render') }
    ]
  }
];

export type Project = {
  id: string;
  name: string;
  route: string;
  status: 'running' | 'building';
  desc: string;
  stack: { n: string; icon: string }[];
  meta: string;
};

export const projects: Project[] = [
  {
    id: 'fitsaas',
    name: 'FitSaaS',
    route: '/services/fitsaas',
    status: 'building',
    desc: 'A multi-tenant Gym Management SaaS platform focused on scalability and clean backend architecture.',
    stack: [
      { n: 'Next.js', icon: icon('nextdotjs/white') },
      { n: 'TypeScript', icon: icon('typescript') },
      { n: 'PostgreSQL', icon: icon('postgresql') },
      { n: 'Prisma', icon: icon('prisma/white') }
    ],
    meta: 'TYPE: SaaS · MULTI-TENANT'
  },
  {
    id: 'securesphere',
    name: 'SecureSphere',
    route: '/services/securesphere',
    status: 'running',
    desc: 'AI-powered cyber security platform with authentication, dashboard, threat monitoring and backend APIs.',
    stack: [
      { n: 'FastAPI', icon: icon('fastapi') },
      { n: 'Python', icon: icon('python') },
      { n: 'MongoDB', icon: icon('mongodb') },
      { n: 'Redis', icon: icon('redis') }
    ],
    meta: 'TYPE: AI / SECURITY'
  },
  {
    id: 'realtime-chat',
    name: 'Realtime Chat',
    route: '/services/realtime-chat',
    status: 'running',
    desc: 'Realtime chat application with authentication, Redis sessions and WebSockets.',
    stack: [
      { n: 'Node.js', icon: icon('nodedotjs') },
      { n: 'Express', icon: icon('express/white') },
      { n: 'Redis', icon: icon('redis') },
      { n: 'WebSocket', icon: icon('socketdotio/white') }
    ],
    meta: 'TYPE: REALTIME'
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    route: '/services/portfolio',
    status: 'running',
    desc: 'This interactive engineering portfolio — a system you can explore rather than scroll past.',
    stack: [
      { n: 'Next.js', icon: icon('nextdotjs/white') },
      { n: 'Framer Motion', icon: icon('framer/white') }
    ],
    meta: 'TYPE: META'
  }
];

export type LogYear = {
  year: string;
  branch: string;
  commits: { hash: string; message: string }[];
};

export const commitLog: LogYear[] = [
  { year: '2023', branch: 'main', commits: [{ hash: 'a1c3f0', message: 'Started Web Development' }] },
  { year: '2024', branch: 'main', commits: [{ hash: 'b7e2d4', message: 'Started Backend Engineering' }] },
  { year: '2025', branch: 'main', commits: [{ hash: 'd3f9a1', message: 'Built multiple full-stack projects' }] },
  {
    year: '2026',
    branch: 'feature/go-systems',
    commits: [
      { hash: 'e88c21', message: 'Building FitSaaS' },
      { hash: 'f01ab6', message: 'Learning Go' },
      { hash: '12df44', message: 'Learning distributed systems' },
      { hash: '99a3be', message: 'Building an HTTP server from scratch' }
    ]
  }
];

export const contact = {
  email: 'arpitpandey0601@gmail.com',
  github: 'https://github.com/Arpit-Pandey-06',
  githubLabel: 'github.com/Arpit-Pandey-06',
  linkedin: 'https://www.linkedin.com/in/arpit-pandey-918365295',
  linkedinLabel: 'linkedin.com/in/arpit-pandey'
};
