/**
 * Antepone il percorso base ai file che stanno in /public.
 *
 * Serve perche' su GitHub Pages il sito puo' vivere dentro una
 * sottocartella (per esempio /nome-repo). Next aggiunge da solo il
 * prefisso ai propri file e ai collegamenti tra pagine, ma NON ai file
 * che scrivi tu in /public: foto e musica resterebbero a /photos/01.jpg
 * e darebbero 404.
 *
 * Cosi' in config/mostra.ts puoi continuare a scrivere semplicemente
 * "/photos/01.jpg" senza pensare a dove verra' pubblicato il sito.
 * Gli indirizzi web completi (https://...) restano intatti.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function percorso(indirizzo: string) {
  if (!indirizzo) return indirizzo;
  if (/^[a-z][a-z0-9+.-]*:/i.test(indirizzo)) return indirizzo; // https:, data:, ...
  if (!indirizzo.startsWith("/")) return indirizzo;
  if (BASE && indirizzo.startsWith(`${BASE}/`)) return indirizzo; // gia' col prefisso
  return `${BASE}${indirizzo}`;
}
