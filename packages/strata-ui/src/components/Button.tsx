import { cva, cx, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const button = cva("strata-button", {
  variants: {
    variant: {
      primary: "strata-button--primary",
      secondary: "strata-button--secondary",
      ghost: "strata-button--ghost",
    },
    size: {
      sm: "strata-button--sm",
      md: "strata-button--md",
      lg: "strata-button--lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cx(button({ variant, size }), className)} {...props} />
  ),
);

Button.displayName = "Button";
