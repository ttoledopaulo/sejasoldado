"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [{ href: "/", label: "Início" }, { href: "/noticias", label: "Notícias" }, { href: "/contato", label: "Contato" }];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur"><div className="container-page flex h-20 items-center justify-between"><Link aria-label="Soldados Valorosos, página inicial" href="/" className="focus-ring"><Image src="/logo-soldados-valorosos.png" width={165} height={90} className="h-14 w-auto" alt="Soldados Valorosos" priority /></Link><nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">{links.map((link) => <Link key={link.href} className="focus-ring text-sm font-bold hover:text-teal" href={link.href}>{link.label}</Link>)}<Link className="button-primary focus-ring !py-3" href="/seja-parceiro">Seja parceiro</Link></nav><button onClick={() => setOpen(!open)} className="focus-ring p-2 md:hidden" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X/> : <Menu/>}</button></div>{open && <nav className="container-page border-t border-ink/10 py-5 md:hidden" aria-label="Navegação móvel">{links.map((link) => <Link onClick={() => setOpen(false)} key={link.href} className="focus-ring block py-3 font-bold" href={link.href}>{link.label}</Link>)}<Link onClick={() => setOpen(false)} className="button-primary focus-ring mt-3" href="/seja-parceiro">Seja parceiro</Link></nav>}</header>;
}
