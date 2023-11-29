// server/controllers/references-controller.js
import { getResume } from './resume-controller.js';

export const getReferences = () => {
  const resumeData = getResume();
  return resumeData.references;
};
