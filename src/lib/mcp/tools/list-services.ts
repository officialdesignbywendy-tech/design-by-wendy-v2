import { defineTool } from "@lovable.dev/mcp-js";

const SERVICES = [
  {
    title: "Marketing Design",
    items: ["Social media graphics", "Marketing materials", "Campaign visuals"],
  },
  {
    title: "Promotional Design",
    items: ["Flyers", "Posters", "Event promotions"],
  },
  {
    title: "Logo Design",
    items: ["Wordmarks", "Brand marks", "Visual identity"],
  },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the design services Wendy offers.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES, null, 2) }],
    structuredContent: { services: SERVICES },
  }),
});
