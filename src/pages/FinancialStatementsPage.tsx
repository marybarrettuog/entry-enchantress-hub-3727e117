import TopicLayout from "@/components/TopicLayout";
import FinancialStatements from "@/components/FinancialStatements";

const FinancialStatementsPage = () => (
  <TopicLayout title="Financial Statements" description="Understand the Statement of Profit or Loss, Statement of Financial Position, and more." nextTopic={{ to: "/cycle-order", title: "The Accounting Cycle" }}>
    <FinancialStatements />
  </TopicLayout>
);

export default FinancialStatementsPage;
