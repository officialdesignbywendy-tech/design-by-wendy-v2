import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Gentle 3D tilt that follows a mouse pointer, with a soft light sheen.
 * Touch and pen input never tilt, and reduced motion disables it entirely
 * (see .tilt-card in src/styles/sections.css).
 */
export function TiltCard({
  children,
  className = "",
  max = 6,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse") return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
    node.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
    node.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    node.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`tilt-card ${className}`} style={style}>
      {children}
    </div>
  );
}
