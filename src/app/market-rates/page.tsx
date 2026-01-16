'use client';

import { useState, useMemo } from 'react';
import Header from './components/Header/Header';
import CurrencySection from './components/currency-section/CurrencySection';
import JewelrySection from './components/jewelry-section/JewelrySection';
import TabSwitcher from './components/TabSwitcher';
import RefreshButton from './components/RefreshButton';
import Footer from './components/Footer';

import { Currency, Jewelry, CurrencyApiResponse, GoldApiResponse } from '@/types/market-rates/rates';
import { useApiGet } from '@/hooks/useApi';
import { MARKET_RATE } from '@/endpoints/market-rate';
import { currencyNames, currencyFlags } from './constants/currencies';

import { ContentLoader } from '@/components/loading/DataLoading';
import EmptyState, { EmptyData } from '@/components/empty/EmptyData';

export default function Home() {
    const [activeTab, setActiveTab] =
        useState<'currencies' | 'jewelries'>('currencies');

    // 🔹 Currency API
    const {
        data: currencyApiData,
        isFetching: isCurrencyLoading,
        isError: isCurrencyError,
        refetch: refetchCurrencies,
    } = useApiGet<CurrencyApiResponse>(
        'live-currencies',
        MARKET_RATE.currency,
        { enabled: activeTab === 'currencies' }
    );

    // 🔹 Normalize currencies
    const currencies: Currency[] = useMemo(() => {
        if (!currencyApiData) return [];

        return Object.entries(currencyApiData.rates_to_afn).map(
            ([code, rate], index) => ({
                id: index + 1,
                name: currencyNames[code] ?? code,
                code,
                rate,
                change: 0,
                flag: currencyFlags[code] ?? '🏳️',
            })
        );
    }, [currencyApiData]);

    // 🔹 Gold API
    const {
        data: goldApiData,
        isFetching: isGoldLoading,
        isError: isGoldError,
        refetch: refetchGold,
    } = useApiGet<GoldApiResponse>(
        "live-gold",
        MARKET_RATE.gold,
        { enabled: activeTab === "jewelries" }
    );

    const jewelries: Jewelry[] = useMemo(() => {
        if (!goldApiData) return [];

        return Object.entries(goldApiData.gold_price_per_gram_afn).map(
            ([karat, price], index) => ({
                id: index + 1,
                name: `طلای ${karat.replace("K", "")}`,
                purity: Number(karat.replace("K", "")),
                pricePerGram: price,
                change: 0,
                color: "gold",
            })
        );
    }, [goldApiData]);



    const isLoading = isCurrencyLoading || isGoldLoading;

    const handleRefresh = () => {
        activeTab === 'currencies'
            ? refetchCurrencies()
            : refetchGold();
    };

    return (
        <div className="min-h-screen bg-white border border-gray-200 rounded-lg p-4 md:p-6">
            <Header />

            <div className="flex flex-col sm:flex-row justify-center md:justify-between items-center gap-4 mb-8 p-4 md:p-6 rounded-md bg-gradient-to-r from-blue-50 to-cyan-50">
                <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
                <RefreshButton isLoading={isLoading} onRefresh={handleRefresh} />
            </div>

            <main className="grid grid-cols-1 gap-6">
                {/* ---------- CURRENCIES ---------- */}
                {activeTab === 'currencies' && (
                    <>
                        {isCurrencyLoading && (
                            <ContentLoader text="در حال دریافت نرخ اسعار..." variant="wave" />
                        )}

                        {isCurrencyError && (
                            <EmptyState
                                title="خطا در دریافت نرخ ارز"
                                description="ارتباط با سرور برقرار نشد."
                                action={
                                    <button
                                        onClick={() => refetchCurrencies()}
                                        className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm"
                                    >
                                        تلاش مجدد
                                    </button>

                                }
                            />
                        )}

                        {!isCurrencyLoading &&
                            !isCurrencyError &&
                            currencies.length === 0 && (
                                <EmptyData
                                    title="نرخ ارزی موجود نیست"
                                    description="داده‌ای برای نمایش وجود ندارد."
                                />
                            )}

                        {!isCurrencyLoading &&
                            !isCurrencyError &&
                            currencies.length > 0 && (
                                <CurrencySection currencies={currencies} />
                            )}
                    </>
                )}

                {/* ---------- JEWELRIES ---------- */}
                {activeTab === 'jewelries' && (
                    <>
                        {isGoldLoading && (
                            <ContentLoader text="در حال دریافت نرخ طلا..." variant="wave" />
                        )}

                        {isGoldError && (
                            <EmptyState
                                title="خطا در دریافت نرخ طلا"
                                description="دریافت اطلاعات ناموفق بود."
                                action={
                                    <button
                                        onClick={() => refetchGold()}
                                        className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm"
                                    >
                                        تلاش مجدد
                                    </button>

                                }
                            />
                        )}

                        {!isGoldLoading &&
                            !isGoldError &&
                            jewelries.length === 0 && (
                                <EmptyData
                                    title="قیمت طلایی موجود نیست"
                                    description="اطلاعاتی برای نمایش وجود ندارد."
                                />
                            )}

                        {!isGoldLoading &&
                            !isGoldError &&
                            jewelries.length > 0 && (
                                <JewelrySection jewelries={jewelries} />
                            )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
