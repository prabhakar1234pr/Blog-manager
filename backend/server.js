import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

import profileController from './controllers/profileController.js';
import greetController from './controllers/greetController.js';
import createBlogPost from './controllers/blogController.js';
import getBlogPosts from './controllers/blogListController.js';

dotenv.config();
const db = pool.default || pool;

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Request body:', req.body);
  }
  next();
});

app.use(express.json());

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    // Check if tables exist
    const tablesQuery = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = tablesQuery.rows.map(row => row.table_name);
    
    // Check blogs table structure if it exists
    let blogsStructure = null;
    if (tables.includes('blogs')) {
      const blogsQuery = await db.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'blogs'
      `);
      blogsStructure = blogsQuery.rows;
    }
    
    res.json({ 
      status: 'Database connected',
      tables,
      blogsStructure
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      error: 'Database connection failed',
      details: error.message
    });
  }
});

// Profile routes
app.post('/api/profile', profileController);
app.get('/api/profile/:email', profileController);

// Other routes
app.get('/api/greet', greetController);
app.post('/api/blogs', createBlogPost);
app.post('/api/blog-list', getBlogPosts);

app.get('/', (req, res) => {
  res.send('Welcome to the backend API 🚀');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
