"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU, MOSTRA, NUMERO_FOTO } from "@/config/mostra";
import { animazioniAttive, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function Header() {
  const [aperto, setAperto] = useState(false);
  const pathname = usePathname();
  const pannello = useRef<HTMLDivElement>(null);
  const contenitore = useRef<HTMLElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  const apertoRef = useRef(false);
  const [scrollato, setScrollato] = useState(false);

  useEffect(() => {
    apertoRef.current = aperto;
    /* Col menu aperto la barra deve restare a vista */
    if (aperto) gsap.set(barra.current, { yPercent: 0 });
  }, [aperto]);

  /* Il menu si chiude quando cambio pagina */
  useEffect(() => {
    setAperto(false);
  }, [pathname]);

  /* Esc per chiudere + blocco dello scroll di fondo */
  useEffect(() => {
    document.body.dataset.menuAperto = String(aperto);
    if (!aperto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAperto(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aperto]);

  /* La barra si ritira scendendo e torna appena si risale:
     il contenuto resta sempre leggibile, senza fondali pesanti. */
  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        start: "top -64",
        end: "max",
        onUpdate: (self) => {
          setScrollato(self.scroll() > 64);
          if (apertoRef.current || !animazioniAttive()) return;
          gsap.to(barra.current, {
            yPercent: self.direction === 1 ? -130 : 0,
            duration: 0.5,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          setScrollato(false);
          gsap.to(barra.current, { yPercent: 0, duration: 0.4, ease: "power3.out" });
        },
      });
      return () => st.kill();
    },
    { scope: contenitore }
  );

  /* Slide da destra verso sinistra: il pannello entra, le voci salgono
     una dopo l'altra, la coda con i contatti appare per ultima. */
  const primoGiro = useRef(true);
  useEffect(() => {
    const el = pannello.current;
    if (!el) return;

    /* Al primo render il pannello e' gia' fuori schermo via CSS: niente da fare. */
    if (primoGiro.current) {
      primoGiro.current = false;
      if (!aperto) return;
    }

    const voci = el.querySelectorAll(".menu-voce");
    const coda = el.querySelectorAll(".menu-coda");

    /* Senza animazioni il menu funziona lo stesso: appare e sparisce
       istantaneamente, senza mai restare a meta' strada. */
    if (!animazioniAttive()) {
      gsap.set(el, { xPercent: aperto ? 0 : 100, pointerEvents: aperto ? "auto" : "none" });
      gsap.set([...voci, ...coda], { clearProps: "all" });
      return;
    }

    if (aperto) {
      const tl = gsap.timeline();
      tl.set(el, { pointerEvents: "auto" })
        .to(el, { xPercent: 0, duration: 0.85, ease: "expo.out" })
        .fromTo(
          voci,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" },
          "-=0.45"
        )
        .fromTo(
          coda,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" },
          "-=0.4"
        );
      return () => {
        tl.kill();
      };
    }

    const tl = gsap.to(el, {
      xPercent: 100,
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => gsap.set(el, { pointerEvents: "none" }),
    });
    return () => {
      tl.kill();
    };
  }, [aperto]);

  return (
    <header ref={contenitore}>
      {/* ---------------- barra fissa ---------------- */}
      <div ref={barra} className="fixed inset-x-0 top-0 z-50">
        <div
          className={`pointer-events-none absolute inset-0 transition-all duration-500 ${
            scrollato && !aperto
              ? "border-b border-linea bg-notte/85 backdrop-blur-xl"
              : "bg-gradient-to-b from-notte/90 via-notte/45 to-transparent"
          }`}
        />
        <div className="relative flex items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="etichetta text-inchiostro/85 transition-colors hover:text-terra"
          >
            {MOSTRA.autrice}
          </Link>

          <button
            type="button"
            onClick={() => setAperto((v) => !v)}
            aria-expanded={aperto}
            aria-label={aperto ? "Chiudi il menu" : "Apri il menu"}
            className="relative z-[60] -mr-2 flex items-center gap-3 px-2 py-2"
          >
            <span className="etichetta text-inchiostro/85">
              {aperto ? "Chiudi" : "Menu"}
            </span>
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-inchiostro transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  aperto ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-inchiostro transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  aperto ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ---------------- pannello a tutto schermo ---------------- */}
      <div
        ref={pannello}
        className="fixed inset-0 z-40 flex translate-x-full flex-col justify-between bg-notte-2 px-6 pb-10 pt-28"
        style={{ pointerEvents: "none" }}
        aria-hidden={!aperto}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div className="absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-terra blur-[90px]" />
        </div>

        <nav className="relative">
          <ul>
            {MENU.map((voce, i) => (
              <li key={voce.href} className="maschera border-b border-linea">
                <Link
                  href={voce.href}
                  onClick={() => setAperto(false)}
                  className="menu-voce flex items-baseline gap-4 py-5"
                  tabIndex={aperto ? 0 : -1}
                >
                  <span className="etichetta text-terra">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-[2.6rem] text-inchiostro">
                    {voce.etichetta}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative space-y-6">
          <div className="menu-coda flex flex-wrap gap-x-5 gap-y-2">
            {MOSTRA.contatti.social.map((s) => (
              <a
                key={s.etichetta}
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={aperto ? 0 : -1}
                className="etichetta text-sabbia transition-colors hover:text-terra"
              >
                {s.etichetta}
              </a>
            ))}
          </div>

          <a
            href={`mailto:${MOSTRA.contatti.email}`}
            tabIndex={aperto ? 0 : -1}
            className="menu-coda block font-display text-2xl italic text-terra-chiara"
          >
            {MOSTRA.contatti.email}
          </a>

          <p className="menu-coda etichetta leading-relaxed text-fumo">
            {MOSTRA.luogo}
            <br />
            {NUMERO_FOTO} fotografie · {MOSTRA.anno}
          </p>
        </div>
      </div>
    </header>
  );
}
