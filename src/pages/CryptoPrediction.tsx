import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Bitcoin, Twitter, Newspaper, MessageCircle } from "lucide-react";

const CryptoPrediction = () => {
  const [symbol, setSymbol] = useState("");

  const handlePredict = () => {
    console.log("Predicting crypto for:", symbol);
  };

  // Mock crypto sentiment data
  const sentimentData = [
    {
      source: "Twitter",
      icon: Twitter,
      sentiment: "Bullish",
      impact: "high",
      content: "Major institutional adoption announcement, whale accumulation detected",
      color: "bg-green-500"
    },
    {
      source: "News",
      icon: Newspaper,
      sentiment: "Bullish",
      impact: "high",
      content: "New regulatory clarity in major markets, positive ETF developments",
      color: "bg-green-500"
    },
    {
      source: "Forums",
      icon: MessageCircle,
      sentiment: "Neutral",
      impact: "medium",
      content: "Mixed opinions on recent market volatility and mining updates",
      color: "bg-yellow-500"
    },
    {
      source: "Twitter",
      icon: Twitter,
      sentiment: "Bearish",
      impact: "low",
      content: "Some concerns about energy consumption and environmental impact",
      color: "bg-red-500"
    },
    {
      source: "News",
      icon: Newspaper,
      sentiment: "Bullish",
      impact: "medium",
      content: "Lightning network adoption increasing, scalability improvements",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Bitcoin className="w-8 h-8 text-orange-500" />
            Crypto Prediction
          </h1>
          <p className="text-muted-foreground">AI-powered cryptocurrency predictions with sentiment analysis</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Predict Cryptocurrency Movement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter crypto symbol (e.g., BTC, ETH, ADA)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handlePredict}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Predict
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Prediction Sections (First 3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Price Prediction */}
            <Card>
              <CardHeader>
                <CardTitle>Crypto Price Prediction</CardTitle>
                <CardDescription>AI model forecast for Bitcoin (BTC/USD)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">$48,250</div>
                    <div className="text-sm text-orange-600">7-day target</div>
                    <Badge className="mt-2 bg-orange-500">+8.2%</Badge>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$52,100</div>
                    <div className="text-sm text-blue-600">15-day target</div>
                    <Badge className="mt-2 bg-blue-500">+16.9%</Badge>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">$58,750</div>
                    <div className="text-sm text-purple-600">30-day target</div>
                    <Badge className="mt-2 bg-purple-500">+31.8%</Badge>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded">
                  <p className="text-muted-foreground">Crypto prediction chart will be implemented</p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Crypto Technical Analysis</CardTitle>
                <CardDescription>Model predictions based on blockchain and technical indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { indicator: "LSTM Model", prediction: "Bullish", confidence: "89%" },
                    { indicator: "On-Chain Analysis", prediction: "Bullish", confidence: "82%" },
                    { indicator: "Prophet", prediction: "Bullish", confidence: "76%" },
                    { indicator: "Ensemble", prediction: "Bullish", confidence: "85%" }
                  ].map((model, index) => (
                    <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm">{model.indicator}</div>
                      <div className="text-lg font-bold mt-1">{model.prediction}</div>
                      <div className="text-sm text-muted-foreground">{model.confidence}</div>
                    </div>
                  ))}
                </div>
                
                {/* On-Chain Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { metric: "Hash Rate", value: "Increasing", status: "positive" },
                    { metric: "Active Addresses", value: "Growing", status: "positive" },
                    { metric: "Exchange Outflow", value: "High", status: "positive" },
                    { metric: "Fear & Greed", value: "Greed (75)", status: "neutral" }
                  ].map((metric, index) => (
                    <div key={index} className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="font-semibold text-sm">{metric.metric}</div>
                      <div className="text-sm font-bold mt-1">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Sentiment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Crypto Market Sentiment</CardTitle>
                <CardDescription>Aggregated sentiment from crypto community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-green-600">Very Bullish</div>
                    <Badge className="bg-green-500">High Confidence</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">84%</div>
                    <div className="text-sm text-muted-foreground">Positive Sentiment</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">65%</div>
                    <div className="text-xs text-muted-foreground">Social Media</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">78%</div>
                    <div className="text-xs text-muted-foreground">News Coverage</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">91%</div>
                    <div className="text-xs text-muted-foreground">Developer Activity</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sentiment Analysis Panel (4th column) */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Crypto Sentiment Sources</CardTitle>
                <CardDescription>Real-time sentiment from crypto community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sentimentData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        item.impact === 'high' 
                          ? 'border-l-red-500 bg-red-50 dark:bg-red-950/20' 
                          : item.impact === 'medium'
                          ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                          : 'border-l-green-500 bg-green-50 dark:bg-green-950/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4" />
                        <span className="font-semibold text-sm">{item.source}</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${item.color} text-white border-0`}
                        >
                          {item.sentiment}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          {item.impact} impact
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPrediction;