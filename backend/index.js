import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dB/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js';
import emailRoute from './routes/email.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8090;

// Connect to the database
connectDB();

// CORS configuration to allow all origins
const corsOptions = {
  origin: '*', // Allow all origins
  credentials: true, // Allow cookies and credentials
  optionsSuccessStatus: 200,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/email', emailRoute);

// Test routes
app.get('/home', (req, res) => {
  res.json({ msg: 'This is the home page' });
});

app.get('/test', (req, res) => {
  res.send('<html><body><h1>Backend is working!</h1></body></html>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
