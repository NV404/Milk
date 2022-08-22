import { Link, useLoaderData } from "@remix-run/react";
import { getProducts } from "utils/product.server";
import Button from "~/components/Button";
import Trash from "~/icons/Trash";

export async function loader({ request }) {
  const products = await getProducts({ request });
  if (products) {
    return { products };
  }
  return {};
}

export default function Products() {
  const loaderData = useLoaderData();
  const products = loaderData.products;

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

      {products.map((product) => (
        <div className="bg-white rounded-xl items-center flex">
          <div
            className="h-28 w-28 rounded-lg"
            style={{
              background: `url('/milk.jpg')`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="flex-1 px-5">
            <p className="font-medium text-lg">
              {product.name} ({product.weight} {product.weightUnit})
            </p>
            <p className="text-sm">
              <span className="font-bold text-green-700">{product.price}₹</span>{" "}
              | {product.description}
            </p>
            <div className="flex gap-2 mt-2">
              <Button className="w-full">Edit</Button>
              <Button theme="red">
                <Trash />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
