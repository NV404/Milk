import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
} from "@remix-run/react";
import { useEffect } from "react";
import styles from "./styles/app.css";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
  "theme-color": "#ffffff",
});

export function links() {
  return [
    { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      href: "/icons/apple-touch-icon.png",
    },
    { rel: "stylesheet", href: styles },
    {
      rel: "manifest",
      href: "/resources/manifest.json",
    },
  ];
}

export default function App() {
  let location = useLocation();
  let matches = useMatches();

  let isMount = true;
  useEffect(() => {
    let mounted = isMount;
    isMount = false;
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location]);
  return (
    <html lang="en">
      <head>
        <Meta />

        <Links />
      </head>

      <body className="h-full bg-gray-150">
        <div className="w-[min(640px,_100%)] h-full mx-auto ">
          <Outlet />
        </div>

        <ScrollRestoration />

        <Scripts />

        <LiveReload />
      </body>
    </html>
  );
}
