import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import titleRoute from './routes/title.js';
import resumeRoute from './routes/resume.js';
import profileRoute from './routes/profile.js';
import contactRoute from './routes/contact.js';
import traitsRoute from './routes/traits.js';
import skillsRoute from './routes/skills.js';
import educationRoute from './routes/education.js';
import referencesRoute from './routes/references.js';
import experienceRoute from './routes/experience.js';
import profilePicRoute from './routes/profile-pic.js';

dotenv.config();
//cors allow origin localhost:3000 and 'http://localhost:5173'
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  optionsSuccessStatus: 200,
};

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/title', titleRoute);
app.use('/resume', resumeRoute);
app.use('/profile', profileRoute);
app.use('/profile-pic', profilePicRoute);
app.use('/contact', contactRoute);
app.use('/traits', traitsRoute);
app.use('/skills', skillsRoute);
app.use('/education', educationRoute);
app.use('/references', referencesRoute);
app.use('/experience', experienceRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
