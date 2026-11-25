
const TECHNOLOGY_REGISTRY = {
  // 1. Programming languages
  'JavaScript': {
    category: 'language',
    aliases: ['JS', 'ECMAScript']
  },
  'TypeScript': {
    category: 'language',
    aliases: ['TS']
  },
  'Python': {
    category: 'language',
    aliases: ['Python 3', 'Py']
  },
  'Java': {
    category: 'language',
    aliases: ['Java SE', 'Java EE', 'J2EE']
  },
  'C': {
    category: 'language',
    aliases: ['C Language']
  },
  'C++': {
    category: 'language',
    aliases: ['CPP', 'C Plus Plus', 'C Plus+']
  },
  'C#': {
    category: 'language',
    aliases: ['C Sharp', 'CSharp']
  },
  'Go': {
    category: 'language',
    aliases: ['Golang']
  },
  'PHP': {
    category: 'language',
    aliases: ['PHP Language']
  },
  'Ruby': {
    category: 'language',
    aliases: ['Ruby Language']
  },
  'Kotlin': {
    category: 'language',
    aliases: ['Kotlin Language']
  },
  'Swift': {
    category: 'language',
    aliases: ['Swift Language']
  },
  'Rust': {
    category: 'language',
    aliases: ['Rust Language']
  },
  'SQL': {
    category: 'language',
    aliases: ['Structured Query Language']
  },
  'HTML': {
    category: 'language',
    aliases: ['HTML5']
  },
  'CSS': {
    category: 'language',
    aliases: ['CSS3']
  },

  // 2. Frontend frameworks and libraries
  'React': {
    category: 'frontend',
    aliases: ['React.js', 'ReactJS']
  },
  'React Native': {
    category: 'mobile',
    aliases: ['ReactNative']
  },
  'React Router': {
    category: 'frontend',
    aliases: ['React Router DOM']
  },
  'Angular': {
    category: 'frontend',
    aliases: ['Angular 2', 'Angular 2+']
  },
  'AngularJS': {
    category: 'frontend',
    aliases: ['Angular 1', 'Angular.js']
  },
  'Vue.js': {
    category: 'frontend',
    aliases: ['Vue', 'VueJS']
  },
  'Next.js': {
    category: 'frontend',
    aliases: ['NextJS', 'Next']
  },
  'Nuxt.js': {
    category: 'frontend',
    aliases: ['Nuxt', 'NuxtJS']
  },
  'Svelte': {
    category: 'frontend',
    aliases: ['Svelte.js']
  },
  'jQuery': {
    category: 'frontend',
    aliases: ['JQuery']
  },
  'Bootstrap': {
    category: 'frontend',
    aliases: ['Bootstrap CSS']
  },
  'Tailwind CSS': {
    category: 'frontend',
    aliases: ['Tailwind', 'TailwindCSS']
  },
  'Material UI': {
    category: 'frontend',
    aliases: ['MUI']
  },
  'Ant Design': {
    category: 'frontend',
    aliases: ['AntD']
  },
  'Styled Components': {
    category: 'frontend',
    aliases: ['styled-components']
  },
  'Sass': {
    category: 'frontend',
    aliases: ['SCSS']
  },
  'Vite': {
    category: 'frontend',
    aliases: ['Vite.js']
  },
  'Webpack': {
    category: 'frontend',
    aliases: []
  },

  // 3. Backend frameworks and runtimes
  'Node.js': {
    category: 'backend',
    aliases: ['Node', 'NodeJS']
  },
  'Express.js': {
    category: 'backend',
    aliases: ['Express', 'ExpressJS']
  },
  'NestJS': {
    category: 'backend',
    aliases: ['Nest.js']
  },
  'Fastify': {
    category: 'backend',
    aliases: ['Fastify.js']
  },
  'Koa': {
    category: 'backend',
    aliases: ['Koa.js']
  },
  'Django': {
    category: 'backend',
    aliases: ['Django Framework']
  },
  'Flask': {
    category: 'backend',
    aliases: ['Flask Framework']
  },
  'FastAPI': {
    category: 'backend',
    aliases: ['Fast API']
  },
  'Spring Boot': {
    category: 'backend',
    aliases: ['SpringBoot']
  },
  'ASP.NET Core': {
    category: 'backend',
    aliases: ['ASP.NET', 'Dotnet Core']
  },
  'Laravel': {
    category: 'backend',
    aliases: ['Laravel PHP']
  },
  'Ruby on Rails': {
    category: 'backend',
    aliases: ['Rails', 'ROR']
  },

  // 4. Databases and ORMs
  'MongoDB': {
    category: 'database',
    aliases: ['Mongo']
  },
  'Mongoose': {
    category: 'database',
    aliases: ['Mongoose ODM']
  },
  'MySQL': {
    category: 'database',
    aliases: ['My SQL']
  },
  'PostgreSQL': {
    category: 'database',
    aliases: ['Postgres', 'Postgre']
  },
  'SQLite': {
    category: 'database',
    aliases: ['SQLite3']
  },
  'Redis': {
    category: 'database',
    aliases: ['Redis Cache']
  },
  'Firebase': {
    category: 'database',
    aliases: ['Google Firebase']
  },
  'Supabase': {
    category: 'database',
    aliases: []
  },
  'Oracle Database': {
    category: 'database',
    aliases: ['Oracle DB']
  },
  'Microsoft SQL Server': {
    category: 'database',
    aliases: ['MS SQL Server', 'MSSQL']
  },
  'Prisma': {
    category: 'database',
    aliases: ['Prisma ORM']
  },
  'Sequelize': {
    category: 'database',
    aliases: ['Sequelize ORM']
  },
  'TypeORM': {
    category: 'database',
    aliases: []
  },
  'SQLAlchemy': {
    category: 'database',
    aliases: []
  },
  'Entity Framework': {
    category: 'database',
    aliases: ['EF Core', 'Entity Framework Core']
  },

  // 5. AI and machine learning
  'OpenAI': {
    category: 'ai_ml',
    aliases: ['OpenAI API', 'GPT API']
  },
  'Groq': {
    category: 'ai_ml',
    aliases: ['Groq API', 'Groq SDK']
  },
  'Google Gemini': {
    category: 'ai_ml',
    aliases: ['Gemini API', 'Gemini']
  },
  'Anthropic': {
    category: 'ai_ml',
    aliases: ['Claude API', 'Anthropic API']
  },
  'TensorFlow': {
    category: 'ai_ml',
    aliases: ['TF']
  },
  'PyTorch': {
    category: 'ai_ml',
    aliases: ['Torch']
  },
  'Keras': {
    category: 'ai_ml',
    aliases: []
  },
  'Scikit-learn': {
    category: 'ai_ml',
    aliases: ['Sklearn']
  },
  'Pandas': {
    category: 'ai_ml',
    aliases: []
  },
  'NumPy': {
    category: 'ai_ml',
    aliases: ['Numerical Python']
  },
  'OpenCV': {
    category: 'ai_ml',
    aliases: ['Open Computer Vision']
  },
  'LangChain': {
    category: 'ai_ml',
    aliases: ['LangChain.js']
  },
  'Hugging Face Transformers': {
    category: 'ai_ml',
    aliases: ['Transformers']
  },

  // 6. Cloud and deployment
  'AWS': {
    category: 'cloud',
    aliases: ['Amazon Web Services']
  },
  'Microsoft Azure': {
    category: 'cloud',
    aliases: ['Azure']
  },
  'Google Cloud Platform': {
    category: 'cloud',
    aliases: ['GCP', 'Google Cloud']
  },
  'Vercel': {
    category: 'cloud',
    aliases: ['Vercel Platform']
  },
  'Netlify': {
    category: 'cloud',
    aliases: []
  },
  'Render': {
    category: 'cloud',
    aliases: ['Render Cloud']
  },
  'Heroku': {
    category: 'cloud',
    aliases: []
  },
  'DigitalOcean': {
    category: 'cloud',
    aliases: ['DO']
  },

  // 7. DevOps and infrastructure
  'Docker': {
    category: 'devops',
    aliases: ['Docker Engine']
  },
  'Docker Compose': {
    category: 'devops',
    aliases: ['Compose']
  },
  'Kubernetes': {
    category: 'devops',
    aliases: ['K8s']
  },
  'GitHub Actions': {
    category: 'devops',
    aliases: ['GH Actions']
  },
  'Jenkins': {
    category: 'devops',
    aliases: []
  },
  'Terraform': {
    category: 'devops',
    aliases: ['HashiCorp Terraform']
  },
  'Ansible': {
    category: 'devops',
    aliases: []
  },
  'Nginx': {
    category: 'devops',
    aliases: ['NGINX']
  },
  'Linux': {
    category: 'devops',
    aliases: ['GNU/Linux']
  },
  'Bash': {
    category: 'devops',
    aliases: ['Shell Scripting']
  },

  // 8. Testing
  'Jest': {
    category: 'testing',
    aliases: []
  },
  'Vitest': {
    category: 'testing',
    aliases: []
  },
  'Mocha': {
    category: 'testing',
    aliases: []
  },
  'Chai': {
    category: 'testing',
    aliases: []
  },
  'Pytest': {
    category: 'testing',
    aliases: ['Py.test']
  },
  'JUnit': {
    category: 'testing',
    aliases: ['JUnit 5']
  },
  'Selenium': {
    category: 'testing',
    aliases: []
  },
  'Cypress': {
    category: 'testing',
    aliases: []
  },
  'Playwright': {
    category: 'testing',
    aliases: ['Microsoft Playwright']
  },
  'Postman': {
    category: 'testing',
    aliases: ['Postman API']
  },
  'React Testing Library': {
    category: 'testing',
    aliases: ['RTL']
  },

  // 9. APIs, authentication and development tools
  'REST API': {
    category: 'api',
    aliases: ['REST APIs', 'RESTful API', 'RESTful APIs']
  },
  'GraphQL': {
    category: 'api',
    aliases: ['GraphQL API']
  },
  'Apollo GraphQL': {
    category: 'api',
    aliases: ['Apollo Client', 'Apollo Server']
  },
  'JWT': {
    category: 'security',
    aliases: ['JSON Web Token', 'JSON Web Tokens']
  },
  'OAuth 2.0': {
    category: 'security',
    aliases: ['OAuth2', 'OAuth']
  },
  'Passport.js': {
    category: 'security',
    aliases: ['Passport']
  },
  'Git': {
    category: 'tools',
    aliases: ['Git Version Control']
  },
  'GitHub': {
    category: 'tools',
    aliases: ['GitHub Platform']
  },
  'npm': {
    category: 'tools',
    aliases: ['Node Package Manager']
  },
  'Yarn': {
    category: 'tools',
    aliases: ['Yarn Package Manager']
  },
  'pnpm': {
    category: 'tools',
    aliases: ['Performant npm']
  },
  'Swagger': {
    category: 'api',
    aliases: ['OpenAPI', 'Swagger UI']
  }
};

// Build a normalized lookup table from canonical names and aliases.
const TECHNOLOGY_LOOKUP = {};

function normalizeText(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[._-]/g, ' ')
    .replace(/\s+/g, ' ');
}

for (const [canonicalName, details] of Object.entries(TECHNOLOGY_REGISTRY)) {
  TECHNOLOGY_LOOKUP[normalizeText(canonicalName)] = canonicalName;

  for (const alias of details.aliases) {
    TECHNOLOGY_LOOKUP[normalizeText(alias)] = canonicalName;
  }
}

function normalizeTechnologyName(name) {
  if (!name || typeof name !== 'string') {
    return null;
  }

  const normalized = normalizeText(name);

  return TECHNOLOGY_LOOKUP[normalized] || name.trim();
}

module.exports = {
  TECHNOLOGY_REGISTRY,
  normalizeTechnologyName
};
