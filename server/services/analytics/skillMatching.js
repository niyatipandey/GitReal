function findSkillsToInvestigate(resumeSkills, technologyEvidence) {
  const matches = [];

  for (const [category, skills] of Object.entries(resumeSkills)) {
    for (const skill of skills) {
      const detectedTechnology = Object.keys(technologyEvidence).find(
        (technology) =>
          technology.toLowerCase() === skill.toLowerCase()
      );

      if (!detectedTechnology) {
        continue;
      }

      const repositories =
        technologyEvidence[detectedTechnology].repositories || [];

      for (const repository of repositories) {
        matches.push({
          category,
          skill,
          repository: repository.name,
          owner: repository.owner
        });
      }
    }
  }

  return matches;
}

module.exports = findSkillsToInvestigate;
