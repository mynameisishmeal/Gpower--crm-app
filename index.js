var express = require('express');
var dotenv = require('dotenv').config();
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cors = require('cors');
var http = require('http');

var app = express();

// MongoDB connection
mongoose.connect(process.env.mpdb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.error('Error in DB connection: ' + err);
    process.exit(1);
  }

  const PORT = process.env.PORT || 30120;

  // HTTP server (Nginx will handle HTTPS)
  const server = http.createServer(app).listen(PORT, '0.0.0.0', function () {
    console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
    console.log(`🌍 Accessible via public IP or domain if firewall/DNS is configured`);
    console.log(`📡 MongoDB Connection Succeeded.`);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('🛑 Shutting down server...');
    server.close(() => {
      console.log('✅ HTTP server closed.');
      process.exit(0);
    });
  });
});

// Middleware
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, 'views')));

// Routes
var index = require('./routes/index');
app.use('/', index);

// 404 handler
app.use(function (req, res, next) {
  res.status(404).send('File Not Found');
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message);
});
