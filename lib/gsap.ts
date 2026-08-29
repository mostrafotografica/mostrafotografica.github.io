"use client";

import { useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ===========================================================================
 *  QUANDO E COME SI PUO' ANIMARE
 *  -------------------------------------------------------------------------
 *  "spente"  la pagina non e' in primo piano. Il browser sospende
 *            requestAnimationFrame: nessuna animazione puo' avanzare di un
 *            fotogramma (vale per GSAP come per chiunque altro). Qui non
 *            nascondiamo NIENTE, altrimenti resterebbe invisibile per
 *            sempre e la pagina sarebbe nera. Appena torna in primo piano
 *            si passa a "ridotte" o "piene" e le animazioni partono.
 *
 *  "ridotte" il dispositivo chiede meno movimento (su macOS: Impostazioni >
 *            Accessibilita' > Schermo > Riduci movimento). Niente scorrimenti,
 *            parallasse o rimbalzi: solo dissolvenze brevi. Le cose compaiono
 *            comunque, con garbo.
 *
 *  "piene"   tutto acceso.
 * ======================================================================== */

export type ModoAnimazioni = "spente" | "ridotte" | "piene";

let modo: ModoAnimazioni = "spente";
const ascoltatori = new Set<() => void>();

function verifica() {
  if (modo !== "spente" || typeof document === "undefined") return modo;

  if (document.visibilityState === "visible") {
    const ridotte = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    modo = ridotte ? "ridotte" : "piene";
    /* Da qui in poi il CSS puo' nascondere cio' che verra' rivelato */
    document.documentElement.dataset.anima = "si";
  }
  return modo;
}

function iscrivi(notifica: () => void) {
  ascoltatori.add(notifica);
  return () => {
    ascoltatori.delete(notifica);
  };
}

if (typeof document !== "undefined") {
  /* Dice allo script in <head> che il motore delle animazioni e' arrivato */
  document.documentElement.dataset.animaViva = "si";

  /* Valutazione immediata: se la pagina e' gia' in primo piano gli elementi
     partono nascosti fin dal primo disegno, senza sfarfallii. */
  verifica();

  document.addEventListener("visibilitychange", () => {
    if (modo !== "spente" || verifica() === "spente") return;
    ascoltatori.forEach((notifica) => notifica());
    /* Le misure prese a pagina nascosta non valgono: si rifanno */
    ScrollTrigger.refresh();
  });
}

/** Lettura secca, fuori da React (per gestori di eventi). */
export function modoAnimazioni() {
  return modo;
}

/**
 * Versione per i componenti: vale "spente" finche' la pagina e' nascosta e
 * diventa "ridotte"/"piene" appena torna in primo piano, facendo ripartire
 * l'effetto che contiene le animazioni.
 */
export function useModoAnimazioni() {
  return useSyncExternalStore(
    iscrivi,
    () => modo,
    () => "spente" as ModoAnimazioni
  );
}

export { gsap, ScrollTrigger, useGSAP };
