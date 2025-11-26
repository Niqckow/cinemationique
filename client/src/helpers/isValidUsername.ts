const isValidUsername = (username: string): string | boolean => {
    if (!username) {
        return "Le nom d'utilisateur ne peut pas être vide."
    }
    if (username.length < 3) {
        return "Le nom d'utilisateur doit contenir au moins 3 caractères."
    }
    return true
}

export default isValidUsername