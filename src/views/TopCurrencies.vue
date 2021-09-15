<template>
  <h1 class="top-crypto__title">Top Crypto</h1>
  <!-- <input
    v-model.trim="searchQuery"
    class="top-crypto__search"
    type="search"
    aria-label="Search for crypto currency"
    placeholder="Search for crypto currency"
  /> -->
  <div>
    <TopCurrenciesTable :currencies="currencies" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useTopCurrencies } from '@/composables/useTopCurrencies';
import TopCurrenciesTable from '@/components/TopCurrenciesTable.vue';

export default defineComponent({
  name: 'TopCurrencies',
  components: {
    TopCurrenciesTable,
  },
  setup() {
    const { currencies, getTopCurrencies, searchQuery } = useTopCurrencies();
    onMounted(getTopCurrencies);
    return { currencies, searchQuery };
  },
});
</script>
<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;

.top-crypto {
  &__title {
    color: var(--primary-dark);
    margin-bottom: clamp(1rem, 2.5vw, 5vw);
    font-size: clamp(2rem, 4vw, 5vw);
    font-weight: 700;
  }
}
</style>
