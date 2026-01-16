"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, DollarSign, Euro, Gem, CalendarDays, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

import { getAfghanDate } from "@/lib/afghan-date";
import { useApiGet } from "@/hooks/useApi";
import { MARKET_RATE } from "@/endpoints/market-rate";
import { CurrencyApiResponse, Jewelry } from "@/types/market-rates/rates";

import { ContentLoader } from "@/components/loading/DataLoading";

export default function MarketSummaryHeader() {
  const [now, setNow] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  /* ---------------- TIME ---------------- */
  useEffect(() => {
    setIsClient(true);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const afghanDate = getAfghanDate(now);
  const { weekday, month, year } = afghanDate;

  const gregorianDate = now.toLocaleTimeString("fa-IR-u-nu-latn", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  /* ---------------- API ---------------- */
  const {
    data: currencyData,
    isFetching: isCurrencyLoading,
    isError: isCurrencyError,
  } = useApiGet<CurrencyApiResponse>("summary-currency", MARKET_RATE.currency);

  const {
    data: goldData = [],
    isFetching: isGoldLoading,
    isError: isGoldError,
  } = useApiGet<Jewelry[]>("summary-gold", MARKET_RATE.gold);

  /* ✅ اصلاح منطق */
  const isLoading = isCurrencyLoading && isGoldLoading;
  const isError = isCurrencyError && isGoldError;

  /* ---------------- NORMALIZE DATA ---------------- */
  const marketRates = useMemo(() => {
    if (!currencyData) return [];

    const rates = currencyData.rates_to_afn ?? {};
    const goldArray: Jewelry[] = Array.isArray(goldData) ? goldData : [];

    const gold24 = goldArray.find(g => g.purity === 24)?.pricePerGram;
    const gold21 = goldArray.find(g => g.purity === 21)?.pricePerGram;

    return [
      {
        id: "usd",
        icon: <DollarSign className="w-5 h-5" />,
        title: "دلار",
        value: rates.USD ? rates.USD.toLocaleString("en-US") : "—",
        unit: "افغانی",
        change: "—",
        trend: "up",
      },
      {
        id: "eur",
        icon: <Euro className="w-5 h-5" />,
        title: "یورو",
        value: rates.EUR ? rates.EUR.toLocaleString("en-US") : "—",
        unit: "افغانی",
        change: "—",
        trend: "up",
      },
      {
        id: "gold-24",
        icon: <Gem className="w-5 h-5" />,
        title: "طلا ۲۴",
        value: gold24 ? gold24.toLocaleString("en-US") : "—",
        unit: "افغانی",
        change: "—",
        trend: "up",
      },
      {
        id: "gold-21",
        icon: <Gem className="w-5 h-5" />,
        title: "طلا ۲۱",
        value: gold21 ? gold21.toLocaleString("en-US") : "—",
        unit: "افغانی",
        change: "—",
        trend: "up",
      },
    ];
  }, [currencyData, goldData]);

  /* ---------------- UI ---------------- */
  return (
    <section className="space-y-6 p-4 border border-gray-300 rounded-lg bg-gray-50">

      {/* DATE & TIME */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-5 border border-secondary-200 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-xl">
              <CalendarDays className="text-primary-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-secondary-900">
                روز {weekday}، ماه {month}، سال {year}
              </h2>
              <p className="text-sm text-secondary-600 mt-1">{gregorianDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span className="text-lg font-medium font-mono">
              {isClient ? time : "00:00:00"}
            </span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* LOADING */}
      {isLoading && <ContentLoader text="در حال دریافت نرخ‌ها..." variant="wave" />}

      {/* ERROR */}
      {isError && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle size={18} />
          دریافت اطلاعات بازار ناموفق بود
        </div>
      )}

      {/* MARKET CARDS */}
      {!isLoading && !isError && marketRates.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketRates.map((rate, index) => (
            <motion.div
              key={rate.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="bg-white rounded-lg p-4 border border-gray-300 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                      {rate.icon}
                    </div>
                    <span className="font-medium">{rate.title}</span>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-emerald-50 text-emerald-700">
                    <TrendingUp className="w-3 h-3" />
                    {rate.change}
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{rate.value}</span>
                  <span className="text-sm text-secondary-500">{rate.unit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
