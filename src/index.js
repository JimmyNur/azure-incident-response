/**
 * Agropilote - Main Application Entry Point
 * 
 * This is the main entry point for the Agropilote application.
 * It initializes the Express server and sets up the basic routes.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Agropilote',
    version: '1.0.0'
  });
});

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Agropilote API',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

// API routes (to be implemented)
app.get('/api/fields', (req, res) => {
  res.json({ 
    message: 'Fields endpoint - coming soon',
    fields: [] 
  });
});

app.get('/api/crops', (req, res) => {
  res.json({ 
    message: 'Crops endpoint - coming soon',
    crops: [] 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: 'The requested resource does not exist'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🌱 Agropilote server is running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;
