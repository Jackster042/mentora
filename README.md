<div align="center">
  <h1>🎓 Mentora</h1>
  <p><strong>Real-Time AI Teaching Platform</strong></p>
  <p>An intelligent voice-based learning companion that brings AI tutors to life</p>
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

---

## 📖 Overview

**Mentora** is a cutting-edge SaaS platform that revolutionizes online learning through real-time voice conversations with AI teaching companions. Built with modern web technologies, it enables users to create personalized AI tutors for various subjects and engage in natural, voice-based learning sessions.

### ✨ Key Features

- 🎙️ **Real-Time Voice Interaction** - Seamless voice conversations with AI tutors powered by Vapi.ai
- 🧠 **Multi-Subject Support** - Math, Science, Language, Coding, History, Economics, and more
- 🎨 **Custom Companion Creation** - Design personalized AI tutors with custom voices and teaching styles
- 📝 **Live Transcription** - Real-time session transcripts for better learning retention
- 🔖 **Bookmark System** - Save favorite companions for quick access
- 📊 **Session History** - Track learning progress across all sessions
- 🔐 **Secure Authentication** - Enterprise-grade security with Clerk
- 💳 **Flexible Plans** - Tiered subscription system with companion creation limits

---

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router) with Turbopack
- **UI Library**: React 19
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS 4 + Radix UI components
- **Forms**: React Hook Form + Zod validation
- **Animations**: Lottie React

### Backend & Services

- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Clerk (with JWT integration)
- **Voice AI**: Vapi.ai
  - Voice: ElevenLabs
  - Transcription: Deepgram Nova-3
  - LLM: OpenAI GPT-4
- **Monitoring**: Sentry
- **Deployment**: Vercel-ready

---

## 🏗️ Architecture Highlights

### Authentication Flow

```
User → Clerk Auth → JWT Token → Supabase Client → RLS Policies → Database
```

### Voice Session Lifecycle

1. User creates a companion with custom parameters (subject, topic, voice, style)
2. `configureAssistant()` generates Vapi configuration with GPT-4 system prompt
3. Real-time voice session starts with bidirectional audio streaming
4. Live transcription with role-based message tracking
5. Session history automatically saved to database on completion

### Database Schema

- **companions**: Stores AI tutor configurations
- **session_history**: Tracks all completed learning sessions
- **bookmarks**: User-saved favorite companions

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Clerk account for authentication
- Vapi.ai account with API token
- (Optional) Sentry account for monitoring

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jackster042/LLM_SAAS.git
   cd LLM_SAAS
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Vapi.ai
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_token

   # Clerk (auto-populated by Clerk CLI or dashboard)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret

   # Sentry (optional)
   SENTRY_DSN=your_sentry_dsn
   ```

4. **Set up Supabase database**

   Create the following tables in your Supabase project:

   ```sql
   -- Companions table
   CREATE TABLE companions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     subject TEXT NOT NULL,
     topic TEXT NOT NULL,
     voice TEXT NOT NULL,
     style TEXT NOT NULL,
     duration INTEGER NOT NULL,
     author TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Session history table
   CREATE TABLE session_history (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
     user_id TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Bookmarks table
   CREATE TABLE bookmarks (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
     user_id TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(companion_id, user_id)
   );
   ```

   Enable Row Level Security (RLS) and add appropriate policies.

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command         | Description                                            |
| --------------- | ------------------------------------------------------ |
| `npm run dev`   | Start development server with Turbopack (fast refresh) |
| `npm run build` | Build optimized production bundle                      |
| `npm start`     | Start production server                                |
| `npm run lint`  | Run ESLint for code quality checks                     |

---

## 🎯 Key Implementation Features

### Server Actions Pattern

All database operations use Next.js Server Actions for type-safe, secure data fetching:

```typescript
"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = await createSupabaseClient();
  // ... database operations with RLS
};
```

### Dynamic Voice Configuration

Vapi assistant configuration adapts to user preferences:

```typescript
const vapiAssistant = {
  voice: { provider: "11labs", voiceId: voices[voice][style] },
  model: { provider: "openai", model: "gpt-4" },
  transcriber: { provider: "deepgram", model: "nova-3" },
};
```

### Plan-Based Authorization

Clerk's permission system controls feature access:

```typescript
if (has({ plan: "pro" })) return true;
else if (has({ feature: "3_companion_limit" })) limit = 3;
```

---

## 📱 Project Structure

```
LLM_SAAS/
├── app/                      # Next.js App Router pages
│   ├── companions/          # Companion routes
│   │   ├── [id]/           # Individual companion session
│   │   └── new/            # Create companion form
│   ├── profile/            # User profile
│   └── subscription/       # Subscription management
├── components/
│   ├── companion/          # Companion-specific components
│   ├── filters/            # Search and filter components
│   ├── shared/             # Global layout components
│   └── ui/                 # Reusable UI primitives (Shadcn)
├── lib/
│   ├── actions/            # Server Actions
│   ├── supabase.ts         # Supabase client with Clerk JWT
│   ├── vapi.sdk.ts         # Vapi singleton instance
│   └── utils.ts            # Utility functions
├── types/                   # TypeScript type definitions
├── constants/              # App constants and configurations
└── public/                 # Static assets
```

---

## 🔒 Security Features

- ✅ Row Level Security (RLS) on all database tables
- ✅ Clerk JWT authentication with Supabase integration
- ✅ Server-side validation with Zod schemas
- ✅ Protected API routes with middleware
- ✅ Environment variable validation
- ✅ Sentry error tracking and monitoring

---

## 🚧 Future Enhancements

- [ ] Session analytics and learning insights
- [ ] Multi-language support
- [ ] Companion marketplace
- [ ] Progress tracking and achievements
- [ ] Session recordings and playback
- [ ] Group learning sessions
- [ ] Mobile app (React Native)
- [ ] AI-generated lesson plans

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- [Clerk](https://clerk.com/) - Complete User Management
- [Vapi.ai](https://vapi.ai/) - Voice AI Infrastructure
- [Vercel](https://vercel.com/) - Deployment Platform
- [Shadcn/ui](https://ui.shadcn.com/) - Beautifully Designed Components

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Jackster042">Jackster042</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
