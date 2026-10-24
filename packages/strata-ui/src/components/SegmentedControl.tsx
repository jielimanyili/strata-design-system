import { cx } from "class-variance-authority";
import { forwardRef } from "react";

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SegmentedControlOption[];
  value: string;
  onValueChange: (value: string) => void;
}

export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(({ className, options, value, onValueChange, ...props }, ref) => (
  <div ref={ref} role="radiogroup" className={cx("strata-segmented", className)} {...props}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        role="radio"
        aria-checked={option.value === value}
        className={cx(
          "strata-segmented-item",
          option.value === value && "strata-segmented-item--active",
        )}
        onClick={() => onValueChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
));
SegmentedControl.displayName = "SegmentedControl";
