import { TrendingUp } from "lucide-react";
import { formatNumber } from "../NumberFormatter";
import { Jewelry } from "@/types/market-rates/rates";

interface JewelryCardProps {
  jewelry: Jewelry;
}

const JewelryCard = ({ jewelry }: JewelryCardProps) => {
  const isPositive = jewelry.change >= 0;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:border-primary-500 transition-all animate-slide-up">

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          
          {/* Color Indicator */}
          <div
            className="w-6 h-6 rounded-full border-2 border-primary-300"
            style={{ backgroundColor: jewelry.color }}
          />

          <div className="flex gap-1 items-center">
            <h3 className="text-lg font-bold text-text-primary">
              {jewelry.name}
            </h3>
            <p className="text-sm text-text-secondary">
              عیار: {jewelry.purity}
            </p>
          </div>
        </div>

        {/* Change Badge */}
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
            isPositive
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          }`}
        >
          <span>
            {isPositive ? "+" : ""}
            {jewelry.change}%
          </span>
          <TrendingUp
            className={`w-4 h-4 ${!isPositive ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end gap-2 text-left tabular-nums">
        <span className="text-2xl font-bold text-primary-600">
          {formatNumber(jewelry.pricePerGram)}
        </span>
        <span className="text-sm text-text-secondary">افغانی</span>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-border">
        <p className="text-sm text-text-secondary">
          قیمت هر گرام طلای {jewelry.purity} عیار
        </p>
      </div>
    </div>
  );
};

export default JewelryCard;
