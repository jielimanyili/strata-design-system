import { Select as Primitive } from "@base-ui/react/select";
import { cx } from "class-variance-authority";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

const Trigger = forwardRef<
  ElementRef<typeof Primitive.Trigger>,
  ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(({ className, ...props }, ref) => (
  <Primitive.Trigger ref={ref} className={cx("strata-select-trigger", className)} {...props} />
));
Trigger.displayName = "SelectTrigger";

const Value = forwardRef<
  ElementRef<typeof Primitive.Value>,
  ComponentPropsWithoutRef<typeof Primitive.Value>
>(({ className, ...props }, ref) => (
  <Primitive.Value ref={ref} className={cx("strata-select-value", className)} {...props} />
));
Value.displayName = "SelectValue";

const Popup = forwardRef<
  ElementRef<typeof Primitive.Popup>,
  ComponentPropsWithoutRef<typeof Primitive.Popup>
>(({ className, ...props }, ref) => (
  <Primitive.Popup ref={ref} className={cx("strata-select-popup", className)} {...props} />
));
Popup.displayName = "SelectPopup";

const Item = forwardRef<
  ElementRef<typeof Primitive.Item>,
  ComponentPropsWithoutRef<typeof Primitive.Item>
>(({ className, ...props }, ref) => (
  <Primitive.Item ref={ref} className={cx("strata-select-item", className)} {...props} />
));
Item.displayName = "SelectItem";

const ItemText = forwardRef<
  ElementRef<typeof Primitive.ItemText>,
  ComponentPropsWithoutRef<typeof Primitive.ItemText>
>(({ className, ...props }, ref) => (
  <Primitive.ItemText ref={ref} className={cx("strata-select-item-text", className)} {...props} />
));
ItemText.displayName = "SelectItemText";

const ItemIndicator = forwardRef<
  ElementRef<typeof Primitive.ItemIndicator>,
  ComponentPropsWithoutRef<typeof Primitive.ItemIndicator>
>(({ className, ...props }, ref) => (
  <Primitive.ItemIndicator
    ref={ref}
    className={cx("strata-select-item-indicator", className)}
    {...props}
  />
));
ItemIndicator.displayName = "SelectItemIndicator";

export const Select = {
  Root: Primitive.Root,
  Label: Primitive.Label,
  Trigger,
  Value,
  Icon: Primitive.Icon,
  Portal: Primitive.Portal,
  Positioner: Primitive.Positioner,
  Popup,
  List: Primitive.List,
  Item,
  ItemText,
  ItemIndicator,
  Group: Primitive.Group,
  GroupLabel: Primitive.GroupLabel,
  ScrollUpArrow: Primitive.ScrollUpArrow,
  ScrollDownArrow: Primitive.ScrollDownArrow,
  Arrow: Primitive.Arrow,
  Separator: Primitive.Separator,
  Backdrop: Primitive.Backdrop,
};
