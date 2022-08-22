import { logout } from "utils/session.server";

export async function loader({ request }) {
  return await logout(request);
}
