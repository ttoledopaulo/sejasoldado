import type { MetadataRoute } from "next";
import { news } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://soldados-valorosos.vercel.app"; return ["", "/noticias", "/contato", "/seja-parceiro", ...news.map(({ slug }) => `/noticias/${slug}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : .7 })); }
