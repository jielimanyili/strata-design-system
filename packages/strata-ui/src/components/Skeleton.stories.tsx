import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: 240,
      }}
    >
      <Skeleton style={{ height: 16 }} />
      <Skeleton style={{ height: 16, width: "70%" }} />
      <Skeleton style={{ height: 40, width: "100%" }} />
    </div>
  ),
};
