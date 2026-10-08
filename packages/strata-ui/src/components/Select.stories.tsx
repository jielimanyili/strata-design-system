import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select.Root,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `<Select.Root defaultValue="Gala">
  <Select.Trigger>
    <Select.Value placeholder="Choose an apple" />
    <Select.Icon>▾</Select.Icon>
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner sideOffset={4}>
      <Select.Popup>
        <Select.Item value="Gala">
          <Select.ItemText>Gala</Select.ItemText>
        </Select.Item>
        <Select.Item value="Fuji">
          <Select.ItemText>Fuji</Select.ItemText>
        </Select.Item>
        <Select.Item value="Honeycrisp">
          <Select.ItemText>Honeycrisp</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const apples = ["Gala", "Fuji", "Honeycrisp", "Granny Smith"];

export const Default: Story = {
  render: () => (
    <Select.Root defaultValue="Gala">
      <Select.Trigger>
        <Select.Value placeholder="Choose an apple" />
        <Select.Icon>▾</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4}>
          <Select.Popup>
            {apples.map((apple) => (
              <Select.Item key={apple} value={apple}>
                <Select.ItemText>{apple}</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};
