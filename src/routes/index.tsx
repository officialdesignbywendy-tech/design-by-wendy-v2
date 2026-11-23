import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Projects } from "@/components/projects/Projects";
import { OtherProjects } from "@/components/OtherProjects";
import { About } from "@/components/home/About";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { WhyAndProcess } from "@/components/home/WhyAndProcess";
import { Testimonials } from "@/components/home/Testimonials";
import { Tools } from "@/components/home/Tools";
import { Contact } from "@/components/home/Contact";
import { Marquee } from "@/components/home/Marquee";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Design by Wendy — Marketing & Promotional Designer" },
      {
        name: "description",
        content:
          "Design by Wendy — a Marketing & Promotional Designer creating social media graphics, campaign visuals, promotional designs, and logos that help businesses get noticed.",
      },
      { property: "og:title", content: "Design by Wendy — Marketing & Promotional Designer" },
      {
        property: "og:description",
        content:
          "Marketing & Promotional Designer creating visuals that help businesses communicate their offers and stand out.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});




function useReveal() {
  useEffect(() => {
    const observed = new WeakSet<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    const observeTargets = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(".reveal-on-scroll") && !observed.has(root)) {
        observed.add(root);
        io.observe(root);
      }
      root.querySelectorAll<HTMLElement>(".reveal-on-scroll").forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        io.observe(element);
      });
    };
    observeTargets(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) observeTargets(node);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      io.disconnect();
    };
  }, []);
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <OtherProjects />

        <WhyAndProcess />
        <Testimonials />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}



function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-x py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-blush text-foreground font-display italic text-sm">
            W
          </span>
          <span>© {new Date().getFullYear()} Wendy Onyia · Design by Wendy. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
