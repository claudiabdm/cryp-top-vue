import { reactive, toRefs } from '@vue/runtime-dom';
import { CurrencyOHLCV } from '@/types/models';
import { fetchData } from '@/utils/fetchData';
import { useRoute } from 'vue-router';
import { useCurrencyQuote } from './useCurrencyQuote';
import { onMounted, watch } from 'vue';

const { currencyQuote } = useCurrencyQuote();

export function useCurrencyOHLCV(limit: number) {
  const state = reactive<{
    currencyOHLCV: CurrencyOHLCV[] | null;
    lastTimestamp: number;
  }>({
    currencyOHLCV: null,
    lastTimestamp: Math.round(Date.now() / 1000),
  });

  const route = useRoute();

  watch([currencyQuote, route], async () => {
    getCurrencyOHLCV(limit);
  });

  onMounted(() => getCurrencyOHLCV(limit));

  function getCurrencyOHLCV(limit: number) {
    const sym = Array.isArray(route.params.symbol)
      ? route.params.symbol[0]
      : route.params.symbol;
    fetchCurrencyOHLCV(sym, currencyQuote.value, limit).then((res) => {
      state.currencyOHLCV = res.data;
      state.lastTimestamp = res.lastTs - 60 * 60 * 24;
    });
  }

  async function fetchCurrencyOHLCV(
    symbol: string,
    currencyQuote: string,
    limit = 30,
    lastTimestamp?: number
  ) {
    const toTs = lastTimestamp == null ? '' : `&toTs=${lastTimestamp}`;
    const api = `${process.env.VUE_APP_CRYPTO_API_URL}/v2/histoday?fsym=${symbol}&tsym=${currencyQuote}&limit=${limit}&aggregate=1${toTs}&api_key=${process.env.VUE_APP_API_KEY}`;
    const res = await fetchData<{
      Data: { Data: CurrencyOHLCV[]; TimeFrom: number };
    }>(api, {
      method: 'GET',
    });
    if (res.Data.Data) {
      return {
        lastTs: res.Data.TimeFrom,
        data: res.Data.Data.map((elem) => ({
          timeDisplay: new Date(elem.time * 1000).toLocaleDateString(),
          ...elem,
        })),
      };
    }
    return {
      lastTs: 0,
      data: [],
    };
  }

  return {
    ...toRefs(state),
    getCurrencyOHLCV,
    fetchCurrencyOHLCV,
  };
}
