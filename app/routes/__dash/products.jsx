import { Link } from "@remix-run/react";
import Button from "~/components/Button";

export default function Products() {
  return (
    <div className="flex flex-col items-stretch gap-10 p-10">
      <Link to="/home">
        <div className="flex items-center gap-2 underline">
          <img
            src="arrow-left-fill.svg"
            alt="arrow-left-fill"
            className="w-7"
          />
          <p className="font-medium">Back</p>
        </div>
      </Link>

      <p className="font-bold text-2xl">Products</p>

      <Button as={Link} to="/add">
        Add Product
      </Button>

      <div className="bg-white rounded-xl items-center flex justify-between">
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
    </div>
  );
}
