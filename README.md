# I miei frammenti di mondo

Sito della mostra fotografica di Elisabetta Gonella.
Webapp pensata per il telefono: sotto ogni fotografia esposta c'e' un QR code,
inquadrandolo si apre la pagina di quell'opera con foto, luogo e musica.

---

## Prima di tutto: le musiche stanno in Git LFS

I 20 brani non sono file normali dentro al repository: sono gestiti con
**Git LFS**, che al loro posto salva in git dei segnaposto da poche
centinaia di byte e tiene i file veri su un archivio a parte.

Vuol dire che se cloni il progetto **senza** Git LFS installato, in
`public/audio/` trovi 20 file di testo che iniziano con
`version https://git-lfs...` invece della musica, e il sito parte
regolarmente ma non suona. Per evitarlo, una volta sola sul tuo computer:

```bash
brew install git-lfs && git lfs install
```

Se hai gia' clonato prima di installarlo, recupera i brani con:

```bash
git lfs pull
```

> **Nota sui limiti:** il piano gratuito di GitHub include 1 GB al mese di
> traffico LFS. Ogni pubblicazione del sito ne consuma circa 75 MB, quindi
> dopo una decina di pubblicazioni nello stesso mese le build cominciano a
> fallire finche' il mese non si azzera. Se dovesse succedere, i rimedi
> sono comprare traffico aggiuntivo su GitHub, oppure togliere l'audio da
> LFS e alleggerirlo (per esempio pubblicando estratti piu' corti).

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

## La password del sito

Il sito chiede una password all'apertura. La imposti in **un solo punto**:
il blocco `ACCESSO` di [`config/mostra.ts`](config/mostra.ts).

```ts
export const ACCESSO = {
  password: "frammenti",   // <- cambiala
  parametro: "p",          // nome del parametro nell'indirizzo
  ...
};
```

**Cambiala prima di pubblicare**: quella scritta ora e' solo un segnaposto.

### Non e' una vera protezione, ed e' voluto

Il sito e' fatto di soli file statici: non c'e' nessun server che possa
verificare qualcosa, quindi la password viaggia dentro alla pagina e chi va
a curiosare nel codice la trova. Non serve a difendere i contenuti: serve a
tenere fuori chi capita per caso, perche' la password sta scritta in sala e
chi non c'e' stato non la conosce.

Le fotografie e i brani, di conseguenza, restano scaricabili da chi sa dove
cercare. Se un giorno servisse una protezione vera, l'unica strada e'
spostare il sito dietro a un server che la controlli (per esempio Netlify o
Vercel con una password di sito, oppure un `.htaccess` su un hosting
classico): GitHub Pages, da solo, non lo permette.

### I due modi di entrare

**Scrivendola**, nel riquadro che compare aprendo il sito. Maiuscole,
minuscole e spazi ai lati non contano: `Frammenti` e ` frammenti ` vanno
bene uguale, il che con le tastiere dei telefoni evita parecchi errori.

**Dall'indirizzo**, aggiungendo il parametro:

```
https://indirizzo-del-sito/?p=frammenti
https://indirizzo-del-sito/7/?p=frammenti      <- vale anche sulle foto
```

Cosi' chi apre il link entra senza digitare niente. E' il modo comodo per i
**QR code**: se li stampi con il parametro dentro, chi inquadra la foto in
mostra si ritrova direttamente sulla pagina dell'opera. Appena il sito si
apre la password sparisce dalla barra dell'indirizzo, quindi non resta in
vista sullo schermo di chi guarda.

### Una volta sola

Entrato, il telefono se lo ricorda: le altre pagine e le visite dei giorni
successivi si aprono senza chiedere nulla. Il ricordo e' legato alla
password: **se la cambi, decade per tutti** e la password torna a essere
richiesta. E' il modo per chiudere il sito a mostra finita.

Per **togliere del tutto il lucchetto**, lascia la password vuota:

```ts
password: "",
```

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

Se vuoi che chi inquadra **non debba digitare la password**, mettila nel
link: `https://indirizzo-del-sito/7/?p=frammenti` (vedi
[La password del sito](#la-password-del-sito)).

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

### Come fa il cancello a non lampeggiare

Il riquadro della password usa lo stesso trucco delle animazioni. Il sito e'
un export statico: l'HTML viene scritto in fase di build e non puo' sapere
chi lo aprira', quindi contiene **tutt'e due le cose**, riquadro e sito.

A scegliere e' uno script in cima a `app/layout.tsx` (il codice sta in
[`lib/accesso.ts`](lib/accesso.ts)) che gira **prima del primo disegno**:
guarda il parametro nell'indirizzo e la memoria del telefono, e scrive
l'esito su `<html data-accesso="si|no">`. Due righe di CSS in `globals.css`
fanno il resto, prima che si veda qualsiasi cosa:

```css
html:not([data-accesso="si"]) .sito { display: none; }
html[data-accesso="si"] .cancello  { display: none; }
```

Subito dopo l'idratazione, `components/Accesso.tsx` legge quell'attributo e
**smonta** il pezzo di troppo. Smontare (invece di limitarsi a nascondere)
serve a una cosa precisa: quando la password viene azzeccata il sito nasce
in quel momento, e le animazioni di apertura partono da capo come se fosse
la prima visita.

Se lo script non parte, l'attributo manca e per prudenza vince il riquadro:
meglio una password chiesta di troppo che il sito spalancato.

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
