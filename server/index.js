const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Listing = require('../database/listing');
require('../database/db');

const app = express();
const port = process.env.PORT || 3000;

const distDir = path.join(__dirname, '/../public');

app.use(express.static(distDir));

app.use(bodyParser.json());

app.get('/listing', async (req, res) => {
  const { listingId } = req.query;

  try {
    const listing = await Listing.find({ listingId });
    res.send(listing);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => console.log('Listening on Port:', port));
