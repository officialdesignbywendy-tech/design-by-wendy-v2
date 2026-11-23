import { useEffect, useRef, useState } from "react";
import { Lightbulb, Target, Eye } from "lucide-react";
import { TiltCard } from "./TiltCard";

const PROCESS = [
  { title: "Understanding the brief", desc: "I begin by understanding the project, the brand, its audience and what it wants to communicate." },
  { title: "Finding the direction", desc: "I identify the main message and explore the best creative direction to communicate it effectively." },
  { title: "Visual exploration", desc: "I explore suitable visual references, shapes, concepts and creative elements that relate to the brand and its message." },
  { title: "Typography and colour", desc: "I carefully select fonts, colours and visual treatments that align with the brand's identity and the feeling the design should communicate." },
  { title: "Sketching and composition", desc: "I organise the information, develop the layout and explore how the different elements should work together." },
  { title: "Design execution", desc: "I bring the concept to life, paying attention to visual hierarchy, detail, creativity and the purpose behind every design decision." },
  { title: "Refinement", desc: "I review and refine the design to ensure the final visual communicates the intended message clearly and effectively." },
];

// The three qualities named in the existing "Why work with me" copy.
const PILLARS = [
  { icon: Lightbulb, title: "Creativity", n: "01" },
  { icon: Target, title: "Strategic thinking", n: "02" },
  { icon: Eye, title: "Attention to detail", n: "03" },
];

/** Vertical timeline: a line draws down as the visitor scrolls and each step lights up when reached. */
function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(0);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    const compute = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const line = window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
      setFill(progress);
      const steps = Array.from(list.children) as HTMLElement[];
      let count = 0;
      steps.forEach((step) => {
        if (step.getBoundingClientRect().top < line) count += 1;
      });
      setReached(count);
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

  return (
    <div className="tl">
      <span aria-hidden className="tl-track" />
      <span aria-hidden className="tl-fill" style={{ transform: `scaleY(${fill})` }} />
      <ol ref={listRef} className="tl-list">
        {PROCESS.map((step, index) => (
          <li key={step.title} className={`tl-step ${index < reached ? "is-reached" : ""} ${index % 2 ? "tl-right" : "tl-left"}`}>
            <span className="tl-dot" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <TiltCard max={3} className="glass-panel tl-card rounded-xl">
              <h4 className="font-display text-xl font-semibold sm:text-2xl">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{step.desc}</p>
            </TiltCard>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function WhyAndProcess() {
  return (
    <section id="process" className="relative overflow-x-clip py-24 md:py-36">
      <div aria-hidden className="wp-aura" />
      <div className="container-x relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="reveal-on-scroll">
            <p className="eyebrow">Why work with me</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              A clear message, <span className="text-primary">thoughtfully made.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I believe good design starts with understanding what needs to be communicated. My approach combines creativity, strategic thinking and attention to detail to create visuals that have a clear purpose.
            </p>
          </div>
          <ul className="wp-pillars reveal-on-scroll">
            {PILLARS.map(({ icon: Icon, title, n }) => (
              <li key={title} className="glass-panel wp-pillar">
                <span className="wp-pillar-icon">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-lg sm:text-xl">{title}</span>
                <span className="wp-pillar-n">{n}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="reveal-on-scroll mx-auto max-w-2xl text-center">
            <p className="eyebrow">From first thought to final detail</p>
            <h3 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl">
              My creative process<span className="text-accent">.</span>
            </h3>
            <p className="mt-3 font-display text-sm text-muted-foreground">Seven considered steps</p>
          </div>
          <Timeline />
        </div>
      </div>
    </section>
  );
}
