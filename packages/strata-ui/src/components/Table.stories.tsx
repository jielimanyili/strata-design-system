import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./Table";

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Merchant</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell align="right">Amount</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Slack</TableCell>
          <TableCell>Software</TableCell>
          <TableCell>Cleared</TableCell>
          <TableCell align="right">$1,250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Delta Air Lines</TableCell>
          <TableCell>Travel</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell align="right">$486.20</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>AWS</TableCell>
          <TableCell>Infrastructure</TableCell>
          <TableCell>Cleared</TableCell>
          <TableCell align="right">$8,420.18</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
