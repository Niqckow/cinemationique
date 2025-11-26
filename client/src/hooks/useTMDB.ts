import axios, { type AxiosRequestConfig } from "axios";



const get = async (query: string) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY

    const url = "https://api.themoviedb.org/3/search/movie"

    const config: AxiosRequestConfig = {
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${API_KEY}`
        },
        params: {
            query: query,
            language: "fr-FR"
        }
    }
    console.log(config)
    try {
        const res = await axios(config);
        return res.data;
    } catch (err) {
            let message = "Une erreur est survenue."
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message
            } else if (err instanceof Error) {
                message = err.message;
            }
            throw new Error(message)
        }
}

export default get;