import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { About as AboutContent } from "@/lib/types";

export default function About({ about }: { about: AboutContent }) {
  const [first = "", ...rest] = about.paragraphs;
  const dropCap = first.charAt(0);
  return (
    <section
      id="about"
      className="relative bg-cream text-aboutdark py-24 md:py-40 px-5 md:px-10 scroll-mt-24 overflow-hidden"
    >
      {about.eyebrow && <span className="section-label !text-taupe">{about.eyebrow}</span>}

      <Image
        src="/images/logo.png"
        alt=""
        aria-hidden="true"
        width={640}
        height={640}
        className="pointer-events-none select-none absolute -right-24 top-10 w-[min(46%,560px)] h-auto opacity-[0.06]"
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative">
          <div className="absolute -inset-4 md:-inset-5 border border-gold/50 translate-x-3 translate-y-3" />
          <Reveal variant="wipe">
            <div
              className="relative w-full aspect-[4/5] overflow-hidden shadow-[0_40px_80px_-30px_rgba(36,34,32,0.55)]"
              style={{
                clipPath:
                  "polygon(2% 4%, 96% 0%, 100% 92%, 94% 100%, 4% 98%, 0% 8%)",
              }}
            >
              <Image
                src={about.image.src}
                alt={about.image.alt ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder={about.image.lqip ? "blur" : "empty"}
                blurDataURL={about.image.lqip}
                className="object-cover animate-kenburns"
                style={{ objectPosition: about.image.position ?? "center" }}
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          {about.eyebrow && <p className="eyebrow mb-8 !text-taupe">{about.eyebrow}</p>}
          <h2 className="font-serif font-light text-[2.75rem] sm:text-5xl md:text-7xl text-bg mb-10 leading-[1.02]">
            {about.title}
            {about.titleAccent && (
              <>
                {" "}
                <span className="italic" style={{ color: "#8a6a31" }}>
                  {about.titleAccent}
                </span>
              </>
            )}
          </h2>

          <div className="space-y-5 text-lg leading-relaxed">
            {first && (
              <p>
                <span
                  aria-hidden="true"
                  className="float-left font-serif text-8xl leading-[0.75] pr-3 pt-2"
                  style={{ color: "#8a6a31" }}
                >
                  {dropCap}
                </span>
                <span className="sr-only">{dropCap}</span>
                {first.slice(1)}
              </p>
            )}
            {rest.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {about.quote && (
            <blockquote className="relative my-12 pl-8 border-l-2 border-gold font-serif italic text-3xl md:text-4xl leading-snug text-bg">
              <span
                aria-hidden="true"
                className="absolute -top-8 -left-2 font-serif text-8xl leading-none text-gold/30 not-italic"
              >
                “
              </span>
              {about.quote}
            </blockquote>
          )}

          <Link
            href="/contatti"
            className="eyebrow-gold !text-[#8a6a31] link-underline hover:opacity-70 transition-opacity"
          >
            {about.linkLabel ?? "Lavoriamo insieme"} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
