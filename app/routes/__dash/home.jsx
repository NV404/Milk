import { Link, useLoaderData } from "@remix-run/react";
import OrderCard from "~/components/OrderCard";

import { getOrders, updateOrderStatus } from "utils/order.server";
import { getUserById } from "utils/user.server";
import { getUserId } from "utils/session.server";

export async function loader({ request }) {
  const orders = await getOrders({ request, pending: true });
  const userID = await getUserId(request);
  const user = await getUserById(userID);

  if (orders) {
    return { orders, user };
  }
  return {};
}

export async function action({ request }) {
  const formData = await request.formData();

  const id = formData.get("id");
  const action = formData.get("action");

  if (action) {
    if (action === "accept") {
      const order = await updateOrderStatus(id, "accepted");
      if (order) {
        return { order };
      }
    }

    if (action === "reject") {
      const order = await updateOrderStatus(id, "rejected");
      if (order) {
        return { order };
      }
    }

    return {};
  }

  return {};
}

export default function Home() {
  const loaderData = useLoaderData();
  const orders = loaderData.orders;

  return (
    <div className="flex flex-col items-stretch gap-12 p-10">
      <p className="text-center text-3xl font-medium">
        Hi, {loaderData.user.shopName}!
      </p>

      <div className="flex justify-between items-center">
        <Link to="/products" className="flex flex-col gap-2 items-center">
          <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center">
            <img src="/items.svg" alt="menu" className="w-8" />
          </div>
          <p>Products</p>
        </Link>
        <Link to="/orders" className="flex flex-col gap-2 items-center">
          <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center">
            <img src="/orders.svg" alt="menu" className="w-8" />
          </div>
          <p>orders</p>
        </Link>
        <div className="flex flex-col gap-2 items-center">
          <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center">
            <img src="/shop.svg" alt="menu" className="w-6" />
          </div>
          <p>vendors</p>
        </div>
        <Link to="/account" className="flex flex-col gap-2 items-center">
          <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center">
            <img src="/user.svg" alt="menu" className="w-6" />
          </div>
          <p>Account</p>
        </Link>
      </div>

      <p className="font-medium">Recent pending orders</p>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="font-medium text-center">No pending orders!</p>
      )}
    </div>
  );
}
