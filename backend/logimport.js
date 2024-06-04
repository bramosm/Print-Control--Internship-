const fs = require('fs');
const Print = require('./models/printmodel');
const mongoose = require('mongoose');
const path = require('path');

// ... (your Mongoose schema for print logs - PrintLogModel) ...

const sharedFolderPath = 'C:/Users/Brian/Desktop/Shared';
const logFileName = 'PrintLogs.json';

async function processLogData() {
  try {
      // 1. Read and Clean JSON Data:
      const logFilePath = path.join(sharedFolderPath, logFileName);
      let logDataRaw = fs.readFileSync(logFilePath, 'utf-8');

      logDataRaw = logDataRaw.trim();
      if (!logDataRaw.startsWith('[')) {
          logDataRaw = '[' + logDataRaw + ']'; 
      }

      const logData = JSON.parse(logDataRaw);

      // 2. Connect to MongoDB
      await mongoose.connect('mongodb://localhost:27017/pcdb', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });

      // 3. Filter Out Existing Entries
      const existingEntries = await Print.find({
          nombreDocumento: { $in: logData.map(entry => entry.nombreDocumento) },
          fechaImpresion: { $in: logData.map(entry => entry.fechaImpresion) }
      });

      const existingDocumentNames = existingEntries.map(entry => entry.nombreDocumento);
      const existingDates = existingEntries.map(entry => entry.fechaImpresion);
      const newLogData = logData.filter(entry => {
          return !(existingDocumentNames.includes(entry.nombreDocumento) && existingDates.includes(entry.fechaImpresion));
      });

      // Map log data to match the Mongoose schema
      if (newLogData.length > 0) {
        const formattedLogData = newLogData.map(entry => ({
        nombreDocumento: entry.nombreDocumento,
        nombreUsuario: entry.nombreUsuario,
        nombreCliente: entry.nombreCliente,
        nombreImpresora: entry.nombreImpresora,
        fechaImpresion: entry.fechaImpresion,
        // cantidadHojas: entry.cantidadHojas, // (Optional, since it's not required)
      }));
  
      // Insert log data into MongoDB
      const result = await Print.insertMany(formattedLogData);
      console.log(`Inserted ${result.length} new log entries into MongoDB`);
  } else {
      console.log('No new log entries to insert.');
  }
  
      // Close the MongoDB connection
      mongoose.connection.close();
    } catch (error) {
      console.error('Error processing log data:', error);
      if (error instanceof SyntaxError) {
        // Specific handling for JSON syntax errors
        console.error('Invalid JSON format in log file. Please check the file contents.');
        // Potentially send an alert, log a more detailed error message, etc.
    } 
      // Handle errors appropriately (log to file, etc.)
    }
  }
  
  // Run the function periodically (e.g., every minute)
  setInterval(processLogData, 60000);  //60000 milliseconds = 1 minute