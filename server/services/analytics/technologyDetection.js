function detectTechnologies(packageJson) {
  const technologies = [];

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  if (dependencies.react) {
    technologies.push('React');
  }

  if (dependencies['react-router-dom']) {
    technologies.push('React Router');
  }

  if (dependencies.axios) {
    technologies.push('Axios');
  }

  if (dependencies['framer-motion']) {
    technologies.push('Framer Motion');
  }

  if (dependencies.tailwindcss || dependencies['@tailwindcss/vite']) {
    technologies.push('Tailwind CSS');
  }

  if (dependencies.vite) {
    technologies.push('Vite');
  }

  return technologies;
}

module.exports = detectTechnologies;