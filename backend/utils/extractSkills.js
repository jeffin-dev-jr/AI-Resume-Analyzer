const skillList = [
  "react",
  "javascript",
  "html",
  "css",
  "node",
  "express",
  "mongodb",
  "python",
  "sql",
  "machine learning",
  "aws",
  "docker",
  "kubernetes",
  "java",
  "spring boot",
  "django",
  "data science",
  "linux",
  "rest api"
];

function extractSkills(text) {

  const lowerText = text.toLowerCase();

  const foundSkills = skillList.filter(skill =>
    lowerText.includes(skill)
  );

  return foundSkills;

}

module.exports = extractSkills;