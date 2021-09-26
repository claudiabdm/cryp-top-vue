<template>
  <article class="histo-table">
    <h3 class="histo-table__title">Historical data for {{ currencyName }}</h3>
    <BaseTable
      class="histo-table__table"
      :rows="sortedData"
      :columns="$options.columns"
    >
      <template v-slot:time="{ value }">
        {{ new Date(value * 1000).toLocaleDateString() }}
      </template>
    </BaseTable>
    <button
      class="histo-table__load"
      type="button"
      :disabled="loadButtonText === 'Loading...'"
      @click="loadMore()"
    >
      {{ loadButtonText }}
    </button>
  </article>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import BaseTable from '@/components/BaseTable.vue';
import { useCurrencyOHLCV } from '@/composables/useCurrencyOHLCV';
import { useCurrencyQuote } from '@/composables/useCurrencyQuote';

export default defineComponent({
  components: {
    BaseTable,
  },
  columns: {
    time: {
      name: 'Date',
      align: 'left',
    },
    open: {
      name: 'Open',
      align: 'right',
    },
    high: {
      name: 'High',
      align: 'right',
    },
    low: {
      name: 'Low',
      align: 'right',
    },
    close: {
      name: 'Close',
      align: 'right',
    },
    volumefrom: {
      name: 'Volume From',
      align: 'right',
    },
    volumeto: {
      name: 'Volume To',
      align: 'right',
    },
  },
  props: {
    currencyName: {
      type: String,
      default: '',
    },
    currencySymbol: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { currencyQuote } = useCurrencyQuote();
    const {
      currencyOHLCV,
      fetchCurrencyOHLCV,
      getCurrencyOHLCV,
      lastTimestamp,
    } = useCurrencyOHLCV();
    const loadButtonText = ref('Load more');

    const sortedData = computed(() => {
      if (currencyOHLCV.value) {
        return [...currencyOHLCV.value].sort((a, b) => b.time - a.time);
      }
      return null;
    });

    watch(currencyQuote, async () => {
      getCurrencyOHLCV(10);
    });

    onMounted(() => getCurrencyOHLCV(10));

    async function loadMore() {
      if (loadButtonText.value === 'Loading...') return;
      loadButtonText.value = 'Loading...';
      const res = await fetchCurrencyOHLCV(
        props.currencySymbol,
        currencyQuote.value,
        10,
        lastTimestamp.value
      );
      currencyOHLCV.value?.push(...res.data);
      lastTimestamp.value = res.lastTs - 60 * 60 * 24;
      loadButtonText.value = 'Load more';
      await nextTick();
      window.scrollTo(0, document.body.scrollHeight);
    }

    return { sortedData, loadMore, loadButtonText };
  },
});
</script>

<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;
.histo-table {
  @include flex(center, center, column);
  width: 100%;
  &__title {
    padding: rem(10px);
    font-weight: 700;
  }
  &__table {
    width: 100%;
  }
  &__load {
    @include flex(center, center);
    padding: rem(10px);
    border: 0;
    border-radius: rem(10px);
    color: #fff;
    background-color: var(--primary);
    transition: background-color 0.15s;
    &:hover {
      cursor: pointer;
      background-color: var(--primary-dark);
    }
    &:disabled {
      cursor: not-allowed;
      background-color: var(--grey-400);
    }
  }
}
</style>
