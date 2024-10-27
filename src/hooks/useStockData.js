import { useState, useEffect } from 'react';

export function useStockData(initialSymbol = 'AAPL') {
  const [symbol, setSymbol] = useState(initialSymbol);
  const [stockInfo, setStockInfo] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch stock info
        const infoResponse = await fetch(`/api/stock?symbol=${symbol}`);
        if (!infoResponse.ok) {
          throw new Error('Failed to fetch stock info');
        }
        const infoResult = await infoResponse.json();
        setStockInfo(infoResult);

        // Fetch chart data
        const chartResponse = await fetch(`/api/stockHistory?symbol=${symbol}`);
        if (!chartResponse.ok) {
          throw new Error('Failed to fetch chart data');
        }
        const chartResult = await chartResponse.json();
        const labels = chartResult.map(item => item.date.split('T')[0]);
        const prices = chartResult.map(item => item.close);
        setChartData({
          labels,
          datasets: [
            {
              label: symbol,
              data: prices,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [symbol]);

  return { symbol, setSymbol, stockInfo, chartData, loading, error };
}
