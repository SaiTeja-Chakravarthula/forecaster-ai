import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Activity, Bitcoin, DollarSign, Brain } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  
  const features = [
    {
      icon: BarChart3,
      title: "Stock Analysis",
      description: "Comprehensive analysis and visualization of stock market data with real-time insights.",
      link: "/stock-analysis",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Activity,
      title: "Stock Prediction",
      description: "AI-powered stock predictions with sentiment analysis from news and social media.",
      link: "/stock-prediction",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Bitcoin,
      title: "Crypto Prediction",
      description: "Cryptocurrency market predictions with advanced machine learning algorithms.",
      link: "/crypto-prediction",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: DollarSign,
      title: "Forex Prediction",
      description: "Foreign exchange market analysis and predictions for major currency pairs.",
      link: "/forex-prediction",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Brain className="w-12 h-12 text-primary mr-3" />
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                ForecasterAI
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Intelligent Multi-Agent System for Sentiment-Driven Forecasting and Investment Decision Support
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Harness the power of AI to analyze market sentiment, predict price movements, and make informed trading decisions across stocks, crypto, and forex markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Button size="lg" asChild className="text-lg px-8 py-6">
                    <Link to="/stock-analysis">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                    <Link to="/stock-prediction">View Predictions</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" asChild className="text-lg px-8 py-6">
                    <Link to="/auth">Sign Up Free</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Advanced Trading Intelligence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive suite of AI-powered tools for market analysis and prediction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="mb-6 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link to={feature.link}>Explore</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">95%</div>
              <div className="text-lg text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-lg text-muted-foreground">Assets Tracked</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-lg text-muted-foreground">Market Monitoring</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;