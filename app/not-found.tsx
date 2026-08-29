import Link from "next/link";
import { NUMERO_FOTO } from "@/config/mostra";

export default function NonTrovata() {
  return (
    <div className="contenitore flex min-h-[100svh] flex-col justify-center py-32">
      <p className="etichetta text-terra">404</p>
      <h1 className="display mt-6 text-[2.6rem]">
        Questo frammento
        <br />
        <em className="not-italic text-terra-chiara">non esiste.</em>
      </h1>
      <p className="mt-6 text-[0.95rem] leading-relaxed text-sabbia/80">
        La mostra raccoglie {NUMERO_FOTO} fotografie, numerate da 1 a {NUMERO_FOTO}.
        Controlla il numero sotto l&apos;opera oppure torna all&apos;indice.
      </p>
      <Link href="/" className="etichetta mt-10 text-sabbia transition-colors hover:text-terra">
        Torna all&apos;indice →
      </Link>
    </div>
  );
}
