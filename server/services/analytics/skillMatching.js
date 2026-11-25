
const { normalizeTechnologyName } = require('./technologyRegistry');

function normalizeForMatching(name) {
  if (typeof name !== 'string' || !name.trim()) return null;

  const canonical = normalizeTechnologyName(name);

  return canonical
    .toLowerCase()
    .trim()
    .replace(/[._-]/g, ' ')
    .replace(/\s+/g, ' ');
}

function findSkillsToInvestigate(resumeSkills, technologyEvidence = {}) {
  const skillResults = [];

  const technologyEntries = Object.entries(technologyEvidence);

  for (const [category, skills] of Object.entries(resumeSkills || {})) {
    for (const skill of skills || []) {
      const normalizedSkill = normalizeForMatching(skill);

      // Collect every technology entry matching this resume skill.
      const matchingEntries = technologyEntries.filter(
        ([technology]) =>
          normalizeForMatching(technology) === normalizedSkill
      );

      const repositories = matchingEntries.flatMap(
        ([, technology]) => technology.repositories || []
      );

      const evidence = repositories.flatMap(repository =>
        (repository.evidence || []).map(item => ({
          ...item,
          repository: item.repository || repository.name || repository.full_name
        }))
      );

      const hasSourceEvidence = evidence.some(
        item => item.type === 'source_code'
      );

      const hasDependencyEvidence = evidence.some(
        item => item.type === 'dependency'
      );

      let status = 'not_verified';

      if (hasSourceEvidence) {
        status = 'source_verified';
      } else if (hasDependencyEvidence) {
        status = 'dependency_only';
      }

      skillResults.push({
        category,
        skill,
        status,
        repositories,
        evidence
      });
    }
  }

  return skillResults;
}

module.exports = findSkillsToInvestigate;
