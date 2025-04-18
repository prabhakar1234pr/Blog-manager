import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import profileController from './controllers/profileController.js';
import greetController from './controllers/greetController.js';
import createBlogPost from './controllers/blogController.js';
import getBlogPosts from './controllers/blogListController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/profile', profileController);
app.get('/api/greet', greetController);
app.post('/api/blogs', createBlogPost);
app.post('/api/blog-list', getBlogPosts);

app.get('/', (req, res) => {
  res.send('Welcome to the backend API 🚀');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
