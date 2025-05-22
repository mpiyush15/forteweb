"use client";

import { useRouter } from "next/navigation";
import plans from "@/data/plans";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SubscriptionCards() {
  const router = useRouter();

  const handleSubscribe = (planId: string) => {
    router.push(`/subscribe/${planId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className="transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer"
        >
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold mb-3">{plan.price}</p>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSubscribe(plan.id)} className="w-full">
              Subscribe
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}