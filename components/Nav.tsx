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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pacchettiHref = isHome ? "#pacchetti" : "/#pacchetti";
  const aboutHref = isHome ? "#about" : "/#about";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,border-color,padding,box-shadow] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 transition-[padding] duration-500 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10">
            <Image
              src="/images/logo.png"
              alt="Danimagined logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg tracking-[0.15em] text-white">
              DANIMAGINED
            </span>
            <span className="eyebrow-gold text-[9px] tracking-[0.3em]">
              CONCEPT ART
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/opere"
            className="eyebrow link-underline hover:text-gold transition-colors"
          >
            Opere
          </Link>
          <Link
            href={pacchettiHref}
            className="eyebrow link-underline hover:text-gold transition-colors"
          >
            Pacchetti
          </Link>
          <Link
            href={aboutHref}
            className="eyebrow link-underline hover:text-gold transition-colors"
          >
            Chi sono
          </Link>
          <Magnetic strength={0.25}>
            <Link href="/contatti" className="btn-solid">
              Commissiona
            </Link>
          </Magnetic>
        </div>

        <Link href="/contatti" className="md:hidden btn-solid !py-2 !px-4 text-[10px]">
          Commissiona
        </Link>
      </nav>
    </header>
  );
}
