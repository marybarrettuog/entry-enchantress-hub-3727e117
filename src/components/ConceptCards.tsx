import { BookOpen, Scale, ArrowLeftRight, FileText } from "lucide-react";

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
];

const ConceptCards = () => (
  <section className="container mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Core Principles</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">Key Concepts</h2>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  </section>
);

export default ConceptCards;
