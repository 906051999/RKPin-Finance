'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StockChart({ chartData, symbol, setSymbol, loading, error }) {
  return (
    <div className="p-6 h-full">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Stock Chart</h2>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        className="w-full bg-gray-700 border border-gray-600 rounded p-2 mb-4 text-white"
        placeholder="Enter stock symbol"
      />
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {chartData && (
        <div style={{ height: '400px' }}>
          <Line data={chartData} options={{ 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: 'white'
                }
              }
            },
            scales: {
              x: {
                ticks: { color: 'white' }
              },
              y: {
                ticks: { color: 'white' }
              }
            }
          }} />
        </div>
      )}
      {!loading && !error && !chartData && (
        <p className="text-white">No chart data available. Please enter a valid stock symbol.</p>
      )}
    </div>
  );
}
