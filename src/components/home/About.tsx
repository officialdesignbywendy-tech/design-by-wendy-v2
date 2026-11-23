import { Fragment } from "react";
import { useCountUp } from "@/lib/motion";
import { TiltCard } from "./TiltCard";

const PROJECT_COUNT = 60;
const ORGANISATIONS = ["Edu4U Global", "Stuck in Profit", "The Clarity Table Conference"];

/** Heading whose words slide up out of a mask, one after another. */
function SplitHeading({ words, accentFrom }: { words: string[]; accentFrom: number }) {
  return (
    <h2 className="split-heading reveal-on-scroll mt-4 font-display text-4xl leading-[1.06] sm:text-5xl md:text-7xl">
      <span className="sr-only">{words.join(" ")}</span>
      <span aria-hidden>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="split-word">
              <span style={{ ["--i" as string]: index }} className={index >= accentFrom ? "text-primary" : undefined}>
                {word}
              </span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </h2>
  );
}

/** One line/paragraph of the biography, staggered inside its card. */
function Line({ i, className = "", children }: { i: number; className?: string; children: React.ReactNode }) {
  return (
    <p className={`bio-line ${className}`} style={{ ["--i" as string]: i }}>
      {children}
    </p>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 64 84" className="about-bulb-svg" fill="none" aria-hidden>
      <defs>
        <linearGradient id="bulb-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--lime)" stopOpacity="0.95" />
          <stop offset="1" stopColor="var(--lime)" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path
        className="bulb-fill"
        d="M32 3C18.7 3 8 13.6 8 26.6c0 8.7 4.6 14.6 9.5 19.8 2.4 2.6 4 5.2 4 8.4V58h21v-3.2c0-3.2 1.6-5.8 4-8.4C51.4 41.2 56 35.3 56 26.6 56 13.6 45.3 3 32 3Z"
        fill="url(#bulb-glass)"
        stroke="var(--lilac)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path className="bulb-filament" d="M27 58V46M37 58V46M27 46c0.5-9 3.5-9 5-9s4.5 0 5 9" stroke="var(--lilac)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 64h18M24.5 70h15M28 76h8" stroke="var(--lilac)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function About() {
  const [countRef, count] = useCountUp<HTMLDivElement>(PROJECT_COUNT);

  return (
    <section id="about" className="relative overflow-x-clip py-24 md:py-36">
      <div aria-hidden className="about-aura" />
      <div className="container-x relative">
        <div className="mb-12 max-w-5xl md:mb-16">
          <p className="eyebrow reveal-on-scroll">About Wendy</p>
          <SplitHeading words={["The", "designer", "behind", "the", "work."]} accentFrom={2} />
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* Portrait column */}
          <div className="lg:sticky lg:top-28">
            <div className="about-card-wrap reveal-on-scroll mx-auto mt-12 max-w-md">
              {/* The bulb sits behind the card and rises out over its top edge. */}
              <div aria-hidden className="about-bulb">
                <span className="about-bulb-glow" />
                <BulbIcon />
              </div>
              <TiltCard max={5} className="glass-panel relative z-10 overflow-hidden rounded-2xl p-3">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src="/about/wendy-idea-portrait.jpg"
                    alt="Wendy Onyia, marketing and promotional designer, touching her temple as if an idea has just landed"
                    width={1080}
                    height={1350}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent p-5 pt-24">
                    <p className="font-display text-xl font-semibold">Wendy Onyia</p>
                    <p className="mt-1 text-sm text-foreground/75">Marketing &amp; Promotional Designer</p>
                  </div>
                </div>
              </TiltCard>
            </div>

            <div ref={countRef} className="about-counter mx-auto mt-6 max-w-md" aria-label={`${PROJECT_COUNT}+ projects delivered`}>
              <span className="font-display text-5xl font-bold leading-none text-primary tabular-nums" aria-hidden>
                {count}
                <span className="text-accent">+</span>
              </span>
              <span className="text-sm leading-tight text-foreground/80" aria-hidden>
                Projects
                <br />
                Delivered
              </span>
            </div>
          </div>

          {/* Biography: revealed card by card as the visitor scrolls */}
          <div className="space-y-5">
            <article className="glass-panel reveal-on-scroll rounded-xl p-6 sm:p-8">
              <p className="eyebrow">Who I am</p>
              <Line i={0} className="mt-4 text-base leading-relaxed text-foreground sm:text-lg">
                I&apos;m Wendy Onyia, a Marketing &amp; Promotional Designer who turns business offers into visuals people notice, understand and act on.
              </Line>
              <Line i={1} className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                I create social media graphics, promotional visuals, campaign visuals and logos that help businesses communicate their value clearly and show up with intention.
              </Line>
              <Line i={2} className="mt-5 border-l-2 border-accent pl-4 font-display text-lg text-primary sm:text-xl">
                Because good design is about making the right message impossible to overlook.
              </Line>
            </article>

            <article className="glass-panel reveal-on-scroll rounded-xl p-6 sm:p-8">
              <p className="eyebrow">My design background</p>
              <Line i={0} className="mt-4 font-display text-lg text-primary sm:text-xl">
                Creativity has always been a part of me.
              </Line>
              <Line i={1} className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                Growing up, I naturally gravitated towards crafting, creating things with my hands and exploring different ways to bring ideas to life.
              </Line>
              <Line i={2} className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                When it was time to learn a skill, I reflected on what I had always enjoyed doing. Design felt like a natural direction because it combined my creativity with the opportunity to communicate ideas visually.
              </Line>
              <Line i={3} className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                That interest eventually grew into a journey of learning, practising, experimenting and developing my skills as a Marketing &amp; Promotional Designer.
              </Line>
            </article>

            <article className="glass-panel reveal-on-scroll rounded-xl p-6 sm:p-8">
              <p className="eyebrow">My experience</p>
              <Line i={0} className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                I have created over 60 designs across different brands, industries and creative projects, ranging from personal concepts to real projects and collaborations.
              </Line>
              <Line i={1} className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                Some of the projects and organisations I have worked with include:
              </Line>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ORGANISATIONS.map((name, index) => (
                  <li
                    key={name}
                    className="bio-line rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary"
                    style={{ ["--i" as string]: index + 2 }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </article>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="glass-panel reveal-on-scroll rounded-xl p-6 sm:p-7">
                <p className="eyebrow">Creative interests</p>
                <Line i={0} className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  I enjoy creativity, visual storytelling, bringing concepts to life and exploring unique ways to communicate ideas.
                </Line>
                <Line i={1} className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  I&apos;m particularly interested in creating visuals that make people pause, notice the message, understand it and remember the experience.
                </Line>
              </article>

              <article className="glass-panel reveal-on-scroll rounded-xl p-6 sm:p-7">
                <p className="eyebrow">What inspires my work</p>
                <Line i={0} className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  My inspiration often comes from understanding the brand I&apos;m working with and finding the best way to communicate its message.
                </Line>
                <Line i={1} className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  I pay attention to the brand, its audience, the purpose of the design and the emotions or actions it wants to inspire.
                </Line>
                <Line i={2} className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  Sometimes inspiration comes from unexpected shapes, objects, visual connections and random creative ideas.
                </Line>
                <Line i={3} className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  I enjoy exploring those possibilities and turning them into visuals that feel intentional, distinctive and memorable.
                </Line>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
