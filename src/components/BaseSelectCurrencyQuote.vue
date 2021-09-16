<template>
  <div class="select">
    <label class="select__label" for="selectCurrencyQuote"
      >Currency quote</label
    >
    <select
      class="select__select"
      v-model="currencyQuote"
      name="selectCurrencyQuote"
      id="selectCurrencyQuote"
    >
      <option v-for="currency in CURRENCIES" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
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
  @include flex(center, center, column);
  width: rem(110px);
  &__label {
    color: var(--grey-500);
    font-size: rem(14px);
    font-weight: 300;
  }
  &__select {
    width: 100%;
    border: 0;
    border-radius: rem(10px);
    margin-top: rem(5px);
    padding: rem(5px);
    background-color: #fff;
    box-shadow: 0 0 rem(5px) rem(2px) var(--grey-200);
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
