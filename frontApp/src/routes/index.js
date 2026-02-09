import {createRouter, createWebHistory} from 'vue-router';

const routes = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'default',
                component: () => import('@/view/default.vue'),
                children: [
                    {
                        path: 'login',
                        name: 'login',
                        component: () => import('@/view/TheLogin.vue')
                    },
                    {
                        path: 'cadastro',
                        name: 'cadastro',
                        component: () => import('@/view/TheCadastro.vue')
                    }
                ]
            }
        ]
    }
);
export default routes;