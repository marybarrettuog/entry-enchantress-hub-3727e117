import TopicLayout from "@/components/TopicLayout";
import AccountingCycleOrder from "@/components/AccountingCycleOrder";
import ClassificationQuiz from "@/components/ClassificationQuiz";
import PracticeExamples from "@/components/PracticeExamples";
import InteractiveQuiz from "@/components/InteractiveQuiz";

const TestKnowledgePage = () => (
  <TopicLayout
    title="Test Your Knowledge"
    description="Classify accounts, work through real transactions, and challenge yourself with quiz questions."
    prevTopic={{ to: "/flow-of-information", title: "Flow of Information" }}
  >
    <div className="space-y-0">
      <AccountingCycleOrder />

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 text-center">
            Classification Quiz
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Sort accounts into the correct categories.
          </p>
        </div>
        <ClassificationQuiz />
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 text-center">
            Practice Examples
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Work through real-world transactions step by step.
          </p>
        </div>
        <PracticeExamples />
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 text-center">
            Interactive Quiz
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Put your knowledge to the test with multiple-choice questions.
          </p>
        </div>
        <InteractiveQuiz />
      </section>
    </div>
  </TopicLayout>
);

export default TestKnowledgePage;
