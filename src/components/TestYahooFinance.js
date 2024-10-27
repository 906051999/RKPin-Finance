'use client'

import { useState } from 'react';

export default function TestYahooFinance() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testYahooFinance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/stock?symbol=AAPL');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${errorText}`);
      }
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error in testYahooFinance:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Test Yahoo Finance</h2>
      <button
        onClick={testYahooFinance}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 mb-4"
      >
        Test Yahoo Finance API
      </button>
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      {result && (
        <pre className="bg-gray-700 text-white p-4 rounded overflow-auto max-h-96">
          {result}
        </pre>
      )}
    </div>
  );
}
