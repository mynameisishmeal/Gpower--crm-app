var express = require('express');
var dotenv = require('dotenv').config();
var ejs = require('ejs');
var path = require('path');
var fs = require('fs'); 
var https = require('https'); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cors = require('cors');
var { platform } = require('os');
var { exec, spawn } = require('child_process');
var app = express();

// Platform detection to set the path for Chrome
const WINDOWS_PLATFORM = 'win32';
const osPlatform = platform();

// Path to Chrome executable
const chromePath = {
  win32: '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"', 
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  linux: 'google-chrome' 
}[osPlatform] || 'chrome';

// MongoDB connection
mongoose.connect(process.env.mpdb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    const PORT = process.env.PORT || 30120;
    const url = "https://127.0.0.1:" + PORT;

    if (url === undefined) {
      console.error('Please enter a URL, e.g. "https://www.opencanvas.co.uk"');
      process.exit(0);
    }

    // HTTPS server setup
    const options = {
      key: fs.readFileSync(path.join(__dirname, 'Local.key')),  
      cert: fs.readFileSync(path.join(__dirname, 'Local.crt')), 
    };

    const server = https.createServer(options, app).listen(PORT, function () {
      console.log('Server is started on https://127.0.0.1:' + PORT);

      // Try to open the URL in Chrome after server starts
      const chromeProcess = spawn(chromePath, [`--new-window`, url]);

      chromeProcess.on('error', (err) => {
        console.error('Failed to start Chrome:', err);
      });

      console.log('MongoDB Connection Succeeded.');
    });

    // Listen for termination signals (e.g., Ctrl+C)
    process.on('SIGINT', () => {
      console.log('Closing server and Chrome...');
      // Kill Chrome process if it is running
      exec('taskkill /F /IM chrome.exe', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error killing Chrome: ${err}`);
          console.error(stderr);
        } else {
          console.log('Chrome closed.');
        }
      });

      server.close(() => {
        console.log('HTTPS server closed.');
        process.exit(0);
      });
    });
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});

app.use(cors());

app.use(session({
  secret: 'stay hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
app.use('/', index);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});
