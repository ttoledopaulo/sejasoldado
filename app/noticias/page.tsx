import type { Metadata } from "next";
import { NewsCard } from "@/components/news-card";
import { news } from "@/lib/content";

export const metadata: Metadata = { title: "Notícias", description: "Acompanhe as ações, histórias e novidades do Soldados Valorosos." };

export default function NewsPage() { return <main><section className="bg-teal-deep text-white"><div className="container-page py-20 sm:py-28"><p className="eyebrow !text-lime">Acontece por aqui</p><h1 className="display mt-4 text-5xl sm:text-6xl">Notícias</h1><p className="mt-5 max-w-xl leading-8 text-white/75">Histórias, ações e encontros que ajudam a contar a caminhada do Soldados Valorosos.</p></div></section><section className="container-page py-16 sm:py-24"><p className="mb-10 text-sm text-ink/60">Todos os conteúdos abaixo são demonstrativos nesta primeira versão do site.</p><div className="grid gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">{news.map((item) => <NewsCard key={item.slug} news={item}/>)}</div></section></main>; }
