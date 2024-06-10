require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/adminmodel'); // Make sure the path is correct

const saltRounds = 10; // Or adjust to your preferred number of salt rounds

async function hashAdminPasswords() {
  try {
    // Connect to MongoDB before performing any operations
    await mongoose.connect(process.env.MONGO_URI); 
    console.log('Connected to MongoDB');

    const admins = await Admin.find({});
    for (const admin of admins) {
      const hashedPassword = await bcrypt.hash(admin.passAdmin, saltRounds);
      admin.passAdmin = hashedPassword;
      await admin.save();
    }

    console.log('Passwords hashed successfully');
    mongoose.connection.close(); // Close the connection when done
  } catch (error) {
    console.error('Error hashing passwords:', error);
    mongoose.connection.close();
  }
}

hashAdminPasswords();

