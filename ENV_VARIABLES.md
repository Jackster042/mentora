# Environment Variables Reference

This document lists all environment variables used in the Mentora application and where they are referenced in the codebase.

## 📋 Summary

| Variable | Required | Used In | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | `lib/supabase.ts` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | `lib/supabase.ts` | Supabase anonymous/public key |
| `NEXT_PUBLIC_VAPI_WEB_TOKEN` | ✅ Yes | `lib/vapi.sdk.ts` | Vapi.ai web token for voice AI |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ Yes | Clerk (auto-loaded) | Clerk public key |
| `CLERK_SECRET_KEY` | ✅ Yes | Clerk (auto-loaded) | Clerk secret key |
| `SENTRY_DSN` | ⚠️ Optional | Sentry config files | Sentry error tracking DSN |
| `SENTRY_AUTH_TOKEN` | ⚠️ Optional | Build process | Sentry source map upload |
| `NEXT_RUNTIME` | 🔧 System | `instrumentation.ts` | Next.js runtime detection |
| `CI` | 🔧 System | `next.config.ts` | CI environment detection |

---

## 🔍 Detailed Usage

### 1. **NEXT_PUBLIC_SUPABASE_URL**
- **File**: `lib/supabase.ts` (Line 6)
- **Usage**:
  ```typescript
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // ...
  )
  ```
- **Purpose**: Base URL for your Supabase project
- **How to get**: Supabase Dashboard → Settings → API → Project URL

---

### 2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
- **File**: `lib/supabase.ts` (Line 7)
- **Usage**:
  ```typescript
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    // ...
  )
  ```
- **Purpose**: Public anonymous key for Supabase client-side operations
- **How to get**: Supabase Dashboard → Settings → API → anon/public key

---

### 3. **NEXT_PUBLIC_VAPI_WEB_TOKEN**
- **File**: `lib/vapi.sdk.ts` (Line 3)
- **Usage**:
  ```typescript
  export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!)
  ```
- **Purpose**: Authentication token for Vapi.ai voice AI service
- **How to get**: Vapi.ai Dashboard → API Keys

---

### 4. **CLERK VARIABLES**
- **Files**: Auto-loaded by Clerk SDK throughout the app
- **Primary Usage**: 
  - `app/layout.tsx` - ClerkProvider wrapper
  - `middleware.ts` - Authentication middleware
  - `lib/actions/companion.actions.ts` - User authentication
- **Variables Needed**:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Client-side operations
  - `CLERK_SECRET_KEY` - Server-side operations
- **Optional URL Configurations**:
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
- **How to get**: Clerk Dashboard → API Keys

---

### 5. **SENTRY_DSN**
- **Files**: 
  - `sentry.server.config.ts` (Line 8) - **Currently Hardcoded**
  - `sentry.edge.config.ts` (Line 9) - **Currently Hardcoded**
  - `instrumentation-client.ts` (Line 8) - **Currently Hardcoded**
- **Current Value**: `https://20257cd8621e5442e7cb6d5fe71971bf@o4509684640251904.ingest.de.sentry.io/4509684644380752`
- **Purpose**: Sentry error tracking and monitoring
- **⚠️ Note**: You should replace the hardcoded DSN with `process.env.SENTRY_DSN` in all three files
- **How to get**: Sentry.io Dashboard → Project Settings → Client Keys (DSN)

---

### 6. **SENTRY_AUTH_TOKEN**
- **File**: Used by Sentry webpack plugin during build
- **Usage**: Uploads source maps to Sentry
- **Purpose**: Enables detailed stack traces in Sentry error reports
- **How to get**: Sentry.io → Settings → Auth Tokens → Create New Token

---

### 7. **NEXT_RUNTIME** (System Variable)
- **File**: `instrumentation.ts` (Lines 4, 8)
- **Usage**:
  ```typescript
  if (process.env.NEXT_RUNTIME === 'nodejs') { ... }
  if (process.env.NEXT_RUNTIME === 'edge') { ... }
  ```
- **Purpose**: Automatically set by Next.js to detect runtime environment
- **Values**: `'nodejs'` or `'edge'`
- **Action**: No manual configuration needed

---

### 8. **CI** (System Variable)
- **File**: `next.config.ts` (Line 28)
- **Usage**:
  ```typescript
  silent: !process.env.CI,
  ```
- **Purpose**: Controls Sentry build log verbosity in CI/CD pipelines
- **Action**: Automatically set by CI platforms (GitHub Actions, Vercel, etc.)

---

## 🚨 Important Security Notes

### Variables with `NEXT_PUBLIC_` prefix:
- ✅ **Exposed to the browser** - Safe for client-side code
- ✅ Can be used in React components
- ⚠️ Do NOT put secrets here

### Variables WITHOUT `NEXT_PUBLIC_` prefix:
- 🔒 **Server-side only** - Never exposed to browser
- 🔒 Keep these secret
- 🔒 Used in Server Actions, API routes, and server components

---

## 🛠️ Setup Instructions

1. **Copy the template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your values** in `.env.local`

3. **Verify `.gitignore` includes**:
   ```
   .env*
   !.env.example
   ```

4. **Restart your dev server** after adding variables:
   ```bash
   npm run dev
   ```

---

## 🔧 Recommended Improvements

### Move Hardcoded Sentry DSN to Environment Variables

Currently, the Sentry DSN is hardcoded in three files. You should:

1. Add `SENTRY_DSN` to your `.env.local`
2. Update these files:

**`sentry.server.config.ts`**:
```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // ... rest of config
});
```

**`sentry.edge.config.ts`**:
```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // ... rest of config
});
```

**`instrumentation-client.ts`**:
```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // Note: NEXT_PUBLIC_ for client
  // ... rest of config
});
```

---

## 📚 Additional Resources

- [Next.js Environment Variables Docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Supabase Setup Guide](https://supabase.com/docs/guides/getting-started)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Vapi.ai Documentation](https://docs.vapi.ai/)
- [Sentry Next.js Setup](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
