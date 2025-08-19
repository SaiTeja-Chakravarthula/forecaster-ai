import { supabase } from "@/integrations/supabase/client";

export interface StockSearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
}

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  volume: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  marketCap: string;
  peRatio: string;
  name: string;
  sector: string;
  industry: string;
  description: string;
}

export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const searchStocks = async (query: string): Promise<StockSearchResult[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('finance-search', {
      body: { query }
    });

    if (error) throw error;
    return data.results || [];
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
};

export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    const { data, error } = await supabase.functions.invoke('finance-quote', {
      body: { symbol }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

export const getStockHistory = async (symbol: string, period: 'daily' | 'weekly' | 'monthly' | 'intraday' = 'daily'): Promise<HistoricalData[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('finance-history', {
      body: { symbol, period }
    });

    if (error) throw error;
    return data.data || [];
  } catch (error) {
    console.error('Error fetching stock history:', error);
    throw error;
  }
};