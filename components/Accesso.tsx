"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { ACCESSO, MOSTRA } from "@/config/mostra";
import { passwordGiusta, ricorda } from "@/lib/accesso";

/* ===========================================================================
 *  IL CANCELLO
 *  -------------------------------------------------------------------------
 *  Chi non ha la password vede solo questo riquadro; chi ce l'ha non lo vede
 *  mai. La decisione e' gia' stata presa dallo script nel <head> (vedi
 *  lib/accesso.ts) PRIMA che la pagina venisse disegnata, e vive
 *  nell'attributo <html data-accesso>.
 *
 *  Perche' esiste lo stato "verifica": il sito e' un export statico, l'HTML
 *  viene scritto in fase di build e non puo' sapere chi lo aprira'. Quindi
 *  contiene tutt'e due le cose - riquadro e sito - e a scegliere e' il CSS,
 *  che agisce prima del disegno: niente lampeggiamenti, e React si idrata su
 *  un HTML identico a quello prodotto. Subito dopo l'idratazione si legge
 *  l'attributo e si smonta il pezzo di troppo.
 *
 *  Perche' SMONTARE e non semplicemente nascondere: quando la password viene
 *  azzeccata il sito nasce in quel momento, e le animazioni di apertura
 *  partono da capo come se fosse la prima visita.
 * ======================================================================== */

type Stato = "verifica" | "aperto" | "chiuso";

const ascoltatori = new Set<() => void>();

function iscrivi(notifica: () => void) {
  ascoltatori.add(notifica);
  return () => {
    ascoltatori.delete(notifica);
  };
}

/** Sul telefono: l'esito lasciato su <html> dallo script del <head>. */
function leggiStato(): Stato {
  return document.documentElement.dataset.accesso === "si" ? "aperto" : "chiuso";
}

/** In fase di build (e durante l'idratazione) non si puo' ancora sapere. */
function statoDiPartenza(): Stato {
  return "verifica";
}

/** Apre il cancello e lo fa sapere a chi sta guardando. */
function apri() {
  ricorda();
  document.documentElement.dataset.accesso = "si";
  ascoltatori.forEach((notifica) => notifica());
}

export default function Accesso({ children }: { children: React.ReactNode }) {
  const stato = useSyncExternalStore(iscrivi, leggiStato, statoDiPartenza);
  const [testo, setTesto] = useState("");
  const [sbagliata, setSbagliata] = useState(false);
  const campo = useRef<HTMLInputElement>(null);

  function invia(e: React.FormEvent) {
    e.preventDefault();
    if (!passwordGiusta(testo)) {
      setSbagliata(true);
      campo.current?.select();
      return;
    }
    apri();
  }

  return (
    <>
      {stato !== "aperto" ? (
        <div className="cancello fixed inset-0 z-[100] overflow-y-auto bg-notte px-6 py-16">
          <div className="mx-auto flex min-h-full w-full max-w-[26rem] flex-col justify-center">
            <p className="etichetta text-terra">{ACCESSO.soprattitolo}</p>

            <h1 className="display mt-5 text-[2.6rem]">{MOSTRA.titolo}</h1>

            <p className="mt-3 font-display text-xl italic text-sabbia">
              {MOSTRA.autrice}
            </p>

            <p className="mt-8 text-[0.95rem] leading-relaxed text-sabbia/80">
              {ACCESSO.invito}
            </p>

            <form onSubmit={invia} className="mt-10">
              <label htmlFor="password" className="etichetta block">
                {ACCESSO.etichettaCampo}
              </label>

              {/* Campo in chiaro di proposito: la password sta scritta al muro
                  della sala, non c'e' niente da mascherare, e chi digita sul
                  telefono deve poter vedere cosa sta scrivendo. */}
              <input
                id="password"
                ref={campo}
                type="text"
                value={testo}
                onChange={(e) => {
                  setTesto(e.target.value);
                  setSbagliata(false);
                }}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
                aria-invalid={sbagliata}
                aria-describedby="errore-accesso"
                className="mt-3 w-full border-b border-linea bg-transparent pb-3 font-display text-3xl text-inchiostro outline-none transition-colors focus:border-terra"
              />

              {/* Sempre presente, solo trasparente quando non serve: cosi' la
                  comparsa dell'errore non fa saltare in su il pulsante. */}
              <p
                id="errore-accesso"
                role="alert"
                className={`mt-3 text-[0.85rem] text-terra-chiara transition-opacity duration-300 ${
                  sbagliata ? "opacity-100" : "opacity-0"
                }`}
              >
                {ACCESSO.errore}
              </p>

              <button
                type="submit"
                className="mt-4 w-full border border-terra bg-terra py-4 text-center font-display text-2xl text-notte transition-colors duration-300 hover:bg-terra-chiara"
              >
                {ACCESSO.pulsante}
              </button>
            </form>

            <p className="etichetta mt-12 leading-relaxed text-fumo/70">
              {MOSTRA.luogo}
              <br />
              {MOSTRA.anno}
            </p>
          </div>
        </div>
      ) : null}

      {stato !== "chiuso" ? <div className="sito">{children}</div> : null}
    </>
  );
}
