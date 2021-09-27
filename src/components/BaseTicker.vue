<template>
  <div class="ticker" :class="{ 'ticker--loading': list == null }">
    <div v-if="list" class="ticker__wrapper">
      <ul v-for="num in [0, 1]" class="ticker__list" :key="num">
        <li class="ticker__elem" v-for="elem in list" :key="elem.id">
          <slot name="tickerContent" :elem="elem"></slot>
        </li>
      </ul>
    </div>
    <BaseLoadingSpinner size="50" v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLoadingSpinner from '@/components/BaseLoadingSpinner.vue';
export default defineComponent({
  components: {
    BaseLoadingSpinner,
  },
  props: {
    list: {
      type: Array,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;
.ticker {
  width: 100%;
  min-height: rem(50px);
  margin-top: rem(40px);
  border-radius: rem(10px);
  background-color: #fff;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  &--loading {
    @include flex(center, center);
  }
  &__wrapper {
    @include flex(center, flex-start);
    width: max-content;
    &:hover {
      .ticker__list {
        animation-play-state: paused;
      }
    }
  }
  &__list {
    @include flex(center, flex-start);
    width: 100%;
    animation: move 20s infinite linear;
  }
  &__elem {
    margin: rem(20px) rem(10px);
    flex-shrink: 0;
  }
}
@keyframes move {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
