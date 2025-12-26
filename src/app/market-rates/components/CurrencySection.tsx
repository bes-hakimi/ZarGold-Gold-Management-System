
import { TrendingUp } from 'lucide-react';
import CurrencyCard from './CurrencyCard';
import { Currency } from '@/types/market-rates/rates';

interface CurrencySectionProps {
  currencies: Currency[];
}

const CurrencySection = ({ currencies }: CurrencySectionProps) => {
  return (
    <section className={`w-full  backdrop-blur-sm border border-gray-300 rounded-lg p-6 transition-all 
    `}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-primary-600 to-yellow-600 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">نرخ ارزهای جهانی</h2>
          <p className="text-gray-500 text-sm">آخرین نرخ ارزهای بین‌المللی بر اساس بازار جهانی</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currencies.map((currency) => (
          <CurrencyCard key={currency.id} currency={currency} />
        ))}
      </div>
    </section>
  );
};

export default CurrencySection;