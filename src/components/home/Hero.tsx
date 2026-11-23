import { useEffect, useRef } from "react";
import { ArrowDown, Linkedin } from "lucide-react";
import wendyPortrait from "@/assets/wendy-portrait.png.asset.json";
import { SITE } from "@/lib/site";
import { useTypewriter } from "@/lib/motion";
import { InstagramIcon } from "./icons";
import { WorkWithMeButton } from "./WorkWithMeButton";

/** The two software icons that peek out of the folder and float free when it's clicked. */
const HERO_ICONS = [
  { id: "ps", label: "Adobe Photoshop", src: "/hero/photoshop.png" },
  { id: "pl", label: "PixelLab", src: "/hero/pixellab.png" },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { typed, done } = useTypewriter(SITE.intro, { startDelay: 1300, speed: 34 });

  // Subtle pointer parallax (mouse only, never on touch or with reduced motion).
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      stage.style.setProperty("--px", x.toFixed(3));
      stage.style.setProperty("--py", y.toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      const clamp = (value: number) => Math.max(-1, Math.min(1, value));
      x = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2);
      y = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      schedule();
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      schedule();
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="top" className="hero relative isolate overflow-hidden bg-background">
      <div aria-hidden className="hero-curtain" />
      <div aria-hidden className="hero-mist" />
      <div aria-hidden className="hero-atmosphere" />
      <img aria-hidden alt="" src="/hero/star.png" draggable={false} className="hero-star hero-star-tl" />
      <img aria-hidden alt="" src="/hero/star.png" draggable={false} className="hero-star hero-star-br" />

      <div className="container-x relative pb-16 pt-8 sm:pb-20 sm:pt-12 md:pb-24">
        <div className="hero-topline flex items-center justify-between gap-3">
          <p className="eyebrow text-primary">Marketing · Promotional · Logo Design</p>
          <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-accent" /> Open for collaboration
          </span>
        </div>

        {/* Stage: purely visual. It is pointer-events:none, so nothing in it can
            intercept a click, and the cursor inside it only ever targets the folder. */}
        <div ref={stageRef} className="hero-stage mt-6 sm:mt-8">
          <div className="hero-scene">
            <div aria-hidden className="hero-glow" />

            <div aria-hidden className="hero-layer hero-folder-wrap">
              <div className="hero-folder">
                <div className="hero-folder-back">
                  <span className="hero-folder-tab" />
                </div>
                <div className="hero-folder-glow" />
                {HERO_ICONS.map((icon) => (
                  <div key={icon.id} className={`hero-icon hero-icon-${icon.id}`}>
                    <div className="hero-icon-inner">
                      <img src={icon.src} alt="" draggable={false} />
                    </div>
                  </div>
                ))}
                <div className="hero-folder-front" />
              </div>
            </div>

            <img
              src={wendyPortrait.url}
              alt={`${SITE.name}, Marketing & Promotional Designer`}
              fetchPriority="high"
              className="hero-layer hero-portrait"
            />

            <h1 className="hero-name">
              <span className="hero-name-left hero-layer">Wendy</span>
              <span className="sr-only"> </span>
              <span className="hero-name-right hero-layer">Onyia</span>
            </h1>

            {/* Decorative cursor: tip lands on the folder, never anywhere else. */}
            <div aria-hidden className="hero-cursor-layer">
              <svg className="hero-sparks" viewBox="0 0 40 40" fill="none">
                <path d="M20 5v6M29.5 9.5l-4 4.5M35 20h-6" stroke="var(--lime)" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
              <svg className="hero-cursor" viewBox="0 0 36 36" fill="none">
                <path
                  d="M30 4 4.5 14.6l11 4.4 4.2 12.2L30 4Z"
                  fill="var(--lime)"
                  stroke="var(--lime)"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-2 max-w-3xl text-center">
          <p className="font-display text-xl leading-relaxed text-foreground sm:text-2xl">
            <span className="sr-only">{SITE.intro}</span>
            <span aria-hidden="true" className="relative block">
              <span className="invisible">{SITE.intro}</span>
              <span className={`absolute inset-0 type-caret ${done ? "is-done" : ""}`}>{typed}</span>
            </span>
          </p>

          <div className="hero-actions mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#case-studies"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/35 bg-glass px-5 text-sm font-semibold text-foreground backdrop-blur-md transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View My Work
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <WorkWithMeButton />
          </div>

          <div className="mt-6 flex min-h-11 items-center justify-center gap-3">
            {done && (
              <>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Wendy Onyia on LinkedIn"
                  className="social-pop grid h-11 w-11 place-items-center rounded-full border border-primary/25 bg-glass text-primary backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                {SITE.instagram && (
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Wendy Onyia on Instagram"
                    className="social-pop grid h-11 w-11 place-items-center rounded-full border border-primary/25 bg-glass text-primary backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
                    style={{ animationDelay: "120ms" }}
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                )}
              </>
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground sm:hidden">
            <span className="h-2 w-2 rounded-full bg-accent" /> Open for collaboration
          </div>
        </div>
      </div>
    </section>
  );
}
