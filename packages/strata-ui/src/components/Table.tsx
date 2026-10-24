import { cx } from "class-variance-authority";
import { forwardRef } from "react";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={cx("strata-table", className)} {...props} />
  ),
);
Table.displayName = "Table";

export function TableHead({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cx("strata-table-head", className)} {...props} />;
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cx("strata-table-body", className)} {...props} />;
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cx("strata-table-row", className)} {...props} />;
}

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "right";
}

export function TableHeaderCell({
  className,
  align = "left",
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      className={cx(
        "strata-table-th",
        align === "right" && "strata-table-th--right",
        className,
      )}
      {...props}
    />
  );
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "right";
}

export function TableCell({
  className,
  align = "left",
  ...props
}: TableCellProps) {
  return (
    <td
      className={cx(
        "strata-table-td",
        align === "right" && "strata-table-td--right",
        className,
      )}
      {...props}
    />
  );
}
