import HeroSection from "@/components/HeroSection";
import ConceptCards from "@/components/ConceptCards";
import AccountingEquation from "@/components/AccountingEquation";
import TAccountVisual from "@/components/TAccountVisual";
import DebitCreditRules from "@/components/DebitCreditRules";
import PracticeExamples from "@/components/PracticeExamples";
import InteractiveQuiz from "@/components/InteractiveQuiz";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <ConceptCards />
    <AccountingEquation />
    <TAccountVisual />
    <DebitCreditRules />
    <PracticeExamples />
    <InteractiveQuiz />
    <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm">
      <p>Double-Entry Bookkeeping — A learning resource for undergraduate accounting students</p>
    </footer>
  </div>
);

export default Index;
