import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface TopicLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const TopicLayout = ({ children, title, description }: TopicLayoutProps) => (
  <div className="min-h-screen bg-background">
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-6 flex items-center h-14 gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
        <span className="text-border">|</span>
        <span className="font-display font-bold text-foreground text-sm truncate">{title}</span>
      </div>
    </nav>

    <header className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">{title}</h1>
        {description && (
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">{description}</p>
        )}
      </div>
    </header>

    <main>{children}</main>

    <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm">
      <p>Double-Entry Bookkeeping — A learning resource for undergraduate accounting students</p>
    </footer>
  </div>
);

export default TopicLayout;
