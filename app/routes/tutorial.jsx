import Button from "~/components/Button";
import Dropdown from "~/components/Dropdown";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="h-screen justify-between flex items-center flex-col py-16 px-10">
      <p className="text-3xl font-bold">MilkDeed</p>
      <div className="w-full rounded-xl bg-white h-96" />
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
        <Button as={Link} to="/login" className="w-full">
          Login
        </Button>
      </div>
    </div>
  );
}
