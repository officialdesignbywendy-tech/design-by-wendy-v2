import { defineTool } from "@lovable.dev/mcp-js";

const CASE_STUDIES = [
  {
    slug: "naija-dance-challenge",
    title: "Naija Dance Challenge 2.0",
    type: "Event promotional design",
    summary:
      "Bold, energetic flyer and mockup system for a dance competition, blending condensed display type with vibrant hierarchy for maximum social-media impact.",
  },
  {
    slug: "divaluxe",
    title: "Divaluxe",
    type: "Brand promotional design",
    summary: "Elegant promotional flyer and mockup suite for a luxury lifestyle brand.",
  },
  {
    slug: "glow-up",
    title: "Glow Up",
    type: "Event promotional design",
    summary: "Event flyer system and mockups designed to promote a beauty event with a modern, uplifting look.",
  },
];

export default defineTool({
  name: "list_case_studies",
  title: "List case studies",
  description: "List the case studies featured in Wendy's portfolio.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CASE_STUDIES, null, 2) }],
    structuredContent: { caseStudies: CASE_STUDIES },
  }),
});
