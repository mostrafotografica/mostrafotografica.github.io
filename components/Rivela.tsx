"use client";

import { useRef } from "react";
import { gsap, useGSAP, useModoAnimazioni } from "@/lib/gsap";

/**
 * Contenitore che fa entrare in scena i figli marcati `.rivela`,
 * uno dopo l'altro. Usato nelle pagine di testo.
 */
export default function Rivela({ children }: { children: React.ReactNode }) {
  const modo = useModoAnimazioni();
  const radice = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (modo === "spente") return;

      const ridotte = modo === "ridotte";
      gsap.fromTo(
        ".rivela",
        { y: ridotte ? 0 : 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ridotte ? 0.5 : 1,
          stagger: ridotte ? 0.05 : 0.09,
          ease: ridotte ? "power1.out" : "power3.out",
        }
      );
    },
    { dependencies: [modo], scope: radice }
  );

  return <div ref={radice}>{children}</div>;
}
