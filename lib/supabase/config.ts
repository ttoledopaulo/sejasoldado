const projectUrl = "https://lfsymmggwtkgsmkpedfy.supabase.co";
const publishableKey = "sb_publishable_nLh3uaWjzYUVzpwYbhozTg_WQN6MmQv";

// The publishable key is intentionally safe for the browser. Environment
// variables take precedence, while these values keep server actions working
// if Vercel does not expose NEXT_PUBLIC_* to a runtime function.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? projectUrl;
export const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  publishableKey;
