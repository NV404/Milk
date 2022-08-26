import { redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useTransition } from "@remix-run/react";
import { getUserById } from "utils/user.server";
import { getUserId } from "utils/session.server";
import Home from "~/icons/Home";
import { useEffect } from "react";
import NProgress from "nprogress";
import nProgressStyles from "../styles/nprogress.css";
import CreditCard from "~/icons/CreditCard";
import Clock from "~/icons/Clock";

export function links() {
  return [{ rel: "stylesheet", href: nProgressStyles }];
}

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

function NavL({ children, to, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={function ({ isActive }) {
        return `flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-xl font-bold ${
          isActive ? "text-black bg-purple-200" : "text-slate-700"
        }`;
      }}
    >
      <Icon size={25} />
      <span className="text-xs font-normal">{children}</span>
    </NavLink>
  );
}

export default function __Dash() {
  let transition = useTransition();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    if (transition.state !== "idle") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [transition.state]);

  return (
    <>
      <div>
        <Outlet />
      </div>
      <nav className="max-w-[640px] mx-auto fixed bottom-0 left-0 right-0 flex items-stretch justify-start gap-2 z-10 rounded-t-xl bg-white backdrop-blur px-4 py-2">
        <NavL to="/home" icon={Home}>
          Home
        </NavL>
        <NavL to="/subscriptions" icon={Clock}>
          Subscriptions
        </NavL>
        <NavL to="/payments" icon={CreditCard}>
          Payments
        </NavL>
      </nav>
    </>
  );
}
