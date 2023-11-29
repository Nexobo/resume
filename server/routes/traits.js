// server/routes/traits.js
import express from 'express';
import { getTraits } from '../controllers/traits-controller.js';

const router = express.Router();

router.get('/', (req, res) => res.json(getTraits()));

export default router;
