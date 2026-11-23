import { useMemo, useState } from "react";
import { ArrowUpRight, Linkedin, Mail, Phone } from "lucide-react";
import { useInViewOnce } from "@/lib/motion";
import { SITE } from "@/lib/site";
import { sendContactMessage } from "@/lib/api/contact.functions";
import { InstagramIcon } from "./icons";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.554-5.338 11.89-11.893 11.89a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l.601.96-1 3.648 3.378-.567zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.09 1.09 0 0 0-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

const CONTACTS = [
  { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: SITE.phone, href: `tel:${SITE.phone}` },
  { icon: Linkedin, label: "LinkedIn — Wendy O.", href: SITE.linkedin },
  { icon: WhatsAppIcon, label: `WhatsApp · ${SITE.phone}`, href: SITE.whatsapp },
  { icon: InstagramIcon, label: "Instagram · @desi.gnbywendy", href: SITE.instagram },
];

/** Deterministic pseudo-random numbers, so server and client render identical pixels. */
function pixelField(count: number) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + rand() * 0.5;
    const dist = 9 + rand() * 30; // rem
    return {
      dx: Math.cos(angle) * dist * 1.5,
      dy: Math.sin(angle) * dist * 0.75,
      size: 0.28 + rand() * 0.5,
      delay: rand() * 0.18,
      spin: Math.round((rand() - 0.5) * 180),
      lime: i % 3 !== 0,
    };
  });
}

export function Contact() {
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.25);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const pixels = useMemo(() => pixelField(56), []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("sending");
    try {
      const result = await sendContactMessage({
        data: {
          name: String(values.get("name") ?? ""),
          email: String(values.get("email") ?? ""),
          projectType: String(values.get("projectType") ?? ""),
          message: String(values.get("message") ?? ""),
          website: String(values.get("website") ?? ""),
        },
      });
      if (result.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-x-clip pb-24 pt-20 md:pb-32 md:pt-28">
      <div aria-hidden className="ct-aura" />
      <div ref={ref} className={`container-x relative ct ${seen ? "is-live" : ""}`}>
        {/* The impact point and the pixels that burst out of it */}
        <div aria-hidden className="ct-burst">
          <span className="ct-core" />
          {pixels.map((p, i) => (
            <span
              key={i}
              className={`ct-px ${p.lime ? "is-lime" : ""}`}
              style={{
                ["--dx" as string]: `${p.dx.toFixed(2)}rem`,
                ["--dy" as string]: `${p.dy.toFixed(2)}rem`,
                ["--s" as string]: `${p.size.toFixed(2)}rem`,
                ["--d" as string]: `${p.delay.toFixed(2)}s`,
                ["--r" as string]: `${p.spin}deg`,
              }}
            />
          ))}
        </div>

        <div className="ct-head">
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.04] sm:text-5xl md:text-7xl">
            Let&apos;s create something <span className="text-primary">worth noticing.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <ul className="ct-links lg:col-span-5">
            {CONTACTS.map(({ icon: Icon, label, href }, i) => (
              <li key={label} style={{ ["--i" as string]: i }}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="ct-link group"
                >
                  <span className="ct-link-icon">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 break-all text-sm sm:text-base">{label}</span>
                  <ArrowUpRight className="ct-link-arrow h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="ct-form glass-panel rounded-2xl p-5 sm:p-8 lg:col-span-7">
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Leave this field empty
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="ct-field" style={{ ["--i" as string]: 0 }}>
                <label htmlFor="cf-name" className="eyebrow">Name</label>
                <input id="cf-name" required name="name" autoComplete="name" maxLength={100} placeholder="Your name" className="ct-input" />
              </div>
              <div className="ct-field" style={{ ["--i" as string]: 1 }}>
                <label htmlFor="cf-email" className="eyebrow">Email</label>
                <input id="cf-email" required name="email" type="email" autoComplete="email" maxLength={200} placeholder="you@email.com" className="ct-input" />
              </div>
            </div>
            <div className="ct-field mt-4" style={{ ["--i" as string]: 2 }}>
              <label htmlFor="cf-type" className="eyebrow">Project type</label>
              <input id="cf-type" name="projectType" maxLength={200} placeholder="Marketing design, promotional graphic, social media, logo…" className="ct-input" />
            </div>
            <div className="ct-field mt-4" style={{ ["--i" as string]: 3 }}>
              <label htmlFor="cf-message" className="eyebrow">Tell me about your project</label>
              <textarea id="cf-message" required name="message" maxLength={4000} rows={5} placeholder="A few sentences on your idea, goals, or vision." className="ct-input resize-y" />
            </div>
            <button type="submit" disabled={status === "sending"} className="ct-submit ct-field" style={{ ["--i" as string]: 4 }}>
              <span>{status === "sending" ? "Sending…" : status === "sent" ? "Message sent ✦" : "Send message"}</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm text-muted-foreground">
              {status === "sent" && "Thank you! Your message is on its way and I'll be in touch soon."}
              {status === "error" && (
                <>
                  Your message couldn&apos;t be sent just now. Please email me directly at{" "}
                  <a className="text-accent underline underline-offset-4" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                  .
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
