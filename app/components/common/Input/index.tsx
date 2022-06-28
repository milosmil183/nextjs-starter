import { forwardRef, HTMLProps } from "react";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  isInvalid?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isInvalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   
        ${props.className ?? ""} ${isInvalid ? "bg-red-200 border-error border" : ""}`}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
