"use client";

import { Trash2 } from "lucide-react";
import { ProductType } from "@/types/sales/sales";
import { toast } from "react-hot-toast";

interface Props {
  items: {
    product: ProductType;
    quantity: number;
    salePrice: number;
  }[];
  onRemove: (id: number) => void;
}

export function SelectedProductsList({ items, onRemove }: Props) {
  const total = items.reduce((sum, i) => sum + i.salePrice * i.quantity, 0);

  if (!items.length) return null;

  return (
    <div className="border-t pt-6 mb-6">
      <h4 className="font-semibold mb-4">محصولات انتخاب‌شده</h4>

      <div className="space-y-3">
        {items.map(({ product, quantity, salePrice }) => (
          <div key={product.id} className="bg-gray-50 p-4 rounded-lg border border-gray-300">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{product.name}</span>
              <button
                onClick={() => {
                  onRemove(product.id);
                  toast.success("حذف شد");
                }}
                className="text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 text-sm gap-3">
              <div>تعداد: {quantity}</div>
              <div>قیمت: {salePrice.toLocaleString()} افغانی</div>
              <div className="text-green-600">
                مجموع: {(salePrice * quantity).toLocaleString()}
              </div>
              <div>کد: {product.slug}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-blue-50 p-4 rounded border border-blue-300">
        <span className="font-bold">جمع کل:</span>{" "}
        {total.toLocaleString()} افغانی
      </div>
    </div>
  );
}
