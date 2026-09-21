"use client";

import { useState } from "react";

const days = ["Lun 28", "Mar 29", "Mer 30", "Gio 1"];
const slots = ["10:00", "11:30", "15:00", "18:30"];

export default function BookCallPanel() {
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="border border-white/10 p-8 bg-panel">
      <h3 className="font-serif text-2xl font-light mb-1">
        Prenota una call di 30&prime;
      </h3>
      <p className="text-white/40 text-sm mb-8">
        Scegli un giorno e un orario indicativi.
      </p>

      <p className="eyebrow mb-3">Giorno</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={`text-xs px-3 py-2 border transition-colors ${
              day === d
                ? "border-gold bg-gold/10 text-gold"
                : "border-white/20 text-white/60 hover:border-white/50"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <p className="eyebrow mb-3">Orario</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {slots.map((s) => (
          <button
            key={s}
            onClick={() => setSlot(s)}
            className={`text-xs px-3 py-2 border transition-colors ${
              slot === s
                ? "border-gold bg-gold/10 text-gold"
                : "border-white/20 text-white/60 hover:border-white/50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        onClick={() => setConfirmed(true)}
        disabled={!day || !slot}
        className="btn-solid w-full text-center disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {confirmed ? "Call confermata — invito inviato" : "Conferma la call"}
      </button>
    </div>
  );
}
