import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function updateUser({ request, data }) {
  const userID = await getUserId(request);
  const user = await db.user.update({
    where: { id: userID },
    data,
  });
  if (user) {
    return user;
  }
}

export async function getUserById(id) {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  delete user.passwordHash;

  return user;
}
