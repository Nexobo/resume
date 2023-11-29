import express from 'express';
import { getProfilePic } from '../controllers/profile-pic-controller.js';
import path from 'path';

const router = express.Router();
const __dirname = new URL('../public', import.meta.url).pathname;
const publicPath = __dirname.slice(1);
router.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, getProfilePic()));
});

export default router;
