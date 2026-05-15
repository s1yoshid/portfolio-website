// ─── SITE CONFIGURATION ──────────────────────────────────────────────────────
// Edit this file to personalise every part of the portfolio.

export const SITE = {
  name:     'Shuusei Yoshida',
  role:     'Software Engineer',
  tagline:  "I build things that actually work. Whether it's close to the metal or up in the browser, I like my code clean, my bugs squashed, and my solutions actually solving something. Bonus points if it's elegant.",
  location: 'Long Beach, CA',
  email:    'shuuyoshi.work@gmail.com',
  resume:   '/resume.pdf',           // place your PDF in /public/resume.pdf
  avatar:   '/avatar.jpg',           // place your photo in /public/avatar.jpg
  social: {
    github:   'https://github.com/s1yoshid',
    linkedin: 'https://www.linkedin.com/in/shuuseiyoshida/',
  },
};

// ─── SKILLS ──────────────────────────────────────────────────────────────────
// icon: devicon class name  (https://devicon.dev/)
// Add / remove freely — layout adapts automatically.
export const SKILLS = [
  // Languages
  { name: 'Java',       icon: 'devicon-java-plain colored',       category: 'Language' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored', category: 'Language' },
  { name: 'Python',     icon: 'devicon-python-plain colored',     category: 'Language' },
  { name: 'C++',        icon: 'devicon-cplusplus-plain colored',  category: 'Language' },

  // Frontend
  { name: 'React',      icon: 'devicon-react-original colored',     category: 'Frontend' },
  { name: 'Next.js',    icon: 'devicon-nextjs-plain',               category: 'Frontend' },
  { name: 'Astro',      icon: 'devicon-astro-plain colored',        category: 'Frontend' },
  { name: 'Tailwind',   icon: 'devicon-tailwindcss-plain colored',  category: 'Frontend' },

  // Backend
  { name: 'Node.js',    icon: 'devicon-nodejs-plain colored',       category: 'Backend' },
  { name: 'Deno',    icon: 'devicon-denojs-original',       category: 'Backend' },
  { name: 'Spring Boot',    icon: 'devicon-spring-original colored',       category: 'Backend' },
  { name: 'Flask',    icon: 'devicon-flask-original',       category: 'Backend' },
  { name: 'FastAPI',    icon: 'devicon-fastapi-plain colored',       category: 'Backend' },
  { name: 'MySQL', icon: 'devicon-mysql-original colored',   category: 'Backend' },
  { name: 'SQLite',    icon: 'devicon-sqlite-plain colored',      category: 'Backend' },

  // Infrastructure
  { name: 'Docker',     icon: 'devicon-docker-plain colored',       category: 'Infra' },
  { name: 'GitHub',     icon: 'devicon-github-original',       category: 'Infra' },
  { name: 'Jira',     icon: 'devicon-jira-plain colored',       category: 'Infra' },
  { name: 'Confluence',     icon: 'devicon-confluence-plain colored',       category: 'Infra' },
  { name: 'Tomcat', icon: 'devicon-tomcat-line colored',   category: 'Infra' },
  { name: 'AWS',        icon: 'devicon-amazonwebservices-plain-wordmark colored', category: 'Infra' },
  { name: 'Linux',      icon: 'devicon-linux-plain',                category: 'Infra' },
];

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    company: 'LOGISTEED Solutions America (formerly Hitachi Group subsidiary)',
    role:     'Software Engineer',
    period:   'May 2022 — April 2026',
    desc:     'Designed and maintained a cloud-based Warehouse Management System deployed in 800+ warehouses globally and acted as lead engineer for multiple projects from supporting the U.S. warehouse operations of a Japanese eyewear retailer with 800+ stores worldwide to launching our system in a 24/7 steel wire manufacturer in Hamilton, OH that handles tens of thousands of kilograms of steel daily.',
  }
];
