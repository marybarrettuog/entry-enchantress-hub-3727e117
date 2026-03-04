import heroImage from "@/assets/hero-ledger.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="Vintage accounting ledger" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/80" />
    </div>
    <div className="relative container mx-auto px-6 py-24 md:py-36 text-center">
      <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4 animate-fade-in-up">
        Accounting Fundamentals
      </p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        Double-Entry<br />Bookkeeping
      </h1>
      <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        Master the foundation of modern accounting — every transaction tells two sides of the same story.
      </p>
    </div>
  </section>
);

export default HeroSection;
