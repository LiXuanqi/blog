import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SectionHeader from "@/components/section-header";

const meta = {
  title: "Components/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  args: {
    title: "Posts",
    subtitle: "Guides, references",
    ctaUrl: "/posts",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
