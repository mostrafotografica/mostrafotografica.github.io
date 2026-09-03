/* =============================================================================
 *  CONFIGURAZIONE DELLA MOSTRA
 *  -----------------------------------------------------------------------
 *  Questo e' l'UNICO file da modificare per gestire i contenuti del sito.
 *  Non serve toccare altro codice.
 *
 *  COME AGGIUNGERE / MODIFICARE UNA FOTO
 *  1. Metti il file immagine in      ->  /public/photos/   (es. 21.webp)
 *  2. Metti il file audio in         ->  /public/audio/    (es. Titolo.m4a)
 *  3. Aggiungi o modifica una voce nell'array FOTOGRAFIE qui sotto:
 *
 *       {
 *         id: 21,                            // numero in mostra (usato nell'URL: /21)
 *         titolo: "Titolo della foto",
 *         luogo: "Luogo dello scatto",
 *         foto: "/photos/21.webp",           // percorso file foto
 *         canzone: "/audio/Titolo brano.m4a",// percorso file canzone
 *         titoloCanzone: "Titolo brano",
 *         artista: "Nome artista",           // opzionale
 *       }
 *
 *  Il NUMERO DI FOTO e' semplicemente quante voci ci sono nell'array:
 *  aggiungi una voce = una foto in piu', togli una voce = una foto in meno.
 *  Gli `id` devono essere unici. L'ordine dell'array e' l'ordine in home.
 *
 *  NOMI DEI FILE: vanno copiati QUI ESATTAMENTE come sono sul disco.
 *  Spazi, parentesi e accenti vanno bene (ci pensa il browser a codificarli),
 *  ma attenzione a una trappola: i file esportati da Music/iTunes su Mac
 *  possono avere gli accenti "scomposti" (e + accento) invece che precomposti.
 *  Sul Mac funziona lo stesso, su GitHub Pages (Linux) darebbe 404. Se un
 *  brano accentato non parte una volta pubblicato, e' quasi sempre questo:
 *  rinomina il file riscrivendo l'accento a mano.
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
  titolo: "I MIEI FRAMMENTI DI MONDO",
  autrice: "Elisabetta Gonella",
  sottotitolo: "Mostra fotografica",
  luogo: "Spazio Aperto - Via Roma 6, Osnago (LC)",
  anno: "Settembre 2026",

  /** Testo introduttivo mostrato in home sotto il titolo */
  introduzione:
    "Venti fotografie, venti frammenti raccolti in giro per il mondo. " +
    "Ogni immagine ha una sua musica: indossa gli auricolari, guarda il numero sotto alla foto e ascolta.",

  /** Testo della pagina “La mostra” */
  testoMostra: [
    "Ogni viaggio lascia dei frammenti: una luce, un rumore, una strada percorsa una sola volta. " +
      "Questa mostra prova a rimetterli insieme.",
    "Sotto a ogni fotografia trovi un numero che riconduce alla canzone di riferimento. " +
      "Clicca sul numero di riferimento qui per ascoltare la canzone collegata all'immagine",
    "Ti consigliamo di portare con te smartphone e auricolari: la mostra si guarda, ma soprattutto si ascolta.",
  ],

  /** Info pratiche mostrate nella pagina “La mostra” */
  informazioni: [
    { voce: "Inaugurazione", valore: "11 settembre, ore 19.00 - 21.00" },
    { voce: "Aperture", valore: "12-13 e 19-20 settembre" },
    { voce: "Orari", valore: "10.00 - 12.00 / 16.00 - 19.00" },
    { voce: "Ingresso", valore: "Libero" },
  ],

  /** Contatti mostrati nel menu e nella pagina “Contatti” */
  contatti: {
    email: "betty.go1959@gmail.com",
    sito: { etichetta: "spazioaperto.org", url: "https://www.spazioaperto.org" },
    telefono: {etichetta:"360786107", url: "tel:+39360786107"},
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
 *  Ogni voce collega una fotografia di /public/photos al suo brano in
 *  /public/audio. I percorsi riportano il NOME ESATTO del file, spazi e
 *  accenti compresi: se rinomini un file qui va aggiornato di conseguenza.
 * -------------------------------------------------------------------- */
export const FOTOGRAFIE: Fotografia[] = [
  {
    id: 1,
    titolo: "...POI ESCE IL SOLE",
    luogo: "San Francisco",
    foto: "/photos/1.webp",
    canzone: "/audio/1-07 Morning Has Broken.m4a",
    titoloCanzone: "Morning has broken",
    artista: "Cat Stevens",
    anno: "2024",
  },
  {
    id: 2,
    titolo: "IL FASCINO DEI PLATANI",
    luogo: "Barcellona",
    foto: "/photos/2.webp",
    canzone: "/audio/2-01 Sorry Seems to Be the Hardest Word.m4a",
    titoloCanzone: "Sorry seems to be the hardest word",
    artista: "Elton John",
    anno: "2023",
  },
  {
    id: 3,
    titolo: "RIFLESSIONI",
    luogo: "Florida",
    foto: "/photos/3.webp",
    canzone: "/audio/02 Ti ho voluto bene veramente.m4a",
    titoloCanzone: "Ti ho voluto bene veramente",
    artista: "Marco Mengoni",
    anno: "2023",
  },
  {
    id: 4,
    titolo: "SUA MAESTA",
    luogo: "Cuba",
    foto: "/photos/4.webp",
    canzone: "/audio/07 Cosa Sarà.m4a",
    titoloCanzone: "Cosa sarà",
    artista: "Lucio Dalla",
    anno: "2022",
  },
  {
    id: 5,
    titolo: "MEGLIO SOLI...",
    luogo: "Toscana",
    foto: "/photos/5.webp",
    canzone: "/audio/01 The Sound of Silence.m4a",
    titoloCanzone: "The sound of silence",
    artista: "Simon & Garfunkel",
    anno: "2022",
  },
  {
    id: 6,
    titolo: "C’ERA UNA VOLTA",
    luogo: "Cuba",
    foto: "/photos/6.webp",
    canzone: "/audio/1-12 Earth Song.m4a",
    titoloCanzone: "Earth song",
    artista: "Michael Jackson",
    anno: "2019",
  },
  {
    id: 7,
    titolo: "UN’AVVENTURA",
    luogo: "Marocco",
    foto: "/photos/7.webp",
    canzone: "/audio/2-07 Buon viaggio (Share the Love) [Remastered].m4a",
    titoloCanzone: "Buon viaggio",
    artista: "Cesare Cremonini",
    anno: "2019",
  },
  {
    id: 8,
    titolo: "INSHALLAH",
    luogo: "Marocco",
    foto: "/photos/8.webp",
    canzone: "/audio/03 Mishaela.m4a",
    titoloCanzone: "Mishaela",
    artista: "Noa",
    anno: "2021",
  },
  {
    id: 9,
    titolo: "ORO IN CAMPAGNA",
    luogo: "Toscana",
    foto: "/photos/9.webp",
    canzone: "/audio/06 Pensieri e parole.m4a",
    titoloCanzone: "Pensieri e parole",
    artista: "Lucio Battisti",
    anno: "2024",
  },
  {
    id: 10,
    titolo: "TRA LA TERRA E IL CIELO",
    luogo: "Vietnam",
    foto: "/photos/10.webp",
    canzone: "/audio/06 Merry Christmas Mr. Lawrence (Version for Piano Trio).m4a",
    titoloCanzone: "Merry Christmas Mr. Lawrence",
    artista: "Ryūichi Sakamoto",
    anno: "2018",
  },
  {
    id: 11,
    titolo: "LIBRI TESSUTI A MANO",
    luogo: "Giordania",
    foto: "/photos/11.webp",
    canzone: "/audio/02 Desert Rose.m4a",
    titoloCanzone: "Desert Rose",
    artista: "Sting",
    anno: "2020",
  },
  {
    id: 12,
    titolo: "ROSSO NAVAJO",
    luogo: "Arizona",
    foto: "/photos/12.webp",
    canzone: "/audio/05 A Horse With No Name.m4a",
    titoloCanzone: "Horse with no name",
    artista: "America",
    anno: "2022",
  },
  {
    id: 13,
    titolo: "DISEGNI DEL VENTO",
    luogo: "Namibia",
    foto: "/photos/13.webp",
    canzone: "/audio/11 Fragile (My Songs Version).m4a",
    titoloCanzone: "Fragile",
    artista: "Sting",
    anno: "2025",
  },
  {
    id: 14,
    titolo: "IL GIORNO CHE FINISCE",
    luogo: "Namibia",
    foto: "/photos/14.webp",
    canzone: "/audio/01 Imagine.m4a",
    titoloCanzone: "Imagine",
    artista: "John Lennon",
    anno: "2019",
  },
  {
    id: 15,
    titolo: "IL TE NEL DESERTO",
    luogo: "Libia",
    foto: "/photos/15.webp",
    canzone: "/audio/01 I Don_t Know.m4a",
    titoloCanzone: "I don’t know",
    artista: "Noa",
    anno: "2022",
  },
  {
    id: 16,
    titolo: "UN VIAGGIO INSIEME",
    luogo: "Namibia",
    foto: "/photos/16.webp",
    canzone: "/audio/10 Father and Son.m4a",
    titoloCanzone: "Father and son",
    artista: "Cat Stevens",
    anno: "2019",
  },
  {
    id: 17,
    titolo: "NO STRESS",
    luogo: "Florida",
    foto: "/photos/17.webp",
    canzone: "/audio/01 Summer On A Solitary Beach (Remastered 2021).m4a",
    titoloCanzone: "Summer on a solitary beach",
    artista: "Franco Battiato",
    anno: "2023",
  },
  {
    id: 18,
    titolo: "CONTRO CORRENTE",
    luogo: "Nizza",
    foto: "/photos/18.webp",
    canzone: "/audio/02 C_è chi dice no.m4a",
    titoloCanzone: "C’è chi dice no",
    artista: "Vasco Rossi",
    anno: "2021",
  },
  {
    id: 19,
    titolo: "CELESTE",
    luogo: "Cuba",
    foto: "/photos/19.webp",
    canzone: "/audio/01 Chan Chan.m4a",
    titoloCanzone: "Chan Chan",
    artista: "Buena Vista Social Club",
    anno: "2023",
  },
  {
    id: 20,
    titolo: "NON SOLO SPINE",
    luogo: "Provenza",
    foto: "/photos/20.webp",
    canzone: "/audio/01 Dimanche Midi Pile.m4a",
    titoloCanzone: "Dimanche midi pile",
    artista: "Gisèle",
    anno: "2026",
  },
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
