import process from "node:process";

import { SITE } from "./site";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.
//
// On Cloudflare Workers, env binds at REQUEST time. Module-scope reads
// (e.g. `const x = process.env.X`) resolve to undefined — always read
// process.env INSIDE a function or handler.
//
// When to use which env-access pattern:
//   - .server.ts module (this file): server-only helpers reused across
//     handlers. Wrap reads in a function so they run per-request.
//   - inline process.env inside a createServerFn handler: one-off reads
//     not reused elsewhere.
//   - import.meta.env.VITE_FOO: PUBLIC config readable from both client
//     and server (analytics IDs, public URLs). Define in .env with the
//     VITE_ prefix. Never put secrets here — they ship to the browser.

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}

/**
 * Email delivery settings for the contact form. Read per request (see note above).
 *   RESEND_API_KEY      required, secret. Without it the form reports "not configured".
 *   CONTACT_TO_EMAIL    optional, defaults to the address already published on the site.
 *   CONTACT_FROM_EMAIL  optional sender. Defaults to Resend's shared test sender, which can
 *                       only deliver to the email of the Resend account owner; verify your
 *                       own domain in Resend to use a custom sender.
 */
export function getContactMailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    to: process.env.CONTACT_TO_EMAIL || SITE.email,
    from: process.env.CONTACT_FROM_EMAIL || `Design by Wendy <onboarding@resend.dev>`,
  };
}
