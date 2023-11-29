// server/routes/experience.js
import express from 'express';
import { getExperience } from '../controllers/experience-controller.js';

const router = express.Router();

router.get('/', (req, res) => res.json(getExperience()));

export default router;
