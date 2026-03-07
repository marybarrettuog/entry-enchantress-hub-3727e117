import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Calendar, TrendingDown, AlertTriangle, Package, Shield, PenTool, BookOpen, Brain } from "lucide-react";
import YearEndQuiz from "@/components/YearEndQuiz";

const sections = [
  {
    id: "accruals",
    icon: Calendar,
    title: "Accruals",
    desc: "Recognising expenses and income in the correct period",
    content: (
      <div className="p-6 md:p-8 space-y-8">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What are Accruals?</h4>
          <p className="text-muted-foreground leading-relaxed">
            Under the accruals concept (matching principle), income and expenses must be recognised in the period they <strong>relate to</strong> — not when cash is received or paid. At year end, adjustments are made for amounts that have been earned or incurred but not yet recorded.
          </p>
        </div>

        {/* Accrued Expenses */}
        <div className="space-y-3">
          <h4 className="font-display font-semibold text-foreground">Accrued Expenses</h4>
          <p className="text-muted-foreground">An expense that has been <strong>incurred</strong> during the period but <strong>not yet paid</strong>. It is recorded as a current liability.</p>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">Year end is 31 December. The electricity bill for October–December (€600) arrives in January.</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Electricity Expense</span><span className="text-right">€600</span>
              <span>Cr Accrued Expenses (Current Liability)</span><span className="text-right">€600</span>
            </div>
          </div>
        </div>

        {/* Accrued Income */}
        <div className="space-y-3">
          <h4 className="font-display font-semibold text-foreground">Accrued Income</h4>
          <p className="text-muted-foreground">Income that has been <strong>earned</strong> during the period but <strong>not yet received</strong>. It is recorded as a current asset.</p>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">A business sub-lets part of its office. Rent of €400 for December has been earned but won't be received until January.</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Accrued Income (Current Asset)</span><span className="text-right">€400</span>
              <span>Cr Rental Income</span><span className="text-right">€400</span>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-sm italic">These adjustments ensure the Statement of Profit or Loss reflects all income earned and expenses incurred in the period, regardless of cash timing.</p>
      </div>
    ),
  },
  {
    id: "prepayments",
    icon: Calendar,
    title: "Prepayments",
    desc: "Amounts paid or received in advance of the period they relate to",
    content: (
      <div className="p-6 md:p-8 space-y-8">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What are Prepayments?</h4>
          <p className="text-muted-foreground leading-relaxed">
            A prepayment arises when cash is paid or received <strong>in advance</strong> for a service that spans more than one accounting period. The portion relating to a future period must be adjusted at year end.
          </p>
        </div>

        {/* Prepaid Expenses */}
        <div className="space-y-3">
          <h4 className="font-display font-semibold text-foreground">Prepaid Expenses</h4>
          <p className="text-muted-foreground">An expense paid <strong>in advance</strong> — the portion relating to the next period is removed from expenses and shown as a current asset.</p>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">On 1 October, a business pays €1,200 for 12 months of insurance. Year end is 31 December — only 3 months (€300) relates to this year. The remaining €900 is prepaid.</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Prepaid Expenses (Current Asset)</span><span className="text-right">€900</span>
              <span>Cr Insurance Expense</span><span className="text-right">€900</span>
            </div>
            <p className="text-muted-foreground text-xs mt-2 italic">This reduces the expense to €300 (the correct amount for the period).</p>
          </div>
        </div>

        {/* Deferred Income */}
        <div className="space-y-3">
          <h4 className="font-display font-semibold text-foreground">Deferred Income</h4>
          <p className="text-muted-foreground">Income received <strong>in advance</strong> — the portion relating to the next period is removed from income and shown as a current liability.</p>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">On 1 November, a business receives €1,500 for 3 months of consultancy services. Year end is 31 December — only 2 months (€1,000) relates to this year. The remaining €500 is income in advance.</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Consultancy Income</span><span className="text-right">€500</span>
              <span>Cr Deferred Income (Current Liability)</span><span className="text-right">€500</span>
            </div>
            <p className="text-muted-foreground text-xs mt-2 italic">This reduces the income to €1,000 (the correct amount earned in this period).</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm italic">Prepaid expenses are current assets; deferred income is a current liability.</p>
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
              <p className="text-muted-foreground text-sm mt-2">E.g. Machine costs €10,000, residual value €2,000, useful life 4 years → €2,000 per year.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-2">Reducing Balance Method</h5>
              <p className="text-muted-foreground text-sm mb-2">Higher charge in earlier years.</p>
              <p className="font-mono text-sm text-accent">Carrying Amount × %</p>
              <p className="text-muted-foreground text-sm mt-2">E.g. €10,000 at 25%: Year 1 = €2,500, Year 2 = €1,875, etc.</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-2"><span className="text-accent font-semibold">Double entry:</span></p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Depreciation Expense (P&L)</span><span className="text-right">€X</span>
              <span>Cr Accumulated Depreciation (SFP)</span><span className="text-right">€X</span>
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
              <span>Dr Irrecoverable Debts Expense</span><span className="text-right">€X</span>
              <span>Cr Trade Receivables</span><span className="text-right">€X</span>
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
    desc: "Estimating debts that may not be collected",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What is an Allowance for Doubtful Debts?</h4>
          <p className="text-muted-foreground leading-relaxed">
            Unlike irrecoverable debts (which are certain), doubtful debts are amounts that <strong>might</strong> not be collected. An allowance is created to reflect this uncertainty, applying the concept of prudence.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Creating or Increasing the Allowance</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">Trade receivables are €20,000. The business estimates 5% may be doubtful — the required allowance is €1,000. The existing allowance is €600, so an increase of €400 is needed.</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Doubtful Debt Expense</span><span className="text-right">€400</span>
              <span>Cr Allowance for Doubtful Debts</span><span className="text-right">€400</span>
            </div>
          </div>
          <h4 className="font-display font-semibold text-foreground">Decreasing the Allowance</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">The required allowance has fallen from €1,000 to €700 — a decrease of €300.</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Allowance for Doubtful Debts</span><span className="text-right">€300</span>
              <span>Cr Doubtful Debt Expense</span><span className="text-right">€300</span>
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
            <div className="grid grid-cols-2"><span>Opening Inventory</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-2"><span>+ Purchases</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-2 border-t border-border pt-1"><span>− Closing Inventory</span><span className="text-right">(€X)</span></div>
            <div className="grid grid-cols-2 border-t border-border pt-1 font-semibold text-accent"><span>= Cost of Sales</span><span className="text-right">€X</span></div>
          </div>
          <h4 className="font-display font-semibold text-foreground">Double Entry for Closing Inventory</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Inventory Asset</span><span className="text-right">€X</span>
              <span>Cr Inventory Cost of Goods Sold</span><span className="text-right">€X</span>
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
                <li><strong>Transposition</strong> — digits reversed (e.g. €540 as €450)</li>
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

          {/* Suspense Account Example */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground">Suspense Account — Worked Example</h4>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">The error:</span></p>
              <p className="text-muted-foreground text-sm mb-3">A sale of €350 was correctly debited to Trade Receivables but was credited to the Sales account as €530. The credit side is €180 more than it should be, causing the trial balance credit total to exceed the debit total by €180.</p>
              <p className="text-muted-foreground text-sm mb-3">To make the trial balance balance temporarily, the difference of €180 is placed on the <strong>debit side</strong> of the Suspense Account.</p>
              <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                <span>Dr Suspense Account</span><span className="text-right">€180</span>
                <span>Cr (Balancing figure)</span><span className="text-right">€180</span>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">The correction:</span></p>
              <p className="text-muted-foreground text-sm mb-3">Sales was overcredited by €180 (€530 instead of €350). To correct this, we debit Sales by €180 (reducing the excess credit) and credit the Suspense Account by €180 (clearing it).</p>
              <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                <span>Dr Sales</span><span className="text-right">€180</span>
                <span>Cr Suspense Account</span><span className="text-right">€180</span>
              </div>
              <p className="text-muted-foreground text-xs mt-2 italic">The suspense account now has a zero balance, and the Sales account shows the correct figure of €350.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "worked-example",
    icon: BookOpen,
    title: "Worked Example",
    desc: "Trial balance → adjustments → revised trial balance → final accounts",
    content: (
      <div className="p-6 md:p-8 space-y-10">
        {/* Step 1 */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">1</span>
            Trial Balance — Before Adjustments
          </h4>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm font-mono">
              <thead><tr className="bg-muted/60 border-b border-border"><th className="text-left p-3 font-semibold text-foreground">Account</th><th className="text-right p-3 font-semibold text-foreground">Dr €</th><th className="text-right p-3 font-semibold text-foreground">Cr €</th></tr></thead>
              <tbody className="divide-y divide-border">
                <tr><td className="p-3">Sales</td><td className="text-right p-3"></td><td className="text-right p-3">52,000</td></tr>
                <tr><td className="p-3">Purchases</td><td className="text-right p-3">28,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Opening Inventory</td><td className="text-right p-3">3,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Trade Receivables</td><td className="text-right p-3">8,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Trade Payables</td><td className="text-right p-3"></td><td className="text-right p-3">5,200</td></tr>
                <tr><td className="p-3">Bank</td><td className="text-right p-3">2,500</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Equipment</td><td className="text-right p-3">10,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Accumulated Depreciation</td><td className="text-right p-3"></td><td className="text-right p-3">2,000</td></tr>
                <tr><td className="p-3">Allowance for Doubtful Debts</td><td className="text-right p-3"></td><td className="text-right p-3">500</td></tr>
                <tr><td className="p-3">Rent Expense</td><td className="text-right p-3">4,800</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Insurance Expense</td><td className="text-right p-3">2,400</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Wages Expense</td><td className="text-right p-3">12,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Drawings</td><td className="text-right p-3">6,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Capital</td><td className="text-right p-3"></td><td className="text-right p-3">15,000</td></tr>
                <tr><td className="p-3">Loan</td><td className="text-right p-3"></td><td className="text-right p-3">2,000</td></tr>
              </tbody>
              <tfoot><tr className="bg-muted/60 border-t-2 border-accent font-semibold text-accent"><td className="p-3">Total</td><td className="text-right p-3">76,700</td><td className="text-right p-3">76,700</td></tr></tfoot>
            </table>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">2</span>
            Additional Information at Year End
          </h4>
          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <ol className="list-decimal list-inside text-muted-foreground space-y-2.5 text-sm leading-relaxed">
              <li>Closing inventory has been valued at <strong className="text-foreground">€4,200</strong>.</li>
              <li>Equipment is depreciated using the straight-line method at <strong className="text-foreground">10% on cost</strong>. (10% × €10,000 = €1,000)</li>
              <li>Insurance includes <strong className="text-foreground">€600</strong> prepaid relating to next year.</li>
              <li>Wages of <strong className="text-foreground">€800</strong> are accrued (owing at year end).</li>
              <li>A debt of <strong className="text-foreground">€500</strong> is to be written off as irrecoverable.</li>
              <li>The allowance for doubtful debts is to be adjusted to <strong className="text-foreground">10%</strong> of the remaining trade receivables.</li>
            </ol>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">3</span>
            Journal Entries to Record Adjustments
          </h4>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4 md:p-5">
              <p className="text-sm font-semibold text-foreground mb-1">1. Closing Inventory — €4,200</p>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-sm mt-2">
                <span>Dr Inventory Asset</span><span className="text-right">€4,200</span>
                <span>Cr Inventory Cost of Goods Sold</span><span className="text-right">€4,200</span>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 md:p-5">
              <p className="text-sm font-semibold text-foreground mb-1">2. Depreciation — €1,000</p>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-sm mt-2">
                <span>Dr Depreciation Expense</span><span className="text-right">€1,000</span>
                <span>Cr Accumulated Depreciation</span><span className="text-right">€1,000</span>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 md:p-5">
              <p className="text-sm font-semibold text-foreground mb-1">3. Insurance Prepaid — €600</p>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-sm mt-2">
                <span>Dr Prepaid Expenses</span><span className="text-right">€600</span>
                <span>Cr Insurance Expense</span><span className="text-right">€600</span>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 md:p-5">
              <p className="text-sm font-semibold text-foreground mb-1">4. Wages Accrued — €800</p>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-sm mt-2">
                <span>Dr Wages Expense</span><span className="text-right">€800</span>
                <span>Cr Accrued Expenses</span><span className="text-right">€800</span>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 md:p-5">
              <p className="text-sm font-semibold text-foreground mb-1">5. Irrecoverable Debt Write-Off — €500</p>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-sm mt-2">
                <span>Dr Irrecoverable Debts Expense</span><span className="text-right">€500</span>
                <span>Cr Trade Receivables</span><span className="text-right">€500</span>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 md:p-5">
              <p className="text-sm font-semibold text-foreground mb-1">6. Allowance for Doubtful Debts — Increase of €250</p>
              <p className="text-muted-foreground text-xs mb-2">Remaining receivables: €8,000 − €500 = €7,500. Required allowance: 10% × €7,500 = €750. Current allowance: €500. Increase needed: €250.</p>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-sm mt-2">
                <span>Dr Doubtful Debt Expense</span><span className="text-right">€250</span>
                <span>Cr Allowance for Doubtful Debts</span><span className="text-right">€250</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">4</span>
            Revised Trial Balance — After Adjustments
          </h4>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm font-mono">
              <thead><tr className="bg-muted/60 border-b border-border"><th className="text-left p-3 font-semibold text-foreground">Account</th><th className="text-right p-3 font-semibold text-foreground">Dr €</th><th className="text-right p-3 font-semibold text-foreground">Cr €</th></tr></thead>
              <tbody className="divide-y divide-border">
                <tr><td className="p-3">Sales</td><td className="text-right p-3"></td><td className="text-right p-3">52,000</td></tr>
                <tr><td className="p-3">Purchases</td><td className="text-right p-3">28,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Opening Inventory</td><td className="text-right p-3">3,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Inventory Asset</td><td className="text-right p-3">4,200</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Inventory Cost of Goods Sold</td><td className="text-right p-3"></td><td className="text-right p-3">4,200</td></tr>
                <tr><td className="p-3">Trade Receivables</td><td className="text-right p-3">7,500</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Trade Payables</td><td className="text-right p-3"></td><td className="text-right p-3">5,200</td></tr>
                <tr><td className="p-3">Bank</td><td className="text-right p-3">2,500</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Equipment</td><td className="text-right p-3">10,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Accumulated Depreciation</td><td className="text-right p-3"></td><td className="text-right p-3">3,000</td></tr>
                <tr><td className="p-3">Allowance for Doubtful Debts</td><td className="text-right p-3"></td><td className="text-right p-3">750</td></tr>
                <tr><td className="p-3">Rent Expense</td><td className="text-right p-3">4,800</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Insurance Expense</td><td className="text-right p-3">1,800</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Wages Expense</td><td className="text-right p-3">12,800</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Depreciation Expense</td><td className="text-right p-3">1,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Irrecoverable Debts Expense</td><td className="text-right p-3">500</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Doubtful Debt Expense</td><td className="text-right p-3">250</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Prepaid Expenses</td><td className="text-right p-3">600</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Accrued Expenses</td><td className="text-right p-3"></td><td className="text-right p-3">800</td></tr>
                <tr><td className="p-3">Drawings</td><td className="text-right p-3">6,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Capital</td><td className="text-right p-3"></td><td className="text-right p-3">15,000</td></tr>
                <tr><td className="p-3">Loan</td><td className="text-right p-3"></td><td className="text-right p-3">2,000</td></tr>
              </tbody>
              <tfoot><tr className="bg-muted/60 border-t-2 border-accent font-semibold text-accent"><td className="p-3">Total</td><td className="text-right p-3">82,950</td><td className="text-right p-3">82,950</td></tr></tfoot>
            </table>
          </div>
          <p className="text-muted-foreground text-sm italic text-center">The revised trial balance still balances — confirming that all adjustment entries have been recorded correctly with equal debits and credits.</p>
        </div>

        {/* Step 5 — Statement of Profit or Loss */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">5</span>
            Statement of Profit or Loss
          </h4>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-muted/60 border-b border-border p-3">
              <p className="font-mono font-semibold text-foreground text-sm text-center">Statement of Profit or Loss for the year ended 31 December</p>
            </div>
            <div className="p-4 md:p-6 font-mono text-sm space-y-1">
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4"><span className="font-semibold text-foreground">Revenue</span><span></span><span className="text-right">52,000</span></div>
              <div className="pt-2 pb-1"><span className="font-semibold text-foreground">Cost of Sales</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4"><span>Opening Inventory</span><span className="text-right">3,000</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4"><span>Purchases</span><span className="text-right">28,000</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4 border-t border-border pt-1"><span></span><span className="text-right">31,000</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4"><span>Less: Closing Inventory</span><span className="text-right">(4,200)</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-t border-border pt-1"><span className="pl-4"></span><span></span><span className="text-right">(26,800)</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-t-2 border-accent pt-2 font-semibold text-accent"><span>Gross Profit</span><span></span><span className="text-right">25,200</span></div>
              <div className="pt-3 pb-1"><span className="font-semibold text-foreground">Less: Expenses</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4"><span>Rent</span><span className="text-right">4,800</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4"><span>Insurance</span><span className="text-right">1,800</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4"><span>Wages</span><span className="text-right">12,800</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4"><span>Depreciation</span><span className="text-right">1,000</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4"><span>Irrecoverable Debts</span><span className="text-right">500</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pl-4"><span>Doubtful Debt Expense</span><span className="text-right">250</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-t border-border pt-1"><span className="pl-4"></span><span></span><span className="text-right">(21,150)</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-t-2 border-accent pt-2 font-semibold text-accent"><span>Net Profit</span><span></span><span className="text-right">4,050</span></div>
            </div>
          </div>
        </div>

        {/* Step 6 — Statement of Financial Position */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">6</span>
            Statement of Financial Position
          </h4>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-muted/60 border-b border-border p-3">
              <p className="font-mono font-semibold text-foreground text-sm text-center">Statement of Financial Position as at 31 December</p>
            </div>
            <div className="p-4 md:p-6 font-mono text-sm space-y-1">
              <div className="pb-1"><span className="font-semibold text-foreground">Non-Current Assets</span></div>
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 pl-4"><span></span><span className="text-right text-muted-foreground text-xs">Cost</span><span className="text-right text-muted-foreground text-xs">Acc. Dep.</span><span className="text-right text-muted-foreground text-xs">NBV</span></div>
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 pl-4"><span>Equipment</span><span className="text-right">10,000</span><span className="text-right">(3,000)</span><span className="text-right">7,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1"><span className="font-semibold">Total Non-Current Assets</span><span className="text-right font-semibold">7,000</span></div>
              <div className="pt-4 pb-1"><span className="font-semibold text-foreground">Current Assets</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Inventory</span><span className="text-right">4,200</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Trade Receivables (€7,500 − €750)</span><span className="text-right">6,750</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Prepaid Expenses</span><span className="text-right">600</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Bank</span><span className="text-right">2,500</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1"><span className="font-semibold">Total Current Assets</span><span className="text-right font-semibold">14,050</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t-2 border-accent pt-2 mt-2 font-semibold text-accent"><span>Total Assets</span><span className="text-right">21,050</span></div>
              <div className="pt-6 pb-1"><span className="font-semibold text-foreground">Capital</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Opening Capital</span><span className="text-right">15,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Add: Net Profit</span><span className="text-right">4,050</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Less: Drawings</span><span className="text-right">(6,000)</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1"><span className="font-semibold">Closing Capital</span><span className="text-right font-semibold">13,050</span></div>
              <div className="pt-4 pb-1"><span className="font-semibold text-foreground">Non-Current Liabilities</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Loan</span><span className="text-right">2,000</span></div>
              <div className="pt-4 pb-1"><span className="font-semibold text-foreground">Current Liabilities</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Trade Payables</span><span className="text-right">5,200</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Accrued Expenses</span><span className="text-right">800</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1"><span className="font-semibold">Total Current Liabilities</span><span className="text-right font-semibold">6,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t-2 border-accent pt-2 mt-2 font-semibold text-accent"><span>Total Capital &amp; Liabilities</span><span className="text-right">21,050</span></div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic text-center">Total Assets (€21,050) = Total Capital &amp; Liabilities (€21,050) — the statement balances.</p>
        </div>
      </div>
    ),
  },
  {
    id: "quiz",
    icon: Brain,
    title: "Test Your Knowledge",
    desc: "Calculate adjustments and select the correct journal entries",
    content: (
      <div className="p-6 md:p-8">
        <YearEndQuiz />
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

  const openAndScrollTo = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">
            Before preparing the final accounts, a number of adjustments must be made to ensure the financial statements give a true and fair view.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
            {sections.map(({ id, icon: Icon, title }) => (
              <button
                key={id}
                onClick={() => openAndScrollTo(id)}
                className="flex flex-col items-center gap-1.5 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg p-3 transition-colors text-center"
              >
                <Icon className="w-5 h-5 text-primary-foreground/80" />
                <span className="text-xs text-primary-foreground/80 leading-tight">{title}</span>
              </button>
            ))}
          </div>
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
