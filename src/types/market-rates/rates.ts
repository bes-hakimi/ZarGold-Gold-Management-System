// types/index.ts
export interface Currency {
  id: number;
  name: string;
  code: string;
  rate: number;
  change: number;
  flag: string;
}

export interface Jewelry {
  id: number;
  name: string;
  purity: number;
  pricePerGram: number;
  change: number;
  color: string;
}

export type TabType = 'currencies' | 'jewelries';

export interface CurrencyApiResponse {
  source: string;
  base: string;
  date: string;
  rates_to_afn: Record<string, number>;
}

export interface GoldApiResponse {
  source: string;
  usd_to_afn: number;
  gold_price_per_gram_afn: Record<string, number>;
}
