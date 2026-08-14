-- Enable RLS (Row Level Security) after creating tables

create table users (
  id uuid default gen_random_uuid() primary key,
  discord_id text unique not null,
  username text not null,
  avatar text,
  role text default 'attendee' check (role in ('instructor', 'attendee')),
  created_at timestamp with time zone default now()
);

create table sessions (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,
  instructor_id uuid references users(id),
  status text default 'waiting' check (status in ('waiting', 'active', 'quiz', 'ended')),
  current_slide integer default 0,
  total_slides integer default 0,
  title text not null,
  created_at timestamp with time zone default now()
);

create table session_attendees (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references sessions(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  joined_at timestamp with time zone default now(),
  unique(session_id, user_id)
);

create table slides (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references sessions(id) on delete cascade,
  "order" integer not null,
  title text not null,
  content text not null,
  type text default 'content' check (type in ('content', 'diagram', 'video')),
  created_at timestamp with time zone default now()
);

create table notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  session_id uuid references sessions(id) on delete cascade,
  content text default '',
  created_at timestamp with time zone default now(),
  unique(user_id, session_id)
);

create table quiz_questions (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references sessions(id) on delete cascade,
  "order" integer not null,
  question text not null,
  type text default 'multiple_choice' check (type in ('multiple_choice', 'scenario')),
  options text[] default null,
  correct_answer text,
  scenario_context text,
  created_at timestamp with time zone default now()
);

create table quiz_responses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  session_id uuid references sessions(id) on delete cascade,
  question_id uuid references quiz_questions(id) on delete cascade,
  answer text not null,
  score integer default 0,
  created_at timestamp with time zone default now()
);

-- Enable Realtime for sessions table
alter publication supabase_realtime add table sessions;