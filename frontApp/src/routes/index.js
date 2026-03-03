import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@/utils/navigationGuards';

const routes = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/view/default.vue'),
    redirect: { name: 'login' },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/view/TheLogin.vue'),
        meta: { requiresGuest: true }
      },
      {
        path: 'cadastro',
        name: 'cadastro',
        component: () => import('@/view/TheCadastro.vue'),
        meta: { requiresGuest: true }
      },
      {
        path: 'completaCadastro',
        name: 'completarCadastro',
        component: () => import('@/view/CompletarCadastro.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'dashAlunos',
        name: 'dashAlunos',
        component: () => import('@/view/dashAlunos.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'AlunosViagens',
        name: 'AlunosViagens',
        component: () => import('@/view/Viagens.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'AlunosPerfil',
        name: 'AlunosPerfil',
        component: () => import('@/view/Perfil.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'Configuracoes',
        name: 'Configuracoes',
        component: () => import('@/view/Configuracoes.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'dashAdmin',
        name: 'dashAdmin',
        component: () => import('@/view/dashAdmin.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      }/*,
      {
        path: 'dashDev',
        name: 'dashDev',
        component: () => import('@/view/dashDev.vue'),
        meta: { requiresAuth: true, requiresDev: true }
      }*/
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: { name: 'login' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(authGuard);

export default router;