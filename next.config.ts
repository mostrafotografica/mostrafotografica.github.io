import type { NextConfig } from "next";

/* Il sito viene pubblicato su GitHub Pages, che serve solo file statici.
   Il percorso base cambia a seconda di dove finisce:

     utente.github.io/nome-repo   ->  "/nome-repo"
     utente.github.io             ->  ""
     dominio personalizzato       ->  ""   (con un file public/CNAME)

   Non serve scriverlo a mano: lo calcola il workflow in
   .github/workflows/deploy.yml e lo passa qui come variabile.
   In locale resta vuoto, quindi il sito gira su http://localhost:3000/ */
const percorsoBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* Genera un sito di soli file statici nella cartella out/ */
  output: "export",

  basePath: percorsoBase,
  assetPrefix: percorsoBase || undefined,

  /* Ogni pagina diventa una cartella con dentro index.html
     (out/1/index.html): cosi' l'indirizzo del QR code funziona sia
     scritto /1 sia scritto /1/ */
  trailingSlash: true,

  images: {
    /* Senza un server Node non c'e' nessuno che possa ridimensionare le
       immagini al volo: vengono servite cosi' come sono. Tieni quindi le
       fotografie di peso ragionevole (lato lungo entro ~1600px). */
    unoptimized: true,
  },

  /* In sviluppo Next blocca (403) le richieste ai propri file JavaScript
     quando arrivano da un indirizzo diverso da localhost. Siccome questo
     sito si prova sul telefono, via IP di rete locale, quegli indirizzi
     vanno autorizzati: senza, il telefono scarica la pagina ma non il
     codice, e il sito resta immobile.
     Se il tuo computer cambia IP, aggiungilo qui. */
  allowedDevOrigins: [
    "192.168.1.34",
    "192.168.1.*",
    "192.168.*.*",
    "10.*.*.*",
    "*.local",
  ],

  /* L'indicatore di sviluppo di Next copre il tasto play del lettore:
     in locale lo togliamo di mezzo. In produzione non esiste comunque. */
  devIndicators: false,
};

export default nextConfig;
