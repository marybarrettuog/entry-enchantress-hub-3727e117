import TopicLayout from "@/components/TopicLayout";
import FlowOfInformation from "@/components/FlowOfInformation";

const FlowOfInformationPage = () => (
  <TopicLayout
    title="The Flow of Financial Information"
    description="Trace the journey of every number from transaction to financial statements."
    nextTopic={{ to: "/test-your-knowledge", title: "Test Your Knowledge" }}
  >
    <FlowOfInformation />
  </TopicLayout>
);

export default FlowOfInformationPage;
