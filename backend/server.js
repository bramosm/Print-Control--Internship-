require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Admin = require('./models/adminmodel')
const printRoutes = require('./routes/prints')
const printerRoutes = require('./routes/printers')
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admins')
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWTs
const processLogData = require('./logimport'); // Import the function 

// express app
const app = express()

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/prints',printRoutes)
app.use('/api/printers',printerRoutes)
app.use('/api/users',userRoutes)
app.use('/api/admins',adminRoutes)

const csvFilesDirectory = 'csv_files';


app.get('/getcsv', async (req, res) => {
    const csvFilePath = path.join(__dirname, csvFilesDirectory, 'PrintLogs.csv');
    await processLogData();

    fs.access(csvFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing CSV file:', err);
            res.status(500).json({ error: 'CSV file not found' });
        } else {
            res.download(csvFilePath); // Send the file as a download
        }
    });
});

// Add these endpoints in your server.js file (replace '...' with your actual database logic)
app.get('/api/printers/stats', async (req, res) => {
    try {
      const printerStats = await Printer.find({}); // Fetch all printers with stats
      res.json(printerStats);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching printer stats' });
    }
  });
  
  app.get('/api/users/stats', async (req, res) => {
    try {
      const userStats = await User.find({}); // Fetch all users with stats
      res.json(userStats);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user stats' });
    }
  });

  app.post('/api/admins/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ emailAdmin: email });
      if (!admin) {
        return res.status(404).json({ error: 'No admin found with that email' });
      }
  
      const match = await bcrypt.compare(password, admin.passAdmin);
      if (!match) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
      res.status(200).json({ token }); 
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Error logging in' });
    }
  });
  
  // Example protected route (requires authentication)
  app.get('/api/some-protected-route', authenticateToken, (req, res) => {
    // ... This route can only be accessed if the user has a valid token
  });
  
  // Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401); // Unauthorized
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log(err); // Log any JWT verification errors
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  }

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
    processLogData();
})
})
.catch((error) => {
    console.log(error)
})

// Graceful shutdown (Ctrl+C or process termination)
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection disconnected through app termination');
      process.exit(0);
    });
  });