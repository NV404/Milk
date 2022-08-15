import { Link } from "@remix-run/react";
import Button from "~/components/Button";
import Items from "~/components/Items";
import Menu from "~/components/Menu";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch gap-12 p-10">
      <Menu />

      <Items>
        <div className="w-full bg-white p-3 rounded-2xl shadow-sm">
          <img src="/orders.svg" alt="menu" className="w-20" />
          <div className="w-full justify-between flex items-center">
            <div>
              <p className="font-bold text-2xl">180k</p>
              <p>orders</p>
            </div>
            <img src="/arrow-right-black.svg" alt="menu" className="w-10" />
          </div>
        </div>

        <Link to="/products" className="w-full">
          <div className="w-full bg-green-500 p-3 text-white rounded-2xl shadow-sm">
            <img src="/items.svg" alt="menu" className="w-20" />
            <div className="w-full justify-between flex items-center">
              <div>
                <p className="font-bold text-2xl">180k</p>
                <p>items</p>
              </div>
              <img src="/arrow-right-white.svg" alt="menu" className="w-10" />
            </div>
          </div>
        </Link>
      </Items>

      <p className="font-medium">Sale dashboard</p>
      <div className="bg-gradient-to-bl from-gray-200 to-gray-150 w-full rounded-xl">
        <div className="flex justify-between items-end p-4">
          <div className="rounded-xl bg-blue-500 h-20 w-12"></div>
          <div className="rounded-xl bg-blue-400 h-16 w-12"></div>
          <div className="rounded-xl bg-blue-300 h-14 w-12"></div>
          <div className="rounded-xl bg-blue-200 h-12 w-12"></div>
        </div>
        <div className="flex justify-between items-center rounded-xl bg-white p-4">
          <div className="rounded-full bg-yellow-300 p-2 h-fit">
            <img src="wave.svg" alt="ana" className="w-5" />
          </div>
          <div>
            <p className="font-bold text-2xl">5M</p>
            <p>Revenue</p>
          </div>
          <div>
            <p className="font-bold text-2xl">20K</p>
            <p>items sold</p>
          </div>
          <div>
            <img src="/arrow-right-black.svg" alt="menu" className="w-10" />
          </div>
        </div>
      </div>
      <p className="font-medium">Recent orders</p>

      <div className="bg-white rounded-xl">
        <div className="items-center flex justify-between">
          <div
            className="h-20 w-20 rounded-lg"
            style={{
              background: `url('/milk.jpg')`,
              backgroundSize: "cover",
            }}
          ></div>
          <div>
            <p className="font-medium text-lg">Milk (1 Liter)</p>
            <p>Quantity: 5items</p>
          </div>
          <div className="pr-5">
            <img src="/arrow-right-black.svg" alt="menu" className="w-10" />
          </div>
        </div>
        <div className="flex gap-2 w-full px-5 py-2 mt-2 border-t-2">
          <Button className="w-full">Accept</Button>
          <Button theme="red" className="w-full">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
