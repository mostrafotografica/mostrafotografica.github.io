# I miei frammenti di mondo

Sito della mostra fotografica di Elisabetta Gonella.
Webapp pensata per il telefono: sotto ogni fotografia esposta c'e' un QR code,
inquadrandolo si apre la pagina di quell'opera con foto, luogo e musica.

---

## Come si avvia

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000

### Provarlo dal telefono (consigliato: e' un sito per il telefono)

Il terminale, all'avvio, stampa anche un indirizzo tipo
`http://192.168.1.34:3000`: aprilo dal telefono, collegato allo stesso Wi-Fi.

**Se il tuo computer cambia indirizzo IP** devi aggiungerlo a
`allowedDevOrigins` in [`next.config.ts`](next.config.ts). In sviluppo Next
rifiuta (errore 403) le richieste ai propri file JavaScript provenienti da
indirizzi non autorizzati: la pagina si carica ma resta immobile, senza
animazioni. Riguarda solo lo sviluppo, il sito pubblicato non ne risente.

Per la versione definitiva:

```bash
npm run build
npm start
```

---

## Come cambio foto, titoli e musica

Tutto quello che ti serve e' in **un solo file**: [`config/mostra.ts`](config/mostra.ts).
Non devi toccare nient'altro.

### Aggiungere o modificare una fotografia

1. Metti l'immagine in `public/photos/` (per esempio `01.jpg`)
2. Metti il brano in `public/audio/` (per esempio `01.mp3`)
3. Apri `config/mostra.ts` e modifica l'elenco `FOTOGRAFIE`:

```ts
{
  id: 1,                        // numero dell'opera, finisce nell'URL: /1
  titolo: "Le tracce del giorno",
  luogo: "Deserto di Al Marmoom, Emirati Arabi",
  foto: "/photos/01.jpg",
  canzone: "/audio/01.mp3",
  titoloCanzone: "Dune al tramonto",
  artista: "Nome artista",      // opzionale
  anno: "2024",                 // opzionale
  didascalia: "Due righe...",   // opzionale, compare sotto la foto
}
```

**Il numero di foto e' semplicemente quante voci ci sono nell'elenco.**
Ne aggiungi una = una foto in piu'. Ne togli una = una foto in meno.
Home, numerazione, frecce avanti/indietro e pagine si aggiornano da sole.

Gli `id` devono essere diversi tra loro. L'ordine dell'elenco e' l'ordine in home.

### Cambiare il titolo della mostra, i testi, i contatti

Sempre in `config/mostra.ts`, nel blocco `MOSTRA` in cima:
titolo, autrice, introduzione, testi della pagina "La mostra",
orari, email, indirizzo, social.

Il titolo viene animato parola per parola: puoi cambiarlo con
qualsiasi altro, lungo o corto, e continuera' a funzionare.

### Cambiare le voci del menu

Blocco `MENU` in fondo a `config/mostra.ts`.

---

## Gli indirizzi delle pagine

| Indirizzo     | Cosa mostra                                  |
|---------------|----------------------------------------------|
| `/`           | Copertina + indice numerato delle 20 foto    |
| `/1` … `/20`  | La singola fotografia con il suo lettore     |
| `/la-mostra`  | Testi e informazioni pratiche                |
| `/contatti`   | Email, indirizzo, social                     |

**Per i QR code** punta a `https://tuodominio.it/1`, `/2`, e cosi' via
(oppure alla home, se preferisci: il sito funziona in entrambi i modi).

---

## Materiale attualmente presente

Foto e musica sono **segnaposto**, da sostituire con i file veri:

- le foto arrivano da `picsum.photos` (immagini casuali online)
- i brani sono cinque tracce ambient generate apposta, in `public/audio/`

Quando metti i tuoi file in `public/photos/` e `public/audio/` e aggiorni
i percorsi nella configurazione, i segnaposto smettono di essere usati.
A quel punto puoi anche cancellare i `demo-*.mp3`.

---

## Note tecniche

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** per lo stile, palette e caratteri sono in `app/globals.css`
- **GSAP** (con ScrollTrigger) per le animazioni, **Lenis** per lo scroll morbido
- Caratteri: *Instrument Serif* per i titoli, *Inter* per il resto
- Le pagine delle opere sono generate staticamente: si aprono all'istante
  anche con la rete lenta della sala

### Una regola importante del progetto

I contenuti non vengono **mai** nascosti dal CSS in attesa di un'animazione.
Lo script in cima a `app/layout.tsx` controlla, prima ancora del primo
disegno, che la pagina sia davvero in primo piano e che il telefono non
chieda animazioni ridotte: solo allora accende la bandierina `data-anima`.

Serve perche' GSAP ferma le animazioni quando la scheda non e' visibile
(schermo bloccato, pagina aperta in secondo piano). Senza questo controllo
il sito si aprirebbe **completamente nero**, con i contenuti presenti ma
invisibili. C'e' anche una rete di sicurezza: se il codice delle animazioni
non arriva entro 5 secondi, tutto viene mostrato comunque.

Sono previste tre modalita' (`lib/gsap.ts`):

| modalita' | quando | cosa fa |
|-----------|--------|---------|
| `piene`   | pagina in primo piano | tutte le animazioni |
| `ridotte` | il dispositivo chiede meno movimento | solo dissolvenze brevi |
| `spente`  | pagina non in primo piano | niente nascosto, niente animato |

Se aggiungi animazioni tue, segui la stessa regola:
`if (modo === "spente") return;` e nessun `opacity: 0` fisso nel CSS.

### Attenzione a Tailwind 4 + GSAP

In Tailwind 4 le classi tipo `translate-x-full` e `scale-*` scrivono sulle
proprieta' CSS `translate` / `scale`, che sono **separate** da `transform`.
Quando GSAP prende in mano un elemento legge la matrice gia' calcolata e si
porta dietro quello scostamento come valore fisso: l'animazione parte ma
l'elemento resta spostato. Se animi `xPercent`/`yPercent` su un elemento che
ha anche una classe di trasformazione Tailwind, dichiara sempre in modo
esplicito anche `x: 0` / `y: 0` (vedi il pannello del menu in
`components/Header.tsx`).

---

## Musica

Le musiche sono diffuse con regolare licenza SIAE gia' pagata per la mostra.
