// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import CurrencySection from './components/CurrencySection';
import JewelrySection from './components/JewelrySection';
import TabSwitcher from './components/TabSwitcher';
import RefreshButton from './components/RefreshButton';
import Footer from './components/Footer';
import { Currency, Jewelry } from '@/types/market-rates/rates';

export default function Home() {
    const [activeTab, setActiveTab] = useState<'currencies' | 'jewelries'>('currencies');
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [jewelries, setJewelries] = useState<Jewelry[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // بارگذاری داده‌های اولیه
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = () => {
        // داده‌های نمونه - در واقعیت از API دریافت می‌شود
        const initialCurrencies: Currency[] = [
            { id: 1, name: 'دلار آمریکا', code: 'USD', rate: 58000, change: 0.8, flag: '🇺🇸' },
            { id: 2, name: 'یورو', code: 'EUR', rate: 62000, change: -0.3, flag: '🇪🇺' },
            { id: 3, name: 'پوند انگلیس', code: 'GBP', rate: 73000, change: 1.2, flag: '🇬🇧' },
            { id: 4, name: 'ین ژاپن', code: 'JPY', rate: 390, change: 0.5, flag: '🇯🇵' },
            { id: 5, name: 'درهم امارات', code: 'AED', rate: 15800, change: -0.7, flag: '🇦🇪' },
            { id: 6, name: 'لیر ترکیه', code: 'TRY', rate: 1800, change: 2.1, flag: '🇹🇷' },
        ];

        const initialJewelries: Jewelry[] = [
            { id: 1, name: 'طلا', purity: 24, pricePerGram: 3800000, change: 1.5, color: '#FFD700' },
            { id: 2, name: 'طلا', purity: 22, pricePerGram: 3480000, change: 1.4, color: '#E6BE8A' },
            { id: 3, name: 'طلا', purity: 18, pricePerGram: 2850000, change: 1.2, color: '#DAA520' },
            { id: 4, name: 'طلا', purity: 14, pricePerGram: 2220000, change: 0.9, color: '#B8860B' },
            { id: 5, name: 'طلا', purity: 10, pricePerGram: 1580000, change: 0.7, color: '#8B7500' },
            { id: 6, name: 'طلای دست دوم', purity: 24, pricePerGram: 3700000, change: 1.3, color: '#CDAD00' },
        ];

        setCurrencies(initialCurrencies);
        setJewelries(initialJewelries);
    };

    const handleRefresh = async () => {
        setIsLoading(true);

        // شبیه‌سازی درخواست API
        setTimeout(() => {
            const updatedCurrencies = currencies.map(currency => ({
                ...currency,
                rate: currency.rate + (Math.random() > 0.5 ? 100 : -100),
                change: parseFloat((Math.random() * 2 - 1).toFixed(1))
            }));

            const updatedJewelries = jewelries.map(jewelry => ({
                ...jewelry,
                pricePerGram: jewelry.pricePerGram + (Math.random() > 0.5 ? 50000 : -50000),
                change: parseFloat((Math.random() * 2 - 0.5).toFixed(1))
            }));

            setCurrencies(updatedCurrencies);
            setJewelries(updatedJewelries);
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-white border border-gray-200 rounded-lg p-4 md:p-6">
            <Header />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 md:p-6 rounded-md bg-gradient-to-r from-blue-50 to-cyan-50">
                <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
                <RefreshButton isLoading={isLoading} onRefresh={handleRefresh} />
            </div>

            <main className="grid grid-cols-1 gap-6">
                {activeTab === 'currencies' && (
                    <CurrencySection currencies={currencies} />
                )}

                {activeTab === 'jewelries' && (
                    <JewelrySection jewelries={jewelries} />
                )}
            </main>


            <Footer />
        </div>
    );
}