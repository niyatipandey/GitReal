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
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs',
  '.cjs'
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
  'app.ts'
];

function getFilePriority(filePath) {
  const entryPointIndex = ENTRY_POINT_PRIORITY.indexOf(filePath);

  if (entryPointIndex !== -1) {
    return entryPointIndex;
  }

  return ENTRY_POINT_PRIORITY.length;
}

function isEligibleSourceFile(filePath) {
  const pathParts = filePath.split('/');

  const isExcluded = pathParts.some((part) =>
    EXCLUDED_DIRS.has(part)
  );

  if (isExcluded) {
    return false;
  }

  const extension = filePath.slice(filePath.lastIndexOf('.'));

  return SOURCE_EXTENSIONS.has(extension);
}

module.exports = {
  isEligibleSourceFile,
  getFilePriority
};
