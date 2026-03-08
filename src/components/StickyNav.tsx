import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const defaultNavItems = [
  { id: "concepts", label: "Concepts" },
  { id: "equation", label: "Equation" },
  { id: "rules", label: "Rules" },
  { id: "t-accounts", label: "T-Accounts" },
  { id: "trial-balance", label: "Trial Balance" },
  { id: "financial-statements", label: "Statements" },
  { id: "flow-of-information", label: "Flow" },
  { id: "test-your-knowledge", label: "Test" },
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

const StickyNav = ({ onNavigate, items, title = "Double-Entry" }: StickyNavProps) => {
  const navItems = items || defaultNavItems;
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const linkClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
      active
        ? "bg-accent text-accent-foreground"
        : scrolled
        ? "text-muted-foreground hover:text-foreground hover:bg-muted"
        : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
    }`;

  const pageLinkClass = (path: string) =>
    `px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
      location.pathname === path
        ? "bg-accent text-accent-foreground"
        : scrolled
        ? "text-muted-foreground hover:text-foreground hover:bg-muted"
        : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
    }`;

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
          {title}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {/* Double Entry Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1 ${linkClass(isHomePage && !dropdownOpen ? !!activeId : false)}`}
            >
              Double-Entry
              <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[180px] animate-fade-in-up" style={{ animationDuration: "0.15s" }}>
                {navItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      if (isHomePage) {
                        scrollTo(id);
                      } else {
                        window.location.href = `/#${id}`;
                      }
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      activeId === id
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direct page links */}
          <Link to="/year-end-adjustments" className={pageLinkClass("/year-end-adjustments")}>
            Year-End Adjustments
          </Link>
          <Link to="/company-accounts" className={pageLinkClass("/company-accounts")}>
            Company Accounts
          </Link>
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
            <p className="px-4 py-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">Double-Entry</p>
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  if (isHomePage) {
                    scrollTo(id);
                  } else {
                    window.location.href = `/#${id}`;
                  }
                }}
                className={`text-left px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  activeId === id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            ))}
            <div className="h-px bg-border my-2" />
            <Link
              to="/year-end-adjustments"
              onClick={() => setMobileOpen(false)}
              className={`text-left px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                location.pathname === "/year-end-adjustments"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Year-End Adjustments
            </Link>
            <Link
              to="/company-accounts"
              onClick={() => setMobileOpen(false)}
              className={`text-left px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                location.pathname === "/company-accounts"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Company Accounts
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StickyNav;
