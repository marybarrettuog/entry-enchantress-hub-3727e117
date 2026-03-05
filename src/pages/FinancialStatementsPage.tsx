import TopicLayout from "@/components/TopicLayout";
import FinancialStatements from "@/components/FinancialStatements";

const FinancialStatementsPage = () => (
  <TopicLayout title="Financial Statements" description="Understand the Statement of Profit or Loss, Statement of Financial Position, and more." nextTopic={{ to: "/flow-of-information", title: "Flow of Information" }}>
    <FinancialStatements />
  </TopicLayout>
);

export default FinancialStatementsPage;
