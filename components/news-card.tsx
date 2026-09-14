import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/lib/content";

export function NewsCard({ news }: { news: NewsItem }) { return <article className="group"><Link href={`/noticias/${news.slug}`} className="focus-ring block"><div className="relative aspect-[1.25] overflow-hidden"><Image src={news.image} alt={news.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105"/></div><p className="mt-5 text-xs font-extrabold uppercase tracking-wider text-magenta">{news.category} <span className="ml-2 text-ink/45">{news.date}</span></p><h3 className="mt-2 flex gap-3 text-lg font-extrabold leading-6 group-hover:text-teal"><span>{news.title}</span><ArrowUpRight className="mt-1 shrink-0" size={17}/></h3><p className="mt-3 text-sm leading-6 text-ink/65">{news.excerpt}</p></Link></article>; }
