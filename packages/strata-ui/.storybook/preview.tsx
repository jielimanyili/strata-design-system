import type { Preview } from "@storybook/react-vite";
import "../strata.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  globalTypes: {
    theme: {
      description: "Light or dark theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["light", "dark"],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? "light";
      const dark = theme === "dark";
      return (
        <div
          className={dark ? "strata-dark" : undefined}
          data-theme={theme}
          style={{
            padding: "1rem",
            minHeight: "100vh",
            background: "var(--strata-color-background)",
            color: "var(--strata-color-foreground)",
            fontFamily: "var(--strata-font-sans)",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
