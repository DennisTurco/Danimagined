"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chiude il menu mobile a ogni cambio pagina.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: "/opere", label: "Opere", active: pathname.startsWith("/opere") },
    { href: isHome ? "#pacchetti" : "/#pacchetti", label: "Pacchetti", active: false },
    { href: isHome ? "#about" : "/#about", label: "Chi sono", active: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] ${
        open
          ? "bg-bg border-b border-white/10"
          : scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 md:px-10 transition-[padding] duration-500 ${
          scrolled ? "py-3" : "py-4 md:py-5"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Danimagined, home">
          <Image
            src="/images/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="w-9 h-9 md:w-10 md:h-10 object-contain"
          />
          <span className="flex flex-col leading-none gap-1">
            <span className="font-serif text-base md:text-lg tracking-[0.15em] text-white">
              DANIMAGINED
            </span>
            <span className="eyebrow-gold !text-[9px] !tracking-[0.3em]">
              Concept art
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className={`eyebrow link-underline hover:!text-gold transition-colors ${
                l.active ? "!text-gold" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Magnetic strength={0.25}>
            <Link href="/contatti" className="btn-solid">
              Commissiona
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          className="md:hidden relative w-11 h-11 -mr-2 flex items-center justify-center"
        >
          <span
            className={`absolute h-px w-6 bg-white transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[4px]"
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-white transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[4px]"
            }`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] ${
          open ? "max-h-[100svh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pt-6 pb-10 flex flex-col h-[calc(100svh-68px)]">
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-4 py-3 font-serif font-light text-4xl ${
                    l.active ? "text-gold" : "text-white"
                  }`}
                >
                  <span className="font-sans text-xs text-gold/60 tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contatti"
            onClick={() => setOpen(false)}
            className="btn-solid text-center mt-auto"
          >
            Richiedi una commissione
          </Link>
        </div>
      </div>
    </header>
  );
}
