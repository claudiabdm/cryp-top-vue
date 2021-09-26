<template>
  <section :class="['currency', { loading: currency == null }]">
    <template v-if="currency">
      <template v-if="currency !== 'Not found'">
        <div class="currency__row">
          <h2 class="currency__elem currency__header">
            <img :src="currency.logo" alt="" srcset="" width="34" height="34" />
            <div class="currency__header-text">
              <span>{{ currency.fullName }} Price</span>
              <span class="currency__symbol">{{ currency.name }} </span>
            </div>
          </h2>
          <div class="currency__elem currency__price">
            {{ currency.price }}
            <span
              :class="[
                'currency__change',
                {
                  up: !currency.change24hDisplay.includes('-'),
                  down: currency.change24hDisplay.includes('-'),
                },
              ]"
            >
              {{ currency.change24hDisplay }}
            </span>
          </div>
        </div>
        <div class="currency__chart currency__elem">
          <CurrencyDetailsChart />
        </div>
        <CurrencyDetailsHistoTable
          class="currency__elem"
          :currencyName="currency.fullName"
          :currencySymbol="currency.name"
        />
      </template>
      <template v-else>
        <div>Currency not found in Top 10 cryptocurrencies.</div>
      </template>
    </template>
    <template v-else>
      <BaseLoadingSpinner class="currency__spinner" />
    </template>
  </section>
</template>

<script lang="ts">
import { useTopCurrencies } from '@/composables/useTopCurrencies';
import { computed, defineAsyncComponent, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import BaseLoadingSpinner from '@/components/BaseLoadingSpinner.vue';
import CurrencyDetailsHistoTable from '@/components/CurrencyDetailsHistoTable.vue';

export default defineComponent({
  name: 'CurrencyDetails',
  components: {
    BaseLoadingSpinner,
    CurrencyDetailsChart: defineAsyncComponent(
      () => import('@/components/CurrencyDetailsChart.vue')
    ),
    CurrencyDetailsHistoTable,
  },
  setup() {
    const { currencies } = useTopCurrencies();
    const route = useRoute();

    const currency = computed(() => {
      if (currencies.value !== null) {
        return (
          currencies.value.find(
            (currency) => currency.name === route.params.symbol
          ) || 'Not found'
        );
      }
      return null;
    });
    return { currency };
  },
});
</script>

<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;
.currency {
  @include flex(center, center, column);
  flex-wrap: wrap;
  margin: rem(10px);
  border-radius: rem(10px);

  &__elem {
    margin: 2vw 0;
  }
  &__row {
    @include flex(center, space-between);
    width: 100%;
    &--center {
      justify-content: center;
    }
  }
  &__header {
    @include flex(center, flex-start);
    font-size: clamp(1rem, 3vw, 4vw);
    font-weight: 700;
  }
  &__header-text {
    margin-left: 1.5vw;
  }
  &__symbol {
    margin-left: 0.25em;
    font-size: 0.5em;
    align-self: flex-end;
    color: var(--grey-500);
  }
  &__price {
    @include flex(center, flex-start);
    font-size: clamp(1rem, 1.5vw, 2vw);
    white-space: nowrap;
  }
  &__change {
    margin-left: 0.5em;
    border-radius: rem(10px);
    padding: 0.5em;
    color: #fff;
    background-color: var(--secondary);
    font-size: 0.75em;
  }
  &__chart {
    width: 100%;
    min-height: rem(200px);
    @media screen and (min-width: 728px) {
      min-height: rem(450px);
    }
  }
}

.up {
  background-color: var(--secondary);
}
.down {
  background-color: var(--tertiary);
}
</style>
