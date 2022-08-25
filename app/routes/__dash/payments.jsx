import Card from "~/components/Card";
import { getTransactions } from "utils/payments.server";
import { useLoaderData } from "@remix-run/react";
import { getUserId } from "utils/session.server";
import { getUserById } from "utils/user.server";
import { format } from "date-fns";

export async function loader({ request }) {
  const userID = await getUserId(request);
  const user = await getUserById(userID);
  const transactions = await getTransactions(request);
  return { user, transactions };
}

export default function Payments() {
  const loaderData = useLoaderData();
  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="flex flex-col gap-1 w-full text-center">
        <p className="font-medium">Amount Avaliable</p>
        <p className="font-bold text-2xl">{loaderData.user.balance}₹</p>
      </div>
      <p className="font-medium">Transactions:</p>
      {loaderData.transactions.map((transaction) => (
        <Card
          key={transaction.id}
          theme="green"
          className="flex justify-between"
        >
          <p className="font-medium">Recevied: {transaction.amount}₹</p>
          <p className="text-xs">
            {format(new Date(transaction.createdAt), "dd MMM, yyyy")}
          </p>
        </Card>
      ))}
    </div>
  );
}
