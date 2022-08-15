import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
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
      <div>
        <Outlet />
      </div>
    </>
  );
}
