<template>
  <header class="header">
    <h1 class="header__title header__elem">
      <RouterLink class="header__title-link" to="/">CrypTop</RouterLink>
    </h1>
    <div class="header__row">
      <nav class="header__nav breadcrumbs header__elem">
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
      <BaseSelectCurrencyQuote class="header__select header__elem" />
    </div>
    <div class="header__row">
      <TheCurrenciesTicker />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseSelectCurrencyQuote from '@/components/BaseSelectCurrencyQuote.vue';
import TheCurrenciesTicker from '@/components/TheCurrenciesTicker.vue';

export default defineComponent({
  components: {
    BaseSelectCurrencyQuote,
    TheCurrenciesTicker,
  },
});
</script>

<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;
.header {
  padding: rem(10px);
  &__row {
    @include flex(flex-start, space-between);
    width: 100%;
    flex-wrap: wrap-reverse;
  }
  &__elem {
    margin-top: clamp(1rem, 2.5vw, 5vw);
  }
  &__title {
    @include flex(center, flex-start);
    color: var(--primary-dark);
  }
  &__title-link {
    font-size: clamp(2.5rem, 2vw, 3vw);
    font-weight: 700;
  }
  &__select {
    margin-right: 0;
    margin-left: auto;
  }
}
.breadcrumbs {
  @include flex(center, flex-start);
  @include size(auto, rem(18px));
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
