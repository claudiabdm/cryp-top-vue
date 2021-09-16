export interface TopCurrenciesAPI {
  Data: {
    CoinInfo: {
      Id: string;
      Name: string;
      FullName: string;
      ImageUrl: string;
    };
    DISPLAY: {
      [key: string]: {
        PRICE: string;
        TOTALVOLUME24H: string;
        CHANGE24HOUR: string;
        MKTCAP: string;
      };
    };
  }[];
}

export interface Currency {
  id: string;
  name: string;
  fullName: string;
  logo: string;
  price: string;
  change24h: string;
  marketCap: string;
  volume24h: string;
}

export interface CurrencyOHLCV {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volumefrom: number;
  volumeto: number;
  timeDisplay?: string;
}
