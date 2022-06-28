import { forwardRef, HTMLProps } from "react";

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      type="checkbox"
      className={
        "w-4 h-4 rounded border border-gray-300 focus:bg-primary accent-primary focus-visible:outline-none cursor-pointer " +
        props.className ?? ""
      }
    />
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
