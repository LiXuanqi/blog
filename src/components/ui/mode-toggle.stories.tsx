import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModeToggle } from "@/components/ui/mode-toggle";

const meta = {
  title: "UI/ModeToggle",
  component: ModeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  globals: {
    theme: "light",
  },
};

export const Dark: Story = {
  globals: {
    theme: "dark",
  },
};
