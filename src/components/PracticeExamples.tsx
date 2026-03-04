import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

const examples = [
  {
    category: "Capital & Investment",
    transaction: "Owner invests €5,000 cash into the business",
    debit: { account: "Cash", amount: "€5,000" },
    credit: { account: "Capital", amount: "€5,000" },
    explanation: "Cash (asset) increases — debit (Rule 1). Capital (equity/liability) increases — credit (Rule 1). Both sides follow Rule 1.",
    rules: [1],
  },
  {
    category: "Capital & Investment",
    transaction: "Owner introduces a vehicle worth €12,000 into the business",
    debit: { account: "Motor Vehicles", amount: "€12,000" },
    credit: { account: "Capital", amount: "€12,000" },
    explanation: "Motor Vehicles (asset) increases — debit (Rule 1). Capital (equity/liability) increases — credit (Rule 1).",
    rules: [1],
  },
  {
    category: "Expenses",
    transaction: "Business pays €1,200 rent by cheque",
    debit: { account: "Rent Expense", amount: "€1,200" },
    credit: { account: "Bank", amount: "€1,200" },
    explanation: "Rent Expense increases — debit (Rule 2). Money goes out of the bank — credit (Rule 3). This transaction combines Rules 2 and 3.",
    rules: [2, 3],
  },
  {
    category: "Expenses",
    transaction: "Paid electricity bill €350 in cash",
    debit: { account: "Electricity Expense", amount: "€350" },
    credit: { account: "Cash", amount: "€350" },
    explanation: "Electricity Expense increases — debit (Rule 2). Cash (asset) decreases — credit (Rule 1). This transaction combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Expenses",
    transaction: "Paid employee wages €2,800 by bank transfer",
    debit: { account: "Wages Expense", amount: "€2,800" },
    credit: { account: "Bank", amount: "€2,800" },
    explanation: "Wages Expense increases — debit (Rule 2). Money goes out of the bank — credit (Rule 3). Combines Rules 2 and 3.",
    rules: [2, 3],
  },
  {
    category: "Expenses",
    transaction: "Paid insurance premium €600 by cheque",
    debit: { account: "Insurance Expense", amount: "€600" },
    credit: { account: "Bank", amount: "€600" },
    explanation: "Insurance Expense increases — debit (Rule 2). Money goes out of the bank — credit (Rule 3). Combines Rules 2 and 3.",
    rules: [2, 3],
  },
  {
    category: "Purchases & Inventory",
    transaction: "Business buys €3,000 of inventory on credit",
    debit: { account: "Purchases", amount: "€3,000" },
    credit: { account: "Accounts Payable", amount: "€3,000" },
    explanation: "Purchases (expense) increases — debit (Rule 2). Accounts Payable (liability) increases — credit (Rule 1). Combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Purchases & Inventory",
    transaction: "Bought office supplies €450 for cash",
    debit: { account: "Office Supplies", amount: "€450" },
    credit: { account: "Cash", amount: "€450" },
    explanation: "Office Supplies (asset) increases — debit (Rule 1). Cash (asset) decreases — credit (Rule 1). Both sides follow Rule 1.",
    rules: [1],
  },
  {
    category: "Purchases & Inventory",
    transaction: "Purchased machinery €8,000 on credit from EquipCo",
    debit: { account: "Machinery", amount: "€8,000" },
    credit: { account: "Accounts Payable", amount: "€8,000" },
    explanation: "Machinery (asset) increases — debit (Rule 1). Accounts Payable (liability) increases — credit (Rule 1). Both sides follow Rule 1.",
    rules: [1],
  },
  {
    category: "Purchases & Inventory",
    transaction: "Returned €500 of faulty goods to supplier (bought on credit)",
    debit: { account: "Accounts Payable", amount: "€500" },
    credit: { account: "Purchases Returns", amount: "€500" },
    explanation: "Accounts Payable (liability) decreases — debit (Rule 1). Purchases Returns (reduction of expense/gain) increases — credit (Rule 2). Combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Sales & Revenue",
    transaction: "Business sells goods for €2,000 cash",
    debit: { account: "Cash", amount: "€2,000" },
    credit: { account: "Sales Revenue", amount: "€2,000" },
    explanation: "Cash (asset) increases — debit (Rule 1). Sales Revenue (gain) increases — credit (Rule 2). Combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Sales & Revenue",
    transaction: "Sold goods worth €4,500 on credit to a customer",
    debit: { account: "Accounts Receivable", amount: "€4,500" },
    credit: { account: "Sales Revenue", amount: "€4,500" },
    explanation: "Accounts Receivable (asset) increases — debit (Rule 1). Sales Revenue (gain) increases — credit (Rule 2). Combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Sales & Revenue",
    transaction: "Customer returns €300 of goods (originally sold on credit)",
    debit: { account: "Sales Returns", amount: "€300" },
    credit: { account: "Accounts Receivable", amount: "€300" },
    explanation: "Sales Returns (expense/reduction of revenue) increases — debit (Rule 2). Accounts Receivable (asset) decreases — credit (Rule 1). Combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Sales & Revenue",
    transaction: "Received commission income €750 into bank",
    debit: { account: "Bank", amount: "€750" },
    credit: { account: "Commission Received", amount: "€750" },
    explanation: "Money comes into the bank — debit (Rule 3). Commission Received (gain) increases — credit (Rule 2). Combines Rules 2 and 3.",
    rules: [2, 3],
  },
  {
    category: "Bank Transactions",
    transaction: "Customer pays €4,500 owed into our bank account",
    debit: { account: "Bank", amount: "€4,500" },
    credit: { account: "Accounts Receivable", amount: "€4,500" },
    explanation: "Money comes into the bank — debit (Rule 3). Accounts Receivable (asset) decreases — credit (Rule 1). Combines Rules 1 and 3.",
    rules: [1, 3],
  },
  {
    category: "Bank Transactions",
    transaction: "Paid supplier €3,000 by bank transfer",
    debit: { account: "Accounts Payable", amount: "€3,000" },
    credit: { account: "Bank", amount: "€3,000" },
    explanation: "Accounts Payable (liability) decreases — debit (Rule 1). Money goes out of the bank — credit (Rule 3). Combines Rules 1 and 3.",
    rules: [1, 3],
  },
  {
    category: "Bank Transactions",
    transaction: "Deposited €1,500 cash into the business bank account",
    debit: { account: "Bank", amount: "€1,500" },
    credit: { account: "Cash", amount: "€1,500" },
    explanation: "Money comes into the bank — debit (Rule 3). Cash (asset) decreases — credit (Rule 1). Combines Rules 1 and 3.",
    rules: [1, 3],
  },
  {
    category: "Bank Transactions",
    transaction: "Withdrew €800 cash from the bank for office use",
    debit: { account: "Cash", amount: "€800" },
    credit: { account: "Bank", amount: "€800" },
    explanation: "Cash (asset) increases — debit (Rule 1). Money goes out of the bank — credit (Rule 3). Combines Rules 1 and 3.",
    rules: [1, 3],
  },
  {
    category: "Loans & Liabilities",
    transaction: "Took out a bank loan of €20,000",
    debit: { account: "Bank", amount: "€20,000" },
    credit: { account: "Loan", amount: "€20,000" },
    explanation: "Money comes into the bank — debit (Rule 3). Loan (liability) increases — credit (Rule 1). Combines Rules 1 and 3.",
    rules: [1, 3],
  },
  {
    category: "Loans & Liabilities",
    transaction: "Repaid €5,000 of the bank loan by bank transfer",
    debit: { account: "Loan", amount: "€5,000" },
    credit: { account: "Bank", amount: "€5,000" },
    explanation: "Loan (liability) decreases — debit (Rule 1). Money goes out of the bank — credit (Rule 3). Combines Rules 1 and 3.",
    rules: [1, 3],
  },
  {
    category: "Loans & Liabilities",
    transaction: "Paid loan interest €400 by direct debit",
    debit: { account: "Interest Expense", amount: "€400" },
    credit: { account: "Bank", amount: "€400" },
    explanation: "Interest Expense increases — debit (Rule 2). Money goes out of the bank — credit (Rule 3). Combines Rules 2 and 3.",
    rules: [2, 3],
  },
  {
    category: "Drawings",
    transaction: "Owner withdraws €1,000 cash for personal use",
    debit: { account: "Drawings", amount: "€1,000" },
    credit: { account: "Cash", amount: "€1,000" },
    explanation: "Drawings (reduction of equity/liability) increases — debit (Rule 1). Cash (asset) decreases — credit (Rule 1). Both sides follow Rule 1.",
    rules: [1],
  },
  {
    category: "Drawings",
    transaction: "Owner takes goods worth €200 for personal use",
    debit: { account: "Drawings", amount: "€200" },
    credit: { account: "Purchases", amount: "€200" },
    explanation: "Drawings (reduction of equity) increases — debit (Rule 1). Purchases (expense) decreases — credit (Rule 2). Combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Adjustments",
    transaction: "Record depreciation of €1,500 on motor vehicles",
    debit: { account: "Depreciation Expense", amount: "€1,500" },
    credit: { account: "Accumulated Depreciation", amount: "€1,500" },
    explanation: "Depreciation Expense increases — debit (Rule 2). Accumulated Depreciation (contra-asset, reducing the asset value) increases — credit (Rule 1). Combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Adjustments",
    transaction: "Wrote off a bad debt of €600 from a customer",
    debit: { account: "Bad Debts Expense", amount: "€600" },
    credit: { account: "Accounts Receivable", amount: "€600" },
    explanation: "Bad Debts Expense increases — debit (Rule 2). Accounts Receivable (asset) decreases — credit (Rule 1). Combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Adjustments",
    transaction: "Accrued wages of €900 owed but not yet paid at year-end",
    debit: { account: "Wages Expense", amount: "€900" },
    credit: { account: "Accruals", amount: "€900" },
    explanation: "Wages Expense increases — debit (Rule 2). Accruals (liability) increases — credit (Rule 1). Combines Rules 1 and 2.",
    rules: [1, 2],
  },
  {
    category: "Adjustments",
    transaction: "Prepaid rent €1,800 for next quarter",
    debit: { account: "Prepayments", amount: "€1,800" },
    credit: { account: "Bank", amount: "€1,800" },
    explanation: "Prepayments (asset) increases — debit (Rule 1). Money goes out of the bank — credit (Rule 3). Combines Rules 1 and 3.",
    rules: [1, 3],
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
                    <div className="flex flex-wrap gap-2">
                      {ex.rules.map((r) => (
                        <span key={r} className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                          {ruleLabels[r]}
                        </span>
                      ))}
                    </div>
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
