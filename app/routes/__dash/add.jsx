import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import Dropdown from "~/components/Dropdown";
import Field from "~/components/Field";
import { addProduct } from "utils/product.server";
// import { uploadImage } from "utils/cloudinary";
import { redirect } from "@remix-run/node";

export async function action({ request }) {
  const formData = await request.formData();

  console.log(formData.get("image"), "formData.get(");
  const data = {
    name: formData.get("name"),
    imageURL: formData.get("image"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    packageType: formData.get("packaging"),
    weightUnit: formData.get("weightUnit"),
    weight: Number(formData.get("weight")),
  };

  if (data) {
    const product = await addProduct({ request, data });
    if (product) {
      return redirect("/home");
    }
  }

  return {};
}

export default function Add() {
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage({
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

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
      <p className="font-bold text-2xl">Add Product</p>
      <Form
        method="post"
        className="flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <Field
          label="Product name"
          type="text"
          id="name"
          name="name"
          placeholder="Eg. Milk"
          required
        />

        {!image ? (
          <label
            for="dropzone-file"
            class="flex flex-col justify-center items-center w-full h-64 bg-slate-200 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer"
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
          <div className="h-64 w-full flex justify-center items-center">
            <img src={image.image} alt="preview" className="rounded-lg" />
          </div>
        )}

        <Field
          label="Product description"
          type="text"
          id="description"
          name="description"
          placeholder="Eg. cow milk"
          required
        />
        <Field
          label="Price"
          type="text"
          postfixText="₹"
          id="price"
          name="price"
          placeholder="Eg. 200"
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
          required
        />
        <button
          type="submit"
          className="bg-green-200 text-green-800 py-2 w-full rounded-lg font-bold"
        >
          Add
        </button>
      </Form>
    </div>
  );
}
