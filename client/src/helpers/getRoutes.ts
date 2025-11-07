const getAuthRoute = () : string => {
    return import.meta.env.VITE_API_URL + "/api/auth"
}

export default getAuthRoute