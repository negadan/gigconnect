-- Create pgcrypto extension for uuid generation
create extension if not exists "pgcrypto";

-- Create profiles table
create table profiles (
  id uuid primary key references auth.users(id) not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  skills text[],
  interests text[],
  availability text,
  location_area text
);

-- Enable row level security on profiles
alter table profiles enable row level security;

create policy "Users can select their own profile." on profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on profiles
  for update using (auth.uid() = id);

-- Create gigs table
create table gigs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  poster_user_id uuid not null references auth.users(id),
  title text,
  description text,
  skills_required text[],
  location_area text,
  price_zar numeric(10,2) check (price_zar <= 1000.00),
  status text default 'open'
);

-- Enable row level security on gigs
alter table gigs enable row level security;

create policy "Authenticated users can select open gigs." on gigs
  for select using (status = 'open');

create policy "Users can insert their own gigs." on gigs
  for insert with check (auth.uid() = poster_user_id);

create policy "Users can update their own gigs." on gigs
  for update using (auth.uid() = poster_user_id);

create policy "Users can delete their own gigs." on gigs
  for delete using (auth.uid() = poster_user_id);

-- Create liked_gigs table
create table liked_gigs (
  id bigserial primary key,
  user_id uuid not null references auth.users(id),
  gig_id uuid not null references gigs(id),
  created_at timestamptz default now() not null,
  constraint unique_user_gig unique (user_id, gig_id)
);

-- Enable row level security on liked_gigs
alter table liked_gigs enable row level security;

create policy "Users can select their own liked gigs." on liked_gigs
  for select using (auth.uid() = user_id);

create policy "Users can insert their own liked gigs." on liked_gigs
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own liked gigs." on liked_gigs
  for delete using (auth.uid() = user_id);
