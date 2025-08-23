import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./components/ThemeProvider";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import StockAnalysis from "./pages/StockAnalysis";
import StockPrediction from "./pages/StockPrediction";
import CryptoPrediction from "./pages/CryptoPrediction";
import ForexPrediction from "./pages/ForexPrediction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/stock-analysis" element={
                <ProtectedRoute>
                  <StockAnalysis />
                </ProtectedRoute>
              } />
              <Route path="/stock-prediction" element={
                <ProtectedRoute>
                  <StockPrediction />
                </ProtectedRoute>
              } />
              <Route path="/crypto-prediction" element={
                <ProtectedRoute>
                  <CryptoPrediction />
                </ProtectedRoute>
              } />
              <Route path="/forex-prediction" element={
                <ProtectedRoute>
                  <ForexPrediction />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
