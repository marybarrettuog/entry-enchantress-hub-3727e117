import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConceptsPage from "./pages/ConceptsPage";
import EquationPage from "./pages/EquationPage";
import RulesPage from "./pages/RulesPage";
import TAccountsPage from "./pages/TAccountsPage";
import TrialBalancePage from "./pages/TrialBalancePage";
import FinancialStatementsPage from "./pages/FinancialStatementsPage";
import FlowOfInformationPage from "./pages/FlowOfInformationPage";
import TestKnowledgePage from "./pages/TestKnowledgePage";

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
          <Route path="/concepts" element={<ConceptsPage />} />
          <Route path="/equation" element={<EquationPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/t-accounts" element={<TAccountsPage />} />
          <Route path="/trial-balance" element={<TrialBalancePage />} />
          <Route path="/financial-statements" element={<FinancialStatementsPage />} />
          <Route path="/flow-of-information" element={<FlowOfInformationPage />} />
          <Route path="/cycle-order" element={<FlowOfInformationPage />} />
          <Route path="/test-your-knowledge" element={<TestKnowledgePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
