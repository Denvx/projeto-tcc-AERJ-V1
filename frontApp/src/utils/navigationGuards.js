import { getCurrentUser }        from '@/services/authService';
import { isUserAdmin, isUserDev } from '@/services/userService';

// ── Loading global ────────────────────────────────────────────────
// Cria um overlay de loading no body enquanto o guard processa
function showLoading() {
  if (document.getElementById('route-loading')) return
  const el = document.createElement('div')
  el.id = 'route-loading'
  el.innerHTML = `
    <div style="
      position: fixed; inset: 0;
      background: #080d1a;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      z-index: 9999;
    ">
      <div style="
        width: 40px; height: 40px;
        border: 3px solid rgba(255,255,255,0.1);
        border-top-color: #198754;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      "></div>
      <p style="color: #6c757d; font-family: sans-serif; font-size: 13px; margin-top: 16px;">
        Carregando...
      </p>
    </div>
    <style>
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
  `
  document.body.appendChild(el)
}

function hideLoading() {
  const el = document.getElementById('route-loading')
  if (el) el.remove()
}

// ── Guard principal ───────────────────────────────────────────────
export async function authGuard(to, from, next) {
  showLoading()

  try {
    const user = await getCurrentUser()

    const requiresAuth  = to.matched.some(r => r.meta.requiresAuth)
    const requiresGuest = to.matched.some(r => r.meta.requiresGuest)
    const requiresAdmin = to.matched.some(r => r.meta.requiresAdmin)
    const requiresDev   = to.matched.some(r => r.meta.requiresDev)

    // Rota protegida sem usuário logado → login
    if (requiresAuth && !user) {
      return next({ name: 'login' })
    }

    // Usuário logado tentando acessar rota de convidado → redireciona para o dash certo
    if (requiresGuest && user) {
      const [isAdmin, isDev] = await Promise.all([
        isUserAdmin(user.uid),
        isUserDev(user.uid),
      ])

      if (isDev)   return next({ name: 'dashDev' })    // futura rota de dev
      if (isAdmin) return next({ name: 'dashAdmin' })
      return next({ name: 'dashAlunos' })
    }

    // Rota exclusiva de admin
    if (requiresAdmin && user) {
      const isAdmin = await isUserAdmin(user.uid)
      if (!isAdmin) return next({ name: 'dashAlunos' })
    }

    // Rota exclusiva de dev (futura)
    if (requiresDev && user) {
      const isDev = await isUserDev(user.uid)
      if (!isDev) return next({ name: 'dashAlunos' })
    }

    next()

  } catch (error) {
    console.error('[authGuard] Erro:', error)
    next({ name: 'login' })
  } finally {
    hideLoading()
  }
}