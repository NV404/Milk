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
  const loaderData = useLoaderData();
  const product = loaderData.product;

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
            { value: "litre", text: "litre" },
            { value: "millilitre", text: "millilitre" },
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
