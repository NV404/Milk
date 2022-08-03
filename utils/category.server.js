import { db } from "./db.server";

export async function getCategories() {
  const category = await db.category.findMany();
  if (category) {
    return category;
  } else {
    return [];
  }
}
