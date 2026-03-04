import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/HeroSection";
import ConceptCards from "@/components/ConceptCards";
import AccountingEquation from "@/components/AccountingEquation";
import TAccountVisual from "@/components/TAccountVisual";
import TrialBalance from "@/components/TrialBalance";
import FinancialStatements from "@/components/FinancialStatements";
import DebitCreditRules from "@/components/DebitCreditRules";
import PracticeExamples from "@/components/PracticeExamples";
import InteractiveQuiz from "@/components/InteractiveQuiz";

const Index = () => (
  <div className="min-h-screen bg-background scroll-smooth">
    <StickyNav />
    <HeroSection />
    <div id="concepts"><ConceptCards /></div>
    <div id="equation"><AccountingEquation /></div>
    <div id="t-accounts"><TAccountVisual /></div>
    <div id="trial-balance"><TrialBalance /></div>
    <div id="financial-statements"><FinancialStatements /></div>
    <div id="rules"><DebitCreditRules /></div>
    <div id="practice"><PracticeExamples /></div>
    <div id="quiz"><InteractiveQuiz /></div>
    <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm">
      <p>Double-Entry Bookkeeping — A learning resource for undergraduate accounting students</p>
    </footer>
  </div>
);

export default Index;
