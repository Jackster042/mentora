# Landing Page Implementation

This document describes the landing page implementation for Mentora.

## Overview

The landing page is shown to **unauthenticated users** when they visit the homepage. Once users sign in or sign up, they see the regular dashboard with companions.

## What Was Added

### New Components

#### 1. `components/landing/Hero.tsx`
- Main hero section with headline, description, and CTA buttons
- Displays key stats (10+ subjects, Real-time Voice AI, Custom Tutors)
- Animated floating subject cards in the background
- "Get Started Free" button (opens Clerk sign-up modal)
- "Learn More" button (scrolls to features)

#### 2. `components/landing/Features.tsx`
- Grid of 6 feature cards showcasing the platform's capabilities:
  - Real-Time Voice Conversations
  - Custom AI Companions
  - Live Transcription
  - Track Your Progress
  - Multiple Subjects
  - Instant Feedback

#### 3. `components/landing/HowItWorks.tsx`
- 4-step process visualization:
  1. Choose Your Subject
  2. Create Your Companion
  3. Start Learning
  4. Track Progress

#### 4. `components/landing/CallToAction.tsx`
- Final call-to-action section
- Prominent "Start Learning for Free" button
- Note about no credit card required

## Modified Files

### `app/page.tsx`
- Added authentication check using `auth()` from Clerk
- Conditionally renders:
  - **Landing page** for unauthenticated users
  - **Dashboard** (existing companions view) for authenticated users

```typescript
const { userId } = await auth();

if (!userId) {
  return (
    <main className="landing-main">
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </main>
  );
}

// Show existing dashboard for authenticated users
```

### `app/layout.tsx`
- Updated metadata:
  - Title: "Mentora - AI Teaching Platform"
  - Description: Updated to reflect the landing page message

### `app/globals.css`
Added comprehensive landing page styles including:
- Hero section styling with responsive design
- Feature cards with hover effects
- Step cards for "How It Works" section
- CTA section with prominent styling
- Float animation keyframes for subject cards
- Full mobile responsiveness

## User Flow

### For New Users (Unauthenticated)
1. Visit homepage → See landing page
2. Click "Get Started Free" or navbar "Sign In"
3. Complete Clerk authentication
4. Redirected to dashboard with companions

### For Existing Users (Authenticated)
1. Visit homepage → See dashboard directly
2. Access all companions, create new ones, view sessions

## Design Features

### Responsive Design
- Desktop: Full hero with side-by-side layout
- Tablet: Stacked sections, 2-column feature grid
- Mobile: Single column, simplified stats, compact spacing

### Visual Elements
- Floating animated subject cards (🧪 🎐 📚 💻)
- Subject-specific colors from existing design system
- Gradient backgrounds for visual interest
- Hover effects on feature cards

### Call-to-Actions
Multiple CTAs throughout the page:
1. Hero section: "Get Started Free" + "Learn More"
2. Final CTA section: "Start Learning for Free"
3. Navbar: "Sign In" button always visible

## Styling Details

### Color Scheme
- Primary: `#fe5933` (Clerk customization color)
- Backgrounds: From existing design system
- Subject colors: Maintained from constants

### Typography
- Hero title: 5xl (3rem) → 4xl on mobile
- Section titles: 4xl → 3xl on mobile
- Body text: xl → lg on mobile
- Uses Bricolage Grotesque font (existing)

### Spacing
- Section gaps: 20 (5rem) → 12 (3rem) on mobile
- Component padding: Responsive with max-sm variants
- Consistent border-radius: rounded-4xl, rounded-3xl, rounded-2xl

## Testing Checklist

- [ ] Landing page displays for logged-out users
- [ ] Dashboard displays for logged-in users
- [ ] "Get Started Free" opens Clerk sign-up modal
- [ ] "Learn More" scrolls to features section
- [ ] Navbar "Sign In" works correctly
- [ ] All links and buttons are functional
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Animations play smoothly (floating cards)
- [ ] No console errors
- [ ] After sign-up, user is redirected to dashboard

## Future Enhancements

Consider adding:
- [ ] Testimonials section
- [ ] Pricing/subscription tiers display
- [ ] Video demo of the platform
- [ ] Subject showcase with real companions
- [ ] FAQ section
- [ ] Newsletter signup
- [ ] Social proof (user count, session count)
- [ ] Dark mode optimization

## Notes

- Footer is currently not shown on any pages (was already removed from layout)
- Navbar is consistent across landing page and dashboard
- Clerk handles all authentication flows (sign-in, sign-up, password reset)
- Environment variables required: Clerk keys (see .env.example)
