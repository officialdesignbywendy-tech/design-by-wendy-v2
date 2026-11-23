# Design by Wendy — immersive portfolio refresh

## Goal

Transform the existing portfolio into a dark, motion-led creative experience inspired by the supplied homepage artwork and Studio MACACO’s interaction quality, without copying their brand or inventing projects, testimonials, achievements, or contact links.

## What will change

- Rebuild the existing homepage presentation around the supplied palette: near-black `#100A15`, lilac `#CFA4FB`, light green `#D0FBA4`, and white; load Bricolage Grotesque and Space Grotesk. Use restrained atmospheric lighting and dark glass surfaces with subtle borders.
- Replace the navigation with Home, About, Projects, Testimonials, Contact, and a light-green Work With Me action; retain sticky access, mobile menu, anchor scrolling, and active-section indication.
- Recompose the hero around the provided visual reference: Wendy Onyia name treatment, portrait, folder/tool visual, collaboration CTA, exact supplied introduction, typed reveal, and a continuous collaboration ticker. Use the existing portrait for the hero and the newly supplied Artboard portrait for About; keep hero objects decorative and touch/reduced-motion friendly.
- Rework About with the supplied biography, experience, named organizations, creative interests, inspiration, a one-time project count, and a distinct portrait treatment.
- Present the existing three services as an animated folder-to-cards sequence, retaining their provided descriptions and inclusions.
- Retain the three featured case studies and all their existing descriptions, images, decisions, tools, outcomes, mockups, and reflections. Add a swipe/drag-friendly featured-project rail with concise summaries that opens the full details in accessible project overlays. Keep all Other Projects as individual cards in their existing gallery format.
- Replace the “Why” list with the supplied seven-step process and rationale; remove the specifically rejected portfolio-building statement. Give Testimonials its own section with only the requested existing placeholder copy and no invented feedback.
- Rename the tools section and retain the seven named tools in an ordered, reduced-motion-aware animation.
- Make Contact the final main section, retain existing email, phone, LinkedIn, WhatsApp, form fields, and submit response; redesign it in the dark glass style and remove only the paragraphs explicitly identified for removal. Do not invent an Instagram URL; include only verified social destinations.
- Add restrained, coordinated motion, mobile-specific arrangements, keyboard/touch support, and `prefers-reduced-motion` handling. Keep the current single-page public URL and existing MCP endpoints.

## Technical approach

- Extend the current TanStack Start index route and its existing section components; preserve existing project data and asset pointers. Import the supplied About portrait through Lovable Assets.
- Update global semantic tokens and font links in the existing stylesheet/root head. Use CSS keyframes and small IntersectionObserver/pointer handlers instead of adding a motion dependency.
- Preserve the working contact form’s current client-side submission behavior and all existing links. Maintain page metadata and verify responsive rendering, interactions, accessibility basics, and build output.

## Validation

Verify the desktop and mobile homepage, mobile navigation and anchor targets, hero typing/CTA, reduced-motion behavior, service sequence, project gallery gestures and project detail overlays, Other Projects gallery, contact links and form acknowledgement, and the newest preview build status.