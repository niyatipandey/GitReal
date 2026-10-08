function detectSourceTechnologies(content) {
  const technologies = [];

  if (
    content.includes("from 'react'") ||
    content.includes('from "react"')
  ) {
    technologies.push('React');
  }

  if (
    content.includes("from 'react-router-dom'") ||
    content.includes('from "react-router-dom"')
  ) {
    technologies.push('React Router');
  }

  return technologies;
}

module.exports = detectSourceTechnologies;