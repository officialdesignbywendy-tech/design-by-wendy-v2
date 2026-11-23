import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { COVERS, DivaluxeCaseStudy, GlowUpCaseStudy, RhythmCaseStudy } from "./CaseStudies";

type Featured = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Per-card accent so the three cards each have their own mood. */
  hue: string;
  detail: ReactNode;
};

const FEATURED: Featured[] = [
  {
    slug: "naija-dance-challenge",
    number: "01",
    title: "Naija Dance Challenge 2.0",
    category: "Event Promotion · Campaign Visual",
    description: "A high-energy event identity built around rhythm, movement and a clear call to action.",
    image: COVERS.rhythm,
    hue: "oklch(0.72 0.17 255)",
    detail: <RhythmCaseStudy />,
  },
  {
    slug: "divaluxe",
    number: "02",
    title: "Divaluxe",
    category: "Promotional Design · Beauty",
    description: "An elegant makeup studio flyer balancing premium atmosphere with useful service information.",
    image: COVERS.divaluxe,
    hue: "oklch(0.8 0.1 40)",
    detail: <DivaluxeCaseStudy />,
  },
  {
    slug: "glow-up-beauty-pop-up",
    number: "03",
    title: "Glow Up Beauty Pop Up",
    category: "Event Promotion · Campaign Visual",
    description: "A beauty pop-up campaign designed to build anticipation and make event details easy to scan.",
    image: COVERS.glowUp,
    hue: "oklch(0.79 0.12 304)",
    detail: <GlowUpCaseStudy />,
  },
];

const HASH_PREFIX = "#project-";
const EXIT_MS = 420;

function slugFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const slug = hash.slice(HASH_PREFIX.length);
  return FEATURED.some((p) => p.slug === slug) ? slug : null;
}

/** Opening and closing are plain hash changes, so the browser Back button and deep links both work. */
function openProject(slug: string) {
  window.location.hash = `project-${slug}`;
}
function closeProject() {
  if (slugFromHash()) window.location.hash = "case-studies";
}

/* -------------------------------------------------------------------------- */
/* Gallery                                                                    */
/* -------------------------------------------------------------------------- */

function Gallery({ onOpen }: { onOpen: (slug: string) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [scrollable, setScrollable] = useState(true);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0 });

  const update = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setScrollable(max > 4);
    setProgress(max > 0 ? rail.scrollLeft / max : 0);
    setEdges({ start: rail.scrollLeft <= 4, end: rail.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const step = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".pg-card");
    const amount = (card?.offsetWidth ?? 360) + 24;
    rail.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Mouse drag-to-scroll. Touch keeps native momentum swiping.
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;
    drag.current = { active: true, moved: false, x: event.clientX, left: rail.scrollLeft };
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const rail = railRef.current;
    if (!d.active || !rail) return;
    const dx = event.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      rail.classList.add("is-dragging");
    }
    if (d.moved) rail.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const rail = railRef.current;
    drag.current.active = false;
    rail?.classList.remove("is-dragging");
    // let the click that follows a drag be swallowed, then reset
    window.setTimeout(() => {
      drag.current.moved = false;
    }, 0);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <div className="mt-10 md:mt-14">
      <div
        ref={railRef}
        className="pg-rail"
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        {FEATURED.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className="pg-card group"
            style={{ ["--hue" as string]: project.hue, ["--i" as string]: index }}
            onClick={(event) => {
              if (drag.current.moved) {
                event.preventDefault();
                return;
              }
              onOpen(project.slug);
            }}
            aria-label={`Explore project: ${project.title}`}
          >
            <span aria-hidden className="pg-glow" />
            <span aria-hidden className="pg-num">
              {project.number}
            </span>
            <span className="pg-media">
              <img src={project.image} alt="" loading="lazy" draggable={false} className="pg-img" />
              <span aria-hidden className="pg-shine" />
              <span aria-hidden className="pg-arrow">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </span>
            <span className="pg-body">
              <span className="eyebrow !text-[var(--hue)]">{project.category}</span>
              <span className="mt-3 block font-display text-2xl font-semibold leading-tight sm:text-[1.7rem]">{project.title}</span>
              <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">{project.description}</span>
              <span className="pg-cta">
                Explore project <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className={`mt-6 items-center gap-4 ${scrollable ? "flex" : "hidden"}`}>
        <div className="pg-progress" aria-hidden>
          <span style={{ transform: `scaleX(${0.18 + progress * 0.82})` }} />
        </div>
        <span className="hidden text-xs text-muted-foreground sm:block">Drag, swipe or use the arrows</span>
        <div className="ml-auto flex gap-2">
          <button type="button" className="pg-nav" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous project">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" className="pg-nav" onClick={() => step(1)} disabled={edges.end} aria-label="Next project">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground sm:hidden">Swipe to explore projects</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Detail view                                                                */
/* -------------------------------------------------------------------------- */

function Detail({ slug, closing }: { slug: string; closing: boolean }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const index = FEATURED.findIndex((p) => p.slug === slug);
  const project = FEATURED[index];
  const next = FEATURED[(index + 1) % FEATURED.length];
  const prev = FEATURED[(index - 1 + FEATURED.length) % FEATURED.length];
  const [scrolled, setScrolled] = useState(0);

  // Reset scroll and move focus when the project changes.
  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus({ preventScroll: true });
  }, [slug]);

  // Reveal each section as it scrolls into view inside the overlay.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const targets = Array.from(scroller.querySelectorAll<HTMLElement>(".project-detail-body > *"));
    targets.forEach((el) => el.classList.add("pd-reveal"));
    // Reveal everything whose top edge has come within the lower part of the view, so
    // sections skipped by a fast scroll or an End-key jump never stay hidden.
    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = scroller.getBoundingClientRect().bottom - scroller.clientHeight * 0.08;
      targets.forEach((el) => {
        if (!el.classList.contains("is-in") && el.getBoundingClientRect().top < limit) el.classList.add("is-in");
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    check();
    scroller.addEventListener("scroll", schedule, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [slug]);

  // Escape closes, Tab stays inside the overlay.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProject();
        return;
      }
      if (event.key !== "Tab") return;
      const root = scrollerRef.current?.parentElement;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock page scroll underneath.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className="pd-overlay"
      data-state={closing ? "closing" : "open"}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project details`}
      style={{ ["--hue" as string]: project.hue }}
    >
      <div aria-hidden className="pd-aura" />
      <div className="pd-bar">
        <button ref={closeRef} type="button" className="pd-back" onClick={closeProject}>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to projects</span>
        </button>
        <p className="pd-bar-title" aria-hidden>
          <span>{project.number}</span> {project.title}
        </p>
        <button type="button" className="pd-x" onClick={closeProject} aria-label="Close project">
          <X className="h-4 w-4" />
        </button>
        <span aria-hidden className="pd-scroll-progress" style={{ transform: `scaleX(${scrolled})` }} />
      </div>

      <div
        ref={scrollerRef}
        className="pd-scroller"
        onScroll={(event) => {
          const el = event.currentTarget;
          const max = el.scrollHeight - el.clientHeight;
          setScrolled(max > 0 ? el.scrollTop / max : 0);
        }}
      >
        <div className="container-x pd-inner">
          <header className="pd-head">
            <p className="eyebrow !text-[var(--hue)]">
              Project {project.number} / {String(FEATURED.length).padStart(2, "0")}
            </p>
          </header>

          {project.detail}

          <nav aria-label="More projects" className="pd-more">
            <button type="button" className="pd-more-card" onClick={() => openProject(prev.slug)}>
              <span className="eyebrow">Previous</span>
              <span className="font-display text-xl">{prev.title}</span>
            </button>
            <button type="button" className="pd-more-card pd-more-next" onClick={() => openProject(next.slug)}>
              <span className="eyebrow">Next project</span>
              <span className="font-display text-xl">{next.title}</span>
              <ArrowRight className="pd-more-arrow h-5 w-5" />
            </button>
          </nav>
          <div className="flex justify-center pb-10">
            <button type="button" className="pd-back" onClick={closeProject}>
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all projects</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Projects() {
  // The visible project lags the hash while the exit animation plays.
  const [rendered, setRendered] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const timer = useRef<number>(0);

  useEffect(() => {
    const sync = () => {
      const slug = slugFromHash();
      window.clearTimeout(timer.current);
      if (slug) {
        setClosing(false);
        setRendered((current) => {
          if (!current) lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          return slug;
        });
      } else {
        setClosing(true);
        timer.current = window.setTimeout(() => {
          setRendered(null);
          setClosing(false);
          lastFocus.current?.focus?.({ preventScroll: true });
        }, EXIT_MS);
      }
    };
    // A deep link such as /#project-divaluxe opens straight away.
    if (slugFromHash()) sync();
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <section id="case-studies" className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x relative">
        <div className="reveal-on-scroll flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured case studies</p>
            <h2 className="mt-4 font-display text-5xl font-semibold sm:text-6xl md:text-7xl">
              Projects<span className="text-primary">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A closer look at promotional and campaign visuals, from the first idea to the final presentation.
            </p>
          </div>
          <span className="hidden pb-2 text-sm text-muted-foreground sm:block">03 featured projects</span>
        </div>
        <div className="reveal-on-scroll">
          <Gallery onOpen={openProject} />
        </div>
      </div>
      {rendered ? <Detail slug={rendered} closing={closing} /> : null}
    </section>
  );
}
