import { createWebHistory, createRouter } from 'vue-router';
import TopCurrencies from '@/views/TopCurrencies.vue';
import CurrencyDetails from '@/views/CurrencyDetails.vue';

const routes = [
  {
    path: '/',
    name: 'TopCurrencies',
    component: TopCurrencies,
  },
  {
    path: '/currency/:symbol',
    name: 'CurrencyDetails',
    component: CurrencyDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
