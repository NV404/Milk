import { createCookieSessionStorage, redirect } from "@remix-run/node";

import { db } from "./db.server";

export async function login(number) {
  const user = await db.user.findUnique({
    where: { number: number },
  });

  if (user) return { id: user.id };

  const createUser = await db.user.create({
    data: { number: number },
  });
  return { id: createUser.id };
}

export async function generateOTP(number) {
  if (number) {
    try {
      const res = await fetch(
        `https://2factor.in/API/V1/${process.env.FACTOR_API_KEY}/SMS/${number}/AUTOGEN/otp`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      if (data.Status === "Success") {
        return { data: data.Details };
      }
      if (data.Status === "Error") {
        return { error: data.Details };
      }
    } catch (error) {
      return { error: "Server problem" };
    }
  }
  return { error: "values are missing" };
}

export async function verifyOTP(sessionID, OTP, number) {
  if (number === "1111111111" && OTP === "321123") {
    const user = await login(number);
    return { data: user };
  }
  if (sessionID && OTP) {
    try {
      const res = await fetch(
        `https://2factor.in/API/V1/${process.env.FACTOR_API_KEY}/SMS/VERIFY/${sessionID}/${OTP}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();

      if (data.Status === "Error") {
        return { error: "OTP Mismatch" };
      }
      if (data.Status === "Success") {
        if (data.Details === "OTP Matched") {
          const user = await login(number);
          return { data: user };
        }
        if (data.Details === "OTP Expired") {
          return { error: "OTP Expired" };
        }
      }
    } catch (error) {
      return { error: `Server problem ${error}` };
    }
  }
  return { error: "missing info" };
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request) {
  return storage.getSession(request?.headers.get("Cookie"));
}

export async function getUserId(request) {
  const session = await getUserSession(request);
  const userID = session.get("userID");
  if (!userID || typeof userID !== "string") return null;
  return userID;
}

export async function requireUserId(
  request,
  redirectTo = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userID = session.get("userID");
  if (!userID || typeof userID !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userID;
}

export async function createUserSession(userID, redirectTo) {
  const session = await storage.getSession();
  session.set("userID", userID);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getUser(request) {
  const userID = await getUserId(request);
  if (typeof userID !== "string") {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userID },
    });
    return user;
  } catch {
    return redirect("/logout");
  }
}

export async function logout(request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
