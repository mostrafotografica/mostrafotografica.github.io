"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FOTOGRAFIE, numeroFormattato } from "@/config/mostra";
import { gsap, useGSAP, useModoAnimazioni } from "@/lib/gsap";

/** L'indice della mostra: lista numerata, una riga per fotografia. */
export default function Indice() {
  const modo = useModoAnimazioni();
  const radice = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (modo === "spente") return;

      const ridotte = modo === "ridotte";
      const righe = gsap.utils.toArray<HTMLElement>(".indice-riga");

      righe.forEach((riga) => {
        gsap.fromTo(
          riga,
          { y: ridotte ? 0 : 46, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: ridotte ? 0.5 : 1,
            ease: ridotte ? "power1.out" : "power3.out",
            scrollTrigger: { trigger: riga, start: "top 88%", once: true },
          }
        );

        /* Micro-parallasse dell'anteprima dentro la sua cornice */
        const foto = ridotte ? null : riga.querySelector(".indice-foto");
        if (foto) {
          gsap.fromTo(
            foto,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: riga, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });

      gsap.fromTo(
        ".indice-intestazione",
        { opacity: 0, y: ridotte ? 0 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: ridotte ? 0.5 : 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".indice-intestazione", start: "top 92%", once: true },
        }
      );
    },
    { dependencies: [modo], scope: radice }
  );

  return (
    <section ref={radice} className="relative pb-16 pt-6">
      <div className="contenitore">
        <div className="indice-intestazione gsap-nascosto mb-2 flex items-end justify-between">
          <h2 className="etichetta">Indice delle opere</h2>
          <span className="etichetta">{numeroFormattato(FOTOGRAFIE.length)}</span>
        </div>

        <ul>
          {FOTOGRAFIE.map((f) => (
            <li key={f.id}>
              <Link
                href={`/${f.id}`}
                className="indice-riga gsap-nascosto group flex items-center gap-5 border-t border-linea py-5"
              >
                <span className="etichetta w-6 shrink-0 pt-1 transition-colors group-hover:text-terra">
                  {numeroFormattato(f.id)}
                </span>

                <span className="grana relative block h-[6.5rem] w-[4.9rem] shrink-0 overflow-hidden bg-notte-2">
                  <Image
                    src={f.foto}
                    alt={f.titolo}
                    fill
                    sizes="80px"
                    className="indice-foto scale-[1.16] object-cover"
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="display block text-[1.6rem] leading-tight transition-colors group-hover:text-terra-chiara">
                    {f.titolo}
                  </span>
                  <span className="etichetta mt-2 block truncate normal-case tracking-[0.12em] text-fumo">
                    {f.luogo}
                  </span>
                </span>

                <span className="shrink-0 text-fumo transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-terra">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 13L13 1M13 1H4M13 1v9" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="linea" />
      </div>
    </section>
  );
}
