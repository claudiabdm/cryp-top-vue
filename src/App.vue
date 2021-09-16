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
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  components: {
    TheHeader,
  },
  name: 'App',
});
</script>
