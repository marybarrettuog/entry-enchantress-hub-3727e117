import { BookOpen, Shield, Scale, FileText, Users, TrendingUp } from "lucide-react";

const reasons = [
  { icon: Shield, title: "Keep Control", desc: "Know exactly what you own, what you owe, and where your money goes — preventing fraud, waste, and mismanagement." },
  { icon: Scale, title: "Manage Assets & Liabilities", desc: "Track what the business owns and owes so you can make informed decisions about spending, investing, and borrowing." },
  { icon: TrendingUp, title: "Keep Score", desc: "Measure profit or loss over time. Without records, you're flying blind — you can't improve what you can't measure." },
  { icon: FileText, title: "Tax & Financial Reporting", desc: "Revenue and other tax authorities require accurate records. Businesses must file tax returns based on their financial data." },
  { icon: BookOpen, title: "Company Law Compliance", desc: "The Companies Act requires limited companies to maintain adequate accounting records and file annual accounts." },
  { icon: Users, title: "Partnership & Stakeholder Agreements", desc: "Partners need reliable records to determine profit shares. Investors, lenders, and regulators all rely on accurate books." },
];

const IntroSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-6 max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-center">
        What is Book-Keeping?
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
        Every time a business buys stock, pays wages, makes a sale, or receives a payment, a <strong className="text-foreground">transaction</strong> has taken place. Book-keeping is the systematic process of recording these financial transactions so that a complete, accurate picture of the business's finances is always available.
      </p>

      <div className="bg-card border border-border rounded-xl p-8 mb-12">
        <h3 className="text-xl font-display font-semibold text-foreground mb-6 text-center">
          Why Keep Financial Records?
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-3">
              <div className="shrink-0 mt-1">
                <r.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">{r.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 border border-border rounded-xl p-8">
        <h3 className="text-xl font-display font-semibold text-foreground mb-4">
          So How Do We Keep These Records?
        </h3>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            In the earliest days of trade, merchants simply listed what came in and what went out — a single column of entries. But as businesses grew more complex, this <strong className="text-foreground">single-entry</strong> approach proved unreliable. It was too easy to make mistakes, and there was no built-in way to check that the books were correct.
          </p>
          <p>
            The solution, developed by Italian merchants in the 15th century and formalised by the mathematician <strong className="text-foreground">Luca Pacioli</strong> in 1494, was a beautifully simple idea: record <em>every</em> transaction <strong className="text-foreground">twice</strong>.
          </p>
          <p>
            This is <strong className="text-foreground">double-entry book-keeping</strong>. For every transaction, we make two entries — a <em>debit</em> in one account and a corresponding <em>credit</em> in another. If you buy office supplies for £200 in cash, you record the supplies coming <em>in</em> (debit) and the cash going <em>out</em> (credit). The two entries are always equal, which means the books must always balance — giving us a powerful, self-checking system.
          </p>
          <p className="text-foreground font-medium italic border-l-4 border-accent pl-4">
            This principle — that every debit has an equal and opposite credit — is the golden thread that runs through all of accounting. It's what you'll master in the sections that follow.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default IntroSection;
