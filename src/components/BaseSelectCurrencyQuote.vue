<template>
  <select
    class="select"
    v-model="currencyQuote"
    name="selectCurrencyQuote"
    id="selectCurrencyQuote"
  >
    <option v-for="currency in CURRENCIES" :key="currency" :value="currency">
      {{ currency }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCurrencyQuote } from '@/composables/useCurrencyQuote';

export default defineComponent({
  setup() {
    const { currencyQuote, CURRENCIES } = useCurrencyQuote();
    return { currencyQuote, CURRENCIES };
  },
});
</script>

<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;
.select {
  border: 0;
  border-radius: rem(10px);
  padding: rem(5px);
  background-color: #fff;
  box-shadow: 0 0 rem(5px) rem(2px) var(--grey-200);
  &:hover {
    cursor: pointer;
  }
}
</style>
