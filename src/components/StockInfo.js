'use client'

import { useState, useEffect } from 'react';

export default function StockInfo({ stockInfo, symbol, setSymbol, loading, error }) {
  return (
    <div className="p-6 h-full">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Stock Info</h2>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        className="w-full bg-gray-700 border border-gray-600 rounded p-2 mb-4 text-white"
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
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
          <p><span className="font-semibold">Day's Range:</span> ${stockInfo.regularMarketDayLow.toFixed(2)} - ${stockInfo.regularMarketDayHigh.toFixed(2)}</p>
          <p><span className="font-semibold">52 Week Range:</span> ${stockInfo.fiftyTwoWeekLow.toFixed(2)} - ${stockInfo.fiftyTwoWeekHigh.toFixed(2)}</p>
          <p><span className="font-semibold">Market Cap:</span> ${(stockInfo.marketCap / 1e9).toFixed(2)} B</p>
        </div>
      )}
    </div>
  );
}
