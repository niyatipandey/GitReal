function detectTechnologies(packageJson) {
  const technologies = [];

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  const TECHNOLOGY_MAP = {
  'react': 'React',
  'react-router-dom': 'React Router',
  'next': 'Next.js',
  'vue': 'Vue.js',
  'express': 'Express',
  'fastapi': 'FastAPI',
  'axios': 'Axios',
  'tailwindcss': 'Tailwind CSS',
  '@tailwindcss/vite': 'Tailwind CSS',
  'vite': 'Vite',
  'mongoose': 'MongoDB',
  'pg': 'PostgreSQL',
  '@supabase/supabase-js': 'Supabase',
  'prisma': 'Prisma',
  'socket.io': 'Socket.io',
  'jsonwebtoken': 'JWT',
  'bcryptjs': 'bcrypt',
  'framer-motion': 'Framer Motion',
  'groq-sdk': 'Groq',
  'openai': 'OpenAI',
  'typescript': 'TypeScript',
  'vitest': 'Vitest',
  'jest': 'Jest',
  'svelte': 'Svelte',
  '@angular/core': 'Angular',
  'nuxt': 'Nuxt.js',
  'styled-components': 'Styled Components',
  '@mui/material': 'Material UI',
  'antd': 'Ant Design',
  'bootstrap': 'Bootstrap',
  'sass': 'Sass',
  'fastify': 'Fastify',
  'koa': 'Koa',
  'hapi': 'Hapi',
  'nestjs': 'NestJS',
  '@nestjs/core': 'NestJS',
  'mysql2': 'MySQL',
  'redis': 'Redis',
  'ioredis': 'Redis',
  '@prisma/client': 'Prisma',
  'sequelize': 'Sequelize',
  'typeorm': 'TypeORM',
  'mongodb': 'MongoDB',
  'passport': 'Passport',
  '@auth0/auth0-react': 'Auth0',
  'firebase': 'Firebase',
  '@supabase/supabase-js': 'Supabase',
  '@anthropic-ai/sdk': 'Anthropic',
  'langchain': 'LangChain',
  '@langchain/core': 'LangChain',
  'mocha': 'Mocha',
  'cypress': 'Cypress',
  'playwright': 'Playwright',
  '@testing-library/react': 'React Testing Library',
  'redux': 'Redux',
  '@reduxjs/toolkit': 'Redux Toolkit',
  'zustand': 'Zustand',
  'mobx': 'MobX',
  'recoil': 'Recoil',
  'webpack': 'Webpack',
  'esbuild': 'esbuild',
  'turbo': 'Turborepo',
  'graphql': 'GraphQL',
  'apollo-server': 'Apollo Server',
  '@apollo/client': 'Apollo Client',
  'serverless': 'Serverless',
  '@vercel/node': 'Vercel',
  'socket.io-client': 'Socket.io',
  'stripe': 'Stripe',
  'nodemailer': 'Nodemailer',
  'multer': 'Multer',
  'sharp': 'Sharp',
  'zod': 'Zod',
  'yup': 'Yup'
};

Object.entries(TECHNOLOGY_MAP).forEach(([packageName,techName])=>{
  if(dependencies[packageName] && !technologies.includes(techName)){
    technologies.push(techName);
  }
})
  return technologies;
}

module.exports = detectTechnologies;