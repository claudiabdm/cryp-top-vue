<template>
  <article class="chart">
    <LineChart
      class="chart__line-chart"
      v-if="currencyOHLCV"
      v-bind="lineChartProps"
    />
    <BaseLoadingSpinner v-else class="chart__spinner" />
  </article>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import {
  Chart,
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
} from 'chart.js';
import { LineChart, useLineChart } from 'vue-chart-3';
import BaseLoadingSpinner from '@/components/BaseLoadingSpinner.vue';
import { useRoute } from 'vue-router';
import { useCurrencyQuote } from '@/composables/useCurrencyQuote';
import { useCurrencyOHLCV } from '@/composables/useCurrencyOHLCV';
Chart.register(
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Title
);

export default defineComponent({
  components: {
    LineChart,
    BaseLoadingSpinner,
  },
  setup() {
    const { currencyQuote } = useCurrencyQuote();
    const route = useRoute();

    const { currencyOHLCV } = useCurrencyOHLCV(30);

    const chartData = computed(() => {
      let labels = [];
      let data = [];
      if (currencyOHLCV.value) {
        for (let elem of currencyOHLCV.value) {
          labels.push(elem.timeDisplay);
          data.push(elem.close);
        }
      }
      return {
        labels,
        datasets: [
          {
            backgroundColor: 'hsl(239, 84%, 67%)',
            data,
          },
        ],
      };
    });

    const options = computed(() => ({
      animation: true,
      interaction: {
        mode: 'index',
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            callback: function (value: number) {
              return value >= 1000 ? `${value / 1000}K` : value.toFixed(2);
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: `${route.params.symbol} to ${currencyQuote.value} Price Chart (30 Days)`,
        },
      },
    }));

    const { lineChartProps } = useLineChart({
      chartData,
      options,
    });

    return { currencyOHLCV, lineChartProps };
  },
});
</script>

<style lang="scss" scoped>
@use '../styles/mixins/mixins' as *;
.chart {
  width: 100%;
  padding: rem(10px);
  border-radius: 0.625rem;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 0 0.3125rem 0.125rem var(--grey-200);
  &__line-chart {
    width: 100%;
    max-height: rem(450px);
  }
  &__spinner {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
