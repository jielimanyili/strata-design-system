import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./EmptyState";
import { Button } from "./Button";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No transactions",
    description: "Transactions will appear here once you add a card.",
  },
};

export const WithAction: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <Button size="sm">Add card</Button>
    </EmptyState>
  ),
  args: {
    title: "No cards yet",
    description: "Add your first corporate card to start spending.",
  },
};
