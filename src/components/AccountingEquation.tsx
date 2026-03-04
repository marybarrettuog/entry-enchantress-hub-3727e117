const AccountingEquation = () => (
  <section className="container mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">The Golden Rule</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Accounting Equation</h2>
    </div>
    <div className="max-w-4xl mx-auto">
      {/* Basic equation */}
      <div className="mb-10">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Basic Equation</p>
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <div className="bg-card border-2 border-accent rounded-lg px-6 py-5 text-center min-w-[140px]">
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">Assets</p>
            <p className="text-muted-foreground text-sm mt-1">What you own</p>
          </div>
          <span className="text-3xl font-display font-bold text-accent">=</span>
          <div className="bg-card border-2 border-border rounded-lg px-6 py-5 text-center min-w-[140px]">
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">Liabilities</p>
            <p className="text-muted-foreground text-sm mt-1">What you owe</p>
          </div>
          <span className="text-3xl font-display font-bold text-accent">+</span>
          <div className="bg-card border-2 border-border rounded-lg px-6 py-5 text-center min-w-[140px]">
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">Equity</p>
            <p className="text-muted-foreground text-sm mt-1">Owner's stake</p>
          </div>
        </div>
      </div>

      {/* Extended equation */}
      <div className="mb-12">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Extended Equation — Expanding Equity</p>
        <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap">
          <div className="bg-card border-2 border-accent rounded-lg px-5 py-4 text-center min-w-[120px]">
            <p className="font-display text-xl md:text-2xl font-bold text-foreground">Assets</p>
          </div>
          <span className="text-2xl font-display font-bold text-accent">=</span>
          <div className="bg-card border-2 border-border rounded-lg px-5 py-4 text-center min-w-[120px]">
            <p className="font-display text-xl md:text-2xl font-bold text-foreground">Liabilities</p>
          </div>
          <span className="text-2xl font-display font-bold text-accent">+</span>
          <div className="bg-card border-2 border-border rounded-lg px-5 py-4 text-center min-w-[100px]">
            <p className="font-display text-xl md:text-2xl font-bold text-foreground">Capital</p>
            <p className="text-muted-foreground text-xs mt-1">Opening equity</p>
          </div>
          <span className="text-2xl font-display font-bold text-success">+</span>
          <div className="bg-success/10 border-2 border-success/30 rounded-lg px-5 py-4 text-center min-w-[100px]">
            <p className="font-display text-xl md:text-2xl font-bold text-success">Income</p>
            <p className="text-muted-foreground text-xs mt-1">Increases equity</p>
          </div>
          <span className="text-2xl font-display font-bold text-destructive">−</span>
          <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg px-5 py-4 text-center min-w-[100px]">
            <p className="font-display text-xl md:text-2xl font-bold text-destructive">Expenses</p>
            <p className="text-muted-foreground text-xs mt-1">Reduces equity</p>
          </div>
          <span className="text-2xl font-display font-bold text-destructive">−</span>
          <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg px-5 py-4 text-center min-w-[100px]">
            <p className="font-display text-xl md:text-2xl font-bold text-destructive">Drawings</p>
            <p className="text-muted-foreground text-xs mt-1">Owner withdrawals</p>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <p className="text-foreground leading-relaxed">
          This equation is the backbone of double-entry bookkeeping. Every single transaction you record must keep this equation in balance. 
          When you debit one account, you must credit another by the same amount — ensuring that the total assets always equal the sum of liabilities and equity.
        </p>
        <p className="text-foreground leading-relaxed mt-3">
          <strong>Equity is not static.</strong> It grows when the business earns <span className="text-success font-semibold">income</span> and 
          shrinks when it incurs <span className="text-destructive font-semibold">expenses</span> or when the owner makes <span className="text-destructive font-semibold">drawings</span>. 
          The net effect of income minus expenses is the <em>profit (or loss)</em> for the period.
        </p>
        <p className="text-muted-foreground text-sm mt-4 italic">
          Think of it like a see-saw: both sides must always weigh the same.
        </p>
      </div>
    </div>
  </section>
);

export default AccountingEquation;
