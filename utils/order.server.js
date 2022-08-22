import { db } from "./db.server";
import { getUserId } from "./session.server";


export async function getOrders({request, pending = false}) {
  const sellerId = await getUserId(request);
  const order = await db.order.findMany({
    where: {
      sellerId,
      ...(pending ? {status: "pending"} : {}),
    },
    include: {
      user: true,
      carts: { include: { product: true } },
    },
  });

  if (order) {
    return order;
  }
}

export async function updateOrderStatus(id, changeTo) {
  const order = await db.order.update({
    where: {
      id,
    },
    data: {
      status: changeTo,
    },
  });

  if (order) {
    return order;
  }
}

