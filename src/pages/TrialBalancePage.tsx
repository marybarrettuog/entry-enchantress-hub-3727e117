import TopicLayout from "@/components/TopicLayout";
import TrialBalance from "@/components/TrialBalance";

const TrialBalancePage = () => (
  <TopicLayout title="Trial Balance" description="Check that your books balance by listing all account totals.">
    <TrialBalance />
  </TopicLayout>
);

export default TrialBalancePage;
