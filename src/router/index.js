import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: 'layout-subpage',
    component: () => import('@/layouts/layout-subpage.vue'),
    children: [
      {
        path: '/form-builder',
        name: 'form-builder',
        component: () => import('@/views/FormBuilder.vue'),
      },
      {
        path: '/websocket',
        name: 'websocket',
        component: () => import('@/views/Websocket.vue'),
      },
    ],
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
