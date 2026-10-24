import { cx } from "class-variance-authority";
import { forwardRef } from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden
      className={cx("strata-skeleton", className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
