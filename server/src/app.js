const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require('dotenv').config();
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/movies', movieRoutes);
app.use("/api/auth", authRoutes);
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));


connectDB();

app.get('/', (req, res) => {
  res.send('API Cinemationique fonctionne !');
});

module.exports = app;