import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

const StockAnalysis = () => {
  const [symbol, setSymbol] = useState("");
  
  // Mock data for demonstration
  const mockData = {
    symbol: "AAPL",
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: "45.2M",
    marketCap: "2.8T",
    pe: 28.5,
    dividend: 0.94
  };

  const handleSearch = () => {
    // Search functionality will be implemented later
    console.log("Searching for:", symbol);
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
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter stock symbol (e.g., AAPL, TSLA, MSFT)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stock Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockData.price}</div>
              <div className="flex items-center mt-1">
                {mockData.change > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${mockData.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${mockData.change} ({mockData.changePercent}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.volume}</div>
              <Badge variant="secondary" className="mt-2">
                <Activity className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.marketCap}</div>
              <div className="text-sm text-muted-foreground mt-1">Large Cap</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">P/E Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.pe}</div>
              <div className="text-sm text-muted-foreground mt-1">Dividend: {mockData.dividend}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Price Chart</CardTitle>
              <CardDescription>Historical price movement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded">
                <p className="text-muted-foreground">Chart will be implemented with real data</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volume Analysis</CardTitle>
              <CardDescription>Trading volume trends and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded">
                <p className="text-muted-foreground">Volume chart will be implemented</p>
              </div>
            </CardContent>
          </Card>
        </div>

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