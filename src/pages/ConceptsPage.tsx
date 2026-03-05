import TopicLayout from "@/components/TopicLayout";
import ConceptCards from "@/components/ConceptCards";

const ConceptsPage = () => (
  <TopicLayout title="Core Concepts" description="The fundamental building blocks of double-entry bookkeeping." nextTopic={{ to: "/equation", title: "The Accounting Equation" }}>
    <ConceptCards />
  </TopicLayout>
);

export default ConceptsPage;
