'use client'

import StockChart from "@/components/StockChart";
import StockInfo from "@/components/StockInfo";
import AIAnalysis from "@/components/AIAnalysis";
import TestYahooFinance from "@/components/TestYahooFinance";
import { useStockData } from "@/hooks/useStockData";

export default function Home() {
  const { symbol, setSymbol, stockInfo, chartData, loading, error } = useStockData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">RKPin-Finance</h1>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <StockChart chartData={chartData} symbol={symbol} setSymbol={setSymbol} loading={loading} error={error} />
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <StockInfo stockInfo={stockInfo} symbol={symbol} setSymbol={setSymbol} loading={loading} error={error} />
        </div>
        <div className="lg:col-span-3 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <AIAnalysis symbol={symbol} />
        </div>
        <div className="lg:col-span-3">
          <TestYahooFinance />
        </div>
      </main>
    </div>
  );
}
