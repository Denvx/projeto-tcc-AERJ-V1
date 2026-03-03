import { validateEmail } from './email';
import { validatePassword } from './password';

export function validateLoginForm({ email, password }) {
  const emailResult = validateEmail(email);
  const passwordResult = validatePassword(password);

  return {
    isValid: emailResult.isValid && passwordResult.isValid,
    errors: {
      email: emailResult.error || (!email ? 'Email é obrigatório' : ''),
      password: passwordResult.error || (!password ? 'Senha é obrigatória' : '')
    }
  };
}
