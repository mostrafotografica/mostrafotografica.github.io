"use client";

import { useRef } from "react";
import { animazioniAttive, gsap, useGSAP } from "@/lib/gsap";

/**
 * Contenitore che fa entrare in scena i figli marcati `.rivela`,
 * uno dopo l'altro. Usato nelle pagine di testo.
 */
export default function Rivela({ children }: { children: React.ReactNode }) {
  const radice = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animazioniAttive()) return;

      gsap.fromTo(
        ".rivela",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.09, ease: "power3.out" }
      );
    },
    { scope: radice }
  );

  return <div ref={radice}>{children}</div>;
}
