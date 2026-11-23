import { defineMcp } from "@lovable.dev/mcp-js";

import getAboutTool from "./tools/get-about";
import getContactTool from "./tools/get-contact";
import listCaseStudiesTool from "./tools/list-case-studies";
import listServicesTool from "./tools/list-services";

export default defineMcp({
  name: "wendys-portfolio-mcp",
  title: "Wendy's Portfolio",
  version: "0.1.0",
  instructions:
    "Public tools for exploring Wendy's design portfolio. Use `get_about` for her bio, `list_services` for what she offers, `list_case_studies` for featured work, and `get_contact` for how to reach her.",
  tools: [getAboutTool, listServicesTool, listCaseStudiesTool, getContactTool],
});
