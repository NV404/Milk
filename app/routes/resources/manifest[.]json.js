import { json } from "@remix-run/node";

export let loader = () => {
  return json(
    {
      short_name: "Milky",
      name: "Milky",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      shortcuts: [
        {
          name: "Homepage",
          url: "/",
          icons: [
            {
              src: "/icons/android-96x96.png",
              sizes: "96x96",
              type: "image/png",
              purpose: "any monochrome",
            },
          ],
        },
      ],
      icons: [
        {
          src: "/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    }
  );
};
