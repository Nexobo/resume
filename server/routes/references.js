// server/routes/references.js
import express from 'express';
import { getReferences } from '../controllers/references-controller.js';

const router = express.Router();

router.get('/', (req, res) => res.json(getReferences()));

export default router;
