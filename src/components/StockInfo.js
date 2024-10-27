'use client'

import { useState, useEffect } from 'react';

export default function StockInfo({ stockInfo, symbol, setSymbol, loading, error }) {
  const formatNumber = (num) => {
    return num !== undefined ? num.toFixed(2) : 'N/A';
  };

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
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {stockInfo && (
        <div className="space-y-2">
          <p><span className="font-semibold">Company:</span> {stockInfo.longName || 'N/A'}</p>
          <p><span className="font-semibold">Symbol:</span> {stockInfo.symbol || 'N/A'}</p>
          <p><span className="font-semibold">Price:</span> ${formatNumber(stockInfo.regularMarketPrice)}</p>
          <p>
            <span className="font-semibold">Change:</span> 
            <span className={stockInfo.regularMarketChange >= 0 ? 'text-green-600' : 'text-red-600'}>
              ${formatNumber(stockInfo.regularMarketChange)} ({formatNumber(stockInfo.regularMarketChangePercent)}%)
            </span>
          </p>
          <p><span className="font-semibold">Open:</span> ${formatNumber(stockInfo.regularMarketOpen)}</p>
          <p><span className="font-semibold">Previous Close:</span> ${formatNumber(stockInfo.regularMarketPreviousClose)}</p>
          <p><span className="font-semibold">Day&apos;s Range:</span> ${formatNumber(stockInfo.regularMarketDayLow)} - ${formatNumber(stockInfo.regularMarketDayHigh)}</p>
          <p><span className="font-semibold">52 Week Range:</span> ${formatNumber(stockInfo.fiftyTwoWeekLow)} - ${formatNumber(stockInfo.fiftyTwoWeekHigh)}</p>
          <p><span className="font-semibold">Market Cap:</span> ${stockInfo.marketCap ? `${(stockInfo.marketCap / 1e9).toFixed(2)} B` : 'N/A'}</p>
        </div>
      )}
      {!loading && !error && !stockInfo && (
        <p className="text-gray-600">No stock information available. Please enter a valid stock symbol.</p>
      )}
    </div>
  );
}
