import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CHATS_DIR = path.join(__dirname, '../chats'); // Adjust the path as needed

// Ensure the chat directory exists asynchronously
async function ensureChatDir() {
  try {
    await fs.access(CHATS_DIR);
  } catch (error) {
    await fs.mkdir(CHATS_DIR, { recursive: true });
  }
}

export const appendMessageToFile = async (key, msg, direction = 'inbound') => {
  await ensureChatDir();
  console.log('keysss', key);
  const filePath = path.join(CHATS_DIR, `${key}.json`);
  const timestamp = new Date().toISOString();

  try {
    let messages = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      messages = JSON.parse(fileContent);
    } catch (readError) {
      // If the file doesn't exist, start with an empty array
      if (readError.code !== 'ENOENT') throw readError;
    }

    // Append the new message as an object
    messages.push({
      ...msg,
      time: timestamp,
      direction: direction,
    });

    // Write the updated messages back to the file asynchronously
    await fs.writeFile(filePath, JSON.stringify(messages), 'utf8');
  } catch (error) {
    console.error(`Error appending message to file: ${error}`);
    // Handle further, maybe send a notification or log to a monitoring system
  }
};
