import { cx } from "class-variance-authority";
import { forwardRef } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx("strata-card", className)} {...props} />
  ),
);

Card.displayName = "Card";

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx("strata-card--title", className)} {...props} />;
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("strata-card--description", className)} {...props} />;
}
