// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express();

// Set up session and MongoDB store
app.use(session({
  secret: 'stay hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Error handling middleware
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// Export the app instance for use in main.js
module.exports = function (mainWindow) {
  // Start listening on specified port
  const PORT = process.env.PORT || 30210;
  app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
    // Load your Electron app in the main window
    mainWindow.loadURL(`http://localhost:${PORT}`);
  });
};
