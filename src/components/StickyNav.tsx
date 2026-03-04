import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { id: "concepts", label: "Concepts" },
  { id: "equation", label: "Equation" },
  { id: "t-accounts", label: "T-Accounts" },
  { id: "trial-balance", label: "Trial Balance" },
  { id: "financial-statements", label: "Statements" },
  { id: "rules", label: "Rules" },
  { id: "practice", label: "Practice" },
  { id: "quiz", label: "Quiz" },
];

const StickyNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);

      const offsets = navItems
        .map(({ id }) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      const current = offsets.reduce<string | null>((best, item) => {
        if (item.top <= 120) return item.id;
        return best;
      }, null);

      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-14">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-display font-bold text-sm transition-opacity ${
            scrolled ? "opacity-100 text-foreground" : "opacity-0 pointer-events-none"
          }`}
        >
          Double-Entry
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeId === id
                  ? "bg-accent text-accent-foreground"
                  : scrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-md transition-colors ${
            scrolled ? "text-foreground hover:bg-muted" : "text-primary-foreground hover:bg-primary-foreground/10"
          }`}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border shadow-lg animate-fade-in-up" style={{ animationDuration: "0.2s" }}>
          <div className="container mx-auto px-6 py-3 flex flex-col gap-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  activeId === id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default StickyNav;
