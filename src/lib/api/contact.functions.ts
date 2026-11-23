import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getContactMailConfig } from "../config.server";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  projectType: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(4000),
  // Honeypot: real visitors never see or fill this field. Bots do.
  website: z.string().max(200).optional().default(""),
});

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed" };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/**
 * Receives the portfolio contact form and emails it to Wendy.
 *
 * Delivery uses the Resend email API (https://resend.com). It needs a secret named
 * RESEND_API_KEY on the server. Until that exists the function reports
 * `not_configured` and the form tells the visitor to email directly, so a message
 * is never silently lost or falsely reported as sent.
 */
export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }): Promise<ContactResult> => {
    // Spam bots fill the hidden field: pretend success, send nothing.
    if (data.website) return { ok: true };

    const config = getContactMailConfig();
    if (!config.apiKey) {
      console.error("[contact] RESEND_API_KEY is not set; message was not delivered.");
      return { ok: false, reason: "not_configured" };
    }

    const subject = `New portfolio enquiry from ${oneLine(data.name)}`;
    const text = [
      `Name: ${oneLine(data.name)}`,
      `Email: ${data.email}`,
      `Project type: ${oneLine(data.projectType) || "Not specified"}`,
      "",
      data.message,
    ].join("\n");
    const html = `
      <h2>New portfolio enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(oneLine(data.name))}<br/>
      <strong>Email:</strong> ${escapeHtml(data.email)}<br/>
      <strong>Project type:</strong> ${escapeHtml(oneLine(data.projectType) || "Not specified")}</p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: config.from,
          to: [config.to],
          reply_to: data.email, // replying in Gmail goes straight to the visitor
          subject,
          text,
          html,
        }),
      });
      if (!response.ok) {
        console.error("[contact] Email provider rejected the message:", response.status, await response.text());
        return { ok: false, reason: "send_failed" };
      }
      return { ok: true };
    } catch (error) {
      console.error("[contact] Email request failed:", error);
      return { ok: false, reason: "send_failed" };
    }
  });
