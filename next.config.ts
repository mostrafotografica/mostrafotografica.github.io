import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* L'indicatore di sviluppo di Next copre il tasto play del lettore:
     in locale lo togliamo di mezzo. In produzione non esiste comunque. */
  devIndicators: false,

  images: {
    /* Le foto mockup arrivano da internet. Quando metterai i tuoi file
       in /public/photos non servira' piu' nulla: i percorsi locali
       funzionano gia' cosi' come sono. */
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
