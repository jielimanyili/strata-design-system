import { cx } from "class-variance-authority";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cx("strata-input", className)} {...props} />
  ),
);

Input.displayName = "Input";
