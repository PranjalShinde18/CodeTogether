// const express = require('express');
// const cors = require('cors');
// const http = require('http'); // Required to create the server
// const { Server } = require('socket.io'); // Import the Socket.IO server
// const jwt = require('jsonwebtoken'); // For token verification
// const authRoutes = require('./routes/authRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const Project = require('./models/Project'); // Adjust the path as necessary
// require('dotenv').config();

// const app = express();

// // Use CORS middleware to allow requests from different origins
// app.use(cors()); // This will allow all origins by default

// // Connect Database
// const db = require('./config/db.js');

// // Init Middleware
// app.use(express.json({ extended: false }));

// // Define Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);

// // Create an HTTP server
// const server = http.createServer(app);

// // Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Allow all origins for simplicity. Adjust this as needed.
//   },
// });

// // Socket.IO authentication middleware
// io.use((socket, next) => {
//   const token = socket.handshake.query.token;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) return next(new Error('Authentication error'));
//       socket.user = decoded;
//       next();
//     });
//   } else {
//     next(new Error('Authentication error'));
//   }
// });

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('joinProject', async (projectId) => {
//     socket.join(projectId);
//     const project = await Project.findById(projectId);
//     if (project) {
//       socket.emit('codeUpdate', project.code); // Send the initial code to the client
//     }
//   });

//   socket.on('codeChange', async (newCode) => {
//     const projectId = socket.handshake.query.projectId;
//     io.in(projectId).emit('codeUpdate', newCode);
//     await Project.findByIdAndUpdate(projectId, { code: newCode }); // Save the code to the database
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// Import necessary modules
const express = require('express');
const cors = require('cors');
const http = require('http'); // Required to create the server
const { Server } = require('socket.io'); // Import the Socket.IO server
const jwt = require('jsonwebtoken'); // For token verification
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const Project = require('./models/Project'); // Adjust the path as necessary
require('dotenv').config();

const app = express();

// Use CORS middleware to allow requests from different origins
app.use(cors()); // This will allow all origins by default

// Connect Database
const db = require('./config/db.js');

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity. Adjust this as needed.
  },
});

// Socket.IO authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.user = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinProject', async (projectId) => {
    if (!projectId) {
      console.error('No projectId provided');
      return;
    }

    socket.join(projectId);
    try {
      const project = await Project.findById(projectId);
      if (project) {
        socket.emit('codeUpdate', project.code); // Send the initial code to the client
      } else {
        console.error('Project not found');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  });

  socket.on('codeChange', async ({ projectId, code }) => {
    if (!projectId || typeof code !== 'string') {
      console.error('Invalid projectId or code');
      return;
    }

    io.in(projectId).emit('codeUpdate', code);
    try {
      await Project.findByIdAndUpdate(projectId, { code: code }); // Save the code to the database
    } catch (error) {
      console.error('Error updating code:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
