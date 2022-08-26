import { db } from "./db.server";

export async function getCategoryId(slug) {
  const category = await db.category.findUnique({
    where: {
      slug,
    },
  });

  return category.id;
}
