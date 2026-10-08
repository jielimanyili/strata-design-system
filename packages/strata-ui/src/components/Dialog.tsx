import { Dialog as Primitive } from "@base-ui/react/dialog";
import { cx } from "class-variance-authority";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

const Backdrop = forwardRef<
  ElementRef<typeof Primitive.Backdrop>,
  ComponentPropsWithoutRef<typeof Primitive.Backdrop>
>(({ className, ...props }, ref) => (
  <Primitive.Backdrop ref={ref} className={cx("strata-dialog-backdrop", className)} {...props} />
));
Backdrop.displayName = "DialogBackdrop";

const Popup = forwardRef<
  ElementRef<typeof Primitive.Popup>,
  ComponentPropsWithoutRef<typeof Primitive.Popup>
>(({ className, ...props }, ref) => (
  <Primitive.Popup ref={ref} className={cx("strata-dialog-popup", className)} {...props} />
));
Popup.displayName = "DialogPopup";

const Title = forwardRef<
  ElementRef<typeof Primitive.Title>,
  ComponentPropsWithoutRef<typeof Primitive.Title>
>(({ className, ...props }, ref) => (
  <Primitive.Title ref={ref} className={cx("strata-dialog-title", className)} {...props} />
));
Title.displayName = "DialogTitle";

const Description = forwardRef<
  ElementRef<typeof Primitive.Description>,
  ComponentPropsWithoutRef<typeof Primitive.Description>
>(({ className, ...props }, ref) => (
  <Primitive.Description ref={ref} className={cx("strata-dialog-description", className)} {...props} />
));
Description.displayName = "DialogDescription";

const Close = forwardRef<
  ElementRef<typeof Primitive.Close>,
  ComponentPropsWithoutRef<typeof Primitive.Close>
>(({ className, ...props }, ref) => (
  <Primitive.Close ref={ref} className={cx("strata-dialog-close", className)} {...props} />
));
Close.displayName = "DialogClose";

export const Dialog = {
  Root: Primitive.Root,
  Trigger: Primitive.Trigger,
  Portal: Primitive.Portal,
  Backdrop,
  Popup,
  Title,
  Description,
  Close,
};
