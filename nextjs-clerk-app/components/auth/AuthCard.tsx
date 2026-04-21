import { SignIn, SignUp } from "@clerk/nextjs";

type AuthMode = "sign-in" | "sign-up";

const COPY: Record<AuthMode, { heading: string; subheading: string }> = {
  "sign-in": {
    heading: "Welcome back",
    subheading: "Sign in to access your todos.",
  },
  "sign-up": {
    heading: "Create your account",
    subheading: "Get started with your personal todo list.",
  },
};

export default function AuthCard({ mode }: { mode: AuthMode }) {
  const { heading, subheading } = COPY[mode];

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">{heading}</h1>
          <p className="mt-2 text-sm text-slate-600">{subheading}</p>
        </div>
        <div className="flex justify-center">
          {mode === "sign-in" ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
}
