import { Button } from "./Button";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;

export const Secondary = {
  args: { primary: false },
} satisfies Story;

export const ClickButton = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /(ON|OFF)/ });
    await userEvent.click(button);
  },
} satisfies Story;
