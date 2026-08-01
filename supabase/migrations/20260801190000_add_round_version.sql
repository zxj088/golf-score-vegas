-- Add optimistic concurrency control for scoring-device handoff.
alter table public.vegas_rounds
add column if not exists version bigint not null default 1;
