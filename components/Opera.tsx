"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOSTRA, NUMERO_FOTO, numeroFormattato, type Fotografia } from "@/config/mostra";
import { gsap, useGSAP, useModoAnimazioni } from "@/lib/gsap";
import { percorso } from "@/lib/percorsi";
import Lettore from "@/components/Lettore";

type Props = {
  opera: Fotografia;
  precedente?: Fotografia;
  successiva?: Fotografia;
};

/** La pagina della singola fotografia: quella che si apre dal QR code. */
export default function Opera({ opera, precedente, successiva }: Props) {
  const modo = useModoAnimazioni();
  const radice = useRef<HTMLElement>(null);
  const cornice = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (modo === "spente") return;

      if (modo === "ridotte") {
        gsap.fromTo(
          [".opera-numero", ".opera-riga", ".opera-dettaglio", ".opera-blocco"],
          { opacity: 0 },
          { opacity: 1, duration: 0.55, stagger: 0.05, ease: "power1.out" }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(".opera-numero", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(".opera-riga", { yPercent: 115 }, { yPercent: 0, duration: 1.15, stagger: 0.09 }, "-=0.5")
        .fromTo(
          cornice.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 },
          "-=0.85"
        )
        .fromTo(".opera-foto", { scale: 1.22 }, { scale: 1, duration: 1.6 }, "<")
        .fromTo(".opera-dettaglio", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, "-=1");

      /* La foto scorre piu' lenta del testo mentre si sfoglia la pagina */
      gsap.to(".opera-foto", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: cornice.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>(".opera-blocco").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    },
    { scope: radice, dependencies: [opera.id, modo] }
  );

  return (
    <article ref={radice} className="pb-48 pt-24">
      <div className="contenitore">
        <p className="opera-numero gsap-nascosto etichetta mb-6 flex items-center gap-3">
          <span className="text-terra">{numeroFormattato(opera.id)}</span>
          <span className="h-px w-8 bg-linea" />
          <span>{numeroFormattato(NUMERO_FOTO)}</span>
        </p>

        <h1 className="display text-[2.9rem]">
          <span className="maschera">
            <span className="opera-riga block">{opera.titolo}</span>
          </span>
        </h1>

        <p className="opera-dettaglio gsap-nascosto mt-4 font-display text-xl italic text-terra-chiara">
          {opera.luogo}
        </p>

        {/* Chi guarda si perde nella fotografia e il lettore in fondo allo
            schermo passa inosservato: qui, dove l'occhio arriva per primo,
            gli diciamo che c'e' una musica e dove trovarla. */}
        <p className="opera-dettaglio gsap-nascosto mt-6 flex items-start gap-3 border border-terra/35 bg-terra/[0.07] px-4 py-3 text-[0.9rem] leading-snug text-terra-chiara">
          <svg
            width="11"
            height="13"
            viewBox="0 0 11 13"
            fill="currentColor"
            className="mt-[0.28em] shrink-0"
            aria-hidden
          >
            <path d="M0 0l11 6.5L0 13z" />
          </svg>
          {/* Il testo sta tutto in uno span: dentro un contenitore flex ogni
              pezzo sciolto diventerebbe una colonna a se'. */}
          <span>
            Questa foto ha una sua musica: premi{" "}
            <b className="font-semibold">Ascolta</b> in fondo allo schermo.
          </span>
        </p>
      </div>

      {/* la fotografia */}
      <div ref={cornice} className="grana relative mt-10 aspect-[3/4] w-full overflow-hidden bg-notte-2">
        <Image
          src={percorso(opera.foto)}
          alt={`${opera.titolo} — ${opera.luogo}`}
          fill
          priority
          sizes="100vw"
          className="opera-foto object-cover"
        />
      </div>

      <div className="contenitore">
        {opera.didascalia ? (
          <p className="opera-blocco gsap-nascosto mt-10 text-[0.98rem] leading-relaxed text-sabbia/85">
            {opera.didascalia}
          </p>
        ) : null}

        {/* scheda tecnica */}
        <dl className="opera-blocco gsap-nascosto mt-12 border-t border-linea">
          {[
            { voce: "Luogo", valore: opera.luogo },
            { voce: "Musica", valore: opera.titoloCanzone },
            { voce: "Interprete", valore: opera.artista },
          ]
            .filter((r) => Boolean(r.valore))
            .map((r) => (
              <div key={r.voce} className="flex items-baseline gap-6 border-b border-linea py-4">
                <dt className="etichetta w-24 shrink-0">{r.voce}</dt>
                <dd className="flex-1 text-[0.95rem] text-inchiostro/90">{r.valore}</dd>
              </div>
            ))}
        </dl>

        {/* navigazione tra le opere */}
        <nav className="opera-blocco gsap-nascosto mt-14 flex items-stretch gap-3">
          {precedente ? (
            <Link
              href={`/${precedente.id}`}
              className="group flex-1 border border-linea p-4 transition-colors hover:border-terra/50"
            >
              <span className="etichetta block text-fumo transition-colors group-hover:text-terra">
                ← {numeroFormattato(precedente.id)}
              </span>
              <span className="display mt-2 block text-lg leading-tight">{precedente.titolo}</span>
            </Link>
          ) : null}
          {successiva ? (
            <Link
              href={`/${successiva.id}`}
              className="group flex-1 border border-linea p-4 text-right transition-colors hover:border-terra/50"
            >
              <span className="etichetta block text-fumo transition-colors group-hover:text-terra">
                {numeroFormattato(successiva.id)} →
              </span>
              <span className="display mt-2 block text-lg leading-tight">{successiva.titolo}</span>
            </Link>
          ) : null}
        </nav>

        <Link
          href="/"
          className="opera-blocco gsap-nascosto etichetta mt-10 inline-block text-sabbia transition-colors hover:text-terra"
        >
          Torna all&apos;indice
        </Link>

        <p className="opera-blocco gsap-nascosto etichetta mt-14 leading-relaxed text-fumo/70">
          {MOSTRA.note}
        </p>
      </div>

      {/* la key rimonta il lettore a ogni opera: stato e audio ripartono puliti */}
      <Lettore key={opera.id} opera={opera} />
    </article>
  );
}
