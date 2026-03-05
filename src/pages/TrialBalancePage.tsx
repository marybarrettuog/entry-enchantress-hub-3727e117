import TopicLayout from "@/components/TopicLayout";
import TrialBalance from "@/components/TrialBalance";

const TrialBalancePage = () => (
  <TopicLayout title="Trial Balance" description="Check that your books balance by listing all account totals." prevTopic={{ to: "/t-accounts", title: "T-Accounts" }} nextTopic={{ to: "/financial-statements", title: "Financial Statements" }}>
    <TrialBalance />
  </TopicLayout>
);

export default TrialBalancePage;
