import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import {
  BookOpen, Scale, CreditCard, LayoutGrid, ClipboardList,
  FileText, RefreshCw, ArrowRightLeft, BrainCircuit,
} from "lucide-react";

const topics = [
  { to: "/concepts", icon: BookOpen, title: "Core Concepts", desc: "Assets, liabilities, equity, revenue & expenses" },
  { to: "/equation", icon: Scale, title: "Accounting Equation", desc: "Assets = Liabilities + Equity" },
  { to: "/rules", icon: CreditCard, title: "Debit & Credit Rules", desc: "When to debit, when to credit" },
  { to: "/t-accounts", icon: LayoutGrid, title: "T-Accounts", desc: "Visualise debits and credits" },
  { to: "/trial-balance", icon: ClipboardList, title: "Trial Balance", desc: "Check your books balance" },
  { to: "/financial-statements", icon: FileText, title: "Financial Statements", desc: "Statement of profit or loss & statement of financial position" },
  { to: "/flow-of-information", icon: ArrowRightLeft, title: "Flow of Information", desc: "From transaction to financial statements" },
  { to: "/test-your-knowledge", icon: BrainCircuit, title: "Test Your Knowledge", desc: "Quizzes, practice examples & challenges" },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <IntroSection />

    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2 text-center">
          Explore the Topics
        </h2>
        <p className="text-muted-foreground text-center mb-10 text-lg">
          Click any topic to dive in and start learning.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="group bg-card border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm">
      <p>Double-Entry Bookkeeping — A learning resource for undergraduate accounting students</p>
    </footer>
  </div>
);

export default Index;
