export function validatePassword(password) {
  const isValid = password && password.length >= 6;

  return {
    isValid,
    error: password && !isValid
      ? 'Senha deve ter no mínimo 6 caracteres'
      : ''
  };
}
