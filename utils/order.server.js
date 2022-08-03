import { emptyCart, getCart } from "./cart.server";
import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function createOrder(request) {
  const userID = await getUserId(request);
  const cart = await getCart(request);
  const deliveryCharge = await calculateDeliveryCharge(request);
  let price = 0;

  cart.map((item) => {
    price += item.product.price * item.quantity;
    return null;
  });

  const discount = price >= 100 ? Math.round((price / 100) * 5) : 0;

  const order = await db.order.create({
    data: {
      price: price - discount,
      userID: userID,
      deliveryCharge: deliveryCharge,
      carts: { connect: cart.map((item) => ({ id: item.id })) },
    },
    include: {
      carts: { include: { product: true } },
      user: true,
    },
  });
  if (order) {
    const cart = await emptyCart(request);
    if (cart) {
      return cart;
    }
    return;
  }
  return;
}

export async function getOrders(request) {
  const userID = await getUserId(request);
  const order = await db.order.findMany({
    where: {
      userID: userID,
    },
    include: {
      carts: { include: { product: true } },
    },
  });
  if (order) {
    return order;
  }
}

export async function calculateDeliveryCharge(request) {
  const userID = await getUserId(request);
  const order = await db.order.count({
    where: {
      userID: userID,
    },
  });
  if (order > 0) {
    return 20;
  }

  return order;
}
