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

Per generare il sito da pubblicare:

```bash
npm run build
```

Il risultato finisce in `out/`: sono file statici, apribili con qualsiasi
server web. Per provarli in locale:

```bash
npx serve out
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

## Pubblicazione su GitHub Pages

Il sito viene generato come **export statico** (`output: "export"`), quindi
non serve alcun server Node: sono file che GitHub Pages puo' servire cosi'
come sono.

### Da fare una sola volta

1. Crea il repository su GitHub e collega questa cartella:

   ```bash
   git remote add origin https://github.com/TUO-UTENTE/NOME-REPO.git
   git push -u origin main
   ```

2. Su GitHub vai in **Settings -> Pages -> Build and deployment** e imposta
   **Source: GitHub Actions**.

Da quel momento ogni `git push` su `main` ripubblica il sito. Puoi anche
lanciare la pubblicazione a mano dalla scheda **Actions**, con il pulsante
**Run workflow**.

Il workflow e' in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### L'indirizzo del sito, e perche' non devi configurare nulla

Su GitHub Pages il sito puo' finire in due posti diversi:

| repository | indirizzo | prefisso |
|---|---|---|
| `utente/frammenti` | `utente.github.io/frammenti` | `/frammenti` |
| `utente/utente.github.io` | `utente.github.io` | nessuno |
| dominio personalizzato | `mostra.tuodominio.it` | nessuno |

Quel prefisso deve finire dentro ogni collegamento e ogni immagine, altrimenti
si vede una pagina bianca. **Lo calcola il workflow da solo** leggendo il nome
del repository, e lo passa alla build: non devi scrivere niente a mano.

**Per usare un dominio tuo**: crea un file `public/CNAME` con dentro solo il
dominio (per esempio `mostra.tuodominio.it`), poi imposta il dominio anche in
Settings -> Pages. Il workflow se ne accorge da solo e toglie il prefisso.

### I QR code

Punta i QR code a `https://indirizzo-del-sito/1`, `/2`, ... fino a `/20`.
Funzionano sia con la barra finale sia senza: `/7` viene rediretto a `/7/`.

### Un'avvertenza sul peso delle immagini

Senza un server Node non c'e' nessuno che possa ridimensionare le fotografie
al volo: vengono servite esattamente come sono nel repository. Esportale
quindi gia' pronte, lato lungo entro **~1600px** e possibilmente sotto i
**300 KB** l'una. Le anteprime in home si caricano man mano che scorri, non
tutte insieme, ma su una rete lenta la differenza si sente.

---

## Materiale attualmente presente

Foto e musica sono **segnaposto**, da sostituire con i file veri:

- `public/photos/01.jpg` … `20.jpg` — fotografie di esempio (1200x1600),
  prese da [Lorem Picsum](https://picsum.photos) e **salvate dentro il
  progetto**: il sito non dipende da internet per mostrarle
- `public/audio/demo-01.mp3` … `demo-05.mp3` — cinque tracce ambient
  generate apposta, usate a rotazione

Per mettere il materiale vero ti basta **sovrascrivere quei file tenendo lo
stesso nome**: non devi toccare la configurazione.

> **Se sostituisci una foto e continui a vedere quella vecchia**, non e' un
> errore tuo. Next tiene le immagini gia' ottimizzate in una cache su disco
> la cui chiave e' il percorso del file: se il nome non cambia, continua a
> servire la vecchia. Riavviare `npm run dev` **non basta**. Svuota la
> cache e ricarica la pagina:
>
> ```bash
> rm -rf .next/dev/cache/images
> ```
>
> In sviluppo la cartella e' `.next/dev/cache/images`; per una build di
> produzione e' `.next/cache/images`. Non serve fermare il server. In alternativa cambia i
percorsi in `config/mostra.ts`. Quando hai finito puoi cancellare i
`demo-*.mp3` rimasti inutilizzati.

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
