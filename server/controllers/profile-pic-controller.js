// server/controllers/references-controller.js
import { getResume } from './resume-controller.js';

export const getProfilePic = () => {
  const resumeData = getResume();
  return resumeData.profilePic;
};
