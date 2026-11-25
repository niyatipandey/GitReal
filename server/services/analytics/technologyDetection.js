const { normalizeTechnologyName } = require('./technologyRegistry');

function detectTechnologies(packageJson,sourceFiles = []) {
  const technologies = [];

  const dependencies = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {})
  };

  const TECHNOLOGY_MAP = {
    // Frontend frameworks and libraries
    'react': 'React',
    'react-dom': 'React',
    'recharts': 'Recharts',
    'react-router-dom': 'React Router',
    'next': 'Next.js',
    'vue': 'Vue.js',
    'nuxt': 'Nuxt.js',
    'svelte': 'Svelte',
    '@angular/core': 'Angular',
    'jquery': 'jQuery',
    'bootstrap': 'Bootstrap',
    'tailwindcss': 'Tailwind CSS',
    '@tailwindcss/vite': 'Tailwind CSS',
    'styled-components': 'Styled Components',
    '@mui/material': 'Material UI',
    'antd': 'Ant Design',
    'sass': 'Sass',
    'framer-motion': 'Framer Motion',

    // State management
    'redux': 'Redux',
    '@reduxjs/toolkit': 'Redux Toolkit',
    'zustand': 'Zustand',
    'mobx': 'MobX',
    'recoil': 'Recoil',

    // Backend frameworks and libraries
    'express': 'Express.js',
    'fastify': 'Fastify',
    'koa': 'Koa',
    '@hapi/hapi': 'Hapi',
    '@nestjs/core': 'NestJS',
    'socket.io': 'Socket.IO',
    'socket.io-client': 'Socket.IO',
    'axios': 'Axios',
    'multer': 'Multer',
    'nodemailer': 'Nodemailer',
    'sharp': 'Sharp',

    // Databases and ORMs
    'mongoose': 'Mongoose',
    'mongodb': 'MongoDB',
    'mysql2': 'MySQL',
    'pg': 'PostgreSQL',
    'redis': 'Redis',
    'ioredis': 'Redis',
    '@supabase/supabase-js': 'Supabase',
    'firebase': 'Firebase',
    'prisma': 'Prisma',
    '@prisma/client': 'Prisma',
    'sequelize': 'Sequelize',
    'typeorm': 'TypeORM',

    // Authentication and security
    'jsonwebtoken': 'JWT',
    'bcrypt': 'bcrypt',
    'bcryptjs': 'bcryptjs',
    'passport': 'Passport',
    '@auth0/auth0-react': 'Auth0',

    // AI and machine learning
    'openai': 'OpenAI',
    'groq-sdk': 'Groq',
    '@anthropic-ai/sdk': 'Anthropic',
    '@google/generative-ai': 'Google Gemini',
    'langchain': 'LangChain',
    '@langchain/core': 'LangChain',

    // Testing
    'jest': 'Jest',
    'vitest': 'Vitest',
    'mocha': 'Mocha',
    'chai': 'Chai',
    'cypress': 'Cypress',
    'playwright': 'Playwright',
    '@playwright/test': 'Playwright',
    '@testing-library/react': 'React Testing Library',
    'supertest': 'Supertest',

    // Build tools and package managers
    'vite': 'Vite',
    'webpack': 'Webpack',
    'esbuild': 'esbuild',
    'turbo': 'Turborepo',
    'typescript': 'TypeScript',

    // APIs and data validation
    'graphql': 'GraphQL',
    'apollo-server': 'Apollo Server',
    '@apollo/client': 'Apollo Client',
    'zod': 'Zod',
    'yup': 'Yup',

    // Payments and other integrations
    'stripe': 'Stripe',

    // Deployment and cloud
    '@vercel/node': 'Vercel',
    'serverless': 'Serverless Framework'
  };

    // Programming language detection
  const LANGUAGE_EXTENSIONS = {
    '.js': 'JavaScript',
    '.jsx': 'JavaScript',
    '.mjs': 'JavaScript',
    '.cjs': 'JavaScript',

    '.ts': 'TypeScript',
    '.tsx': 'TypeScript',

    '.py': 'Python',
    '.java': 'Java',
    '.cpp': 'C++',
    '.cc': 'C++',
    '.cxx': 'C++',
    '.c': 'C',
    '.h': 'C',
    '.hpp': 'C++',

    '.cs': 'C#',
    '.go': 'Go',
    '.rs': 'Rust',
    '.php': 'PHP',
    '.rb': 'Ruby',
    '.swift': 'Swift',
    '.kt': 'Kotlin',
    '.kts': 'Kotlin'
  };

  sourceFiles.forEach((filePath) => {
    const extension = filePath.slice(filePath.lastIndexOf('.'));

    const language = LANGUAGE_EXTENSIONS[extension];

    if (language) {
      const normalizedLanguage = normalizeTechnologyName(language);

      if (!technologies.includes(normalizedLanguage)) {
        technologies.push(normalizedLanguage);
      }
    }
  });

  Object.entries(TECHNOLOGY_MAP).forEach(([packageName, techName]) => {
    const normalizedTechnology = normalizeTechnologyName(techName);

    if (
      Object.prototype.hasOwnProperty.call(dependencies, packageName) &&
      !technologies.includes(normalizedTechnology)
    ) {
      technologies.push(normalizedTechnology);
    }
  });

  return technologies;
}

module.exports = detectTechnologies;
