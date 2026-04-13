import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { PostList as ManifestPostList } from "@/components/ui/post-list";
import { demoPosts } from "@/components/ui/demo/blogging";
import type { Post } from "@/components/ui/types";

const posts: Post[] = demoPosts.map((post, index) => ({
  ...post,
  tags: post.tags ? [...post.tags] : undefined,
  url: post.url ?? `/blogs/demo-${index}`,
}));

const meta = {
  title: "UI/Manifest PostList",
  component: ManifestPostList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    data: {
      posts,
    },
    appearance: {
      variant: "list",
      columns: 2,
      showAuthor: true,
      showCategory: true,
    },
    actions: {
      onReadMore: fn(),
    },
  },
} satisfies Meta<typeof ManifestPostList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = {};

export const Grid: Story = {
  args: {
    appearance: {
      variant: "grid",
      columns: 2,
      showAuthor: true,
      showCategory: true,
    },
  },
};

export const Carousel: Story = {
  args: {
    appearance: {
      variant: "carousel",
      showAuthor: true,
      showCategory: true,
    },
  },
};

export const Fullwidth: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    appearance: {
      variant: "fullwidth",
      columns: 2,
      showAuthor: true,
      showCategory: true,
    },
  },
};

export const MinimalMeta: Story = {
  args: {
    appearance: {
      variant: "list",
      showAuthor: false,
      showCategory: false,
    },
  },
};
