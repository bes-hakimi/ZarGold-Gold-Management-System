// src/types/product.ts
export interface ProductType {
  id: number;
  code: string;
  name: string;
  slug: string;
  type: string;            
  country: string;
  purity: string;
  rate: number;          
  size: string;            
  quality: string;          
  stock_qty: number;
  main_price: number;      
  image: string;
  gallery_image: string[] | null;
  description: string;
  weight: string;           
  main_color: string;
  age: number;
  created_at: string;     
  updated_at: string;      
  message: string
  user: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    role: string | null;
    branch_name: string | null;
    staff_name: string | null;
    company_name: string | null;
  },
  created_by_info?: {
    id: number;
    first_name: string;     
    branch_name: string | null;
    company_name: string | null;
  };
 
}
