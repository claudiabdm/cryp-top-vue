import { Currency, CurrencyTickerAPI } from '@/types/models';
import { toRefs } from '@vue/runtime-dom';
import { reactive, watch } from 'vue';
import { useCurrencyQuote } from './useCurrencyQuote';
import { useTopCurrencies } from './useTopCurrencies';

const { currencies } = useTopCurrencies();
const { currencyQuote } = useCurrencyQuote();

export function useCurrenciesTicker() {
  const state = reactive<{
    currenciesTicker: { [key: string]: Partial<Currency> } | null;
  }>({
    currenciesTicker: null,
  });

  watch([currencies, currencyQuote], (newValue, oldValue) => {
    const [currencies, currencyQuote] = newValue;
    if (currencies != null) {
      if (currencyQuote == oldValue[1]) {
        getTopCurrenciesTicker(currencies);
      }
    }
  });

  function getTopCurrenciesTicker(currencies: Currency[]): void {
    const apiKey = process.env.VUE_APP_API_KEY;
    const ccStreamer = new WebSocket(
      'wss://streamer.cryptocompare.com/v2?api_key=' + apiKey
    );
    ccStreamer.onopen = function onStreamOpen() {
      state.currenciesTicker = {};
      for (const currency of currencies) {
        const subRequest = {
          action: 'SubAdd',
          subs: [`2~Coinbase~${currency.name}~${currencyQuote.value}`],
        };
        state.currenciesTicker[currency.name] = {
          logo: currency.logo,
          name: currency.name,
        };
        ccStreamer.send(JSON.stringify(subRequest));
      }
    };

    ccStreamer.onmessage = function onStreamMessage(event: MessageEvent) {
      const data: CurrencyTickerAPI = JSON.parse(event.data);
      if (
        data.FROMSYMBOL &&
        data.PRICE &&
        state.currenciesTicker &&
        data.TOSYMBOL === currencyQuote.value
      ) {
        state.currenciesTicker[data.FROMSYMBOL].price = data.PRICE;
        state.currenciesTicker[data.FROMSYMBOL].flag =
          data.FLAGS == 1 ? 'up' : data.FLAGS == 2 ? 'down' : 'unchanged';
      }
    };
  }
  return { ...toRefs(state), getTopCurrenciesTicker };
}
