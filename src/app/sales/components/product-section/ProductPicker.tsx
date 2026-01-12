"use client";

import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { AddButton } from "@/components/ui/Button";
import { DollarSign } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { ProductType } from "@/types/sales/sales";

interface SelectedSaleProduct {
  product: ProductType;
  quantity: number;
  salePrice: number;
  goldRate: number; // نرخ روز طلا
  weight: number;   // وزن به گرم
}

interface Props {
  products: ProductType[];
  saleProducts: SelectedSaleProduct[];
  onChange: (products: SelectedSaleProduct[]) => void;
  selectedProduct: ProductType | null;
  setSelectedProduct: (p: ProductType | null) => void;
}

export function ProductPicker({
  products,
  saleProducts,
  onChange,
  selectedProduct,
  setSelectedProduct,
}: Props) {
  const [quantity, setQuantity] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [goldRate, setGoldRate] = useState("");
  const [weight, setWeight] = useState("");

  // بررسی اینکه همه فیلدها پر شده باشد
  const isFormValid =
    selectedProduct &&
    quantity.trim() !== "" &&
    salePrice.trim() !== "" &&
    goldRate.trim() !== "" &&
    weight.trim() !== "";

  const handleAdd = () => {
    if (!isFormValid) {
      toast.error("تمام فیلدها الزامی است");
      return;
    }

    const qty = Number(quantity);
    const price = Number(salePrice);
    const rate = Number(goldRate);
    const w = Number(weight);

    if ([qty, price, rate, w].some(v => isNaN(v) || v <= 0)) {
      toast.error("مقادیر وارد شده نامعتبر هستند");
      return;
    }

    if (qty > selectedProduct!.stock_qty) {
      toast.error(`حداکثر موجودی ${selectedProduct!.stock_qty} عدد است`);
      return;
    }

    const exists = saleProducts.findIndex(p => p.product.id === selectedProduct!.id);
    const updated = [...saleProducts];

    const newProduct: SelectedSaleProduct = {
      product: selectedProduct!,
      quantity: qty,
      salePrice: price,
      goldRate: rate,
      weight: w,
    };

    if (exists >= 0) {
      updated[exists] = newProduct;
      toast.success("محصول به‌روزرسانی شد");
    } else {
      updated.push(newProduct);
      toast.success(`${selectedProduct!.name} به لیست اضافه شد`);
    }

    onChange(updated);
    setSelectedProduct(null);
    setQuantity("");
    setSalePrice("");
    setGoldRate("");
    setWeight("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* انتخاب محصول */}
      <Select
        label="جنس"
        options={products.map((p: ProductType) => ({
          value: p.id.toString(),
          label: `${p.name} (موجودی: ${p.stock_qty})`,
        }))}
        value={selectedProduct?.id.toString() || ""}
        onChange={id =>
          setSelectedProduct(products.find((p: ProductType) => p.id.toString() === id) || null)
        }
        searchable
        clearable
      />

      {/* تعداد */}
      <Input
        label="تعداد"
        type="number"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        disabled={!selectedProduct}
      />

      {/* قیمت فروش */}
      <Input
        label="قیمت فروش"
        type="number"
        value={salePrice}
        onChange={e => setSalePrice(e.target.value)}
        icon={<DollarSign className="w-4 h-4" />}
        disabled={!selectedProduct}
      />

      {/* نرخ روز طلا */}
      <Input
        label="نرخ روز طلا (افغانی)"
        type="number"
        value={goldRate}
        onChange={e => setGoldRate(e.target.value)}
        disabled={!selectedProduct}
      />

      {/* وزن به گرم */}
      <Input
        label="وزن (گرم)"
        type="number"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        disabled={!selectedProduct}
      />

      {/* دکمه اضافه کردن */}
      <div className="flex items-end">
        <AddButton type="button" onClick={handleAdd} disabled={!isFormValid}>
          اضافه کردن
        </AddButton>
      </div>
    </div>
  );
}
