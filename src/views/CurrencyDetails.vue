<template>
  <div>Hey {{ $route.params.symbol }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CurrencyDetails',
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
