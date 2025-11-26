export const isValidPassword = (password: string, minLength = 8): string | boolean => {
  if (password.length < minLength) return `Le mot de passe doit contenir au moins ${minLength} caractères.`;

  const hasUppercase = /[A-Z]/.test(password);
  if (!hasUppercase) return "Le mot de passe doit contenir au moins une lettre majuscule.";
  const hasNumber = /[0-9]/.test(password);
  if (!hasNumber) return "Le mot de passe doit contenir au moins un chiffre.";
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{}|;:',.<>/?~]/.test(password);
  if (!hasSpecialChar) return "Le mot de passe doit contenir au moins un caractère spécial.";

  return true;
};