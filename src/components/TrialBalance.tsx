const trialBalanceEntries = [
  { account: "Cash", debit: 10500, credit: null },
  { account: "Capital", debit: null, credit: 10000 },
  { account: "Rent Expense", debit: 1200, credit: null },
  { account: "Supplies Expense", debit: 800, credit: null },
  { account: "Sales Revenue", debit: null, credit: 2500 },
];

const fmt = (n: number | null) => (n != null ? `€${n.toLocaleString()}` : "");

const TrialBalance = () => {
  const totalDebit = trialBalanceEntries.reduce((sum, e) => sum + (e.debit ?? 0), 0);
  const totalCredit = trialBalanceEntries.reduce((sum, e) => sum + (e.credit ?? 0), 0);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Bringing It Together</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Trial Balance</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            The trial balance lists every account's closing balance to verify that total debits equal total credits. These figures are carried forward from the T-accounts above.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-card border border-border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground text-center py-3">
            <p className="font-display font-semibold text-lg">Trial Balance</p>
            <p className="text-primary-foreground/70 text-xs font-mono">As at end of period</p>
          </div>

          {/* Column headings */}
          <div className="grid grid-cols-3 border-b-2 border-foreground bg-muted/50 px-6 py-2 text-xs font-mono uppercase tracking-wider">
            <span className="text-muted-foreground font-semibold">Account</span>
            <span className="text-success font-semibold text-right">Debit (€)</span>
            <span className="text-info font-semibold text-right">Credit (€)</span>
          </div>

          {/* Rows */}
          {trialBalanceEntries.map((entry) => (
            <div
              key={entry.account}
              className="grid grid-cols-3 px-6 py-3 border-b border-border text-sm hover:bg-muted/30 transition-colors"
            >
              <span className="font-semibold text-foreground">{entry.account}</span>
              <span className="text-right font-mono text-foreground">{fmt(entry.debit)}</span>
              <span className="text-right font-mono text-foreground">{fmt(entry.credit)}</span>
            </div>
          ))}

          {/* Totals */}
          <div className="grid grid-cols-3 px-6 py-3 border-t-2 border-foreground bg-muted/50">
            <span className="font-bold text-foreground">Total</span>
            <span className="text-right font-mono font-bold text-success">€{totalDebit.toLocaleString()}</span>
            <span className="text-right font-mono font-bold text-info">€{totalCredit.toLocaleString()}</span>
          </div>

          {/* Balance check */}
          <div className="px-6 py-3 text-center">
            {totalDebit === totalCredit ? (
              <p className="text-success text-sm font-semibold">
                ✓ The trial balance balances — total debits equal total credits.
              </p>
            ) : (
              <p className="text-destructive text-sm font-semibold">
                ✗ The trial balance does not balance — check for errors.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrialBalance;
