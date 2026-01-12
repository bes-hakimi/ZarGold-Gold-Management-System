"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  DollarSign,
  Euro,
  Gem,
  CalendarDays,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { getAfghanDate } from "@/lib/afghan-date";
import { PrimaryButton } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function MarketSummaryHeader() {
  const [now, setNow] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const afghanDate = getAfghanDate(now);
  const { weekday, month, year } = afghanDate;

  const gregorianDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = now.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const marketRates = [
    {
      id: 1,
      icon: <DollarSign className="w-5 h-5" />,
      title: "دلار",
      value: "۷۴٫۲۰",
      unit: "افغانی",
      change: "+۰.۲٪",
      trend: "up",
    },
    {
      id: 2,
      icon: <Euro className="w-5 h-5" />,
      title: "یورو",
      value: "۸۰٫۱۰",
      unit: "افغانی",
      change: "+۰.۵٪",
      trend: "up",
    },
    {
      id: 3,
      icon: <Gem className="w-5 h-5" />,
      title: "طلا ۲۴",
      value: "۴٬۸۰۰",
      unit: "افغانی",
      change: "+۱.۲٪",
      trend: "up",
    },
    {
      id: 4,
      icon: <Gem className="w-5 h-5" />,
      title: "طلا ۲۱",
      value: "۴٬۲۰۰",
      unit: "افغانی",
      change: "+۰.۸٪",
      trend: "up",
    },
  ];

  return (
    <section className="space-y-6 p-4 border border-gray-300 rounded-lg bg-gray-50 ">
      {/* هدر تاریخ و زمان */}
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
              <p className="text-sm text-secondary-600 mt-1">
                {gregorianDate}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="text-secondary-500" size={18} />
            <span className="text-lg font-medium text-secondary-900 font-mono">
              {isClient ? time : "۰۰:۰۰:۰۰"}
            </span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </motion.div>

      {/* کارت‌های نرخ‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketRates.map((rate, index) => (
          <motion.div
            key={rate.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="bg-white rounded-lg p-4 border border-secondary-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <div className="text-primary-600">
                      {rate.icon}
                    </div>
                  </div>
                  <span className="font-medium text-secondary-800">
                    {rate.title}
                  </span>
                </div>
                
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                  rate.trend === "up" 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "bg-red-50 text-red-700"
                }`}>
                  {rate.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : null}
                  {rate.change}
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-secondary-900">
                  {rate.value}
                </span>
                <span className="text-sm text-secondary-500">
                  {rate.unit}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* دکمه مشاهده همه */}
      {/* <div className="flex justify-end pt-2">
        <PrimaryButton
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="right"
          size="md"
          className="shadow-sm hover:shadow"
        >
          <Link href="/dashboard/market-rates">
            مشاهده همه نرخ‌ها
          </Link>
        </PrimaryButton>
      </div> */}
    </section>
  );
}