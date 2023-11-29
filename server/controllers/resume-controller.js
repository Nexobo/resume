import fs from 'fs';

export const getResume = () => {
  const resumeData = fs.readFileSync(`./resume.json`, 'utf8');
  const resumeJson = JSON.parse(resumeData);
  return resumeJson;
};
