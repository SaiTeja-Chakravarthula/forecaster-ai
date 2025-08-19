import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbol, period = 'daily' } = await req.json();
    
    if (!symbol) {
      return new Response(JSON.stringify({ error: 'Symbol parameter is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('ALPHA_VANTAGE_API_KEY');
    if (!apiKey) {
      throw new Error('Alpha Vantage API key not configured');
    }

    let functionName = 'TIME_SERIES_DAILY';
    if (period === 'intraday') {
      functionName = 'TIME_SERIES_INTRADAY&interval=5min';
    } else if (period === 'weekly') {
      functionName = 'TIME_SERIES_WEEKLY';
    } else if (period === 'monthly') {
      functionName = 'TIME_SERIES_MONTHLY';
    }

    const url = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}&apikey=${apiKey}`;
    
    console.log('Fetching historical data for symbol:', symbol, 'period:', period);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    if (data['Note']) {
      throw new Error('API rate limit reached. Please try again later.');
    }

    let timeSeriesKey = 'Time Series (Daily)';
    if (period === 'intraday') {
      timeSeriesKey = 'Time Series (5min)';
    } else if (period === 'weekly') {
      timeSeriesKey = 'Weekly Time Series';
    } else if (period === 'monthly') {
      timeSeriesKey = 'Monthly Time Series';
    }

    const timeSeries = data[timeSeriesKey];
    if (!timeSeries) {
      throw new Error('No historical data available for this symbol');
    }

    const chartData = Object.entries(timeSeries)
      .slice(0, 100) // Limit to last 100 data points
      .map(([date, values]: [string, any]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'])
      }))
      .reverse(); // Reverse to get chronological order

    return new Response(JSON.stringify({ data: chartData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in finance-history function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});