import { requireAdmin } from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin-action-form";
export default async function NewActionPage() { await requireAdmin(); return <main className="container-page py-14"><p className="eyebrow">Painel administrativo</p><h1 className="display mt-3 text-5xl">Publicar uma ação</h1><p className="mt-4 max-w-2xl leading-7 text-ink/65">As imagens são convertidas para WebP e enviadas direto para o armazenamento da Vercel.</p><AdminActionForm/></main>; }
