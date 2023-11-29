import express from 'express';
import { getTitle } from '../controllers/title-controller.js';
const router = express.Router();
router.get('/', (req, res) => res.json(getTitle()));
export default router;
