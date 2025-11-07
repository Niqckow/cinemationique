export const isValidPassword = (password: string, minLength = 8): boolean => {
  if (password.length < minLength) return false;

  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{}|;:',.<>/?~]/.test(password);

  return hasUppercase && hasNumber && hasSpecialChar;
};