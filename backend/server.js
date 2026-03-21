const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

console.log('Environment loaded:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing');
console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? '✅ Set' : '❌ Missing');

// Now require other modules that depend on env vars
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./services/oauthService');
const connectDB = require('./config/database');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const oauthRoutes = require('./routes/oauthRoutes');

connectDB();

const app = express();

// CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// Session middleware for OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'onboardai-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', oauthRoutes);  // OAuth routes under /api/auth
app.use('/api/user', userRoutes);
app.use('/api', uploadRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route works' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  console.log('404 for:', req.method, req.path);
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('✅ Server running on port', PORT);
  console.log('📍 http://localhost:' + PORT);
  console.log('🔐 OAuth routes: /api/auth/google, /api/auth/github');
});
