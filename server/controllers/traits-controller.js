// server/controllers/traits-controller.js
import { getResume } from './resume-controller.js';

export const getTraits = () => {
  const resumeData = getResume();
  return resumeData.traits;
};
