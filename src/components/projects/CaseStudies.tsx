import flyerFull from "@/assets/rhythm/flyer-full.jpg.asset.json";
import mockupBillboard from "@/assets/rhythm/mockup-billboard.png.asset.json";
import mockupPoster from "@/assets/rhythm/mockup-poster.png.asset.json";
import mockupStreet from "@/assets/rhythm/mockup-street.png.asset.json";
import mockupInstagram from "@/assets/rhythm/mockup-instagram.png.asset.json";
import divaluxeFlyer from "@/assets/case-studies/divaluxe-flyer.jpg.asset.json";
import divaluxeMockupHands from "@/assets/case-studies/divaluxe-mockup-hands.png.asset.json";
import divaluxeMockupFrame from "@/assets/case-studies/divaluxe-mockup-frame.png.asset.json";
import divaluxeMockupStudio from "@/assets/case-studies/divaluxe-mockup-studio.png.asset.json";
import glowUpEventFlyer from "@/assets/case-studies/glow-up-event-flyer.jpg.asset.json";
import glowUpMockup1 from "@/assets/case-studies/glow-up-mockup-1.png.asset.json";
import glowUpMockup2 from "@/assets/case-studies/glow-up-mockup-2.png.asset.json";
import glowUpMockup3 from "@/assets/case-studies/glow-up-mockup-3.png.asset.json";
import glowUpMockup4 from "@/assets/case-studies/glow-up-mockup-4.png.asset.json";

export const COVERS = { rhythm: flyerFull.url, divaluxe: divaluxeFlyer.url, glowUp: glowUpEventFlyer.url };

function CaseStudyImage({
  number,
  src,
  alt,
}: {
  number: string;
  src: string;
  alt: string;
}) {
  return (
    <div className="relative group">
      <div
        className="absolute -inset-3 rounded-[2rem] opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-2xl"
        style={{ background: "var(--gradient-blush)" }}
      />
      <div className="relative overflow-hidden rounded-[1.75rem] bg-secondary" style={{ boxShadow: "var(--shadow-elegant)" }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
        />
      </div>
      <span
        className="absolute -top-4 -left-4 font-display text-7xl md:text-8xl leading-none italic opacity-90"
        style={{ color: "var(--gold-deep)" }}
      >
        {number}
      </span>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-[15px]" style={{ color: "var(--espresso)" }}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1 w-3 shrink-0 bg-primary/60" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function MockupGallery({
  title = "Mockups",
  images,
  altPrefix,
}: {
  title?: string;
  images: { url: string }[];
  altPrefix: string;
}) {
  return (
    <div className="pd-mockups">
      <div className="flex items-end justify-between gap-6">
        <h4 className="font-display text-4xl md:text-5xl tracking-tight">
          {title.slice(0, 4)}
          <span className="italic font-light hl-lime">
            {title.slice(4)}
          </span>
        </h4>
        <span className="hidden md:inline-block font-display italic text-sm text-muted-foreground">
          In context
        </span>
      </div>
      <div aria-hidden className="mt-6 editorial-rule" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((img, i) => (
          <div key={img.url} className="pd-mockup overflow-hidden rounded-2xl bg-secondary" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <img
              src={img.url}
              alt={`${altPrefix} mockup ${i + 1}`}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RhythmCaseStudy() {
  
  const mockupImages = [mockupBillboard, mockupPoster, mockupStreet, mockupInstagram];

  return (
    <article className="project-detail-body">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-7">
          <CaseStudyImage
            number="01"
            src={flyerFull.url}
            alt="Naija Dance Challenge 2.0 flyer design"
          />
        </div>
        <div className="lg:col-span-5">
          <p className="eyebrow">Featured Project</p>
          <h3 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
            Naija Dance Challenge 2.0 <span className="italic font-light hl-lime">— Rhythm Vibes Studio</span>
          </h3>
          <div aria-hidden className="mt-6 editorial-rule" />
          <div className="mt-6 space-y-5">
            <div>
              <p className="eyebrow !text-foreground/60">Project Type</p>
              <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
                Event Promotion Flyer (Self-Initiated Design Concept)
              </p>
            </div>
            <div>
              <p className="eyebrow !text-foreground/60">Overview</p>
              <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
                This is a design I created for a fictional dance competition aimed at grabbing the attention of young audiences through bold typography, vibrant colours, and energetic visuals. The design was created to communicate key event information while reflecting the excitement and thrill of the dance challenge.
              </p>
            </div>
            <div>
              <p className="eyebrow !text-foreground/60">Objective</p>
              <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
                To create a visually engaging flyer that:
              </p>
              <BulletList
                items={[
                  "Grabs attention immediately.",
                  "Highlights the ₦100,000 grand prize (what actually attracts people).",
                  "Encourages registrations.",
                  "Appeals to dance lovers and young adults specifically.",
                ]}
              />
            </div>
            <div>
              <p className="eyebrow !text-foreground/60">Target Audience</p>
              <BulletList
                items={[
                  "Young adults (18+)",
                  "Dancers",
                  "Music lovers",
                  "Event enthusiasts",
                  "Youth interested in dance competitions",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <p className="eyebrow !text-foreground/60">The Challenge</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
            The main challenge was presenting a large amount of event information without making the flyer feel cluttered. Another challenge was creating a design that looked energetic and modern while keeping important details easy to find.
          </p>
        </div>
        <div>
          <p className="eyebrow !text-foreground/60">Design Strategy</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
            To solve these challenges, I:
          </p>
          <BulletList
            items={[
              "Used bold typography to establish a clear visual hierarchy.",
              "Highlighted the registration button with yellow to create a strong call-to-action.",
              "Chose a blue, white, and yellow colour palette to create contrast and energy.",
              "Positioned the dancers at the bottom to highlight the event theme while supporting the composition of the flier.",
              "Balanced the layout so the prize, date, and registration details remained easy to scan.",
            ]}
          />
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <div className="flex items-end justify-between gap-6">
          <h4 className="font-display text-4xl md:text-5xl tracking-tight">
            Design <span className="italic font-light hl-lime">Decisions</span>
          </h4>
        </div>
        <div aria-hidden className="mt-6 editorial-rule" />
        <div className="mt-10 grid lg:grid-cols-3 gap-10">
          <div>
            <p className="eyebrow !text-foreground/60">Typography</p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
              Large condensed fonts were used for the main headline to maximise impact and readability.
            </p>
          </div>
          <div>
            <p className="eyebrow !text-foreground/60">Colour</p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
              Yellow was introduced to emphasise important actions and key information, while blue established a vibrant and youthful identity.
            </p>
          </div>
          <div>
            <p className="eyebrow !text-foreground/60">Layout</p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
              All information was grouped into sections, allowing viewers to quickly locate the prize, event details, and registration instructions.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20 max-w-4xl">
        <p className="eyebrow !text-foreground/60">Logo</p>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
          The Rhythm Vibes logo was designed to show the energy, creativity, and emotional impact of music and live performance. At the centre is a microphone symbolising voice, expression, and performance surrounded by a semicircular form inspired by sound waves. The “RV” initials form a unified visual identity showing harmony between sound, branding, and performance.
        </p>
      </div>


      <div className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <p className="eyebrow !text-foreground/60">Tools Used</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Pixellab", "Adobe Lightroom"].map((t) => (
              <span key={t} className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow !text-foreground/60">Outcome</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
            The final design delivers an energetic promotional flier that communicates essential event information while maintaining a modern and visually engaging appearance suitable for social media promotion.
          </p>
        </div>
      </div>

      <MockupGallery images={mockupImages} altPrefix="Naija Dance Challenge" />

      <div className="mt-16 md:mt-20 max-w-4xl">
        <p className="eyebrow !text-foreground/60">Reflection</p>
        <p className="mt-3 text-[15px] md:text-base leading-relaxed" style={{ color: "var(--espresso)" }}>
          This project strengthened my understanding of visual hierarchy, typography, and layout balance. If I were to revisit it, I would refine the spacing further and explore additional ways to improve readability while maintaining the same energetic aesthetic.
        </p>
      </div>
    </article>
  );
}

export function DivaluxeCaseStudy() {
  const mockupImages = [divaluxeMockupHands, divaluxeMockupFrame, divaluxeMockupStudio];

  return (
    <article className="project-detail-body">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-7 lg:order-2">
          <CaseStudyImage
            number="02"
            src={divaluxeFlyer.url}
            alt="Divaluxe makeup studio flyer design"
          />
        </div>
        <div className="lg:col-span-5 lg:order-1">
          <p className="eyebrow">Case Study</p>
          <h3 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
            Divaluxe <span className="italic font-light hl-lime">— Makeup Studio Flyer</span>
          </h3>
          <div aria-hidden className="mt-6 editorial-rule" />
          <div className="mt-6 space-y-5">
            <div>
              <p className="eyebrow !text-foreground/60">Project Type</p>
              <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
                Promotional Flyer Design (Self-Initiated Design Concept)
              </p>
            </div>
            <div>
              <p className="eyebrow !text-foreground/60">Overview</p>
              <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
                I designed this promotional flyer for a hypothetical beauty brand to showcase its makeup services, beauty products, and training classes. The goal was to achieve a feminine, elegant, and inviting design that reflects the brand&apos;s identity while communicating its offerings clearly.
              </p>
            </div>
            <div>
              <p className="eyebrow !text-foreground/60">Objective</p>
              <BulletList
                items={[
                  "Promote the makeup studio's services.",
                  "Increase awareness of beauty products and classes.",
                  "Create a premium and luxury brand image.",
                  "Encourage potential customers to make enquiries.",
                ]}
              />
            </div>
            <div>
              <p className="eyebrow !text-foreground/60">Target Audience</p>
              <BulletList
                items={[
                  "Women and girls interested in beauty and makeup.",
                  "Aspiring makeup artists.",
                  "Brides and event attendees.",
                  "People looking for beauty products or makeup training.",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <p className="eyebrow !text-foreground/60">The Challenge</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
            The challenge was to present multiple services within one flyer while consistently maintaining a clean layout and the brand&apos;s elegant, feminine identity.
          </p>
        </div>
        <div>
          <p className="eyebrow !text-foreground/60">Design Strategy</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
            To achieve this, I:
          </p>
          <BulletList
            items={[
              "Used a soft pink and gold colour palette to communicate elegance and luxury.",
              "Placed the makeup bag and cosmetics at the centre to establish the theme.",
              "Organised the services into three clear sections using icons for quick recognition.",
              "Added subtle beauty-themed illustrations in the background to create depth without distracting from the content.",
              "Used decorative typography for the tagline while keeping the remaining text readable.",
            ]}
          />
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <div className="flex items-end justify-between gap-6">
          <h4 className="font-display text-4xl md:text-5xl tracking-tight">
            Design <span className="italic font-light hl-lime">Decisions</span>
          </h4>
        </div>
        <div aria-hidden className="mt-6 editorial-rule" />
        <div className="mt-10 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <p className="eyebrow !text-foreground/60">Colour</p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
              Soft pink and gold were chosen to show femininity, sophistication, and luxury.
            </p>
          </div>
          <div>
            <p className="eyebrow !text-foreground/60">Typography</p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
              An elegant serif typography was paired with a handwritten script to balance professionalism with personality.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <p className="eyebrow !text-foreground/60">Logo</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
            For the divaluxe logo, the illustrated female figure represents the brand&apos;s focus on makeup artistry and self-expression, while the crown symbolizes luxury, excellence, and making every client feel like royalty. The circular frame creates a more balanced look, and the gold colour emphasizes the brand&apos;s premium and sophisticated identity.
          </p>
        </div>
        <div>
          <p className="eyebrow !text-foreground/60">Tools Used</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">Pixellab</span>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20 max-w-4xl">
        <p className="eyebrow !text-foreground/60">Outcome</p>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
          The final design presents Divaluxe as a modern and elegant beauty brand while making its services easy to understand at a glance. The flyer balances aesthetics with clear communication to engage potential clients.
        </p>
      </div>

      <MockupGallery images={mockupImages} altPrefix="Divaluxe flyer" />

      <div className="mt-16 md:mt-20 max-w-4xl">
        <p className="eyebrow !text-foreground/60">Reflection</p>
        <p className="mt-3 text-[15px] md:text-base leading-relaxed" style={{ color: "var(--espresso)" }}>
          This project allowed me to explore luxury-inspired branding through colour, typography, and composition. If I revisited the design, I would improve text readability on smaller screens.
        </p>
      </div>
    </article>
  );
}

export function GlowUpCaseStudy() {
  return (
    <article className="project-detail-body">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-7 lg:order-2">
          <CaseStudyImage
            number="03"
            src={glowUpEventFlyer.url}
            alt="Glow Up Beauty Pop Up event flyer design"
          />
        </div>
        <div className="lg:col-span-5 lg:order-1">
          <p className="eyebrow">Case Study</p>
          <h3 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
            Glow Up <span className="italic font-light hl-lime">— Beauty Pop Up Event</span>
          </h3>
          <div aria-hidden className="mt-6 editorial-rule" />
          <div className="mt-6 space-y-5">
            <div>
              <p className="eyebrow !text-foreground/60">Project Type</p>
              <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
                Event Promotional Flyer (Self-Initiated Design Concept)
              </p>
            </div>
            <div>
              <p className="eyebrow !text-foreground/60">Overview</p>
              <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
                This flyer was designed to promote a beauty pop-up event where visitors could discover cosmetic products, interact with the brand, and participate in a limited-time shopping experience. The visual concept was built around luxury, glamour, and excitement to encourage attendance.
              </p>
            </div>
            <div>
              <p className="eyebrow !text-foreground/60">Objective</p>
              <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
                The project focused on:
              </p>
              <BulletList
                items={[
                  "Creating anticipation for the event.",
                  "Highlighting the beauty products as the centrepiece.",
                  "Establishing a luxurious and modern brand atmosphere.",
                  "Encouraging visitors to attend through bold promotional messaging.",
                ]}
              />
            </div>
            <div>
              <p className="eyebrow !text-foreground/60">Intended Audience</p>
              <BulletList
                items={[
                  "Makeup enthusiasts",
                  "Beauty shoppers",
                  "Young adults interested in cosmetics",
                  "Individuals looking for new beauty products and experiences",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <p className="eyebrow !text-foreground/60">Challenge</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
            The goal was to create an event flyer that felt luxurious and exciting while presenting essential event details in a way that remained visually balanced. The design needed to attract attention quickly and encourage attendance.
          </p>
        </div>
        <div>
          <p className="eyebrow !text-foreground/60">Design Strategy</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
            To achieve this, I centred the composition around the featured beauty products and used lighting effects, elegant colours, and flowing decorative elements to create a premium atmosphere. The supporting information was carefully positioned to complement the visuals without distracting from the main message.
          </p>
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <div className="flex items-end justify-between gap-6">
          <h4 className="font-display text-4xl md:text-5xl tracking-tight">
            Design <span className="italic font-light hl-lime">Decisions</span>
          </h4>
        </div>
        <div aria-hidden className="mt-6 editorial-rule" />
        <div className="mt-10 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <p className="eyebrow !text-foreground/60">Colour Palette</p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
              A combination of black and gold was used to communicate elegance, exclusivity, and sophistication.
            </p>
          </div>
          <div>
            <p className="eyebrow !text-foreground/60">Typography</p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
              Bold headline typography creates immediate impact, while simpler supporting fonts maintain readability.
            </p>
          </div>
          <div>
            <p className="eyebrow !text-foreground/60">Layout</p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
              The products serve as the visual focal point, with event details arranged around them to maintain balance and hierarchy.
            </p>
          </div>
          <div>
            <p className="eyebrow !text-foreground/60">Visual Elements</p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
              Gold swirls and glowing effects were incorporated to enhance the luxurious feel and reinforce the beauty theme.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <p className="eyebrow !text-foreground/60">Tools Used</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">Pixellab</span>
          </div>
        </div>
        <div>
          <p className="eyebrow !text-foreground/60">Outcome</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--espresso)" }}>
            The final promotional piece captures the excitement of a beauty pop-up while maintaining a clean visual hierarchy. Its bold presentation is suitable for social media campaigns, digital advertising, and event marketing.
          </p>
        </div>
      </div>

      <MockupGallery
        images={[glowUpMockup1, glowUpMockup2, glowUpMockup3, glowUpMockup4]}
        altPrefix="Glow Up Beauty Pop Up"
      />

      <div className="mt-16 md:mt-20 max-w-4xl">
        <p className="eyebrow !text-foreground/60">Reflection</p>
        <p className="mt-3 text-[15px] md:text-base leading-relaxed" style={{ color: "var(--espresso)" }}>
          This project gave me the opportunity to experiment with contrast, lighting, and composition to create a visually striking promotional design. It reinforced the importance of using visual storytelling to communicate the atmosphere of an event rather than relying solely on written information.
        </p>
      </div>
    </article>
  );
}
