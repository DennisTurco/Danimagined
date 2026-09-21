"use client";

import { useState } from "react";

const tipologie = [
  { label: "Ritratto da 50€", value: "ritratto" },
  { label: "Half-body da 70€", value: "half-body" },
  { label: "Creature design da 90€", value: "creature" },
  { label: "Illustrazione da 150€", value: "illustrazione" },
];

const prodotti = [
  { label: "File digitale", value: "digitale" },
  { label: "Stampa su tela", value: "tela" },
];

export default function ContactForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState<string | null>(null);
  const [prodotto, setProdotto] = useState<string | null>(null);
  const [messaggio, setMessaggio] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="eyebrow block mb-3" htmlFor="nome">
            Nome e cognome
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full bg-transparent border-b border-white/25 py-2 text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="eyebrow block mb-3" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border-b border-white/25 py-2 text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div>
        <p className="eyebrow block mb-4">Tipologia</p>
        <div className="flex flex-wrap gap-3">
          {tipologie.map((t) => (
            <button
              type="button"
              key={t.value}
              onClick={() => setTipo(t.value)}
              className={`text-xs px-4 py-3 border transition-colors ${
                tipo === t.value
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-white/20 text-white/60 hover:border-white/50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow block mb-4">Prodotto</p>
        <div className="flex flex-wrap gap-3">
          {prodotti.map((p) => (
            <button
              type="button"
              key={p.value}
              onClick={() => setProdotto(p.value)}
              className={`text-xs px-4 py-3 border transition-colors ${
                prodotto === p.value
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-white/20 text-white/60 hover:border-white/50"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="eyebrow block mb-3" htmlFor="messaggio">
          La commissione
        </label>
        <textarea
          id="messaggio"
          rows={5}
          value={messaggio}
          onChange={(e) => setMessaggio(e.target.value)}
          placeholder="Chi è il soggetto, che creatura lo accompagna, che atmosfera vuoi…"
          className="w-full bg-transparent border-b border-white/25 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      <div className="border border-dashed border-white/25 py-12 text-center hover:border-gold/50 transition-colors cursor-default">
        <p className="text-white/60 mb-2">Trascina qui le tue reference</p>
        <p className="text-white/30 text-xs">JPG o PNG, fino a 10 file</p>
      </div>

      <div>
        <button type="submit" className="btn-solid">
          Invia la richiesta
        </button>
        {sent && (
          <p className="mt-5 text-gold text-sm">
            Richiesta inviata — ti rispondo entro 48 ore.
          </p>
        )}
      </div>
    </form>
  );
}
