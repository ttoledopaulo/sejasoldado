create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.actions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  action_date date not null,
  action_time time,
  location text,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create table public.action_images (
  id uuid primary key default gen_random_uuid(),
  action_id uuid not null references public.actions(id) on delete cascade,
  url text not null,
  alt text,
  position integer not null default 0
);

alter table public.admin_users enable row level security;
alter table public.actions enable row level security;
alter table public.action_images enable row level security;

create policy "published actions are public" on public.actions for select using (status = 'published');
create policy "published action images are public" on public.action_images for select using (exists (select 1 from public.actions where actions.id = action_images.action_id and actions.status = 'published'));
create policy "admins manage actions" on public.actions for all to authenticated using (exists (select 1 from public.admin_users where admin_users.user_id = auth.uid())) with check (exists (select 1 from public.admin_users where admin_users.user_id = auth.uid()));
create policy "admins manage images" on public.action_images for all to authenticated using (exists (select 1 from public.admin_users where admin_users.user_id = auth.uid())) with check (exists (select 1 from public.admin_users where admin_users.user_id = auth.uid()));
create policy "admins read own role" on public.admin_users for select to authenticated using (user_id = auth.uid());
