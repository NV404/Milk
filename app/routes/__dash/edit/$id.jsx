import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Dropdown from "~/components/Dropdown";
import Field from "~/components/Field";
import { addProduct, editProduct, getProduct } from "utils/product.server";
// import { uploadImage } from "utils/cloudinary";
import { redirect } from "@remix-run/node";
import Button from "~/components/Button";
import { getCategoryId } from "utils/category.server";

export async function loader({ params }) {
  const id = params.id;
  const product = await getProduct(id);
  if (product) {
    return { product };
  }
  return {};
}

export async function action({ request }) {
  const formData = await request.formData();
  const slug = formData.get("category");
  const categoryID = await getCategoryId(slug);
  const id = formData.get("id");

  const data = {
    name: formData.get("name"),
    imageURL: formData.get("image"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    packageType: formData.get("packaging"),
    categoryID,
    weightUnit: formData.get("weightUnit"),
    weight: Number(formData.get("weight")),
  };

  if (data) {
    const product = await editProduct({ id, data });
    if (product) {
      return redirect("/products");
    }
  }

  return {};
}

export default function Add() {
  const [image, setImage] = useState(null);
  const loaderData = useLoaderData();
  const product = loaderData.product;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage({
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-10 p-10">
      <Link to="/products">
        <div className="flex items-center gap-2 underline">
          <img
            src="/arrow-left-fill.svg"
            alt="arrow-left-fill"
            className="w-7"
          />
          <p className="font-medium">Back</p>
        </div>
      </Link>
      <p className="font-bold text-2xl">Add Product</p>
      <Form
        method="post"
        className="flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <input type="hidden" name="id" value={product.id} />
        <Field
          label="Product name"
          type="text"
          id="name"
          name="name"
          defaultValue={product.name}
          placeholder="Eg. Milk"
          required
        />

        {!image ? (
          <label
            for="dropzone-file"
            class="flex flex-col justify-center items-center w-full h-64 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer"
          >
            <div class="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className=" font-semibold">Product Image</p>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              onChange={onImageChange}
              id="dropzone-file"
              name="image"
              type="file"
              class="hidden"
              accept="image/*"
            />
          </label>
        ) : (
          <div
            className="h-64 w-full rounded-lg"
            style={{
              background: `url('${image.image}')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* <img src={image.image} alt="preview" className="rounded-lg" /> */}
          </div>
        )}

        <Field
          label="Product description"
          type="text"
          id="description"
          name="description"
          placeholder="Eg. cow milk"
          defaultValue={product.description}
          required
        />
        <Field
          label="Price"
          type="text"
          postfixText="₹"
          id="price"
          name="price"
          placeholder="Eg. 200"
          defaultValue={product.price}
          required
        />
        <Dropdown
          label="Category"
          id="category"
          name="category"
          // defaultValue
          options={[
            { value: "milk", text: "Milk" },
            { value: "chach", text: "Chach" },
            { value: "dahi", text: "Dahi" },
            { value: "panner", text: "Panner" },
            { value: "cow-dunk", text: "Cow Dunk" },
            { value: "others", text: "Others" },
          ]}
          required
        />
        <Dropdown
          label="Packaging"
          id="packaging"
          name="packaging"
          options={[
            { value: "loose", text: "loose" },
            { value: "box", text: "box" },
            { value: "bag", text: "bag" },
          ]}
          required
        />
        <Dropdown
          label="Weight unit"
          id="weightUnit"
          name="weightUnit"
          options={[
            { value: "kg", text: "kg" },
            { value: "grams", text: "grams" },
            { value: "liter", text: "liter" },
            { value: "milliliter", text: "milliliter" },
          ]}
          required
        />
        <Field
          label="Weight"
          type="text"
          id="weight"
          name="weight"
          placeholder="Eg. 1.2"
          defaultValue={product.weight}
          required
        />
        <Button type="submit">Edit</Button>
      </Form>
    </div>
  );
}
