import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_about",
  title: "About Wendy",
  description: "Get a short bio for Wendy — a Marketing, Logo, and Promotional Designer.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: "Wendy is a growing Marketing, Logo, and Promotional Designer creating visuals that help ideas and businesses stand out with clarity, strategy, and creativity. Every project is built with intention — from the first concept to the final design — so the result is not just visually appealing but communicates effectively.",
      },
    ],
  }),
});
