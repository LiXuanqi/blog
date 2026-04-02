import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { CSSProperties } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "../src/app/globals.css";
import "katex/dist/katex.min.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      defaultTheme: "light",
      themes: {
        light: "light",
        dark: "dark",
      },
    }),
    (Story, context) => {
      const selectedTheme = context.globals.theme === "dark" ? "dark" : "light";

      return (
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme={selectedTheme}
          disableTransitionOnChange
        >
          <div
            className="min-h-screen bg-background text-foreground antialiased"
            style={
              {
                "--font-geist-sans":
                  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                "--font-geist-mono":
                  '"SFMono-Regular", ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace',
              } as CSSProperties
            }
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
