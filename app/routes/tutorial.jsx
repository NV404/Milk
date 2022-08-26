import Button from "~/components/Button";
import Dropdown from "~/components/Dropdown";
import { Link } from "@remix-run/react";
import { getUserId } from "utils/session.server";
import { getUserById } from "utils/user.server";
import { redirect } from "@remix-run/node";
import { useState } from "react";

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
  const [isEnglish, setIsEnglish] = useState(true);
  return (
    <div className="h-screen justify-between flex items-center flex-col py-16 px-10">
      <p className="text-3xl font-bold">Gawale - Dashboard</p>
      <img src="/tut.png" className="w-full rounded-xl bg-white h-96" />
      <div className="flex flex-col w-full gap-4">
        <Dropdown
          label="Language"
          id="Language"
          name="Language"
          onChange={() => setIsEnglish(!isEnglish)}
          options={[
            { value: "english", text: "English" },
            { value: "hindi", text: "Hindi" },
          ]}
          required
        />
        <Button as={Link} to="/login" className="w-full">
          Login
        </Button>
      </div>
    </div>
  );
}
