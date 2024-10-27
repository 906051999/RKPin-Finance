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
      setStockInfo(null);
      setChartData(null);

      if (!symbol.trim()) {
        setError('请输入有效的股票代码');
        setLoading(false);
        return;
      }

      try {
        // Fetch stock info
        const infoResponse = await fetch(`/api/stock?symbol=${symbol}`);
        if (!infoResponse.ok) {
          throw new Error(`获取股票信息失败: ${infoResponse.statusText}`);
        }
        const infoResult = await infoResponse.json();
        if (infoResult.error) {
          throw new Error(infoResult.error);
        }
        setStockInfo(infoResult);

        // Fetch chart data
        const chartResponse = await fetch(`/api/stockHistory?symbol=${symbol}`);
        if (!chartResponse.ok) {
          throw new Error(`获取图表数据失败: ${chartResponse.statusText}`);
        }
        const chartResult = await chartResponse.json();
        if (chartResult.error) {
          throw new Error(chartResult.error);
        }
        if (chartResult.length === 0) {
          throw new Error('没有可用的历史数据');
        }
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
        console.error('获取数据时出错:', error);
        setError(error.message || '获取数据失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [symbol]);

  return { symbol, setSymbol, stockInfo, chartData, loading, error };
}
