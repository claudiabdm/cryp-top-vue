<template>
  <header class="header">
    <div class="header__row">
      <h1 class="header__title header__elem">
        <RouterLink class="header__link" to="/">CrypTop</RouterLink>
      </h1>
      <BaseSelectCurrencyQuote class="header__elem" />
    </div>
    <nav class="header__nav breadcrumbs">
      <RouterLink
        class="breadcrumbs__link"
        to="/"
        exact-active-class="breadcrumbs__link--active"
      >
        Top 10 currencies
      </RouterLink>
      <template v-if="$route.path !== '/'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="breadcrumbs__separator"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <RouterLink
          class="breadcrumbs__link"
          :to="$route.path"
          exact-active-class="breadcrumbs__link--active"
        >
          {{ $route.params.symbol }}
        </RouterLink>
      </template>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseSelectCurrencyQuote from '@/components/BaseSelectCurrencyQuote.vue';
export default defineComponent({
  components: {
    BaseSelectCurrencyQuote,
  },
});
</script>

<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;
.header {
  padding: rem(10px);
  &__row {
    @include flex(center, space-between);
    width: 100%;
    flex-wrap: wrap;
  }
  &__elem {
    margin-bottom: clamp(1rem, 2.5vw, 5vw);
  }
  &__title {
    @include flex(center, flex-start);
    color: var(--primary-dark);
  }
  &__link {
    font-size: clamp(2rem, 2vw, 3vw);
    font-weight: 700;
  }
}
.breadcrumbs {
  @include flex(center, flex-start);
  @include size(100%, rem(18px));
  margin-top: rem(20px);
  font-size: 1rem;
  &__link {
    color: var(--grey-500);
    &--active {
      color: var(--grey-500);
    }
    &:hover:not(.breadcrumbs__link--active) {
      color: var(--secondary);
      text-decoration: underline;
    }
  }

  &__separator {
    @include size(rem(18px), rem(18px));
    margin: 0 rem(10px);
  }
}
</style>
