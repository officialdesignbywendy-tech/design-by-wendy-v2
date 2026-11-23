import { defineTool } from "@lovable.dev/mcp-js";

const CONTACT = {
  email: "officialdesignbywendy@gmail.com",
  phone: "09065293937",
  whatsapp: "09065293937",
  linkedin:
    "https://www.linkedin.com/in/wendy-o-573b10415?utm_source=share_via&utm_content=profile&utm_medium=member_android",
};

export default defineTool({
  name: "get_contact",
  title: "Contact Wendy",
  description: "Get Wendy's public contact channels (email, phone, WhatsApp, LinkedIn).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTACT, null, 2) }],
    structuredContent: CONTACT,
  }),
});
