import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ChevronDown, Landmark, Coins, ArrowUpDown,
  FileText, BarChart3, BookOpen, ArrowRight,
} from "lucide-react";
import StickyNav from "@/components/StickyNav";

const companyNavItems = [
  { id: "share-capital", label: "Capital" },
  { id: "issuing-shares", label: "Issuing" },
  { id: "share-buybacks", label: "Buybacks" },
  { id: "sopl", label: "P&L" },
  { id: "sofp", label: "SFP" },
  { id: "socie", label: "Equity" },
  { id: "worked-example", label: "Example" },
  
];

const sections = [
  {
    id: "share-capital",
    icon: Landmark,
    title: "Types of Share Capital",
    desc: "Understanding the make-up of a company's capital structure",
    content: (
      <div className="p-6 md:p-8 space-y-8">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What is Share Capital?</h4>
          <p className="text-muted-foreground leading-relaxed">
            When a company is formed, it raises finance by issuing <strong>shares</strong> to investors (shareholders). The shareholders become part-owners of the company. Share capital represents the nominal (par) value of all shares issued.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Key Terms</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-1 text-sm">Authorised Share Capital</h5>
              <p className="text-muted-foreground text-sm">The maximum number of shares a company is allowed to issue, as stated in its constitution. (Note: this concept has been abolished under some jurisdictions but remains relevant for study.)</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-1 text-sm">Issued Share Capital</h5>
              <p className="text-muted-foreground text-sm">The nominal value of shares that have actually been issued (allotted) to shareholders.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-1 text-sm">Called-Up Share Capital</h5>
              <p className="text-muted-foreground text-sm">The amount of the issued share capital that shareholders have been asked to pay. A company may issue shares but only call up part of the nominal value initially.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-1 text-sm">Paid-Up Share Capital</h5>
              <p className="text-muted-foreground text-sm">The amount of called-up capital that has actually been received from shareholders.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Types of Shares</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-1 text-sm">Ordinary Shares</h5>
              <p className="text-muted-foreground text-sm">The most common type. Ordinary shareholders have voting rights and receive dividends at the directors' discretion. They bear the most risk but also benefit from growth in the company's value.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-1 text-sm">Preference Shares</h5>
              <p className="text-muted-foreground text-sm">Carry a fixed dividend rate and are paid before ordinary shareholders. Usually have no voting rights. May be <strong>cumulative</strong> (unpaid dividends carry forward) or <strong>redeemable</strong> (can be bought back by the company).</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">Share Premium</h4>
          <p className="text-muted-foreground leading-relaxed">
            When shares are issued at a price above their <strong>nominal (par) value</strong>, the excess is recorded in a separate <strong>Share Premium</strong> account. Share premium is part of equity but is not distributable as dividends — it is a <strong>capital reserve</strong>.
          </p>
          <div className="bg-card border border-border rounded-lg p-4 mt-3">
            <p className="font-mono text-sm"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm">A company issues 10,000 ordinary shares with a nominal value of €1 each at a price of €1.50 per share.</p>
            <p className="text-muted-foreground text-sm mt-1">Total received: 10,000 × €1.50 = <strong className="text-foreground">€15,000</strong></p>
            <p className="text-muted-foreground text-sm">Nominal value: 10,000 × €1.00 = <strong className="text-foreground">€10,000</strong> → Share Capital</p>
            <p className="text-muted-foreground text-sm">Premium: 10,000 × €0.50 = <strong className="text-foreground">€5,000</strong> → Share Premium</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "issuing-shares",
    icon: Coins,
    title: "Issuing Shares — Double Entry",
    desc: "Recording the issue of shares at par and at a premium",
    content: (
      <div className="p-6 md:p-8 space-y-8">
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Issue at Nominal (Par) Value</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">A company issues 20,000 ordinary shares of €1 each at par, fully paid in cash.</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Bank</span><span className="text-right">€20,000</span>
              <span>Cr Ordinary Share Capital</span><span className="text-right">€20,000</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Issue at a Premium</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">A company issues 15,000 ordinary shares of €1 each at €2.40 per share, fully paid in cash.</p>
            <p className="text-muted-foreground text-sm mb-3">Total received: 15,000 × €2.40 = €36,000. Nominal: €15,000. Premium: €21,000.</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Bank</span><span className="text-right">€36,000</span>
              <span>Cr Ordinary Share Capital</span><span className="text-right">€15,000</span>
              <span>Cr Share Premium</span><span className="text-right">€21,000</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Partly Paid Shares</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">A company issues 10,000 shares of €1 each at €1.50, but only calls up €1.00 per share initially.</p>
            <p className="text-muted-foreground text-sm mb-1 font-semibold text-foreground">On allotment (€1.00 called):</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm mb-3">
              <span>Dr Bank</span><span className="text-right">€10,000</span>
              <span>Cr Ordinary Share Capital</span><span className="text-right">€10,000</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1 font-semibold text-foreground">When the remaining €0.50 is called and paid:</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Bank</span><span className="text-right">€5,000</span>
              <span>Cr Share Premium</span><span className="text-right">€5,000</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "share-buybacks",
    icon: ArrowUpDown,
    title: "Share Buybacks (Repurchases)",
    desc: "When a company buys back its own shares",
    content: (
      <div className="p-6 md:p-8 space-y-8">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What is a Share Buyback?</h4>
          <p className="text-muted-foreground leading-relaxed">
            A company may repurchase its own shares from shareholders. This reduces the equity of the company. The shares bought back are then <strong>cancelled</strong>, reducing share capital.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Buyback at Nominal Value</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">A company buys back 5,000 ordinary shares of €1 each at par and cancels them.</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Ordinary Share Capital</span><span className="text-right">€5,000</span>
              <span>Cr Bank</span><span className="text-right">€5,000</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">Buyback Above Nominal Value</h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm mb-1"><span className="text-accent font-semibold">Example:</span></p>
            <p className="text-muted-foreground text-sm mb-3">A company buys back 5,000 shares (€1 nominal) at €1.80 each and cancels them. The premium paid (€0.80 × 5,000 = €4,000) is charged to retained earnings (or share premium if available).</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <span>Dr Ordinary Share Capital</span><span className="text-right">€5,000</span>
              <span>Dr Retained Earnings</span><span className="text-right">€4,000</span>
              <span>Cr Bank</span><span className="text-right">€9,000</span>
            </div>
          </div>
        </div>

      </div>
    ),
  },
  {
    id: "sopl",
    icon: FileText,
    title: "Statement of Profit or Loss (IFRS)",
    desc: "IAS 1 presentation format for company accounts",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">IFRS Format — IAS 1</h4>
          <p className="text-muted-foreground leading-relaxed">
            Under IAS 1 <em>Presentation of Financial Statements</em>, the Statement of Profit or Loss classifies expenses <strong>by function</strong> (cost of sales, distribution, administrative) or <strong>by nature</strong>. The format below uses classification by function, which is the most common approach.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-muted/60 border-b border-border p-3">
            <p className="font-mono font-semibold text-foreground text-sm text-center">Statement of Profit or Loss for the year ended 31 December 20X1</p>
          </div>
          <div className="p-4 md:p-6 font-mono text-sm space-y-1">
            <div className="grid grid-cols-[1fr_auto] gap-x-4"><span className="font-semibold text-foreground">Revenue</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4"><span>Cost of Sales</span><span className="text-right">(€X)</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 font-semibold text-accent"><span>Gross Profit</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pt-2"><span>Distribution Costs</span><span className="text-right">(€X)</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4"><span>Administrative Expenses</span><span className="text-right">(€X)</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pt-2"><span>Finance Costs</span><span className="text-right">(€X)</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 font-semibold"><span>Profit Before Tax</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4"><span>Income Tax Expense</span><span className="text-right">(€X)</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t-2 border-accent pt-2 font-semibold text-accent"><span>Profit for the Year</span><span className="text-right">€X</span></div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground">What's Included in Each Heading?</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-1 text-sm">Distribution Costs</h5>
              <p className="text-muted-foreground text-sm">
                Costs of getting goods to customers: delivery and transport expenses, warehouse costs, sales staff salaries and commissions, advertising and marketing, and depreciation on distribution vehicles or equipment.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-1 text-sm">Administrative Expenses</h5>
              <p className="text-muted-foreground text-sm">
                General overhead costs of running the business: office rent and utilities, management salaries, accounting and legal fees, office supplies, insurance, depreciation on office equipment, and doubtful debt expenses.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h5 className="font-semibold text-foreground mb-1 text-sm">Finance Costs</h5>
              <p className="text-muted-foreground text-sm">
                Costs of borrowing: interest on bank loans and overdrafts, interest on loan notes (debentures), and interest on lease liabilities. These are shown separately from operating expenses as they relate to how the business is financed rather than its trading operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "sofp",
    icon: BarChart3,
    title: "Statement of Financial Position (IFRS)",
    desc: "IAS 1 presentation format for the balance sheet",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">IFRS Format — IAS 1</h4>
          <p className="text-muted-foreground leading-relaxed">
            The Statement of Financial Position presents assets, liabilities and equity at a point in time. Under IAS 1, it must distinguish between <strong>current</strong> and <strong>non-current</strong> items. The equity section shows share capital, reserves and retained earnings separately.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-muted/60 border-b border-border p-3">
            <p className="font-mono font-semibold text-foreground text-sm text-center">Statement of Financial Position as at 31 December 20X1</p>
          </div>
          <div className="p-4 md:p-6 font-mono text-sm space-y-1">
            <div className="pb-1"><span className="font-semibold text-foreground">Non-Current Assets</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Property, Plant &amp; Equipment</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Intangible Assets</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1 font-semibold"><span>Total Non-Current Assets</span><span className="text-right">€X</span></div>

            <div className="pt-4 pb-1"><span className="font-semibold text-foreground">Current Assets</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Inventories</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Trade &amp; Other Receivables</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Cash &amp; Cash Equivalents</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1 font-semibold"><span>Total Current Assets</span><span className="text-right">€X</span></div>

            <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t-2 border-accent pt-2 mt-2 font-semibold text-accent"><span>Total Assets</span><span className="text-right">€X</span></div>

            <div className="pt-6 pb-1"><span className="font-semibold text-foreground">Equity</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Share Capital</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Share Premium</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Revaluation Reserve</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Retained Earnings</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1 font-semibold"><span>Total Equity</span><span className="text-right">€X</span></div>

            <div className="pt-4 pb-1"><span className="font-semibold text-foreground">Non-Current Liabilities</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Long-term Borrowings</span><span className="text-right">€X</span></div>

            <div className="pt-4 pb-1"><span className="font-semibold text-foreground">Current Liabilities</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Trade &amp; Other Payables</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Current Tax Payable</span><span className="text-right">€X</span></div>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1 font-semibold"><span>Total Current Liabilities</span><span className="text-right">€X</span></div>

            <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t-2 border-accent pt-2 mt-2 font-semibold text-accent"><span>Total Equity &amp; Liabilities</span><span className="text-right">€X</span></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "socie",
    icon: BarChart3,
    title: "Statement of Changes in Equity",
    desc: "Reconciling opening to closing equity balances",
    content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-muted/40 rounded-lg p-5 border border-border">
          <h4 className="font-display font-semibold text-foreground mb-2">What is the Statement of Changes in Equity?</h4>
          <p className="text-muted-foreground leading-relaxed">
            Required under IAS 1, this statement reconciles the opening and closing balances of each component of equity. It shows the effects of profit or loss, other comprehensive income, dividends, share issues, and buybacks on equity during the period.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-muted/60 border-b border-border p-3">
            <p className="font-mono font-semibold text-foreground text-sm text-center">Statement of Changes in Equity for the year ended 31 December 20X1</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground"></th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Share Capital</th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Share Premium</th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Reval. Reserve</th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Retained Earnings</th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border"><td className="p-3 font-semibold">Balance b/f</td><td className="text-right p-3">€X</td><td className="text-right p-3">€X</td><td className="text-right p-3">€X</td><td className="text-right p-3">€X</td><td className="text-right p-3 font-semibold">€X</td></tr>
                <tr className="border-b border-border"><td className="p-3">Profit for the year</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">€X</td><td className="text-right p-3">€X</td></tr>
                <tr className="border-b border-border"><td className="p-3">Dividends paid</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">(€X)</td><td className="text-right p-3">(€X)</td></tr>
                <tr className="border-b border-border"><td className="p-3">Shares issued</td><td className="text-right p-3">€X</td><td className="text-right p-3">€X</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">€X</td></tr>
                <tr className="border-b border-border"><td className="p-3">Revaluation surplus</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">€X</td><td className="text-right p-3">—</td><td className="text-right p-3">€X</td></tr>
                <tr className="bg-muted/60 font-semibold text-accent"><td className="p-3">Balance c/f</td><td className="text-right p-3">€X</td><td className="text-right p-3">€X</td><td className="text-right p-3">€X</td><td className="text-right p-3">€X</td><td className="text-right p-3">€X</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-muted-foreground text-sm italic text-center">Each column represents a component of equity. The total column ties to the equity section of the Statement of Financial Position.</p>
      </div>
    ),
  },
  {
    id: "worked-example",
    icon: BookOpen,
    title: "Worked Example",
    desc: "From trial balance to IFRS financial statements",
    content: (
      <div className="p-6 md:p-8 space-y-10">

        {/* Step 1 — Trial Balance */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">1</span>
            Trial Balance — 31 December 20X1
          </h4>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm font-mono">
              <thead><tr className="bg-muted/60 border-b border-border"><th className="text-left p-3 font-semibold text-foreground">Account</th><th className="text-right p-3 font-semibold text-foreground">Dr €</th><th className="text-right p-3 font-semibold text-foreground">Cr €</th></tr></thead>
              <tbody className="divide-y divide-border">
                <tr><td className="p-3">Revenue</td><td className="text-right p-3"></td><td className="text-right p-3">180,000</td></tr>
                <tr><td className="p-3">Cost of Sales</td><td className="text-right p-3">105,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Distribution Costs</td><td className="text-right p-3">12,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Administrative Expenses</td><td className="text-right p-3">20,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Finance Costs</td><td className="text-right p-3">2,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Income Tax Expense</td><td className="text-right p-3">8,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Dividends Paid</td><td className="text-right p-3">6,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Land &amp; Buildings</td><td className="text-right p-3">80,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Plant &amp; Equipment</td><td className="text-right p-3">40,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Accumulated Dep'n — Buildings</td><td className="text-right p-3"></td><td className="text-right p-3">10,000</td></tr>
                <tr><td className="p-3">Accumulated Dep'n — P&amp;E</td><td className="text-right p-3"></td><td className="text-right p-3">12,000</td></tr>
                <tr><td className="p-3">Inventories</td><td className="text-right p-3">16,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Trade Receivables</td><td className="text-right p-3">18,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Cash &amp; Cash Equivalents</td><td className="text-right p-3">27,000</td><td className="text-right p-3"></td></tr>
                <tr><td className="p-3">Trade Payables</td><td className="text-right p-3"></td><td className="text-right p-3">14,000</td></tr>
                <tr><td className="p-3">Current Tax Payable</td><td className="text-right p-3"></td><td className="text-right p-3">8,000</td></tr>
                <tr><td className="p-3">Ordinary Share Capital (€1 shares)</td><td className="text-right p-3"></td><td className="text-right p-3">50,000</td></tr>
                <tr><td className="p-3">Share Premium</td><td className="text-right p-3"></td><td className="text-right p-3">10,000</td></tr>
                <tr><td className="p-3">Revaluation Reserve</td><td className="text-right p-3"></td><td className="text-right p-3">5,000</td></tr>
                <tr><td className="p-3">Retained Earnings b/f</td><td className="text-right p-3"></td><td className="text-right p-3">20,000</td></tr>
                <tr><td className="p-3">Long-term Loan (8%)</td><td className="text-right p-3"></td><td className="text-right p-3">25,000</td></tr>
              </tbody>
              <tfoot><tr className="bg-muted/60 border-t-2 border-accent font-semibold text-accent"><td className="p-3">Total</td><td className="text-right p-3">334,000</td><td className="text-right p-3">334,000</td></tr></tfoot>
            </table>
          </div>
        </div>

        {/* Step 2 — Statement of Profit or Loss */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">2</span>
            Statement of Profit or Loss
          </h4>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-muted/60 border-b border-border p-3">
              <p className="font-mono font-semibold text-foreground text-sm text-center">Statement of Profit or Loss for the year ended 31 December 20X1</p>
            </div>
            <div className="p-4 md:p-6 font-mono text-sm space-y-1">
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4"><span className="font-semibold text-foreground">Revenue</span><span></span><span className="text-right">180,000</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4"><span>Cost of Sales</span><span></span><span className="text-right">(105,000)</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-t border-border pt-1 font-semibold text-accent"><span>Gross Profit</span><span></span><span className="text-right">75,000</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pt-2"><span>Distribution Costs</span><span className="text-right">(12,000)</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4"><span>Administrative Expenses</span><span className="text-right">(20,000)</span><span></span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-t border-border pt-1"><span></span><span></span><span className="text-right">(32,000)</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 pt-2"><span>Finance Costs</span><span></span><span className="text-right">(2,000)</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-t border-border pt-1 font-semibold"><span>Profit Before Tax</span><span></span><span className="text-right">41,000</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4"><span>Income Tax Expense</span><span></span><span className="text-right">(8,000)</span></div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-t-2 border-accent pt-2 font-semibold text-accent"><span>Profit for the Year</span><span></span><span className="text-right">33,000</span></div>
            </div>
          </div>
        </div>

        {/* Step 3 — Statement of Changes in Equity */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">3</span>
            Statement of Changes in Equity
          </h4>
          <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
            <div className="bg-muted/60 border-b border-border p-3">
              <p className="font-mono font-semibold text-foreground text-sm text-center">Statement of Changes in Equity for the year ended 31 December 20X1</p>
            </div>
            <table className="w-full text-sm font-mono min-w-[640px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground">€</th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Share Capital</th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Share Premium</th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Reval. Reserve</th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Retained Earnings</th>
                  <th className="text-right p-3 font-semibold text-foreground text-xs">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border"><td className="p-3 font-semibold">Balance at 1 Jan</td><td className="text-right p-3">50,000</td><td className="text-right p-3">10,000</td><td className="text-right p-3">5,000</td><td className="text-right p-3">20,000</td><td className="text-right p-3 font-semibold">85,000</td></tr>
                <tr className="border-b border-border"><td className="p-3">Profit for the year</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">33,000</td><td className="text-right p-3">33,000</td></tr>
                <tr className="border-b border-border"><td className="p-3">Dividends paid</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">—</td><td className="text-right p-3">(6,000)</td><td className="text-right p-3">(6,000)</td></tr>
                <tr className="bg-muted/60 font-semibold text-accent"><td className="p-3">Balance at 31 Dec</td><td className="text-right p-3">50,000</td><td className="text-right p-3">10,000</td><td className="text-right p-3">5,000</td><td className="text-right p-3">47,000</td><td className="text-right p-3">112,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm italic text-center">Retained earnings: €20,000 + €33,000 profit − €6,000 dividends = €47,000. Total equity: €112,000.</p>
        </div>

        {/* Step 4 — Statement of Financial Position */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold">4</span>
            Statement of Financial Position
          </h4>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-muted/60 border-b border-border p-3">
              <p className="font-mono font-semibold text-foreground text-sm text-center">Statement of Financial Position as at 31 December 20X1</p>
            </div>
            <div className="p-4 md:p-6 font-mono text-sm space-y-1">
              <div className="pb-1"><span className="font-semibold text-foreground">Non-Current Assets</span></div>
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 pl-4">
                <span></span><span className="text-right text-muted-foreground text-xs">Cost</span><span className="text-right text-muted-foreground text-xs">Acc. Dep.</span><span className="text-right text-muted-foreground text-xs">NBV</span>
              </div>
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 pl-4">
                <span>Land &amp; Buildings</span><span className="text-right">80,000</span><span className="text-right">(10,000)</span><span className="text-right">70,000</span>
              </div>
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 pl-4">
                <span>Plant &amp; Equipment</span><span className="text-right">40,000</span><span className="text-right">(12,000)</span><span className="text-right">28,000</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1">
                <span className="font-semibold">Total Non-Current Assets</span><span className="text-right font-semibold">98,000</span>
              </div>

              <div className="pt-4 pb-1"><span className="font-semibold text-foreground">Current Assets</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Inventories</span><span className="text-right">16,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Trade Receivables</span><span className="text-right">18,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Cash &amp; Cash Equivalents</span><span className="text-right">27,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1">
                <span className="font-semibold">Total Current Assets</span><span className="text-right font-semibold">61,000</span>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t-2 border-accent pt-2 mt-2 font-semibold text-accent">
                <span>Total Assets</span><span className="text-right">159,000</span>
              </div>

              <div className="pt-6 pb-1"><span className="font-semibold text-foreground">Equity</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Ordinary Share Capital (€1 shares)</span><span className="text-right">50,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Share Premium</span><span className="text-right">10,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Revaluation Reserve</span><span className="text-right">5,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Retained Earnings</span><span className="text-right">47,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1">
                <span className="font-semibold">Total Equity</span><span className="text-right font-semibold">112,000</span>
              </div>

              <div className="pt-4 pb-1"><span className="font-semibold text-foreground">Non-Current Liabilities</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Long-term Loan (8%)</span><span className="text-right">25,000</span></div>

              <div className="pt-4 pb-1"><span className="font-semibold text-foreground">Current Liabilities</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Trade Payables</span><span className="text-right">14,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 pl-4"><span>Current Tax Payable</span><span className="text-right">8,000</span></div>
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-border pt-1 mt-1">
                <span className="font-semibold">Total Current Liabilities</span><span className="text-right font-semibold">22,000</span>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t-2 border-accent pt-2 mt-2 font-semibold text-accent">
                <span>Total Equity &amp; Liabilities</span><span className="text-right">159,000</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic text-center">Total Assets (€159,000) = Total Equity &amp; Liabilities (€159,000) — the statement balances.</p>
        </div>
      </div>
    ),
  },
];

const CompanyAccountsPage = () => {
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
      <StickyNav onNavigate={openAndScrollTo} items={companyNavItems} title="Company" />

      <header className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link
            to="/year-end-adjustments"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Year-End Adjustments
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3">
            Introduction to Company Accounts
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            How companies account for share capital, share premium and present their financial statements under IFRS.
          </p>
        </div>
      </header>

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

      <div className="border-t border-border py-8">
        <div className="container mx-auto px-6 max-w-5xl flex justify-between">
          <Link
            to="/year-end-adjustments"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Year-End Adjustments
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
          >
            Back to main page
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm">
        <p>Double-Entry Bookkeeping — A learning resource for undergraduate accounting students</p>
      </footer>
    </div>
  );
};

export default CompanyAccountsPage;
