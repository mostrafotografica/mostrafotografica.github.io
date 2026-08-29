"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Le animazioni sono attive solo se lo script in <head> ha alzato la
 * bandierina `data-anima="si"` sull'elemento <html>. Succede quando la
 * pagina viene aperta in primo piano e il dispositivo non chiede
 * animazioni ridotte.
 *
 * Perche' e' importante: GSAP ferma il proprio ticker quando la scheda non
 * e' visibile (schermo bloccato, scheda in secondo piano, anteprima
 * nascosta). Se in quel momento avessimo gia' nascosto i contenuti per
 * animarli, resterebbero invisibili: pagina nera. Con questa bandierina
 * nascondiamo qualcosa solo quando siamo certi di poterlo far riapparire.
 */
/* Segnala allo script in <head> che il motore delle animazioni e' arrivato. */
if (typeof document !== "undefined") {
  document.documentElement.dataset.animaViva = "si";
}

export function animazioniAttive() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.anima === "si";
}

export { gsap, ScrollTrigger, useGSAP };
