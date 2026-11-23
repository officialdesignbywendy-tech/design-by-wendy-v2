import { useEffect, useRef, useState } from "react";
import { Check, MousePointer2 } from "lucide-react";
import { useInViewOnce, usePrefersReducedMotion } from "@/lib/motion";

type Tool = { name: string; logo?: string; mark: string; fx: number; fy: number; fr: number };

// Icons are the ones supplied by Wendy.
const TOOLS: Tool[] = [
  { name: "Adobe Photoshop", logo: "/hero/photoshop.png", mark: "Ps", fx: -30, fy: -140, fr: -14 },
  { name: "PixelLab", logo: "/hero/pixellab.png", mark: "Pl", fx: 34, fy: -90, fr: 12 },
  { name: "Vector Ink", logo: "/tools/vector-ink.png", mark: "Vi", fx: -16, fy: -30, fr: 8 },
  { name: "Background Remover", logo: "/tools/background-remover.png", mark: "Br", fx: 30, fy: 30, fr: -10 },
  { name: "Snapseed", logo: "/tools/snapseed.png", mark: "Sn", fx: -30, fy: 90, fr: 15 },
  { name: "Pinterest", logo: "/tools/pinterest.png", mark: "Pi", fx: 22, fy: 140, fr: -8 },
];

type Phase = "float" | "stack" | "pick" | "done";

const STACK_AT = 1300;
const FIRST_CLICK_AT = 3300;
const CLICK_EVERY = 620;

/**
 * Floating tool tiles drift, settle into a vertical stack, then a decorative cursor
 * clicks through them one by one. It only runs here, once, and never touches anything else.
 */
export function Tools() {
  const [stageRef, seen] = useInViewOnce<HTMLDivElement>(0.3);
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("float");
  const [picked, setPicked] = useState(0);
  const [clicking, setClicking] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const place = (index: number) => {
    const list = listRef.current;
    const row = list?.children[index] as HTMLElement | undefined;
    if (!list || !row) return;
    setCursor({ x: Math.min(list.clientWidth - 40, row.offsetLeft + row.offsetWidth * 0.62), y: row.offsetTop + row.offsetHeight * 0.5 });
  };

  useEffect(() => {
    if (!seen) return;
    if (reduced) {
      setPhase("done");
      setPicked(TOOLS.length);
      return;
    }
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("stack"), STACK_AT));
    timers.push(
      window.setTimeout(() => {
        setPhase("pick");
        // start just off the first row so the cursor visibly travels in
        const list = listRef.current;
        if (list) setCursor({ x: list.clientWidth - 24, y: -30 });
      }, FIRST_CLICK_AT - 500),
    );
    TOOLS.forEach((_, i) => {
      const at = FIRST_CLICK_AT + i * CLICK_EVERY;
      timers.push(window.setTimeout(() => place(i), at - 250));
      timers.push(
        window.setTimeout(() => {
          setClicking(true);
          setPicked(i + 1);
          timers.push(window.setTimeout(() => setClicking(false), 220));
        }, at + 180),
      );
    });
    timers.push(
      window.setTimeout(() => {
        const list = listRef.current;
        if (list) setCursor({ x: list.clientWidth + 40, y: list.clientHeight + 40 });
        setPhase("done");
      }, FIRST_CLICK_AT + TOOLS.length * CLICK_EVERY + 300),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [seen, reduced]);

  return (
    <section id="tools" className="relative overflow-x-clip py-24 md:py-32">
      <div aria-hidden className="tl-aura" />
      <div className="container-x relative">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="reveal-on-scroll lg:sticky lg:top-32">
              <p className="eyebrow">Tools</p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
                My Everyday <span className="text-primary">Toolkit.</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                The creative tools I reach for to shape ideas into finished visuals.
              </p>
            </div>
          </div>

          <div ref={stageRef} className="tools-stage lg:col-span-7" data-phase={seen ? phase : "idle"}>
            <ol ref={listRef} className="tools-list">
              {TOOLS.map((tool, index) => (
                <li
                  key={tool.name}
                  className={`tools-row glass-panel ${index < picked ? "is-picked" : ""}`}
                  style={{
                    ["--fx" as string]: tool.fx,
                    ["--fy" as string]: tool.fy,
                    ["--fr" as string]: `${tool.fr}deg`,
                    ["--i" as string]: index,
                  }}
                >
                  <span className="tools-logo">
                    {tool.logo ? <img src={tool.logo} alt="" loading="lazy" /> : <span aria-hidden>{tool.mark}</span>}
                  </span>
                  <span className="tools-name text-base text-foreground sm:text-lg">{tool.name}</span>
                  <span aria-hidden className="tools-check">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </li>
              ))}
              {cursor ? (
                <span
                  aria-hidden
                  className={`tools-cursor ${clicking ? "is-click" : ""} ${phase === "done" ? "is-away" : ""}`}
                  style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
                >
                  <MousePointer2 className="h-6 w-6 fill-accent text-accent" />
                  <span className="tools-ripple" />
                </span>
              ) : null}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
