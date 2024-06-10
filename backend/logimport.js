const fs = require('fs');
const Print = require('./models/printmodel');
const Printer = require('./models/printermodel'); 
const User = require('./models/usermodel');
const Server = require('./models/servermodel')
const mongoose = require('mongoose');
const path = require('path');
const JSFtp = require("jsftp"); //
const Papa = require('papaparse'); // Add PapaParse for CSV parsing

// FTP Configuration

const ftpConfig = {
  host: '192.168.56.56',
  port: 21,  
  user: 'theeye',
  pass: 's0ns0fl1b3rt1!',
  useList: true
  };
  
  const logFileName = 'PrintLogs.json';
  const csvFilesDirectory = 'csv_files';

async function processLogData() {
  const ftp = new JSFtp(ftpConfig);
  
  try {
    // Log all FTP commands
    ftp.on('command', console.log);

   // Authenticate (Promisified)
   await new Promise((resolve, reject) => {
    ftp.auth(ftpConfig.user, ftpConfig.pass, err => {
      if (err) reject(err);
      else resolve();
    });
  });
  console.log("Authenticated successfully!");
    // Fetch and Process JSON Log File
    const logDataBuffer = await new Promise((resolve, reject) => {
      ftp.get(logFileName, (err, socket) => {
        if (err) {
          console.error('Error getting log file:', err);
          reject(err);
          return;
        }
        let fileData = '';
        socket.on('data', (d) => (fileData += d.toString()));
        socket.on('close', (hadErr) => (hadErr ? reject(hadErr) : resolve(fileData)));
        socket.resume();
      });
    });

    // 1. Read and Clean JSON Data:
    let logDataRaw = logDataBuffer.trim();
    if (!logDataRaw.startsWith('[')) {
      logDataRaw = '[' + logDataRaw + ']'; 
    }

    let logData = [];
    try {
      logData = JSON.parse(logDataRaw);
    } catch (parseError) {
      console.error('Error parsing JSON log data:', parseError);
      // Handle the error, e.g., log more details, send an alert, etc.
      return; // Exit the function if parsing fails
    }
    
    //Check log data before using Object.keys
    if(logData.length === 0){
      console.log("Empty log file, skipping MongoDB operations");
    } else{

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
  paginasImpresas: entry.paginasImpresas,
  }));

  // Insert log data into MongoDB
  const result = await Print.insertMany(formattedLogData);
  console.log(`Inserted ${result.length} new log entries into MongoDB`);
  } else {
  console.log('No new log entries to insert.');
  }
}

// 6. Fetch and Process Users Data
try {
  const usersDataBuffer = await new Promise((resolve, reject) => {
    ftp.get('DomainUsers.json', (err, socket) => {
      if (err) reject(err);
      let fileData = '';
      socket.on('data', (d) => (fileData += d.toString()));
      socket.on('close', (hadErr) =>
        hadErr ? reject(hadErr) : resolve(fileData)
      );
      socket.resume();
    });
  });

  // Handle potentially invalid JSON
  let usersData = [];
  try {
    // Remove trailing commas, newlines, AND extra spaces at the beginning
    let cleanUsersDataBuffer = usersDataBuffer.replace(/^[\s\r\n]+/, '');
    cleanUsersDataBuffer = cleanUsersDataBuffer.replace(/,\s*$/, '');
    cleanUsersDataBuffer = cleanUsersDataBuffer.replace(/[\n\r]+/g, '');
    usersData = JSON.parse(cleanUsersDataBuffer);
  } catch (parseError) {
    console.error('Error parsing DomainUsers.json:', parseError);
    return; 
  }

  // Update/Insert Users in MongoDB 
  for (let userData of usersData) { // Use let here to declare a new variable for each user
    const updatedUserData = { ...userData };  

    await User.updateOne(
      { nombreUsuario: updatedUserData.nombreUsuario }, 
      updatedUserData, 
      { upsert: true } 
    );
  }
  console.log('Users data updated/inserted successfully');
} catch (err) {
  console.error('Error fetching or processing user data:', err);
}

// 7. Fetch and Process Printers Data
try {
  const printersDataBuffer = await new Promise((resolve, reject) => {
    ftp.get('InstalledPrinters.json', (err, socket) => {
      if (err) reject(err);
      let fileData = '';
      socket.on('data', (d) => (fileData += d.toString()));
      socket.on('close', (hadErr) =>
        hadErr ? reject(hadErr) : resolve(fileData)
      );
      socket.resume();
    });
  });

  // Handle potentially invalid JSON
  let printersData = [];
  try {
    // Remove trailing commas, newlines, and extra spaces at the beginning
    let cleanPrintersDataBuffer = printersDataBuffer.replace(/^[\s\r\n]+/, '');
    cleanPrintersDataBuffer = cleanPrintersDataBuffer.replace(/,\s*$/, '');
    cleanPrintersDataBuffer = cleanPrintersDataBuffer.replace(/[\n\r]+/g, '');
    printersData = JSON.parse(cleanPrintersDataBuffer);
  } catch (parseError) {
    console.error('Error parsing InstalledPrinters.json:', parseError);
    return;
  }

  // Update/Insert Printers in MongoDB
  for (let printerData of printersData) { // Use 'let' here
    const updatedPrinterData = { ...printerData }; // Create a copy

    await Printer.updateOne(
      { nombreImpresora: updatedPrinterData.nombreImpresora },
      updatedPrinterData, 
      { upsert: true }
    );
  }
  console.log('Printers data updated/inserted successfully');
} catch (err) {
  console.error('Error fetching or processing printer data:', err);
}

    // 8. Fetch and Process Server Information
    try {
      const serverInfoBuffer = await new Promise((resolve, reject) => {
        ftp.get('ServerInfo.json', (err, socket) => {
          if (err) reject(err);
          let fileData = '';
          socket.on('data', (d) => (fileData += d.toString()));
          socket.on('close', (hadErr) => hadErr ? reject(hadErr) : resolve(fileData));
          socket.resume();
        });
      });

      // Handle potentially invalid JSON
      let serverInfoData = [];
      try {
        // Remove trailing commas, newlines, and extra spaces at the beginning or end
        let cleanServerInfoBuffer = serverInfoBuffer.trim(); // Trim whitespace
        cleanServerInfoBuffer = cleanServerInfoBuffer.replace(/,\s*$/, ''); // Trailing commas
        cleanServerInfoBuffer = cleanServerInfoBuffer.replace(/[\n\r]+/g, ''); // Newlines
        serverInfoData = JSON.parse(cleanServerInfoBuffer);
      } catch (parseError) {
        console.error('Error parsing ServerInfo.json:', parseError, cleanServerInfoBuffer); // Log the error and the cleaned buffer
        return; 
      }

      // Update/Insert Server Information in MongoDB
      if (serverInfoData && Object.keys(serverInfoData).length > 0) { // Check if the object is not empty
        await Server.updateOne(
          { nombreServidor: serverInfoData.nombreServidor },
          serverInfoData,
          { upsert: true }
        );
      } else {
        console.warn('ServerInfo.json is empty or invalid.');
      }

      console.log('Server info updated/inserted successfully');

    } catch (err) {
      console.error('Error fetching or processing server info:', err);
    }


 // Fetch and Process CSV File (Directly)
 try {
  const csvDataBuffer = await new Promise((resolve, reject) => {
    ftp.get('PrintLogs.csv', (err, socket) => { // Directly fetch PrintLogs.csv
      if (err) {
        console.error('Error getting CSV file:', err);
        reject(err);
      } else {
        let fileData = '';
        socket.on('data', (d) => (fileData += d.toString()));
        socket.on('close', (hadErr) => (hadErr ? reject(hadErr) : resolve(fileData)));
        socket.resume();
      }
    });
  });

  // Parse CSV Data and Save Locally
  Papa.parse(csvDataBuffer, {
    header: true,
    complete: (results) => {
      const csvData = results.data;
      console.log("Parsed CSV data:", csvData);

      if (csvData.length > 0) {
        const csvString = Papa.unparse(csvData);
        const localFilePath = path.join(__dirname, csvFilesDirectory, 'PrintLogs.csv'); // Save with original name
        fs.writeFileSync(localFilePath, csvString);
        console.log(`CSV file PrintLogs.csv parsed and saved locally`);
      } else {
        console.warn('CSV file is empty.');
      }
    },
    error: (err) => {
      console.error('Error parsing CSV:', err.message);
    },
  });

   

} catch (error) {
  console.error('Error processing FTP data:', error);
  if (error.code === 530) { 
    console.error('Please check your FTP credentials or server configuration.');
  }
} finally {
  ftp.raw('quit'); 
 // mongoose.connection.close(); // Move to the end after everything is done
  
}
} catch (error) {
  console.error('Forfeit your soul:', error);
  if (error.code === 530) { 
    console.error('Pray');
  }
}
}

module.exports = processLogData;
