const THEMES = {
  monochrome: "bg-neutral-100 text-black",
  red: "bg-red-100 text-red-900",
  green: "bg-green-100 text-green-900",
  blue: "bg-blue-100 text-blue-900",
  pink: "bg-pink-100 text-pink-900",
  yellow: "bg-yellow-100 text-yellow-900",
};

export default function Card({
  theme = "monochrome",
  className = "",
  children,
}) {
  return (
    <div
      className={[
        "flex flex-row items-center justify-start gap-4 rounded-xl px-4 py-2",
        THEMES[theme],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
