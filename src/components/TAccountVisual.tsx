const TAccountVisual = () => (
  <section className="bg-secondary/50 py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Visual Learning</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">The T-Account</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          A T-account is a visual representation of a ledger account. The left side records debits, the right side records credits.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Cash Account */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground text-center py-3 font-display font-semibold text-lg">
            Cash
          </div>
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="p-4">
              <p className="text-accent font-mono text-xs uppercase tracking-wider mb-3 font-semibold">Debit (Dr.)</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Capital</span><span className="font-mono font-semibold text-foreground">£10,000</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sales</span><span className="font-mono font-semibold text-foreground">£2,500</span></div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-accent font-mono text-xs uppercase tracking-wider mb-3 font-semibold">Credit (Cr.)</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Rent</span><span className="font-mono font-semibold text-foreground">£1,200</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Supplies</span><span className="font-mono font-semibold text-foreground">£800</span></div>
              </div>
            </div>
          </div>
          <div className="border-t border-border px-4 py-3 flex justify-between bg-muted/50">
            <span className="text-sm font-semibold text-foreground">Balance</span>
            <span className="font-mono font-bold text-success">£10,500 Dr.</span>
          </div>
        </div>

        {/* Capital Account */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground text-center py-3 font-display font-semibold text-lg">
            Capital
          </div>
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="p-4">
              <p className="text-accent font-mono text-xs uppercase tracking-wider mb-3 font-semibold">Debit (Dr.)</p>
              <div className="space-y-2 text-sm text-muted-foreground italic">
                <p>—</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-accent font-mono text-xs uppercase tracking-wider mb-3 font-semibold">Credit (Cr.)</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Cash invested</span><span className="font-mono font-semibold text-foreground">£10,000</span></div>
              </div>
            </div>
          </div>
          <div className="border-t border-border px-4 py-3 flex justify-between bg-muted/50">
            <span className="text-sm font-semibold text-foreground">Balance</span>
            <span className="font-mono font-bold text-info">£10,000 Cr.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TAccountVisual;
