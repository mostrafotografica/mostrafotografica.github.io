"use client";

import { useRef } from "react";
import Image from "next/image";
import { FOTOGRAFIE, MOSTRA, NUMERO_FOTO } from "@/config/mostra";
import { gsap, useGSAP, useModoAnimazioni } from "@/lib/gsap";

/** Apertura della home: titolo che sale riga per riga sopra una foto che respira. */
export default function Copertina() {
  const modo = useModoAnimazioni();
  const radice = useRef<HTMLElement>(null);
  const sfondo = useRef<HTMLDivElement>(null);
  /* Il titolo viene spezzato parola per parola: cosi' l'animazione
     funziona con qualunque titolo, anche quando lo cambierai. */
  const parole = MOSTRA.titolo.split(" ").filter(Boolean);
  const daColorare = Math.min(2, Math.max(0, parole.length - 1));

  useGSAP(
    () => {
      if (modo === "spente") return;

      /* Movimento ridotto: solo una dissolvenza, niente scorrimenti */
      if (modo === "ridotte") {
        gsap.fromTo(
          [".copertina-foto", ".copertina-riga", ".copertina-meta"],
          { opacity: 0 },
          { opacity: 1, duration: 0.6, stagger: 0.07, ease: "power1.out" }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".copertina-foto",
        { scale: 1.18, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8 }
      )
        .fromTo(
          ".copertina-riga",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.25, stagger: 0.11 },
          "-=1.35"
        )
        .fromTo(
          ".copertina-meta",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          "-=0.8"
        );

      /* La foto di apertura scorre piu' lenta della pagina */
      gsap.to(sfondo.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: radice.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".copertina-testo", {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: radice.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    },
    { dependencies: [modo], scope: radice }
  );

  return (
    <section
      ref={radice}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14"
    >
      {/* immagine di apertura */}
      <div ref={sfondo} className="grana absolute inset-0 -top-[10%] h-[120%]">
        <Image
          src={FOTOGRAFIE[0]?.foto ?? ""}
          alt=""
          fill
          priority
          sizes="100vw"
          className="copertina-foto object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-notte via-notte/75 to-notte/25" />
      </div>

      <div className="copertina-testo contenitore relative">
        <p className="copertina-meta etichetta mb-6">{MOSTRA.sottotitolo}</p>

        <h1 className="display flex flex-wrap gap-x-[0.22em] text-[3.4rem] sm:text-[4.2rem]">
          {parole.map((parola, i) => (
            <span
              key={`${parola}-${i}`}
              className="maschera -mb-[0.14em] inline-block pb-[0.14em]"
            >
              <span
                className={`copertina-riga block ${i >= daColorare ? "text-terra-chiara" : ""}`}
              >
                {parola}
              </span>
            </span>
          ))}
        </h1>

        <p className="copertina-meta mt-5 font-display text-2xl italic text-sabbia">
          {MOSTRA.autrice}
        </p>

        <p className="copertina-meta mt-8 max-w-[30rem] text-[0.95rem] leading-relaxed text-sabbia/80">
          {MOSTRA.introduzione}
        </p>

        <div className="copertina-meta mt-10 flex items-center gap-4">
          <span className="etichetta text-terra">{NUMERO_FOTO} fotografie</span>
          <span className="h-px flex-1 bg-linea" />
          <span className="etichetta">Scorri</span>
        </div>
      </div>
    </section>
  );
}
