import Link from "next/link";
import { MOSTRA } from "@/config/mostra";

export default function PiePagina() {
  return (
    <footer className="border-t border-linea pb-14 pt-12">
      <div className="contenitore">
        <p className="display text-3xl leading-tight">{MOSTRA.titolo}</p>
        <p className="etichetta mt-4 leading-relaxed">
          {MOSTRA.sottotitolo}
          <br />
          {MOSTRA.autrice}
        </p>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/la-mostra" className="etichetta text-sabbia transition-colors hover:text-terra">
            La mostra
          </Link>
          <Link href="/contatti" className="etichetta text-sabbia transition-colors hover:text-terra">
            Contatti
          </Link>
          <a
            href={MOSTRA.contatti.sito.url}
            target="_blank"
            rel="noreferrer noopener"
            className="etichetta text-sabbia transition-colors hover:text-terra"
          >
            {MOSTRA.contatti.sito.etichetta}
          </a>
        </div>

        <p className="etichetta mt-10 leading-relaxed text-fumo/70">
          {MOSTRA.luogo}
          <br />
          {MOSTRA.note}
        </p>
      </div>
    </footer>
  );
}
