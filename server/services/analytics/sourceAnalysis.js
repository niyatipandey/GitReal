
const path = require('path');

const LANGUAGE_BY_EXTENSION = {
  '.js': 'JavaScript',
  '.jsx': 'JavaScript',
  '.mjs': 'JavaScript',
  '.cjs': 'JavaScript',
  '.ts': 'TypeScript',
  '.tsx': 'TypeScript',

  '.py': 'Python',

  '.java': 'Java',

  '.c': 'C',
  '.h': 'C',
  '.cc': 'C++',
  '.cpp': 'C++',
  '.cxx': 'C++',
  '.hpp': 'C++',
  '.hh': 'C++',

  '.cs': 'C#',

  '.go': 'Go',
  '.rs': 'Rust',
  '.php': 'PHP',
  '.rb': 'Ruby',
  '.swift': 'Swift',
  '.kt': 'Kotlin',
  '.kts': 'Kotlin',

  '.html': 'HTML',
  '.htm': 'HTML',
  '.css': 'CSS',
  '.scss': 'Sass',
  '.sass': 'Sass',
  '.sql': 'SQL'
};

const SOURCE_PATTERNS = [
  // JavaScript / TypeScript ecosystem
  {
    technology: 'React',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    patterns: [
      /\bfrom\s*['"]react['"]/,
      /\brequire\s*\(\s*['"]react['"]\s*\)/,
      /<\s*[A-Z][A-Za-z0-9.]*(?:\s|\/|>)/ 
    ]
  },
  {
    technology: 'Recharts',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    patterns: [
      /\bfrom\s*['"]recharts['"]/,
      /\brequire\s*\(\s*['"]recharts['"]\s*\)/
    ]
  },
  {
    technology: 'React Router',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    patterns: [
      /\bfrom\s*['"]react-router(?:-dom)?['"]/,
      /\brequire\s*\(\s*['"]react-router(?:-dom)?['"]\s*\)/,
      /\b(BrowserRouter|HashRouter|MemoryRouter|Routes|Route|useNavigate|useLocation)\b/
    ]
  },
  {
    technology: 'Express.js',
    extensions: ['.js', '.ts', '.mjs', '.cjs'],
    patterns: [
      /\bfrom\s*['"]express['"]/,
      /\brequire\s*\(\s*['"]express['"]\s*\)/,
      /\bexpress\s*\(\s*\)/,
      /\b(app|router)\.(get|post|put|patch|delete|use)\s*\(/
    ]
  },
  {
    technology: 'Node.js',
    extensions: ['.js', '.ts', '.mjs', '.cjs'],
    patterns: [
      /\bfrom\s*['"]node:[^'"]+['"]/,
      /\brequire\s*\(\s*['"](?:node:)?(?:fs|path|http|https|os|crypto|events|stream|child_process)['"]\s*\)/,
      /\bmodule\.exports\b/
    ]
  },
  {
    technology: 'Axios',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    patterns: [
      /\bfrom\s*['"]axios['"]/,
      /\brequire\s*\(\s*['"]axios['"]\s*\)/,
      /\baxios\.(get|post|put|patch|delete|request)\s*\(/
    ]
  },
  {
    technology: 'Mongoose',
    extensions: ['.js', '.ts', '.mjs', '.cjs'],
    patterns: [
      /\bfrom\s*['"]mongoose['"]/,
      /\brequire\s*\(\s*['"]mongoose['"]\s*\)/,
      /\bmongoose\.(connect|model|Schema)\b/
    ]
  },
  {
    technology: 'MongoDB',
    extensions: ['.js', '.ts', '.mjs', '.cjs', '.py', '.java'],
    patterns: [
      /\bfrom\s*['"]mongodb['"]/,
      /\brequire\s*\(\s*['"]mongodb['"]\s*\)/,
      /\bMongoClient\b/,
      /\bfrom\s+mongodb\s+import\b/,
      /\bMongoRepository\b/
    ]
  },
  {
    technology: 'JWT',
    extensions: ['.js', '.ts', '.py', '.java', '.cs'],
    patterns: [
      /\bfrom\s*['"]jsonwebtoken['"]/,
      /\brequire\s*\(\s*['"]jsonwebtoken['"]\s*\)/,
      /\b(jwt|jsonwebtoken)\.(sign|verify|decode)\s*\(/,
      /\b(jwt\.encode|jwt\.decode)\s*\(/,
      /\b(JwtSecurityToken|JwtBearer)\b/
    ]
  },
  {
    technology: 'bcryptjs',
    extensions: ['.js', '.ts'],
    patterns: [
      /\bfrom\s*['"]bcryptjs['"]/,
      /\brequire\s*\(\s*['"]bcryptjs['"]\s*\)/,
      /\bbcrypt\.(hash|compare|genSalt)\s*\(/
    ]
  },
  {
    technology: 'Groq',
    extensions: ['.js', '.ts', '.py'],
    patterns: [
      /\bfrom\s*['"]groq-sdk['"]/,
      /\brequire\s*\(\s*['"]groq-sdk['"]\s*\)/,
      /\bGroq\s*\(/,
      /\bfrom\s+groq\s+import\b/
    ]
  },
  {
    technology: 'Google Gemini',
    extensions: ['.js', '.ts', '.py'],
    patterns: [
      /\bfrom\s*['"]@google\/generative-ai['"]/,
      /\brequire\s*\(\s*['"]@google\/generative-ai['"]\s*\)/,
      /\bGoogleGenerativeAI\b/,
      /\bfrom\s+google\.generativeai\s+import\b/
    ]
  },
  {
    technology: 'Supabase',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    patterns: [
      /\bfrom\s*['"]@supabase\/supabase-js['"]/,
      /\brequire\s*\(\s*['"]@supabase\/supabase-js['"]\s*\)/,
      /\bcreateClient\s*\(/
    ]
  },
  {
    technology: 'Tailwind CSS',
    extensions: ['.html', '.htm', '.jsx', '.tsx', '.js', '.ts'],
    patterns: [
      /\bclassName\s*=\s*["'][^"']*(?:flex|grid|items-center|justify-center|text-|bg-|p-|m-|rounded)/,
      /\bclass\s*=\s*["'][^"']*(?:flex|grid|items-center|justify-center|text-|bg-|p-|m-|rounded)/
    ]
  },
  {
    technology: 'Framer Motion',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    patterns: [
      /\bfrom\s*['"]framer-motion['"]/,
      /\brequire\s*\(\s*['"]framer-motion['"]\s*\)/,
      /\b(motion|AnimatePresence)\./
    ]
  },
  {
    technology: 'Zustand',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    patterns: [
      /\bfrom\s*['"]zustand['"]/,
      /\brequire\s*\(\s*['"]zustand['"]\s*\)/,
      /\bcreate\s*\(\s*\(\s*set\b/
    ]
  },
  {
    technology: 'Vite',
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    patterns: [
      /\bimport\.meta\.env\b/,
      /\bimport\.meta\.glob\s*\(/,
      /\bfrom\s*['"]vite['"]/
    ]
  },

  // Python ecosystem
  {
    technology: 'Django',
    extensions: ['.py'],
    patterns: [
      /^\s*from\s+django(?:\.|\s+import)/m,
      /^\s*import\s+django\b/m,
      /\bmodels\.Model\b/,
      /\burlpatterns\s*=/
    ]
  },
  {
    technology: 'Flask',
    extensions: ['.py'],
    patterns: [
      /^\s*from\s+flask\s+import/m,
      /^\s*import\s+flask\b/m,
      /\bFlask\s*\(__name__\)/
    ]
  },
  {
    technology: 'FastAPI',
    extensions: ['.py'],
    patterns: [
      /^\s*from\s+fastapi\s+import/m,
      /^\s*import\s+fastapi\b/m,
      /\bFastAPI\s*\(/
    ]
  },
  {
    technology: 'SQLAlchemy',
    extensions: ['.py'],
    patterns: [
      /^\s*from\s+sqlalchemy(?:\.|\s+import)/m,
      /^\s*import\s+sqlalchemy\b/m,
      /\b(create_engine|declarative_base|sessionmaker)\s*\(/
    ]
  },
  {
    technology: 'Pandas',
    extensions: ['.py'],
    patterns: [
      /^\s*import\s+pandas\b/m,
      /^\s*from\s+pandas\s+import/m
    ]
  },
  {
    technology: 'NumPy',
    extensions: ['.py'],
    patterns: [
      /^\s*import\s+numpy\b/m,
      /^\s*from\s+numpy\s+import/m
    ]
  },
  {
    technology: 'PyTorch',
    extensions: ['.py'],
    patterns: [
      /^\s*import\s+torch\b/m,
      /^\s*from\s+torch\s+import/m
    ]
  },
  {
    technology: 'TensorFlow',
    extensions: ['.py'],
    patterns: [
      /^\s*import\s+tensorflow\b/m,
      /^\s*from\s+tensorflow\s+import/m
    ]
  },
  {
    technology: 'Pytest',
    extensions: ['.py'],
    patterns: [
      /^\s*import\s+pytest\b/m,
      /^\s*from\s+pytest\s+import/m,
      /^\s*def\s+test_[A-Za-z0-9_]+\s*\(/m
    ]
  },

  // Java ecosystem
  {
    technology: 'Spring Boot',
    extensions: ['.java'],
    patterns: [
      /^\s*import\s+org\.springframework\./m,
      /@SpringBootApplication\b/,
      /\bSpringApplication\.run\s*\(/
    ]
  },
  {
    technology: 'JUnit',
    extensions: ['.java'],
    patterns: [
      /^\s*import\s+org\.junit\./m,
      /@Test\b/
    ]
  },

  // C# ecosystem
  {
    technology: 'ASP.NET Core',
    extensions: ['.cs'],
    patterns: [
      /^\s*using\s+Microsoft\.AspNetCore/m,
      /\bWebApplication\.CreateBuilder\s*\(/,
      /\bMapGet\s*\(/
    ]
  },
  {
    technology: 'Entity Framework',
    extensions: ['.cs'],
    patterns: [
      /^\s*using\s+Microsoft\.EntityFrameworkCore/m,
      /\bDbContext\b/,
      /\bDbSet\s*</
    ]
  },

  // Go ecosystem
  {
    technology: 'Go',
    extensions: ['.go'],
    patterns: [
      /^\s*package\s+[A-Za-z_]\w*/m
    ]
  },

  // Rust ecosystem
  {
    technology: 'Rust',
    extensions: ['.rs'],
    patterns: [
      /^\s*fn\s+main\s*\(/m,
      /^\s*use\s+[A-Za-z_]\w*::/m,
      /\bfn\s+[A-Za-z_]\w*\s*\(/
    ]
  },

  // PHP ecosystem
  {
    technology: 'Laravel',
    extensions: ['.php'],
    patterns: [
      /^\s*use\s+Illuminate\\/m,
      /\bRoute::(get|post|put|patch|delete)\s*\(/
    ]
  },

  // Ruby ecosystem
  {
    technology: 'Ruby on Rails',
    extensions: ['.rb'],
    patterns: [
      /^\s*require\s+['"]rails['"]/m,
      /\bApplicationController\b/,
      /\bActiveRecord::Base\b/
    ]
  },

  // HTML / CSS / SQL
  {
    technology: 'HTML',
    extensions: ['.html', '.htm'],
    patterns: [
      /<!DOCTYPE\s+html/i,
      /<html[\s>]/i,
      /<head[\s>]/i,
      /<body[\s>]/i
    ]
  },
  {
    technology: 'CSS',
    extensions: ['.css', '.scss', '.sass'],
    patterns: [
      /[^{}]+\{[^{}]*:[^{};]+;[^{}]*\}/
    ]
  },
  {
    technology: 'SQL',
    extensions: ['.sql'],
    patterns: [
      /\b(SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE|ALTER\s+TABLE)\b/i
    ]
  }
];

function detectSourceTechnologies(content, filePath = '') {
  if (typeof content !== 'string' || !content.trim()) {
    return [];
  }

  const extension = path.extname(filePath).toLowerCase();
  const technologies = new Set();

  // Identify the programming language from the file extension.
  const language = LANGUAGE_BY_EXTENSION[extension];

  if (language) {
    technologies.add(language);
  }

  // Detect frameworks and libraries using language-specific patterns.
  for (const detector of SOURCE_PATTERNS) {
    if (
      detector.extensions.includes(extension) &&
      detector.patterns.some(pattern => pattern.test(content))
    ) {
      technologies.add(detector.technology);
    }
  }

  return [...technologies];
}

module.exports = detectSourceTechnologies;
