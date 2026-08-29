"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Fotografia } from "@/config/mostra";
import { gsap, useGSAP, useModoAnimazioni } from "@/lib/gsap";

function tempo(secondi: number) {
  if (!Number.isFinite(secondi) || secondi < 0) return "0:00";
  const m = Math.floor(secondi / 60);
  const s = Math.floor(secondi % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Lettore musicale della singola opera. Ancorato in basso, sempre a portata di pollice. */
export default function Lettore({ opera }: { opera: Fotografia }) {
  const modo = useModoAnimazioni();
  const audio = useRef<HTMLAudioElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  const radice = useRef<HTMLDivElement>(null);

  const [inRiproduzione, setInRiproduzione] = useState(false);
  const [posizione, setPosizione] = useState(0);
  const [durata, setDurata] = useState(0);
  const [errore, setErrore] = useState(false);

  const avanzamento = durata > 0 ? (posizione / durata) * 100 : 0;

  /* Entrata del lettore dal basso */
  useGSAP(
    () => {
      if (modo === "spente") return;

      if (modo === "ridotte") {
        gsap.fromTo(radice.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
        return;
      }

      gsap.fromTo(
        radice.current,
        { yPercent: 130 },
        { yPercent: 0, duration: 1, ease: "expo.out", delay: 0.5 }
      );
    },
    { dependencies: [modo], scope: radice }
  );

  /* Le barrette dell'equalizzatore vivono solo mentre suona */
  useGSAP(
    () => {
      /* L'equalizzatore e' movimento continuo: con "riduci movimento" resta fermo */
      if (modo !== "piene") return;

      const barrette = gsap.utils.toArray<HTMLElement>(".eq-barra");
      if (!inRiproduzione) {
        gsap.killTweensOf(barrette);
        gsap.to(barrette, { scaleY: 0.22, duration: 0.35, ease: "power2.out" });
        return;
      }
      barrette.forEach((b, i) => {
        gsap.to(b, {
          scaleY: gsap.utils.random(0.35, 1),
          duration: gsap.utils.random(0.28, 0.55),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.08,
        });
      });
    },
    { dependencies: [inRiproduzione, modo], scope: radice }
  );

  const alternaRiproduzione = useCallback(() => {
    const el = audio.current;
    if (!el || errore) return;
    if (el.paused) {
      el.play()
        .then(() => setInRiproduzione(true))
        .catch(() => setErrore(true));
    } else {
      el.pause();
      setInRiproduzione(false);
    }
  }, [errore]);

  /* Aggiornamento continuo della posizione */
  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const onTime = () => setPosizione(el.currentTime);
    const onMeta = () => setDurata(el.duration);
    const onFine = () => {
      setInRiproduzione(false);
      setPosizione(0);
      el.currentTime = 0;
    };
    const onErrore = () => setErrore(true);

    /* Se i metadati sono gia' arrivati non riceveremo l'evento: leggiamoli subito. */
    if (el.readyState >= 1) onMeta();

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("durationchange", onMeta);
    el.addEventListener("ended", onFine);
    el.addEventListener("error", onErrore);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("durationchange", onMeta);
      el.removeEventListener("ended", onFine);
      el.removeEventListener("error", onErrore);
    };
  }, []);

  /* Trascinamento / tocco sulla barra per spostarsi nel brano */
  const cerca = useCallback(
    (clientX: number) => {
      const el = audio.current;
      const track = barra.current;
      if (!el || !track || !Number.isFinite(el.duration)) return;
      const r = track.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      el.currentTime = p * el.duration;
      setPosizione(el.currentTime);
    },
    []
  );

  return (
    <div
      ref={radice}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-linea bg-notte/80 backdrop-blur-xl"
    >
      <audio ref={audio} src={opera.canzone} preload="metadata" />

      {/* barra di avanzamento / ricerca */}
      <div
        ref={barra}
        role="slider"
        tabIndex={0}
        aria-label="Avanzamento del brano"
        aria-valuemin={0}
        aria-valuemax={Math.round(durata) || 0}
        aria-valuenow={Math.round(posizione)}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          cerca(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) cerca(e.clientX);
        }}
        onKeyDown={(e) => {
          const el = audio.current;
          if (!el) return;
          if (e.key === "ArrowRight") el.currentTime = Math.min(el.duration, el.currentTime + 5);
          if (e.key === "ArrowLeft") el.currentTime = Math.max(0, el.currentTime - 5);
        }}
        className="group relative h-6 cursor-pointer touch-none"
      >
        <span className="absolute inset-x-0 top-3 h-px bg-linea" />
        <span
          className="absolute left-0 top-3 h-px bg-terra transition-[width] duration-100 ease-linear"
          style={{ width: `${avanzamento}%` }}
        />
        <span
          className="absolute top-3 -ml-[3px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-terra-chiara transition-opacity"
          style={{ left: `${avanzamento}%`, opacity: durata ? 1 : 0 }}
        />
      </div>

      <div className="contenitore flex items-center gap-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1">
        <button
          type="button"
          onClick={alternaRiproduzione}
          disabled={errore}
          aria-label={inRiproduzione ? "Metti in pausa" : "Ascolta il brano"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-terra/60 text-terra-chiara transition-colors duration-500 hover:bg-terra hover:text-notte disabled:opacity-30"
        >
          {inRiproduzione ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
              <rect x="0" y="0" width="4" height="14" />
              <rect x="8" y="0" width="4" height="14" />
            </svg>
          ) : (
            <svg width="13" height="15" viewBox="0 0 13 15" fill="currentColor" aria-hidden>
              <path d="M0 0l13 7.5L0 15z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="etichetta mb-1 text-terra">
            {errore ? "Traccia non disponibile" : "Ascolta"}
          </p>
          <p className="truncate font-display text-xl leading-tight">
            {opera.titoloCanzone}
            {opera.artista ? (
              <span className="text-fumo"> — {opera.artista}</span>
            ) : null}
          </p>
        </div>

        <div className="hidden shrink-0 items-end gap-[3px] pb-1 min-[380px]:flex" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="eq-barra block h-5 w-[2px] origin-bottom scale-y-[0.22] bg-sabbia/70"
            />
          ))}
        </div>

        <span className="etichetta shrink-0 tracking-[0.12em] tabular-nums">
          {tempo(posizione)}
          <span className="text-fumo/60"> / {tempo(durata)}</span>
        </span>
      </div>
    </div>
  );
}
