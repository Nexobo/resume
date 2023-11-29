// server/controllers/education-controller.js
import { getResume } from './resume-controller.js';

export const getEducation = () => {
  const resumeData = getResume();
  return resumeData.education;
};
