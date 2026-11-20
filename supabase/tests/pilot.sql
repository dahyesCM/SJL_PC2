-- Devuelve un error si una cuenta puede ver reportes ajenos o moderar.
-- Ejecutar con una conexión administrativa en la base de pruebas.
begin;

insert into auth.users (id, email, raw_user_meta_data) values
  ('a13772e5-6e20-43c7-a15c-d61e0b0f13a1', 'sjl-test-a@example.test', '{"alias":"Vecina_A"}'),
  ('a13772e5-6e20-43c7-a15c-d61e0b0f13a2', 'sjl-test-b@example.test', '{"alias":"Vecina_B"}'),
  ('a13772e5-6e20-43c7-a15c-d61e0b0f13a3', 'sjl-test-m@example.test', '{"alias":"Moderadora"}');
update public.profiles set role = 'moderator'
  where id = 'a13772e5-6e20-43c7-a15c-d61e0b0f13a3';

set local role authenticated;
select set_config('request.jwt.claim.sub', 'a13772e5-6e20-43c7-a15c-d61e0b0f13a1', true);
select public.submit_sjl_report('f1d9700d-04b1-40d2-9387-e7d699da3e01', 'Centro', 'Otro', '2026-T4', 'Reporte de prueba', -11.95, -76.99);
select public.submit_sjl_report('f1d9700d-04b1-40d2-9387-e7d699da3e01', 'Centro', 'Otro', '2026-T4', 'Reporte de prueba', -11.95, -76.99);
do $$
begin
  if (select count(id) from public.reports where detail = 'Reporte de prueba' and has_location) <> 1
    then raise exception 'Falló el historial o la idempotencia'; end if;
  begin
    perform public.moderate_sjl_report((select min(id) from public.reports), 'validated');
    raise exception 'Una cuenta vecinal pudo moderar';
  exception when insufficient_privilege then null;
  end;
  begin
    update public.profiles set role = 'moderator' where id = auth.uid();
    raise exception 'Una cuenta vecinal pudo modificar su rol';
  exception when insufficient_privilege then null;
  end;
end $$;

select set_config('request.jwt.claim.sub', 'a13772e5-6e20-43c7-a15c-d61e0b0f13a2', true);
do $$
begin
  if exists (select id from public.reports where detail = 'Reporte de prueba')
    then raise exception 'Una cuenta vecinal pudo leer un reporte ajeno'; end if;
end $$;

select set_config('request.jwt.claim.sub', 'a13772e5-6e20-43c7-a15c-d61e0b0f13a3', true);
do $$
declare target bigint;
begin
  select id into target from public.reports where detail = 'Reporte de prueba'
    and account_id = 'a13772e5-6e20-43c7-a15c-d61e0b0f13a1';
  if target is null or not public.moderate_sjl_report(target, 'validated')
    then raise exception 'Moderación autorizada falló'; end if;
  if public.moderate_sjl_report(target, 'rejected')
    then raise exception 'Se aceptó una segunda decisión incompatible'; end if;
end $$;

reset role;
do $$
begin
  if (select count(*) from public.moderation_events where actor_id = 'a13772e5-6e20-43c7-a15c-d61e0b0f13a3' and status = 'validated') <> 1
    then raise exception 'Falló la auditoría transaccional'; end if;
end $$;
rollback;
