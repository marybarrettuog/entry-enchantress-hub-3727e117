import { useState, useMemo, useCallback } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from "lucide-react";

interface QuizQuestion {
  transaction: string;
  correctDebit: string;
  correctCredit: string;
  accounts: string[];
  explanation: string;
  debitRule: string;
  creditRule: string;
}

const questionBank: QuizQuestion[] = [
  {
    transaction: "Owner invests €10,000 cash into the business",
    correctDebit: "Cash",
    correctCredit: "Capital",
    accounts: ["Cash", "Capital", "Bank", "Drawings", "Sales Revenue", "Purchases"],
    explanation: "Cash (asset) increases — debit. Capital (equity/liability) increases — credit.",
    debitRule: "Asset ↑",
    creditRule: "Liability ↑",
  },
  {
    transaction: "Business pays €800 rent by cheque",
    correctDebit: "Rent Expense",
    correctCredit: "Bank",
    accounts: ["Rent Expense", "Bank", "Cash", "Loan", "Accounts Payable", "Capital"],
    explanation: "Rent Expense increases — debit. Money leaves the bank — credit.",
    debitRule: "Expense ↑",
    creditRule: "Bank Out",
  },
  {
    transaction: "Sold goods for €3,500 on credit",
    correctDebit: "Accounts Receivable",
    correctCredit: "Sales Revenue",
    accounts: ["Accounts Receivable", "Sales Revenue", "Cash", "Purchases", "Bank", "Capital"],
    explanation: "Accounts Receivable (asset) increases — debit. Sales Revenue (gain) increases — credit.",
    debitRule: "Asset ↑",
    creditRule: "Gain ↑",
  },
  {
    transaction: "Bought inventory worth €2,000 on credit",
    correctDebit: "Purchases",
    correctCredit: "Accounts Payable",
    accounts: ["Purchases", "Accounts Payable", "Cash", "Sales Revenue", "Bank", "Inventory"],
    explanation: "Purchases (expense) increases — debit. Accounts Payable (liability) increases — credit.",
    debitRule: "Expense ↑",
    creditRule: "Liability ↑",
  },
  {
    transaction: "Took out a bank loan of €15,000",
    correctDebit: "Bank",
    correctCredit: "Loan",
    accounts: ["Bank", "Loan", "Cash", "Capital", "Interest Expense", "Accounts Payable"],
    explanation: "Money comes into the bank — debit. Loan (liability) increases — credit.",
    debitRule: "Bank In",
    creditRule: "Liability ↑",
  },
  {
    transaction: "Paid wages €1,600 by bank transfer",
    correctDebit: "Wages Expense",
    correctCredit: "Bank",
    accounts: ["Wages Expense", "Bank", "Cash", "Accruals", "Capital", "Drawings"],
    explanation: "Wages Expense increases — debit. Money leaves the bank — credit.",
    debitRule: "Expense ↑",
    creditRule: "Bank Out",
  },
  {
    transaction: "Recorded depreciation of €2,000 on equipment",
    correctDebit: "Depreciation Expense",
    correctCredit: "Accumulated Depreciation",
    accounts: ["Depreciation Expense", "Accumulated Depreciation", "Equipment", "Bank", "Cash", "Repairs Expense"],
    explanation: "Depreciation Expense increases — debit. Accumulated Depreciation (contra-asset, reducing asset value) increases — credit.",
    debitRule: "Expense ↑",
    creditRule: "Asset ↓",
  },
  {
    transaction: "Customer pays €4,500 owed into our bank account",
    correctDebit: "Bank",
    correctCredit: "Accounts Receivable",
    accounts: ["Bank", "Accounts Receivable", "Cash", "Sales Revenue", "Capital", "Accounts Payable"],
    explanation: "Money comes into the bank — debit. Accounts Receivable (asset) decreases — credit.",
    debitRule: "Bank In",
    creditRule: "Asset ↓",
  },
  {
    transaction: "Wrote off a bad debt of €400",
    correctDebit: "Bad Debts Expense",
    correctCredit: "Accounts Receivable",
    accounts: ["Bad Debts Expense", "Accounts Receivable", "Bank", "Cash", "Provision for Bad Debts", "Sales Revenue"],
    explanation: "Bad Debts Expense increases — debit. Accounts Receivable (asset) decreases — credit.",
    debitRule: "Expense ↑",
    creditRule: "Asset ↓",
  },
  {
    transaction: "Owner withdraws €500 cash for personal use",
    correctDebit: "Drawings",
    correctCredit: "Cash",
    accounts: ["Drawings", "Cash", "Bank", "Capital", "Wages Expense", "Loan"],
    explanation: "Drawings (reduction of equity/liability) increases — debit. Cash (asset) decreases — credit.",
    debitRule: "Liability ↓",
    creditRule: "Asset ↓",
  },
  {
    transaction: "Paid supplier €3,000 by bank transfer",
    correctDebit: "Accounts Payable",
    correctCredit: "Bank",
    accounts: ["Accounts Payable", "Bank", "Cash", "Purchases", "Loan", "Capital"],
    explanation: "Accounts Payable (liability) decreases — debit. Money leaves the bank — credit.",
    debitRule: "Liability ↓",
    creditRule: "Bank Out",
  },
  {
    transaction: "Accrued wages of €1,200 at year-end",
    correctDebit: "Wages Expense",
    correctCredit: "Accruals",
    accounts: ["Wages Expense", "Accruals", "Bank", "Cash", "Accounts Payable", "Prepayments"],
    explanation: "Wages Expense increases — debit. Accruals (liability) increases — credit.",
    debitRule: "Expense ↑",
    creditRule: "Liability ↑",
  },
  {
    transaction: "Received rent income €900 into bank",
    correctDebit: "Bank",
    correctCredit: "Rent Received",
    accounts: ["Bank", "Rent Received", "Rent Expense", "Cash", "Accounts Receivable", "Capital"],
    explanation: "Money comes into the bank — debit. Rent Received (gain) increases — credit.",
    debitRule: "Bank In",
    creditRule: "Gain ↑",
  },
  {
    transaction: "Prepaid insurance €1,500 by cheque",
    correctDebit: "Prepayments",
    correctCredit: "Bank",
    accounts: ["Prepayments", "Bank", "Insurance Expense", "Cash", "Accruals", "Accounts Payable"],
    explanation: "Prepayments (asset) increases — debit. Money leaves the bank — credit.",
    debitRule: "Asset ↑",
    creditRule: "Bank Out",
  },
  {
    transaction: "Sold goods for €1,800 cash",
    correctDebit: "Cash",
    correctCredit: "Sales Revenue",
    accounts: ["Cash", "Sales Revenue", "Bank", "Accounts Receivable", "Purchases", "Capital"],
    explanation: "Cash (asset) increases — debit. Sales Revenue (gain) increases — credit.",
    debitRule: "Asset ↑",
    creditRule: "Gain ↑",
  },
  {
    transaction: "Repaid €2,500 of bank loan by transfer",
    correctDebit: "Loan",
    correctCredit: "Bank",
    accounts: ["Loan", "Bank", "Interest Expense", "Cash", "Capital", "Accounts Payable"],
    explanation: "Loan (liability) decreases — debit. Money leaves the bank — credit.",
    debitRule: "Liability ↓",
    creditRule: "Bank Out",
  },
  {
    transaction: "Paid loan interest €300 by direct debit",
    correctDebit: "Interest Expense",
    correctCredit: "Bank",
    accounts: ["Interest Expense", "Bank", "Loan", "Cash", "Capital", "Accruals"],
    explanation: "Interest Expense increases — debit. Money leaves the bank — credit.",
    debitRule: "Expense ↑",
    creditRule: "Bank Out",
  },
  {
    transaction: "Returned €600 of faulty goods to supplier (bought on credit)",
    correctDebit: "Accounts Payable",
    correctCredit: "Purchases Returns",
    accounts: ["Accounts Payable", "Purchases Returns", "Purchases", "Cash", "Bank", "Sales Returns"],
    explanation: "Accounts Payable (liability) decreases — debit. Purchases Returns (gain/reduction of expense) increases — credit.",
    debitRule: "Liability ↓",
    creditRule: "Gain ↑",
  },
  {
    transaction: "Paid electricity bill €250 in cash",
    correctDebit: "Electricity Expense",
    correctCredit: "Cash",
    accounts: ["Electricity Expense", "Cash", "Bank", "Accruals", "Accounts Payable", "Rent Expense"],
    explanation: "Electricity Expense increases — debit. Cash (asset) decreases — credit.",
    debitRule: "Expense ↑",
    creditRule: "Asset ↓",
  },
  {
    transaction: "Owner introduces equipment worth €7,000 into the business",
    correctDebit: "Equipment",
    correctCredit: "Capital",
    accounts: ["Equipment", "Capital", "Bank", "Cash", "Loan", "Accounts Payable"],
    explanation: "Equipment (asset) increases — debit. Capital (equity) increases — credit.",
    debitRule: "Asset ↑",
    creditRule: "Liability ↑",
  },
];

const QUIZ_SIZE = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const InteractiveQuiz = () => {
  const [quizQuestions, setQuizQuestions] = useState(() => shuffle(questionBank).slice(0, QUIZ_SIZE));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDebit, setSelectedDebit] = useState<string | null>(null);
  const [selectedCredit, setSelectedCredit] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentIndex];
  const shuffledAccounts = useMemo(() => shuffle(question.accounts), [question]);

  const isCorrect = submitted && selectedDebit === question.correctDebit && selectedCredit === question.correctCredit;

  const handleSubmit = useCallback(() => {
    if (!selectedDebit || !selectedCredit || submitted) return;
    setSubmitted(true);
    if (selectedDebit === question.correctDebit && selectedCredit === question.correctCredit) {
      setScore((s) => s + 1);
    }
  }, [selectedDebit, selectedCredit, submitted, question]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= quizQuestions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedDebit(null);
      setSelectedCredit(null);
      setSubmitted(false);
    }
  }, [currentIndex, quizQuestions.length]);

  const handleRestart = useCallback(() => {
    setQuizQuestions(shuffle(questionBank).slice(0, QUIZ_SIZE));
    setCurrentIndex(0);
    setSelectedDebit(null);
    setSelectedCredit(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  }, []);

  if (finished) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center bg-card border border-border rounded-xl p-10">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h3>
            <p className="text-4xl font-display font-bold text-accent mb-1">{score}/{quizQuestions.length}</p>
            <p className="text-muted-foreground mb-6">
              {pct >= 80 ? "Excellent work! You've mastered the basics." : pct >= 50 ? "Good effort! Review the rules and try again." : "Keep practising — review the rules above and try again."}
            </p>
            <div className="w-full bg-muted rounded-full h-3 mb-6">
              <div
                className="h-3 rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: `hsl(var(--accent))` }}
              />
            </div>
            <button onClick={handleRestart} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Test Yourself</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Interactive Quiz</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            For each transaction, select the correct account to debit and the correct account to credit.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
            <span className="font-semibold text-accent">{score} correct</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-8">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex) / quizQuestions.length) * 100}%`, background: `hsl(var(--accent))` }}
            />
          </div>

          {/* Question card */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <div className="flex items-start gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-foreground font-semibold text-lg leading-snug">{question.transaction}</p>
            </div>

            {/* Debit selection */}
            <div className="mb-5">
              <p className="font-mono text-xs uppercase tracking-wider text-success font-semibold mb-2">Select the Debit account:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {shuffledAccounts.map((acc) => {
                  const isSelected = selectedDebit === acc;
                  const showCorrect = submitted && acc === question.correctDebit;
                  const showWrong = submitted && isSelected && acc !== question.correctDebit;
                  return (
                    <button
                      key={`d-${acc}`}
                      onClick={() => !submitted && setSelectedDebit(acc)}
                      disabled={submitted}
                      className={`px-3 py-2 rounded-md text-sm font-medium border transition-all ${
                        showCorrect
                          ? "bg-success/15 border-success text-success ring-2 ring-success/30"
                          : showWrong
                          ? "bg-destructive/15 border-destructive text-destructive ring-2 ring-destructive/30"
                          : isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:border-accent/50"
                      } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      {acc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Credit selection */}
            <div className="mb-5">
              <p className="font-mono text-xs uppercase tracking-wider text-info font-semibold mb-2">Select the Credit account:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {shuffledAccounts.map((acc) => {
                  const isSelected = selectedCredit === acc;
                  const showCorrect = submitted && acc === question.correctCredit;
                  const showWrong = submitted && isSelected && acc !== question.correctCredit;
                  return (
                    <button
                      key={`c-${acc}`}
                      onClick={() => !submitted && setSelectedCredit(acc)}
                      disabled={submitted}
                      className={`px-3 py-2 rounded-md text-sm font-medium border transition-all ${
                        showCorrect
                          ? "bg-success/15 border-success text-success ring-2 ring-success/30"
                          : showWrong
                          ? "bg-destructive/15 border-destructive text-destructive ring-2 ring-destructive/30"
                          : isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:border-accent/50"
                      } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      {acc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback */}
            {submitted && (
              <div className={`rounded-lg p-4 mt-4 animate-fade-in-up ${isCorrect ? "bg-success/10 border border-success/20" : "bg-destructive/10 border border-destructive/20"}`} style={{ animationDuration: "0.3s" }}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
                  <p className={`font-semibold ${isCorrect ? "text-success" : "text-destructive"}`}>
                    {isCorrect ? "Correct!" : "Not quite — see the correct answer highlighted above."}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{question.explanation}</p>
                <div className="flex gap-2">
                  <span className="text-xs font-mono bg-success/10 text-success px-2 py-1 rounded">
                    Dr. {question.debitRule}
                  </span>
                  <span className="text-xs font-mono bg-info/10 text-info px-2 py-1 rounded">
                    Cr. {question.creditRule}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedDebit || !selectedCredit}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {currentIndex + 1 >= quizQuestions.length ? "See Results" : "Next Question"} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveQuiz;
