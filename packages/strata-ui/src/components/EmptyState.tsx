import { cx } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, children, ...props }, ref) => (
    <div ref={ref} className={cx("strata-empty", className)} {...props}>
      <h3 className="strata-empty-title">{title}</h3>
      {description ? (
        <p className="strata-empty-description">{description}</p>
      ) : null}
      {children ? <div className="strata-empty-action">{children}</div> : null}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";
