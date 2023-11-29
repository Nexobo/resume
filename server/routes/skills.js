// server/routes/skills.js
import express from 'express';
import { getSkills } from '../controllers/skills-controller.js';

const router = express.Router();

router.get('/', (req, res) => res.json(getSkills()));

export default router;
