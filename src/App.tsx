import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConceptsPage from "./pages/ConceptsPage";
import EquationPage from "./pages/EquationPage";
import RulesPage from "./pages/RulesPage";
import TAccountsPage from "./pages/TAccountsPage";
import TrialBalancePage from "./pages/TrialBalancePage";
import FinancialStatementsPage from "./pages/FinancialStatementsPage";
import CycleOrderPage from "./pages/CycleOrderPage";
import ClassificationQuizPage from "./pages/ClassificationQuizPage";
import PracticePage from "./pages/PracticePage";
import QuizPage from "./pages/QuizPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/concepts" element={<ConceptsPage />} />
          <Route path="/equation" element={<EquationPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/t-accounts" element={<TAccountsPage />} />
          <Route path="/trial-balance" element={<TrialBalancePage />} />
          <Route path="/financial-statements" element={<FinancialStatementsPage />} />
          <Route path="/cycle-order" element={<CycleOrderPage />} />
          <Route path="/classification-quiz" element={<ClassificationQuizPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
