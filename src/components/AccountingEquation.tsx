const AccountingEquation = () => (
  <section className="container mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">The Golden Rule</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Accounting Equation</h2>
    </div>
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap mb-12">
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
      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <p className="text-foreground leading-relaxed">
          This equation is the backbone of double-entry bookkeeping. Every single transaction you record must keep this equation in balance. 
          When you debit one account, you must credit another by the same amount — ensuring that the total assets always equal the sum of liabilities and equity.
        </p>
        <p className="text-muted-foreground text-sm mt-4 italic">
          Think of it like a see-saw: both sides must always weigh the same.
        </p>
      </div>
    </div>
  </section>
);

export default AccountingEquation;
