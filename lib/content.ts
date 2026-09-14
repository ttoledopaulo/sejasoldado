export type NewsItem = { slug: string; title: string; excerpt: string; date: string; category: string; image: string; imageAlt: string; body: string[] };

export const stats = [
  { value: "+1.500", label: "pessoas alcançadas em ações demonstrativas" },
  { value: "12", label: "ações comunitárias demonstrativas" },
  { value: "1", label: "propósito em comum: cuidar" },
];

export const pillars = [
  { title: "Acolhimento", description: "Criamos espaços de escuta e apoio para quem precisa ser visto, ouvido e cuidado." },
  { title: "Dignidade", description: "Mobilizamos a comunidade para ampliar o acesso a recursos, direitos e oportunidades." },
  { title: "Transformação", description: "Acreditamos em ações contínuas que fortalecem vínculos e abrem novos horizontes." },
];

export const news: NewsItem[] = [
  { slug: "dia-de-cuidado-e-comunidade", title: "Um dia de cuidado, encontro e comunidade", excerpt: "Uma ação demonstrativa reuniu pessoas e histórias em torno da solidariedade.", date: "18 de agosto de 2026", category: "Ações", image: "https://images.unsplash.com/photo-1494386346843-e12284507169?auto=format&fit=crop&w=1000&q=85", imageAlt: "Pessoas sorrindo em uma reunião comunitária", body: ["Esta é uma notícia demonstrativa criada para apresentar a estrutura editorial do site. Em breve, este espaço poderá registrar as ações, conquistas e histórias reais do Soldados Valorosos.", "Acreditamos que transformar uma comunidade começa por criar oportunidades de encontro, escuta e cuidado. Cada iniciativa só ganha força quando muitas pessoas decidem caminhar juntas."] },
  { slug: "voluntariado-que-move", title: "Voluntariado que move novas possibilidades", excerpt: "Conheça como a presença de quem soma faz diferença em cada ação.", date: "02 de agosto de 2026", category: "Comunidade", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=85", imageAlt: "Grupo de voluntários em atividade", body: ["Conteúdo demonstrativo. Aqui será publicada uma reportagem sobre a participação de voluntários nas atividades da associação.", "A colaboração é uma das formas mais potentes de cuidado. Tempo, conhecimento e disposição para ajudar podem abrir caminhos importantes."] },
  { slug: "rede-de-apoio", title: "Quando uma rede de apoio se torna caminho", excerpt: "Parcerias e escuta fortalecem as respostas que uma comunidade constrói.", date: "16 de julho de 2026", category: "Parcerias", image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1000&q=85", imageAlt: "Pessoas reunidas conversando", body: ["Conteúdo demonstrativo. Este formato foi pensado para dar visibilidade a parceiros e iniciativas que fortalecem a missão do projeto.", "Mais do que apoios isolados, uma rede consistente cria condições para que boas ideias cheguem mais longe."] },
  { slug: "escuta-que-transforma", title: "Escuta que também transforma", excerpt: "Uma conversa pode ser o início de um novo recomeço.", date: "28 de junho de 2026", category: "Histórias", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85", imageAlt: "Duas pessoas conversando", body: ["Conteúdo demonstrativo para uma futura história do projeto. As publicações poderão conter depoimentos autorizados, registros de ações e informações de interesse da comunidade."] },
  { slug: "juntos-pela-comunidade", title: "Juntos pela comunidade", excerpt: "Ações coletivas mostram que solidariedade é uma prática cotidiana.", date: "11 de junho de 2026", category: "Ações", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=85", imageAlt: "Pessoas em trabalho voluntário", body: ["Conteúdo demonstrativo. Esta página poderá receber registros de campanhas e atividades realizadas pelo Soldados Valorosos."] },
  { slug: "novos-caminhos", title: "Novos caminhos começam com presença", excerpt: "Conheça a importância de apoiar iniciativas de cuidado contínuo.", date: "30 de maio de 2026", category: "Comunidade", image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=85", imageAlt: "Crianças em atividade ao ar livre", body: ["Conteúdo demonstrativo. Uma notícia como esta pode divulgar próximas atividades, mobilizações e formas de participação."] },
];

export const latestNews = news.slice(0, 3);
