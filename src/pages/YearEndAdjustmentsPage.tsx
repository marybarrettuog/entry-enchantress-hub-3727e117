import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Calendar, TrendingDown, AlertTriangle, Package, FileX, Shield, PenTool } from "lucide-react";

const sections = [
  {
    id: "accruals",
    icon: Calendar,
    title: "Accruals",
    desc: "Recognising expenses incurred but not yet paid",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What are Accruals?</h4>
          <p className="text-muted-foreground leading-relaxed">
            An accrual is an expense that has been incurred during the accounting period but has <strong>not yet been paid</strong> for. Under the accruals concept (matching principle), expenses must be recognised in the period they relate to — not when cash is paid.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-display font-semibold text-foreground">Example</h4>
          <p className="text-muted-foreground">A business has a year end of 31 December. The electricity bill for October–December (£600) arrives in January and is paid in February.</p>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-2"><span className="text-accent font-semibold">Year-end adjustment:</span></p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Electricity Expense</span><span className="text-right">£600</span>
              <span>Cr Accruals (Current Liability)</span><span className="text-right">£600</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic">This ensures the expense appears in the correct period's Statement of Profit or Loss, and the liability is shown on the Statement of Financial Position.</p>
        </div>
      </div>
    ),
  },
  {
    id: "prepayments",
    icon: Calendar,
    title: "Prepayments",
    desc: "Expenses paid in advance of the period they relate to",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What are Prepayments?</h4>
          <p className="text-muted-foreground leading-relaxed">
            A prepayment is an amount paid <strong>in advance</strong> for a service or expense that relates to a future accounting period. The portion relating to the next period is removed from expenses and shown as a current asset.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-display font-semibold text-foreground">Example</h4>
          <p className="text-muted-foreground">On 1 October, a business pays £1,200 for 12 months of insurance. Year end is 31 December — only 3 months (£300) relates to this year. The remaining £900 is a prepayment.</p>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-2"><span className="text-accent font-semibold">Year-end adjustment:</span></p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Prepayments (Current Asset)</span><span className="text-right">£900</span>
              <span>Cr Insurance Expense</span><span className="text-right">£900</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic">This reduces the expense to £300 (the correct amount for the period) and creates an asset for the future benefit.</p>
        </div>
      </div>
    ),
  },
  {
    id: "depreciation",
    icon: TrendingDown,
    title: "Depreciation",
    desc: "Spreading the cost of non-current assets over their useful life",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What is Depreciation?</h4>
          <p className="text-muted-foreground leading-relaxed">
            Depreciation allocates the cost of a non-current asset over its estimated useful life. It reflects the consumption of economic benefits — the asset loses value through use, wear and tear, or obsolescence.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Methods</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-2">Straight-Line Method</h5>
              <p className="text-muted-foreground text-sm mb-2">Equal charge each year.</p>
              <p className="font-mono text-sm text-accent">(Cost − Residual Value) ÷ Useful Life</p>
              <p className="text-muted-foreground text-sm mt-2">E.g. Machine costs £10,000, residual value £2,000, useful life 4 years → £2,000 per year.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-2">Reducing Balance Method</h5>
              <p className="text-muted-foreground text-sm mb-2">Higher charge in earlier years.</p>
              <p className="font-mono text-sm text-accent">Carrying Amount × %</p>
              <p className="text-muted-foreground text-sm mt-2">E.g. £10,000 at 25%: Year 1 = £2,500, Year 2 = £1,875, etc.</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-2"><span className="text-accent font-semibold">Double entry:</span></p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Depreciation Expense (P&L)</span><span className="text-right">£X</span>
              <span>Cr Accumulated Depreciation (SFP)</span><span className="text-right">£X</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "bad-debts",
    icon: AlertTriangle,
    title: "Irrecoverable Debts",
    desc: "Writing off debts that will never be collected",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What are Irrecoverable Debts?</h4>
          <p className="text-muted-foreground leading-relaxed">
            When a trade receivable is deemed to be uncollectable (e.g. the customer has gone bankrupt), the debt is <strong>written off</strong>. This removes the receivable from the Statement of Financial Position and recognises an expense.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-display font-semibold text-foreground">Double Entry</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Irrecoverable Debts Expense</span><span className="text-right">£X</span>
              <span>Cr Trade Receivables</span><span className="text-right">£X</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic">The expense goes to the Statement of Profit or Loss. Trade receivables on the Statement of Financial Position are reduced accordingly.</p>
        </div>
      </div>
    ),
  },
  {
    id: "allowance-doubtful",
    icon: Shield,
    title: "Allowance for Doubtful Debts",
    desc: "Providing for debts that may not be collected",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What is an Allowance for Doubtful Debts?</h4>
          <p className="text-muted-foreground leading-relaxed">
            Unlike irrecoverable debts (which are certain), doubtful debts are amounts that <strong>might</strong> not be collected. A provision (allowance) is created to reflect this uncertainty, applying the concept of prudence.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Creating or Increasing the Allowance</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Allowance for Doubtful Debts Expense</span><span className="text-right">£X</span>
              <span>Cr Allowance for Doubtful Debts</span><span className="text-right">£X</span>
            </div>
          </div>
          <h4 className="font-display font-semibold text-foreground">Decreasing the Allowance</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Allowance for Doubtful Debts</span><span className="text-right">£X</span>
              <span>Cr Allowance for Doubtful Debts Expense</span><span className="text-right">£X</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic">Only the <strong>change</strong> in allowance goes to the Statement of Profit or Loss. Trade receivables on the Statement of Financial Position are shown net of the allowance.</p>
        </div>
      </div>
    ),
  },
  {
    id: "closing-inventory",
    icon: Package,
    title: "Closing Inventory & Cost of Sales",
    desc: "Adjusting for unsold stock at year end",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">Closing Inventory</h4>
          <p className="text-muted-foreground leading-relaxed">
            At the year end, a business will have unsold inventory. This must be valued (at the lower of cost and net realisable value) and adjusted so that only the cost of goods <strong>actually sold</strong> appears as an expense.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-display font-semibold text-foreground">Cost of Sales Calculation</h4>
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm space-y-1">
            <div className="grid grid-cols-2"><span>Opening Inventory</span><span className="text-right">£X</span></div>
            <div className="grid grid-cols-2"><span>+ Purchases</span><span className="text-right">£X</span></div>
            <div className="grid grid-cols-2 border-t border-border pt-1"><span>− Closing Inventory</span><span className="text-right">(£X)</span></div>
            <div className="grid grid-cols-2 border-t border-border pt-1 font-semibold text-accent"><span>= Cost of Sales</span><span className="text-right">£X</span></div>
          </div>
          <h4 className="font-display font-semibold text-foreground">Double Entry for Closing Inventory</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Inventory (SFP — Current Asset)</span><span className="text-right">£X</span>
              <span>Cr Statement of Profit or Loss</span><span className="text-right">£X</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "correction-errors",
    icon: PenTool,
    title: "Correction of Errors",
    desc: "Identifying and correcting bookkeeping mistakes",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">Types of Errors</h4>
          <p className="text-muted-foreground leading-relaxed">
            Errors in bookkeeping may or may not affect the trial balance. Understanding the types helps identify and correct them.
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-2 text-sm">Errors Revealed by the Trial Balance</h5>
              <ul className="text-muted-foreground text-sm space-y-1.5 list-disc list-inside">
                <li><strong>Single entry</strong> — only one side recorded</li>
                <li><strong>Casting error</strong> — incorrect addition</li>
                <li><strong>Transposition</strong> — digits reversed (e.g. £540 as £450)</li>
                <li><strong>Extraction error</strong> — wrong figure from ledger to TB</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-2 text-sm">Errors NOT Revealed by the Trial Balance</h5>
              <ul className="text-muted-foreground text-sm space-y-1.5 list-disc list-inside">
                <li><strong>Error of omission</strong> — transaction not recorded at all</li>
                <li><strong>Error of commission</strong> — correct type, wrong account</li>
                <li><strong>Error of principle</strong> — wrong class of account</li>
                <li><strong>Error of original entry</strong> — wrong amount, both sides</li>
                <li><strong>Compensating errors</strong> — two errors cancel out</li>
                <li><strong>Reversal of entries</strong> — debit and credit swapped</li>
              </ul>
            </div>
          </div>
          <div className="bg-muted/40 rounded-lg p-5 border border-border">
            <h4 className="font-display font-semibold text-foreground mb-2">The Suspense Account</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              When the trial balance does not balance, the difference is placed in a <strong>suspense account</strong>. As errors are found and corrected, journal entries are made to clear the suspense account. Once all errors are corrected, the suspense account balance should be zero.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

const YearEndAdjustmentsPage = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to main page
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3">
            Year-End Adjustments
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Before preparing the final accounts, a number of adjustments must be made to ensure the financial statements give a true and fair view.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-4">
            {sections.map(({ id, icon: Icon, title, desc, content }, index) => {
              const isOpen = openSections.has(id);
              return (
                <div key={id} id={id} className="scroll-mt-20">
                  <button
                    onClick={() => toggleSection(id)}
                    className="w-full group bg-card border border-border rounded-xl p-5 md:p-6 hover:border-accent hover:shadow-lg transition-all duration-200 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                          <h3 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                            {title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-1 border border-border rounded-xl overflow-hidden bg-background animate-fade-in-up" style={{ animationDuration: "0.25s" }}>
                      {content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <div className="border-t border-border py-8">
        <div className="container mx-auto px-6 max-w-5xl flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to main page
          </Link>
        </div>
      </div>

      <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm">
        <p>Double-Entry Bookkeeping — A learning resource for undergraduate accounting students</p>
      </footer>
    </div>
  );
};

export default YearEndAdjustmentsPage;
