"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Heart, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { pixCode, pixKeyFormatted } from "@/lib/pix";

export function PixDonation({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => { if (open) closeButton.current?.focus(); }, [open]);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, []);

  async function copyPix() {
    await navigator.clipboard.writeText(pixCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return <>
    <button className={compact ? "focus-ring inline-flex items-center gap-2 border border-magenta/25 bg-[#fff4f8] px-3 py-2.5 text-sm font-extrabold text-magenta transition hover:bg-magenta hover:text-white" : "button-primary focus-ring !bg-magenta hover:!bg-[#a6175d]"} onClick={() => setOpen(true)}><Heart className={compact ? "fill-magenta/10" : ""} size={17}/>{compact ? "Fazer uma doação" : "Quero fazer uma doação"}</button>
    {open && <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/75 p-4" role="presentation" onMouseDown={() => setOpen(false)}>
      <section className="relative w-full max-w-md bg-paper p-7 shadow-2xl sm:p-9" role="dialog" aria-modal="true" aria-labelledby="pix-title" onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeButton} onClick={() => setOpen(false)} className="focus-ring absolute right-4 top-4 p-2 text-ink/70 hover:text-ink" aria-label="Fechar doação"><X size={21}/></button>
        <p className="eyebrow">Doação via Pix</p><h2 id="pix-title" className="display mt-3 text-4xl leading-tight">O seu apoio chega onde importa.</h2>
        <p className="mt-4 text-sm leading-6 text-ink/70">Aponte a câmera do aplicativo do seu banco para o QR Code ou copie o código Pix abaixo.</p>
        <div className="mx-auto mt-7 grid w-fit place-items-center border-8 border-white bg-white p-2 shadow-sm"><QRCodeSVG value={pixCode} size={190} level="M" includeMargin /></div>
        <p className="mt-6 text-center text-xs font-bold text-ink/55">Chave Pix: CNPJ {pixKeyFormatted}</p>
        <button onClick={copyPix} className="focus-ring mt-4 flex w-full items-center justify-center gap-2 border border-teal bg-white px-4 py-3 text-sm font-extrabold text-teal transition hover:bg-[#edf4ee]">{copied ? <><Check size={17}/> Código Pix copiado</> : <><Copy size={17}/> Copiar código Pix</>}</button>
        <p className="mt-5 text-center text-xs leading-5 text-ink/50">A doação não tem valor fixo. Qualquer ajuda fortalece a próxima ação.</p>
      </section>
    </div>}
  </>;
}
