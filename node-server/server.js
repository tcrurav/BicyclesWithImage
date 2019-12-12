// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var path = require('path');

dotenv.config();

var bicycleRouter = require('./routes/bicycles');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Connect to MongoDB
// Configure .env with example: MONGODB_URL='mongodb://localhost:27017/bicyclebl'
mongoose.connect(process.env.MONGODB_URL, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true, });

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

router.use('/bicycles', bicycleRouter);

// Register all our routes with /api
app.use('/api', router);

// public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port);
console.log('Listening on http://localhost: ' + port);