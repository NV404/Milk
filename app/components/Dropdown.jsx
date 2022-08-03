export default function Dropdown({
  id,
  label = null,
  className = "",
  options = {},
  disabled = false,
  ...otherProps
}) {
  return (
    <fieldset
      className="w-full flex flex-col items-stretch justify-start gap-1 disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {label ? (
        <label htmlFor={id} className="font-medium text-sm">
          {label}
        </label>
      ) : null}
      <select
        id={id}
        className={[
          "inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-slate-200 text-sm font-medium text-gray-700",
          className,
        ].join(" ")}
        {...otherProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
