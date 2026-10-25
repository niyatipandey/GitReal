
const axios = require('axios');

async function extractSkillsFromResume(resumeText) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: process.env.OPENROUTER_MODEL,
      response_format: {
        type: 'json_object'
      },
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
        9. Examine the entire resume carefully, especially the complete
        technical skills section.

        10. Extract every explicitly listed technical skill from every category. Do not skip categories or omit skills because they appear near the end of a section.

        11. Preserve all original category names and skill names whenever possible. Do not summarize, merge, or silently discard skills.

        12. Before returning the result, check that every category and every skill listed in the technical skills section is represented in the JSON output.

        13. Do not infer additional skills from projects, job titles, or descriptions when extracting skills from the technical skills section.
        14. Treat category headings and skill names as separate fields.A category heading must be a JSON key, and every skill listed
        beneath it must be an item in that category's array.Do not turn skill names into category headings.
        For example, if the resume contains:
        Core    Data Structures & Algorithms, State Management

        Return:
        "Core": ["Data Structures & Algorithms", "State Management"]

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
