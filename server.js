// Init project
const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const isUrl = require("is-valid-http-url");
const shortid = require('shortid');
const cors = require('cors');
require('dotenv').config();

// Basic configuration
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS to make API remotely testable by freeCodeCamp
app.use(cors());

// Body parser: parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Static files
app.use('/public', express.static(`${process.cwd()}/public`));

// Basic routing
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// MongoDB & Mongoose: connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schema & model
const urlShortenerSchema = new mongoose.Schema({
  original_url: String,
  short_url: String,
});
const urlModel = mongoose.model('URL', urlShortenerSchema);

// POST requests
app.post('/api/shorturl', (req, res) => {

  // Check if URL is valid
  if (isUrl(req.body.url)) {

    // Check if URL is already on database
    urlModel.find({ original_url: req.body.url }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        // If URL is not on database we should save it
        if (docs.length === 0) {
          const urlShortened = shortid.generate(); // Generate unique ID to new URL
          let newURL = new urlModel({
            original_url: req.body.url,
            short_url: urlShortened
          });
          newURL.save((err, docs) => {
            if (err) {
              console.error(err);
            } else {
              res.json({
                original_url: newURL.original_url,
                short_url: newURL.short_url
              });
            };
          });
        // If URL is already on databse we just have to return a JSON
        } else {
          res.json({
            original_url: docs[0].original_url,
            short_url: docs[0].short_url
          });
        };
      };
    });

  // If URL is not valid
  } else {
    res.json({
      error: "Invalid URL"
    });
  };
});

// GET requests
app.get('/api/shorturl/:shortURL?', (req, res) => {

  // Check if shortURL exists on database
  urlModel.find({ short_url: req.params.shortURL }, (err, docs) => {
    if (err) {
      console.log(err);
    } else if (docs.length === 0) {
      res.status(404).json("URL not found");
    } else {
      res.redirect(docs[0].original_url)
    };
  });
});

// Listen for requests
app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});
