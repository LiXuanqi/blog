import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PostListPage from "@/components/PostListPage";
import { storybookPosts } from "@/components/storybook-fixtures";

const meta = {
  title: "Pages/PostListPage",
  component: PostListPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Blog",
    description:
      "Thoughts on web development, programming, and tooling from recent projects.",
    posts: storybookPosts,
    urlPrefix: "/blogs",
  },
} satisfies Meta<typeof PostListPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Notes: Story = {
  args: {
    title: "Notes",
    description: "Smaller references, experiments, and implementation details.",
    urlPrefix: "/notes",
  },
};
