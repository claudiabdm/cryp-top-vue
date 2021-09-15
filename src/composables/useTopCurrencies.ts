import { reactive, toRefs } from '@vue/runtime-dom';
import { Currency, TopCurrenciesAPI } from '@/types/models';
import { fetchData } from '@/utils/fetchData';

const state = reactive<{
  currencies: Currency[] | null;
  currencyPair: string;
  searchQuery: string;
}>({
  currencies: null,
  currencyPair: 'USD',
  searchQuery: '',
});

// TODO: Search by name and filter by currencyPair
// const filteredCurrencies = computed(() => {
// 	return state.currencies.filter((currencies) => {
// 		return (
// 			currency.name.toLowerCase().includes(state.searchQuery.toLocaleLowerCase()) &&
// 			currency.categoryId == state.currencyPair
// 		);
// 	});
// });

export function useTopCurrencies() {
  const api = `${process.env.VUE_APP_CRYPTO_API_URL}/top/totaltoptiervolfull?limit=10&tsym=${state.currencyPair}`;

  function getTopCurrencies(): void {
    fetchData<TopCurrenciesAPI>(api, { method: 'GET' }).then((res) => {
      state.currencies = [];
      res.Data.forEach((elem) => {
        state.currencies?.push({
          id: elem.CoinInfo.Id,
          name: elem.CoinInfo.Name,
          fullName: elem.CoinInfo.FullName,
          logo: elem.CoinInfo.ImageUrl,
          price: elem.DISPLAY[state.currencyPair].PRICE,
          marketCap: elem.DISPLAY[state.currencyPair].MKTCAP,
          change24h: elem.DISPLAY[state.currencyPair].CHANGE24HOUR,
          volume24h: elem.DISPLAY[state.currencyPair].TOTALVOLUME24H,
        });
      });
    });
  }

  return { ...toRefs(state), getTopCurrencies };
}
