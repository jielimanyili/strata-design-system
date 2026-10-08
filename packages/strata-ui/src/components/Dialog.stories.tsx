import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Dialog } from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog.Root,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `<Dialog.Root>
  <Dialog.Trigger className="strata-button strata-button--primary">
    Open dialog
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Delete project?</Dialog.Title>
      <Dialog.Description>This action cannot be undone.</Dialog.Description>
      <Dialog.Close>Cancel</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger className="strata-button strata-button--primary strata-button--md">
      Open dialog
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Backdrop />
      <Dialog.Popup>
        <Dialog.Title>Delete project?</Dialog.Title>
        <Dialog.Description>This action cannot be undone.</Dialog.Description>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <Dialog.Close>Cancel</Dialog.Close>
          <button
            className="strata-button strata-button--primary strata-button--md"
            type="button"
          >
            Confirm
          </button>
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>
);

export const Default: Story = { render: renderDialog };

export const OpensAndCloses: Story = {
  render: renderDialog,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /open dialog/i }));
    const dialog = await within(document.body).findByRole("dialog");
    await expect(dialog).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};
