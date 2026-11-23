import { useEffect, useRef, useState } from "react";

/**
 * Shared motion language. Keep durations and easings here so every section
 * moves with the same character. CSS counterparts live in src/styles/hero.css
 * (--ease-out / --ease-io) and should stay in sync with these values.
 */
export const EASE = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.45, 0, 0.2, 1] as const,
};

export const DURATION = {
  fast: 0.3,
  base: 0.7,
  slow: 1.2,
};

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Character-by-character typing at a comfortable reading pace (~30 chars/sec)
 * with a tiny natural variation. With reduced motion the full text shows at once.
 */
export function useTypewriter(text: string, options: { startDelay?: number; speed?: number } = {}) {
  const { startDelay = 1300, speed = 34 } = options;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(text.length);
      return;
    }
    let index = 0;
    let timer = 0;
    const step = () => {
      index += 1;
      setCount(index);
      if (index >= text.length) return;
      const previous = text[index - 1];
      const breath = previous === "," || previous === ";" ? 160 : 0;
      timer = window.setTimeout(step, speed + Math.random() * 14 - 4 + breath);
    };
    setCount(0);
    timer = window.setTimeout(step, startDelay);
    return () => window.clearTimeout(timer);
  }, [text, startDelay, speed]);

  return { typed: text.slice(0, count), done: count >= text.length };
}

/**
 * True once the element has been at least `threshold` visible. It never flips back,
 * so scroll-triggered sequences play once and are not restarted by scrolling away and back.
 */
export function useInViewOnce<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

/**
 * Counts from 0 to `target` the first time the element scrolls into view, then stays put.
 * Scrolling away and back never restarts it. Reduced motion shows the final number at once.
 */
export function useCountUp<T extends Element>(target: number, duration = 1500) {
  const [ref, seen] = useInViewOnce<T>(0.5);
  const [value, setValue] = useState(0);
  // `seen` only ever flips false -> true, so this effect plays the count exactly once.
  useEffect(() => {
    if (!seen) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // fast start, gentle landing
      setValue(Math.round(eased * target));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [seen, target, duration]);
  return [ref, value] as const;
}
