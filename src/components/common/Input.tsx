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
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  large:
    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  small:
    "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
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
    [helpers],
  );

  return (
    <>
      {label !== undefined && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
      />
      {helperText !== undefined && (
        <p
          id="helper-text"
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
      {success !== undefined && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-500">
          {success}
        </p>
      )}
      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {error ?? meta.error}
        </p>
      )}
    </>
  );
}
