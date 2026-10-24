import { cx } from "class-variance-authority";
import { forwardRef } from "react";

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  delta?: string;
  tone?: "positive" | "negative" | "neutral";
}

export const Metric = forwardRef<HTMLDivElement, MetricProps>(
  ({ className, label, value, delta, tone = "neutral", ...props }, ref) => (
    <div ref={ref} className={cx("strata-metric", className)} {...props}>
      <span className="strata-metric-label">{label}</span>
      <span className="strata-metric-value">{value}</span>
      {delta ? (
        <span
          className={cx("strata-metric-delta", `strata-metric-delta--${tone}`)}
        >
          {delta}
        </span>
      ) : null}
    </div>
  ),
);
Metric.displayName = "Metric";
