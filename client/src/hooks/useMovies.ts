import { useState, useEffect } from "react";
import { api } from "../api/axios";
import type {Movie} from "../types";

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        console.log(api.getUri())
        const fetchMovies = async() => {
            try {
                const res = await api.get<Movie[]>("/movies");
                setMovies(res.data);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger les films")
            } finally {
                setLoading(false);
            }
        };

        fetchMovies()
    }, [])

    return {movies, loading, error}
}