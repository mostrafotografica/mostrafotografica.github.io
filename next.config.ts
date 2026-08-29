import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* In sviluppo Next blocca (403) le richieste ai propri file JS quando
     arrivano da un indirizzo diverso da localhost. Siccome questo sito si
     prova sul telefono, via IP di rete locale, quegli indirizzi vanno
     autorizzati: senza, il telefono scarica la pagina ma non il codice,
     e il sito resta immobile.
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

  images: {
    /* Le foto stanno in /public/photos, quindi non servirebbe nulla.
       Questi domini restano permessi nel caso tu voglia puntare una
       fotografia direttamente a un indirizzo web. */
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
