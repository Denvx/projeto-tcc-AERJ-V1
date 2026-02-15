import { REGEX } from './regex';

export function validatePhone(phone) {
  const clean = phone.replace(REGEX.ONLY_NUMBERS, '');
  const isValid = clean.length === 11;

  return {
    isValid,
    value: clean,
    error: phone && !isValid
      ? 'Telefone inválido'
      : ''
  };
}
