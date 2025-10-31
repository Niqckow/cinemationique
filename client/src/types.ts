export interface Movie {
    _id: string;
    title: string;
    description?: string;
    releaseDate?: string;
    rating?: number;
    genre?: string[];
    posterUrl?: string;
}