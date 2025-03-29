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










const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth-app')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));