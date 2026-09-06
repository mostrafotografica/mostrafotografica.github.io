/**
 * IL LUCCHETTO DEL SITO
 * ---------------------------------------------------------------------------
 * Il sito e' un export statico: nessun server, quindi nessun controllo vero.
 * Questo file tiene insieme le poche regole del "cancello" (vedi il blocco
 * ACCESSO in config/mostra.ts per il perche' e per la password).
 *
 * Il pezzo importante e' `scriptAccesso()`: il codice che gira nel <head>,
 * PRIMA del primo disegno della pagina. Decide subito se questa visita puo'
 * entrare e scrive l'esito su <html data-accesso="si|no">. Da li' in poi due
 * righe di CSS (app/globals.css) mostrano il sito oppure il riquadro della
 * password, senza mai far lampeggiare l'uno al posto dell'altro.
 */

import { ACCESSO } from "@/config/mostra";

/** Dove il telefono si ricorda che l'accesso e' gia' avvenuto. */
export const CHIAVE = "frammenti:accesso";

/** Confronto tollerante: spazi ai lati e maiuscole non contano. */
export function normalizza(testo: string) {
  return testo.trim().toLowerCase();
}

/** Password attesa, gia' normalizzata. Stringa vuota = lucchetto disattivato. */
export const PAROLA = normalizza(ACCESSO.password);

/** Il sito e' protetto? (con `password: ""` in config non lo e') */
export const PROTETTO = PAROLA.length > 0;

/** Il tentativo scritto nel riquadro e' quello giusto? */
export function passwordGiusta(tentativo: string) {
  return normalizza(tentativo) === PAROLA;
}

/** Segna su questo telefono che l'accesso e' avvenuto. */
export function ricorda() {
  try {
    localStorage.setItem(CHIAVE, PAROLA);
  } catch {
    /* Navigazione privata o memoria piena: pazienza, si richiedera' la
       password alla prossima apertura. Meglio questo che una pagina rotta. */
  }
}

/**
 * Codice inline per il <head>. Deve restare JavaScript semplice e
 * autosufficiente: gira prima di React, prima di qualsiasi import.
 *
 * Se qualcosa va storto non scrive nulla su <html>: l'attributo resta
 * assente e il CSS, per prudenza, mostra il riquadro della password.
 */
export function scriptAccesso() {
  const parola = JSON.stringify(PAROLA);
  const parametro = JSON.stringify(ACCESSO.parametro);
  const chiave = JSON.stringify(CHIAVE);

  return (
    "try{var h=document.documentElement;var w=" +
    parola +
    ";" +
    /* Nessuna password impostata: porta sempre aperta. */
    'if(!w){h.dataset.accesso="si"}else{var ok=false;' +
    "var u=new URL(location.href);var v=u.searchParams.get(" +
    parametro +
    ");" +
    /* 1. La password arriva dall'indirizzo (?p=...): entra e la nasconde. */
    "if(v&&v.trim().toLowerCase()===w){ok=true;" +
    "try{localStorage.setItem(" +
    chiave +
    ",w)}catch(e){}" +
    "u.searchParams.delete(" +
    parametro +
    ");" +
    'history.replaceState(null,"",u.pathname+u.search+u.hash)}' +
    /* 2. Altrimenti: e' gia' entrato da questo telefono? */
    "else{try{ok=localStorage.getItem(" +
    chiave +
    ")===w}catch(e){}}" +
    'h.dataset.accesso=ok?"si":"no"}}catch(e){}'
  );
}
