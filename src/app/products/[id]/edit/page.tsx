'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { DollarSign, Package } from 'lucide-react';
import { CancelButton, SaveButton, DeleteButton } from '@/components/ui/Button';
import { purities, categories, goldProducerCountries } from '../../constants/productOptions';
import { useApiGet, useApiPut, useApiDeleteDynamic } from '@/hooks/useApi';
import { PRODUCT } from '@/endpoints/products';
import { ApiError } from '@/types/api/api';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import { ProductType } from '@/types/product/product';
import { ContentLoader } from '@/components/loading/DataLoading';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);

  const { data: productData, isLoading, isError } = useApiGet<ProductType>(
    `product-${productId}`,
    PRODUCT.details(productId)
  );

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    country: '',
    purity: '',
    stock_qty: 0,
    main_price: 0,
    rate: 0,
    description: '',
  });

  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const putProduct = useApiPut<ProductType, typeof formData>(PRODUCT.update(productId));
  const deleteProduct = useApiDeleteDynamic<void>();

  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name || '',
        code: productData.code || '',
        type: productData.type || '',
        country: productData.country || '',
        purity: productData.purity || '',
        stock_qty: productData.stock_qty || 0,
        main_price: productData.main_price || 0,
        rate: productData.rate || 0,
        description: productData.description || '',
      });
      setImage(productData.image || null);
    }
  }, [productData]);

  const handleInputChange = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'نام محصول الزامی است.';
    if (!formData.code.trim()) newErrors.code = 'کد محصول الزامی است.';
    if (!formData.type) newErrors.type = 'نوع محصول الزامی است.';
    if (!formData.country) newErrors.country = 'کشور تولیدکننده الزامی است.';
    if (!formData.purity) newErrors.purity = 'عیار محصول الزامی است.';
    if (!formData.stock_qty || formData.stock_qty <= 0) newErrors.stock_qty = 'موجودی باید بیشتر از صفر باشد.';
    if (!formData.main_price || formData.main_price <= 0) newErrors.main_price = 'قیمت فروش الزامی است.';
    if (!formData.rate || formData.rate <= 0) newErrors.rate = 'نرخ روز طلا الزامی است.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('لطفاً خطاهای فرم را اصلاح کنید.');
      return;
    }

    setIsSaving(true);

    const payload = {
      ...formData,
      ...(image && { image }),
    };

    try {
      await putProduct.mutateAsync(payload);
      toast.success('محصول با موفقیت ویرایش شد!');
      router.push('/products/list');
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message || err.message || 'خطا در ویرایش محصول');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct.mutateAsync(PRODUCT.delete(productId));
      toast.success('محصول با موفقیت حذف شد!');
      router.push('/products/list');
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message || err.message || 'خطا در حذف محصول');
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <ContentLoader />
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 p-6">خطا در بارگذاری محصول</p>;
  }

  return (
    <div className="w-full">
      <PageHeader title="ویرایش محصول" description="اطلاعات محصول را ویرایش کنید" backUrl="/products" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* اطلاعات اصلی */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold mb-4 text-gray-900">اطلاعات اصلی</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="نام محصول"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              error={errors.name}
              required
            />
            <Input
              label="کد محصول"
              value={formData.code}
              onChange={e => handleInputChange('code', e.target.value)}
              error={errors.code}
              required
            />
            <Input
              label="تعداد موجودی"
              type="number"
              value={formData.stock_qty}
              onChange={e => handleInputChange('stock_qty', Number(e.target.value))}
              icon={<Package size={16} />}
              error={errors.stock_qty}
              required
            />
            <Input
              label="قیمت فروش (افغانی)"
              type="number"
              value={formData.main_price}
              onChange={e => handleInputChange('main_price', Number(e.target.value))}
              icon={<DollarSign size={16} />}
              error={errors.main_price}
              required
            />
            <Select
              label="نوع"
              options={categories}
              value={formData.type}
              onChange={v => handleInputChange('type', v)}
              error={errors.type}
              required
            />
            <Select
              label="کشور تولیدکننده"
              options={goldProducerCountries}
              value={formData.country}
              onChange={v => handleInputChange('country', v)}
              error={errors.country}
              required
            />
            <Select
              label="عیار"
              options={purities}
              value={formData.purity}
              onChange={v => handleInputChange('purity', v)}
              error={errors.purity}
              required
            />
            <Input
              label="نرخ روز طلا (افغانی)"
              type="number"
              value={formData.rate}
              onChange={e => handleInputChange('rate', Number(e.target.value))}
              error={errors.rate}
              required
            />
          </div>
        </div>

        {/* تصویر */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold mb-4 text-gray-900">تصویر محصول</h3>
          <ImageUpload
            label="تصویر اصلی"
            defaultImageUrl={image || ''}
            onImageSelect={url => setImage(url || null)}
          />
        </div>

        {/* توضیحات */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold mb-4 text-gray-900">توضیحات</h3>
          <Textarea
            value={formData.description}
            onChange={v => handleInputChange('description', v)}
            rows={5}
          />
        </div>

        {/* دکمه‌ها */}
        <div className="flex justify-end gap-4">
          <DeleteButton type="button" onClick={() => setIsDeleteOpen(true)}>
            حذف
          </DeleteButton>
          <CancelButton type="button" onClick={() => router.push('/products')}>
            انصراف
          </CancelButton>
          <SaveButton type="submit" loading={isSaving}>
            ذخیره تغییرات
          </SaveButton>
        </div>
      </form>

      {/* Modal حذف */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        itemName={formData.name}
      />
    </div>
  );
}
