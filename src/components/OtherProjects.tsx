import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/home/TiltCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import purepressJuice from "@/assets/other-projects/purepress-juice.jpg.asset.json";
import crunchbite from "@/assets/other-projects/crunchbite-grand-opening.jpg.asset.json";
import savorySpoon from "@/assets/other-projects/savory-spoon-menu.jpg.asset.json";
import burgerSpot from "@/assets/other-projects/burger-spot-opening.jpg.asset.json";
import sweetCrumbs from "@/assets/other-projects/sweet-crumbs-bakery.jpg.asset.json";
import penAndPurpose from "@/assets/other-projects/pen-and-purpose-hub.jpg.asset.json";
import havenCrestMain from "@/assets/other-projects/haven-crest-main-property.png.asset.json";
import havenCrestCart from "@/assets/other-projects/haven-crest-cart-home.png.asset.json";
import havenCrestIce from "@/assets/other-projects/haven-crest-ice-home.png.asset.json";
import havenCrestEgg from "@/assets/other-projects/haven-crest-egg-home.png.asset.json";
import havenCrestSuitcase from "@/assets/other-projects/haven-crest-suitcase-home.png.asset.json";
import havenCrestShadow from "@/assets/other-projects/haven-crest-shadow-home.png.asset.json";
import floralThreadsFashion from "@/assets/other-projects/floral-threads-crochet-fashion.jpeg.asset.json";
import floralThreadsOriginal from "@/assets/other-projects/floral-threads-original.jpg.asset.json";
import nexoraCampaign from "@/assets/other-projects/nexora-campaign-poster.png.asset.json";
import nexoraLogoBlack from "@/assets/other-projects/nexora-logo-black.png.asset.json";
import nexoraLogoWhite from "@/assets/other-projects/nexora-logo-white.png.asset.json";
import nexoraBusStop from "@/assets/other-projects/nexora-bus-stop-mockup.png.asset.json";

/**
 * Add a new project by appending an object to this list.
 * `link` is optional — leave it out and the "View Project" button is hidden.
 */
export type OtherProject = {
  title: string;
  category: string;
  image: string;
  gallery?: ProjectImage[];
  link?: string;
};

type ProjectImage = {
  src: string;
  label?: string;
};

export const OTHER_PROJECTS: OtherProject[] = [
  {
    title: "Pure Press Juicery",
    category: "Product promotional flyer",
    image: purepressJuice.url,
  },
  {
    title: "CrunchBite Foods",
    category: "Grand opening promo design",
    image: crunchbite.url,
  },
  {
    title: "Savory Spoon",
    category: "Menu & services flyer",
    image: savorySpoon.url,
  },
  {
    title: "Burger Spot",
    category: "Grand opening campaign visual",
    image: burgerSpot.url,
  },
  {
    title: "Sweet Crumbs Bakery",
    category: "Bakery services flyer",
    image: sweetCrumbs.url,
  },
  {
    title: "Pen and Purpose Hub",
    category: "Service promotional design",
    image: penAndPurpose.url,
  },
  {
    title: "Haven Crest Properties — Real Estate Campaign",
    category: "Social Media Design / Real Estate Advertising",
    image: havenCrestMain.url,
    gallery: [
      { src: havenCrestMain.url, label: "Haven Crest property advert" },
      { src: havenCrestCart.url, label: "Shopping cart concept" },
      { src: havenCrestIce.url, label: "Ice cube concept" },
      { src: havenCrestEgg.url, label: "Egg concept" },
      { src: havenCrestSuitcase.url, label: "Suitcase concept" },
      { src: havenCrestShadow.url, label: "Shadow and house concept" },
    ],
  },
  {
    title: "Floral Threads — Crochet Fashion",
    category: "Brand / Social Media Design",
    image: floralThreadsFashion.url,
  },
  {
    title: "Floral Threads — First Project & Redesign",
    category: "Graphic Design / Redesign",
    image: floralThreadsFashion.url,
    gallery: [
      { src: floralThreadsOriginal.url, label: "Original" },
      { src: floralThreadsFashion.url, label: "Redesign" },
    ],
  },
  {
    title: "Nexora — N1 Earbuds",
    category: "Product Advertising / Brand Design",
    image: nexoraCampaign.url,
    gallery: [
      { src: nexoraCampaign.url, label: "Main campaign visual — N1 earbuds promotional poster" },
      { src: nexoraLogoBlack.url, label: "Logo system — black version" },
      { src: nexoraLogoWhite.url, label: "Logo system — white version" },
      { src: nexoraBusStop.url, label: "Outdoor advertising mockup — bus-stop advertisement" },
    ],
  },
];

function ProjectGallery({ project }: { project: OtherProject }) {
  const images = project.gallery ?? [{ src: project.image }];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) return null;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };
  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <Dialog>
      <div className="relative overflow-hidden bg-muted">
        <DialogTrigger asChild>
          <button
            type="button"
            className="group/image relative block aspect-[4/5] w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            aria-label={`View ${project.title}${activeImage.label ? ` — ${activeImage.label}` : ""} larger`}
          >
            <img
              src={activeImage.src}
              alt={`${project.title}${activeImage.label ? ` — ${activeImage.label}` : ""}`}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-[900ms] ease-out group-hover/image:scale-[1.05]"
            />
            <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-sm">
              <Expand className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </DialogTrigger>
        {images.length > 1 ? (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={showPrevious}
              aria-label="Previous project image"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 shadow-sm"
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={showNext}
              aria-label="Next project image"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 shadow-sm"
            >
              <ArrowRight aria-hidden="true" />
            </Button>
            <div className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        ) : null}
      </div>

      <DialogContent className="max-w-5xl border-border bg-background p-3 sm:p-5">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <div className="relative flex min-h-[60vh] items-center justify-center rounded-xl bg-muted p-2 sm:p-6">
          <img
            src={activeImage.src}
            alt={`${project.title}${activeImage.label ? ` — ${activeImage.label}` : ""}`}
            className="max-h-[78vh] w-full object-contain"
          />
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Close image viewer"
              className="absolute right-3 top-3 rounded-full bg-background/90"
            >
              <X aria-hidden="true" />
            </Button>
          </DialogClose>
          {images.length > 1 ? (
            <>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={showPrevious}
                aria-label="Previous project image"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90"
              >
                <ArrowLeft aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={showNext}
                aria-label="Next project image"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90"
              >
                <ArrowRight aria-hidden="true" />
              </Button>
            </>
          ) : null}
        </div>
        {activeImage.label ? (
          <p className="px-1 text-sm text-muted-foreground">{activeImage.label}</p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export function OtherProjects() {
  return (
    <section id="other-projects" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="op-aura" />
      <div className="container-x relative">
        <div className="reveal-on-scroll flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">More work</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.98] sm:text-5xl md:text-6xl lg:text-7xl">
              Other <span className="text-primary">projects</span>
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              More promotional, brand and campaign pieces. Open any card to see it larger.
            </p>
          </div>
          <span className="hidden font-display text-sm text-muted-foreground md:block">
            ({String(OTHER_PROJECTS.length).padStart(2, "0")} projects)
          </span>
        </div>

        <div className="op-grid mt-12 md:mt-16">
          {OTHER_PROJECTS.map((project, i) => (
            <div key={project.title} className="op-item reveal-on-scroll" style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}>
              <TiltCard max={4} className="glass-panel op-card group h-full overflow-hidden rounded-2xl">
                <div className="op-media">
                  <ProjectGallery project={project} />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-display text-xl leading-tight sm:text-2xl">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{project.category}</p>
                  {project.title === "Floral Threads — First Project & Redesign" ? (
                    <p className="mt-3 text-xs text-muted-foreground">Original and redesign shown together.</p>
                  ) : null}
                  {project.link ? (
                    <a
                      href={project.link}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      View Project
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : null}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
