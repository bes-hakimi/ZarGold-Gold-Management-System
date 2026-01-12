"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { DollarSign, Package } from "lucide-react";
import { CancelButton, SaveButton } from "@/components/ui/Button";
import { purities, categories, goldProducerCountries } from "../constants/productOptions";
import { useApiPost } from "@/hooks/useApi";
import { PRODUCT } from "@/endpoints/products";
import { ApiError } from "@/types/api/api";

export default function AddProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    salePrice: "",
    origin: "",
    size: "",
    customLength: "",
    customWidth: "",
    type: "",
    quality: "",
    stock: "",
    goldRate: "",
    description: "",
    condition: "new",
  });

  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useApiPost(PRODUCT.create);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleImageSelect = (url: string | null) => {
    setImage(url);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "نام محصول الزامی است.";
    if (!formData.code.trim()) newErrors.code = "کد محصول الزامی است.";

    if (!formData.salePrice || Number(formData.salePrice) <= 0)
      newErrors.salePrice = "قیمت خرید الزامی است.";

    if (!formData.origin)
      newErrors.origin = "کشور تولیدکننده الزامی است.";

    if (!formData.size)
      newErrors.size = "سایز محصول الزامی است.";

    if (formData.size === "سفارشی") {
      if (!formData.customLength)
        newErrors.customLength = "طول قالین الزامی است.";
      if (!formData.customWidth)
        newErrors.customWidth = "عرض قالین الزامی است.";
    }

    if (!formData.type)
      newErrors.type = "عیار الزامی است.";

    if (!formData.quality)
      newErrors.quality = "کیفیت الزامی است.";

    if (!formData.stock || Number(formData.stock) <= 0)
      newErrors.stock = "تعداد موجودی باید بیشتر از صفر باشد.";

    if (!formData.goldRate || Number(formData.goldRate) <= 0)
      newErrors.goldRate = "نرخ روز طلا الزامی است.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("لطفاً خطاهای فرم را اصلاح کنید.");
      return;
    }

    setIsSubmitting(true);

    const finalSize =
      formData.size === "سفارشی"
        ? `${formData.customLength}x${formData.customWidth} متر`
        : formData.size;

    const productData = {
      name: formData.name,
      code: formData.code,
      main_price: String(formData.salePrice),
      country: formData.origin,
      size: finalSize,
      type: formData.type,
      quality: formData.quality,
      stock_qty: Number(formData.stock),
      gold_rate: Number(formData.goldRate),
      description: formData.description,
      condition: formData.condition,
      ...(image && { image }),
    };

    try {
      await mutation.mutateAsync(productData);
      toast.success("محصول با موفقیت اضافه شد!");
      router.push("/products/list");
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message ??
        apiError.message ??
        "خطا در ثبت محصول"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <PageHeader
        title="اضافه کردن محصول جدید"
        description="اطلاعات محصول جدید را وارد کنید"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg p-6 border border-gray-300">
          <h3 className="font-semibold mb-4">اطلاعات اصلی</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="نام محصول"
              value={formData.name}
              onChange={e => handleInputChange("name", e.target.value)}
              error={errors.name}
              required
            />

            <Input
              label="کد محصول"
              value={formData.code}
              onChange={e => handleInputChange("code", e.target.value)}
              error={errors.code}
              required
            />

            <Input
              label="تعداد موجودی"
              type="number"
              value={formData.stock}
              onChange={e => handleInputChange("stock", e.target.value)}
              icon={<Package size={16} />}
              error={errors.stock}
              required
            />

            <Input
              label="قیمت خرید (افغانی)"
              type="number"
              value={formData.salePrice}
              onChange={e => handleInputChange("salePrice", e.target.value)}
              icon={<DollarSign size={16} />}
              error={errors.salePrice}
              required
            />

            {/* 4 */}
            <Select
              label="کشور تولیدکننده"
              options={goldProducerCountries}
              value={formData.origin}
              onChange={v => handleInputChange("origin", v)}
              error={errors.origin}
              required
            />

            <Select
              label="سایز"
              options={categories}
              value={formData.size}
              onChange={v => handleInputChange("size", v)}
              error={errors.size}
              required
            />

            <Select
              label="عیار"
              options={purities}
              value={formData.type}
              onChange={v => handleInputChange("type", v)}
              error={errors.type}
              required
            />

            <Input
              label="نرخ روز طلا (افغانی)"
              type="number"
              value={formData.goldRate}
              onChange={e => handleInputChange("goldRate", e.target.value)}
              error={errors.goldRate}
              required
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-300">
          <h3 className="font-semibold mb-4">تصویر محصول (اختیاری)</h3>
          <ImageUpload
            onImageSelect={handleImageSelect}
            label="عکس قالین"
            maxSize={5}
          />
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-300">
          <h3 className="font-semibold mb-4">توضیحات (اختیاری)</h3>
          <Textarea
            value={formData.description}
            onChange={v => handleInputChange("description", v)}
            rows={5}
          />
        </div>

        <div className="flex justify-end gap-4">
          <CancelButton onClick={() => router.back()}>
            انصراف
          </CancelButton>
          <SaveButton type="submit" loading={isSubmitting}>
            ذخیره محصول
          </SaveButton>
        </div>
      </form>
    </div>
  );
}
