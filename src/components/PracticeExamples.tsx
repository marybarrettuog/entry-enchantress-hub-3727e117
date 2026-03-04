import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

const examples = [
  // Basic transactions
  {
    category: "Capital & Investment",
    transaction: "Owner invests €5,000 cash into the business",
    debit: { account: "Cash", amount: "€5,000" },
    credit: { account: "Capital", amount: "€5,000" },
    explanation: "Cash (asset) increases — debit. Capital (equity) increases — credit. The business now has more cash, funded by the owner's investment.",
    rule: 1,
  },
  {
    category: "Capital & Investment",
    transaction: "Owner introduces a vehicle worth €12,000 into the business",
    debit: { account: "Motor Vehicles", amount: "€12,000" },
    credit: { account: "Capital", amount: "€12,000" },
    explanation: "Motor Vehicles (asset) increases — debit. Capital (equity) increases — credit. A non-cash asset can also be invested.",
    rule: 1,
  },
  // Expenses
  {
    category: "Expenses",
    transaction: "Business pays €1,200 rent by cheque",
    debit: { account: "Rent Expense", amount: "€1,200" },
    credit: { account: "Bank", amount: "€1,200" },
    explanation: "Rent Expense increases — debit. Bank (asset) decreases — credit. Money leaves the bank to cover an expense.",
    rule: 2,
  },
  {
    category: "Expenses",
    transaction: "Paid electricity bill €350 in cash",
    debit: { account: "Electricity Expense", amount: "€350" },
    credit: { account: "Cash", amount: "€350" },
    explanation: "Electricity Expense increases — debit. Cash (asset) decreases — credit.",
    rule: 2,
  },
  {
    category: "Expenses",
    transaction: "Paid employee wages €2,800 by bank transfer",
    debit: { account: "Wages Expense", amount: "€2,800" },
    credit: { account: "Bank", amount: "€2,800" },
    explanation: "Wages Expense increases — debit. Bank decreases — credit. Salaries are an operating expense.",
    rule: 2,
  },
  {
    category: "Expenses",
    transaction: "Paid insurance premium €600 by cheque",
    debit: { account: "Insurance Expense", amount: "€600" },
    credit: { account: "Bank", amount: "€600" },
    explanation: "Insurance Expense increases — debit. Bank decreases — credit.",
    rule: 2,
  },
  // Purchases & Inventory
  {
    category: "Purchases & Inventory",
    transaction: "Business buys €3,000 of inventory on credit",
    debit: { account: "Purchases", amount: "€3,000" },
    credit: { account: "Accounts Payable", amount: "€3,000" },
    explanation: "Purchases (expense) increases — debit. Accounts Payable (liability) increases — credit. Goods received now, payment owed later.",
    rule: 1,
  },
  {
    category: "Purchases & Inventory",
    transaction: "Bought office supplies €450 for cash",
    debit: { account: "Office Supplies", amount: "€450" },
    credit: { account: "Cash", amount: "€450" },
    explanation: "Office Supplies (asset) increases — debit. Cash (asset) decreases — credit.",
    rule: 1,
  },
  {
    category: "Purchases & Inventory",
    transaction: "Purchased machinery €8,000 on credit from EquipCo",
    debit: { account: "Machinery", amount: "€8,000" },
    credit: { account: "Accounts Payable", amount: "€8,000" },
    explanation: "Machinery (asset) increases — debit. Accounts Payable (liability) increases — credit.",
    rule: 1,
  },
  {
    category: "Purchases & Inventory",
    transaction: "Returned €500 of faulty goods to supplier (bought on credit)",
    debit: { account: "Accounts Payable", amount: "€500" },
    credit: { account: "Purchases Returns", amount: "€500" },
    explanation: "Accounts Payable (liability) decreases — debit. Purchases Returns (reduction of expense) increases — credit. We owe the supplier less.",
    rule: 1,
  },
  // Sales & Revenue
  {
    category: "Sales & Revenue",
    transaction: "Business sells goods for €2,000 cash",
    debit: { account: "Cash", amount: "€2,000" },
    credit: { account: "Sales Revenue", amount: "€2,000" },
    explanation: "Cash (asset) increases — debit. Sales Revenue (income) increases — credit.",
    rule: 2,
  },
  {
    category: "Sales & Revenue",
    transaction: "Sold goods worth €4,500 on credit to a customer",
    debit: { account: "Accounts Receivable", amount: "€4,500" },
    credit: { account: "Sales Revenue", amount: "€4,500" },
    explanation: "Accounts Receivable (asset) increases — debit. Sales Revenue increases — credit. Money is owed to us.",
    rule: 2,
  },
  {
    category: "Sales & Revenue",
    transaction: "Customer returns €300 of goods (originally sold on credit)",
    debit: { account: "Sales Returns", amount: "€300" },
    credit: { account: "Accounts Receivable", amount: "€300" },
    explanation: "Sales Returns (reduction of revenue) increases — debit. Accounts Receivable decreases — credit. The customer owes us less.",
    rule: 2,
  },
  {
    category: "Sales & Revenue",
    transaction: "Received commission income €750 into bank",
    debit: { account: "Bank", amount: "€750" },
    credit: { account: "Commission Received", amount: "€750" },
    explanation: "Bank (asset) increases — debit. Commission Received (income) increases — credit.",
    rule: 3,
  },
  // Bank Transactions
  {
    category: "Bank Transactions",
    transaction: "Customer pays €4,500 owed into our bank account",
    debit: { account: "Bank", amount: "€4,500" },
    credit: { account: "Accounts Receivable", amount: "€4,500" },
    explanation: "Bank increases — debit (money in). Accounts Receivable decreases — credit. The debt is settled.",
    rule: 3,
  },
  {
    category: "Bank Transactions",
    transaction: "Paid supplier €3,000 by bank transfer",
    debit: { account: "Accounts Payable", amount: "€3,000" },
    credit: { account: "Bank", amount: "€3,000" },
    explanation: "Accounts Payable (liability) decreases — debit. Bank decreases — credit (money out). We clear our debt.",
    rule: 3,
  },
  {
    category: "Bank Transactions",
    transaction: "Deposited €1,500 cash into the business bank account",
    debit: { account: "Bank", amount: "€1,500" },
    credit: { account: "Cash", amount: "€1,500" },
    explanation: "Bank increases — debit (money in). Cash decreases — credit. Money moves from the till to the bank.",
    rule: 3,
  },
  {
    category: "Bank Transactions",
    transaction: "Withdrew €800 cash from the bank for office use",
    debit: { account: "Cash", amount: "€800" },
    credit: { account: "Bank", amount: "€800" },
    explanation: "Cash increases — debit. Bank decreases — credit (money out). Money moves from the bank to the till.",
    rule: 3,
  },
  // Loans & Liabilities
  {
    category: "Loans & Liabilities",
    transaction: "Took out a bank loan of €20,000",
    debit: { account: "Bank", amount: "€20,000" },
    credit: { account: "Loan", amount: "€20,000" },
    explanation: "Bank (asset) increases — debit. Loan (liability) increases — credit. We have more cash but also a new obligation.",
    rule: 1,
  },
  {
    category: "Loans & Liabilities",
    transaction: "Repaid €5,000 of the bank loan by bank transfer",
    debit: { account: "Loan", amount: "€5,000" },
    credit: { account: "Bank", amount: "€5,000" },
    explanation: "Loan (liability) decreases — debit. Bank (asset) decreases — credit. Both sides reduce.",
    rule: 1,
  },
  {
    category: "Loans & Liabilities",
    transaction: "Paid loan interest €400 by direct debit",
    debit: { account: "Interest Expense", amount: "€400" },
    credit: { account: "Bank", amount: "€400" },
    explanation: "Interest Expense increases — debit. Bank decreases — credit. Interest is a cost of borrowing.",
    rule: 2,
  },
  // Drawings
  {
    category: "Drawings",
    transaction: "Owner withdraws €1,000 cash for personal use",
    debit: { account: "Drawings", amount: "€1,000" },
    credit: { account: "Cash", amount: "€1,000" },
    explanation: "Drawings (reduction of equity) increases — debit. Cash (asset) decreases — credit. The owner takes money out of the business.",
    rule: 1,
  },
  {
    category: "Drawings",
    transaction: "Owner takes goods worth €200 for personal use",
    debit: { account: "Drawings", amount: "€200" },
    credit: { account: "Purchases", amount: "€200" },
    explanation: "Drawings increases — debit. Purchases decreases — credit. Goods taken for personal use reduce business stock.",
    rule: 1,
  },
  // Depreciation & Adjustments
  {
    category: "Adjustments",
    transaction: "Record depreciation of €1,500 on motor vehicles",
    debit: { account: "Depreciation Expense", amount: "€1,500" },
    credit: { account: "Accumulated Depreciation", amount: "€1,500" },
    explanation: "Depreciation Expense increases — debit. Accumulated Depreciation (contra-asset) increases — credit. The asset's book value is reduced over time.",
    rule: 2,
  },
  {
    category: "Adjustments",
    transaction: "Wrote off a bad debt of €600 from a customer",
    debit: { account: "Bad Debts Expense", amount: "€600" },
    credit: { account: "Accounts Receivable", amount: "€600" },
    explanation: "Bad Debts Expense increases — debit. Accounts Receivable decreases — credit. The money is deemed unrecoverable.",
    rule: 2,
  },
  {
    category: "Adjustments",
    transaction: "Accrued wages of €900 owed but not yet paid at year-end",
    debit: { account: "Wages Expense", amount: "€900" },
    credit: { account: "Accruals", amount: "€900" },
    explanation: "Wages Expense increases — debit. Accruals (liability) increases — credit. The expense is recognised in the correct period.",
    rule: 2,
  },
  {
    category: "Adjustments",
    transaction: "Prepaid rent €1,800 for next quarter",
    debit: { account: "Prepayments", amount: "€1,800" },
    credit: { account: "Bank", amount: "€1,800" },
    explanation: "Prepayments (asset) increases — debit. Bank decreases — credit. Payment made in advance is an asset until the period it covers.",
    rule: 1,
  },
];

const ruleLabels: Record<number, string> = {
  1: "Rule 1: Dr. Assets / Cr. Liabilities",
  2: "Rule 2: Dr. Expenses / Cr. Gains",
  3: "Rule 3: Dr. Bank In / Cr. Bank Out",
};

const categories = [...new Set(examples.map((e) => e.category))];

const PracticeExamples = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory ? examples.filter((e) => e.category === activeCategory) : examples;

  return (
    <section className="bg-secondary/50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Apply Your Knowledge</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Practice Examples</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            {examples.length} exercises covering all major transaction types. Click each to reveal the journal entry.
          </p>
        </div>

        {/* Category filter */}
        <div className="max-w-3xl mx-auto flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => { setActiveCategory(null); setOpenIndex(null); }}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({examples.length})
          </button>
          {categories.map((cat) => {
            const count = examples.filter((e) => e.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.map((ex, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden transition-shadow hover:shadow-md">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-semibold text-foreground text-sm md:text-base">{ex.transaction}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 border-t border-border pt-4 animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-success/10 rounded-md p-3 text-center">
                        <p className="font-mono text-xs uppercase tracking-wider text-success font-semibold mb-1">Debit</p>
                        <p className="font-semibold text-foreground">{ex.debit.account}</p>
                        <p className="font-mono text-foreground">{ex.debit.amount}</p>
                      </div>
                      <div className="bg-info/10 rounded-md p-3 text-center">
                        <p className="font-mono text-xs uppercase tracking-wider text-info font-semibold mb-1">Credit</p>
                        <p className="font-semibold text-foreground">{ex.credit.account}</p>
                        <p className="font-mono text-foreground">{ex.credit.amount}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">{ex.explanation}</p>
                    <p className="text-xs font-mono text-accent">{ruleLabels[ex.rule]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticeExamples;
