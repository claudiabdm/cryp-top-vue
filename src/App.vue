<template>
  <TheHeader />
  <main>
    <RouterView v-slot="{ Component }">
      <KeepAlive include="TopCurrencies">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useTopCurrencies } from '@/composables/useTopCurrencies';
import TheHeader from '@/components/TheHeader.vue';
import { useCurrencyQuote } from './composables/useCurrencyQuote';
export default defineComponent({
  components: {
    TheHeader,
  },
  name: 'App',
  setup() {
    const { getTopCurrencies } = useTopCurrencies();
    const { currencyQuote } = useCurrencyQuote();
    onMounted(() => getTopCurrencies(currencyQuote.value));
  },
});
</script>
