import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const period = searchParams.get('period') || '1y'; // 默认获取1年数据

  if (!symbol) {
    return NextResponse.json({ error: '股票代码是必需的' }, { status: 400 });
  }

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1); // 默认获取1年数据

    switch(period) {
      case '1m':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case '3m':
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case '6m':
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case '1y':
        // 默认情况，不需要改变
        break;
      case '5y':
        startDate.setFullYear(endDate.getFullYear() - 5);
        break;
      default:
        // 使用默认的1年
    }

    const result = await yahooFinance.historical(symbol, { 
      period1: startDate.toISOString().split('T')[0],
      period2: endDate.toISOString().split('T')[0]
    });

    // 对数据进行处理，只返回必要的信息
    const processedResult = result.map(item => ({
      date: item.date,
      close: item.close,
      volume: item.volume
    }));

    return NextResponse.json(processedResult);
  } catch (error) {
    console.error('获取历史股票数据时出错:', error);
    return NextResponse.json({ error: '获取历史股票数据失败' }, { status: 500 });
  }
}
