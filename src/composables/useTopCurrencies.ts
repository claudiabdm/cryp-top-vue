import { reactive, toRefs } from '@vue/runtime-dom';
import { Currency, TopCurrenciesAPI } from '@/types/models';
import { fetchData } from '@/utils/fetchData';
import { useCurrencyQuote } from './useCurrencyQuote';
import { watch } from 'vue';

const { currencyQuote } = useCurrencyQuote();

const state = reactive<{
  currencies: Currency[] | null;
  searchQuery: string;
}>({
  currencies: null,
  searchQuery: '',
});

watch(currencyQuote, (newValue) => {
  getTopCurrencies(newValue);
});

function getTopCurrencies(currencyQuote: string): void {
  const api = `${process.env.VUE_APP_CRYPTO_API_URL}/top/totaltoptiervolfull?limit=10&tsym=${currencyQuote}`;
  fetchData<TopCurrenciesAPI>(api, { method: 'GET' }).then((res) => {
    state.currencies = [];
    res.Data.forEach((elem) => {
      const currency = {
        id: elem.CoinInfo.Id,
        name: elem.CoinInfo.Name,
        fullName: elem.CoinInfo.FullName,
        logo: `https://www.cryptocompare.com/${elem.CoinInfo.ImageUrl}`,
        price: '-',
        marketCap: '-',
        change24h: '-',
        volume24h: '-',
        priceDisplay: '-',
        marketCapDisplay: '-',
        change24hDisplay: '-',
        volume24hDisplay: '-',
      };
      if (elem.DISPLAY) {
        state.currencies?.push({
          ...currency,
          price: elem.RAW[currencyQuote].PRICE,
          marketCap: elem.RAW[currencyQuote].MKTCAP,
          change24h: elem.RAW[currencyQuote].CHANGE24HOUR,
          volume24h: elem.RAW[currencyQuote].TOTALVOLUME24H,
          priceDisplay: elem.DISPLAY[currencyQuote].PRICE,
          marketCapDisplay: elem.DISPLAY[currencyQuote].MKTCAP,
          change24hDisplay: elem.DISPLAY[currencyQuote].CHANGE24HOUR,
          volume24hDisplay: elem.DISPLAY[currencyQuote].TOTALVOLUME24H,
        });
      } else {
        state.currencies?.push(currency);
      }
    });
  });
}

export function useTopCurrencies() {
  return { ...toRefs(state), getTopCurrencies };
}
