-- Supabase Migration for Zefanya Zulian Executive Platform
-- Creates tables, Row Level Security (RLS) policies, and storage configurations

-- 1. Create Portfolio Data Table
create table if not exists public.portfolio_data (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.portfolio_data enable row level security;

-- Policies: Anyone can read published portfolio data
create policy "Allow public read access to portfolio_data"
  on public.portfolio_data for select
  using (true);

-- Only authenticated users (admins) can modify portfolio data
create policy "Allow service role or authenticated write to portfolio_data"
  on public.portfolio_data for all
  using (auth.role() = 'authenticated' or auth.role() = 'service_role')
  with check (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- 2. Create Inquiries Table (Contact Form submissions)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  received_at timestamptz default now(),
  read boolean default false
);

alter table public.inquiries enable row level security;

-- Public can submit inquiries
create policy "Allow public insert to inquiries"
  on public.inquiries for insert
  with check (true);

-- Only authenticated admins can view inquiries
create policy "Allow admin read access to inquiries"
  on public.inquiries for select
  using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- 3. Storage Configuration
-- Create storage bucket for assets if not exists
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

create policy "Public Access to Portfolio Assets"
  on storage.objects for select
  using ( bucket_id = 'portfolio-assets' );

create policy "Admin Upload Access to Portfolio Assets"
  on storage.objects for insert
  with check (
    bucket_id = 'portfolio-assets'
    and (auth.role() = 'authenticated' or auth.role() = 'service_role')
  );
