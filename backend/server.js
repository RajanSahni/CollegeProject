// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(express.json());
// // filepath: [server.js](http://_vscodecontentref_/4)
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

// //cors middleware to allow requests from specified origins only and to allow specific headers and methods

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
// }));

// // MongoDB connection - removed deprecated options
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth-app')
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//         console.error('Connection string used:', process.env.MONGO_URI || 'mongodb://localhost:27017/auth-app');
//         process.exit(1); // Exit on connection failure
//     });

// // User model
// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['Student', 'Admin'], // Allowed roles
//         default: 'Student' // Default role
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });

// const User = mongoose.model('User', UserSchema);

// // Auth middleware
// const auth = (req, res, next) => {
//     const token = req.header('x-auth-token');

//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
//         req.user = decoded.user;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// // Register route with enhanced error logging
// app.post('/api/auth/register', async (req, res) => {
//     console.log('Register request received:', { ...req.body, password: '***HIDDEN***' });
//     const { name, email, password, role } = req.body;
    
//     // Validate input
//     if (!name || !email || !password) {
//         console.log('Missing registration fields:', { 
//             name: !!name, 
//             email: !!email, 
//             password: !!password 
//         });
//         return res.status(400).json({ message: 'Please provide all required fields' });
//     }
  
//     try {
//         // Check if user exists
//         console.log(`Checking if user ${email} exists...`);
//         let user = await User.findOne({ email });
//         if (user) {
//             console.log(`User with email ${email} already exists`);
//             return res.status(400).json({ message: 'User already exists' });
//         }
  
//         // Create new user
//         console.log(`Creating new user with email: ${email}`);
//         user = new User({
//             name,
//             email,
//             password,
//             role: role || 'Student' 
//         });
  
//         // Hash password
//         console.log('Hashing password...');
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);
  
//         console.log('Saving user to database...');
//         await user.save();
//         console.log('User saved successfully');
  
//         // Create and return JWT
//         console.log('Creating JWT payload...');
//         const payload = {
//             user: {
//                 id: user.id
//             }
//         };
  
//         console.log('Signing JWT token...');
//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET || 'secret',
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) {
//                     console.error('JWT signing error:', err);
//                     return res.status(500).json({ message: 'Error creating authentication token' });
//                 }
//                 console.log(`User registered successfully: ${email} with ID: ${user.id}`);
//                 res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
//             }
//         );
//     } catch (err) {
//         console.error('Register route error:', err);
      
//         // Log more specific error details based on error type
//         if (err.name === 'ValidationError') {
//             console.error('Mongoose validation error:', err.errors);
//             return res.status(400).json({ 
//                 message: 'Validation error', 
//                 errors: Object.keys(err.errors).reduce((acc, key) => {
//                     acc[key] = err.errors[key].message;
//                     return acc;
//                 }, {})
//             });
//         }
      
//         if (err.code === 11000) {
//             console.error('Duplicate key error:', err);
//             return res.status(400).json({ message: 'This email is already registered' });
//         }
      
//         res.status(500).json({ 
//             message: 'Server error', 
//             error: err.message,
//             stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//         });
//     }
// });



// app.post('/api/auth/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role // Ensure role is included in the payload
//             }
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET || 'secret',
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({
//                     token,
//                     user: {
//                         id: user.id,
//                         name: user.name,
//                         email: user.email,
//                         role: user.role 
//                     }
//                 });
//             }
//         );
//     } catch (err) {
//         console.error('Login route error:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
  
// // Get user data route (protected)
// app.get('/api/auth/user', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// // Function to find an available port
// const findAvailablePort = (startPort) => {
//     return new Promise((resolve, reject) => {
//         const server = require('http').createServer();
//         server.listen(startPort, () => {
//             const port = server.address().port;
//             server.close(() => resolve(port));
//         });
//         server.on('error', () => {
//             // Port is in use, try another
//             resolve(findAvailablePort(startPort + 1));
//         });
//     });
// };

// // Start server with dynamic port allocation
// const startServer = async () => {
//     try {
//         // Try to use the specified port or find an available one
//         const PORT = process.env.PORT || await findAvailablePort(5000);
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     } catch (err) {
//         console.error('Failed to start server:', err);
//         process.exit(1);
//     }
// };

// startServer();










// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const fileUpload = require('express-fileupload');
// require('dotenv').config();

// const app = express();

// // Middleware

// // app.use(cors({
// //     origin: ['http://localhost:3000', 'http://localhost:3001'],
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
// // }));

// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:3001'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: [
//         'Content-Type',
//         'Authorization',
//         'x-auth-token',
//         'x-requested-with'
//     ],
//     credentials: true,
//     preflightContinue: false, // Important for proper preflight handling
//     optionsSuccessStatus: 204 // Some legacy browsers choke on 204
// }));

// app.use(express.json());

// app.use(fileUpload({
//     createParentPath: true, // Auto-create upload directory
//     limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//     abortOnLimit: true // Return error when file size exceeds limit
// }));

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth-app')
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//         process.exit(1);
//     });

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/questions', require('./routes/questionRoutes'));
// app.use('/api/upload', require('./routes/uploadRoutes'));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-auth-token',
    'x-requested-with'
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests for all routes
app.options('*', cors(corsOptions));

// Additional headers middleware for credentials
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, x-auth-token'
  );
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// File upload middleware with enhanced configuration
app.use(fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  abortOnLimit: true,
  useTempFiles: false,
  tempFileDir: '/tmp/',
  safeFileNames: true,
  preserveExtension: true
}));

// MongoDB connection with modern options
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/deploy', require('./routes/deployRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS configured for origins: ${corsOptions.origin.join(', ')}`);
});