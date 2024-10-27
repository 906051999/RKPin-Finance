'use client'

import { useState } from 'react';

export default function AIAnalysis() {
  const [analysis, setAnalysis] = useState('');
  const [symbol, setSymbol] = useState('');

  const handleAnalysis = async () => {
    // 这里应该调用智谱 AI 的 API
    // 由于我们没有具体的 API 调用方法，这里用一个模拟的响应
    setAnalysis(`AI analysis for ${symbol}: This is a placeholder for the AI-generated analysis.`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AI Analysis</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="flex-grow bg-gray-700 border border-gray-600 rounded p-2 text-white"
          placeholder="Enter stock symbol"
        />
        <button
          onClick={handleAnalysis}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Analyze
        </button>
      </div>
      {analysis && <p className="mt-4 p-4 bg-gray-700 rounded">{analysis}</p>}
    </div>
  );
}
