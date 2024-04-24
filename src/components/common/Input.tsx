import * as React from "react";
import { useField } from "formik";

interface Props {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  size?: "defualt" | "large" | "small";
  error?: string;
  success?: string;
  helperText?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
}

const sizes = {
  defualt:
    " border border-gray-300 text-gray-900 text-sm rounded-lg font-roboto block w-full p-2.5 focus:outline-none ",
  large:
    "block w-full p-4 text-gray-900 border border-gray-300 font-roboto rounded-lg  sm:text-md focus:outline-none ",
  small:
    "block w-full p-2 text-gray-900 border border-gray-300 font-roboto rounded-lg  sm:text-xs focus:outline-none ",
};

export default function Input({
  label,
  type,
  error,
  success,
  helperText,
  placeholder,
  name,
  size = "defualt",
  disabled,
}: Props) {
  const finalSize = sizes[size];

  /* eslint-disable */

  const [field, meta, helpers] = useField(name);
  /* eslint-enable */

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      helpers.setValue(event.target.value);
    },
    [helpers]
  );

  return (
    <>
      {label !== undefined && (
        <label
          style={{ fontWeight: 400, fontSize: "15px", lineHeight: "24px",color:"#000000" }}
        >
          {label}
        </label>
      )}
      <input
        className={finalSize}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={meta.value}
        disabled={disabled}
        style={{
          marginTop: "4px",
        }}
      />
      {helperText !== undefined && (
        <p id="helper-text" className="mt-2 text-sm text-gray-500 ">
          {helperText}
        </p>
      )}
      {success !== undefined && (
        <p className="mt-2 text-sm text-green-600 font-roboto ">{success}</p>
      )}
      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-red-600  font-roboto">
          {error ?? meta.error}
        </p>
      )}
    </>
  );
}
