import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { TrendingUp, BarChart3, Activity, Bitcoin, DollarSign } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: TrendingUp },
    { path: "/stock-analysis", label: "Stock Analysis", icon: BarChart3 },
    { path: "/stock-prediction", label: "Stock Prediction", icon: Activity },
    { path: "/crypto-prediction", label: "Crypto Prediction", icon: Bitcoin },
    { path: "/forex-prediction", label: "Forex Prediction", icon: DollarSign },
  ];

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-primary">
              ForecasterAI
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;