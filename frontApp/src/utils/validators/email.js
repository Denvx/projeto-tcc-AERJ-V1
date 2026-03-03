import { REGEX } from './regex';

export function validateEmail(email) {
  const isValid = REGEX.EMAIL.test(email);

  return {
    isValid,
    error: email && !isValid ? 'Email inválido' : ''
  };
}
