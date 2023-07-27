// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW
const API_KEY = 'pHum41of9t_0mI3OfMC6qt42Jqk5jUCO';
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData',async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    const { symbol, date } = req.body;
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${date}/${date}?&apiKey=${API_KEY}`
      );
      const data = await response.data ;
    //   console.log(data)
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching datas.' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));