import { useState, useCallback } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from "lucide-react";

interface QuizQuestion {
  id: number;
  scenario: string;
  calculation?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const allQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario: "A company issues 10,000 ordinary shares of €1 each at a price of €2.50 per share, fully paid in cash. What is the correct double entry?",
    options: [
      "Dr Bank €25,000 / Cr Ordinary Share Capital €25,000",
      "Dr Bank €25,000 / Cr Ordinary Share Capital €10,000, Cr Share Premium €15,000",
      "Dr Bank €10,000 / Cr Ordinary Share Capital €10,000",
      "Dr Bank €25,000 / Cr Ordinary Share Capital €15,000, Cr Share Premium €10,000",
    ],
    correctIndex: 1,
    explanation:
      "Total cash received: 10,000 × €2.50 = €25,000. The nominal value (10,000 × €1 = €10,000) goes to Share Capital. The excess (€15,000) goes to Share Premium.",
  },
  {
    id: 2,
    scenario: "Which of the following best describes 'Share Premium'?",
    options: [
      "The total market value of all issued shares",
      "The excess received above the nominal value when shares are issued",
      "Profits retained in the business after dividends",
      "The difference between authorised and issued share capital",
    ],
    correctIndex: 1,
    explanation:
      "Share Premium is the amount received from shareholders above the nominal (par) value of the shares when they are issued. It is a capital reserve and is not distributable as dividends.",
  },
  {
    id: 3,
    scenario: "A company buys back 8,000 ordinary shares (€1 nominal) at €2.00 each and cancels them. The premium is charged to retained earnings. What is the correct double entry?",
    calculation: "Total paid: 8,000 × €2.00 = €16,000. Nominal: €8,000. Premium on buyback: €8,000.",
    options: [
      "Dr Ordinary Share Capital €16,000 / Cr Bank €16,000",
      "Dr Ordinary Share Capital €8,000, Dr Share Premium €8,000 / Cr Bank €16,000",
      "Dr Ordinary Share Capital €8,000, Dr Retained Earnings €8,000 / Cr Bank €16,000",
      "Dr Bank €16,000 / Cr Ordinary Share Capital €8,000, Cr Retained Earnings €8,000",
    ],
    correctIndex: 2,
    explanation:
      "Share Capital is debited with the nominal value (€8,000) to cancel the shares. The excess paid above nominal (€8,000) is charged to Retained Earnings. Bank is credited with the total cash paid (€16,000).",
  },
  {
    id: 4,
    scenario: "In the Statement of Financial Position, where does Share Premium appear?",
    options: [
      "Under Non-Current Liabilities",
      "Under Current Assets",
      "Within the Equity section",
      "Under Current Liabilities",
    ],
    correctIndex: 2,
    explanation:
      "Share Premium is part of equity. It sits alongside Share Capital, Retained Earnings and other reserves in the equity section of the Statement of Financial Position.",
  },
  {
    id: 5,
    scenario:
      "A company has Revenue of €200,000, Cost of Sales of €120,000, Distribution Costs of €15,000, Administrative Expenses of €25,000, and Finance Costs of €3,000. What is the Profit Before Tax?",
    calculation: "Gross Profit: €200,000 − €120,000 = €80,000. Less: Distribution (€15,000) + Admin (€25,000) + Finance Costs (€3,000) = €43,000. PBT: €80,000 − €43,000 = €37,000.",
    options: [
      "€80,000",
      "€40,000",
      "€37,000",
      "€60,000",
    ],
    correctIndex: 2,
    explanation:
      "Gross Profit is €80,000. Deducting Distribution Costs (€15,000), Administrative Expenses (€25,000) and Finance Costs (€3,000) gives Profit Before Tax of €37,000.",
  },
  {
    id: 6,
    scenario: "Which of the following would NOT typically be classified under 'Distribution Costs' in a Statement of Profit or Loss?",
    options: [
      "Delivery vehicle depreciation",
      "Sales staff commissions",
      "Office rent",
      "Advertising expenses",
    ],
    correctIndex: 2,
    explanation:
      "Office rent is an administrative expense — it relates to general business overheads, not the cost of delivering goods to customers. Distribution costs cover delivery, warehousing, sales commissions and marketing.",
  },
  {
    id: 7,
    scenario: "The Statement of Changes in Equity shows opening retained earnings of €30,000, profit for the year of €18,000, and dividends paid of €5,000. What are closing retained earnings?",
    calculation: "€30,000 + €18,000 − €5,000 = €43,000.",
    options: [
      "€48,000",
      "€43,000",
      "€35,000",
      "€53,000",
    ],
    correctIndex: 1,
    explanation:
      "Closing Retained Earnings = Opening balance (€30,000) + Profit for the year (€18,000) − Dividends paid (€5,000) = €43,000.",
  },
  {
    id: 8,
    scenario: "Which of the following is the key difference between ordinary shares and preference shares?",
    options: [
      "Ordinary shares have a fixed dividend; preference shares do not",
      "Preference shares carry voting rights; ordinary shares do not",
      "Preference shares carry a fixed dividend and are paid before ordinary shareholders",
      "Ordinary shares must be redeemed; preference shares cannot be",
    ],
    correctIndex: 2,
    explanation:
      "Preference shares carry a fixed dividend rate and are paid before ordinary shareholders. Ordinary shareholders bear more risk but benefit from growth and typically have voting rights.",
  },
  {
    id: 9,
    scenario: "In the Statement of Financial Position, 'Trade & Other Receivables' would include which of the following?",
    options: [
      "Bank overdraft and accruals",
      "Trade receivables, prepayments and accrued income",
      "Inventory, cash and trade receivables",
      "Trade payables and deferred income",
    ],
    correctIndex: 1,
    explanation:
      "Trade & Other Receivables includes amounts owed to the company: trade receivables (credit customers), prepayments (expenses paid in advance) and accrued income (revenue earned but not yet received).",
  },
  {
    id: 10,
    scenario: "A company issues 5,000 ordinary shares of €1 each at par. How is this recorded?",
    options: [
      "Dr Bank €5,000 / Cr Ordinary Share Capital €5,000",
      "Dr Ordinary Share Capital €5,000 / Cr Bank €5,000",
      "Dr Bank €5,000 / Cr Share Premium €5,000",
      "Dr Bank €5,000 / Cr Retained Earnings €5,000",
    ],
    correctIndex: 0,
    explanation:
      "At par means the issue price equals the nominal value — no share premium arises. Debit Bank (asset increases) and credit Ordinary Share Capital (equity increases).",
  },
  {
    id: 11,
    scenario: "Which financial statement reconciles the opening and closing balances of each component of equity?",
    options: [
      "Statement of Profit or Loss",
      "Statement of Financial Position",
      "Statement of Cash Flows",
      "Statement of Changes in Equity",
    ],
    correctIndex: 3,
    explanation:
      "The Statement of Changes in Equity (SOCIE) reconciles each equity component — share capital, share premium, reserves and retained earnings — from opening to closing balances.",
  },
  {
    id: 12,
    scenario: "Under IAS 1, the Statement of Financial Position must distinguish between which types of assets and liabilities?",
    options: [
      "Tangible and intangible",
      "Current and non-current",
      "Operating and financing",
      "Domestic and foreign",
    ],
    correctIndex: 1,
    explanation:
      "IAS 1 requires entities to present current and non-current assets and liabilities as separate classifications on the Statement of Financial Position.",
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const QUIZ_SIZE = 8;

const CompanyAccountsQuiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    shuffleArray(allQuestions).slice(0, QUIZ_SIZE)
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = useCallback(
    (idx: number) => {
      if (showResult) return;
      setSelected(idx);
      setShowResult(true);
      if (idx === q.correctIndex) setScore((s) => s + 1);
    },
    [showResult, q]
  );

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  }, [current, questions.length]);

  const handleRestart = useCallback(() => {
    setQuestions(shuffleArray(allQuestions).slice(0, QUIZ_SIZE));
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  }, []);

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-10 space-y-5">
        <Trophy className="w-14 h-14 text-accent mx-auto" />
        <h3 className="text-2xl font-display font-bold text-foreground">
          Quiz Complete!
        </h3>
        <p className="text-lg text-muted-foreground">
          You scored{" "}
          <span className="font-semibold text-foreground">
            {score}/{questions.length}
          </span>{" "}
          ({pct}%)
        </p>
        <div className="w-full max-w-xs mx-auto bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors mt-4"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {current + 1} of {questions.length}
        </span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Scenario */}
      <div className="bg-muted/40 rounded-lg p-5 border border-border">
        <p className="text-foreground leading-relaxed">{q.scenario}</p>
        {q.calculation && (
          <p className="text-accent font-mono text-sm mt-3 bg-card rounded p-3 border border-border">
            {q.calculation}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let border = "border-border";
          let bg = "bg-card hover:border-accent/50";
          if (showResult) {
            if (idx === q.correctIndex) {
              border = "border-green-500";
              bg = "bg-green-500/10";
            } else if (idx === selected && idx !== q.correctIndex) {
              border = "border-red-500";
              bg = "bg-red-500/10";
            } else {
              bg = "bg-card opacity-50";
            }
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border ${border} ${bg} transition-all duration-200 font-mono text-sm flex items-start gap-3`}
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{opt}</span>
              {showResult && idx === q.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              )}
              {showResult && idx === selected && idx !== q.correctIndex && (
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className="bg-muted/40 rounded-lg p-5 border border-border animate-fade-in-up" style={{ animationDuration: "0.25s" }}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Explanation: </span>
            {q.explanation}
          </p>
        </div>
      )}

      {/* Next */}
      {showResult && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
          >
            {current + 1 >= questions.length ? "See Results" : "Next Question"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyAccountsQuiz;
