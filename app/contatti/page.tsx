import type { Metadata } from "next";
import { MOSTRA } from "@/config/mostra";
import Rivela from "@/components/Rivela";
import PiePagina from "@/components/PiePagina";

export const metadata: Metadata = { title: "Contatti" };

export default function Contatti() {
  const c = MOSTRA.contatti;

  return (
    <>
      <Rivela>
        <div className="contenitore pb-16 pt-32">
          <p className="rivela gsap-nascosto etichetta">Contatti</p>

          <h1 className="rivela gsap-nascosto display mt-6 text-[2.9rem]">
            Scrivici,
            <br />
            <em className="not-italic text-terra-chiara">passa a trovarci.</em>
          </h1>

          <div className="mt-14 space-y-10">
            <div className="rivela gsap-nascosto">
              <p className="etichetta mb-2">Email</p>
              <a href={`mailto:${c.email}`} className="font-display text-2xl text-terra-chiara">
                {c.email}
              </a>
            </div>

            <div className="rivela gsap-nascosto">
              <p className="etichetta mb-2">Dove siamo</p>
              <a
                href={c.mappaUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-display text-2xl leading-snug"
              >
                {c.indirizzo}
              </a>
            </div>

            <div className="rivela gsap-nascosto">
              <p className="etichetta mb-2">Sito</p>
              <a
                href={c.sito.url}
                target="_blank"
                rel="noreferrer noopener"
                className="font-display text-2xl"
              >
                {c.sito.etichetta}
              </a>
            </div>

            <div className="rivela gsap-nascosto">
              <p className="etichetta mb-4">Social</p>
              <ul className="border-t border-linea">
                {c.social.map((s) => (
                  <li key={s.etichetta}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-baseline justify-between border-b border-linea py-4"
                    >
                      <span className="display text-xl transition-colors group-hover:text-terra-chiara">
                        {s.etichetta}
                      </span>
                      <span className="etichetta normal-case tracking-[0.1em]">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Rivela>
      <PiePagina />
    </>
  );
}
