require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const printRoutes = require('./routes/prints')
const printerRoutes = require('./routes/printers')
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admins')
const path = require('path');
const fs = require('fs');
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