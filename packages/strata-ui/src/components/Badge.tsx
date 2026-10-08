import { cva, cx, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const badge = cva("strata-badge", {
  variants: {
    variant: {
      default: "strata-badge--default",
      primary: "strata-badge--primary",
      outline: "strata-badge--outline",
      destructive: "strata-badge--destructive",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cx(badge({ variant }), className)} {...props} />
  ),
);
Badge.displayName = "Badge";
