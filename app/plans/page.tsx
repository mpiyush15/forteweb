import SubscriptionCards from "@/components/SubscriptionCards";

export default function SubscriptionsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      <SubscriptionCards />
    </div>
  );
}