export interface Movie {
    _id: string;
    title: string;
    description?: string;
    releaseDate?: string;
    rating?: number;
    genre?: string[];
    posterUrl?: string;
}

export interface User {
    token: string
    username: string
    role: string
}