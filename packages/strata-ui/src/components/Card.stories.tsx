import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardDescription, CardTitle } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardTitle>Design tokens, one source of truth</CardTitle>
      <CardDescription>
        Every color, space, radius, and type value is a CSS variable. Flip the
        theme and the whole system re-skins.
      </CardDescription>
    </Card>
  ),
};
