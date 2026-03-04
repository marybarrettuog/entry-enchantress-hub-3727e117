const rules = [
  {
    number: 1,
    title: "Debit Assets, Credit Liabilities",
    description: "When assets increase, debit them. When liabilities increase, credit them. Do the opposite for decreases.",
    debitSide: "Assets ↑",
    creditSide: "Liabilities ↑",
    examples: "Buy equipment (Dr. Equipment, Cr. Cash) · Take a loan (Dr. Cash, Cr. Loan)",
  },
  {
    number: 2,
    title: "Debit Expenses, Credit Gains",
    description: "When expenses increase, debit them. When gains (revenue/income) increase, credit them. Do the opposite for decreases.",
    debitSide: "Expenses ↑",
    creditSide: "Gains ↑",
    examples: "Pay rent (Dr. Rent Expense, Cr. Cash) · Earn revenue (Dr. Cash, Cr. Sales Revenue)",
  },
  {
    number: 3,
    title: "Debit Bank In, Credit Bank Out",
    description: "Money coming into the bank account is debited. Money going out of the bank account is credited.",
    debitSide: "Bank In ↑",
    creditSide: "Bank Out ↑",
    examples: "Customer pays invoice (Dr. Bank) · Pay supplier (Cr. Bank)",
  },
];

const DebitCreditRules = () => (
  <section className="container mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Quick Reference</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">Rules of Double Entry</h2>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Three simple rules govern every transaction in double-entry bookkeeping.
      </p>
    </div>
    <div className="max-w-3xl mx-auto space-y-6">
      {rules.map((r) => (
        <div key={r.number} className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground px-6 py-3 flex items-center gap-3">
            <span className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm">
              {r.number}
            </span>
            <h3 className="font-display font-semibold text-lg">{r.title}</h3>
          </div>
          <div className="p-6">
            <p className="text-muted-foreground text-sm mb-4">{r.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-success/10 border border-success/20 rounded-md p-3 text-center">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Debit</p>
                <p className="font-semibold text-success">{r.debitSide}</p>
              </div>
              <div className="bg-info/10 border border-info/20 rounded-md p-3 text-center">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Credit</p>
                <p className="font-semibold text-info">{r.creditSide}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">{r.examples}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default DebitCreditRules;
