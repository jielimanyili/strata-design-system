import type { Meta, StoryObj } from "@storybook/react-vite";
import { Metric } from "./Metric";

const meta = {
  title: "Components/Metric",
  component: Metric,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["positive", "negative", "neutral"] },
  },
  args: {
    label: "Est. savings",
    value: "$3,610.00",
    delta: "+7.5%",
    tone: "positive",
  },
} satisfies Meta<typeof Metric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = { args: { tone: "positive" } };
export const Negative: Story = {
  args: { label: "Policy flags", value: "7", delta: "+2", tone: "negative" },
};
export const Neutral: Story = {
  args: { label: "Total spend", value: "$48,210.00", delta: "+4.2%", tone: "neutral" },
};
