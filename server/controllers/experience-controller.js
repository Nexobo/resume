// server/controllers/experience-controller.js
import { getResume } from './resume-controller.js';

export const getExperience = () => {
  const resumeData = getResume();
  return resumeData.experience;
};
