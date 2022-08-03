import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function getCart(request) {
  const userID = await getUserId(request);
  const cart = await db.cart.findMany({
    where: {
      userID: userID,
      isRemoved: false,
    },
    include: {
      product: {
        include: { category: true },
      },
    },
  });

  if (cart) {
    return cart;
  }
}

export async function addToCart({ items, request }) {
  const userID = await getUserId(request);
  const cartItem = await db.cart.createMany({
    data: items.map((item) => ({
      userID: userID,
      productID: item.id,
      quantity: item.quantity,
    })),
  });

  if (cartItem) {
    return cartItem;
  }
}

export async function emptyCart(request) {
  const userID = await getUserId(request);
  const cartItem = await db.cart.updateMany({
    where: {
      userID: userID,
      isRemoved: false,
    },
    data: {
      isRemoved: true,
    },
  });

  if (cartItem) {
    return cartItem;
  }
}
