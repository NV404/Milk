import { db } from "./db.server";

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
