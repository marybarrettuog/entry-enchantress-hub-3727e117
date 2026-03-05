import TopicLayout from "@/components/TopicLayout";
import TAccountVisual from "@/components/TAccountVisual";

const TAccountsPage = () => (
  <TopicLayout title="T-Accounts" description="Visualise debits and credits using the classic T-account format." prevTopic={{ to: "/rules", title: "Debit & Credit Rules" }} nextTopic={{ to: "/trial-balance", title: "Trial Balance" }}>
    <TAccountVisual />
  </TopicLayout>
);

export default TAccountsPage;
