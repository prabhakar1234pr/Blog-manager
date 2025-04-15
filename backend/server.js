const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 5000;

const profileController = require('./controllers/profileController');
const greetController = require('./controllers/greetController');
const blogController = require('./controllers/blogController');
const blogListController = require('./controllers/blogListController');

app.use(express.json());

app.get('/api/profile', profileController);
app.get('/api/greet', greetController);
app.post('/api/blog-post', blogController);
app.get('/api/blog-posts', blogListController);

app.get('/', (req, res) => {
  res.send('Welcome to the backend API 🚀');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});