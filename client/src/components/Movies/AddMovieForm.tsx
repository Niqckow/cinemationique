import React, { useState, useEffect } from "react";
import get from "../../hooks/useTMDB";

interface MoviePreview {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

const AddMovieForm: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MoviePreview[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MoviePreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await get(query);
        setResults(res.results.slice(0, 10));
      } catch (err) {
        if (err instanceof Error)
            setError("Erreur lors de la recherche");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectMovie = (movie: MoviePreview) => {
    setSelectedMovie(movie);
    setQuery("");
    setResults([]);
  };

  return (
    <div style={{ width: "320px", position: "relative" }}>

      <input
        type="text"
        placeholder="Rechercher un film..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedMovie(null);
        }}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#2A2A2A",
          color: "white",
          border: "1px solid #444",
          borderRadius: "6px",
        }}
      />

      {results.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "48px",
            width: "100%",
            backgroundColor: "#1F1F1F",
            border: "1px solid #333",
            borderRadius: "6px",
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: "250px",
            overflowY: "auto",
            zIndex: 50,
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          }}
        >
          {results.map((movie) => (
            <li
              key={movie.id}
              onClick={() => handleSelectMovie(movie)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #333",
                cursor: "pointer",
                color: "white",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {movie.title}{" "}
              {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
            </li>
          ))}
        </ul>
      )}

      {loading && <p style={{ color: "#aaa" }}>Recherche…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {selectedMovie && (
        <div style={{ marginTop: "20px", color: "white" }}>
          <h2>{selectedMovie.title}</h2>
          <p><strong>Année :</strong> {selectedMovie.release_date}</p>
          <p style={{ color: "#ccc" }}>{selectedMovie.overview}</p>

          {selectedMovie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              style={{ borderRadius: "8px", marginTop: "10px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AddMovieForm;