import { ArrowDown } from "lucide-react";

const fmt = (n: number) => `€${n.toLocaleString()}`;

/* ── Data from the Trial Balance ── */
const revenue = [
  { account: "Sales Revenue", amount: 2500 },
];

const expenses = [
  { account: "Rent Expense", amount: 1200 },
  { account: "Supplies Expense", amount: 800 },
];

const totalRevenue = revenue.reduce((s, e) => s + e.amount, 0);
const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
const netProfit = totalRevenue - totalExpenses;

const FinancialStatements = () => (
  <section className="bg-secondary/50 py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">The Final Output</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Financial Statements</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          The trial balance feeds into two key financial statements. Revenue and expense accounts go to the
          Statement of Profit or Loss. Asset, liability and equity accounts (plus net profit) go to the
          Statement of Financial Position.
        </p>
      </div>

      {/* Flow indicator */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Trial Balance</span>
          <ArrowDown className="w-4 h-4 text-accent" />
          <span>Revenue &amp; Expenses → <strong className="text-foreground">P&amp;L</strong></span>
          <span className="text-border">|</span>
          <span>Assets, Liabilities &amp; Equity → <strong className="text-foreground">SoFP</strong></span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
        {/* ── Statement of Profit or Loss ── */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground text-center py-3">
            <p className="font-display font-semibold text-lg">Statement of Profit or Loss</p>
            <p className="text-primary-foreground/70 text-xs font-mono">For the period ended</p>
          </div>

          {/* Revenue */}
          <div className="px-6 pt-5 pb-2">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Revenue</p>
            {revenue.map((r) => (
              <div key={r.account} className="flex justify-between text-sm py-1">
                <span className="text-foreground">{r.account}</span>
                <span className="font-mono text-foreground">{fmt(r.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm py-1 border-t border-border mt-1 pt-2">
              <span className="font-semibold text-foreground">Total Revenue</span>
              <span className="font-mono font-semibold text-foreground">{fmt(totalRevenue)}</span>
            </div>
          </div>

          {/* Expenses */}
          <div className="px-6 pt-4 pb-2">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Less: Expenses</p>
            {expenses.map((e) => (
              <div key={e.account} className="flex justify-between text-sm py-1">
                <span className="text-foreground">{e.account}</span>
                <span className="font-mono text-foreground">({fmt(e.amount)})</span>
              </div>
            ))}
            <div className="flex justify-between text-sm py-1 border-t border-border mt-1 pt-2">
              <span className="font-semibold text-foreground">Total Expenses</span>
              <span className="font-mono font-semibold text-foreground">({fmt(totalExpenses)})</span>
            </div>
          </div>

          {/* Net Profit */}
          <div className="mx-6 mb-5 mt-3 border-t-2 border-foreground pt-3">
            <div className="flex justify-between">
              <span className="font-bold text-foreground text-base">Net Profit</span>
              <span className={`font-mono font-bold text-base ${netProfit >= 0 ? "text-success" : "text-destructive"}`}>
                {fmt(netProfit)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 italic">
              This net profit is transferred to equity in the Statement of Financial Position.
            </p>
          </div>
        </div>

        {/* ── Statement of Financial Position ── */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground text-center py-3">
            <p className="font-display font-semibold text-lg">Statement of Financial Position</p>
            <p className="text-primary-foreground/70 text-xs font-mono">As at end of period</p>
          </div>

          {/* Assets */}
          <div className="px-6 pt-5 pb-2">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Assets</p>
            <div className="flex justify-between text-sm py-1">
              <span className="text-foreground">Cash</span>
              <span className="font-mono text-foreground">{fmt(10500)}</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-t border-border mt-1 pt-2">
              <span className="font-semibold text-foreground">Total Assets</span>
              <span className="font-mono font-semibold text-foreground">{fmt(10500)}</span>
            </div>
          </div>

          {/* Equity & Liabilities */}
          <div className="px-6 pt-4 pb-2">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Equity &amp; Liabilities</p>
            <div className="flex justify-between text-sm py-1">
              <span className="text-foreground">Capital</span>
              <span className="font-mono text-foreground">{fmt(10000)}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span className="text-foreground">
                Net Profit
                <span className="text-accent text-xs ml-1">(from P&amp;L)</span>
              </span>
              <span className="font-mono text-success">{fmt(netProfit)}</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-t border-border mt-1 pt-2">
              <span className="font-semibold text-foreground">Total Equity &amp; Liabilities</span>
              <span className="font-mono font-semibold text-foreground">{fmt(10000 + netProfit)}</span>
            </div>
          </div>

          {/* Balance check */}
          <div className="mx-6 mb-5 mt-3 border-t-2 border-foreground pt-3">
            <div className="flex justify-between">
              <span className="font-bold text-foreground text-base">Balance Check</span>
              <span className="font-mono font-bold text-base text-foreground">
                {fmt(10500)} = {fmt(10000 + netProfit)}
              </span>
            </div>
            {10500 === 10000 + netProfit ? (
              <p className="text-success text-xs font-semibold mt-1">
                ✓ Total Assets equal Total Equity &amp; Liabilities — the statement balances.
              </p>
            ) : (
              <p className="text-destructive text-xs font-semibold mt-1">
                ✗ The statement does not balance — check for errors.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── In Summary: The Accounting Cycle ── */}
      <div className="max-w-4xl mx-auto mt-20">
        <div className="text-center mb-10">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">In Summary</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">The Flow of Financial Information</h3>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            Every number in the financial statements can be traced back to a real business transaction.
            Here is the journey information takes through the accounting cycle.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-stretch gap-0">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />

          {[
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
          ].map((item, i) => (
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
    </div>
  </section>
);

export default FinancialStatements;
