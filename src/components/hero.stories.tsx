import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Hero from "@/components/hero";

const meta = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  args: {
    title: "Blog",
    content:
      "Collected thoughts, references, and implementation details from ongoing experiments.",
  },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongCopy: Story = {
  args: {
    title: "Writing About Systems",
    content:
      "Essays and implementation details about content pipelines, developer tooling, and the tradeoffs that show up once a small codebase starts behaving like a product.",
  },
};
