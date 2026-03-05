import TopicLayout from "@/components/TopicLayout";
import AccountingEquation from "@/components/AccountingEquation";

const EquationPage = () => (
  <TopicLayout title="The Accounting Equation" description="Assets = Liabilities + Equity — the foundation of every statement of financial position." prevTopic={{ to: "/concepts", title: "Core Concepts" }} nextTopic={{ to: "/rules", title: "Debit & Credit Rules" }}>
    <AccountingEquation />
  </TopicLayout>
);

export default EquationPage;
