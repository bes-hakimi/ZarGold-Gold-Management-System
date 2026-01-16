export type FormField = "customer_name" | "customer_phone" | "customer_address" | "payment_method" | "delivery_method" | "notes";

export interface ProductType {
  id: number;
  code: string;
  country?: string;
  purity?: string;
  name: string;
  slug: string;
  main_price: string;
  stock_qty: number;
  type?: string;
  weight?: string;
}

export interface SelectedSaleProduct {
  product: ProductType;
  code?: string;
  quantity: number;
  salePrice: number;
  goldRate: number;
  weight: number; 
}

export interface CustomerType {
  id?: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
}



export interface SaleInitialData {
  slug?: string; // برای استفاد در نمایش جزئیات
  created_at?: string;  // برای استفاده در نمایش جزئیات
  customer?: CustomerType;
  description?: string;
  products?: SelectedSaleProduct[];
  company_info?: CompanyInfo;
}

export interface SaleFormProps {
  onCancel: () => void;
  onShowInvoice: (data: SaleInitialData) => void;
  initialData?: SaleInitialData;
}

export interface CompanyInfo {
  company_logo: string;
  company_name: string;
  branch_name: string;
  phone: string;
  address: string;
  email: string;
  warranty: string;
}
