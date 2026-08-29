/* =============================================================================
 *  CONFIGURAZIONE DELLA MOSTRA
 *  -----------------------------------------------------------------------
 *  Questo e' l'UNICO file da modificare per gestire i contenuti del sito.
 *  Non serve toccare altro codice.
 *
 *  COME AGGIUNGERE / MODIFICARE UNA FOTO
 *  1. Metti il file immagine in      ->  /public/photos/    (es. 01.jpg)
 *  2. Metti il file audio in         ->  /public/audio/     (es. 01.mp3)
 *  3. Aggiungi o modifica una voce nell'array FOTOGRAFIE qui sotto:
 *
 *       {
 *         id: 1,                          // numero della foto in mostra (usato nell'URL: /1)
 *         titolo: "Titolo della foto",
 *         luogo: "Luogo dello scatto",
 *         foto: "/photos/01.jpg",         // percorso file foto
 *         canzone: "/audio/01.mp3",       // percorso file canzone
 *         titoloCanzone: "Titolo brano",
 *         artista: "Nome artista",        // opzionale
 *       }
 *
 *  Il NUMERO DI FOTO e' semplicemente quante voci ci sono nell'array:
 *  aggiungi una voce = una foto in piu', togli una voce = una foto in meno.
 *  Gli `id` devono essere unici. L'ordine dell'array e' l'ordine in home.
 *
 *  NOTA: al momento foto e musica sono MOCKUP segnaposto, gia' dentro il
 *  progetto: fotografie di esempio in /public/photos (scaricate una volta
 *  sola, quindi il sito non dipende da internet) e brani demo generati in
 *  /public/audio. Per usare il materiale vero ti basta sovrascrivere quei
 *  file mantenendo gli stessi nomi (01.jpg, 02.jpg, ...) oppure cambiare
 *  qui sotto i percorsi.
 * ========================================================================== */

export type Fotografia = {
  /** Numero della foto in mostra. Compare nell'URL: /1, /2, /3 ... */
  id: number;
  /** Titolo dell'opera */
  titolo: string;
  /** Luogo dello scatto */
  luogo: string;
  /** Percorso del file immagine (in /public) oppure URL completo */
  foto: string;
  /** Percorso del file audio (in /public) oppure URL completo */
  canzone: string;
  /** Titolo del brano musicale */
  titoloCanzone: string;
  /** Artista del brano (opzionale) */
  artista?: string;
  /** Anno dello scatto (opzionale) */
  anno?: string;
  /** Breve testo di accompagnamento mostrato sotto la foto (opzionale) */
  didascalia?: string;
};

/* -----------------------------------------------------------------------
 *  DATI GENERALI DELLA MOSTRA
 * -------------------------------------------------------------------- */
export const MOSTRA = {
  titolo: "I miei frammenti di mondo",
  autrice: "Elisabetta Gonella",
  sottotitolo: "Mostra fotografica",
  luogo: "Spazio Aperto — Via Roma 6, Osnago (LC)",
  anno: "2026",

  /** Testo introduttivo mostrato in home sotto il titolo */
  introduzione:
    "Venti fotografie, venti frammenti raccolti in giro per il mondo. " +
    "Ogni immagine ha una sua musica: indossa gli auricolari, inquadra il codice sotto la foto e ascolta.",

  /** Testo della pagina “La mostra” */
  testoMostra: [
    "Ogni viaggio lascia dei frammenti: una luce, un rumore, una strada percorsa una sola volta. " +
      "Questa mostra prova a rimetterli insieme.",
    "Accanto a ogni fotografia trovi un codice QR. Inquadralo con il telefono e la fotografia " +
      "che stai guardando si apre qui, insieme alla musica che le appartiene.",
    "Ti consigliamo di portare con te smartphone e auricolari: la mostra si guarda, ma soprattutto si ascolta.",
  ],

  /** Info pratiche mostrate nella pagina “La mostra” */
  informazioni: [
    { voce: "Inaugurazione", valore: "11 settembre, ore 19.00 — 21.00" },
    { voce: "Aperture", valore: "12—13 e 19—20 settembre" },
    { voce: "Orari", valore: "10.00 — 12.00 / 16.00 — 19.00" },
    { voce: "Ingresso", valore: "Libero" },
  ],

  /** Contatti mostrati nel menu e nella pagina “Contatti” */
  contatti: {
    email: "info@spazioaperto.org",
    sito: { etichetta: "spazioaperto.org", url: "https://www.spazioaperto.org" },
    indirizzo: "Via Roma 6, Osnago (LC)",
    mappaUrl: "https://maps.google.com/?q=Via+Roma+6,+Osnago+LC",
    social: [
      { etichetta: "Instagram", handle: "@spazio.aperto.osnago", url: "https://instagram.com/spazio.aperto.osnago" },
      { etichetta: "Facebook", handle: "Spazio Aperto Osnago", url: "https://facebook.com/spazioapertoosnago" },
      { etichetta: "YouTube", handle: "@spazioapertoosnago", url: "https://youtube.com/@spazioapertoosnago" },
    ],
  },

  /** Nota SIAE / diritti mostrata a fondo pagina */
  note: "Musiche diffuse in occasione della mostra con regolare licenza SIAE.",
} as const;

/* -----------------------------------------------------------------------
 *  ELENCO DELLE FOTOGRAFIE
 *  (attualmente 20 voci mockup — modifica liberamente)
 * -------------------------------------------------------------------- */
export const FOTOGRAFIE: Fotografia[] = [
  { id: 1,  titolo: "Le tracce del giorno",     luogo: "Deserto di Al Marmoom, Emirati Arabi", foto: "/photos/01.jpg", canzone: "/audio/demo-01.mp3", titoloCanzone: "Dune al tramonto",      artista: "Brano dimostrativo", anno: "2024" },
  { id: 2,  titolo: "Cuba, ore otto",           luogo: "L'Avana, Cuba",                        foto: "/photos/02.jpg", canzone: "/audio/demo-02.mp3", titoloCanzone: "Malecón",               artista: "Brano dimostrativo", anno: "2023" },
  { id: 3,  titolo: "Le due mani",              luogo: "Monument Valley, Utah",                foto: "/photos/03.jpg", canzone: "/audio/demo-03.mp3", titoloCanzone: "Red Earth",             artista: "Brano dimostrativo", anno: "2023" },
  { id: 4,  titolo: "Il turno di notte",        luogo: "Tokyo, Giappone",                      foto: "/photos/04.jpg", canzone: "/audio/demo-04.mp3", titoloCanzone: "Neon Quiet",            artista: "Brano dimostrativo", anno: "2022" },
  { id: 5,  titolo: "Sale e vento",             luogo: "Salar de Uyuni, Bolivia",              foto: "/photos/05.jpg", canzone: "/audio/demo-05.mp3", titoloCanzone: "Specchio bianco",       artista: "Brano dimostrativo", anno: "2022" },
  { id: 6,  titolo: "Preghiera del mattino",    luogo: "Bagan, Myanmar",                       foto: "/photos/06.jpg", canzone: "/audio/demo-01.mp3", titoloCanzone: "Campane lontane",       artista: "Brano dimostrativo", anno: "2019" },
  { id: 7,  titolo: "La casa gialla",           luogo: "Chefchaouen, Marocco",                 foto: "/photos/07.jpg", canzone: "/audio/demo-02.mp3", titoloCanzone: "Medina",                artista: "Brano dimostrativo", anno: "2019" },
  { id: 8,  titolo: "Undici gradi",             luogo: "Fiordo di Geiranger, Norvegia",        foto: "/photos/08.jpg", canzone: "/audio/demo-03.mp3", titoloCanzone: "Acqua ferma",           artista: "Brano dimostrativo", anno: "2021" },
  { id: 9,  titolo: "Chi resta",                luogo: "Lisbona, Portogallo",                  foto: "/photos/09.jpg", canzone: "/audio/demo-04.mp3", titoloCanzone: "Saudade",               artista: "Brano dimostrativo", anno: "2024" },
  { id: 10, titolo: "Traffico verticale",       luogo: "New York, Stati Uniti",                foto: "/photos/10.jpg", canzone: "/audio/demo-05.mp3", titoloCanzone: "Uptown",                artista: "Brano dimostrativo", anno: "2018" },
  { id: 11, titolo: "Le mani di Amina",         luogo: "Zanzibar, Tanzania",                   foto: "/photos/11.jpg", canzone: "/audio/demo-01.mp3", titoloCanzone: "Kizimkazi",             artista: "Brano dimostrativo", anno: "2020" },
  { id: 12, titolo: "Ultimo autobus",           luogo: "La Paz, Bolivia",                      foto: "/photos/12.jpg", canzone: "/audio/demo-02.mp3", titoloCanzone: "Altopiano",             artista: "Brano dimostrativo", anno: "2022" },
  { id: 13, titolo: "Nebbia alle sette",        luogo: "Val d'Orcia, Italia",                  foto: "/photos/13.jpg", canzone: "/audio/demo-03.mp3", titoloCanzone: "Colline",               artista: "Brano dimostrativo", anno: "2025" },
  { id: 14, titolo: "Il muro azzurro",          luogo: "Jodhpur, India",                       foto: "/photos/14.jpg", canzone: "/audio/demo-04.mp3", titoloCanzone: "Blue City",             artista: "Brano dimostrativo", anno: "2019" },
  { id: 15, titolo: "Pioggia di aprile",        luogo: "Kyoto, Giappone",                      foto: "/photos/15.jpg", canzone: "/audio/demo-05.mp3", titoloCanzone: "Ame",                   artista: "Brano dimostrativo", anno: "2022" },
  { id: 16, titolo: "Chi guarda il mare",       luogo: "Essaouira, Marocco",                   foto: "/photos/16.jpg", canzone: "/audio/demo-01.mp3", titoloCanzone: "Atlantico",             artista: "Brano dimostrativo", anno: "2019" },
  { id: 17, titolo: "Quattro sedie",            luogo: "Buenos Aires, Argentina",              foto: "/photos/17.jpg", canzone: "/audio/demo-02.mp3", titoloCanzone: "Milonga",               artista: "Brano dimostrativo", anno: "2023" },
  { id: 18, titolo: "Sotto zero",               luogo: "Islanda del Sud",                      foto: "/photos/18.jpg", canzone: "/audio/demo-03.mp3", titoloCanzone: "Glacier",               artista: "Brano dimostrativo", anno: "2021" },
  { id: 19, titolo: "La fine della strada",     luogo: "Route 66, Arizona",                    foto: "/photos/19.jpg", canzone: "/audio/demo-04.mp3", titoloCanzone: "Mother Road",           artista: "Brano dimostrativo", anno: "2023" },
  { id: 20, titolo: "Ritorno",                  luogo: "Osnago, Italia",                       foto: "/photos/20.jpg", canzone: "/audio/demo-05.mp3", titoloCanzone: "Casa",                  artista: "Brano dimostrativo", anno: "2026" },
];

/* -----------------------------------------------------------------------
 *  VOCI DEL MENU (slide da destra)
 *  Aggiungi o togli voci liberamente.
 * -------------------------------------------------------------------- */
export const MENU = [
  { etichetta: "Le fotografie", href: "/" },
  { etichetta: "La mostra", href: "/la-mostra" },
  { etichetta: "Contatti", href: "/contatti" },
];

/* -----------------------------------------------------------------------
 *  UTILITY (non serve modificarle)
 * -------------------------------------------------------------------- */

/** Numero di foto in mostra */
export const NUMERO_FOTO = FOTOGRAFIE.length;

/** Trova una fotografia dal suo id */
export function getFotografia(id: number | string): Fotografia | undefined {
  const n = typeof id === "string" ? Number.parseInt(id, 10) : id;
  if (Number.isNaN(n)) return undefined;
  return FOTOGRAFIE.find((f) => f.id === n);
}

/** Fotografia precedente / successiva secondo l'ordine dell'array */
export function getVicine(id: number) {
  const i = FOTOGRAFIE.findIndex((f) => f.id === id);
  if (i === -1) return { precedente: undefined, successiva: undefined, posizione: 0 };
  return {
    precedente: i > 0 ? FOTOGRAFIE[i - 1] : FOTOGRAFIE[FOTOGRAFIE.length - 1],
    successiva: i < FOTOGRAFIE.length - 1 ? FOTOGRAFIE[i + 1] : FOTOGRAFIE[0],
    posizione: i + 1,
  };
}

/** Numero formattato a due cifre: 1 -> "01" */
export function numeroFormattato(id: number) {
  return String(id).padStart(2, "0");
}
