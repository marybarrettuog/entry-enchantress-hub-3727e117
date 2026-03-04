import { useState, useCallback, useMemo } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from "lucide-react";

/* ═══════════════════════════════════════════════
   SECTION 1: Trial Balance Side Quiz
   ═══════════════════════════════════════════════ */

interface TBQuestion {
  account: string;
  correctSide: "debit" | "credit";
  explanation: string;
}

const tbQuestionBank: TBQuestion[] = [
  { account: "Cash", correctSide: "debit", explanation: "Cash is an asset. Assets have debit balances on the trial balance." },
  { account: "Capital", correctSide: "credit", explanation: "Capital is equity (a liability). Equity accounts have credit balances." },
  { account: "Sales Revenue", correctSide: "credit", explanation: "Revenue/gains are credit balances on the trial balance." },
  { account: "Rent Expense", correctSide: "debit", explanation: "Expenses have debit balances on the trial balance." },
  { account: "Accounts Receivable", correctSide: "debit", explanation: "Accounts Receivable is an asset — debit balance." },
  { account: "Accounts Payable", correctSide: "credit", explanation: "Accounts Payable is a liability — credit balance." },
  { account: "Motor Vehicles", correctSide: "debit", explanation: "Motor Vehicles is a non-current asset — debit balance." },
  { account: "Loan", correctSide: "credit", explanation: "A loan is a liability — credit balance." },
  { account: "Wages Expense", correctSide: "debit", explanation: "Wages is an expense — debit balance." },
  { account: "Drawings", correctSide: "debit", explanation: "Drawings reduce equity and are recorded as a debit balance." },
  { account: "Purchases", correctSide: "debit", explanation: "Purchases is an expense — debit balance." },
  { account: "Commission Received", correctSide: "credit", explanation: "Commission Received is income/gain — credit balance." },
  { account: "Insurance Expense", correctSide: "debit", explanation: "Insurance is an expense — debit balance." },
  { account: "Accumulated Depreciation", correctSide: "credit", explanation: "Accumulated Depreciation is a contra-asset — credit balance." },
  { account: "Interest Expense", correctSide: "debit", explanation: "Interest is an expense — debit balance." },
  { account: "Prepayments", correctSide: "debit", explanation: "Prepayments are current assets — debit balance." },
  { account: "Accruals", correctSide: "credit", explanation: "Accruals are current liabilities — credit balance." },
  { account: "Bank Overdraft", correctSide: "credit", explanation: "A bank overdraft is a liability — credit balance." },
  { account: "Equipment", correctSide: "debit", explanation: "Equipment is a non-current asset — debit balance." },
  { account: "Rent Received", correctSide: "credit", explanation: "Rent Received is income — credit balance." },
];

/* ═══════════════════════════════════════════════
   SECTION 2: Financial Statement Classification Quiz
   ═══════════════════════════════════════════════ */

interface FSQuestion {
  account: string;
  correctStatement: "pnl" | "sofp";
  explanation: string;
}

const fsQuestionBank: FSQuestion[] = [
  { account: "Sales Revenue", correctStatement: "pnl", explanation: "Revenue is reported in the Statement of Profit or Loss." },
  { account: "Rent Expense", correctStatement: "pnl", explanation: "Expenses are reported in the Statement of Profit or Loss." },
  { account: "Cash", correctStatement: "sofp", explanation: "Cash is an asset and appears in the Statement of Financial Position." },
  { account: "Capital", correctStatement: "sofp", explanation: "Capital is equity and appears in the Statement of Financial Position." },
  { account: "Wages Expense", correctStatement: "pnl", explanation: "Expenses go to the P&L to calculate profit." },
  { account: "Accounts Receivable", correctStatement: "sofp", explanation: "Accounts Receivable is an asset — it goes on the SoFP." },
  { account: "Accounts Payable", correctStatement: "sofp", explanation: "Accounts Payable is a liability — it goes on the SoFP." },
  { account: "Loan", correctStatement: "sofp", explanation: "A loan is a non-current liability — it goes on the SoFP." },
  { account: "Motor Vehicles", correctStatement: "sofp", explanation: "Motor Vehicles is a non-current asset — SoFP." },
  { account: "Purchases", correctStatement: "pnl", explanation: "Purchases form part of Cost of Sales in the P&L." },
  { account: "Commission Received", correctStatement: "pnl", explanation: "Commission Received is income — it goes to the P&L." },
  { account: "Insurance Expense", correctStatement: "pnl", explanation: "Insurance is an expense reported in the P&L." },
  { account: "Depreciation Expense", correctStatement: "pnl", explanation: "Depreciation is an expense reported in the P&L." },
  { account: "Accumulated Depreciation", correctStatement: "sofp", explanation: "Accumulated Depreciation reduces asset value on the SoFP." },
  { account: "Drawings", correctStatement: "sofp", explanation: "Drawings reduce owner's equity and appear on the SoFP." },
  { account: "Prepayments", correctStatement: "sofp", explanation: "Prepayments are current assets on the SoFP." },
  { account: "Accruals", correctStatement: "sofp", explanation: "Accruals are current liabilities on the SoFP." },
  { account: "Interest Expense", correctStatement: "pnl", explanation: "Interest is an expense reported in the P&L." },
  { account: "Equipment", correctStatement: "sofp", explanation: "Equipment is a non-current asset on the SoFP." },
  { account: "Bad Debts Expense", correctStatement: "pnl", explanation: "Bad debts is an expense — it goes to the P&L." },
];

/* ═══════════════════════════════════════════════ */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUIZ_SIZE = 10;

type QuizMode = "tb" | "fs";

const ClassificationQuiz = () => {
  const [mode, setMode] = useState<QuizMode>("tb");
  const [tbQuestions, setTbQuestions] = useState(() => shuffle(tbQuestionBank).slice(0, QUIZ_SIZE));
  const [fsQuestions, setFsQuestions] = useState(() => shuffle(fsQuestionBank).slice(0, QUIZ_SIZE));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = mode === "tb" ? tbQuestions : fsQuestions;
  const question = questions[index];

  const isCorrect = useMemo(() => {
    if (!submitted || !selected) return false;
    if (mode === "tb") return selected === (question as TBQuestion).correctSide;
    return selected === (question as FSQuestion).correctStatement;
  }, [submitted, selected, mode, question]);

  const correctAnswer = mode === "tb"
    ? (question as TBQuestion).correctSide
    : (question as FSQuestion).correctStatement;

  const handleSubmit = useCallback(() => {
    if (!selected || submitted) return;
    setSubmitted(true);
    if (
      (mode === "tb" && selected === (question as TBQuestion).correctSide) ||
      (mode === "fs" && selected === (question as FSQuestion).correctStatement)
    ) {
      setScore((s) => s + 1);
    }
  }, [selected, submitted, mode, question]);

  const handleNext = useCallback(() => {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
    }
  }, [index, questions.length]);

  const handleRestart = useCallback(() => {
    if (mode === "tb") setTbQuestions(shuffle(tbQuestionBank).slice(0, QUIZ_SIZE));
    else setFsQuestions(shuffle(fsQuestionBank).slice(0, QUIZ_SIZE));
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  }, [mode]);

  const switchMode = (newMode: QuizMode) => {
    setMode(newMode);
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
    if (newMode === "tb") setTbQuestions(shuffle(tbQuestionBank).slice(0, QUIZ_SIZE));
    else setFsQuestions(shuffle(fsQuestionBank).slice(0, QUIZ_SIZE));
  };

  const tbOptions = [
    { value: "debit", label: "Debit Side", color: "success" },
    { value: "credit", label: "Credit Side", color: "info" },
  ];

  const fsOptions = [
    { value: "pnl", label: "Profit & Loss", color: "accent" },
    { value: "sofp", label: "Financial Position", color: "info" },
  ];

  const options = mode === "tb" ? tbOptions : fsOptions;

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center bg-card border border-border rounded-xl p-10">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h3>
            <p className="text-4xl font-display font-bold text-accent mb-1">{score}/{questions.length}</p>
            <p className="text-muted-foreground mb-6">
              {pct >= 80 ? "Excellent! You know your classifications well." : pct >= 50 ? "Good effort — review and try again." : "Keep practising — review the sections above."}
            </p>
            <div className="w-full bg-muted rounded-full h-3 mb-6">
              <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: "hsl(var(--accent))" }} />
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={handleRestart} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={() => switchMode(mode === "tb" ? "fs" : "tb")}
                className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                Switch Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-secondary/50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Classify Correctly</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Classification Quiz</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            {mode === "tb"
              ? "Place each account on the correct side of the trial balance."
              : "Decide whether each item belongs in the P&L or the Statement of Financial Position."}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="max-w-2xl mx-auto flex justify-center gap-2 mb-8">
          <button
            onClick={() => switchMode("tb")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              mode === "tb" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Trial Balance Sides
          </button>
          <button
            onClick={() => switchMode("fs")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              mode === "fs" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            P&L vs SoFP
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <span>Question {index + 1} of {questions.length}</span>
            <span className="font-semibold text-accent">{score} correct</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-8">
            <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${(index / questions.length) * 100}%`, background: "hsl(var(--accent))" }} />
          </div>

          {/* Question card */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <div className="flex items-start gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  {mode === "tb" ? "Which side of the trial balance does this go?" : "Which financial statement does this belong to?"}
                </p>
                <p className="text-foreground font-display font-bold text-2xl">{question.account}</p>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {options.map((opt) => {
                const isSelected = selected === opt.value;
                const showCorrect = submitted && opt.value === correctAnswer;
                const showWrong = submitted && isSelected && opt.value !== correctAnswer;
                return (
                  <button
                    key={opt.value}
                    onClick={() => !submitted && setSelected(opt.value)}
                    disabled={submitted}
                    className={`px-4 py-4 rounded-lg text-sm font-semibold border-2 transition-all ${
                      showCorrect
                        ? "bg-success/15 border-success text-success ring-2 ring-success/30"
                        : showWrong
                        ? "bg-destructive/15 border-destructive text-destructive ring-2 ring-destructive/30"
                        : isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-foreground hover:border-accent/50"
                    } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {submitted && (
              <div
                className={`rounded-lg p-4 mt-4 animate-fade-in-up ${isCorrect ? "bg-success/10 border border-success/20" : "bg-destructive/10 border border-destructive/20"}`}
                style={{ animationDuration: "0.3s" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {isCorrect ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
                  <p className={`font-semibold ${isCorrect ? "text-success" : "text-destructive"}`}>
                    {isCorrect ? "Correct!" : `Not quite — the answer is ${mode === "tb" ? correctAnswer : correctAnswer === "pnl" ? "P&L" : "SoFP"}.`}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">
                  {(question as TBQuestion & FSQuestion).explanation}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {index + 1 >= questions.length ? "See Results" : "Next Question"} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassificationQuiz;
