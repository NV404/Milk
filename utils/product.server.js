import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function addProduct({ request, data }) {
  const userID = await getUserId(request);
  const product = await db.user.update({
    where: { id: userID },
    data: {
      products: {
        create: {
          ...data,
        },
      },
    },
  });
  if (product) {
    return product;
  }
}

export async function editProduct({ id, data }) {
  const product = await db.product.update({
    where: { id },
    data,
  });
  if (product) {
    return product;
  }
}

export async function getProduct(id) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });

  return product;
}

export async function getProducts({ request }) {
  const sellerId = await getUserId(request);
  const products = await db.product.findMany({
    where: {
      sellerId,
    },
  });

  return products;
}

export async function getProductsByCategory(slug) {
  const products = await db.product.findMany({
    where: {
      category: {
        slug: slug,
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export async function searchProducts(query, category) {
  const products = await db.product.findMany({
    where: {
      ...(category ? { categoryID: category } : {}),
      OR: [
        { name: { search: query } },
        { description: { search: query } },
        { keywords: { search: query } },
      ],
    },
    include: {
      category: true,
    },
  });
  return products;
}

export async function deleteProduct(id) {
  const product = await db.product.delete({
    where: {
      id,
    },
  });

  return product;
}
