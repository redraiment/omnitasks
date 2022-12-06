create table tasks (
  id bigserial primary key,
  title text not null default '',
  is_editing boolean not null default true,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  completed_at timestamp
);
