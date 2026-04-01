# Learner

Learner is a conversation-first language study app built around spaced repetition, phase-based progression, and live voice practice.

The current implementation is centered on **Conversational Hindi** for family and in-law interactions. Instead of generic grammar drills, the product is shaped around real social use: greetings, hospitality, dinner conversation, opinions, and cultural fluency.

## Product Thesis

- Learn language for real conversation, not textbook exercises.
- Progress through structured phases instead of an unbounded card pile.
- Use spaced repetition for retention.
- Add voice practice where it actually helps: listening, speech, and live scenario conversation.

## What Exists

- Subject registry with typed config-driven content
- Hindi subject with 4 phases and seeded flashcard content
- FSRS-based review scheduling
- Progress and mastery tracking by phase
- Onboarding and local settings flow
- Local Postgres-backed demo runtime
- OpenAI TTS/STT endpoints
- OpenAI Realtime-based live conversation mode

## Stack

- Next.js 16
- React 19
- Prisma 7
- PostgreSQL
- Tailwind CSS 4
- OpenAI API
- `ts-fsrs` for spaced repetition

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and fill in the OpenAI key when you want voice features:

```bash
cp .env.example .env.local
```

Required variables:

```bash
DATABASE_URL="postgresql://learner:learner@localhost:5432/learner?schema=public"
OPENAI_API_KEY="sk-..."
```

### 3. Start Postgres

If you want the same local database setup used in development here:

```bash
docker run -d \
  --name learner-postgres \
  -e POSTGRES_USER=learner \
  -e POSTGRES_PASSWORD=learner \
  -e POSTGRES_DB=learner \
  -p 5432:5432 \
  -v learner-postgres-data:/var/lib/postgresql/data \
  postgres:latest
```

### 4. Apply schema and seed data

```bash
npx prisma db push
npm run seed
```

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run seed
```

## Data Model

Core persisted entities:

- `User`
- `Subject`
- `Phase`
- `Card`
- `UserCardState`
- `ReviewLog`
- `StudySession`
- `UserProgress`

User preferences are stored in:

- browser `localStorage` for onboarding/settings UX
- `User.preferences` in Postgres for backend scheduling/runtime decisions

Those two are synchronized through `/api/bootstrap`.

## Architecture

High-level system flow:

- Subject content lives in typed config files under `src/lib/subjects/`
- Subject config is seeded into Postgres on demand
- Study sessions fetch unlocked cards based on phase mastery
- Reviews update FSRS state and progress records
- Voice mode uses subject-specific prompts and scenarios

Diagram:

- [learner-system-architecture.mmd](/Users/dipakkrishnan/git/clones/learner/docs/learner-system-architecture.mmd)

## Voice Features

There are two separate voice paths:

- Flashcard audio:
  one-shot TTS generation for phrase playback
- Live conversation:
  OpenAI Realtime session with scenario prompting

If `OPENAI_API_KEY` is not configured:

- the core study UI still works
- TTS degrades gracefully
- live voice features will not function

## Current Scope

This is currently a **single-user demo-oriented runtime** with a seeded demo user rather than a full multi-user auth system.

That choice is deliberate. The implementation prioritizes:

- a working end-to-end study loop
- a stable local development setup
- a clean subject/engine architecture

over partially integrated auth or incomplete personalization layers.

## Repo Notes

- `.env` and `.env.local` are intentionally ignored
- `.env.example` is safe to commit
- `README.md` describes the runtime as it exists now, not the original `create-next-app` scaffold
