import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  emptyStorybookPosts,
  singleStorybookPost,
  storybookPosts,
} from "@/components/storybook-fixtures";
import { PostList } from "@/components/post-list";

const meta = {
  title: "Components/PostList",
  component: PostList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    posts: storybookPosts,
    urlPrefix: "/blogs",
  },
} satisfies Meta<typeof PostList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleItem: Story = {
  args: {
    posts: singleStorybookPost,
  },
};

export const Limited: Story = {
  args: {
    limit: 2,
  },
};

export const Empty: Story = {
  args: {
    posts: emptyStorybookPosts,
  },
};
