import TopicLayout from "@/components/TopicLayout";
import InteractiveQuiz from "@/components/InteractiveQuiz";

const QuizPage = () => (
  <TopicLayout title="Interactive Quiz" description="Put your knowledge to the test with multiple-choice questions.">
    <InteractiveQuiz />
  </TopicLayout>
);

export default QuizPage;
