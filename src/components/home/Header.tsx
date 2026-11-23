import { useEffect, useRef, useState } from "react";
import { WorkWithMeButton } from "./WorkWithMeButton";

export const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#case-studies" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

/**
 * Sticky, minimal navigation.
 * - Scroll-spy: the active item is the last nav section that has passed 35% of the viewport,
 *   so in-between sections (Services, Other Projects, Tools) stay grouped under the item before them.
 * - A single pill slides between items instead of each link restyling itself.
 * - Mobile menu opens with a height + staggered-link transition.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(NAV[0].href);
  const navRef = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => {
    let frame = 0;
    const compute = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * 0.35;
      let current = NAV[0].href;
      for (const item of NAV) {
        const element = document.querySelector<HTMLElement>(item.href);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = item.href;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? NAV[NAV.length - 1].href : current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const link = navRef.current?.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
      if (link) setPill({ x: link.offsetLeft, w: link.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-2xl">
      <div className="container-x grid h-[4.25rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:flex md:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label="Design by Wendy, home">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 font-display text-lg font-bold text-primary">W</span>
          <span className="truncate font-display text-base font-semibold md:text-lg">
            Design by Wendy<span className="text-accent">.</span>
          </span>
        </a>

        <nav ref={navRef} aria-label="Main" className="relative hidden items-center text-[13px] lg:flex">
          <span
            aria-hidden
            className="nav-pill"
            style={pill ? { transform: `translateX(${pill.x}px)`, width: pill.w, opacity: 1 } : undefined}
          />
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
              className={`relative z-10 rounded-full px-4 py-2 transition-colors duration-300 ${active === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <WorkWithMeButton />
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="menu-toggle grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground lg:hidden"
          data-open={open}
        >
          <span className="menu-toggle-bars" aria-hidden>
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu lg:hidden" data-open={open} inert={!open}>
        <div className="overflow-hidden">
          <div className="container-x flex flex-col gap-1 border-t border-border py-4 text-base">
            {NAV.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.href ? "location" : undefined}
                style={{ transitionDelay: open ? `${80 + index * 50}ms` : "0ms" }}
                className={`mobile-menu-link py-2.5 ${active === item.href ? "text-accent" : "text-foreground"}`}
              >
                {item.label}
              </a>
            ))}
            <div className="mobile-menu-link pt-3" style={{ transitionDelay: open ? `${80 + NAV.length * 50}ms` : "0ms" }}>
              <WorkWithMeButton onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
