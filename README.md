# Herrick Taskforce CQB Training Platform

## Quick Start

1. Copy `.env.local.example` to `.env.local` and fill in your credentials
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000`

## Deployment

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## Database Setup

Run `database/schema.sql` in your Supabase SQL Editor.

## Promote to Instructor

```sql
UPDATE users SET role = 'instructor' WHERE discord_id = 'THEIR_DISCORD_ID';
```