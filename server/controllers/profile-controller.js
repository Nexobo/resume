import { getResume } from './resume-controller.js';

export const getProfile = () => {
  const resumeData = getResume();
  return resumeData.profile;
};
