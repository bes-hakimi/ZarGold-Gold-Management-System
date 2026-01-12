"use client";

import { useState } from "react";
import { useApiGet } from "@/hooks/useApi";
import { PRODUCT } from "@/endpoints/products";
import { ProductType, SelectedSaleProduct } from "@/types/sales/sales";
import { ContentLoader } from "@/components/loading/DataLoading";

import { ProductPicker } from "./ProductPicker";
import { SelectedProductsList } from "./SelectedProductsList";
import { SelectedProductInfo } from "./SelectedProductInfo";

interface ProductSelectionProps {
  saleProducts: SelectedSaleProduct[];
  onSaleProductsChange: (products: SelectedSaleProduct[]) => void;
}

export function ProductSelection({ saleProducts, onSaleProductsChange }: ProductSelectionProps) {
  const { data: products = [], isLoading } = useApiGet<ProductType[]>("products", PRODUCT.list);

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  if (isLoading) {
    return <ContentLoader text="در حال بارگیری محصول" />;
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-300">
      <ProductPicker
        products={products}
        saleProducts={saleProducts}
        onChange={onSaleProductsChange}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />

      <SelectedProductsList
        items={saleProducts}
        onRemove={id =>
          onSaleProductsChange(saleProducts.filter(p => p.product.id !== id))
        }
      />

      <SelectedProductInfo product={selectedProduct} />
    </div>
  );
}
