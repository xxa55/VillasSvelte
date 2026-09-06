create extension if not exists btree_gist;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  villa_id text not null check (villa_id in ('villa-a', 'villa-b')),
  user_id uuid not null references auth.users(id) on delete restrict,
  guest_email text not null,
  check_in date not null,
  check_out date not null,
  status text not null default 'requested' check (status in ('requested', 'under_review', 'confirmed', 'cancelled')),
  payment_proof_path text,
  payment_proof_submitted_at timestamptz,
  created_at timestamptz not null default now(),
  check (check_out > check_in)
);

alter table public.bookings drop constraint if exists bookings_no_overlap;
alter table public.bookings drop constraint if exists bookings_status_check;
alter table public.bookings drop column if exists hold_expires_at;
alter table public.bookings drop column if exists stripe_checkout_session_id;
alter table public.bookings add column if not exists payment_proof_path text;
alter table public.bookings add column if not exists payment_proof_submitted_at timestamptz;
update public.bookings set status = case
  when status = 'paid' then 'confirmed'
  when status = 'pending' then 'requested'
  else 'cancelled'
end where status not in ('requested', 'confirmed', 'cancelled');
alter table public.bookings add constraint bookings_status_check
  check (status in ('requested', 'under_review', 'confirmed', 'cancelled'));
alter table public.bookings add constraint bookings_no_overlap
  exclude using gist (
    villa_id with =,
    daterange(check_in, check_out, '[)') with &&
  ) where (status = 'confirmed');

create table if not exists public.comments (
  id bigint generated always as identity primary key,
  villa_id text not null check (villa_id in ('villa-a', 'villa-b')),
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 80),
  rating smallint not null default 5 check (rating between 1 and 5),
  body text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now()
);

create table if not exists public.availability_blocks (
  id uuid primary key default gen_random_uuid(),
  villa_id text not null check (villa_id in ('villa-a', 'villa-b')),
  check_in date not null,
  check_out date not null,
  note text check (char_length(note) <= 200),
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  check (check_out > check_in)
);

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'availability_blocks_no_overlap') then
    alter table public.availability_blocks add constraint availability_blocks_no_overlap
    exclude using gist (
      villa_id with =,
      daterange(check_in, check_out, '[)') with &&
    );
  end if;
end $$;

alter table public.comments
add column if not exists rating smallint not null default 5 check (rating between 1 and 5);

alter table public.bookings enable row level security;
alter table public.comments enable row level security;
alter table public.availability_blocks enable row level security;

drop policy if exists "comments are public" on public.comments;
drop policy if exists "users create comments" on public.comments;
drop policy if exists "users delete own comments" on public.comments;
drop policy if exists "users view own bookings" on public.bookings;

create policy "comments are public" on public.comments for select using (true);
create policy "users create comments" on public.comments for insert to authenticated
with check (auth.uid() = user_id);
create policy "users delete own comments" on public.comments for delete to authenticated
using (auth.uid() = user_id);
create policy "users view own bookings" on public.bookings for select to authenticated
using (auth.uid() = user_id);

grant usage on schema public to anon, authenticated;
grant select on table public.comments to anon, authenticated;
grant insert, delete on table public.comments to authenticated;
grant usage, select on sequence public.comments_id_seq to authenticated;
grant select on table public.bookings to authenticated;
grant select, insert, update on table public.bookings to service_role;
grant select, insert, update, delete on table public.availability_blocks to service_role;

insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', false)
on conflict (id) do update set public = false;

create index if not exists bookings_villa_dates_idx on public.bookings(villa_id, check_in, check_out);
create index if not exists availability_blocks_villa_dates_idx on public.availability_blocks(villa_id, check_in, check_out);
create index if not exists comments_villa_created_idx on public.comments(villa_id, created_at desc);
