"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Category, Work } from "@/lib/types";

export default function WorksGallery({ works, categories }: { works: Work[]; categories: Category[] }) {
  const [active, setActive] = useState<string>("all");

  const filters = [{ label: "Tutte", value: "all" }].concat(
    categories.map((c) => ({ label: c.filterLabel, value: c.slug }))
  );
  const filtered = active === "all" ? works : works.filter((w) => w.category.slug === active);

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              aria-pressed={active === f.value}
              className={
                active === f.value
                  ? "btn-solid !py-2 !px-5 text-[11px]"
                  : "btn-outline !py-2 !px-5 text-[11px]"
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="[column-fill:_balance] gap-6" style={{ columnWidth: "320px" }}>
        {filtered.map((work, i) => (
          <Link
            key={work.slug}
            href={`/opere/${work.slug}`}
            style={{ animationDelay: `${i * 60}ms` }}
            className="group relative block mb-6 break-inside-avoid overflow-hidden bg-panel animate-[fadeIn_0.6s_ease_forwards] opacity-0 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] hover:-translate-y-1 hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-colors duration-500 z-10 pointer-events-none" />
            <Image
              src={work.image.src}
              alt={work.image.alt ?? work.title}
              width={work.image.width}
              height={work.image.height}
              sizes="(max-width: 768px) 100vw, 400px"
              placeholder={work.image.lqip ? "blur" : "empty"}
              blurDataURL={work.image.lqip}
              className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(.16,.84,.28,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 transition-all duration-500">
              <p className="eyebrow-gold mb-1">{work.category.title}</p>
              <h3 className="font-serif text-xl text-white font-light">{work.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
