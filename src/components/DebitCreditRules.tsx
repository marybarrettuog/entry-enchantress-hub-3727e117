const rules = [
  { type: "Assets", debit: "Increase ↑", credit: "Decrease ↓", example: "Cash, Equipment, Inventory" },
  { type: "Liabilities", debit: "Decrease ↓", credit: "Increase ↑", example: "Loans, Accounts Payable" },
  { type: "Equity", debit: "Decrease ↓", credit: "Increase ↑", example: "Capital, Retained Earnings" },
  { type: "Revenue", debit: "Decrease ↓", credit: "Increase ↑", example: "Sales, Service Income" },
  { type: "Expenses", debit: "Increase ↑", credit: "Decrease ↓", example: "Rent, Wages, Utilities" },
];

const DebitCreditRules = () => (
  <section className="container mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Quick Reference</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">Debit & Credit Rules</h2>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Understanding which side increases or decreases each account type is the key to mastering double-entry bookkeeping.
      </p>
    </div>
    <div className="max-w-3xl mx-auto overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            <th className="px-6 py-4 text-left font-display font-semibold">Account Type</th>
            <th className="px-6 py-4 text-center font-display font-semibold">Debit</th>
            <th className="px-6 py-4 text-center font-display font-semibold">Credit</th>
            <th className="px-6 py-4 text-left font-display font-semibold hidden md:table-cell">Examples</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((r, i) => (
            <tr key={r.type} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
              <td className="px-6 py-4 font-semibold text-foreground">{r.type}</td>
              <td className="px-6 py-4 text-center">
                <span className={`font-mono text-sm font-semibold ${r.debit.includes("↑") ? "text-success" : "text-destructive"}`}>
                  {r.debit}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`font-mono text-sm font-semibold ${r.credit.includes("↑") ? "text-success" : "text-destructive"}`}>
                  {r.credit}
                </span>
              </td>
              <td className="px-6 py-4 text-muted-foreground text-sm hidden md:table-cell">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default DebitCreditRules;
