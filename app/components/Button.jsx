const PADDINGS = {
  small: "px-2 py-1",
  medium: "px-4 py-2",
};

const THEMES = {
  monochrome: "bg-neutral-100 text-black",
  red: "bg-red-100 text-red-900",
  green: "bg-green-200 text-green-800",
  blue: "bg-blue-100 text-blue-900",
};

export default function Button({
  as: As = "button",
  children,
  theme = "green",
  size = "medium",
  round = true,
  className = "",
  ...otherProps
}) {
  return (
    <As
      className={[
        PADDINGS[size],
        round ? "rounded-lg" : "",
        "flex flex-row items-center justify-center gap-2",
        "font-bold leading-none",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        THEMES[theme],
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </As>
  );
}
