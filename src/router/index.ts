import {
  createWebHistory,
  createRouter,
  RouteLocation,
  NavigationGuardNext,
} from 'vue-router';
import TopCurrencies from '@/views/TopCurrencies.vue';
import CurrencyDetails from '@/views/CurrencyDetails.vue';

const routes = [
  {
    path: '/',
    name: 'TopCurrencies',
    component: TopCurrencies,
  },
  {
    path: '/currencies/:symbol',
    name: 'CurrencyDetails',
    component: CurrencyDetails,
    beforeEnter: upperCaseParamSymbol,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

function upperCaseParamSymbol(
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext
) {
  if (
    to.name == 'CurrencyDetails' &&
    !Array.isArray(to.params.symbol) &&
    to.params.symbol !== to.params.symbol.toUpperCase()
  ) {
    next({
      name: 'CurrencyDetails',
      params: { symbol: to.params.symbol.toUpperCase() },
    });
  } else {
    next();
  }
}
