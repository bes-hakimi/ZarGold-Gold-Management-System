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