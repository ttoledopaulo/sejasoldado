"use client";

import { FormEvent, useState } from "react";

type Props = { partner?: boolean };

export function ContactForm({ partner = false }: Props) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  if (sent) return <div className="border border-lime bg-[#f4f8e9] p-7"><p className="text-lg font-extrabold">Mensagem recebida!</p><p className="mt-2 text-sm leading-6 text-ink/70">Este formulário é demonstrativo. Na versão oficial, a equipe receberá sua mensagem por um canal seguro.</p><button className="focus-ring mt-5 text-sm font-bold text-teal underline" onClick={() => setSent(false)}>Enviar outra mensagem</button></div>;
  return <form onSubmit={submit} className="grid gap-5" noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold">Nome<input required className="focus-ring border border-ink/20 bg-white px-4 py-3.5 font-normal outline-none focus:border-teal" placeholder="Seu nome" /></label><label className="grid gap-2 text-sm font-bold">E-mail<input required type="email" className="focus-ring border border-ink/20 bg-white px-4 py-3.5 font-normal outline-none focus:border-teal" placeholder="voce@email.com" /></label></div>{partner && <label className="grid gap-2 text-sm font-bold">Organização<input className="focus-ring border border-ink/20 bg-white px-4 py-3.5 font-normal outline-none focus:border-teal" placeholder="Nome da empresa ou organização" /></label>}<label className="grid gap-2 text-sm font-bold">{partner ? "Como gostaria de contribuir?" : "Mensagem"}<textarea required rows={5} className="focus-ring resize-y border border-ink/20 bg-white px-4 py-3.5 font-normal outline-none focus:border-teal" placeholder={partner ? "Conte um pouco sobre a possibilidade de parceria." : "Como podemos ajudar?"}/></label><button className="button-primary focus-ring w-fit" type="submit">{partner ? "Quero conversar" : "Enviar mensagem"}</button></form>;
}
