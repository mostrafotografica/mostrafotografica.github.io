import type { Metadata } from "next";
import Link from "next/link";
import { MOSTRA, NUMERO_FOTO } from "@/config/mostra";
import Rivela from "@/components/Rivela";
import PiePagina from "@/components/PiePagina";

export const metadata: Metadata = { title: "La mostra" };

export default function LaMostra() {
  return (
    <>
      <Rivela>
        <div className="contenitore pb-16 pt-32">
          <p className="rivela gsap-nascosto etichetta">La mostra</p>

          <h1 className="rivela gsap-nascosto display mt-6 text-[2.9rem]">
            {MOSTRA.titolo}
          </h1>

          <p className="rivela gsap-nascosto mt-4 font-display text-xl italic text-terra-chiara">
            {MOSTRA.sottotitolo} di {MOSTRA.autrice}
          </p>

          <div className="mt-12 space-y-6">
            {MOSTRA.testoMostra.map((p) => (
              <p key={p} className="rivela gsap-nascosto text-[1rem] leading-relaxed text-sabbia/85">
                {p}
              </p>
            ))}
          </div>

          <dl className="rivela gsap-nascosto mt-14 border-t border-linea">
            {MOSTRA.informazioni.map((r) => (
              <div key={r.voce} className="flex items-baseline gap-6 border-b border-linea py-4">
                <dt className="etichetta w-28 shrink-0">{r.voce}</dt>
                <dd className="flex-1 text-[0.95rem] text-inchiostro/90">{r.valore}</dd>
              </div>
            ))}
            <div className="flex items-baseline gap-6 border-b border-linea py-4">
              <dt className="etichetta w-28 shrink-0">Opere</dt>
              <dd className="flex-1 text-[0.95rem] text-inchiostro/90">
                {NUMERO_FOTO} fotografie
              </dd>
            </div>
          </dl>

          <Link
            href="/"
            className="rivela gsap-nascosto etichetta mt-12 inline-block text-sabbia transition-colors hover:text-terra"
          >
            Vai all&apos;indice delle opere →
          </Link>
        </div>
      </Rivela>
      <PiePagina />
    </>
  );
}
