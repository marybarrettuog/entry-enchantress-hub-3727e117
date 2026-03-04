interface TEntry {
  label: string;
  amount: string;
  isBalCd?: boolean;
  isBalBd?: boolean;
}

interface TAccount {
  name: string;
  debits: TEntry[];
  credits: TEntry[];
  subtotalDebit: string;
  subtotalCredit: string;
  balBdSide: "debit" | "credit";
  balBdAmount: string;
}

const accounts: TAccount[] = [
  {
    name: "Cash",
    debits: [
      { label: "Capital", amount: "€10,000" },
      { label: "Sales", amount: "€2,500" },
    ],
    credits: [
      { label: "Rent", amount: "€1,200" },
      { label: "Supplies", amount: "€800" },
      { label: "Bal c/d", amount: "€10,500", isBalCd: true },
    ],
    subtotalDebit: "€12,500",
    subtotalCredit: "€12,500",
    balBdSide: "debit",
    balBdAmount: "€10,500",
  },
  {
    name: "Capital",
    debits: [
      { label: "Bal c/d", amount: "€10,000", isBalCd: true },
    ],
    credits: [
      { label: "Cash invested", amount: "€10,000" },
    ],
    subtotalDebit: "€10,000",
    subtotalCredit: "€10,000",
    balBdSide: "credit",
    balBdAmount: "€10,000",
  },
  {
    name: "Sales Revenue",
    debits: [
      { label: "Bal c/d", amount: "€2,500", isBalCd: true },
    ],
    credits: [
      { label: "Cash", amount: "€2,500" },
    ],
    subtotalDebit: "€2,500",
    subtotalCredit: "€2,500",
    balBdSide: "credit",
    balBdAmount: "€2,500",
  },
  {
    name: "Rent Expense",
    debits: [
      { label: "Cash", amount: "€1,200" },
    ],
    credits: [
      { label: "Bal c/d", amount: "€1,200", isBalCd: true },
    ],
    subtotalDebit: "€1,200",
    subtotalCredit: "€1,200",
    balBdSide: "debit",
    balBdAmount: "€1,200",
  },
  {
    name: "Supplies Expense",
    debits: [
      { label: "Cash", amount: "€800" },
    ],
    credits: [
      { label: "Bal c/d", amount: "€800", isBalCd: true },
    ],
    subtotalDebit: "€800",
    subtotalCredit: "€800",
    balBdSide: "debit",
    balBdAmount: "€800",
  },
];

const TAccountCard = ({ account }: { account: TAccount }) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden">
    <div className="bg-primary text-primary-foreground text-center py-3 font-display font-semibold text-lg">
      {account.name}
    </div>
    <div className="grid grid-cols-2 divide-x divide-border">
      <div className="p-4">
        <p className="text-accent font-mono text-xs uppercase tracking-wider mb-3 font-semibold">Debit (Dr.)</p>
        <div className="space-y-2 text-sm">
          {account.debits.length === 0 && (
            <div className="text-muted-foreground italic">—</div>
          )}
          {account.debits.map((e, i) => (
            <div key={i} className="flex justify-between">
              <span className={e.isBalCd ? "text-accent font-semibold italic" : "text-muted-foreground"}>
                {e.label}
              </span>
              <span className={`font-mono font-semibold ${e.isBalCd ? "text-accent" : "text-foreground"}`}>
                {e.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <p className="text-accent font-mono text-xs uppercase tracking-wider mb-3 font-semibold">Credit (Cr.)</p>
        <div className="space-y-2 text-sm">
          {account.credits.length === 0 && (
            <div className="text-muted-foreground italic">—</div>
          )}
          {account.credits.map((e, i) => (
            <div key={i} className="flex justify-between">
              <span className={e.isBalCd ? "text-accent font-semibold italic" : "text-muted-foreground"}>
                {e.label}
              </span>
              <span className={`font-mono font-semibold ${e.isBalCd ? "text-accent" : "text-foreground"}`}>
                {e.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Subtotals */}
    <div className="border-t-2 border-foreground grid grid-cols-2 divide-x divide-border">
      <div className="px-4 py-2 flex justify-between bg-muted/50">
        <span></span>
        <span className="font-mono font-bold text-foreground">{account.subtotalDebit}</span>
      </div>
      <div className="px-4 py-2 flex justify-between bg-muted/50">
        <span></span>
        <span className="font-mono font-bold text-foreground">{account.subtotalCredit}</span>
      </div>
    </div>
    {/* Bal b/d */}
    <div className="border-t border-border grid grid-cols-2 divide-x divide-border">
      <div className="px-4 py-2">
        {account.balBdSide === "debit" && (
          <div className="flex justify-between text-sm">
            <span className="text-success font-semibold italic">Bal b/d</span>
            <span className="font-mono font-bold text-success">{account.balBdAmount}</span>
          </div>
        )}
      </div>
      <div className="px-4 py-2">
        {account.balBdSide === "credit" && (
          <div className="flex justify-between text-sm">
            <span className="text-info font-semibold italic">Bal b/d</span>
            <span className="font-mono font-bold text-info">{account.balBdAmount}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const TAccountVisual = () => (
  <section className="bg-secondary/50 py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Visual Learning</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">The T-Account</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          A T-account is a visual representation of a ledger account. The left side records debits, the right side records credits. Balances are carried down (c/d) and brought down (b/d).
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
        {accounts.map((acc) => (
          <TAccountCard key={acc.name} account={acc} />
        ))}
      </div>
    </div>
  </section>
);

export default TAccountVisual;
