import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SectionHeader from "@/components/section-header";

const meta = {
  title: "Components/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  args: {
    title: "Articles",
    subtitle: "Guides, references",
    ctaUrl: "/blogs",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Notes: Story = {
  args: {
    title: "Notes",
    subtitle: "Personal notes and learning snippets",
    ctaUrl: "/notes",
  },
};
