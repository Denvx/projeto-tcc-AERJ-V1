import { getCurrentUser } from '@/services/authService';
import { isUserAdmin } from '@/services/userService';

export async function authGuard(to, from, next) {
  try {
    const user = await getCurrentUser();
    
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

    if (requiresAuth && !user) {
      return next({ name: 'login' });
    }

    // Autenticado tentando acessar rota de convidado (login/cadastro)
    if (requiresGuest && user) {
      const isAdmin = await isUserAdmin(user.uid);
      return next({ name: isAdmin ? 'dashAdmin' : 'dashAlunos' });
    }

    // Verificar permissões de admin
    if (requiresAdmin && user) {
      const isAdmin = await isUserAdmin(user.uid);
      
      if (!isAdmin) {
        return next({ name: 'dashAlunos' });
      }
    }

    next();
  } catch (error) {
    // Em caso de erro, redirecionar para login por segurança
    next({ name: 'login' });
  }
}