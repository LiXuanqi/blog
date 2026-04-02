import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeSelector } from "@/components/ui/theme-selector";

const meta = {
  title: "UI/ThemeSelector",
  component: ThemeSelector,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ThemeSelector>;

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

export const System: Story = {
  globals: {
    theme: "system",
  },
};
