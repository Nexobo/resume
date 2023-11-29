// server/routes/contact.js
import express from 'express';
import { getContact } from '../controllers/contact-controller.js';

const router = express.Router();

router.get('/', (req, res) => res.json(getContact()));

export default router;
