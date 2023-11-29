// server/routes/education.js
import express from 'express';
import { getEducation } from '../controllers/education-controller.js';

const router = express.Router();

router.get('/', (req, res) => res.json(getEducation()));

export default router;
