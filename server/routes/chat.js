import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
//set up dirname

router.get('/start', (req, res) => {
  console.log('Hello World!');
  res.json({ message: 'Chat session is ready.' });
});
router.get('/history/:key', (req, res) => {
  const key = req.params.key;

  //   if (!isKeyValid(key)) {
  //     return res.status(401).send('Invalid key');
  //   }

  const filePath = path.join(__dirname, '../chats', `${key}.json`);
  console.log('filePath', filePath);
  if (!fs.existsSync(filePath)) {
    return res.json([]); // No history
  }

  const chatHistory = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(chatHistory);
});

export default router;
