import { createClient } from "@supabase/supabase-js";

export type ActionImage = { id: string; url: string; alt: string | null; position: number };
export type ProjectAction = { id: string; slug: string; title: string; excerpt: string; content: string; action_date: string; action_time: string | null; location: string | null; cover_image_url: string | null; created_at: string; action_images: ActionImage[] };

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const configured = Boolean(url && key);
const client = configured ? createClient(url!, key!) : null;

export async function getPublishedActions(limit?: number): Promise<ProjectAction[]> {
  if (!client) return [];
  let query = client.from("actions").select("*, action_images(*) ").eq("status", "published").order("action_date", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return (data ?? []).map((item) => ({ ...item, action_images: (item.action_images ?? []).sort((a: ActionImage, b: ActionImage) => a.position - b.position) })) as ProjectAction[];
}

export async function getPublishedAction(slug: string): Promise<ProjectAction | null> {
  if (!client) return null;
  const { data } = await client.from("actions").select("*, action_images(*) ").eq("slug", slug).eq("status", "published").maybeSingle();
  return data ? { ...data, action_images: (data.action_images ?? []).sort((a: ActionImage, b: ActionImage) => a.position - b.position) } as ProjectAction : null;
}
