import { TrendingUp } from "lucide-react";
import { formatNumber } from "../NumberFormatter";
import { Currency } from "@/types/market-rates/rates";

interface CurrencyCardProps {
  currency: Currency;
}

const CurrencyCard = ({ currency }: CurrencyCardProps) => {
  const isPositive = currency.change >= 0;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:border-primary-500 transition-all animate-slide-up">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currency.flag}</span>
            <h3 className="text-lg font-bold text-text-primary">
              {currency.name}
            </h3>
          </div>
          <p className="text-text-secondary text-sm mt-1">
            کد ارز: {currency.code}
          </p>
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
            {currency.change}%
          </span>
          <TrendingUp
            className={`w-4 h-4 ${!isPositive ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Rate */}
      <div className="flex items-end gap-2 text-left tabular-nums">
        <span className="text-2xl font-bold text-primary-600">
          {formatNumber(currency.rate)}
        </span>
        <span className="text-sm text-text-secondary">افغانی</span>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-border">
        <p className="text-sm text-text-secondary">
          نرخ هر واحد {currency.code} به افغانی افغانستان
        </p>
      </div>
    </div>
  );
};

export default CurrencyCard;
