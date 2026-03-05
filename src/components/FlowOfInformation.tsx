import { ArrowDown } from "lucide-react";

const steps = [
  {
    step: "1",
    title: "Transaction Occurs",
    desc: "A real business event takes place — a sale, a purchase, receiving cash, paying an expense.",
    color: "bg-accent text-accent-foreground",
  },
  {
    step: "2",
    title: "Record in Ledgers",
    desc: "The transaction is recorded using double-entry: every debit has an equal and opposite credit in the T-accounts.",
    color: "bg-primary text-primary-foreground",
  },
  {
    step: "3",
    title: "Extract Trial Balance",
    desc: "All ledger balances are listed in a single report to verify that total debits equal total credits.",
    color: "bg-success text-success-foreground",
  },
  {
    step: "4",
    title: "Prepare Statements",
    desc: "The trial balance feeds into the Statement of Profit or Loss and the Statement of Financial Position.",
    color: "bg-info text-info-foreground",
  },
];

const FlowOfInformation = () => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-10">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">In Summary</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Flow of Financial Information</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
          Every number in the financial statements can be traced back to a real business transaction.
          Here is the journey information takes through the accounting cycle.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative flex flex-col md:flex-row items-stretch gap-0">
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />

        {steps.map((item, i) => (
          <div key={i} className="flex-1 relative z-10 flex flex-col items-center text-center px-3">
            {/* Arrow between steps (mobile) */}
            {i > 0 && (
              <div className="md:hidden flex items-center justify-center py-2">
                <ArrowDown className="w-5 h-5 text-accent" />
              </div>
            )}

            {/* Step circle */}
            <div
              className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center font-display font-bold text-lg shadow-md`}
            >
              {item.step}
            </div>

            {/* Arrow between steps (desktop) */}
            {i < 3 && (
              <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                <svg width="16" height="16" viewBox="0 0 16 16" className="text-accent">
                  <path d="M4 2 L12 8 L4 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            {/* Card */}
            <div className="bg-card border border-border rounded-lg p-4 mt-3 w-full">
              <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FlowOfInformation;
