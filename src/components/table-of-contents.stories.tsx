import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TableOfContents } from "@/components/table-of-contents";
import { storybookTocItems } from "@/components/storybook-fixtures";

const meta = {
  title: "Components/TableOfContents",
  component: TableOfContents,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    items: storybookTocItems,
  },
} satisfies Meta<typeof TableOfContents>;

export default meta;

type Story = StoryObj<typeof meta>;

function TocStoryLayout({ variant }: { variant: "sidebar" | "mobile" }) {
  const headings = [
    {
      id: "overview",
      title: "Overview",
      depth: 1,
      content:
        "Storybook gives shared components a stable environment for visual review and documentation.",
    },
    {
      id: "component-inventory",
      title: "Component Inventory",
      depth: 2,
      content:
        "A small initial story set helps validate the infrastructure before expanding into RSC-heavy page shells.",
    },
    {
      id: "story-authoring-conventions",
      title: "Story Authoring Conventions",
      depth: 2,
      content:
        "Typed CSF stories with fixtures keep visual states reproducible and easy to extend later.",
    },
    {
      id: "future-improvements",
      title: "Future Improvements",
      depth: 3,
      content:
        "MDX-heavy pages can be added in a second pass once the fixture and rendering strategy are clearer.",
    },
  ];

  return (
    <div
      className={
        variant === "sidebar"
          ? "grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]"
          : "mx-auto max-w-md"
      }
    >
      <div className={variant === "sidebar" ? "sticky top-8 self-start" : ""}>
        <TableOfContents items={storybookTocItems} variant={variant} />
      </div>
      <div className="min-w-0">
        <article className="prose max-w-none">
          {headings.map((heading) => {
            const HeadingTag = `h${heading.depth}` as "h1" | "h2" | "h3";

            return (
              <section key={heading.id} className="mb-16">
                <HeadingTag
                  id={heading.id}
                  tabIndex={-1}
                  className="scroll-mt-24"
                >
                  {heading.title}
                </HeadingTag>
                <p>{heading.content}</p>
                <p>
                  The content area is intentionally long enough to make TOC
                  selection and smooth scrolling visible during manual testing.
                </p>
              </section>
            );
          })}
        </article>
      </div>
    </div>
  );
}

export const Sidebar: Story = {
  render: () => <TocStoryLayout variant="sidebar" />,
};

export const Mobile: Story = {
  parameters: { docs: { story: { inline: false, iframeHeight: 600 } } },
  render: () => <TocStoryLayout variant="mobile" />,
};

export const LongHeadings: Story = {
  args: {
    items: [
      {
        value: "Designing a reading experience that works across screen sizes",
        depth: 2,
        url: "#reading",
      },
      {
        value: "Navigation and keyboard accessibility",
        depth: 3,
        url: "#navigation",
      },
      {
        value: "Moving focus to the selected section",
        depth: 4,
        url: "#focus",
      },
      {
        value:
          "Supporting headings with verylongunbrokenwordsthatshouldneveroverflowthesidebar",
        depth: 3,
        url: "#wrapping",
      },
      { value: "Summary", depth: 2, url: "#summary" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-52">
        <Story />
      </div>
    ),
  ],
};

export const Empty: Story = {
  args: { items: [] },
};
