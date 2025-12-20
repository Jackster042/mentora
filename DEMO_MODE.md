# 🎨 Demo Mode Documentation

## Overview

Demo Mode is a special configuration designed for **portfolio and showcase deployments** of Mentora. It allows visitors to test the platform without requiring real payment information or Clerk billing features.

---

## 🎯 Purpose

When deployed as a portfolio project:
- ❌ **Problem**: Clerk's billing features require real payment processing
- ❌ **Issue**: New users can't create companions without a paid subscription
- ✅ **Solution**: Demo Mode gives all users a free tier automatically

---

## ⚙️ How It Works

### Environment Variable

Add this to your environment variables (Vercel, .env.local, etc.):

```env
NEXT_PUBLIC_DEMO_MODE=true
```

### Demo Limits

When Demo Mode is enabled, every user gets:
- **3 Companions** - Create up to 3 custom AI tutors
- **3 Sessions per Companion** - Test each companion up to 3 times
- **Total: 9 Sessions** - Enough to showcase the platform fully

### What Happens

1. **Companion Creation**
   - Users can create up to 3 companions
   - Counter shows: "Demo Mode: X / 3 Companions Created"
   - After 3 companions, friendly limit message displays

2. **Session Usage**
   - Each companion can be used 3 times
   - Session counter tracks usage per companion
   - After 3 sessions, user sees session limit message

3. **Graceful Limits**
   - Clear messaging about demo restrictions
   - Encourages exploring existing companions
   - No payment prompts or upgrade CTAs in demo mode

---

## 🚀 Setup Instructions

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `NEXT_PUBLIC_DEMO_MODE`
   - **Value**: `true`
   - **Environment**: Production (or all)
4. Redeploy your application

### For Local Development

1. Create or edit `.env.local`:
   ```env
   NEXT_PUBLIC_DEMO_MODE=true
   ```

2. Restart your dev server:
   ```bash
   npm run dev
   ```

---

## 🔄 Switching Modes

### Demo Mode → Production Mode

To switch to real billing with Clerk subscriptions:

1. Set `NEXT_PUBLIC_DEMO_MODE=false` (or remove the variable)
2. Configure Clerk billing plans in Clerk Dashboard
3. Set up subscription features:
   - `3_companion_limit`
   - `10_companion_limit`
   - `pro` plan (unlimited)
4. Redeploy

### Production Mode → Demo Mode

1. Set `NEXT_PUBLIC_DEMO_MODE=true`
2. Redeploy
3. All users immediately get demo access

---

## 📊 Features

### 1. Automatic Companion Limits

**File**: `lib/actions/companion.actions.ts`

```typescript
export const newCompanionPermissions = async () => {
  // Demo mode: Give everyone 3 companions
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
    const companionCount = await getUserCompanionCount(userId);
    return companionCount < 3;
  }
  
  // Production: Check Clerk billing
  // ... existing subscription logic
};
```

### 2. Session Tracking

**File**: `lib/actions/companion.actions.ts`

```typescript
export const canStartDemoSession = async (companionId, userId) => {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "true") {
    return { allowed: true }; // Unlimited in production
  }
  
  const sessionCount = await getSessionCount(companionId, userId);
  return {
    allowed: sessionCount < 3,
    sessionsUsed: sessionCount,
    maxSessions: 3
  };
};
```

### 3. Usage Statistics

**File**: `lib/actions/companion.actions.ts`

```typescript
export const getDemoUsageStats = async (userId) => {
  return {
    companionsUsed: 2,        // Current count
    maxCompanions: 3,          // Limit
    totalSessions: 4,          // Total sessions
    sessionsPerCompanion: {    // Per-companion usage
      "comp-123": 2,
      "comp-456": 2
    }
  };
};
```

---

## 🎨 UI Components

### Companion Creation Page

Shows demo usage banner:
```
🎨 Demo Mode: 2 / 3 Companions Created
Each companion can be used for up to 3 demo sessions
```

### Limit Reached Screen

When user hits companion limit:
```
🎨 Demo Limit Reached
You've Reached Your Limit

You've created 3 of 3 demo companions. 
Explore your existing companions or try ones from the community!

[Browse Companions] [My Companions]
```

### Session Limit Screen

When user hits session limit for a companion:
```
🎨 Demo Limit Reached
Session Limit for This Companion

You've used 3 of 3 demo sessions with this companion.
Try one of your other companions or explore more from the library!

[Browse Companions] [My Companions]
```

---

## 🔍 Code Changes Summary

### Modified Files

1. **`lib/actions/companion.actions.ts`**
   - Added `getDemoUsageStats()` function
   - Added `canStartDemoSession()` function
   - Updated `newCompanionPermissions()` with demo mode check

2. **`app/companions/new/page.tsx`**
   - Added demo stats display
   - Updated limit message for demo mode
   - Conditionally hide "Upgrade Plan" button

3. **`app/companions/[id]/page.tsx`**
   - Added session limit check
   - Show limit UI when sessions exhausted
   - Pass session check to component

4. **`.env.example`**
   - Documented `NEXT_PUBLIC_DEMO_MODE` variable

---

## ✅ Testing Checklist

- [ ] Set `NEXT_PUBLIC_DEMO_MODE=true`
- [ ] Sign up as new user
- [ ] Create 3 companions successfully
- [ ] Verify 4th companion shows limit message
- [ ] Use each companion 3 times
- [ ] Verify 4th session shows limit message
- [ ] Check all UI displays correctly
- [ ] Test on mobile and desktop
- [ ] Verify existing companions still work

---

## 🐛 Troubleshooting

### Users Can't Create Any Companions

**Problem**: Variable not set correctly

**Solution**:
```bash
# Check if variable is set
echo $NEXT_PUBLIC_DEMO_MODE

# Should output: true
# If not, add to environment variables and redeploy
```

### Session Limit Not Working

**Problem**: Session history not being saved

**Solution**:
- Check `addToSessionHistory()` is called on session end
- Verify Supabase `session_history` table exists
- Check browser console for errors

### Demo Banner Not Showing

**Problem**: Environment variable not exposed to client

**Solution**:
- Variable MUST start with `NEXT_PUBLIC_`
- Restart dev server after adding variable
- Clear browser cache

---

## 📈 Analytics

Track demo usage in production:

```typescript
// Example: Log demo stats for monitoring
const stats = await getDemoUsageStats(userId);
console.log('Demo Usage:', {
  companions: stats.companionsUsed,
  sessions: stats.totalSessions,
  userId: userId
});
```

---

## 🔮 Future Enhancements

Potential improvements:
- [ ] Admin dashboard to view demo usage
- [ ] Reset demo for specific users
- [ ] Custom demo limits per deployment
- [ ] Demo session recordings (optional)
- [ ] Usage analytics dashboard

---

## 🆘 Support

If you encounter issues:
1. Check environment variable is set correctly
2. Verify Supabase tables are created
3. Check browser console for errors
4. Review server logs in Vercel

---

## 📄 Related Files

- `lib/actions/companion.actions.ts` - Core logic
- `app/companions/new/page.tsx` - Creation UI
- `app/companions/[id]/page.tsx` - Session UI
- `.env.example` - Environment template
- `COMPREHENSIVE_FEATURES.md` - Full feature docs

---

**Last Updated**: December 20, 2024  
**Version**: 1.0.0  
**Mode**: Portfolio/Demo Configuration
