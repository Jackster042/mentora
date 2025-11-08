# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Converso** is a real-time AI teaching platform built with Next.js 15 (App Router), allowing users to create and interact with AI companions for voice-based learning sessions across various subjects.

## Core Technologies

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript (strict mode enabled)
- **UI**: React 19, Tailwind CSS 4, Radix UI components
- **Authentication**: Clerk (with Supabase JWT integration)
- **Database**: Supabase (PostgreSQL)
- **Voice AI**: Vapi.ai (with ElevenLabs voices, Deepgram transcription, OpenAI GPT-4)
- **Monitoring**: Sentry
- **Forms**: React Hook Form with Zod validation

## Development Commands

### Development Server
```bash
npm run dev        # Start dev server with Turbopack (fast refresh)
```

### Build & Production
```bash
npm run build      # Build for production
npm start          # Start production server
```

### Code Quality
```bash
npm run lint       # Run ESLint
```

### Testing
There is no test script configured. Use `npm test` to run tests if configured in the future.

## Environment Variables Required

Set these in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_VAPI_WEB_TOKEN` - Vapi.ai web token
- Clerk authentication variables (auto-configured by Clerk)
- Sentry DSN (for error tracking)

## Architecture

### Data Flow & Authentication

The app uses **Clerk for authentication** which integrates with **Supabase Row Level Security (RLS)**:
1. User authenticates via Clerk
2. Clerk JWT token is passed to Supabase client (`lib/supabase.ts`)
3. All database operations respect RLS policies based on authenticated user

### Key Application Patterns

#### Server Actions Pattern
All database operations use Server Actions (`"use server"`) located in `lib/actions/`:
- Functions are async and run server-side only
- Use `auth()` from Clerk to get authenticated user
- Return serializable data to client components
- Handle revalidation with `revalidatePath()` when needed

#### Companion Creation & Session Flow
1. **Create Companion** (`/companions/new`): User fills form (subject, topic, voice, style, duration)
2. **Companion Configuration**: `configureAssistant()` in `lib/utils.ts` builds Vapi assistant config with:
   - Voice selection (ElevenLabs voice IDs mapped in `constants/index.ts`)
   - GPT-4 system prompt with teaching guidelines
   - Deepgram transcription
3. **Start Session** (`/companions/[id]`): 
   - CompanionComponent initializes Vapi SDK
   - Vapi event handlers manage call lifecycle (call-start, call-end, message, speech-start/end)
   - Transcripts saved in real-time to messages state
   - Session history recorded to Supabase on call-end

#### Component Organization
- `components/companion/` - Companion-specific UI (cards, forms, session interface)
- `components/shared/` - Global components (Navbar, Footer)
- `components/ui/` - Shadcn/ui primitives (button, form, input, etc.)
- `components/filters/` - Search and filtering components

### Database Schema (Supabase)

**companions** table:
- `id` (uuid, PK)
- `name`, `subject`, `topic`, `voice`, `style`, `duration`
- `author` (user_id from Clerk)
- `created_at`

**session_history** table:
- `companion_id` (FK to companions)
- `user_id` (from Clerk)
- `created_at`

**bookmarks** table:
- `companion_id` (FK to companions)
- `user_id` (from Clerk)
- Used to track user's saved companions

### Path Aliases
Use `@/*` to reference root-level imports:
```typescript
import { createCompanion } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/companion/CompanionCard";
```

### Styling Conventions
- Global styles in `app/globals.css`
- Tailwind utility classes with `cn()` helper (combines clsx + tailwind-merge)
- Subject colors mapped in `constants/index.ts` via `subjectsColors` object
- Custom CSS classes: `home-section`, `companion-avatar`, `transcript`, `btn-mic`, etc.

## Key Implementation Details

### Clerk Authorization Features
The app uses Clerk's plan-based permissions for companion creation limits:
- Check permissions with `has({ plan: "pro" })` or `has({ feature: "3_companion_limit" })`
- Implemented in `newCompanionPermissions()` action

### Vapi.ai Integration
- Singleton instance in `lib/vapi.sdk.ts`
- Assistant configuration dynamically interpolates `{{topic}}`, `{{subject}}`, `{{style}}` variables
- Real-time transcript messages via Vapi events
- Lottie animation synced with speech-start/speech-end events

### TypeScript Configuration
- Strict mode enabled
- Module resolution: bundler
- Path alias: `@/*` maps to root
- **Note**: `next.config.ts` has `ignoreBuildErrors: true` - fix TypeScript errors before production

### Sentry Integration
- Configured via `instrumentation.ts` for both Node.js and Edge runtimes
- Sentry config files: `sentry.server.config.ts`, `sentry.edge.config.ts`
- Automatic error tracking and performance monitoring

## Common Tasks

### Adding a New Companion Feature
1. Update `CreateCompanion` interface in `types/index.d.ts`
2. Modify database schema in Supabase
3. Update `createCompanion` action in `lib/actions/companion.actions.ts`
4. Adjust `CompanionForm` component validation schema
5. Update `configureAssistant()` if Vapi config changes

### Adding a New Subject
1. Add to `subjects` array in `constants/index.ts`
2. Add color mapping to `subjectsColors` object
3. Add corresponding icon SVG to `public/icons/{subject}.svg`
4. Update `Subject` enum in `types/index.d.ts`

### Debugging Vapi Sessions
- Check browser console for Vapi event logs
- Verify assistant configuration in `lib/utils.ts`
- Ensure `NEXT_PUBLIC_VAPI_WEB_TOKEN` is set
- Review real-time transcripts in CompanionComponent messages state

## Important Notes

- **Build warnings**: TypeScript and ESLint errors are currently ignored during builds (`next.config.ts`). Fix before production deployment.
- **Middleware**: Clerk middleware applies to all routes except static files and Next.js internals
- **Image optimization**: Remote patterns configured for `img.clerk.com`
- **Font**: Uses Bricolage Grotesque from Google Fonts
