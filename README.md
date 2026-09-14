# Soldados Valorosos

Site institucional do Projeto Soldados Valorosos.

## Painel de ações

O painel em `/admin` publica ações com fotos WebP, data, hora e relato. As fotos vão para o Vercel Blob; os dados e o login ficam no Supabase.

### Configuração gratuita

1. No Supabase, crie um projeto gratuito e execute o conteúdo de `supabase/schema.sql` no SQL Editor.
2. Em **Authentication > Users**, crie o usuário administrador. Depois, execute no SQL Editor: `insert into public.admin_users (user_id) values ('ID_DO_USUARIO');`.
3. No painel da Vercel, crie um Blob Store público e conecte-o ao projeto.
4. Configure as variáveis de `.env.example` localmente e na Vercel. O Blob adiciona `BLOB_READ_WRITE_TOKEN` automaticamente quando é conectado ao projeto.
5. Em Supabase Authentication, configure a URL do site e desabilite novos cadastros públicos.

Após o deploy, entre em `/admin/login` com o usuário criado no Supabase.
