import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { expect } from "storybook/test";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    type: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: { placeholder: "name@company.com" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Email: Story = { args: { type: "email" } };
export const Disabled: Story = { args: { disabled: true } };

export const Typing: Story = {
  args: {
    type: "email"
  },

  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox") as HTMLInputElement;
    await userEvent.type(input, "jieli@example.com");
    await expect(input.value).toBe("jieli@example.com");
  }
};
