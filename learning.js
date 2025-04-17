/*
Using Database Connections in API Controllers

Now that we have our database connection set up in db.js, we can use it in our controllers.
Here's the typical structure for a controller that uses the database:*/
// 1. Import the pool from db.js
import pool from '../db.js';  // Adjust the path as needed based on your file structure

// 2. Create controller functions that use the pool for database operations
export const getProducts = async (req, res) => {
  try {
    // Use the pool to run SQL queries
    const result = await pool.query('SELECT * FROM products');
    
    // Return the query results as JSON
    res.json(result.rows);
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// 3. Use this controller function in your routes
// In your server.js or routes file:
// import { getProducts } from './controllers/productController.js';
// app.get('/api/products', getProducts);

/*Key Points to Remember:

1. Always use parameterized queries ($1, $2, etc.) instead of string concatenation
   to prevent SQL injection attacks

2. Wrap your database operations in try/catch blocks to handle errors properly

3. Use async/await for cleaner code when working with database queries

4. Return appropriate HTTP status codes (200 for success, 404 for not found, 
   500 for server errors, etc.)

*/```