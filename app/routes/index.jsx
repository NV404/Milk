import { getUserId } from "utils/session.server";
import { redirect } from "@remix-run/node";
import { getUserById } from "utils/user.server";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (userID) {
    const user = await getUserById(userID);
    if (!user.shopName) {
      return redirect("/onboard");
    }
    return {};
  }
  return redirect("/login");
}

export default function Index() {
  return (
    <div className="h-screen flex justify-end items-center flex-col py-16 px-10 lg:justify-center">
      <p>You are logged in</p>
    </div>
  );
}
