import { redirect } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { getUserById } from "utils/user.server";
import { getUserId } from "utils/session.server";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (userID) {
    const user = await getUserById(userID);
    if (!user.shopName) {
      return redirect("/onboard");
    }
    return {};
  }
  return redirect("/");
}

export default function __Dash() {
  return (
    <>
      <div className="mb-20">
        <Outlet />
      </div>
      <div className="fixed flex justify-between bottom-0 left-0 w-[min(640px,_100%)] shadow-lg bg-white p-5 px-20 rounded-full rounded-b-none lg:left-2/4 lg:-translate-x-1/2">
        <Link to="/home">
          <img src="/home.svg" alt="menu" className="w-7" />
        </Link>
        <Link to="/add">
          <img
            src="/add.svg"
            alt="menu"
            className="w-16 p-3 absolute left-2/4 -translate-x-1/2 -top-4 shadow-lg rounded-full bg-black"
          />
        </Link>
        <img src="/user.svg" alt="menu" className="w-7" />
      </div>
    </>
  );
}
