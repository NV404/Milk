import { Form, useActionData, useTransition } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import {
  createUserSession,
  generateOTP,
  getUserId,
  verifyOTP,
} from "utils/session.server";
import { useState } from "react";
import Field from "~/components/Field";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (userID) {
    return redirect("/home");
  }
  return {};
}

export async function action({ request }) {
  const formData = await request.formData();

  const number = formData.get("number");
  const action = formData.get("action");
  const session = formData.get("session");
  const otp = formData.get("otp");

  if (number && action) {
    if (action === "generate") {
      if (number === "1111111111") {
        return {
          data: {
            session: "something",
            number: number,
          },
        };
      }
      const data = await generateOTP(number);
      if (data?.data) {
        return {
          data: {
            session: data?.data,
            number: number,
          },
        };
      }
      return { error: data?.error };
    }

    if (action === "verify") {
      const data = await verifyOTP(session, otp, number);
      if (data?.data) {
        return createUserSession(data?.data.id, "/home");
      }
      return {
        error: data?.error,
        data: {
          session: session,
          number: number,
        },
      };
    }
  }

  return { error: "all fields are required" };
}

export default function Login() {
  const transition = useTransition();
  const data = useActionData();

  const [language, setLanguage] = useState(true);

  return (
    <div className="h-screen flex justify-center flex-col items-stretch  ">
      <div className="relative grow">
        <div
          className="w-full bg-red-600max-w-full p-10 h-full"
          style={{
            background:
              "url('https://images.unsplash.com/photo-1623662262137-405f61c3800d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')",
            backgroundSize: "cover",
          }}
        >
          <p className="text-center font-bold text-3xl text-white">Gwala</p>
        </div>
        <div className="absolute bottom-0 w-full h-[20vh] z-10 bg-gradient-to-b from-transparent to-white"></div>
      </div>

      <div className="flex flex-col items-stretch justify-start gap-12 w-full p-10">
        <p className="text-2xl font-bold text-center">
          {language ? "Welcome" : "नमस्ते"}
        </p>

        <div className="flex justify-center items-center gap-4">
          <button
            className={`py-1 px-4 rounded-lg ${
              language ? "bg-blue-200 text-blue-800" : "bg-black/20"
            }`}
            onClick={() => setLanguage(true)}
          >
            English
          </button>
          <button
            className={`py-1 px-4 rounded-lg ${
              !language ? "bg-blue-200 text-blue-800" : "bg-black/20"
            }`}
            onClick={() => setLanguage(false)}
          >
            हिंदी
          </button>
        </div>

        <Form replace method="POST">
          {data?.error && (
            <p className="px-2 py-1 bg-red-200 text-center text-red-600">
              {data.error}
            </p>
          )}

          <fieldset
            className="flex flex-col w-full items-stretch justify-start gap-4"
            disabled={
              transition.state === "loading" ||
              transition.state === "submitting"
            }
          >
            {data?.data ? (
              <Verify session={data.data.session} number={data.data.number} />
            ) : (
              <Generate />
            )}
          </fieldset>
        </Form>
      </div>
    </div>
  );
}

function Generate() {
  return (
    <>
      <Field
        type="tel"
        name="number"
        id="number"
        label="Enter your phone number"
        placeholder="Eg. 9XXXXXXXXX"
        maxLength={10}
        required
      />
      <button
        type="submit"
        name="action"
        value="generate"
        className="bg-green-200 text-green-800 py-2 w-full rounded-lg font-bold"
      >
        Send OTP
      </button>
    </>
  );
}

function Verify({ session, number }) {
  return (
    <>
      <Field
        type="text"
        name="otp"
        id="otp"
        placeholder="Eg. XXXXXX"
        label="Enter OTP sent to your phone number"
        maxLength={6}
        className="bg-slate-200 font-medium px-4 py-2 rounded-lg text-black"
        autoComplete="one-time-code"
        required
      />

      <input type="hidden" name="session" value={session} />
      <input type="hidden" name="number" value={number} />

      <button
        type="submit"
        name="action"
        value="verify"
        className="bg-green-200 text-green-800 py-2 w-full rounded-lg font-bold"
      >
        Submit
      </button>
    </>
  );
}
