<template>
  <svg
    class="svg"
    :width="size"
    :height="size"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Loading spinner</title>
    <circle cx="30" cy="30" r="25" stroke="#eee" />
    <g class="rotate">
      <circle class="circle" cx="30" cy="30" r="25" stroke="currentColor" />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    size: {
      type: [Number, String],
      default: 60,
    },
  },
});
</script>

<style scoped>
.svg {
  stroke-linecap: round;
  stroke-width: 2;
}
.rotate {
  color: var(--primary-dark);
  transform-origin: center;
  animation: rotate 3s infinite linear;
}
.circle {
  stroke-dasharray: 157;
  stroke-dashoffset: 157;
  animation: dash 3s infinite ease-in-out;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  100% {
    stroke-dashoffset: -157;
  }
}
</style>
