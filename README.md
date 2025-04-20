# Blog Manager

A full-stack blog management application built with React and Node.js.

## Features

- User authentication via email
- Create, read, and delete blog posts
- User profile management
- Responsive design
- Modern UI with clean aesthetics

## Project Structure

```
Blog-manager/
├── backend/               # Node.js backend
│   ├── controllers/      # Request handlers
│   ├── db.js            # Database configuration
│   ├── schema.sql       # Database schema
│   ├── server.js        # Express server setup
│   └── package.json     # Backend dependencies
│
└── react-blog-manager/   # React frontend
    ├── public/          # Static files
    ├── src/
    │   ├── components/  # React components
    │   ├── assets/      # Images and other assets
    │   └── App.js       # Main application component
    └── package.json     # Frontend dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/prabhakar1234pr/Blog-manager.git
   cd Blog-manager
   ```

2. Backend Setup:
   ```bash
   cd backend
   npm install
   # Create .env file with your database configuration
   npm start
   ```

3. Frontend Setup:
   ```bash
   cd react-blog-manager
   npm install
   npm start
   ```

4. Create a `.env` file in the backend directory with the following:
   ```
   DATABASE_URL=your_postgresql_connection_string
   PORT=5001
   ```

## Available Scripts

In both backend and frontend directories:

- `npm start`: Runs the application
- `npm test`: Runs tests
- `npm run build`: Creates production build (frontend only)

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - CSS3
  - Modern JavaScript (ES6+)

- **Backend**:
  - Node.js
  - Express
  - PostgreSQL
  - cors
  - dotenv

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.