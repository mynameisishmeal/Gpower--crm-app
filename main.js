

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressApp = require('./app'); // Import your Express.js app instance




const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');



// Connect to MongoDB using mongoose
mongoose.connect(process.env.mfvposdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB Connected');
  }).catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Path to preload script
      contextIsolation: true, // Enable context isolation
      // Other webPreferences as needed
    }
  });


  mainWindow.loadURL(`http://localhost:${30210}`);

  // Handle window closed event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Handle app ready event
app.on('ready', createWindow);

// Handle app window all closed event
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app activate event
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
