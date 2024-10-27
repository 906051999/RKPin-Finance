import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  let retries = 3;
  while (retries > 0) {
    try {
      console.log(`Fetching data for symbol: ${symbol}`);
      const result = await yahooFinance.quoteSummary(symbol, { modules: ['price', 'summaryDetail'] });
      console.log('Successfully fetched data:', result);
      
      // 处理并返回所需的数据
      const processedResult = {
        symbol: result.price.symbol,
        regularMarketPrice: result.price.regularMarketPrice,
        regularMarketChange: result.price.regularMarketChange,
        regularMarketChangePercent: result.price.regularMarketChangePercent,
        regularMarketOpen: result.price.regularMarketOpen,
        regularMarketDayHigh: result.price.regularMarketDayHigh,
        regularMarketDayLow: result.price.regularMarketDayLow,
        regularMarketVolume: result.price.regularMarketVolume,
        marketCap: result.price.marketCap,
        fiftyTwoWeekHigh: result.summaryDetail.fiftyTwoWeekHigh,
        fiftyTwoWeekLow: result.summaryDetail.fiftyTwoWeekLow,
      };

      return NextResponse.json(processedResult);
    } catch (error) {
      console.error(`Error fetching stock data (attempt ${4 - retries}/3):`, error);
      retries--;
      if (retries === 0) {
        return NextResponse.json({ error: `Failed to fetch stock data: ${error.message}` }, { status: 500 });
      }
      await delay(1000); // 等待1秒后重试
    }
  }
}
