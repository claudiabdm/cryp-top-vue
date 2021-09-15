<template>
  <main>
    <RouterView v-slot="{ Component }">
      <KeepAlive include="TopCurrencies">
        <component :is="Component" :key="$route.fullPath" />
      </KeepAlive>
    </RouterView>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
