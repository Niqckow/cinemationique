import React from "react";
import type { Movie } from "../types";
import "./MovieStyle.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} className="poster" />}
      <h2 className="title">{movie.title}</h2>
      <p className="description">{movie.description}</p>
      {movie.rating && <span className="rating">⭐ {movie.rating}</span>}
    </div>
  );
};

export default MovieCard;