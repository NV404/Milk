import { Link, useLoaderData } from "@remix-run/react";
import { getOrders, updateOrderStatus } from "utils/order.server";
import OrderCard from "~/components/OrderCard";
import { useEffect } from "react";

export async function loader({ request }) {
  const orders = await getOrders({ request });
  if (orders) {
    return { orders };
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

export default function Products() {
  const loaderData = useLoaderData();
  const orders = loaderData.orders;

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <div className="flex flex-col items-stretch gap-10 p-10">
      <Link to="/home">
        <div className="flex items-center gap-2 underline">
          <img
            src="arrow-left-fill.svg"
            alt="arrow-left-fill"
            className="w-7"
          />
          <p className="font-medium">Back</p>
        </div>
      </Link>

      <p className="font-bold text-2xl">Orders</p>

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
