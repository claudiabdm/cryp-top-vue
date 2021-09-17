<template>
  <section class="top-crypto">
    <TopCurrenciesTable :currencies="currencies" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTopCurrencies } from '@/composables/useTopCurrencies';
import TopCurrenciesTable from '@/components/TopCurrenciesTable.vue';

export default defineComponent({
  name: 'TopCurrencies',
  components: {
    TopCurrenciesTable,
  },
  setup() {
    const { currencies, searchQuery } = useTopCurrencies();
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
