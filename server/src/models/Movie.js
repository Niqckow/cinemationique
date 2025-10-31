const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  releaseDate: Date,
  rating: Number,
  genre: [String],
  posterUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);