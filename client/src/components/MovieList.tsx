import React from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import "./MovieStyle.css";

const MovieList: React.FC = () => {
  const { movies, loading, error } = useMovies();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des films</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie}/>
        ))}
      </div>
    </div>
  );
};

export default MovieList;