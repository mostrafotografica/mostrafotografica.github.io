import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { MOSTRA } from "@/config/mostra";
import Accesso from "@/components/Accesso";
import Header from "@/components/Header";
import ScrollMorbido from "@/components/ScrollMorbido";
import { scriptAccesso } from "@/lib/accesso";
import "./globals.css";

const displayFont = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${MOSTRA.titolo} — ${MOSTRA.autrice}`,
    template: `%s — ${MOSTRA.titolo}`,
  },
  description: MOSTRA.introduzione,
  openGraph: {
    title: `${MOSTRA.titolo} — ${MOSTRA.autrice}`,
    description: MOSTRA.introduzione,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* suppressHydrationWarning: lo script qui sotto scrive data-anima su <html>
       prima che React si idrati, quindi server e client differiscono di
       proposito. Vale solo per gli attributi di questo elemento. */
    <html
      lang="it"
      className={`${displayFont.variable} ${sansFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Decide PRIMA del primo disegno se questa visita puo' entrare, e
            scrive l'esito su <html data-accesso>. Due righe di CSS in
            globals.css fanno il resto: chi ha gia' il permesso non vede mai
            il riquadro della password, chi non ce l'ha non vede mai il sito.
            Il perche' di tutto questo e' spiegato in lib/accesso.ts. */}
        <script dangerouslySetInnerHTML={{ __html: scriptAccesso() }} />

        {/* Decide PRIMA del primo disegno se questa visita puo' essere animata.
            Se la pagina viene aperta in secondo piano (scheda nascosta, anteprima
            non in primo piano) il ticker di GSAP resta fermo: in quel caso non
            nascondiamo nulla e il sito si vede comunque, semplicemente statico. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var h=document.documentElement;' +
              'if(document.visibilityState!=="hidden"){h.dataset.anima="si";' +
              // rete di sicurezza: se il codice delle animazioni non arriva
              // (rete lenta, script bloccato) si mostra tutto lo stesso.
              'setTimeout(function(){if(h.dataset.animaViva!=="si"){delete h.dataset.anima}},5000)}}catch(e){}',
          }}
        />
      </head>
      <body className="antialiased">
        <Accesso>
          <ScrollMorbido>
            <Header />
            <main id="contenuto">{children}</main>
          </ScrollMorbido>
        </Accesso>
      </body>
    </html>
  );
}
