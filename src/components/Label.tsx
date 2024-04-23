import * as React from "react";

interface Props {
  className?: string;
  children: string | React.ReactNode;
}

export default function Label({ children, className }: Props) {
  const newClassName =
    className ?? "block mb-2 text-sm font-medium text-gray-900";
  return <label className={newClassName}>{children}</label>;
}
