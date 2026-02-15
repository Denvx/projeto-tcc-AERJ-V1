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
        path: 'dashAlunos',
        name: 'dashAlunos',
        component: () => import('@/view/dashAlunos.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'dashAdmin',
        name: 'dashAdmin',
        component: () => import('@/view/dashAdmin.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      }
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