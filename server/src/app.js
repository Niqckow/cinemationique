const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/movies', movieRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('API Cinemationique fonctionne !');
});

module.exports = app;