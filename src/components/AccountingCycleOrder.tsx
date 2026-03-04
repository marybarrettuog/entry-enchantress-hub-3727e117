import { useState, useCallback } from "react";
import { GripVertical, Check, RotateCcw, ArrowUp, ArrowDown } from "lucide-react";

const CORRECT_ORDER = [
  { id: "transaction", label: "Transaction Occurs", detail: "A real business event takes place — a sale, purchase, or payment." },
  { id: "ledger", label: "Record in Ledgers", detail: "The transaction is recorded using double-entry in the T-accounts." },
  { id: "trial", label: "Extract Trial Balance", detail: "All ledger balances are listed to verify debits equal credits." },
  { id: "statements", label: "Prepare Financial Statements", detail: "The trial balance feeds the P&L and Statement of Financial Position." },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Ensure shuffled order is different from correct
  if (a.every((item, idx) => (item as any).id === CORRECT_ORDER[idx].id)) {
    [a[0], a[a.length - 1]] = [a[a.length - 1], a[0]];
  }
  return a;
}

const stepColors: Record<string, string> = {
  transaction: "bg-accent/15 border-accent/30",
  ledger: "bg-primary/10 border-primary/30",
  trial: "bg-success/15 border-success/30",
  statements: "bg-info/15 border-info/30",
};

const stepBadgeColors: Record<string, string> = {
  transaction: "bg-accent text-accent-foreground",
  ledger: "bg-primary text-primary-foreground",
  trial: "bg-success text-success-foreground",
  statements: "bg-info text-info-foreground",
};

const AccountingCycleOrder = () => {
  const [items, setItems] = useState(() => shuffle([...CORRECT_ORDER]));
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const swap = useCallback((from: number, to: number) => {
    setItems((prev) => {
      const next = [...prev];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
    setChecked(false);
  }, []);

  const handleDragStart = (idx: number) => {
    setDragIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setOverIdx(idx);
  };

  const handleDrop = (idx: number) => {
    if (dragIdx !== null && dragIdx !== idx) {
      swap(dragIdx, idx);
    }
    setDragIdx(null);
    setOverIdx(null);
  };

  const handleDragEnd = () => {
    setDragIdx(null);
    setOverIdx(null);
  };

  const checkAnswer = () => {
    const isCorrect = items.every((item, idx) => item.id === CORRECT_ORDER[idx].id);
    setCorrect(isCorrect);
    setChecked(true);
  };

  const reset = () => {
    setItems(shuffle([...CORRECT_ORDER]));
    setChecked(false);
    setCorrect(false);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            Put It In Order
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Accounting Cycle Challenge
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            Drag and drop (or use the arrows) to arrange the four steps of the
            accounting cycle in the correct order.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="space-y-3">
            {items.map((item, idx) => {
              const isOver = overIdx === idx && dragIdx !== idx;
              const itemCorrect = checked && item.id === CORRECT_ORDER[idx].id;
              const itemWrong = checked && item.id !== CORRECT_ORDER[idx].id;

              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={handleDragEnd}
                  className={`
                    flex items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-grab active:cursor-grabbing select-none
                    ${stepColors[item.id]}
                    ${isOver ? "scale-[1.02] shadow-lg" : ""}
                    ${dragIdx === idx ? "opacity-50" : "opacity-100"}
                    ${itemCorrect ? "!border-success ring-2 ring-success/20" : ""}
                    ${itemWrong ? "!border-destructive ring-2 ring-destructive/20" : ""}
                  `}
                >
                  {/* Grip handle */}
                  <GripVertical className="w-5 h-5 text-muted-foreground shrink-0" />

                  {/* Step number badge */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${stepBadgeColors[item.id]}`}
                  >
                    {idx + 1}
                  </div>

                  {/* Label */}
                  <span className="font-semibold text-foreground text-sm flex-1">
                    {item.label}
                  </span>

                  {/* Arrow buttons for mobile / accessibility */}
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (idx > 0) swap(idx, idx - 1);
                      }}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-muted disabled:opacity-20 transition-colors"
                      aria-label="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (idx < items.length - 1) swap(idx, idx + 1);
                      }}
                      disabled={idx === items.length - 1}
                      className="p-1 rounded hover:bg-muted disabled:opacity-20 transition-colors"
                      aria-label="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Result icon */}
                  {checked && (
                    <div className="shrink-0">
                      {itemCorrect ? (
                        <Check className="w-5 h-5 text-success" />
                      ) : (
                        <span className="text-destructive font-bold text-sm">✗</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          {checked && (
            <div
              className={`mt-6 p-4 rounded-lg border text-center text-sm font-medium ${
                correct
                  ? "bg-success/10 border-success/30 text-success"
                  : "bg-destructive/10 border-destructive/30 text-destructive"
              }`}
            >
              {correct
                ? "🎉 Perfect! You've got the accounting cycle in the right order."
                : "Not quite — try rearranging the steps and check again."}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={checkAnswer}
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Check Order
            </button>
            <button
              onClick={reset}
              className="px-6 py-2.5 rounded-lg border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Shuffle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountingCycleOrder;
