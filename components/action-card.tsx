import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import type { ProjectAction } from "@/lib/cms";

export function ActionCard({ action }: { action: ProjectAction }) {
  const image = action.cover_image_url ?? action.action_images[0]?.url;
  const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${action.action_date}T12:00:00Z`));
  return <article className="group"><Link href={`/noticias/${action.slug}`} className="focus-ring block">{image && <div className="relative aspect-[1.25] overflow-hidden"><Image src={image} alt={action.action_images[0]?.alt ?? action.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105"/></div>}<p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs font-extrabold uppercase tracking-wider text-magenta"><span className="inline-flex items-center gap-1"><CalendarDays size={13}/>{date}</span>{action.action_time && <span className="inline-flex items-center gap-1 text-ink/55"><Clock3 size={13}/>{action.action_time}</span>}</p><h3 className="mt-2 flex gap-3 text-lg font-extrabold leading-6 group-hover:text-teal"><span>{action.title}</span><ArrowUpRight className="mt-1 shrink-0" size={17}/></h3><p className="mt-3 text-sm leading-6 text-ink/65">{action.excerpt}</p></Link></article>;
}
