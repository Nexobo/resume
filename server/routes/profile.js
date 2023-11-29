import express from 'express';
const router = express.Router();

import { getProfile } from '../controllers/profile-controller.js';

router.get('/', (req, res) => {
  res.send(getProfile());
});

export default router;
