import { Megaphone, PenTool, Sparkles } from "lucide-react";
import { useInViewOnce } from "@/lib/motion";
import { TiltCard } from "./TiltCard";

const SERVICES = [
  {
    icon: Megaphone,
    title: "Marketing Design",
    desc: "Visuals designed to help businesses communicate their message, promote their offers and connect with their audience.",
    items: ["Social media graphics", "Advertisement creatives", "Marketing campaign visuals", "Digital promotional graphics"],
  },
  {
    icon: Sparkles,
    title: "Promotional Design",
    desc: "Attention-grabbing designs that help businesses promote products, services, events, offers and special campaigns.",
    items: ["Flyers", "Posters", "Sale promotions", "Product promotions", "Event promotions"],
  },
  {
    icon: PenTool,
    title: "Logo Design",
    desc: "Memorable logo concepts designed to give businesses a strong and recognisable visual starting point.",
    items: ["Wordmarks", "Brand marks", "Visual identity concepts"],
  },
];

/**
 * A glass folder rises into view, opens, and the three service cards fly out of it
 * into their places. It plays once, when about a fifth of the stage is on screen.
 * On phones the cards stack vertically and fly out of the same folder.
 */
export function Services() {
  const [stageRef, open] = useInViewOnce<HTMLDivElement>(0.2);

  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-36" style={{ background: "var(--gradient-editorial)" }}>
      <div className="container-x">
        <div className="reveal-on-scroll max-w-3xl">
          <p className="eyebrow">What I do</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            Three ways to bring <span className="text-primary">your message forward.</span>
          </h2>
        </div>

        <div ref={stageRef} className={`svc-stage relative mt-14 md:mt-20 ${open ? "is-open" : ""}`}>
          <div aria-hidden className="svc-folder">
            <div className="svc-folder-back">
              <span className="svc-folder-tab" />
            </div>
            <div className="svc-folder-glow" />
            <div className="svc-folder-front" />
          </div>

          <div className="svc-grid">
            {SERVICES.map(({ icon: Icon, title, desc, items }, index) => (
              <div key={title} className="svc-card" style={{ ["--i" as string]: index }}>
                <div className="svc-float">
                  <TiltCard max={5} className="glass-panel group h-full rounded-xl">
                    <article className="flex h-full flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:border-accent/50 group-hover:text-accent">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-display text-2xl text-accent">0{index + 1}</span>
                      </div>
                      <h3 className="mt-7 font-display text-2xl font-semibold text-primary sm:text-3xl">{title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{desc}</p>
                      <p className="eyebrow mt-6">Includes</p>
                      <ul className="mt-3 space-y-3 border-t border-border/60 pt-4 text-sm text-foreground">
                        {items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </TiltCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
