// server/controllers/contact-controller.js
import { getResume } from './resume-controller.js';

export const getContact = () => {
  const resumeData = getResume();
  return resumeData.contact;
};
