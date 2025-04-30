import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import connectDB from './config/db.js';
// Import routes
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middlewares/error.middleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// Connect to MongoDB
connectDB()


// Define a simple route
app.get('/', (req, res) => {
    res.send('API is running...');
})

// Use routes
app.use('/api/auth', authRoutes);


// Middleware to handle 404 errors
app.use(errorHandler)



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})

