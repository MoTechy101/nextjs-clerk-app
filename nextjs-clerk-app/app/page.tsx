import Link from "next/link";
import RequireAuth from "@/components/auth/RequireAuth";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
        Next.js + Clerk Todo App
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">
        A full-stack example showing Next.js 15 App Router with Clerk
        authentication, protected API routes, and a personal todo list per user.
      </p>

      <div className="mt-10 flex gap-4">
        <RequireAuth
          fallback={
            <>
              <Link
                href="/sign-up"
                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-indigo-700"
              >
                Get Started
              </Link>
              <Link
                href="/sign-in"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Sign In
              </Link>
            </>
          }
        >
          <Link
            href="/dashboard"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-indigo-700"
          >
            Go to Dashboard
          </Link>
        </RequireAuth>
      </div>

      <div className="mt-20 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
        <FeatureCard
          title="🔐 Authentication"
          description="Sign in, sign up, user profiles, and sessions handled by Clerk."
        />
        <FeatureCard
          title="🛡️ Protected Routes"
          description="Middleware guards pages and API routes. Only logged-in users can access their data."
        />
        <FeatureCard
          title="⚡ App Router"
          description="Built on Next.js 15 with Server Components, Server Actions, and Route Handlers."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}
