import { getUserId } from "utils/session.server";
import { redirect } from "@remix-run/node";
import { getUserById } from "utils/user.server";
import Button from "~/components/Button";
import Dropdown from "~/components/Dropdown";
import { Link } from "@remix-run/react";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (userID) {
    const user = await getUserById(userID);
    if (!user.shopName) {
      return redirect("/onboard");
    }
    return redirect("/home");
  }
  return null;
}

export default function Index() {
  return (
    <div className="h-screen justify-between flex items-center flex-col py-16 px-10">
      <p className="text-3xl font-bold">MilkDeed</p>
      <img src="/languages.png" className="w-full" />
      <div className="flex flex-col w-full gap-4">
        <Dropdown
          label="Language"
          id="Language"
          name="Language"
          options={[
            { value: "hindi", text: "hindi" },
            { value: "english", text: "english" },
          ]}
          required
        />
        <Button as={Link} to="/tutorial" className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
}
