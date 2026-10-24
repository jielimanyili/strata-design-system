import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  args: {
    options: [
      { value: "this-month", label: "This month" },
      { value: "last-month", label: "Last month" },
      { value: "ytd", label: "Year to date" },
    ],
    value: "this-month",
    onValueChange: () => {},
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("this-month");
    return (
      <SegmentedControl
        options={[
          { value: "this-month", label: "This month" },
          { value: "last-month", label: "Last month" },
          { value: "ytd", label: "Year to date" },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};
