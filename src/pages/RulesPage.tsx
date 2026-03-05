import TopicLayout from "@/components/TopicLayout";
import DebitCreditRules from "@/components/DebitCreditRules";

const RulesPage = () => (
  <TopicLayout title="Debit & Credit Rules" description="Learn when to debit and when to credit each account type." prevTopic={{ to: "/equation", title: "The Accounting Equation" }} nextTopic={{ to: "/t-accounts", title: "T-Accounts" }}>
    <DebitCreditRules />
  </TopicLayout>
);

export default RulesPage;
