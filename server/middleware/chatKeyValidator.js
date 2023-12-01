import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const permittedKeysFilePath = path.join(
  __dirname,
  '../chats/permittedKeys.json'
); // Adjust the path as needed

/**
 * Middleware to validate chat keys.
 */
export const validateChatKey = (req, res, next) => {
  try {
    const permittedKeys = JSON.parse(
      fs.readFileSync(permittedKeysFilePath, 'utf8')
    );
    const key = req.header('Chat-Key');

    if (permittedKeys.includes(key)) {
      next(); // Key is valid, proceed to the next middleware
    } else {
      res.status(401).json({ error: 'Invalid or missing chat key' });
    }
  } catch (error) {
    console.error(`Error in validateChatKey middleware: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export function isKeyValid(key, isAdmin = false) {
  const permittedKeys = JSON.parse(
    fs.readFileSync('./chats/permittedKeys.json', 'utf8')
  );
  return isAdmin
    ? key === permittedKeys.adminKey
    : permittedKeys.userKeys.includes(key);
}
