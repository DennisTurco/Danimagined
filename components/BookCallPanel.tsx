"use client";

import { useEffect, useRef, useState } from "react";
import { mailto } from "@/lib/site";

const slots = ["10:00", "11:30", "15:00", "18:30"];

// Prossimi 4 giorni feriali a partire da domani.
function nextWeekdays(count: number) {
  const fmt = new Intl.DateTimeFormat("it-IT", { weekday: "short", day: "numeric" });
  const days: string[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      const label = fmt.format(d).replace(".", "");
      days.push(label.charAt(0).toUpperCase() + label.slice(1));
    }
  }
  return days;
}

// "gv=true" è il parametro che Google usa per la versione incorporabile della pagina.
function embedUrl(url: string) {
  return url.includes("gv=true") ? url : `${url}${url.includes("?") ? "&" : "?"}gv=true`;
}

export default function BookCallPanel({
  bookingUrl,
  email,
  responseTime,
}: {
  bookingUrl?: string;
  email: string;
  responseTime: string;
}) {
  return (
    <div id="prenota" className="scroll-mt-28 border border-white/10 p-7 md:p-8 bg-panel">
      <h3 className="font-serif text-2xl font-light text-white mb-1">
        Prenota una call
      </h3>
      {bookingUrl ? (
        <CalendarBooking url={bookingUrl} />
      ) : (
        <EmailBooking email={email} responseTime={responseTime} />
      )}
    </div>
  );
}

function CalendarBooking({ url }: { url: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  // Apre direttamente il calendario quando si arriva da un link /contatti#prenota.
  useEffect(() => {
    if (window.location.hash !== "#prenota") return;
    setOpen(true);
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.body.style.overflow = "";
      if (window.location.hash === "#prenota") {
        history.replaceState(null, "", window.location.pathname);
      }
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
  }, [open]);

  return (
    <>
      <p className="text-white/40 text-sm mb-7">
        Scegli tu giorno e orario tra quelli disponibili: la conferma arriva in
        automatico.
      </p>

      <ul className="space-y-3 text-sm text-white/60 mb-8">
        {[
          "Videochiamata su Google Meet",
          "Invito e promemoria nel tuo calendario",
          "Gratuita e senza impegno",
        ].map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-gold text-xs mt-0.5" aria-hidden="true">✦</span>
            {item}
          </li>
        ))}
      </ul>

      <button type="button" onClick={show} className="btn-solid w-full text-center">
        Scegli data e ora
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Prenota una call"
        onClick={(e) => e.target === dialogRef.current && close()}
        className="w-[min(960px,calc(100vw-2rem))] h-[min(860px,calc(100svh-2rem))] max-w-none max-h-none p-0 bg-transparent text-white backdrop:bg-black/75 backdrop:backdrop-blur-sm open:animate-[dialogIn_0.4s_cubic-bezier(.16,.84,.28,1)]"
      >
        <div className="flex flex-col h-full border border-gold/30 bg-panel shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-4 border-b border-white/10">
            <div>
              <p className="eyebrow-gold !text-[10px] mb-1">Call di 30&prime;</p>
              <p className="font-serif text-xl md:text-2xl font-light text-white">
                Scegli data e ora
              </p>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline eyebrow link-underline hover:!text-gold transition-colors"
              >
                Apri in una nuova scheda ↗
              </a>
              <button
                type="button"
                onClick={close}
                aria-label="Chiudi"
                className="relative w-10 h-10 flex items-center justify-center border border-white/20 hover:border-gold hover:text-gold transition-colors"
              >
                <span className="absolute h-px w-4 bg-current rotate-45" />
                <span className="absolute h-px w-4 bg-current -rotate-45" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 bg-white">
            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-panel">
                <span className="w-8 h-8 rounded-full border border-gold/30 border-t-gold animate-spin" />
                <p className="eyebrow">Carico il calendario…</p>
              </div>
            )}
            {open && (
              <iframe
                src={embedUrl(url)}
                title="Calendario delle prenotazioni di Danimagined"
                onLoad={() => setLoaded(true)}
                className="w-full h-full border-0"
              />
            )}
          </div>
        </div>
      </dialog>

      <style>{`
        @keyframes dialogIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
}

// Ripiego finché non è configurato il link di Google Calendar.
function EmailBooking({ email, responseTime }: { email: string; responseTime: string }) {
  const [days, setDays] = useState<string[]>([]);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);

  // Calcolate sul client per evitare differenze di data tra server e browser.
  useEffect(() => setDays(nextWeekdays(4)), []);

  const chip = (selected: boolean) =>
    `text-xs px-3 py-2 border transition-colors ${
      selected
        ? "border-gold bg-gold/10 text-gold"
        : "border-white/20 text-white/60 hover:border-white/50 hover:text-white/80"
    }`;

  const request = () => {
    if (!day || !slot) return;
    window.location.href = mailto(
      email,
      `Richiesta call - ${day} alle ${slot}`,
      `Ciao, vorrei prenotare una call di 30 minuti ${day} alle ${slot} per parlare di una commissione.\n\n`
    );
    setRequested(true);
  };

  return (
    <>
      <p className="text-white/40 text-sm mb-8">
        Scegli un giorno e un orario indicativi, ti confermo via email.
      </p>

      <p className="eyebrow mb-3">Giorno</p>
      <div className="flex flex-wrap gap-2 mb-6 min-h-[34px]">
        {days.map((d) => (
          <button
            type="button"
            key={d}
            onClick={() => setDay(d)}
            aria-pressed={day === d}
            className={chip(day === d)}
          >
            {d}
          </button>
        ))}
      </div>

      <p className="eyebrow mb-3">Orario</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {slots.map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => setSlot(s)}
            aria-pressed={slot === s}
            className={chip(slot === s)}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={request}
        disabled={!day || !slot}
        className="btn-solid w-full text-center disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
      >
        Richiedi la call
      </button>
      {requested && (
        <p className="mt-4 text-gold text-xs leading-relaxed" role="status">
          Invia l&apos;email appena aperta: ti confermo l&apos;orario entro {responseTime}.
        </p>
      )}
    </>
  );
}
