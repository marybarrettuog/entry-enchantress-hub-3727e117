import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import YearEndAdjustmentsPage from "./pages/YearEndAdjustmentsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/year-end-adjustments" element={<YearEndAdjustmentsPage />} />
          {/* Redirect old topic routes to home */}
          <Route path="/concepts" element={<Navigate to="/" replace />} />
          <Route path="/equation" element={<Navigate to="/" replace />} />
          <Route path="/rules" element={<Navigate to="/" replace />} />
          <Route path="/t-accounts" element={<Navigate to="/" replace />} />
          <Route path="/trial-balance" element={<Navigate to="/" replace />} />
          <Route path="/financial-statements" element={<Navigate to="/" replace />} />
          <Route path="/flow-of-information" element={<Navigate to="/" replace />} />
          <Route path="/cycle-order" element={<Navigate to="/" replace />} />
          <Route path="/test-your-knowledge" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
