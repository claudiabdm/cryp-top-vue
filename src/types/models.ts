export interface TopCurrenciesAPI {
  Data: {
    CoinInfo: {
      Id: string;
      Name: string;
      FullName: string;
      ImageUrl: string;
    };
    RAW: {
      [key: string]: {
        PRICE: string;
        TOTALVOLUME24H: string;
        CHANGE24HOUR: string;
        MKTCAP: string;
      };
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

export interface CurrencyTickerAPI {
  FROMSYMBOL: string;
  TOSYMBOL: string;
  PRICE: string;
  FLAGS: 1 | 2 | 3;
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
  priceDisplay: string;
  change24hDisplay: string;
  marketCapDisplay: string;
  volume24hDisplay: string;
  flag?: 'up' | 'down' | 'unchanged';
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
