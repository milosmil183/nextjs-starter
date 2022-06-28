import { ReactElement, HTMLProps } from "react";
import {
  FieldValues,
  Path,
  UseFormStateReturn,
  FieldError,
} from "react-hook-form";

interface LabelProps<TFieldValues> extends HTMLProps<HTMLLabelElement> {
  name?: Path<TFieldValues>;
  errors?: UseFormStateReturn<TFieldValues>["errors"];
}

function Label<TFieldValues = FieldValues>({
  name,
  errors,
  ...props
}: LabelProps<TFieldValues>): ReactElement {
  const error =
    name &&
    ((errors as unknown as Record<Path<TFieldValues>, FieldError>)?.[name] as
      | FieldError
      | undefined);

  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-900 
        ${props.htmlFor ? "cursor-pointer" : ""} ${props.className ?? ""}
        ${!!error ? "text-error" : ""}`}
    >
      {props.children}
    </label>
  );
}

export default Label;
