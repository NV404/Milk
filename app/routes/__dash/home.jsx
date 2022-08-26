import { Form, Link, useLoaderData } from "@remix-run/react";
import OrderCard from "~/components/OrderCard";
import { checkConnectivity } from "~/utils/client/pwa-utils.client";

import { getOrders, updateOrderStatus } from "utils/order.server";
import { getUserById, updateUser } from "utils/user.server";
import { getUserId } from "utils/session.server";
import Field from "~/components/Field";
import Pencil from "~/icons/Pencil";
import Button from "~/components/Button";
import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

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
    if (action === "update") {
      const data = {
        dailyProduction: formData.get("dailyProduction"),
      };
      const user = await updateUser({ request, data });
      if (user) {
        return { user };
      }
    }

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
  const [offlineOrders, setOfflineOrders] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    checkConnectivity(online, offline).then((data) => console.log(data));
    setOfflineOrders(localStorage.getItem("orders"));
  }, []);

  const online = () => {
    console.log("user is online");
  };

  const offline = () => {
    setIsOffline(true);
  };

  return (
    <div className="flex flex-col items-stretch gap-12 p-10">
      <p className="text-center text-3xl font-medium">
        Hi, {loaderData.user.shopName}!
      </p>

      {isOffline ? (
        <>
          {offlineOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </>
      ) : null}

      <Form
        method="post"
        className="p-5 flex flex-col gap-2 rounded-lg bg-white"
      >
        <div className="flex justify-between items-center gap-4">
          <Field
            label="Daily Production"
            type="text"
            postfixText="litres"
            id="dailyProduction"
            name="dailyProduction"
            placeholder="Eg. 200"
            defaultValue={loaderData.user.dailyProduction}
            required
          />
          <Button
            type="submit"
            name="action"
            value="update"
            className="h-fit items-center"
          >
            <Pencil />
          </Button>
        </div>
      </Form>

      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <Link
            to="/products"
            className="w-full flex flex-col gap-2 items-center"
          >
            <div className="w-full h-24 bg-white rounded-lg flex justify-center items-center overflow-hidden lg:h-40">
              <img src="/products.jpg" alt="menu" />
            </div>
            <p>Products</p>
          </Link>
          <Link
            to="/orders"
            className="w-full flex flex-col gap-2 items-center"
          >
            <div className="w-full h-24 bg-white rounded-lg flex justify-center items-center overflow-hidden lg:h-40">
              <img src="/orders.png" className="h-full" alt="menu" />
            </div>
            <p>orders</p>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            to="/vendors"
            className="w-full flex flex-col gap-2 items-center"
          >
            <div className="w-full h-24 bg-white rounded-lg flex justify-center items-center overflow-hidden lg:h-40">
              <img src="/vendors.jpg" alt="menu" />
            </div>
            <p>vendors</p>
          </Link>
          <Link
            to="/account"
            className="w-full flex flex-col gap-2 items-center"
          >
            <div className="w-full h-24 bg-white rounded-lg flex justify-center items-center lg:h-40">
              <img src="/user.svg" alt="menu" />
            </div>
            <p>Account</p>
          </Link>
        </div>
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
