// server/controllers/skills-controller.js
import { getResume } from './resume-controller.js';

export const getSkills = () => {
  const resumeData = getResume();
  return resumeData.skills;
};
