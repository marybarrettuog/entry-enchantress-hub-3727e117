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

      {/* Explanation of basic equation */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 mb-14">
        <p className="text-foreground leading-relaxed">
          This equation is the backbone of double-entry bookkeeping. Every single transaction you record must keep this equation in balance. 
          When you debit one account, you must credit another by the same amount — ensuring that the total assets always equal the sum of liabilities and equity.
        </p>
        <p className="text-muted-foreground text-sm mt-4 italic">
          Think of it like a see-saw: both sides must always weigh the same.
        </p>
      </div>

      {/* Extended equation */}
      <div className="mb-10">
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

      <div className="bg-muted/50 border border-border rounded-lg p-6 mb-14">
        <p className="text-foreground leading-relaxed">
          <strong>Equity is not static.</strong> It grows when the business earns <span className="text-success font-semibold">income</span> and 
          shrinks when it incurs <span className="text-destructive font-semibold">expenses</span> or when the owner makes <span className="text-destructive font-semibold">drawings</span>. 
          The net effect of income minus expenses is the <em>profit (or loss)</em> for the period, which is added to equity.
        </p>
        <p className="text-foreground leading-relaxed mt-3">
          By rearranging the equation, we can move expenses and drawings to the <strong>same side as assets</strong>. This gives us the debit and credit sides of every account.
        </p>
      </div>

      {/* Rearranged: Debit side = Credit side */}
      <div className="mb-10">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Rearranged — Debit Side = Credit Side</p>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Debit side */}
          <div className="bg-success/5 border-2 border-success/30 rounded-xl p-6">
            <p className="text-center font-mono text-sm uppercase tracking-widest text-success font-bold mb-5">Debit Side (Left)</p>
            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg px-5 py-4 text-center">
                <p className="font-display text-xl font-bold text-foreground">Assets</p>
              </div>
              <div className="text-center text-success font-bold text-lg">+</div>
              <div className="bg-card border border-border rounded-lg px-5 py-4 text-center">
                <p className="font-display text-xl font-bold text-foreground">Expenses</p>
              </div>
              <div className="text-center text-success font-bold text-lg">+</div>
              <div className="bg-card border border-border rounded-lg px-5 py-4 text-center">
                <p className="font-display text-xl font-bold text-foreground">Drawings</p>
              </div>
            </div>
          </div>

          {/* Credit side */}
          <div className="bg-info/5 border-2 border-info/30 rounded-xl p-6">
            <p className="text-center font-mono text-sm uppercase tracking-widest text-info font-bold mb-5">Credit Side (Right)</p>
            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg px-5 py-4 text-center">
                <p className="font-display text-xl font-bold text-foreground">Liabilities</p>
              </div>
              <div className="text-center text-info font-bold text-lg">+</div>
              <div className="bg-card border border-border rounded-lg px-5 py-4 text-center">
                <p className="font-display text-xl font-bold text-foreground">Income</p>
              </div>
              <div className="text-center text-info font-bold text-lg">+</div>
              <div className="bg-card border border-border rounded-lg px-5 py-4 text-center">
                <p className="font-display text-xl font-bold text-foreground">Capital</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DEAD CLIC mnemonic */}
      <div className="bg-card border-2 border-accent rounded-xl p-8 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-6">Memory Aid</p>
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <p className="font-display text-4xl md:text-5xl font-bold text-success tracking-wider mb-3">
              D<span className="text-foreground/30">.</span>E<span className="text-foreground/30">.</span>A<span className="text-foreground/30">.</span>D
            </p>
            <p className="font-mono text-sm text-success font-semibold uppercase tracking-wider mb-2">Debit Side</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-bold text-foreground">D</span>rawings</p>
              <p><span className="font-bold text-foreground">E</span>xpenses</p>
              <p><span className="font-bold text-foreground">A</span>ssets</p>
              <p><span className="font-bold text-foreground">D</span>ebits increase these</p>
            </div>
          </div>
          <div>
            <p className="font-display text-4xl md:text-5xl font-bold text-info tracking-wider mb-3">
              C<span className="text-foreground/30">.</span>L<span className="text-foreground/30">.</span>I<span className="text-foreground/30">.</span>C
            </p>
            <p className="font-mono text-sm text-info font-semibold uppercase tracking-wider mb-2">Credit Side</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-bold text-foreground">C</span>apital</p>
              <p><span className="font-bold text-foreground">L</span>iabilities</p>
              <p><span className="font-bold text-foreground">I</span>ncome</p>
              <p><span className="font-bold text-foreground">C</span>redits increase these</p>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-sm italic max-w-lg mx-auto">
          Remember: <strong className="text-foreground">DEAD CLIC</strong> — if you know which side an account lives on, you know whether to debit or credit it when it increases.
        </p>
      </div>
    </div>
  </section>
);

export default AccountingEquation;
