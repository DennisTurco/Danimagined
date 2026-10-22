"use client";

import { useEffect, useState } from "react";
import { isEmailjsConfigured, sendEmail } from "@/lib/emailjs";
import { mailto } from "@/lib/site";
import type { Package } from "@/lib/types";

const prodotti = ["File digitale", "Su tela"];

const field =
  "w-full bg-transparent border-b border-white/25 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors";

const chip = (selected: boolean) =>
  `text-xs px-4 py-3 border transition-colors ${
    selected
      ? "border-gold bg-gold/10 text-gold"
      : "border-white/20 text-white/60 hover:border-white/50 hover:text-white/80"
  }`;

export default function ContactForm({
  email,
  packages,
  responseTime,
}: {
  email: string;
  packages: Package[];
  responseTime: string;
}) {
  const [nome, setNome] = useState("");
  const [mittente, setMittente] = useState("");
  const [tipo, setTipo] = useState<string | null>(null);
  const [prodotto, setProdotto] = useState<string | null>(null);
  const [messaggio, setMessaggio] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Preseleziona il pacchetto quando si arriva dal listino (/contatti?pacchetto=...).
  useEffect(() => {
    const scelto = new URLSearchParams(window.location.search).get("pacchetto");
    if (scelto && packages.some((p) => p.name === scelto)) setTipo(scelto);
  }, [packages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Richiesta commissione${tipo ? ` - ${tipo}` : ""} - ${nome}`;
    const dettagli = [tipo && `Pacchetto: ${tipo}`, prodotto && `Prodotto: ${prodotto}`]
      .filter(Boolean)
      .join("\n");

    // Ripiego finché EmailJS non è configurato: apre l'app di posta.
    if (!isEmailjsConfigured) {
      const body = [`Ciao, sono ${nome}.`, "", dettagli, `La mia email: ${mittente}`, "", messaggio]
        .join("\n");
      window.location.href = mailto(email, subject, body);
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await sendEmail({
        subject,
        name: nome,
        email: mittente,
        message: [dettagli, messaggio].filter(Boolean).join("\n\n"),
      });
      setStatus("sent");
      setNome("");
      setMittente("");
      setTipo(null);
      setProdotto(null);
      setMessaggio("");
    } catch (error) {
      console.error("[emailjs] invio fallito:", error);
      setStatus("error");
    }
  };

  return (
    <form id="richiesta" onSubmit={handleSubmit} className="scroll-mt-28 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="eyebrow block mb-3" htmlFor="nome">
            Nome e cognome
          </label>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className={field}
          />
        </div>
        <div>
          <label className="eyebrow block mb-3" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={mittente}
            onChange={(e) => setMittente(e.target.value)}
            required
            className={field}
          />
        </div>
      </div>

      {packages.length > 0 && (
        <fieldset>
          <legend className="eyebrow block mb-4">Tipologia</legend>
          <div className="flex flex-wrap gap-3">
            {packages.map((p) => (
              <button
                type="button"
                key={p.name}
                onClick={() => setTipo(tipo === p.name ? null : p.name)}
                aria-pressed={tipo === p.name}
                className={chip(tipo === p.name)}
              >
                {p.name} da {p.price}€
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="eyebrow block mb-4">Prodotto</legend>
        <div className="flex flex-wrap gap-3">
          {prodotti.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setProdotto(prodotto === p ? null : p)}
              aria-pressed={prodotto === p}
              className={chip(prodotto === p)}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="eyebrow block mb-3" htmlFor="messaggio">
          La commissione
        </label>
        <textarea
          id="messaggio"
          rows={5}
          value={messaggio}
          onChange={(e) => setMessaggio(e.target.value)}
          required
          placeholder="Chi è il soggetto, che creatura lo accompagna, che atmosfera vuoi…"
          className={`${field} resize-none`}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-solid disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {status === "sending" ? "Invio in corso…" : "Invia la richiesta"}
        </button>
        <p className="mt-4 text-white/40 text-xs leading-relaxed">
          {isEmailjsConfigured
            ? "Hai delle reference? Mandamele rispondendo alla mia email."
            : "Si apre la tua app di posta con il messaggio già pronto: allega le reference e invia."}
        </p>
        {status === "sent" && (
          <p className="mt-4 text-gold text-sm" role="status">
            {isEmailjsConfigured
              ? `Richiesta inviata: ti rispondo entro ${responseTime}.`
              : `Invia l'email appena aperta: ti rispondo entro ${responseTime}.`}
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-400 text-sm" role="alert">
            Invio non riuscito. Riprova o scrivimi a{" "}
            <a href={`mailto:${email}`} className="link-underline">
              {email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
