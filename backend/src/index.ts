import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDatabase from './utils/database';

// Import routes
import projectRoutes from './routes/projects';
import clientRoutes from './routes/clients';
import contactRoutes from './routes/contacts';
import newsletterRoutes from './routes/newsletter';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDatabase();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/contact', contactRoutes); // Alias for contact form submission
app.use('/api/subscribers', newsletterRoutes);
app.use('/api/subscribe', newsletterRoutes); // Alias for newsletter subscription

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio API Server',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      clients: '/api/clients',
      contacts: '/api/contacts',
      contact: '/api/contact',
      subscribers: '/api/subscribers',
      subscribe: '/api/subscribe',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size too large. Maximum size is 5MB.'
    });
  }
  
  if (err.message.includes('Only JPEG, JPG, PNG, and WebP images are allowed')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📄 API Documentation: http://localhost:${PORT}`);
});