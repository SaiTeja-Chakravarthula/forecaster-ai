import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, DollarSign, Twitter, Newspaper, MessageCircle } from "lucide-react";

const ForexPrediction = () => {
  const [pair, setPair] = useState("");

  const handlePredict = () => {
    console.log("Predicting forex for:", pair);
  };

  // Mock forex sentiment data
  const sentimentData = [
    {
      source: "Economic News",
      icon: Newspaper,
      sentiment: "Bullish USD",
      impact: "high",
      content: "Federal Reserve signals hawkish stance, strong employment data released",
      color: "bg-green-500"
    },
    {
      source: "Central Bank",
      icon: Newspaper,
      sentiment: "Neutral EUR",
      impact: "high",
      content: "ECB maintains current policy rates, inflation concerns persist",
      color: "bg-yellow-500"
    },
    {
      source: "Twitter",
      icon: Twitter,
      sentiment: "Bearish GBP",
      impact: "medium",
      content: "Brexit trade concerns resurface, political uncertainty affects sentiment",
      color: "bg-red-500"
    },
    {
      source: "Forums",
      icon: MessageCircle,
      sentiment: "Bullish JPY",
      impact: "low",
      content: "Safe haven demand increases amid global market volatility",
      color: "bg-green-500"
    },
    {
      source: "Economic News",
      icon: Newspaper,
      sentiment: "Bullish USD",
      impact: "medium",
      content: "GDP growth exceeds expectations, strong consumer spending data",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-500" />
            Forex Prediction
          </h1>
          <p className="text-muted-foreground">AI-powered forex predictions with economic sentiment analysis</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Predict Currency Pair Movement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter currency pair (e.g., EUR/USD, GBP/JPY, USD/INR)"
                value={pair}
                onChange={(e) => setPair(e.target.value)}
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
            {/* Exchange Rate Prediction */}
            <Card>
              <CardHeader>
                <CardTitle>Exchange Rate Prediction</CardTitle>
                <CardDescription>AI model forecast for EUR/USD pair</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1.0845</div>
                    <div className="text-sm text-green-600">7-day target</div>
                    <Badge className="mt-2 bg-green-500">+1.2%</Badge>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1.0920</div>
                    <div className="text-sm text-blue-600">15-day target</div>
                    <Badge className="mt-2 bg-blue-500">+1.9%</Badge>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">1.1050</div>
                    <div className="text-sm text-purple-600">30-day target</div>
                    <Badge className="mt-2 bg-purple-500">+3.1%</Badge>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded">
                  <p className="text-muted-foreground">Forex prediction chart will be implemented</p>
                </div>
              </CardContent>
            </Card>

            {/* Economic Indicators Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Economic Indicators Analysis</CardTitle>
                <CardDescription>Model predictions based on economic fundamentals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { indicator: "LSTM Model", prediction: "Bullish EUR", confidence: "76%" },
                    { indicator: "Economic Indicators", prediction: "Neutral", confidence: "68%" },
                    { indicator: "Interest Rate Differential", prediction: "Bearish EUR", confidence: "72%" },
                    { indicator: "Ensemble", prediction: "Slightly Bullish", confidence: "71%" }
                  ].map((model, index) => (
                    <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm">{model.indicator}</div>
                      <div className="text-lg font-bold mt-1">{model.prediction}</div>
                      <div className="text-sm text-muted-foreground">{model.confidence}</div>
                    </div>
                  ))}
                </div>
                
                {/* Economic Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { metric: "USD Interest Rate", value: "5.25%", status: "positive" },
                    { metric: "EUR Interest Rate", value: "4.50%", status: "neutral" },
                    { metric: "USD Inflation", value: "3.2%", status: "negative" },
                    { metric: "EUR Inflation", value: "2.8%", status: "positive" }
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
                <CardTitle>Forex Market Sentiment</CardTitle>
                <CardDescription>Aggregated sentiment from economic data and news</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-green-600">Moderately Bullish</div>
                    <Badge className="bg-green-500">Medium Confidence</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-sm text-muted-foreground">Positive Sentiment</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">72%</div>
                    <div className="text-xs text-muted-foreground">Economic Data</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">65%</div>
                    <div className="text-xs text-muted-foreground">Central Bank Policy</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">67%</div>
                    <div className="text-xs text-muted-foreground">Market Sentiment</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sentiment Analysis Panel (4th column) */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Economic Sentiment Sources</CardTitle>
                <CardDescription>Real-time sentiment from economic indicators</CardDescription>
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

export default ForexPrediction;