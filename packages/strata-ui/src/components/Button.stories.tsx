import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { expect, fn } from "storybook/test";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button variant={args.variant} size="sm">
        Small
      </Button>
      <Button variant={args.variant} size="md">
        Medium
      </Button>
      <Button variant={args.variant} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Clicked: Story = {
  args: { onClick: fn() },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalled();
  },
};
