import { getResume } from './resume-controller.js';

export const getTitle = () => {
  const resumeData = getResume();
  return resumeData.title;
};
