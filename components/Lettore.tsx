"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Fotografia } from "@/config/mostra";
import { gsap, useGSAP, useModoAnimazioni } from "@/lib/gsap";
import { percorso } from "@/lib/percorsi";

function tempo(secondi: number) {
  if (!Number.isFinite(secondi) || secondi < 0) return "0:00";
  const m = Math.floor(secondi / 60);
  const s = Math.floor(secondi % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Lettore musicale della singola opera. Ancorato in basso, sempre a portata
 * di pollice.
 *
 * DUE STATI, DI PROPOSITO
 * Finche' nessuno ha ancora premuto play il lettore e' in "invito": fondo
 * scaldato di terracotta, filo superiore acceso, tasto pieno con un alone che
 * pulsa, scritta grande "Ascolta la musica". Serve a farsi trovare: in mostra
 * si e' visto che l'occhio va tutto alla fotografia e la barra in fondo, se
 * discreta, non viene proprio notata.
 * Dopo il primo play l'invito non serve piu' e il lettore si calma, tornando
 * alla veste scura del resto del sito. Le misure restano identiche, cosi' il
 * passaggio non fa saltare niente sullo schermo.
 */
export default function Lettore({ opera }: { opera: Fotografia }) {
  const modo = useModoAnimazioni();
  const audio = useRef<HTMLAudioElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  const radice = useRef<HTMLDivElement>(null);

  const [inRiproduzione, setInRiproduzione] = useState(false);
  const [posizione, setPosizione] = useState(0);
  const [durata, setDurata] = useState(0);
  const [errore, setErrore] = useState(false);
  /* Il brano e' gia' stato avviato almeno una volta su questa pagina? */
  const [usato, setUsato] = useState(false);

  const avanzamento = durata > 0 ? (posizione / durata) * 100 : 0;
  const invito = !usato && !errore;

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

  /* L'alone che pulsa attorno al tasto, finche' nessuno lo ha ancora premuto.
     E' movimento continuo: con "riduci movimento" resta un cerchio fermo,
     che comunque stacca il tasto dal resto. */
  useGSAP(
    () => {
      if (!invito || modo !== "piene") return;

      gsap.fromTo(
        ".lettore-alone",
        { scale: 1, opacity: 0.6 },
        {
          scale: 2.1,
          opacity: 0,
          duration: 1.7,
          ease: "power2.out",
          repeat: -1,
          repeatDelay: 0.7,
          /* Parte dopo l'entrata del lettore e dopo che la foto si e'
             composta: prima sarebbe solo un'altra cosa che si muove. */
          delay: 1.8,
        }
      );
    },
    { dependencies: [invito, modo], scope: radice }
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
        .then(() => {
          setInRiproduzione(true);
          setUsato(true);
        })
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
    <div ref={radice} className="fixed inset-x-0 bottom-0 z-30">
      <div
        className={`relative border-t bg-notte-2 transition-colors duration-700 ${
          invito
            ? "border-terra shadow-[0_-26px_60px_-10px_rgba(0,0,0,0.92)]"
            : "border-linea shadow-[0_-20px_50px_-16px_rgba(0,0,0,0.85)]"
        }`}
      >
        {/* Velo caldo: solo finche' il lettore deve farsi notare */}
        {invito ? (
          <span
            className="pointer-events-none absolute inset-0 bg-terra/[0.07]"
            aria-hidden
          />
        ) : null}

        <audio ref={audio} src={percorso(opera.canzone)} preload="metadata" />

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
          className="group relative h-7 cursor-pointer touch-none"
        >
          <span className="absolute inset-x-0 top-3.5 h-[2px] bg-linea" />
          <span
            className="absolute left-0 top-3.5 h-[2px] bg-terra transition-[width] duration-100 ease-linear"
            style={{ width: `${avanzamento}%` }}
          />
          <span
            className="absolute top-3.5 -ml-[5px] h-[10px] w-[10px] -translate-y-1/4 rounded-full bg-terra-chiara transition-opacity"
            style={{ left: `${avanzamento}%`, opacity: durata ? 1 : 0 }}
          />
        </div>

        {/* Tutta la riga e' il tasto: un dito impreciso fa partire la musica
            lo stesso, senza dover centrare il cerchietto. */}
        <button
          type="button"
          onClick={alternaRiproduzione}
          disabled={errore}
          aria-label={
            errore
              ? "Traccia non disponibile"
              : inRiproduzione
                ? `Metti in pausa ${opera.titoloCanzone}`
                : `Ascolta ${opera.titoloCanzone}`
          }
          className="contenitore relative flex items-center gap-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 text-left disabled:opacity-40"
        >
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            {/* alone: pulsa finche' il brano non e' mai partito */}
            {invito ? (
              <span
                className="lettore-alone pointer-events-none absolute inset-0 rounded-full border border-terra/70"
                aria-hidden
              />
            ) : null}

            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-500 ${
                invito
                  ? "border-terra bg-terra text-notte"
                  : "border-terra/60 text-terra-chiara"
              }`}
            >
              {inRiproduzione ? (
                <svg width="14" height="17" viewBox="0 0 14 17" fill="currentColor" aria-hidden>
                  <rect x="0" y="0" width="5" height="17" />
                  <rect x="9" y="0" width="5" height="17" />
                </svg>
              ) : (
                <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden>
                  <path d="M1 0l15 9L1 18z" />
                </svg>
              )}
            </span>
          </span>

          <span className="min-w-0 flex-1">
            <span
              className={`mb-1 block font-sans font-medium uppercase leading-none transition-colors duration-500 ${
                invito
                  ? "text-[0.78rem] tracking-[0.16em] text-terra-chiara"
                  : "text-[0.6875rem] tracking-[0.22em] text-fumo"
              }`}
            >
              {errore
                ? "Traccia non disponibile"
                : invito
                  ? "Ascolta la musica"
                  : inRiproduzione
                    ? "In ascolto"
                    : "In pausa"}
            </span>
            <span className="block truncate font-display text-xl leading-tight">
              {opera.titoloCanzone}
              {opera.artista ? <span className="text-fumo"> — {opera.artista}</span> : null}
            </span>
          </span>

          <span
            className="hidden shrink-0 items-end gap-[3px] pb-1 min-[420px]:flex"
            aria-hidden
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="eq-barra block h-5 w-[2px] origin-bottom scale-y-[0.22] bg-sabbia/70"
              />
            ))}
          </span>

          <span className="shrink-0 font-sans text-[0.68rem] font-medium tracking-[0.1em] tabular-nums text-fumo">
            {tempo(posizione)}
            <span className="text-fumo/60"> / {tempo(durata)}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
