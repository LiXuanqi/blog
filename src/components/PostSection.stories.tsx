import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  singleStorybookPost,
  storybookPosts,
} from "@/components/storybook-fixtures";
import { PostSection } from "@/components/PostSection";

const meta = {
  title: "Components/PostSection",
  component: PostSection,
  tags: ["autodocs"],
  args: {
    sectionTitle: "2026",
    posts: storybookPosts.slice(0, 2),
    urlPrefix: "/blogs",
  },
} satisfies Meta<typeof PostSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SinglePost: Story = {
  args: {
    posts: singleStorybookPost,
  },
};
