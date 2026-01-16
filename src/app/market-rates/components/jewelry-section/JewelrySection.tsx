
import { Gem } from 'lucide-react';
import JewelryCard from './JewelryCard';
import JewelryGuide from './JewelryGuide';
import { Jewelry } from '@/types/market-rates/rates';

interface JewelrySectionProps {
  jewelries: Jewelry[];
}

const JewelrySection = ({ jewelries }: JewelrySectionProps) => {
  return (
    <section className={`backdrop-blur-sm border border-gray-300 rounded-lg p-4 md:p-6 transition-all`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-primary-600 to-yellow-600 rounded-xl">
          <Gem className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">نرخ جواهرات</h2>
          <p className="text-gray-500 text-sm">آخرین نرخ طلا با عیارهای مختلف در بازار جهانی</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jewelries.map((jewelry) => (
          <JewelryCard key={jewelry.id} jewelry={jewelry} />
        ))}
      </div>
      
      <JewelryGuide />
    </section>
  );
};

export default JewelrySection;