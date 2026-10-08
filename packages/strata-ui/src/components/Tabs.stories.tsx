import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tabs } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs.Root,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderTabs = () => (
  <Tabs.Root defaultValue="overview" style={{ width: 320 }}>
    <Tabs.List>
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="projects">Projects</Tabs.Tab>
      <Tabs.Tab value="account">Account</Tabs.Tab>
      <Tabs.Indicator />
    </Tabs.List>
    <Tabs.Panel value="overview">Workspace stats and activity.</Tabs.Panel>
    <Tabs.Panel value="projects">Milestones and deadlines.</Tabs.Panel>
    <Tabs.Panel value="account">Profile and preferences.</Tabs.Panel>
  </Tabs.Root>
);

export const Default: Story = { render: renderTabs };

export const SwitchTab: Story = {
  render: renderTabs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("tab", { name: /projects/i }));
    const panel = await canvas.findByRole("tabpanel", { name: /projects/i });
    await expect(panel).toHaveTextContent(/milestones/i);
  },
};
