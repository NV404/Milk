import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function getTransactions(request) {
  const sellerId = await getUserId(request);
  const transaction = await db.payments.findMany({
    where: {
      sellerId,
      paymentMode: "online",
    },
  });

  if (transaction) {
    return transaction;
  }
}
