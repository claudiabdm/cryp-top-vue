<template>
  <BaseTicker :list="currenciesArray" :speed="250">
    <template v-slot:tickerContent="{ elem }">
      <RouterLink :to="`/currencies/${elem.name}`" class="curr-ticker__elem">
        <img :src="elem.logo" alt="" srcset="" width="24" height="24" />
        <span class="curr-ticker__name">{{ elem.name }} </span>
        <span>
          {{
            elem.price ? elem.price.toFixed(2).toLocaleString() : 'N/A'
          }}</span
        >
        <svg
          width="18"
          height="18"
          class="curr-ticker__icon"
          :class="[`curr-ticker__icon--${elem.flag}`]"
        >
          <use :href="getSVG(elem.flag)" />
        </svg>
      </RouterLink>
    </template>
  </BaseTicker>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import BaseTicker from '@/components/BaseTicker.vue';
import { useCurrenciesTicker } from '@/composables/useCurrenciesTicker';
export default defineComponent({
  components: {
    BaseTicker,
  },
  setup() {
    const { currenciesTicker } = useCurrenciesTicker();

    const currenciesArray = computed(() => {
      const temp = [];
      for (const currency in currenciesTicker.value) {
        temp.push({ ...currenciesTicker.value[currency], id: currency });
      }
      return temp.length == 0 ? null : temp;
    });

    function getSVG(name: string) {
      return `${require('@/assets/sprite.svg')}#${name}`;
    }

    return { currenciesArray, getSVG };
  },
});
</script>

<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;

.curr-ticker {
  &__elem {
    @include flex(center, center);
    width: rem(170px);
  }
  &__name {
    margin: 0 rem(5px);
    font-weight: 700;
  }
  &__icon {
    margin-left: rem(5px);
    &--up {
      color: var(--secondary);
    }
    &--down {
      color: var(--tertiary);
    }
    &--unchanged {
      color: var(--primary);
    }
  }
}
</style>
