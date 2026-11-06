import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageHeader } from "@/components/page-header";

const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: {
    title: "Posts",
    description:
      "Collected thoughts, references, and implementation details from ongoing experiments.",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongCopy: Story = {
  args: {
    title: "Writing About Systems",
    description:
      "Essays and implementation details about content pipelines, developer tooling, and the tradeoffs that show up once a small codebase starts behaving like a product.",
  },
};

export const WithDetails: Story = {
  args: {
    title: "Links",
    description: "Things I’ve read, watched, and found worth keeping.",
    details:
      "A personal collection of ideas, talks, courses, and useful tools. Sometimes with my notes and takeaways.",
  },
};
