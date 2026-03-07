import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import StickyNav from "@/components/StickyNav";
import ConceptCards from "@/components/ConceptCards";
import AccountingEquation from "@/components/AccountingEquation";
import DebitCreditRules from "@/components/DebitCreditRules";
import TAccountVisual from "@/components/TAccountVisual";
import TrialBalance from "@/components/TrialBalance";
import FinancialStatements from "@/components/FinancialStatements";
import FlowOfInformation from "@/components/FlowOfInformation";
import AccountingCycleOrder from "@/components/AccountingCycleOrder";
import ClassificationQuiz from "@/components/ClassificationQuiz";
import PracticeExamples from "@/components/PracticeExamples";
import InteractiveQuiz from "@/components/InteractiveQuiz";
import {
  BookOpen, Scale, CreditCard, LayoutGrid, ClipboardList,
  FileText, ArrowRightLeft, BrainCircuit, ChevronDown,
} from "lucide-react";

const topics = [
  { id: "concepts", icon: BookOpen, title: "Core Concepts", desc: "Assets, liabilities, equity, revenue & expenses", content: <ConceptCards /> },
  { id: "equation", icon: Scale, title: "The Accounting Equation", desc: "Assets = Liabilities + Equity", content: <AccountingEquation /> },
  { id: "rules", icon: CreditCard, title: "Debit & Credit Rules", desc: "When to debit, when to credit", content: <DebitCreditRules /> },
  { id: "t-accounts", icon: LayoutGrid, title: "T-Accounts", desc: "Visualise debits and credits", content: <TAccountVisual /> },
  { id: "trial-balance", icon: ClipboardList, title: "Trial Balance", desc: "Check your books balance", content: <TrialBalance /> },
  { id: "financial-statements", icon: FileText, title: "Financial Statements", desc: "Statement of profit or loss & statement of financial position", content: <FinancialStatements /> },
  { id: "flow-of-information", icon: ArrowRightLeft, title: "Flow of Information", desc: "From transaction to financial statements", content: <FlowOfInformation /> },
  {
    id: "test-your-knowledge", icon: BrainCircuit, title: "Test Your Knowledge", desc: "Quizzes, practice examples & challenges",
    content: (
      <div className="space-y-0">
        <AccountingCycleOrder />
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-5xl">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 text-center">Classification Quiz</h3>
            <p className="text-muted-foreground text-center mb-8">Sort accounts into the correct categories.</p>
          </div>
          <ClassificationQuiz />
        </section>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 text-center">Practice Examples</h3>
            <p className="text-muted-foreground text-center mb-8">Work through real-world transactions step by step.</p>
          </div>
          <PracticeExamples />
        </section>
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-5xl">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 text-center">Interactive Quiz</h3>
            <p className="text-muted-foreground text-center mb-8">Put your knowledge to the test with multiple-choice questions.</p>
          </div>
          <InteractiveQuiz />
        </section>
      </div>
    ),
  },
];

const Index = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const openAndScrollTo = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    // Wait for DOM update then scroll
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <StickyNav onNavigate={openAndScrollTo} />
      <HeroSection />
      <IntroSection />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2 text-center">
            Explore the Topics
          </h2>
          <p className="text-muted-foreground text-center mb-10 text-lg">
            Click any topic to expand and start learning.
          </p>

          <div className="space-y-4">
            {topics.map(({ id, icon: Icon, title, desc, content }, index) => {
              const isOpen = openSections.has(id);
              return (
                <div key={id} id={id} className="scroll-mt-20">
                  <button
                    onClick={() => toggleSection(id)}
                    className="w-full group bg-card border border-border rounded-xl p-5 md:p-6 hover:border-accent hover:shadow-lg transition-all duration-200 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                          <h3 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                            {title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-1 border border-border rounded-xl overflow-hidden bg-background animate-fade-in-up" style={{ animationDuration: "0.25s" }}>
                      {content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm">
        <p>Double-Entry Bookkeeping — A learning resource for undergraduate accounting students</p>
      </footer>
    </div>
  );
};

export default Index;
