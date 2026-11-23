import { TiltCard } from "./TiltCard";

/**
 * Client Feedback. There are no testimonials yet, so these are honest placeholders:
 * the three existing lines, laid out so real quotes can drop into the same slots later.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-x-clip py-24 md:py-32">
      <div aria-hidden className="tm-aura" />
      <div className="container-x relative">
        <div className="reveal-on-scroll flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl">
              Client Feedback<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            A place for the stories behind the work, shared by the people I collaborate with.
          </p>
        </div>

        <div className="tm-grid mt-10 md:mt-14">
          <TiltCard max={3} className="tm-feature glass-panel reveal-on-scroll rounded-2xl">
            <span aria-hidden className="tm-quote">“</span>
            <p className="font-display text-2xl leading-snug sm:text-3xl md:text-4xl">Client stories will live here.</p>
            <span aria-hidden className="tm-rule" />
          </TiltCard>

          <TiltCard max={3} className="tm-card glass-panel tm-available reveal-on-scroll rounded-2xl" style={{ transitionDelay: "110ms" }}>
            <span className="tm-status">
              <span aria-hidden className="tm-pulse" />
              Open for projects
            </span>
            <p className="mt-5 font-display text-xl leading-snug sm:text-2xl">Available for new marketing and promotional design projects.</p>
            <a href="#contact" className="tm-link">
              Start a conversation <span aria-hidden>→</span>
            </a>
          </TiltCard>

          <TiltCard max={3} className="tm-card glass-panel reveal-on-scroll rounded-2xl" style={{ transitionDelay: "220ms" }}>
            <span aria-hidden className="tm-quote tm-quote-sm">“</span>
            <p className="font-display text-xl leading-snug sm:text-2xl">Your feedback could be the first featured.</p>
            <span aria-hidden className="tm-rule" />
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
