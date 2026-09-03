import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FOTOGRAFIE, getFotografia, getVicine } from "@/config/mostra";
import Opera from "@/components/Opera";
import { percorso } from "@/lib/percorsi";

type Props = { params: Promise<{ id: string }> };

/** Una pagina statica per ogni fotografia: /1, /2, ... */
export function generateStaticParams() {
  return FOTOGRAFIE.map((f) => ({ id: String(f.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const opera = getFotografia(id);
  if (!opera) return { title: "Opera non trovata" };
  return {
    title: opera.titolo,
    description: `${opera.titolo} — ${opera.luogo}. Musica: ${opera.titoloCanzone}.`,
    openGraph: { images: [percorso(opera.foto)] },
  };
}

export default async function PaginaOpera({ params }: Props) {
  const { id } = await params;
  const opera = getFotografia(id);
  if (!opera) notFound();

  const { precedente, successiva } = getVicine(opera.id);
  return <Opera opera={opera} precedente={precedente} successiva={successiva} />;
}
