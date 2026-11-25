
const path = require('path');

const EXCLUDED_DIRS = new Set([
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.git',
  '.next',
  '.vite',
  '.turbo',
  '.cache',
  'vendor',
  'venv',
  '.venv',
  '__pycache__',
  'target',
  'out'
]);

const SOURCE_EXTENSIONS = new Set([
  // JavaScript / TypeScript
  '.js', '.jsx', '.mjs', '.cjs',
  '.ts', '.tsx',

  // Python
  '.py',

  // Java
  '.java',

  // C / C++
  '.c', '.h', '.cc', '.cpp', '.cxx',
  '.hpp', '.hh',

  // Other programming languages
  '.cs',
  '.go',
  '.rs',
  '.php',
  '.rb',
  '.swift',
  '.kt',
  '.kts',

  // Web technologies
  '.html',
  '.htm',
  '.css',
  '.scss',
  '.sass',

  // Database
  '.sql'
]);

const ENTRY_POINT_PRIORITY = [
  'src/App.jsx',
  'src/App.tsx',
  'src/main.jsx',
  'src/main.tsx',
  'src/index.jsx',
  'src/index.tsx',

  'server/index.js',
  'server/server.js',
  'server/app.js',

  'backend/index.js',
  'backend/server.js',
  'backend/app.js',

  'src/server.js',
  'src/app.js',
  'src/index.js',

  'index.js',
  'server.js',
  'app.js',
  'index.ts',
  'server.ts',
  'app.ts',

  // Python entry points
  'main.py',
  'app.py',
  'manage.py',

  // Java entry points
  'src/main/java',

  // Go entry points
  'main.go'
];

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/').replace(/^\/+/, '');
}

function isEligibleSourceFile(filePath) {
  if (typeof filePath !== 'string' || !filePath.trim()) {
    return false;
  }

  const normalizedPath = normalizePath(filePath);
  const pathParts = normalizedPath.split('/');

  const isExcluded = pathParts.some(part =>
    EXCLUDED_DIRS.has(part)
  );

  if (isExcluded) {
    return false;
  }

  const extension = path.extname(normalizedPath).toLowerCase();

  return SOURCE_EXTENSIONS.has(extension);
}

function getFilePriority(filePath) {
  const normalizedPath = normalizePath(filePath);

  const exactIndex = ENTRY_POINT_PRIORITY.indexOf(normalizedPath);

  if (exactIndex !== -1) {
    return exactIndex;
  }

  // Give files in common Java source locations a useful priority.
  if (
    normalizedPath.includes('/src/main/java/') ||
    normalizedPath.startsWith('src/main/java/')
  ) {
    return ENTRY_POINT_PRIORITY.indexOf('src/main/java');
  }

  return ENTRY_POINT_PRIORITY.length;
}

module.exports = {
  isEligibleSourceFile,
  getFilePriority
};
