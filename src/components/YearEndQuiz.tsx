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
    scenario: "Year end is 31 December. The electricity bill for November–December (€480) has not yet been paid or recorded.",
    options: [
      "Dr Electricity Expense €480 / Cr Accrued Expenses €480",
      "Dr Accrued Expenses €480 / Cr Electricity Expense €480",
      "Dr Electricity Expense €480 / Cr Bank €480",
      "Dr Prepaid Expenses €480 / Cr Electricity Expense €480",
    ],
    correctIndex: 0,
    explanation:
      "This is an accrued expense — the cost has been incurred but not yet paid. Debit the expense (increase) and credit Accrued Expenses (a current liability).",
  },
  {
    id: 2,
    scenario:
      "A business sub-lets part of its premises. Rent of €750 for December has been earned but will not be received until January.",
    options: [
      "Dr Rental Income €750 / Cr Bank €750",
      "Dr Bank €750 / Cr Rental Income €750",
      "Dr Accrued Income €750 / Cr Rental Income €750",
      "Dr Rental Income €750 / Cr Accrued Income €750",
    ],
    correctIndex: 2,
    explanation:
      "This is accrued income — earned but not yet received. Debit Accrued Income (a current asset) and credit Rental Income to recognise it in the correct period.",
  },
  {
    id: 3,
    scenario:
      "On 1 October, a business pays €3,600 for 12 months of insurance. Year end is 31 December. What adjustment is needed?",
    calculation:
      "Only 3 of 12 months relate to this year (Oct–Dec). 3/12 × €3,600 = €900 used. Prepaid: €3,600 − €900 = €2,700.",
    options: [
      "Dr Insurance Expense €2,700 / Cr Prepaid Expenses €2,700",
      "Dr Prepaid Expenses €2,700 / Cr Insurance Expense €2,700",
      "Dr Prepaid Expenses €900 / Cr Insurance Expense €900",
      "Dr Insurance Expense €3,600 / Cr Bank €3,600",
    ],
    correctIndex: 1,
    explanation:
      "€2,700 relates to next year and must be removed from the expense. Debit Prepaid Expenses (current asset) and credit Insurance Expense to reduce it to the correct €900.",
  },
  {
    id: 4,
    scenario:
      "On 1 November, a business receives €2,400 for 4 months of consultancy services. Year end is 31 December. What adjustment is needed?",
    calculation:
      "2 of 4 months earned this year (Nov–Dec). Earned: €1,200. Deferred: €2,400 − €1,200 = €1,200.",
    options: [
      "Dr Deferred Income €1,200 / Cr Consultancy Income €1,200",
      "Dr Consultancy Income €1,200 / Cr Deferred Income €1,200",
      "Dr Consultancy Income €2,400 / Cr Bank €2,400",
      "Dr Bank €1,200 / Cr Consultancy Income €1,200",
    ],
    correctIndex: 1,
    explanation:
      "€1,200 relates to next year. Debit Consultancy Income (reducing it to €1,200 earned) and credit Deferred Income (a current liability).",
  },
  {
    id: 5,
    scenario:
      "A machine costs €20,000 with a residual value of €2,000 and a useful life of 6 years. Calculate the annual straight-line depreciation and select the correct journal entry.",
    calculation: "(€20,000 − €2,000) ÷ 6 = €3,000 per year.",
    options: [
      "Dr Depreciation Expense €3,000 / Cr Accumulated Depreciation €3,000",
      "Dr Accumulated Depreciation €3,000 / Cr Equipment €3,000",
      "Dr Depreciation Expense €3,333 / Cr Accumulated Depreciation €3,333",
      "Dr Equipment €3,000 / Cr Depreciation Expense €3,000",
    ],
    correctIndex: 0,
    explanation:
      "Straight-line: (Cost − Residual) ÷ Life = (€20,000 − €2,000) ÷ 6 = €3,000. Debit the expense, credit Accumulated Depreciation.",
  },
  {
    id: 6,
    scenario:
      "Equipment with a carrying amount of €16,000 is depreciated at 25% using the reducing balance method. What is the depreciation charge?",
    calculation: "€16,000 × 25% = €4,000.",
    options: [
      "Dr Depreciation Expense €4,000 / Cr Accumulated Depreciation €4,000",
      "Dr Depreciation Expense €4,000 / Cr Equipment €4,000",
      "Dr Accumulated Depreciation €4,000 / Cr Depreciation Expense €4,000",
      "Dr Depreciation Expense €3,200 / Cr Accumulated Depreciation €3,200",
    ],
    correctIndex: 0,
    explanation:
      "Reducing balance applies the percentage to the carrying amount: €16,000 × 25% = €4,000. Debit the expense, credit Accumulated Depreciation.",
  },
  {
    id: 7,
    scenario:
      "A customer who owes €1,200 has gone bankrupt. The debt is irrecoverable. What is the correct journal entry?",
    options: [
      "Dr Trade Receivables €1,200 / Cr Irrecoverable Debts Expense €1,200",
      "Dr Irrecoverable Debts Expense €1,200 / Cr Trade Receivables €1,200",
      "Dr Irrecoverable Debts Expense €1,200 / Cr Bank €1,200",
      "Dr Doubtful Debt Expense €1,200 / Cr Allowance for Doubtful Debts €1,200",
    ],
    correctIndex: 1,
    explanation:
      "An irrecoverable debt is written off entirely. Debit the expense and credit Trade Receivables to remove the debt from the books.",
  },
  {
    id: 8,
    scenario:
      "Trade receivables total €15,000 after writing off irrecoverable debts. The allowance for doubtful debts is to be maintained at 4%. The existing allowance is €400. What adjustment is needed?",
    calculation:
      "Required: 4% × €15,000 = €600. Existing: €400. Increase needed: €200.",
    options: [
      "Dr Allowance for Doubtful Debts €200 / Cr Doubtful Debt Expense €200",
      "Dr Doubtful Debt Expense €600 / Cr Allowance for Doubtful Debts €600",
      "Dr Doubtful Debt Expense €200 / Cr Allowance for Doubtful Debts €200",
      "Dr Doubtful Debt Expense €400 / Cr Allowance for Doubtful Debts €400",
    ],
    correctIndex: 2,
    explanation:
      "Only the change in allowance is recorded. The allowance must increase by €200 (from €400 to €600). Debit Doubtful Debt Expense, credit Allowance for Doubtful Debts.",
  },
  {
    id: 9,
    scenario:
      "At year end, closing inventory is valued at €5,800. What is the correct journal entry?",
    options: [
      "Dr Inventory Cost of Goods Sold €5,800 / Cr Inventory Asset €5,800",
      "Dr Purchases €5,800 / Cr Inventory Asset €5,800",
      "Dr Inventory Asset €5,800 / Cr Inventory Cost of Goods Sold €5,800",
      "Dr Inventory Asset €5,800 / Cr Purchases €5,800",
    ],
    correctIndex: 2,
    explanation:
      "Closing inventory is an asset (unsold stock). Debit Inventory Asset and credit Inventory Cost of Goods Sold to remove the unsold portion from the cost of sales.",
  },
  {
    id: 10,
    scenario:
      "The trial balance does not balance — the credit side exceeds the debit side by €360. A suspense account is opened. Later, it is discovered that a purchase of €680 was recorded as €500 in the Purchases account (debit side only). What is the correcting entry?",
    calculation:
      "Purchases was understated by €180 (€680 − €500). The debit side was short by €180, which matches a €360 discrepancy only if there's another error — but this single error accounts for €180. The suspense account needs to be credited to clear the €180 portion.",
    options: [
      "Dr Suspense Account €180 / Cr Purchases €180",
      "Dr Purchases €180 / Cr Suspense Account €180",
      "Dr Purchases €360 / Cr Suspense Account €360",
      "Dr Trade Payables €180 / Cr Suspense Account €180",
    ],
    correctIndex: 1,
    explanation:
      "Purchases was debited with €500 instead of €680 — it's understated by €180. Debit Purchases with the extra €180 and credit the Suspense Account to partially clear it.",
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

const YearEndQuiz = () => {
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

export default YearEndQuiz;
