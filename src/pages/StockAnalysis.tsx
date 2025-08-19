import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Users, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StockSearch } from "@/components/StockSearch";
import { getStockQuote, getStockHistory, type StockQuote, type HistoricalData } from "@/lib/finance";
import { useToast } from "@/components/ui/use-toast";

const StockAnalysis = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [stockData, setStockData] = useState<StockQuote | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSymbolSelect = async (symbol: string, name: string) => {
    setSelectedSymbol(symbol);
    setIsLoading(true);
    
    try {
      const [quote, history] = await Promise.all([
        getStockQuote(symbol),
        getStockHistory(symbol, 'daily')
      ]);
      
      setStockData(quote);
      setHistoricalData(history.slice(-30)); // Last 30 days
      
      toast({
        title: "Data Updated",
        description: `Successfully loaded data for ${symbol}`,
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch stock data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load default symbol on mount
  useEffect(() => {
    handleSymbolSelect('AAPL', 'Apple Inc.');
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
    return volume.toString();
  };

  const formatMarketCap = (marketCap: string) => {
    if (marketCap === 'N/A') return 'N/A';
    const num = parseFloat(marketCap);
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Stock Analysis</h1>
          <p className="text-muted-foreground">Comprehensive analysis and visualization of stock market data</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Analyze Stocks</CardTitle>
            <CardDescription>Enter a stock symbol or company name to get real-time data and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <StockSearch 
              onSymbolSelect={handleSymbolSelect}
              placeholder="Search for stocks (e.g., Apple, AAPL, Microsoft)"
            />
          </CardContent>
        </Card>

        {/* Stock Overview */}
        {selectedSymbol && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Current Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ) : stockData ? (
                  <>
                    <div className="text-2xl font-bold">{formatPrice(stockData.price)}</div>
                    <div className="flex items-center mt-1">
                      {stockData.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${stockData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stockData.change >= 0 ? '+' : ''}{formatPrice(stockData.change)} ({stockData.changePercent}%)
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stockData.name}</div>
                  </>
                ) : (
                  <div className="text-muted-foreground">No data available</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ) : stockData ? (
                  <>
                    <div className="text-2xl font-bold">{formatVolume(stockData.volume)}</div>
                    <Badge variant="secondary" className="mt-2">
                      <Activity className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </>
                ) : (
                  <div className="text-muted-foreground">N/A</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Market Cap
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ) : stockData ? (
                  <>
                    <div className="text-2xl font-bold">{formatMarketCap(stockData.marketCap)}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stockData.sector}</div>
                  </>
                ) : (
                  <div className="text-muted-foreground">N/A</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  P/E Ratio
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ) : stockData ? (
                  <>
                    <div className="text-2xl font-bold">{stockData.peRatio}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      High: {formatPrice(stockData.high)}
                    </div>
                  </>
                ) : (
                  <div className="text-muted-foreground">N/A</div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts Section */}
        {selectedSymbol && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Price Chart (30 Days)</CardTitle>
                <CardDescription>Historical price movement over time</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <Skeleton className="h-64 w-full" />
                  </div>
                ) : historicalData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip 
                          labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          formatter={(value: number) => [formatPrice(value), 'Close Price']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="close" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                    <p className="text-muted-foreground">No chart data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Volume Analysis</CardTitle>
                <CardDescription>Trading volume trends and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <Skeleton className="h-64 w-full" />
                  </div>
                ) : historicalData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis tickFormatter={formatVolume} />
                        <Tooltip 
                          labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          formatter={(value: number) => [formatVolume(value), 'Volume']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="volume" 
                          stroke="hsl(var(--secondary))" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                    <p className="text-muted-foreground">No volume data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Technical Indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Indicators</CardTitle>
            <CardDescription>Key technical analysis metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "RSI", value: "65.4", status: "neutral" },
                { name: "MACD", value: "1.25", status: "bullish" },
                { name: "SMA 50", value: "172.80", status: "bullish" },
                { name: "SMA 200", value: "165.20", status: "bullish" },
                { name: "Bollinger", value: "Upper", status: "neutral" }
              ].map((indicator, index) => (
                <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="font-semibold text-sm text-muted-foreground">{indicator.name}</div>
                  <div className="text-lg font-bold mt-1">{indicator.value}</div>
                  <Badge 
                    variant={indicator.status === "bullish" ? "default" : indicator.status === "bearish" ? "destructive" : "secondary"}
                    className="mt-2"
                  >
                    {indicator.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockAnalysis;