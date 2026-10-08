import { Tooltip as Primitive } from "@base-ui/react/tooltip";
import { cx } from "class-variance-authority";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

const Popup = forwardRef<
  ElementRef<typeof Primitive.Popup>,
  ComponentPropsWithoutRef<typeof Primitive.Popup>
>(({ className, ...props }, ref) => (
  <Primitive.Popup ref={ref} className={cx("strata-tooltip-popup", className)} {...props} />
));
Popup.displayName = "TooltipPopup";

const Arrow = forwardRef<
  ElementRef<typeof Primitive.Arrow>,
  ComponentPropsWithoutRef<typeof Primitive.Arrow>
>(({ className, ...props }, ref) => (
  <Primitive.Arrow ref={ref} className={cx("strata-tooltip-arrow", className)} {...props} />
));
Arrow.displayName = "TooltipArrow";

export const Tooltip = {
  Provider: Primitive.Provider,
  Root: Primitive.Root,
  Trigger: Primitive.Trigger,
  Portal: Primitive.Portal,
  Positioner: Primitive.Positioner,
  Popup,
  Arrow,
};
