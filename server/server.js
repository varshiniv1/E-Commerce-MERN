import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import routes from './routes/index.js';
import passport from 'passport';
import { jwtStrategy } from './middleware/passport.js';
import { handleError, convertToApiError } from './middleware/apiError.js';
import cors from 'cors';

const app = express();
config();

// Middleware setup
app.use(express.json());
app.use(xss()); // Sanitize input data
app.use(mongoSanitize()); // Prevent NoSQL injection

app.use(cors({
  origin: 'http://localhost:3000',  // Allow only your frontend to make requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  // If you're using cookies or authentication
}));

// Passport middleware
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    // Check if MONGO environment variable is defined
    if (!process.env.MONGO) {
      throw new Error('MONGO environment variable is not defined');
    }

    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error
  }
};

// MongoDB connection event listeners
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Start server
const startServer = async () => {
  await connectToMongoDB(); // Wait for the connection to be established
  
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

// Execute the server startup
startServer();
