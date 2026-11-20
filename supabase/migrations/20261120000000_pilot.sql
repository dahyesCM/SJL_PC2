create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  alias text not null check (char_length(alias) between 3 and 24),
  role text not null default 'citizen' check (role in ('citizen','moderator'))
);

create function public.create_sjl_profile() returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  chosen text := coalesce(new.raw_user_meta_data ->> 'alias', '');
begin
  if chosen !~ '^[[:alnum:]_-]{3,24}$' then
    chosen := 'Vecino_' || left(new.id::text, 8);
  end if;
  insert into public.profiles(id, alias) values (new.id, chosen);
  return new;
end;
$$;
revoke all on function public.create_sjl_profile() from public, anon, authenticated;
create trigger on_sjl_user_created after insert on auth.users
for each row execute function public.create_sjl_profile();

insert into public.profiles(id, alias)
select id, 'Vecino_' || left(id::text, 8) from auth.users
on conflict (id) do nothing;

create table public.reports (
  id bigint generated always as identity primary key,
  account_id uuid not null references public.profiles(id) on delete cascade,
  request_id uuid not null,
  sector text not null check (sector in ('Norte','Centro','Sur')),
  category text not null check (category in ('Robo al paso','Asalto en transporte','Extorsión','Microcomercialización','Otro')),
  period text not null check (period in ('2026-T3','2026-T4')),
  status text not null default 'pending' check (status in ('pending','validated','attended','rejected')),
  detail text check (detail is null or (category = 'Otro' and char_length(btrim(detail)) between 1 and 280)),
  latitude numeric check (latitude between -12.04 and -11.87 and scale(latitude) <= 2),
  longitude numeric check (longitude between -77.055 and -76.93 and scale(longitude) <= 2),
  has_location boolean generated always as (latitude is not null) stored,
  created_at timestamptz not null default now(),
  check ((latitude is null) = (longitude is null)),
  unique (account_id, request_id)
);
create index reports_owner_history on public.reports(account_id, id desc);
create index reports_queue on public.reports(status, id);

create table public.moderation_events (
  id bigint generated always as identity primary key,
  report_id bigint not null references public.reports(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  status text not null check (status in ('validated','attended','rejected')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.reports enable row level security;
alter table public.moderation_events enable row level security;
revoke all on public.profiles, public.reports, public.moderation_events from anon, authenticated;
grant select (id, alias, role) on public.profiles to authenticated;
grant select (id, account_id, sector, category, period, status, detail, has_location) on public.reports to authenticated;
create policy own_profile on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy authorized_reports on public.reports for select to authenticated using (
  account_id = (select auth.uid()) or exists (
    select 1 from public.profiles where id = (select auth.uid()) and role = 'moderator'
  )
);

create function public.submit_sjl_report(
  p_request_id uuid, p_sector text, p_category text, p_period text,
  p_detail text default null, p_latitude numeric default null, p_longitude numeric default null
) returns void
language plpgsql security definer set search_path = ''
as $$
declare actor uuid := auth.uid();
begin
  if actor is null or not exists (select 1 from public.profiles where id = actor) then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  insert into public.reports(account_id,request_id,sector,category,period,detail,latitude,longitude)
  values(actor,p_request_id,p_sector,p_category,p_period,nullif(btrim(p_detail),''),p_latitude,p_longitude)
  on conflict (account_id,request_id) do nothing;
end;
$$;

create function public.moderate_sjl_report(p_id bigint, p_status text) returns boolean
language plpgsql security definer set search_path = ''
as $$
declare actor uuid := auth.uid();
begin
  if actor is null or not exists (select 1 from public.profiles where id = actor and role = 'moderator') then
    raise exception 'Moderator required' using errcode = '42501';
  end if;
  if p_status is null or p_status not in ('validated','attended','rejected') then
    raise exception 'Invalid decision' using errcode = '22023';
  end if;
  update public.reports set status = p_status where id = p_id
    and status = case when p_status = 'attended' then 'validated' else 'pending' end;
  if not found then return false; end if;
  insert into public.moderation_events(report_id,actor_id,status) values (p_id,actor,p_status);
  return true;
end;
$$;
revoke all on function public.submit_sjl_report(uuid,text,text,text,text,numeric,numeric) from public, anon;
revoke all on function public.moderate_sjl_report(bigint,text) from public, anon;
grant execute on function public.submit_sjl_report(uuid,text,text,text,text,numeric,numeric) to authenticated;
grant execute on function public.moderate_sjl_report(bigint,text) to authenticated;
