import Card from "~/components/Card";
import { useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { getSubscriptions } from "utils/vendors.server";

export async function loader({ request }) {
  const subscriptions = await getSubscriptions(request);
  return { subscriptions };
}

export default function Payments() {
  const loaderData = useLoaderData();
  return (
    <div className="flex flex-col gap-4 p-10">
      <p className="font-medium">Subscribers:</p>
      {loaderData.subscriptions.map((subscription) => (
        <Card key={subscription.id}>
          <div>
            <div className="bg-purple-200 rounded-lg py-1 w-fit px-3 text-xs">
              Status: {subscription.status}
            </div>
            <p className="font-medium">Name: {subscription.subscriber.name}</p>
            <p className="text-xs">
              Started On:{" "}
              {format(new Date(subscription.createdAt), "dd MMM, yyyy")}
            </p>
            <p>
              <span className="font-medium">Message:</span>{" "}
              {subscription.message}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
