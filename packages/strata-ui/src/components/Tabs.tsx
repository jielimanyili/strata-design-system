import { Tabs as Primitive } from "@base-ui/react/tabs";
import { cx } from "class-variance-authority";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

const List = forwardRef<
  ElementRef<typeof Primitive.List>,
  ComponentPropsWithoutRef<typeof Primitive.List>
>(({ className, ...props }, ref) => (
  <Primitive.List ref={ref} className={cx("strata-tabs-list", className)} {...props} />
));
List.displayName = "TabsList";

const Tab = forwardRef<
  ElementRef<typeof Primitive.Tab>,
  ComponentPropsWithoutRef<typeof Primitive.Tab>
>(({ className, ...props }, ref) => (
  <Primitive.Tab ref={ref} className={cx("strata-tabs-tab", className)} {...props} />
));
Tab.displayName = "TabsTab";

const Panel = forwardRef<
  ElementRef<typeof Primitive.Panel>,
  ComponentPropsWithoutRef<typeof Primitive.Panel>
>(({ className, ...props }, ref) => (
  <Primitive.Panel ref={ref} className={cx("strata-tabs-panel", className)} {...props} />
));
Panel.displayName = "TabsPanel";

const Indicator = forwardRef<
  ElementRef<typeof Primitive.Indicator>,
  ComponentPropsWithoutRef<typeof Primitive.Indicator>
>(({ className, ...props }, ref) => (
  <Primitive.Indicator ref={ref} className={cx("strata-tabs-indicator", className)} {...props} />
));
Indicator.displayName = "TabsIndicator";

export const Tabs = {
  Root: Primitive.Root,
  List,
  Tab,
  Panel,
  Indicator,
};
