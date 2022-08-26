import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function getVendors() {
  const vendors = await db.user.findMany({
    where: {
      isVendor: true,
    },
  });

  if (vendors) {
    return vendors;
  }
}

export async function getSubscriptions(request) {
  const sellerId = getUserId(request);
  const subscriptions = await db.subscription.findMany({
    where: {
      sellerId,
    },
    include: {
      subscriber: true,
    },
  });

  if (subscriptions) {
    return subscriptions;
  }
}
