# Next.js + Clerk Todo App

A full-stack example app demonstrating:

- **Next.js 15** with the App Router, Server Components, and Route Handlers
- **Clerk** for authentication (sign-in/sign-up, user profiles, sessions)
- **Protected API routes** with per-user data isolation
- **Tailwind CSS** for styling
- **TypeScript** throughout

## Prerequisites

- Node.js 18.17+ (20+ recommended)
- A free [Clerk](https://clerk.com) account

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Get your Clerk API keys

1. Sign up / log in at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. From the **API Keys** section, copy your **Publishable key** and **Secret key**

### 3. Configure environment variables

Copy the example env file and fill in your Clerk keys:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
.
├── app/
│   ├── api/todos/           # REST API for todos (protected)
│   │   ├── route.ts         # GET (list), POST (create)
│   │   └── [id]/route.ts    # PATCH (update), DELETE
│   ├── dashboard/           # Protected user dashboard
│   ├── sign-in/             # Clerk sign-in page
│   ├── sign-up/             # Clerk sign-up page
│   ├── layout.tsx           # Root layout with <ClerkProvider>
│   └── page.tsx             # Public landing page
├── components/
│   ├── Navbar.tsx           # Top nav with <UserButton> & auth buttons
│   └── TodoList.tsx         # Client component with optimistic updates
├── lib/
│   └── todoStore.ts         # In-memory data store (swap for a DB)
├── middleware.ts            # Clerk route protection
└── ...
```

## How authentication works

1. **`app/layout.tsx`** wraps the whole app in `<ClerkProvider>` so Clerk's React hooks and components work anywhere.
2. **`middleware.ts`** uses `clerkMiddleware` + `createRouteMatcher` to protect `/dashboard/*` and `/api/todos/*`. Unauthenticated users are redirected to sign-in.
3. **API routes** call `await auth()` from `@clerk/nextjs/server` to get the current `userId`. Every todo is scoped by that ID, so users can only see their own data.
4. **UI components** like `<SignedIn>`, `<SignedOut>`, and `<UserButton>` conditionally render based on auth state.

## Swapping the in-memory store for a real database

`lib/todoStore.ts` uses an in-memory `Map`. Data is lost when the server restarts and it doesn't work across multiple server instances.

For production, replace it with something like:

- **Prisma + Postgres** (Neon, Supabase, or your own Postgres)
- **Supabase** (Postgres + client SDK)
- **Convex** or **Firestore**
- **Drizzle + any SQL database**

The API route handlers don't need to change — just swap the implementation of `todoStore`.

## Build for production

```bash
npm run build
npm start
```

## Notes

- The sign-in and sign-up routes use Clerk's catch-all pattern (`[[...sign-in]]`) which allows Clerk to handle multi-step flows (email verification, MFA, etc.) within a single route.
- The landing page shows different CTAs based on whether the user is signed in, using `<SignedIn>` and `<SignedOut>`.
- The todo list uses optimistic updates — toggles and deletes apply to the UI instantly and revert on error.
