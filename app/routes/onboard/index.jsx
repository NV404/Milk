import { redirect } from "@remix-run/node";
import { getUserId } from "utils/session.server";
import { Form, useActionData } from "@remix-run/react";
import { getUserById, updateUser } from "utils/user.server";
import Field from "~/components/Field";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (userID) {
    const user = await getUserById(userID);
    if (user.shopName) {
      return redirect("/home");
    }
    return {};
  }
  return redirect("/login");
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = {
    shopName: formData.get("shopName"),
    shopAddress: formData.get("shopAddress"),
  };

  const seller = await updateUser({ request, data });
  if (!seller) {
    return { error: "something went wrong" };
  }
  return redirect("/home");
}

export default function OnBoard() {
  const data = useActionData();
  return (
    <div className="h-screen flex justify-center flex-col items-stretch bg-gray-150 gap-12 p-10">
      <p className="text-center font-bold text-3xl">Gwala</p>
      <div>
        <p className="text-center font-medium text-2xl">Onboarding</p>
        <p className="text-center ">
          Provide this information to complete profile
        </p>
      </div>
      <Form
        className="relative grow flex justify-center flex-col items-stretch"
        method="post"
      >
        <div className="relative grow flex flex-col gap-4">
          <Field
            type="text"
            name="shopName"
            id="shopName"
            label="Enter your shop name"
            placeholder="Eg. Dudh wala"
            className="bg-slate-200 font-medium px-4 py-2 rounded-lg text-black"
            required
          />
          <Field
            type="text"
            name="shopAddress"
            id="shopAddress"
            label="Enter your shop address"
            placeholder="Eg. subhash nagar, bhilwara"
            className="bg-slate-200 font-medium px-4 py-2 rounded-lg text-black"
            required
          />
        </div>
        <button
          type="submit"
          name="action"
          value="generate"
          className="bg-green-200 text-green-800 py-2 w-full rounded-lg font-bold"
        >
          Submit
        </button>
      </Form>
      {data?.error && <p>{data?.error}</p>}
    </div>
  );
}
