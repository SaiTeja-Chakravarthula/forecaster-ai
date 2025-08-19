import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, TrendingUp } from "lucide-react";
import { searchStocks, type StockSearchResult } from "@/lib/finance";
import { useToast } from "@/components/ui/use-toast";

interface StockSearchProps {
  onSymbolSelect: (symbol: string, name: string) => void;
  placeholder?: string;
  className?: string;
}

export const StockSearch = ({ onSymbolSelect, placeholder = "Search stocks...", className }: StockSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        try {
          console.log('Searching for:', query);
          const searchResults = await searchStocks(query);
          setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
          toast({
            title: "Search Error",
            description: "Failed to search stocks. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, toast]);

  const handleSelect = (result: StockSearchResult) => {
    setQuery(result.symbol);
    setShowResults(false);
    onSymbolSelect(result.symbol, result.name);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            onFocus={() => query.length >= 2 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
        </div>
        <Button 
          onClick={() => query && onSymbolSelect(query, query)}
          disabled={!query || isSearching}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Analyze
        </Button>
      </div>

      {showResults && (results.length > 0 || isSearching) && (
        <Card className="absolute top-12 left-0 right-0 z-50 max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : (
            <div className="p-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                  onMouseDown={() => handleSelect(result)}
                >
                  <div>
                    <div className="font-medium">{result.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-xs">
                      {result.name}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {result.type} • {result.region}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};