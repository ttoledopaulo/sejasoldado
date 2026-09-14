import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { publishedNews } from "@/lib/content";

export function generateStaticParams() { return publishedNews.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { return params.then(({ slug }) => { const item = publishedNews.find((entry) => entry.slug === slug); return item ? { title: item.title, description: item.excerpt, openGraph: { images: [item.image] } } : {}; }); }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = publishedNews.find((entry) => entry.slug === slug); if (!item) notFound(); return <main><article><header className="container-page mx-auto max-w-4xl py-14 sm:py-20"><Link className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-teal hover:underline" href="/noticias"><ArrowLeft size={16}/> Todas as notícias</Link><p className="eyebrow mt-10">{item.category} <span className="ml-2 text-ink/50">{item.date}</span></p><h1 className="display mt-5 text-5xl leading-[1.02] sm:text-6xl">{item.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-ink/70">{item.excerpt}</p></header><div className="container-page"><div className="relative mx-auto aspect-[1.8] max-w-5xl overflow-hidden"><Image src={item.image} fill sizes="(max-width: 1024px) 100vw, 80vw" className="object-cover" alt={item.imageAlt}/></div></div><div className="container-page mx-auto max-w-3xl py-14 text-lg leading-9 text-ink/75">{item.body.map((paragraph) => <p className="mb-7" key={paragraph}>{paragraph}</p>)}</div></article></main>; }
