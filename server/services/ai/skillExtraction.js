
const axios = require('axios');

async function extractSkillsFromResume(resumeText) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: process.env.OPENROUTER_MODEL,
      messages: [
        {
          role: 'system',
          content: `Extract technical skills from the resume text.

        Rules:
        1. Extract only skills and technologies explicitly mentioned in the resume.
        2. Preserve skill names and category headings as written in the resume whenever possible.
        3. Group skills under the categories used in the resume.
        4. If the resume has no skill categories, create suitable categories based only on the extracted skills.
        5. Do not invent skills, infer proficiency, or add technologies that are not mentioned.
        6. Exclude personal details, education, job titles, and general responsibilities.
        7. Return valid JSON only, with category names as keys and arrays of skill names as values.
        8. If no technical skills are found, return an empty JSON object: {}.

        Example output:
        {
        "AI / ML": ["Python", "TensorFlow"],
        "Frontend": ["React", "CSS"],
        "Cloud": ["AWS"]
        }`
        },
        {
          role: 'user',
          content: resumeText
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPEN_ROUTER_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const content = response.data.choices[0].message.content;

  return JSON.parse(content);
}

module.exports = extractSkillsFromResume;
