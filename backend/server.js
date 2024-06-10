require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Admin = require('./models/adminmodel')
const printRoutes = require('./routes/prints')
const printerRoutes = require('./routes/printers')
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admins')
const serverRoutes = require('./routes/servers')
const Server = require('./models/servermodel')
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
app.use('./api/servers', serverRoutes)

const csvFilesDirectory = 'csv_files';

// Endpoint to fetch server info from the database
// server.js
app.get('/api/servers', async (req, res) => {
  try {
    console.log('Fetching server info from database...');
    const server = await Server.find(); // Exclude _id and __v

    
    if (!server || server.length === 0) { // Check if there's actually server data in the database
      console.error('No server information found in the database.');
      return res.status(404).json({ error: 'No server information found' });
    }

    console.log('Server info found:', server[0]); // Log the fetched data
    res.json(server[0]);
  } catch (error) {
    console.error('Error fetching server info:', error); // Log the error object
    res.status(500).json({ error: 'Error fetching server information' });
  }
});

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

// User CRUD Endpoints

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a new user
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser); // 201 Created
  } catch (error) {
    res.status(400).json({ error: error.message }); // 400 Bad Request
  }
});

// UPDATE a user by ID
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' }); 
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

// DELETE a user by ID
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' }); 
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});


// Printer CRUD Endpoints

// GET all printers
app.get('/api/printers', async (req, res) => {
  try {
    const printers = await Printer.find();
    res.json(printers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a new printer
app.post('/api/printers', async (req, res) => {
  const printer = new Printer(req.body);
  try {
    const savedPrinter = await printer.save();
    res.status(201).json(savedPrinter); 
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

// UPDATE a printer by ID
app.put('/api/printers/:id', async (req, res) => {
  try {
    const updatedPrinter = await Printer.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
    });
    if (!updatedPrinter) {
      return res.status(404).json({ error: 'Printer not found' }); 
    }
    res.json(updatedPrinter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a printer by ID
app.delete('/api/printers/:id', async (req, res) => {
  try {
    const deletedPrinter = await Printer.findByIdAndDelete(req.params.id);
    if (!deletedPrinter) {
      return res.status(404).json({ error: 'Printer not found' });
    }
    res.status(200).json({ message: 'Printer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});


// Admin CRUD Endpoints

// GET all admins
app.get('/api/admins', async (req, res) => {
  try {
    const admins = await Admin.find().select('-passAdmin'); // Exclude password field
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// CREATE a new admin
app.post('/api/admins', async (req, res) => {
  const { nombreAdmin, passAdmin, emailAdmin } = req.body;

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passAdmin, salt);

    const newAdmin = new Admin({
      nombreAdmin,
      emailAdmin,
      passAdmin: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// UPDATE an admin by ID
app.put('/api/admins/:id', async (req, res) => {
  const { nombreAdmin, passAdmin, emailAdmin } = req.body;

  try {
    // Hash the password (only if it's provided)
    let updatedAdminData = { nombreAdmin, emailAdmin };
    if (passAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(passAdmin, salt);
      updatedAdminData.passAdmin = hashedPassword;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updatedAdminData, {
      new: true, 
    });

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE an admin by ID
app.delete('/api/admins/:id', async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
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