import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

const examples = [
  {
    transaction: "Owner invests £5,000 cash into the business",
    debit: { account: "Cash", amount: "£5,000" },
    credit: { account: "Capital", amount: "£5,000" },
    explanation: "Cash (asset) increases — debit. Capital (equity) increases — credit. The business now has more cash, funded by the owner's investment.",
  },
  {
    transaction: "Business pays £1,200 rent by cheque",
    debit: { account: "Rent Expense", amount: "£1,200" },
    credit: { account: "Bank", amount: "£1,200" },
    explanation: "Rent Expense increases — debit. Bank (asset) decreases — credit. The business uses cash to pay for an expense.",
  },
  {
    transaction: "Business buys £3,000 of inventory on credit",
    debit: { account: "Inventory", amount: "£3,000" },
    credit: { account: "Accounts Payable", amount: "£3,000" },
    explanation: "Inventory (asset) increases — debit. Accounts Payable (liability) increases — credit. The goods are received now, payment is owed later.",
  },
  {
    transaction: "Business sells goods for £2,000 cash",
    debit: { account: "Cash", amount: "£2,000" },
    credit: { account: "Sales Revenue", amount: "£2,000" },
    explanation: "Cash (asset) increases — debit. Sales Revenue increases — credit. The business earns income from selling goods.",
  },
];

const PracticeExamples = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-secondary/50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Apply Your Knowledge</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Practice Examples</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Click each transaction to see its journal entry and explanation.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {examples.map((ex, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden transition-shadow hover:shadow-md">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-semibold text-foreground">{ex.transaction}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 border-t border-border pt-4 animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-success/10 rounded-md p-3 text-center">
                        <p className="font-mono text-xs uppercase tracking-wider text-success font-semibold mb-1">Debit</p>
                        <p className="font-semibold text-foreground">{ex.debit.account}</p>
                        <p className="font-mono text-foreground">{ex.debit.amount}</p>
                      </div>
                      <div className="bg-info/10 rounded-md p-3 text-center">
                        <p className="font-mono text-xs uppercase tracking-wider text-info font-semibold mb-1">Credit</p>
                        <p className="font-semibold text-foreground">{ex.credit.account}</p>
                        <p className="font-mono text-foreground">{ex.credit.amount}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{ex.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticeExamples;
