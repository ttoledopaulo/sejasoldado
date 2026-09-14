import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await request.json() as HandleUploadBody;
    const response = await handleUpload({ body, request, onBeforeGenerateToken: async () => ({ allowedContentTypes: ["image/jpeg", "image/png", "image/webp"], maximumSizeInBytes: 12 * 1024 * 1024, addRandomSuffix: true }), onUploadCompleted: async () => {} });
    return NextResponse.json(response);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 400 }); }
}
