import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import dns from 'node:dns';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import ownerApplicationRoutes from './routes/ownerApplicationRoutes.js';

dns.setServers(['1.1.1.1', '1.0.0.1']);
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/owner-applications', ownerApplicationRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});