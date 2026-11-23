import { ArrowUpRight } from "lucide-react";

/**
 * Light-green pill CTA with an arrow in a white circle, styled after the homepage
 * reference. It is a plain, stationary anchor to #contact: nothing animates it
 * automatically and no decorative element is ever allowed to click it. Hover only
 * changes the shadow and nudges the arrow inside the circle, so the hit area never moves.
 */
export function WorkWithMeButton({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#contact"
      onClick={onClick}
      style={{ backgroundImage: "linear-gradient(96deg, #F0FCDD 0%, var(--lime) 55%, #B7F27C 100%)" }}
      className="work-with-me group inline-flex min-h-11 items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold text-accent-foreground shadow-[0_0_0_0_transparent] transition-shadow duration-300 hover:shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--lime)_75%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      Work With Me
      <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white text-[#1B4D1E] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.06)]">
        <ArrowUpRight strokeWidth={2.8} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}
