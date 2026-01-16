"use client";

import { DollarSign, Package, Percent , Layers, Hash, Flag } from "lucide-react";
import { ProductType } from "@/types/sales/sales";
import { ReactNode } from "react";

interface Props {
  product: ProductType | null;
}

interface InfoProps {
  label: string;
  value: string | number; // می‌توان عدد یا رشته باشد
  icon: ReactNode;
}

function Info({ label, value, icon }: InfoProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
      <div className="text-gray-500 flex items-center gap-2 mb-1">
        {icon}
        {label}
      </div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

export function SelectedProductInfo({ product }: Props) {
  if (!product) return null;

  return (
    <div className="border-t pt-6">
      <h4 className="font-semibold mb-4">مشخصات محصول</h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <Info
          label="قیمت خرید"
          value={`${Number(product.main_price).toLocaleString()} افغانی`}
          icon={<DollarSign />}
        />
        <Info
          label="موجودی"
          value={`${product.stock_qty.toLocaleString()} عدد`}
          icon={<Package />}
        />
        <Info
          label="کد"
          value={product.code ?? "-"}
          icon={<Hash />}
        />
        <Info
          label="نوع"
          value={product.stock_qty ?? "-"}
          icon={<Layers  />}
        />
        <Info
          label="کشور تولید کننده"
          value={product.country ?? "-"}
          icon={<Flag />}
        />
        <Info
          label="عیار"
          value={product.purity ?? "-"}
          icon={<Percent   />}
        />
      </div>
    </div>
  );
}
