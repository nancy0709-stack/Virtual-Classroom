// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const fileRoutes = require('./routes/upload');
const enrollmentRouter = require('./routes/enrollment');
const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth'); // Add authentication routes if needed

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files from uploads directory

// Routes
app.use('/api/files', fileRoutes);
app.use('/api/users', enrollmentRouter);
app.use('/api/classes', searchRouter);
app.use('/api/auth', authRouter); // Authentication routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
