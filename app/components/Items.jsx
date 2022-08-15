export default function Items({ children, className = "", ...otherProps }) {
  return (
    <div
      className={["flex justify-between items-center gap-7", className].join(
        " "
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
}
