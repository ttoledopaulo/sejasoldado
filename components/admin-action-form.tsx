"use client";

import imageCompression from "browser-image-compression";
import { upload } from "@vercel/blob/client";
import { FormEvent, useState } from "react";
import { createAction } from "@/app/admin/actions";

type UploadedImage = { url: string; alt: string };
export function AdminActionForm() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  async function addImages(event: FormEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []); if (!files.length) return;
    setUploading(true); setError("");
    try {
      const created = await Promise.all(files.slice(0, 10 - images.length).map(async (file) => {
        const compressed = await imageCompression(file, { maxSizeMB: 0.8, maxWidthOrHeight: 1920, fileType: "image/webp", useWebWorker: true });
        const name = `acoes/${crypto.randomUUID()}.webp`;
        const result = await upload(name, compressed, { access: "public", handleUploadUrl: "/api/admin/upload" });
        return { url: result.url, alt: "" };
      }));
      setImages((current) => [...current, ...created]);
    } catch { setError("Não foi possível enviar uma ou mais fotos. Verifique a configuração do Blob e tente novamente."); }
    finally { setUploading(false); event.currentTarget.value = ""; }
  }
  return <form action={createAction} className="mt-10 grid max-w-3xl gap-6 border border-ink/10 bg-white p-7 sm:p-10"><label className="grid gap-2 text-sm font-bold">Título<input required name="title" maxLength={140} className="focus-ring border border-ink/20 px-4 py-3 font-normal outline-none focus:border-teal" placeholder="Ex.: Grande ação de quinta-feira"/></label><label className="grid gap-2 text-sm font-bold">Resumo<input required name="excerpt" maxLength={280} className="focus-ring border border-ink/20 px-4 py-3 font-normal outline-none focus:border-teal" placeholder="Uma frase curta sobre o que aconteceu."/></label><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold">Data<input required name="actionDate" type="date" className="focus-ring border border-ink/20 px-4 py-3 font-normal outline-none focus:border-teal"/></label><label className="grid gap-2 text-sm font-bold">Horário<input name="actionTime" type="time" className="focus-ring border border-ink/20 px-4 py-3 font-normal outline-none focus:border-teal"/></label></div><label className="grid gap-2 text-sm font-bold">Local<input name="location" maxLength={160} className="focus-ring border border-ink/20 px-4 py-3 font-normal outline-none focus:border-teal" placeholder="Ex.: Baixada Santista"/></label><label className="grid gap-2 text-sm font-bold">O que aconteceu?<textarea required name="content" rows={8} className="focus-ring resize-y border border-ink/20 px-4 py-3 font-normal outline-none focus:border-teal" placeholder="Conte a história da ação, das pessoas e do impacto daquele dia."/></label><div><p className="text-sm font-bold">Fotos da ação</p><p className="mt-1 text-sm text-ink/60">Até 10 imagens. Elas serão convertidas para WebP antes do envio.</p><input onInput={addImages} disabled={uploading || images.length >= 10} className="focus-ring mt-3 block text-sm" type="file" accept="image/jpeg,image/png,image/webp" multiple/>{uploading && <p className="mt-3 text-sm font-bold text-teal">Otimizando e enviando imagens...</p>}{error && <p className="mt-3 text-sm text-magenta">{error}</p>}<div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{images.map((image, index) => <div className="relative" key={image.url}><img className="aspect-square w-full object-cover" src={image.url} alt="Prévia da ação"/><button type="button" onClick={() => setImages((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-1 top-1 bg-ink px-2 py-1 text-xs font-bold text-white">Remover</button></div>)}</div></div><input type="hidden" name="images" value={JSON.stringify(images)}/><label className="grid gap-2 text-sm font-bold">Status<select name="status" defaultValue="published" className="focus-ring border border-ink/20 bg-white px-4 py-3 font-normal outline-none focus:border-teal"><option value="published">Publicar agora</option><option value="draft">Salvar rascunho</option></select></label><button disabled={uploading} className="button-primary focus-ring w-fit disabled:opacity-60">{uploading ? "Aguarde o upload" : "Salvar ação"}</button></form>;
}
