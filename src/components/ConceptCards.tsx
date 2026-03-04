import { BookOpen, Scale, ArrowLeftRight, FileText, BarChart3, ClipboardList, Landmark, HandCoins, PiggyBank, TrendingDown, TrendingUp } from "lucide-react";

const concepts = [
  {
    icon: BookOpen,
    title: "The Dual Aspect",
    description: "Every transaction affects at least two accounts. For every debit, there must be an equal and corresponding credit.",
  },
  {
    icon: Scale,
    title: "The Accounting Equation",
    description: "Assets = Liabilities + Equity. This equation must always balance after every transaction is recorded.",
  },
  {
    icon: ArrowLeftRight,
    title: "Debits & Credits",
    description: "Debits increase assets and expenses. Credits increase liabilities, equity, and revenue. They are simply left and right sides of an account.",
  },
  {
    icon: FileText,
    title: "The Trial Balance",
    description: "A listing of all account balances to verify that total debits equal total credits, ensuring the books are in balance.",
  },
  {
    icon: BarChart3,
    title: "Statement of Profit or Loss",
    description: "Summarises revenue earned and expenses incurred over a period to calculate the net profit or loss of the business.",
  },
  {
    icon: ClipboardList,
    title: "Statement of Financial Position",
    description: "A snapshot of what the business owns (assets), owes (liabilities), and the owner's residual interest (equity) at a point in time.",
  },
];

const definitions = [
  {
    icon: Landmark,
    term: "Asset",
    definition: "A resource owned or controlled by the business that has future economic value.",
    examples: "Cash, Accounts Receivable, Equipment, Motor Vehicles, Inventory, Prepayments",
    side: "Debit balance",
  },
  {
    icon: HandCoins,
    term: "Liability",
    definition: "An obligation the business owes to an outside party, to be settled in the future.",
    examples: "Accounts Payable, Loans, Accruals, Bank Overdraft",
    side: "Credit balance",
  },
  {
    icon: PiggyBank,
    term: "Equity",
    definition: "The owner's residual interest in the business — what remains after liabilities are deducted from assets.",
    examples: "Capital, Retained Earnings, Drawings (reduces equity)",
    side: "Credit balance",
  },
  {
    icon: TrendingDown,
    term: "Expense",
    definition: "A cost incurred by the business in the process of earning revenue during a period.",
    examples: "Rent Expense, Wages, Insurance, Depreciation, Bad Debts",
    side: "Debit balance",
  },
  {
    icon: TrendingUp,
    term: "Income",
    definition: "Revenue earned by the business from its trading activities or other sources during a period.",
    examples: "Sales Revenue, Commission Received, Rent Received, Interest Received",
    side: "Credit balance",
  },
];

const ConceptCards = () => (
  <section className="container mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Core Principles</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">Key Concepts</h2>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {concepts.map((c) => (
        <div key={c.title} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
            <c.icon className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-2">{c.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{c.description}</p>
        </div>
      ))}
    </div>

    {/* Definitions */}
    <div className="text-center mb-10">
      <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Know Your Categories</p>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground">The Five Account Types</h3>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Every account in bookkeeping falls into one of five categories. Understanding these is essential for recording transactions correctly.
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {definitions.map((d) => (
        <div key={d.term} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <d.icon className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-display font-bold text-lg text-foreground">{d.term}</h4>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">{d.definition}</p>
          <div className="space-y-1.5">
            <p className="text-xs">
              <span className="font-mono font-semibold text-accent uppercase tracking-wider">Examples: </span>
              <span className="text-muted-foreground">{d.examples}</span>
            </p>
            <p className="text-xs">
              <span className="font-mono font-semibold text-accent uppercase tracking-wider">Normal balance: </span>
              <span className={`font-semibold ${d.side.startsWith("Debit") ? "text-success" : "text-info"}`}>{d.side}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ConceptCards;
