<template>
  <section class="top-crypto">
    <TopCurrenciesTable :currencies="currencies" />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useTopCurrencies } from '@/composables/useTopCurrencies';
import TopCurrenciesTable from '@/components/TopCurrenciesTable.vue';
import { useCurrencyQuote } from '@/composables/useCurrencyQuote';

export default defineComponent({
  name: 'TopCurrencies',
  components: {
    TopCurrenciesTable,
  },
  setup() {
    const { currencies, getTopCurrencies, searchQuery } = useTopCurrencies();
    const { currencyQuote } = useCurrencyQuote();
    onMounted(() => getTopCurrencies(currencyQuote.value));
    return { currencies, searchQuery };
  },
});
</script>
<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;

.top-crypto {
  max-width: 768px;
  margin: auto;
}
</style>
