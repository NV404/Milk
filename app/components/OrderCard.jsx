import { Form, Link } from "@remix-run/react";
import { format } from "date-fns";
import Check from "~/icons/Check";
import Button from "./Button";
import Card from "./Card";

export default function OrderCard({ order }) {
  return (
    <article className="bg-white rounded-xl p-4 flex flex-col items-stretch justify-start gap-4">
      <div className="flex flex-col items-stretch justify-start gap-1">
        <p className="text-lg font-bold">{order.user.name}</p>
        <p className="font-medium">{order.user.number}</p>
        <a
          href={`http://www.google.com/maps/place/${order.lat},${order.lng}`}
          target="_blank"
          className="text-purple-500 underline"
        >
          {order.addressLine1 + ", " + order.addressLine2}
        </a>
        <p className="text-xs">
          {format(new Date(order.createdAt), "dd MMM, yyyy")}
        </p>
      </div>

      {order.status === "pending" ? (
        <div className="flex flex-col gap-2">
          <Card theme="yellow">
            <p className="text-sm text-center font-bold w-full">
              status: pending
            </p>
          </Card>

          <Form method="post" className="flex gap-2">
            <input type="text" name="id" value={order.id} readOnly hidden />
            <Button
              type="submit"
              name="action"
              value="accept"
              theme="green"
              className="w-full"
            >
              <Check />
            </Button>
            <Button
              type="submit"
              name="action"
              value="reject"
              theme="red"
              className="w-full"
            >
              x
            </Button>
          </Form>
        </div>
      ) : null}

      {order.status === "accepted" ? (
        <div className="flex flex-col gap-2">
          <Card theme="green">
            <p className="text-sm text-center font-bold w-full">
              status: Accepted / delivering
            </p>
          </Card>
        </div>
      ) : null}

      {order.status === "rejected" ? (
        <div className="flex flex-col gap-2">
          <Card theme="red">
            <p className="text-sm text-center font-bold w-full">
              status: Rejected by you
            </p>
          </Card>
        </div>
      ) : null}

      <div className="flex flex-col items-stretch justify-start gap-2">
        <p className="font-bold">
          <span className="text-blue-900">{order.carts.length}</span>{" "}
          <span>items</span>
        </p>
        {order.carts.map((item) => {
          return (
            <div key={item.id}>
              <p className="font-bold">{item.product.name}</p>
              <p className="text-sm">
                <span className="text-green-900 font-medium">
                  ₹{item.product.price}
                </span>
                {" x "}
                <span className="text-blue-900 font-medium">
                  {item.quantity}
                </span>
                {" = "}
                <span className="text-green-900 font-bold">
                  ₹{parseFloat(item.product.price) * item.quantity}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      <p className="md:text-center border-t border-neutral-400 border-dashed pt-2">
        <span className="text-green-900 font-bold">
          ₹{parseFloat(order.price)}
        </span>{" "}
        <span className="text-sm font-medium">total</span>
      </p>
    </article>
  );
}
