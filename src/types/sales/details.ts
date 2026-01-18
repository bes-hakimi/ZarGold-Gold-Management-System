// src/types/sales/details.ts

export interface SaleDetailsType {
  id: number;
  slug: string;
  invoiceNumber: string; // اگر در API نیست، در کامپوننت تولید می‌شود
  rate: string;
  weight: string;
  description: string;
  created_at: string;

  customer: {
    id: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
  };

  items: {
    id: number;
    qty: number;
    weight: string;
    main_price: string;
    product: {
      id: number;
      code: string;
      name: string;
      slug: string;
      type: string;
      country: string;
      size: string;
      quality: string;
      stock_qty: number;
      main_price: string;
      image: string;
      gallery_image: string | null;
      description: string;
      rate: string;
      purity: string;
      main_color: string;
      age: number;
      created_at: string;
      updated_at: string;
      user: number;
    };
  }[];
}
