import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const bookkeepingItems = [
  { id: "concepts", label: "Core Concepts" },
  { id: "equation", label: "Accounting Equation" },
  { id: "rules", label: "Debit & Credit Rules" },
  { id: "t-accounts", label: "T-Accounts" },
  { id: "trial-balance", label: "Trial Balance" },
  { id: "financial-statements", label: "Financial Statements" },
  { id: "flow-of-information", label: "Flow of Information" },
  { id: "test-your-knowledge", label: "Test Your Knowledge" },
];

const yearEndItems = [
  { id: "accruals", label: "Accruals" },
  { id: "prepayments", label: "Prepayments" },
  { id: "depreciation", label: "Depreciation" },
  { id: "bad-debts", label: "Bad Debts" },
  { id: "allowance-doubtful", label: "Allowance for Doubtful Debts" },
  { id: "closing-inventory", label: "Closing Inventory" },
  { id: "correction-errors", label: "Correction of Errors" },
  { id: "worked-example", label: "Worked Example" },
  { id: "quiz", label: "Quiz" },
];

const companyItems = [
  { id: "why-companies", label: "Why Are Companies Formed?" },
  { id: "share-capital", label: "Share Capital" },
  { id: "issuing-shares", label: "Issuing Shares" },
  { id: "share-buybacks", label: "Share Buybacks" },
  { id: "sopl", label: "Statement of Profit or Loss" },
  { id: "sofp", label: "Statement of Financial Position" },
  { id: "socie", label: "Statement of Changes in Equity" },
  { id: "worked-example", label: "Worked Example" },
  { id: "quiz", label: "Quiz" },
];

interface NavItem {
  id: string;
  label: string;
}

interface StickyNavProps {
  onNavigate?: (id: string) => void;
  items?: NavItem[];
  title?: string;
}

type DropdownKey = "bookkeeping" | "yearend" | "company" | null;

const StickyNav = ({ onNavigate, items, title = "Basics of Book-Keeping" }: StickyNavProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isYearEnd = location.pathname === "/year-end-adjustments";
  const isCompany = location.pathname === "/company-accounts";

  // Use page-specific items for scroll tracking
  const trackItems = isHomePage
    ? (items || bookkeepingItems)
    : isYearEnd
    ? yearEndItems
    : isCompany
    ? companyItems
    : [];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const offsets = trackItems
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
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollToSection = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const navigateToPageSection = (path: string, id: string) => {
    if (location.pathname === path) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `${path}#${id}`;
    }
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const btnBase = (active: boolean) =>
    `flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
      active
        ? "bg-accent text-accent-foreground"
        : scrolled
        ? "text-muted-foreground hover:text-foreground hover:bg-muted"
        : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
    }`;

  const renderDropdown = (
    key: DropdownKey,
    label: string,
    ddItems: { id: string; label: string }[],
    path: string,
    isCurrentPage: boolean
  ) => (
    <div className="relative" key={key}>
      <button onClick={() => toggleDropdown(key)} className={btnBase(isCurrentPage)}>
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === key ? "rotate-180" : ""}`} />
      </button>
      {openDropdown === key && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[220px] animate-fade-in-up z-50" style={{ animationDuration: "0.15s" }}>
          <button
            key={`${key}-page`}
            onClick={() => {
              if (isCurrentPage) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                window.location.href = path;
              }
              setMobileOpen(false);
              setOpenDropdown(null);
            }}
            className={`w-full text-left px-4 py-2 text-sm font-bold transition-colors ${
              isCurrentPage ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {label}
          </button>
          <div className="h-px bg-border mx-2 my-1" />
          {ddItems.map(({ id, label: itemLabel }) => (
            <button
              key={`${key}-${id}`}
              onClick={() => {
                if (isCurrentPage) {
                  scrollToSection(id);
                } else {
                  navigateToPageSection(path, id);
                }
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                isCurrentPage && activeId === id
                  ? "bg-accent text-accent-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {itemLabel}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderMobileGroup = (
    key: DropdownKey,
    label: string,
    ddItems: { id: string; label: string }[],
    path: string,
    isCurrentPage: boolean
  ) => (
    <div key={key}>
      <button
        onClick={() => setMobileExpanded((prev) => (prev === key ? null : key))}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-foreground"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === key ? "rotate-180" : ""}`} />
      </button>
      {mobileExpanded === key && (
        <div className="flex flex-col gap-0.5 pl-2">
          <button
            onClick={() => {
              if (isCurrentPage) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                window.location.href = path;
              }
              setMobileOpen(false);
            }}
            className="text-left px-4 py-2 rounded-md text-sm font-bold text-foreground"
          >
            {label}
          </button>
          <div className="h-px bg-border mx-2 my-0.5" />
          {ddItems.map(({ id, label: itemLabel }) => (
            <button
              key={`${key}-mob-${id}`}
              onClick={() => {
                if (isCurrentPage) {
                  scrollToSection(id);
                } else {
                  navigateToPageSection(path, id);
                }
                setMobileOpen(false);
              }}
              className={`text-left px-4 py-2 rounded-md text-sm transition-colors ${
                isCurrentPage && activeId === id
                  ? "bg-accent text-accent-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {itemLabel}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav
      ref={navRef}
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
          {title}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {renderDropdown("bookkeeping", "Double-Entry", items || bookkeepingItems, "/", isHomePage)}
          {renderDropdown("yearend", "Year-End Adjustments", yearEndItems, "/year-end-adjustments", isYearEnd)}
          {renderDropdown("company", "Company Accounts", companyItems, "/company-accounts", isCompany)}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => { setMobileOpen(!mobileOpen); setMobileExpanded(null); }}
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
            {renderMobileGroup("bookkeeping", "Double-Entry", items || bookkeepingItems, "/", isHomePage)}
            <div className="h-px bg-border my-1" />
            {renderMobileGroup("yearend", "Year-End Adjustments", yearEndItems, "/year-end-adjustments", isYearEnd)}
            <div className="h-px bg-border my-1" />
            {renderMobileGroup("company", "Company Accounts", companyItems, "/company-accounts", isCompany)}
          </div>
        </div>
      )}
    </nav>
  );
};

export default StickyNav;
