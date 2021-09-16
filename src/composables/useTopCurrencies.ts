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
      state.currencies?.push({
        id: elem.CoinInfo.Id,
        name: elem.CoinInfo.Name,
        fullName: elem.CoinInfo.FullName,
        logo: `https://www.cryptocompare.com/${elem.CoinInfo.ImageUrl}`,
        price: elem.DISPLAY[currencyQuote].PRICE,
        marketCap: elem.DISPLAY[currencyQuote].MKTCAP,
        change24h: elem.DISPLAY[currencyQuote].CHANGE24HOUR,
        volume24h: elem.DISPLAY[currencyQuote].TOTALVOLUME24H,
      });
    });
  });
}

export function useTopCurrencies() {
  return { ...toRefs(state), getTopCurrencies };
}
