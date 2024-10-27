'use client'

import { useState, useEffect } from 'react';

export default function StockInfo({ stockInfo, symbol, setSymbol, loading, error }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Stock Info</h2>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        className="w-full border border-gray-300 rounded p-2 mb-4"
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {stockInfo && (
        <div className="space-y-2">
          <p><span className="font-semibold">Company:</span> {stockInfo.longName}</p>
          <p><span className="font-semibold">Symbol:</span> {stockInfo.symbol}</p>
          <p><span className="font-semibold">Price:</span> ${stockInfo.regularMarketPrice.toFixed(2)}</p>
          <p>
            <span className="font-semibold">Change:</span> 
            <span className={stockInfo.regularMarketChange >= 0 ? 'text-green-600' : 'text-red-600'}>
              ${stockInfo.regularMarketChange.toFixed(2)} ({stockInfo.regularMarketChangePercent.toFixed(2)}%)
            </span>
          </p>
          <p><span className="font-semibold">Open:</span> ${stockInfo.regularMarketOpen.toFixed(2)}</p>
          <p><span className="font-semibold">Previous Close:</span> ${stockInfo.regularMarketPreviousClose.toFixed(2)}</p>
          <p><span className="font-semibold">Day&apos;s Range:</span> ${stockInfo.regularMarketDayLow.toFixed(2)} - ${stockInfo.regularMarketDayHigh.toFixed(2)}</p>
          <p><span className="font-semibold">52 Week Range:</span> ${stockInfo.fiftyTwoWeekLow.toFixed(2)} - ${stockInfo.fiftyTwoWeekHigh.toFixed(2)}</p>
          <p><span className="font-semibold">Market Cap:</span> ${(stockInfo.marketCap / 1e9).toFixed(2)} B</p>
        </div>
      )}
    </div>
  );
}
