"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type LoginState = { error?: string };
export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured) return { error: "Configure o Supabase antes de entrar no painel." };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") });
  if (error) return { error: "E-mail ou senha inválidos." };
  redirect("/admin");
}

export async function logout() { const supabase = await createSupabaseServerClient(); await supabase.auth.signOut(); redirect("/admin/login"); }

export async function requireAdmin() {
  if (!isSupabaseConfigured) redirect("/admin/login?error=config");
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/admin/login?error=unauthorized");
  return { supabase, user };
}

const actionSchema = z.object({ title: z.string().min(4).max(140), excerpt: z.string().min(12).max(280), content: z.string().min(30), actionDate: z.string().date(), actionTime: z.string().optional(), location: z.string().max(160).optional(), status: z.enum(["draft", "published"]), images: z.array(z.object({ url: z.string().url(), alt: z.string().max(160).optional() })).max(10) });
const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function createAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  let images: unknown[] = [];
  try { images = JSON.parse(String(formData.get("images") ?? "[]")); } catch { return; }
  const parsed = actionSchema.safeParse({ title: formData.get("title"), excerpt: formData.get("excerpt"), content: formData.get("content"), actionDate: formData.get("actionDate"), actionTime: formData.get("actionTime") || undefined, location: formData.get("location") || undefined, status: formData.get("status"), images });
  if (!parsed.success) return;
  const value = parsed.data;
  const slug = `${slugify(value.title)}-${value.actionDate}`;
  const { data, error } = await supabase.from("actions").insert({ slug, title: value.title, excerpt: value.excerpt, content: value.content, action_date: value.actionDate, action_time: value.actionTime || null, location: value.location || null, status: value.status, cover_image_url: value.images[0]?.url ?? null }).select("id").single();
  if (error || !data) return;
  if (value.images.length) await supabase.from("action_images").insert(value.images.map((image, position) => ({ action_id: data.id, url: image.url, alt: image.alt || null, position })));
  revalidatePath("/"); revalidatePath("/noticias"); redirect("/admin?created=1");
}
