import { StarIcon } from "./icons";

const ITEMS = [
  "Open for Collaboration",
  "Marketing Design",
  "Promotional Design",
  "Social Media",
  "Campaign Visuals",
  "Logo Design",
];

function Group({ hidden = false }: { hidden?: boolean }) {
  // Repeated so one group is always wider than a large screen; the two groups
  // slide by exactly their own width, which makes the loop seamless.
  const repeated = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {repeated.map((text, index) => (
        <span key={`${text}-${index}`} className="marquee-item">
          {text}
          <StarIcon className="marquee-star" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee-banner" role="region" aria-label="Open for collaboration">
      <div className="marquee-track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
